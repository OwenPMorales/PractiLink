(function () {
  var STORAGE_KEY = 'pl_periodos';

  function defaultPeriods() {
    return [
      {
        id: 'period-1',
        name: 'Feb – Jun 2026',
        career: 'DSM · Desarrollo de Software Multiplataforma',
        start: '2026-02-03',
        end: '2026-06-20',
        postulationDeadline: '2026-02-28',
        documentsDeadline: '2026-03-15',
        status: 'active',
        stats: { alumnos: 68, activos: 45, pendientes: 12, sinAsignar: 11 }
      },
      {
        id: 'period-2',
        name: 'Feb – Jun 2026',
        career: 'IA · Inteligencia Artificial',
        start: '2026-02-03',
        end: '2026-06-20',
        postulationDeadline: '2026-02-28',
        documentsDeadline: '2026-03-15',
        status: 'active',
        stats: { alumnos: 42, activos: 30, pendientes: 7, sinAsignar: 5 }
      },
      {
        id: 'period-3',
        name: 'Feb – Jun 2026',
        career: 'MKT · Mercadotecnia',
        start: '2026-02-10',
        end: '2026-06-20',
        postulationDeadline: '2026-03-07',
        documentsDeadline: '2026-03-21',
        status: 'upcoming',
        stats: { alumnos: 32, activos: 0, pendientes: 0, sinAsignar: 32 }
      },
      {
        id: 'period-4',
        name: 'Ago – Dic 2025',
        career: 'DSM · Desarrollo de Software Multiplataforma',
        start: '2025-08-12',
        end: '2025-12-20',
        postulationDeadline: '2025-09-05',
        documentsDeadline: '2025-09-20',
        status: 'closed',
        stats: { alumnos: 61, completados: 57, incompletos: 4, sinAsignar: 0 }
      }
    ];
  }

  function getPeriods() {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      var def = defaultPeriods();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    try {
      return JSON.parse(raw) || [];
    } catch (e) {
      console.warn('No se pudo parsear los periodos, se resetea.', e);
      var def = defaultPeriods();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
  }

  function savePeriods(periods) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(periods || []));
  }

  function getPeriodStatus(period) {
    if (period.status === 'closed') return 'closed';
    var today = new Date().toISOString().split('T')[0];
    if (period.start && period.start > today) return 'upcoming';
    if (period.end && period.end < today) return 'closed';
    return 'active';
  }

  function normalizePeriod(period) {
    var status = getPeriodStatus(period);
    return Object.assign({}, period, { status: status });
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('es-MX');
  }

  function buildPeriodCard(period) {
    var status = normalizePeriod(period).status;
    var pillClass = status === 'active' ? 'pill-active' : status === 'upcoming' ? 'pill-upcoming' : 'pill-closed';
    var pillLabel = status === 'active' ? 'Activo' : status === 'upcoming' ? 'Por iniciar' : 'Cerrado';
    var cardClass = status === 'closed' ? 'period-card closed' : status === 'upcoming' ? 'period-card upcoming' : 'period-card';

    var statsHtml = '';
    if (status === 'closed') {
      statsHtml =
        '<div class="period-stats">' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.alumnos || 0) + '</div><div class="pstat-lbl">Alumnos</div></div>' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.completados || 0) + '</div><div class="pstat-lbl">Completados</div></div>' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.incompletos || 0) + '</div><div class="pstat-lbl">Incompletos</div></div>' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.sinAsignar || 0) + '</div><div class="pstat-lbl">Sin asignar</div></div>' +
        '</div>';
    } else {
      statsHtml =
        '<div class="period-stats">' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.alumnos || 0) + '</div><div class="pstat-lbl">Alumnos</div></div>' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.activos || 0) + '</div><div class="pstat-lbl">Activos</div></div>' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.pendientes || 0) + '</div><div class="pstat-lbl">Pendientes</div></div>' +
        '  <div class="pstat"><div class="pstat-num">' + (period.stats?.sinAsignar || 0) + '</div><div class="pstat-lbl">Sin asignar</div></div>' +
        '</div>';
    }

    var progress = 0;
    if (status === 'active' && period.start && period.end) {
      var start = new Date(period.start).getTime();
      var end = new Date(period.end).getTime();
      var now = Date.now();
      if (end > start) {
        progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
      }
    }

    return (
      '<div class="' + cardClass + '">' +
      '  <div class="period-header">' +
      '    <div>' +
      '      <div class="period-name">' + period.name + '</div>' +
      '      <div class="period-carrera">' + period.career + '</div>' +
      '    </div>' +
      '    <span class="status-pill ' + pillClass + '">' + pillLabel + '</span>' +
      '  </div>' +
      '  <div class="period-dates">' +
      '    <div class="date-item"><div class="date-label">Inicio</div><div class="date-value">' + formatDate(period.start) + '</div></div>' +
      '    <div class="date-item"><div class="date-label">Cierre</div><div class="date-value">' + formatDate(period.end) + '</div></div>' +
      '    <div class="date-item"><div class="date-label">Límite postulación</div><div class="date-value">' + formatDate(period.postulationDeadline) + '</div></div>' +
      '    <div class="date-item"><div class="date-label">Entrega documentos</div><div class="date-value">' + formatDate(period.documentsDeadline) + '</div></div>' +
      '  </div>' +
      statsHtml +
      '  <div class="progress-bar"><div class="progress-fill" style="width:' + Math.round(progress) + '%"></div></div>' +
      '  <div class="card-actions">' +
      '    <button class="btn-sm btn-edit" onclick="Vinculacion.openEditPeriod(\'' + period.id + '\')">Editar</button>' +
      '    <button class="btn-sm btn-view-sm" onclick="Vinculacion.openViewPeriod(\'' + period.id + '\')">Ver detalle</button>' +
      (status !== 'closed'
        ? '    <button class="btn-sm btn-close-period" onclick="Vinculacion.confirmClosePeriod(\'' + period.id + '\')">Cerrar</button>'
        : '') +
      '  </div>' +
      '</div>'
    );
  }

  function renderTabs(periods) {
    var counts = { active: 0, upcoming: 0, closed: 0, all: periods.length };
    periods.forEach(function (p) {
      var s = normalizePeriod(p).status;
      counts[s] = (counts[s] || 0) + 1;
    });

    var tabButtons = document.querySelectorAll('.tabs .tab');
    tabButtons.forEach(function (btn) {
      var key = btn.getAttribute('data-status');
      if (!key) return;
      var label = btn.textContent.replace(/\(.*\)/, '').trim();
      btn.textContent = label + ' (' + (counts[key] || 0) + ')';
    });
  }

  function filterByTab(periods, status) {
    if (!status || status === 'all') return periods;
    return periods.filter(function (p) { return normalizePeriod(p).status === status; });
  }

  function renderPeriods(selectedStatus) {
    var periods = getPeriods();
    renderTabs(periods);

    var filtered = filterByTab(periods, selectedStatus);
    var container = document.getElementById('periodsGrid');
    if (!container) return;

    if (!filtered.length) {
      container.innerHTML = '<div style="grid-column:1/-1; padding: 40px 20px; text-align:center; color:#555;">No hay periodos que coincidan con el filtro.</div>';
      return;
    }

    container.innerHTML = filtered.map(buildPeriodCard).join('');
  }

  function closePeriod(id) {
    var periods = getPeriods();
    var found = periods.find(function (p) { return p.id === id; });
    if (!found) return;
    found.status = 'closed';
    savePeriods(periods);
    renderPeriods(getSelectedTab());
  }

  function getSelectedTab() {
    var active = document.querySelector('.tabs .tab.active');
    return active ? active.getAttribute('data-status') : 'active';
  }

  function setActiveTab(tabEl) {
    document.querySelectorAll('.tabs .tab').forEach(function (t) { t.classList.remove('active'); });
    if (tabEl) tabEl.classList.add('active');
  }

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  function resetNewModal() {
    document.getElementById('newPeriodName').value = '';
    document.getElementById('newPeriodCareer').value = '';
    document.getElementById('newPeriodStart').value = '';
    document.getElementById('newPeriodEnd').value = '';
    document.getElementById('newPeriodPostulation').value = '';
    document.getElementById('newPeriodDocuments').value = '';
  }

  function createNewPeriod() {
    var name = document.getElementById('newPeriodName').value.trim();
    var career = document.getElementById('newPeriodCareer').value;
    var start = document.getElementById('newPeriodStart').value;
    var end = document.getElementById('newPeriodEnd').value;
    var postulation = document.getElementById('newPeriodPostulation').value;
    var documents = document.getElementById('newPeriodDocuments').value;

    if (!name || !career || !start || !end || !postulation || !documents) {
      alert('Por favor completa todos los campos.');
      return;
    }

    var periods = getPeriods();
    var id = 'period-' + Date.now();
    periods.unshift({
      id: id,
      name: name,
      career: career,
      start: start,
      end: end,
      postulationDeadline: postulation,
      documentsDeadline: documents,
      status: 'upcoming',
      stats: { alumnos: 0, activos: 0, pendientes: 0, sinAsignar: 0 }
    });

    savePeriods(periods);
    closeModal('modalNuevo');
    resetNewModal();
    renderPeriods(getSelectedTab());
  }

  function openEditPeriod(id) {
    var periods = getPeriods();
    var found = periods.find(function (p) { return p.id === id; });
    if (!found) return;

    document.getElementById('editPeriodId').value = found.id;
    document.getElementById('editPeriodName').value = found.name;
    document.getElementById('editPeriodCareer').value = found.career;
    document.getElementById('editPeriodStart').value = found.start;
    document.getElementById('editPeriodEnd').value = found.end;
    document.getElementById('editPeriodPostulation').value = found.postulationDeadline;
    document.getElementById('editPeriodDocuments').value = found.documentsDeadline;

    openModal('modalEdit');
  }

  function saveEditedPeriod() {
    var id = document.getElementById('editPeriodId').value;
    var name = document.getElementById('editPeriodName').value.trim();
    var career = document.getElementById('editPeriodCareer').value;
    var start = document.getElementById('editPeriodStart').value;
    var end = document.getElementById('editPeriodEnd').value;
    var postulation = document.getElementById('editPeriodPostulation').value;
    var documents = document.getElementById('editPeriodDocuments').value;

    if (!id || !name || !career || !start || !end || !postulation || !documents) {
      alert('Por favor completa todos los campos.');
      return;
    }

    var periods = getPeriods();
    var found = periods.find(function (p) { return p.id === id; });
    if (!found) return;

    found.name = name;
    found.career = career;
    found.start = start;
    found.end = end;
    found.postulationDeadline = postulation;
    found.documentsDeadline = documents;

    savePeriods(periods);
    closeModal('modalEdit');
    renderPeriods(getSelectedTab());
  }

  function openViewPeriod(id) {
    var periods = getPeriods();
    var found = periods.find(function (p) { return p.id === id; });
    if (!found) return;
    alert('Detalle del periodo:\n\n' +
      'Nombre: ' + found.name + '\n' +
      'Carrera: ' + found.career + '\n' +
      'Inicio: ' + formatDate(found.start) + '\n' +
      'Cierre: ' + formatDate(found.end) + '\n' +
      'Límite de postulación: ' + formatDate(found.postulationDeadline) + '\n' +
      'Límite entrega de documentos: ' + formatDate(found.documentsDeadline) + '\n' +
      'Estado: ' + normalizePeriod(found).status
    );
  }

  function confirmClosePeriod(id) {
    var periods = getPeriods();
    var found = periods.find(function (p) { return p.id === id; });
    if (!found) return;
    if (!confirm('¿Cerrar este periodo? Esto lo marcará como finalizado y ya no podrá reabrirse.')) return;
    closePeriod(id);
  }

  function init() {

    document.querySelectorAll('.tabs .tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveTab(tab);
        renderPeriods(tab.getAttribute('data-status'));
      });
    });

    document.getElementById('btnCreatePeriod')?.addEventListener('click', createNewPeriod);
    document.getElementById('btnCancelNew')?.addEventListener('click', function () { closeModal('modalNuevo'); });
    document.getElementById('btnCancelEdit')?.addEventListener('click', function () { closeModal('modalEdit'); });
    document.getElementById('btnSaveEdit')?.addEventListener('click', saveEditedPeriod);

    renderPeriods(getSelectedTab());
  }

  window.Vinculacion = {
    openEditPeriod: openEditPeriod,
    openViewPeriod: openViewPeriod,
    confirmClosePeriod: confirmClosePeriod
  };

  document.addEventListener('DOMContentLoaded', init);
})();
