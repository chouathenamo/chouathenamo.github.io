/* ───────────────────────────────────────────────────────────────
   landing.js — the sailing-course landing
   Cursor becomes a pixel sailboat that eases toward the pointer,
   leaves a wake, tilts into its turns, and lights up nearby marks.
   Degrades gracefully: no pointer / reduced-motion => static boat.
   ─────────────────────────────────────────────────────────────── */
(function () {
  var boat   = document.querySelector('.boat');
  var canvas = document.querySelector('.sea__canvas');
  var marks  = Array.prototype.slice.call(document.querySelectorAll('.mark'));
  if (!boat || !canvas) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // Boat position (current) and target (pointer).
  var x = W * 0.5, y = H * 0.42;
  var tx = x, ty = y;
  var px = x, py = y;            // previous, for velocity/tilt
  var hasPointer = false;

  // Idle drift so the boat is alive before the mouse moves / on touch.
  var t0 = performance.now();
  function idleTarget(now) {
    var s = (now - t0) / 1000;
    return {
      x: W * 0.5 + Math.cos(s * 0.45) * Math.min(W * 0.22, 220),
      y: H * 0.44 + Math.sin(s * 0.7) * Math.min(H * 0.14, 120)
    };
  }

  function setTarget(cx, cy) { tx = cx; ty = cy; hasPointer = true; }

  window.addEventListener('pointermove', function (e) {
    setTarget(e.clientX, e.clientY);
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (e.touches[0]) setTarget(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  // let the pointer go idle again shortly after it stops (so it drifts)
  var idleTimer;
  window.addEventListener('pointermove', function () {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { hasPointer = false; }, 2600);
  });

  function nearMarks() {
    for (var i = 0; i < marks.length; i++) {
      var r = marks[i].getBoundingClientRect();
      var mx = r.left + r.width / 2, my = r.top + r.height / 2;
      var d = Math.hypot(mx - x, my - y);
      marks[i].classList.toggle('is-near', d < 90);
    }
  }

  function frame(now) {
    var target = hasPointer ? { x: tx, y: ty } : idleTarget(now);

    // ease toward target
    var ease = reduce ? 1 : 0.12;
    px = x; py = y;
    x += (target.x - x) * ease;
    y += (target.y - y) * ease;

    // velocity -> gentle tilt (heel into the turn)
    var vx = x - px;
    var tilt = Math.max(-18, Math.min(18, vx * 1.6));

    boat.style.transform =
      'translate(' + (x - 23) + 'px,' + (y - 30) + 'px) rotate(' + tilt + 'deg)';

    // wake: fade the whole canvas a touch, then stamp a dot at the stern
    if (!reduce) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = getFade();
      ctx.fillRect(0, 0, W, H);
      var speed = Math.hypot(vx, y - py);
      if (speed > 0.4) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(140,150,165,0.28)';
        ctx.arc(x, y + 12, Math.min(3.2, 1 + speed * 0.12), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    nearMarks();

    if (!reduce) requestAnimationFrame(frame);
  }

  // fade colour tuned to the current (light/dark) paper
  function getFade() {
    var dark = matchMedia('(prefers-color-scheme: dark)').matches &&
               document.documentElement.getAttribute('data-theme') !== 'light' ||
               document.documentElement.getAttribute('data-theme') === 'dark';
    return dark ? 'rgba(20,19,15,0.10)' : 'rgba(244,241,234,0.10)';
  }

  if (reduce) {
    // park the boat just above the name; no animation
    x = W * 0.5; y = H * 0.36;
    boat.style.transform = 'translate(' + (x - 23) + 'px,' + (y - 30) + 'px)';
    nearMarks();
  } else {
    requestAnimationFrame(frame);
  }
})();
