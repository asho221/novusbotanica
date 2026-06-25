/* Novus Botanica — behaviour */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---- Scroll reveal ---- */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rv.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* ---- Year ---- */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* ---- Specimen plate (generative SVG) ---- */
  var plate = document.getElementById('plate');
  if (plate) buildPlate(plate);

  /* ---- Contact form ---- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var data = new FormData(form), key = data.get('access_key');
      if (!key || String(key).indexOf('YOUR_WEB3FORMS') === 0) {
        status.textContent = 'Form not configured yet — add your Web3Forms key (see README). For now, email us directly.';
        status.className = 'form-status err'; return;
      }
      status.textContent = 'Sending…'; status.className = 'form-status';
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Accept': 'application/json' }, body: data })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success) { status.textContent = 'Received. We reply within one business day.'; status.className = 'form-status ok'; form.reset(); }
          else { status.textContent = 'Something went wrong — please email us directly.'; status.className = 'form-status err'; }
        })
        .catch(function () { status.textContent = 'Network error — please email us directly.'; status.className = 'form-status err'; });
    });
  }
});

/* Build the fine-line "specimen plate": instrument rings + tick scale + molecular lattice */
function buildPlate(host) {
  var NS = 'http://www.w3.org/2000/svg';
  var C = 200, svg = el('svg', { viewBox: '0 0 400 400' });

  function el(name, attrs) { var n = document.createElementNS(NS, name); for (var k in attrs) n.setAttribute(k, attrs[k]); return n; }
  function pt(cx, cy, r, deg) { var a = (deg - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }

  // rings
  var rOuter = 188;
  var outer = el('circle', { cx: C, cy: C, r: rOuter, class: 'ring draw' });
  outer.style.setProperty('--len', (2 * Math.PI * rOuter).toFixed(1));
  svg.appendChild(outer);
  svg.appendChild(el('circle', { cx: C, cy: C, r: 150, class: 'ring-ink' }));
  svg.appendChild(el('circle', { cx: C, cy: C, r: 112, class: 'ring' }));

  // tick scale (rotating)
  var ticks = el('g', { class: 'spin' });
  for (var d = 0; d < 360; d += 5) {
    var long = (d % 30 === 0);
    var a = pt(C, C, rOuter, d), b = pt(C, C, rOuter - (long ? 14 : 7), d);
    ticks.appendChild(el('line', { x1: a[0].toFixed(1), y1: a[1].toFixed(1), x2: b[0].toFixed(1), y2: b[1].toFixed(1), class: 'tick' }));
  }
  svg.appendChild(ticks);

  // outer constellation nodes at a few positions (structured)
  var cnst = el('g', { class: 'spin' });
  [18, 84, 156, 228, 300, 342].forEach(function (d, i) {
    var p = pt(C, C, 150, d);
    cnst.appendChild(el('circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: i % 3 === 0 ? 3.4 : 2.4, class: i === 1 ? 'node-clay' : 'node' }));
  });
  svg.appendChild(cnst);

  // molecular lattice (counter-rotating, breathing)
  var lat = el('g', { class: 'spin-r' });
  var inner = el('g', { class: 'breathe' });
  var hexR = 74, verts = [];
  for (var i = 0; i < 6; i++) verts.push(pt(C, C, hexR, i * 60));
  // hex edges
  for (var i = 0; i < 6; i++) {
    var p1 = verts[i], p2 = verts[(i + 1) % 6];
    inner.appendChild(el('line', { x1: p1[0].toFixed(1), y1: p1[1].toFixed(1), x2: p2[0].toFixed(1), y2: p2[1].toFixed(1), class: 'lat' }));
    inner.appendChild(el('line', { x1: C, y1: C, x2: p1[0].toFixed(1), y2: p1[1].toFixed(1), class: 'lat' }));
  }
  // second smaller hex, offset
  var hex2R = 40, off = 30;
  for (var i = 0; i < 6; i++) {
    var q1 = pt(C, C, hex2R, i * 60 + off), q2 = pt(C, C, hex2R, ((i + 1) % 6) * 60 + off);
    inner.appendChild(el('line', { x1: q1[0].toFixed(1), y1: q1[1].toFixed(1), x2: q2[0].toFixed(1), y2: q2[1].toFixed(1), class: 'lat' }));
  }
  // nodes
  verts.forEach(function (v, i) { inner.appendChild(el('circle', { cx: v[0].toFixed(1), cy: v[1].toFixed(1), r: 4, class: i === 0 ? 'node-clay' : 'node' })); });
  inner.appendChild(el('circle', { cx: C, cy: C, r: 4.5, class: 'node' }));
  lat.appendChild(inner);
  svg.appendChild(lat);

  host.appendChild(svg);
}
