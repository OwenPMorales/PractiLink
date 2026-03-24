/**
 * Foro unificado:
 * - Modal de publicación (si existe en la vista)
 * - Carrusel de destacados
 * - Lista completa con toggle + filtros
 */
(function () {
  var modalAnuncio = document.getElementById("modalAnuncio");
  var btnNuevoAnuncio = document.getElementById("btnNuevoAnuncio");
  var btnCancelarAnuncio = document.getElementById("btnCancelarAnuncio");
  var btnPublicarAnuncio = document.getElementById("btnPublicarAnuncio");
  var foroList = document.getElementById("foroList");
  var anuncioTitulo = document.getElementById("anuncioTitulo");
  var anuncioContenido = document.getElementById("anuncioContenido");

  var carouselTrack = document.getElementById("carouselTrack");
  var carouselPrev = document.getElementById("carouselPrev");
  var carouselNext = document.getElementById("carouselNext");
  var carouselIndicators = document.getElementById("carouselIndicators");
  var btnVerTodos = document.getElementById("btnVerTodos");
  var foroListContainer = document.getElementById("foroListContainer");
  var filterButtons = document.querySelectorAll(".filter-btn");

  var currentSlide = 0;
  var autoPlayId = null;
  var currentFilter = "recientes";
  var allAnuncios = [];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function parseDateFromMeta(meta) {
    if (!meta) return 0;
    var match = meta.match(/Publicado el\s+(.+?)\s+·/i);
    var source = match ? match[1].trim() : "";
    var parts = source.split(" ");
    if (parts.length < 3) return 0;
    var day = parseInt(parts[0], 10);
    var monthRaw = (parts[1] || "").toLowerCase();
    var year = parseInt(parts[2], 10);
    var months = {
      ene: 0, enero: 0,
      feb: 1, febrero: 1,
      mar: 2, marzo: 2,
      abr: 3, abril: 3,
      may: 4, mayo: 4,
      jun: 5, junio: 5,
      jul: 6, julio: 6,
      ago: 7, agosto: 7,
      sep: 8, septiembre: 8,
      oct: 9, octubre: 9,
      nov: 10, noviembre: 10,
      dic: 11, diciembre: 11
    };
    var month = months[monthRaw];
    if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) return 0;
    return new Date(year, month, day).getTime();
  }

  function readCard(article) {
    var titleEl = article.querySelector(".foro-card-title");
    var metaEl = article.querySelector(".foro-card-meta");
    var contentEl = article.querySelector(".foro-card-content");
    return {
      titulo: titleEl ? titleEl.textContent.trim() : "Sin título",
      meta: metaEl ? metaEl.textContent.trim() : "",
      contenido: contentEl ? contentEl.textContent.trim() : "",
      timestamp: parseDateFromMeta(metaEl ? metaEl.textContent : ""),
      el: article
    };
  }

  function collectAnuncios() {
    if (!foroList) return;
    var cards = foroList.querySelectorAll(".foro-card");
    allAnuncios = Array.prototype.map.call(cards, readCard);
  }

  function renderCarousel() {
    if (!carouselTrack || !carouselIndicators) return;
    carouselTrack.innerHTML = "";
    carouselIndicators.innerHTML = "";

    var destacados = allAnuncios.slice(0, Math.min(5, allAnuncios.length));
    if (destacados.length === 0) return;
    if (currentSlide >= destacados.length) currentSlide = 0;

    destacados.forEach(function (anuncio, index) {
      var slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.innerHTML =
        '<div class="carousel-card">' +
          '<h3 class="carousel-card-title">' + escapeHtml(anuncio.titulo) + "</h3>" +
          '<p class="carousel-card-meta">' + escapeHtml(anuncio.meta) + "</p>" +
          '<p class="carousel-card-content">' + escapeHtml(anuncio.contenido) + "</p>" +
        "</div>";
      carouselTrack.appendChild(slide);

      var indicator = document.createElement("button");
      indicator.type = "button";
      indicator.className = "carousel-indicator" + (index === currentSlide ? " active" : "");
      indicator.setAttribute("aria-label", "Ir al anuncio " + (index + 1));
      indicator.addEventListener("click", function () {
        goToSlide(index, destacados.length);
      });
      carouselIndicators.appendChild(indicator);
    });

    updateCarousel(destacados.length);
  }

  function goToSlide(index, total) {
    if (!total) return;
    if (index < 0) currentSlide = total - 1;
    else if (index >= total) currentSlide = 0;
    else currentSlide = index;
    updateCarousel(total);
  }

  function updateCarousel(total) {
    if (!carouselTrack || !total) return;
    carouselTrack.style.transform = "translateX(" + (-currentSlide * 100) + "%)";
    var indicators = carouselIndicators.querySelectorAll(".carousel-indicator");
    indicators.forEach(function (indicator, idx) {
      indicator.classList.toggle("active", idx === currentSlide);
    });
  }

  function startAutoPlay() {
    if (!carouselTrack) return;
    if (autoPlayId) clearInterval(autoPlayId);
    autoPlayId = setInterval(function () {
      var total = Math.min(5, allAnuncios.length);
      if (total > 1) goToSlide(currentSlide + 1, total);
    }, 6000);
  }

  function applyFilter(filter) {
    currentFilter = filter;
    if (!foroList) return;
    var sorted = allAnuncios.slice().sort(function (a, b) {
      return currentFilter === "antiguos" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
    });
    sorted.forEach(function (item) {
      foroList.appendChild(item.el);
    });
    filterButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === filter);
    });
  }

  function toggleList() {
    if (!foroListContainer) return;
    var open = !foroListContainer.hidden;
    foroListContainer.hidden = open;
    if (btnVerTodos) {
      btnVerTodos.innerHTML = open
        ? '<svg viewBox="0 0 24 24" fill="none"><path d="M4 6H20M4 12H20M4 18H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Ver todos los anuncios'
        : '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Ocultar lista completa';
    }
  }

  function abrirModalAnuncio() {
    if (!modalAnuncio) return;
    modalAnuncio.classList.add("active");
    modalAnuncio.setAttribute("aria-hidden", "false");
    if (anuncioTitulo) anuncioTitulo.value = "";
    if (anuncioContenido) anuncioContenido.value = "";
    if (anuncioTitulo) anuncioTitulo.focus();
  }

  function cerrarModalAnuncio() {
    if (!modalAnuncio) return;
    modalAnuncio.classList.remove("active");
    modalAnuncio.setAttribute("aria-hidden", "true");
  }

  if (btnNuevoAnuncio) btnNuevoAnuncio.addEventListener("click", abrirModalAnuncio);
  if (btnCancelarAnuncio) btnCancelarAnuncio.addEventListener("click", cerrarModalAnuncio);
  if (modalAnuncio) {
    modalAnuncio.addEventListener("click", function (e) {
      if (e.target === modalAnuncio) cerrarModalAnuncio();
    });
  }

  if (btnPublicarAnuncio && foroList && anuncioTitulo && anuncioContenido) {
    btnPublicarAnuncio.addEventListener("click", function () {
      var titulo = anuncioTitulo.value.trim();
      var contenido = anuncioContenido.value.trim();
      if (!titulo || !contenido) return;

      var fechaStr = new Date().toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });

      var card = document.createElement("article");
      card.className = "foro-card";
      card.innerHTML =
        '<h3 class="foro-card-title">' + escapeHtml(titulo) + "</h3>" +
        '<p class="foro-card-meta">Publicado el ' + fechaStr + " · MCA. Laura Trejo Medina</p>" +
        '<p class="foro-card-content">' + escapeHtml(contenido).replace(/\n/g, "<br>") + "</p>" +
        '<div class="foro-card-actions">' +
          '<button type="button" class="btn btn-outline btn-eliminar-anuncio">Eliminar</button>' +
        "</div>";
      foroList.insertBefore(card, foroList.firstChild);

      collectAnuncios();
      applyFilter(currentFilter);
      renderCarousel();
      startAutoPlay();
      cerrarModalAnuncio();
    });
  }

  if (foroList) {
    foroList.addEventListener("click", function (e) {
      if (!e.target || !e.target.classList.contains("btn-eliminar-anuncio")) return;
      var card = e.target.closest(".foro-card");
      if (!card) return;
      card.remove();
      collectAnuncios();
      applyFilter(currentFilter);
      renderCarousel();
    });
  }

  if (carouselPrev) {
    carouselPrev.addEventListener("click", function () {
      goToSlide(currentSlide - 1, Math.min(5, allAnuncios.length));
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener("click", function () {
      goToSlide(currentSlide + 1, Math.min(5, allAnuncios.length));
    });
  }

  if (btnVerTodos) btnVerTodos.addEventListener("click", toggleList);
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-filter") || "recientes");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalAnuncio && modalAnuncio.classList.contains("active")) {
      cerrarModalAnuncio();
    }
  });

  collectAnuncios();
  applyFilter(currentFilter);
  renderCarousel();
  startAutoPlay();
})();
