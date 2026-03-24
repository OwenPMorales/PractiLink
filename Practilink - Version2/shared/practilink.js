/* PractiLink shared interactions (mockups)
   - Toggle "alta visibilidad" mode (accessibility).
*/
(function () {
  function toggleA11y() {
    document.body.classList.toggle('alta-visibilidad');
    var label = document.getElementById('fabLabel');
    if (label) {
      label.textContent = document.body.classList.contains('alta-visibilidad')
        ? 'Visibilidad normal'
        : 'Alta Visibilidad';
    }
  }

  // Generic data-attribute hook
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('[data-pl-toggle="a11y"]') : null;
    if (!btn) return;
    e.preventDefault();
    toggleA11y();
  });

  // Back-compat hooks (existing pages)
  window.toggleAccessibility = toggleA11y;
})();

