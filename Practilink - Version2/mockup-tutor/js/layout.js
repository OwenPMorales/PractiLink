(function() {
  // Inserta el sidebar + overlay + topbar común en todas las páginas.
  // Debe ejecutarse antes de cargar mockup-tutor.js.

  var layoutHtml = "" +
    "<aside class=\"sidebar\" id=\"sidebar\">" +
    "  <div class=\"sidebar-logo\">" +
    "    <div class=\"logo-icon\">" +
    "      <img src=\"../Logo.png\" alt=\"Logo PractiLink institucional\" />" +
    "    </div>" +
    "    <div>" +
    "      <div class=\"logo-text\">PractiLink</div>" +
    "      <div class=\"logo-sub\">Estadias Profesionales</div>" +
    "    </div>" +
    "  </div>" +
    "  <nav class=\"sidebar-nav\" role=\"navigation\" aria-label=\"Menú principal\">" +
    "    <span class=\"sidebar-section-title\">Menu Principal</span>" +
    "    <a href=\"index.html\" class=\"sidebar-link\" data-page=\"index.html\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M4 10.5L12 4L20 10.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5V10.5Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M9.5 21V13.5H14.5V21\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" +
    "      <span>Inicio</span>" +
    "    </a>" +
    "    <a href=\"alumnos.html\" class=\"sidebar-link\" data-page=\"alumnos.html\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M5 5.5H19C19.8284 5.5 20.5 6.17157 20.5 7V15C20.5 15.8284 19.8284 16.5 19 16.5H9L5 19V7C5 6.17157 5.67157 5.5 6.5 5.5Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M7.5 9L11.25 11.5L15 9\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" +
    "      <span>Alumnos</span>" +
    "      <span class=\"badge-count\">3</span>" +
    "    </a>" +
    "    <a href=\"documentos.html\" class=\"sidebar-link\" data-page=\"documentos.html\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M7 3.5H15.5L19 7V19C19 19.8284 18.3284 20.5 17.5 20.5H7C6.17157 20.5 5.5 19.8284 5.5 19V5C5.5 4.17157 6.17157 3.5 7 3.5Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M9 9H15\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><path d=\"M9 12.5H13.5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></svg>" +
    "      <span>Documentacion</span>" +
    "    </a>" +
    "    <a href=\"vinculacion.html\" class=\"sidebar-link\" data-page=\"vinculacion.html\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M7 19L9.5 15.5L13 13\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" +
    "      <span>Vinculacion</span>" +
    "    </a>" +
    "    <a href=\"empresas.html\" class=\"sidebar-link\" data-page=\"empresas.html\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M4.5 19.5H19.5V10.5L13 4.5L4.5 10.5V19.5Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M9.5 19.5V13.5H14.5V19.5\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" +
    "      <span>Contacto Empresas</span>" +
    "    </a>" +
    "    <div class=\"sidebar-submenu-container\">" +
    "      <button class=\"sidebar-submenu-toggle\" id=\"foroToggle\" aria-expanded=\"false\">" +
    "        <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M5 5.5H19C19.8284 5.5 20.5 6.17157 20.5 7V15C20.5 15.8284 19.8284 16.5 19 16.5H9L5 19V7C5 6.17157 5.67157 5.5 6.5 5.5Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M7.5 9H16.5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><path d=\"M7.5 12H13\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></svg>" +
    "        <span>Foros</span>" +
    "        <svg class=\"submenu-arrow\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M6 9L12 15L18 9\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" +
    "      </button>" +
    "      <div class=\"sidebar-submenu\" id=\"foroSubmenu\">" +
    "        <a href=\"foro-alumnos.html\" class=\"sidebar-sublink\" data-page=\"foro-alumnos.html\">" +
    "          <span>Foro Alumnos</span>" +
    "        </a>" +
    "        <a href=\"foro-vinculacion.html\" class=\"sidebar-sublink\" data-page=\"foro-vinculacion.html\">" +
    "          <span>Foro Vinculación</span>" +
    "        </a>" +
    "      </div>" +
    "    </div>" +
    "    <a href=\"calendario.html\" class=\"sidebar-link\" data-page=\"calendario.html\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M3.5 5H20.5V19.5H3.5V5Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M8 3.5V5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><path d=\"M16 3.5V5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><path d=\"M3.5 9H20.5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></svg>" +
    "      <span>Calendario Escolar</span>" +
    "    </a>" +
    "    <a href=\"notas.html\" class=\"sidebar-link\" data-page=\"notas.html\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M6 4H18C18.8284 4 19.5 4.67157 19.5 5.5V19.5C19.5 20.3284 18.8284 21 18 21H6C5.17157 21 4.5 20.3284 4.5 19.5V5.5C4.5 4.67157 5.17157 4 6 4Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M8.5 8H15.5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><path d=\"M8.5 12H15.5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><path d=\"M8.5 16H12.5\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></svg>" +
    "      <span>Notas</span>" +
    "    </a>" +
    "    <span class=\"sidebar-section-title\" style=\"margin-top: 16px;\">Configuracion</span>" +
    "    <a href=\"index.html\" class=\"sidebar-link\" data-page=\"configuracion\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M4.75 12C4.75 11.68 4.78 11.37 4.84 11.06L3 9.5L4.5 6.5L6.8 6.9C7.19 6.59 7.61 6.33 8.06 6.13L8.5 4H11.5L11.94 6.13C12.39 6.33 12.81 6.59 13.2 6.9L15.5 6.5L17 9.5L15.16 11.06C15.22 11.37 15.25 11.68 15.25 12C15.25 12.32 15.22 12.63 15.16 12.94L17 14.5L15.5 17.5L13.2 17.1C12.81 17.41 12.39 17.67 11.94 17.87L11.5 20H8.5L8.06 17.87C7.61 17.67 7.19 17.41 6.8 17.1L4.5 17.5L3 14.5L4.84 12.94C4.78 12.63 4.75 12.32 4.75 12Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" +
    "      <span>Configuracion</span>" +
    "    </a>" +
    "  </nav>" +
    "  <div class=\"sidebar-profile\">" +
    "    <div class=\"sidebar-profile-avatar\">LT</div>" +
    "    <div>" +
    "      <div class=\"sidebar-profile-name\">MCA. Laura Trejo Medina</div>" +
    "      <div class=\"sidebar-profile-role\">Tutor Academico</div>" +
    "      <div class=\"sidebar-profile-role\">Grupo: 7°B DSM</div>" +
    "    </div>" +
    "  </div>" +
    "</aside>" +
    "<div class=\"sidebar-overlay\" id=\"sidebarOverlay\"></div>" +
    "<header class=\"topbar\">" +
    "  <div class=\"topbar-left\">" +
    "    <button class=\"hamburger\" id=\"hamburgerBtn\" aria-label=\"Abrir menu\">&#9776;</button>" +
    "    <span class=\"page-title\">" +
    "      <svg class=\"page-title-icon\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\">" +
    "        <path d=\"M4 6H20V18H4V6Z\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
    "        <path d=\"M8 10H16\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
    "        <path d=\"M8 14H16\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
    "      </svg>" +
    "      <span>Panel del Tutor Academico</span>" +
    "    </span>" +
    "  </div>" +
    "  <div class=\"topbar-right\">" +
    "    <span class=\"topbar-user\" id=\"layoutUserName\"></span>" +
    "    <button class=\"btn-logout\" id=\"btnLogout\" aria-label=\"Cerrar sesión\">" +
    "      <svg class=\"logout-icon\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\">" +
    "        <path d=\"M15 18L21 12L15 6\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
    "        <path d=\"M21 12H9\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
    "        <path d=\"M9 6V18\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
    "      </svg>" +
    "      <span>Salir</span>" +
    "    </button>" +
    "    <button class=\"notification-btn\" aria-label=\"Notificaciones\">" +
    "      <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 4C9.79086 4 8 5.79086 8 8V9.5C8 10.0523 7.77614 10.581 7.37868 10.9645L6.3 12C5.7 12.57 6.09 13.5 6.92 13.5H17.08C17.91 13.5 18.3 12.57 17.7 12L16.6213 10.9645C16.2239 10.581 16 10.0523 16 9.5V8C16 5.79086 14.2091 4 12 4Z\" stroke=\"white\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M10 16C10.4 17.2 11.1 18 12 18C12.9 18 13.6 17.2 14 16\" stroke=\"white\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" +
    "      <span class=\"notif-dot\"></span>" +
    "    </button>" +
    "  </div>" +
    "</header>";

  function getCurrentPage() {
    var path = (window.location.pathname || '').split('/').pop();
    if (!path || path === '') return 'index.html';
    return path;
  }

  function activateCurrentLink() {
    var current = getCurrentPage();
    var links = document.querySelectorAll('.sidebar-link');
    links.forEach(function(link) {
      var page = link.getAttribute('data-page');
      if (!page) return;
      if (page === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Handle submenu activation
    var sublinks = document.querySelectorAll('.sidebar-sublink');
    sublinks.forEach(function(link) {
      var page = link.getAttribute('data-page');
      if (!page) return;
      if (page === current) {
        link.classList.add('active');
        // Also activate and expand the parent submenu
        var foroToggle = document.getElementById('foroToggle');
        var foroSubmenu = document.getElementById('foroSubmenu');
        if (foroToggle && foroSubmenu) {
          foroToggle.classList.add('active');
          foroToggle.setAttribute('aria-expanded', 'true');
          foroSubmenu.classList.add('active');
        }
      } else {
        link.classList.remove('active');
      }
    });

    // If current page is foro.html, expand submenu by default
    if (current === 'foro.html') {
      var foroToggle = document.getElementById('foroToggle');
      var foroSubmenu = document.getElementById('foroSubmenu');
      if (foroToggle && foroSubmenu) {
        foroToggle.setAttribute('aria-expanded', 'true');
        foroSubmenu.classList.add('active');
      }
    }
  }

  function renderLayout() {
    var root = document.getElementById('layout-root');
    if (!root) return;


    root.innerHTML = layoutHtml;
    activateCurrentLink();

    var currentUser = window.PLAuth && typeof window.PLAuth.getCurrentUser === 'function'
      ? window.PLAuth.getCurrentUser()
      : null;

    if (currentUser) {
      var userNameEl = document.getElementById('layoutUserName');
      if (userNameEl) {
        userNameEl.textContent = currentUser.name || currentUser.email || '';
      }
    }

    var logoutBtn = document.getElementById('btnLogout');
    if (logoutBtn && window.PLAuth && typeof window.PLAuth.logout === 'function') {
      logoutBtn.addEventListener('click', function () {
        window.PLAuth.logout();
      });
    }

    // Submenu functionality
    var foroToggle = document.getElementById('foroToggle');
    var foroSubmenu = document.getElementById('foroSubmenu');

    if (foroToggle && foroSubmenu) {
      foroToggle.addEventListener('click', function() {
        var isExpanded = foroToggle.getAttribute('aria-expanded') === 'true';
        foroToggle.setAttribute('aria-expanded', !isExpanded);
        foroSubmenu.classList.toggle('active');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', renderLayout);
})();
