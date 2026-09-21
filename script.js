/* ------------------------------------------------------------------
   solar.js  –  رندر و انیمیشن منظومه‌ خورشیدی
   نسخهٔ بهبود یافته:  ES6, ماژولار, دسترسی‌پذیر, کاهش globals
------------------------------------------------------------------- */

const NS = 'http://www.w3.org/2000/svg';
const CENTER = { x: 500, y: 500 };
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)')
  .matches;

/* ---------- داده‌های ثابت ---------- */
const PLANETS = [
  { id: 'mercury', distance: 78,  period: 5200,   angle: 0.4, r: 5,  label: 'عطارد' },
  { id: 'venus',   distance: 115, period: 8200,   angle: 1.3, r: 8,  label: 'زهره' },
  { id: 'earth',   distance: 158, period: 13500,  angle: 2.4, r: 9,  label: 'زمین' },
  { id: 'mars',    distance: 195, period: 20500,  angle: 3.6, r: 6,  label: 'مریخ' },
  { id: 'jupiter', distance: 260, period: 46000,  angle: 4.5, r: 19, label: 'مشتری' },
  { id: 'saturn',  distance: 325, period: 76000,  angle: 5.4, r: 16, label: 'زحل' },
  { id: 'uranus',  distance: 375, period: 112000, angle: 0.9, r: 12, label: 'اورانوس' },
  { id: 'neptune', distance: 425, period: 148000, angle: 2.9, r: 12, label: 'نپتون' }
];

const FACTS = {
  mercury: 'نزدیک‌ترین سیاره به خورشید؛ یک روزش از یک سالش هم طولانی‌تره.',
  venus:   'داغ‌ترین سیاره‌ی منظومه‌ی شمسی، به‌خاطر جو غلیظ دی‌اکسید کربنی‌اش.',
  earth:   'خانه‌ی ماست؛ مبدأ همه‌ی مأموریت‌های پرتویاب.',
  mars:    'به سیاره‌ی سرخ معروفه؛ رنگش از اکسید آهن خاک سطحشه.',
  jupiter: 'بزرگ‌ترین سیاره‌ی منظومه؛ بیش از هزار زمین توش جا می‌شود.',
  saturn:  'حلقه‌های زحل از میلیون‌ها تکه‌ی یخ و سنگ ساخته شدن.',
  uranus:  'این سیاره تقریباً افتاده و به‌پهلو دور خورشید می‌چرخه.',
  neptune: 'دورترین سیاره‌ی رسمی از خورشید؛ بادهاش سریع‌ترین بادهای منظومه‌ست.'
};

/* ---------- کمکی‌ها ---------- */
const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- ساخت عناصر ثابت ---------- */
function createStar() {
  const s = document.createElementNS(NS, 'circle');
  s.setAttribute('cx', (Math.random() * 1000).toFixed(1));
  s.setAttribute('cy', (Math.random() * 1000).toFixed(1));
  s.setAttribute('r', (Math.random() * 1.3 + 0.3).toFixed(2));
  s.setAttribute('fill', '#fff');
  s.setAttribute('opacity', (Math.random() * 0.55 + 0.2).toFixed(2));
  if (!REDUCED && Math.random() < 0.3) s.classList.add('twinkle');
  if (!REDUCED) s.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
  return s;
}

/* ---------- رندر پس‌زمینه ---------- */
export function injectBackground(rootId = 'bg-root') {
  const root = document.getElementById(rootId);
  if (!root) return;
  root.className = 'bg-solar';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = BG_HTML;               // BG_HTML همان SVG طولانی شماست
}

/* ---------- راه‌اندازی منظومه‌ خورشیدی ---------- */
export function initSolarSystem(svgId = 'solar-svg') {
  const svg = document.getElementById(svgId);
  if (!svg) return;

  /* --- عناصر ثابت را یکبار بخوانید (به‌جای getElementById در هر فریم) --- */
  const starsGroup = svg.querySelector('#stars');
  const planetEls = {};
  PLANETS.forEach(p => (planetEls[p.id] = svg.querySelector(`#planet-${p.id}`)));
  const pathEM = svg.querySelector('#path-em');
  const pathES = svg.querySelector('#path-es');
  const travelerEM = svg.querySelector('#traveler-em');
  const travelerES = svg.querySelector('#traveler-es');
  const caption = document.getElementById('caption');

  /* --- ستارگان --- */
  if (!REDUCED) {
    for (let i = 0; i < 110; i++) starsGroup.appendChild(createStar());
  }

  /* --- وضعیت پویا --- */
  const positions = {};                     // {x, y} برای هر سیاره
  const traveler = {
    em: {elapsed: 0, dur: 3000},
    es: {elapsed: 0, dur: 4400}
  };
  let boostUntil = 0;
  let lastTimestamp = null;
  let running = true;                      // برای pause / resume

  /* ---------- خطوط مسیری */ 
  function trimLine(el, a, ra, b, rb) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist, uy = dy / dist;
    el.setAttribute('x1', (a.x + ux * ra).toFixed(1));
    el.setAttribute('y1', (a.y + uy * ra).toFixed(1));
    el.setAttribute('x2', (b.x - ux * rb).toFixed(1));
    el.setAttribute('y2', (b.y - uy * rb).toFixed(1));
  }

  /* ---------- حرکت مسافران ---------- */
  function placeTraveler(el, from, to, tRaw) {
    const t = REDUCED ? 0.5 : easeInOut(tRaw);
    const x = lerp(from.x, to.x, t);
    const y = lerp(from.y, to.y, t);
    const deg = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;

    el.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${deg.toFixed(1)})`);
    const opacity = REDUCED ? 0.85 : Math.max(0.12, Math.sin(Math.PI * tRaw));
    el.setAttribute('opacity', opacity.toFixed(2));
  }

  /* ---------- به‌روزرسانی هر فریم ---------- */
  function update(timestamp) {
    if (!running) { requestAnimationFrame(update); return; }

    if (lastTimestamp === null) lastTimestamp = timestamp;
    const dt = timestamp - lastTimestamp;   // میلی‌ثانیه
    lastTimestamp = timestamp;

    /* موقعیت سیارات */
    PLANETS.forEach(p => {
      const ang = p.angle + (REDUCED ? 0 : (timestamp / p.period) * Math.PI * 2);
      const x = CENTER.x + p.distance * Math.cos(ang);
      const y = CENTER.y + p.distance * Math.sin(ang);
      positions[p.id] = { x, y };
      planetEls[p.id].setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
    });

    /* خطوط مسیر */
    const e = positions.earth, m = positions.mercury, s = positions.saturn;
    trimLine(pathEM, e, 9, m, 5);
    trimLine(pathES, e, 9, s, 16);

    /* مسافران */
    if (REDUCED) {
      placeTraveler(travelerEM, e, m, 0.5);
      placeTraveler(travelerES, e, s, 0.5);
    } else {
      const speed = timestamp < boostUntil ? 2.6 : 1;
      traveler.em.elapsed = (traveler.em.elapsed + dt * speed) % traveler.em.dur;
      traveler.es.elapsed = (traveler.es.elapsed + dt * speed) % traveler.es.dur;
      placeTraveler(travelerEM, e, m, traveler.em.elapsed / traveler.em.dur);
      placeTraveler(travelerES, e, s, traveler.es.elapsed / traveler.es.dur);
    }

    requestAnimationFrame(update);
  }

  /* ---------- تعامل کاربر (کلیک روی سیاره) ---------- */
  function onPlanetClick(id) {
    if (caption) caption.textContent = FACTS[id] || '';
    if (id === 'earth') boost();          // در صورت کلیک روی زمین، boost اجرا می‌شود
  }

  function boost() {
    boostUntil = performance.now() + 1600;
    pathEM.classList.add('boost');
    pathES.classList.add('boost');
    setTimeout(() => {
      pathEM.classList.remove('boost');
      pathES.classList.remove('boost');
    }, 700);
  }

  /* افزودن ویژگی‌های دسترسی‌پذیری به هر سیاره */
  PLANETS.forEach(p => {
    const el = planetEls[p.id];
    if (!el) return;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `نمایش اطلاعات ${p.label}`);
    el.addEventListener('click', () => onPlanetClick(p.id));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPlanetClick(p.id);
      }
    });
  });

  /* ---------- کنترل pause / resume هنگام سوئیچ تب ---------- */
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running && !REDUCED) requestAnimationFrame(update);
  });

  /* ---------- شروع انیمیشن ---------- */
  if (REDUCED) {
    // فقط یک بار موقعیت‌ها را محاسبه می‌کنیم؛ هیچ انیمیشن پویا نیست
    update(performance.now());
  } else {
    requestAnimationFrame(update);
  }
}

/* ---------- فعال‌سازی ناوبری فعال ---------- */
export function markActiveNav(navSelector = '.nav-links a') {
  const currentPage = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll(navSelector).forEach(a => {
    a.removeAttribute('aria-current');
    if (a.getAttribute('href') === currentPage) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- راه‌اندازی در DOMContentLoaded ---------- */
document.addEventListener('DOMContentLoaded', () => {
  injectBackground();          // پیش‌فرض id = 'bg-root'
  initSolarSystem();           // پیش‌فرض id = 'solar-svg'
  markActiveNav();             // پیش‌فرض سلکتور .nav-links a
});
