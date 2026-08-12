// header state
var hdr = document.querySelector('.hdr');
addEventListener('scroll', function () {
  hdr.classList.toggle('stuck', scrollY > 12);
}, { passive: true });

// mobile nav
var burger = document.querySelector('.burger');
var nav = document.querySelector('.nav');
if (burger) {
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
  });
}

// scroll reveal
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.rv').forEach(function (el, i) {
  el.style.transitionDelay = (i % 4) * 70 + 'ms';
  io.observe(el);
});

// portfolio filters
var filters = document.querySelector('.filters');
if (filters) {
  filters.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var cat = btn.dataset.filter;
    filters.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b === btn); });
    document.querySelectorAll('[data-cat]').forEach(function (card) {
      card.hidden = !(cat === 'all' || card.dataset.cat === cat);
    });
  });
}

// deep-link a category: work/index.html?c=software
if (filters) {
  var c = new URLSearchParams(location.search).get('c');
  var target = c && filters.querySelector('button[data-filter="' + c + '"]');
  if (target) target.click();
}

// prefill enquiry form with the product name from ?item=
var item = new URLSearchParams(location.search).get('item');
if (item) {
  var sel = document.getElementById('item');
  if (sel) {
    var found = Array.prototype.some.call(sel.options, function (o) {
      if (o.value === item) { sel.value = item; return true; }
    });
    if (!found) { var o = new Option(item, item, true, true); sel.add(o); }
    var msg = document.getElementById('message');
    if (msg && !msg.value) msg.value = 'Hi Alfy, I would like to know more about "' + item + '".';
  }
}
