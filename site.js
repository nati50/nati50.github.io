// Visor de imágenes ampliables (como el "quick view" de Cargo). Sin cookies ni seguimiento.
(function () {
  var links = [].slice.call(document.querySelectorAll('a.zoom'));
  if (!links.length) return;
  var qv = document.createElement('div');
  qv.className = 'qv'; qv.hidden = true;
  qv.setAttribute('role', 'dialog'); qv.setAttribute('aria-modal', 'true');
  qv.innerHTML = '<img alt=""><button class="x" aria-label="Close">×</button>' +
    (links.length > 1 ? '<button class="prev" aria-label="Previous">‹</button><button class="next" aria-label="Next">›</button>' : '');
  document.body.appendChild(qv);
  var img = qv.querySelector('img'), i = 0, last = null;
  function show(n) { i = (n + links.length) % links.length; img.src = links[i].getAttribute('href'); }
  function open(n) { last = document.activeElement; show(n); qv.hidden = false; document.documentElement.style.overflow = 'hidden'; qv.querySelector('.x').focus(); }
  function close() { qv.hidden = true; img.removeAttribute('src'); document.documentElement.style.overflow = ''; if (last) last.focus(); }
  links.forEach(function (a, n) { a.addEventListener('click', function (e) { e.preventDefault(); open(n); }); });
  qv.addEventListener('click', function (e) {
    if (e.target.classList.contains('prev')) { show(i - 1); return; }
    if (e.target.classList.contains('next')) { show(i + 1); return; }
    close();
  });
  document.addEventListener('keydown', function (e) {
    if (qv.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(i - 1);
    else if (e.key === 'ArrowRight') show(i + 1);
  });
})();
