/**
 * Documentos - Modales de documento e historial
 */
(function() {
  var modalDocumento = document.getElementById('modalDocumento');
  var docPreviewMeta = document.getElementById('docPreviewMeta');
  var docComentario = document.getElementById('docComentario');
  var docCommentsList = document.getElementById('docCommentsList');
  var btnAgregarComentario = document.getElementById('btnAgregarComentario');
  var btnDescargarDesdeModal = document.getElementById('btnDescargarDesdeModal');
  var btnCerrarDoc = document.getElementById('btnCerrarDoc');

  var modalStatusDocs = document.getElementById('modalStatusDocs');
  var statusCategory = document.getElementById('statusCategory');
  var statusDocumentList = document.getElementById('statusDocumentList');
  var statusCommentsPanel = document.getElementById('statusCommentsPanel');
  var btnCerrarStatus = document.getElementById('btnCerrarStatus');

  var modalLectorDocumento = document.getElementById('modalLectorDocumento');
  var btnAbrirLector = document.getElementById('btnAbrirLector');
  var btnCerrarLector = document.getElementById('btnCerrarLector');
  var lectorDocumentoTitulo = document.getElementById('lectorDocumentoTitulo');

  var documentStatusData = {
    revisados: [
      {
        alumno: 'Fernando Torres Mejia',
        documento: 'Tesina - Version final.pdf',
        comentarios: ['Excelente estructura, solo faltan referencias.']
      },
      {
        alumno: 'Diego Hernandez Vega',
        documento: 'Tesina - Capitulo 1 revisado.pdf',
        comentarios: ['Revisar formato APA en la sección 2.', 'Agregar resumen ejecutivo.']
      }
    ],
    rechazados: [],
    aceptados: []
  };

  var btnAprobarDoc = document.getElementById('btnAprobarDoc');
  var btnRechazarDoc = document.getElementById('btnRechazarDoc');
  var modalHistorialDocs = document.getElementById('modalHistorialDocs');
  var historialAlumnoNombre = document.getElementById('historialAlumnoNombre');
  var btnCerrarHistorial = document.getElementById('btnCerrarHistorial');

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function abrirModalDocumento(alumno, doc) {
    if (!modalDocumento) return;
    modalDocumento.classList.add('active');
    modalDocumento.setAttribute('aria-hidden', 'false');
    if (docPreviewMeta) docPreviewMeta.textContent = alumno + ' - ' + doc;
    if (docComentario) docComentario.value = '';
    if (docCommentsList) docCommentsList.innerHTML = '<p class="doc-comment-empty">Sin comentarios por el momento. Agrega tus observaciones para el alumno.</p>';
  }

  function cerrarModalDocumento() {
    if (modalDocumento) {
      modalDocumento.classList.remove('active');
      modalDocumento.setAttribute('aria-hidden', 'true');
    }
  }

  function abrirModalHistorial(alumno) {
    if (!modalHistorialDocs) return;
    modalHistorialDocs.classList.add('active');
    modalHistorialDocs.setAttribute('aria-hidden', 'false');
    if (historialAlumnoNombre) historialAlumnoNombre.textContent = 'Alumno: ' + alumno;
  }

  function cerrarModalHistorial() {
    if (modalHistorialDocs) {
      modalHistorialDocs.classList.remove('active');
      modalHistorialDocs.setAttribute('aria-hidden', 'true');
    }
  }

  function abrirModalStatus(estado) {
    if (!modalStatusDocs) return;
    modalStatusDocs.classList.add('active');
    modalStatusDocs.setAttribute('aria-hidden', 'false');
    var datos = documentStatusData[estado] || [];
    if (statusCategory) statusCategory.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);

    statusDocumentList.innerHTML = '';
    statusCommentsPanel.innerHTML = '';

    if (!datos.length) {
      statusDocumentList.innerHTML = '<li style="padding: 8px; color: #6B7280;">No hay documentos para esta categoría.</li>';
      return;
    }

    datos.forEach(function(item, index) {
      var li = document.createElement('li');
      li.style.cursor = 'pointer';
      li.style.padding = '8px';
      li.style.borderBottom = '1px solid #E5E7EB';
      li.textContent = item.alumno + ' - ' + item.documento;
      li.addEventListener('click', function() {
        statusCommentsPanel.innerHTML = '';
        if (!item.comentarios || !item.comentarios.length) {
          statusCommentsPanel.innerHTML = '<p style="color:#6B7280;">Sin comentarios por el momento.</p>';
          return;
        }
        item.comentarios.forEach(function(cmt) {
          var p = document.createElement('p');
          p.style.margin = '0 0 8px';
          p.textContent = '• ' + cmt;
          statusCommentsPanel.appendChild(p);
        });
      });
      statusDocumentList.appendChild(li);
      if (index === 0) {
        li.click();
      }
    });
  }

  function cerrarModalStatus() {
    if (modalStatusDocs) {
      modalStatusDocs.classList.remove('active');
      modalStatusDocs.setAttribute('aria-hidden', 'true');
    }
  }

  function abrirModalLector(alumno, doc) {
    if (!modalLectorDocumento) return;
    modalLectorDocumento.classList.add('active');
    modalLectorDocumento.setAttribute('aria-hidden', 'false');
    if (lectorDocumentoTitulo) {
      lectorDocumentoTitulo.textContent = 'Lector de Documento - ' + alumno + ' - ' + doc;
    }
  }

  function cerrarModalLector() {
    if (modalLectorDocumento) {
      modalLectorDocumento.classList.remove('active');
      modalLectorDocumento.setAttribute('aria-hidden', 'true');
    }
  }

  function actualizarContadoresStatus() {
    var revisadosCount = documentStatusData.revisados.length;
    var rechazadosCount = documentStatusData.rechazados.length;
    var aceptadosCount = documentStatusData.aceptados.length;

    var cRev = document.getElementById('count-revisados');
    var cRec = document.getElementById('count-rechazados');
    var cAcep = document.getElementById('count-aceptados');

    if (cRev) cRev.textContent = revisadosCount + ' documentos';
    if (cRec) cRec.textContent = rechazadosCount + ' documentos';
    if (cAcep) cAcep.textContent = aceptadosCount + ' documentos';
  }

  actualizarContadoresStatus();

  document.querySelectorAll('.btn-doc-ver').forEach(function(btn) {
    btn.addEventListener('click', function() {
      abrirModalDocumento(this.getAttribute('data-alumno'), this.getAttribute('data-doc'));
    });
  });

  document.querySelectorAll('.btn-doc-descargar').forEach(function(btn) {
    btn.addEventListener('click', function() {
      alert('Descarga de documento simulada para este prototipo.');
    });
  });

  if (btnDescargarDesdeModal) {
    btnDescargarDesdeModal.addEventListener('click', function() {
      alert('Descarga de documento simulada para este prototipo.');
    });
  }

  document.querySelectorAll('.btn-doc-historial').forEach(function(btn) {
    btn.addEventListener('click', function() {
      abrirModalHistorial(this.getAttribute('data-alumno'));
    });
  });

  document.querySelectorAll('.btn-open-status').forEach(function(btn) {
    btn.addEventListener('click', function() {
      abrirModalStatus(this.getAttribute('data-status'));
    });
  });

  if (btnCerrarDoc) btnCerrarDoc.addEventListener('click', cerrarModalDocumento);
  if (modalDocumento) {
    modalDocumento.addEventListener('click', function(e) {
      if (e.target === modalDocumento) cerrarModalDocumento();
    });
  }

  if (btnAprobarDoc) {
    btnAprobarDoc.addEventListener('click', function() {
      alert('Documento aprobado (accion simulada).');
      cerrarModalDocumento();
    });
  }
  if (btnRechazarDoc) {
    btnRechazarDoc.addEventListener('click', function() {
      alert('Documento marcado como rechazado (accion simulada).');
      cerrarModalDocumento();
    });
  }

  if (btnAgregarComentario && docComentario && docCommentsList) {
    btnAgregarComentario.addEventListener('click', function() {
      var texto = docComentario.value.trim();
      if (!texto) return;
      if (docCommentsList.querySelector('.doc-comment-empty')) docCommentsList.innerHTML = '';
      var item = document.createElement('div');
      item.className = 'doc-comment-item';
      var opts = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      var fechaStr = new Date().toLocaleDateString('es-MX', opts);
      item.innerHTML = '<span>' + esc(texto) + '</span><span class="doc-comment-meta">Comentario del tutor · ' + fechaStr + '</span>';
      docCommentsList.appendChild(item);
      docComentario.value = '';
    });
  }

  if (btnCerrarHistorial) btnCerrarHistorial.addEventListener('click', cerrarModalHistorial);
  if (modalHistorialDocs) {
    modalHistorialDocs.addEventListener('click', function(e) {
      if (e.target === modalHistorialDocs) cerrarModalHistorial();
    });
  }

  if (btnCerrarStatus) btnCerrarStatus.addEventListener('click', cerrarModalStatus);
  if (modalStatusDocs) {
    modalStatusDocs.addEventListener('click', function(e) {
      if (e.target === modalStatusDocs) cerrarModalStatus();
    });
  }

  if (btnAbrirLector) {
    btnAbrirLector.addEventListener('click', function() {
      var alumno = docPreviewMeta ? docPreviewMeta.textContent.split(' - ')[0] : '';
      var doc = docPreviewMeta ? docPreviewMeta.textContent.split(' - ')[1] : '';
      abrirModalLector(alumno, doc);
    });
  }

  if (btnCerrarLector) btnCerrarLector.addEventListener('click', cerrarModalLector);
  if (modalLectorDocumento) {
    modalLectorDocumento.addEventListener('click', function(e) {
      if (e.target === modalLectorDocumento) cerrarModalLector();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (modalDocumento && modalDocumento.classList.contains('active')) cerrarModalDocumento();
      if (modalHistorialDocs && modalHistorialDocs.classList.contains('active')) cerrarModalHistorial();
      if (modalStatusDocs && modalStatusDocs.classList.contains('active')) cerrarModalStatus();
      if (modalLectorDocumento && modalLectorDocumento.classList.contains('active')) cerrarModalLector();
    }
  });
})();
