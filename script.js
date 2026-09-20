(function(){
  var BG_HTML = '' +
  '<svg id="solar-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">' +
    '<defs>' +
      '<radialGradient id="sunCore" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#fff6da"/><stop offset="45%" stop-color="#ffcf5c"/><stop offset="100%" stop-color="#ff9a2e"/></radialGradient>' +
      '<radialGradient id="sunHalo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffcf5c" stop-opacity="0.55"/><stop offset="100%" stop-color="#ffcf5c" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="earthGrad" cx="32%" cy="28%" r="75%"><stop offset="0%" stop-color="#bfe3ff"/><stop offset="55%" stop-color="#2f6fd6"/><stop offset="100%" stop-color="#12356e"/></radialGradient>' +
      '<radialGradient id="earthHalo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#6fb4ff" stop-opacity="0.45"/><stop offset="100%" stop-color="#6fb4ff" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="saturnGrad" cx="32%" cy="28%" r="75%"><stop offset="0%" stop-color="#fff3d6"/><stop offset="60%" stop-color="#e8c88d"/><stop offset="100%" stop-color="#a9824e"/></radialGradient>' +
      '<linearGradient id="trailGold" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ffb648" stop-opacity="0"/><stop offset="100%" stop-color="#ffe7b0" stop-opacity="0.95"/></linearGradient>' +
      '<linearGradient id="trailCyan" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6fe3ff" stop-opacity="0"/><stop offset="100%" stop-color="#d6f7ff" stop-opacity="0.95"/></linearGradient>' +
      '<marker id="arrowGold" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L8 5L1 9Z" fill="#ffb648"/></marker>' +
      '<marker id="arrowCyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L8 5L1 9Z" fill="#6fe3ff"/></marker>' +
    '</defs>' +
    '<g id="stars"></g>' +
    '<g id="orbits" fill="none" stroke="#ffffff">' +
      '<circle cx="500" cy="500" r="78" opacity="0.14"/>' +
      '<circle cx="500" cy="500" r="115" opacity="0.10"/>' +
      '<circle cx="500" cy="500" r="158" opacity="0.18"/>' +
      '<circle cx="500" cy="500" r="195" opacity="0.10"/>' +
      '<circle cx="500" cy="500" r="260" opacity="0.10"/>' +
      '<circle cx="500" cy="500" r="325" opacity="0.18"/>' +
      '<circle cx="500" cy="500" r="375" opacity="0.10"/>' +
      '<circle cx="500" cy="500" r="425" opacity="0.10"/>' +
    '</g>' +
    '<line id="path-em" x1="500" y1="500" x2="500" y2="500" stroke="#ffb648" stroke-width="2" stroke-dasharray="9 7" fill="none" opacity="0.9" marker-end="url(#arrowGold)"/>' +
    '<line id="path-es" x1="500" y1="500" x2="500" y2="500" stroke="#6fe3ff" stroke-width="2" stroke-dasharray="9 7" fill="none" opacity="0.9" marker-end="url(#arrowCyan)"/>' +
    '<g id="traveler-em" class="traveler"><ellipse cx="-9" cy="0" rx="11" ry="2.2" fill="url(#trailGold)"/><circle cx="1" cy="0" r="3.4" fill="#fff1cf"/></g>' +
    '<g id="traveler-es" class="traveler"><ellipse cx="-9" cy="0" rx="11" ry="2.2" fill="url(#trailCyan)"/><circle cx="1" cy="0" r="3.4" fill="#eafcff"/></g>' +
    '<g id="sun-group" transform="translate(500,500)"><circle r="95" fill="url(#sunHalo)"/><circle r="40" fill="url(#sunCore)"/></g>' +
    '<g id="planet-mercury" class="planet"><circle r="5" class="pulse pulse-gold"/><circle r="5" fill="#b7b0a6"/><text y="17" class="label label-strong">عطارد</text></g>' +
    '<g id="planet-venus" class="planet"><circle r="8" fill="#e7c896"/><text y="20" class="label label-soft">زهره</text></g>' +
    '<g id="planet-earth" class="planet"><circle r="15" fill="url(#earthHalo)"/><circle r="9" fill="url(#earthGrad)"/><circle cx="-2" cy="-3" r="2.2" fill="#ffffff" opacity="0.55"/><circle cx="2.5" cy="2" r="1.6" fill="#ffffff" opacity="0.4"/><text y="24" class="label label-strong">زمین</text></g>' +
    '<g id="planet-mars" class="planet"><circle r="6" fill="#c1440e"/><text y="19" class="label label-soft">مریخ</text></g>' +
    '<g id="planet-jupiter" class="planet"><circle r="19" fill="#d3ac7c"/><ellipse rx="18" ry="3" fill="#8a5a34" opacity="0.3" transform="translate(0,-7)"/><ellipse rx="18" ry="3" fill="#8a5a34" opacity="0.25" transform="translate(0,6)"/><text y="33" class="label label-soft">مشتری</text></g>' +
    '<g id="planet-saturn" class="planet"><ellipse rx="29" ry="8.5" fill="none" stroke="#d9c38a" stroke-width="3" opacity="0.85" transform="rotate(-24)"/><circle r="16" class="pulse pulse-cyan"/><circle r="16" fill="url(#saturnGrad)"/><text y="36" class="label label-strong">زحل</text></g>' +
    '<g id="planet-uranus" class="planet"><circle r="12" fill="#9fd8e0"/><text y="26" class="label label-soft">اورانوس</text></g>' +
    '<g id="planet-neptune" class="planet"><circle r="12" fill="#3f5fd0"/><text y="26" class="label label-soft">نپتون</text></g>' +
  '</svg>';

  function injectBackground(){
    var root = document.getElementById('bg-root');
    if (!root) return;
    root.className = 'bg-solar';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = BG_HTML;
  }

  function initSolarSystem(){
    var svg = document.getElementById('solar-svg');
    if (!svg) return;

    var center = {x:500, y:500};
    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var NS = 'http://www.w3.org/2000/svg';

    var starsGroup = document.getElementById('stars');
    for (var i=0; i<110; i++){
      var st = document.createElementNS(NS,'circle');
      st.setAttribute('cx', (Math.random()*1000).toFixed(1));
      st.setAttribute('cy', (Math.random()*1000).toFixed(1));
      st.setAttribute('r', (Math.random()*1.3+0.3).toFixed(2));
      st.setAttribute('fill', '#ffffff');
      st.setAttribute('class', 'star' + (!reduceMotion && Math.random()<0.3 ? ' twinkle' : ''));
      st.setAttribute('opacity', (Math.random()*0.55+0.2).toFixed(2));
      if (!reduceMotion){ st.style.animationDelay = (Math.random()*3).toFixed(2)+'s'; }
      starsGroup.appendChild(st);
    }

    var planets = [
      {id:'mercury', distance:78,  period:5200,   angle:0.4, r:5},
      {id:'venus',   distance:115, period:8200,   angle:1.3, r:8},
      {id:'earth',   distance:158, period:13500,  angle:2.4, r:9},
      {id:'mars',    distance:195, period:20500,  angle:3.6, r:6},
      {id:'jupiter', distance:260, period:46000,  angle:4.5, r:19},
      {id:'saturn',  distance:325, period:76000,  angle:5.4, r:16},
      {id:'uranus',  distance:375, period:112000, angle:0.9, r:12},
      {id:'neptune', distance:425, period:148000, angle:2.9, r:12}
    ];

    var positions = {};
    function ease(t){ return t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }
    function lerp(a,b,t){ return a+(b-a)*t; }

    function trimLine(id, a, ra, b, rb){
      var dx=b.x-a.x, dy=b.y-a.y;
      var dist=Math.sqrt(dx*dx+dy*dy)||1;
      var ux=dx/dist, uy=dy/dist;
      var el=document.getElementById(id);
      el.setAttribute('x1',(a.x+ux*ra).toFixed(1));
      el.setAttribute('y1',(a.y+uy*ra).toFixed(1));
      el.setAttribute('x2',(b.x-ux*rb).toFixed(1));
      el.setAttribute('y2',(b.y-uy*rb).toFixed(1));
    }

    function placeTraveler(id, a, b, tRaw){
      var t = ease(tRaw);
      var grp = document.getElementById(id);
      var x = lerp(a.x,b.x,t), y = lerp(a.y,b.y,t);
      var deg = Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
      grp.setAttribute('transform','translate('+x.toFixed(1)+','+y.toFixed(1)+') rotate('+deg.toFixed(1)+')');
      var op = reduceMotion ? 0.85 : Math.max(0.12, Math.sin(Math.PI*tRaw));
      grp.setAttribute('opacity', op.toFixed(2));
    }

    var travelEM=0, travelES=0;
    var DUR_EM=3000, DUR_ES=4400;
    var boostUntil=0;
    var lastT=null;

    function frame(now, dt){
      planets.forEach(function(p){
        var ang = p.angle + (reduceMotion ? 0 : (now/p.period)*Math.PI*2);
        var x = center.x + p.distance*Math.cos(ang);
        var y = center.y + p.distance*Math.sin(ang);
        positions[p.id] = {x:x,y:y};
        var g = document.getElementById('planet-'+p.id);
        if (g) g.setAttribute('transform','translate('+x.toFixed(1)+','+y.toFixed(1)+')');
      });

      var e=positions.earth, m=positions.mercury, s=positions.saturn;
      trimLine('path-em', e, 9, m, 5);
      trimLine('path-es', e, 9, s, 16);

      if (reduceMotion){
        placeTraveler('traveler-em', e, m, 0.5);
        placeTraveler('traveler-es', e, s, 0.5);
      } else {
        var speedMul = (now < boostUntil) ? 2.6 : 1;
        travelEM = (travelEM + dt*speedMul) % DUR_EM;
        travelES = (travelES + dt*speedMul) % DUR_ES;
        placeTraveler('traveler-em', e, m, travelEM/DUR_EM);
        placeTraveler('traveler-es', e, s, travelES/DUR_ES);
      }
    }

    if (reduceMotion){
      frame(0,0);
    } else {
      (function tick(now){
        if (lastT===null) lastT=now;
        var dt = now-lastT; lastT=now;
        frame(now, dt);
        requestAnimationFrame(tick);
      })();
    }

    var facts = {
      mercury:'نزدیک‌ترین سیاره به خورشید؛ یک روزش از یک سالش هم طولانی‌تره.',
      venus:'داغ‌ترین سیاره‌ی منظومه‌ی شمسی، به‌خاطر جو غلیظ دی‌اکسید کربنی‌اش.',
      earth:'خانه‌ی ماست؛ مبدأ همه‌ی مأموریت‌های پرتویاب.',
      mars:'به سیاره‌ی سرخ معروفه؛ رنگش از اکسید آهن خاک سطحشه.',
      jupiter:'بزرگ‌ترین سیاره‌ی منظومه؛ بیش از هزار زمین توش جا می‌شه.',
      saturn:'حلقه‌های زحل از میلیون‌ها تکه‌ی یخ و سنگ ساخته شدن.',
      uranus:'این سیاره تقریبا افتاده و به‌پهلو دور خورشید می‌چرخه.',
      neptune:'دورترین سیاره‌ی رسمی از خورشید؛ بادهاش سریع‌ترین بادهای منظومه‌ست.'
    };

    var caption = document.getElementById('caption');
    var pathEM = document.getElementById('path-em');
    var pathES = document.getElementById('path-es');

    function boost(){
      boostUntil = performance.now() + 1600;
      pathEM.classList.add('boost');
      pathES.classList.add('boost');
      setTimeout(function(){
        pathEM.classList.remove('boost');
        pathES.classList.remove('boost');
      }, 700);
    }

    function selectPlanet(id){
      if (caption && facts[id]) caption.textContent = facts[id];
      if (id === 'earth') boost();
    }

    planets.forEach(function(p){
      var g = document.getElementById('planet-'+p.id);
      if (!g) return;
      g.addEventListener('click', function(){ selectPlanet(p.id); });
    });
  }

  function markActiveNav(){
    var page = (location.pathname.split('/').pop() || 'index.html');
    var links = document.querySelectorAll('.nav-links a');
    for (var i=0; i<links.length; i++){
      var href = links[i].getAttribute('href');
      if (href === page){ links[i].setAttribute('aria-current','page'); }
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    injectBackground();
    initSolarSystem();
    markActiveNav();
  });
})();
