/**
 * PractiLink - Panel Tutor. Script compartido (layout, accesibilidad).
 */
(function() {
  // Alta visibilidad
  var fabBtn = document.getElementById('fabAccessibility');
  var fabLabel = document.getElementById('fabLabel');
  if (fabBtn && fabLabel) {
    fabBtn.addEventListener('click', function() {
      var active = document.body.classList.toggle('alta-visibilidad');
      fabLabel.textContent = active ? 'Modo Normal' : 'Alta Visibilidad';
      fabBtn.setAttribute('aria-label', active ? 'Desactivar modo de alta visibilidad' : 'Activar modo de alta visibilidad');
    });
  }

  // Sidebar móvil
  var hamburger = document.getElementById('hamburgerBtn');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }
  if (overlay && sidebar) {
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // avatars are decorative (initials only) so hide from screen readers
  document.querySelectorAll('.student-avatar').forEach(function(av) {
    av.setAttribute('aria-hidden', 'true');
  });
  // sidebar icons are decorative
  document.querySelectorAll('.sidebar-link svg').forEach(function(icon) {
    icon.setAttribute('aria-hidden', 'true');
  });

  // add aria-labels for action buttons (important when rows are dynamic)
  document.querySelectorAll('.actions-cell .btn-primary').forEach(function(btn) {
    btn.setAttribute('aria-label', 'Ver perfil del alumno');
  });
  document.querySelectorAll('.actions-cell .btn-outline').forEach(function(btn) {
    btn.setAttribute('aria-label', 'Agregar observaciones');
  });

  // update search logic to include live result count for screen readers
  var searchInput = document.getElementById('searchAlumno');
  var searchCountEl = document.getElementById('searchCount');
  if (searchInput) {
    var filterRows = function() {
      var query = searchInput.value.toLowerCase();
      var rows = document.querySelectorAll('#tablaAlumnos tbody tr');
      var visible = 0;
      rows.forEach(function(row) {
        var match = row.textContent.toLowerCase().indexOf(query) !== -1;
        row.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (searchCountEl) {
        searchCountEl.textContent = visible + ' resultados';
      }
    };
    searchInput.addEventListener('input', filterRows);
  }
})();
