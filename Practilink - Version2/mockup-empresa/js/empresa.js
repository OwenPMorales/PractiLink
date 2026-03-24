(function () {
  var COMPANIES_KEY = 'pl_companies';
  var CURRENT_KEY = 'pl_current_company';
  var VACANTES_KEY = 'pl_vacantes';
  var POSTULACIONES_KEY = 'pl_postulaciones';

  function safeParse(item) {
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }

  function getCompanies() {
    var raw = localStorage.getItem(COMPANIES_KEY);
    var parsed = safeParse(raw);
    if (!Array.isArray(parsed)) {
      parsed = [];
      localStorage.setItem(COMPANIES_KEY, JSON.stringify(parsed));
    }
    return parsed;
  }

  function saveCompanies(list) {
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(list || []));
  }

  function getCurrentCompany() {
    var id = localStorage.getItem(CURRENT_KEY);
    if (!id) return null;
    return getCompanies().find(function (c) { return c.id === id; }) || null;
  }

  function setCurrentCompany(id) {
    if (!id) {
      localStorage.removeItem(CURRENT_KEY);
      return;
    }
    localStorage.setItem(CURRENT_KEY, id);
  }

  function registerCompany(data) {
    var companies = getCompanies();
    if (companies.some(function (c) { return c.email === data.email; })) {
      return { ok: false, error: 'Ya existe una empresa con ese correo.' };
    }
    var id = 'empresa-' + Date.now();
    var newCompany = Object.assign({
      id: id,
      createdAt: new Date().toISOString(),
      status: 'active'
    }, data);
    companies.push(newCompany);
    saveCompanies(companies);
    setCurrentCompany(id);
    return { ok: true, company: newCompany };
  }

  function updateCompany(data) {
    var company = getCurrentCompany();
    if (!company) return { ok: false, error: 'No hay empresa activa.' };
    var companies = getCompanies();
    var found = companies.find(function (c) { return c.id === company.id; });
    if (!found) return { ok: false, error: 'Empresa no encontrada.' };
    Object.assign(found, data);
    saveCompanies(companies);
    return { ok: true, company: found };
  }

  function getVacancies() {
    var raw = localStorage.getItem(VACANTES_KEY);
    var parsed = safeParse(raw);
    if (!Array.isArray(parsed)) {
      parsed = [];
      localStorage.setItem(VACANTES_KEY, JSON.stringify(parsed));
    }
    return parsed;
  }

  function saveVacancies(list) {
    localStorage.setItem(VACANTES_KEY, JSON.stringify(list || []));
  }

  function getVacanciesByCompany(companyId) {
    return getVacancies().filter(function (v) { return v.companyId === companyId; });
  }

  function getVacancyById(id) {
    return getVacancies().find(function (v) { return v.id === id; }) || null;
  }

  function addVacancy(vacancy) {
    var company = getCurrentCompany();
    if (!company) return { ok: false, error: 'No hay empresa activa.' };
    var vacs = getVacancies();
    var id = 'vacante-' + Date.now();
    var newVac = Object.assign({
      id: id,
      companyId: company.id,
      createdAt: new Date().toISOString(),
      status: 'pending',
      applications: []
    }, vacancy);
    vacs.push(newVac);
    saveVacancies(vacs);
    return { ok: true, vacancy: newVac };
  }

  function updateVacancy(id, data) {
    var vacs = getVacancies();
    var found = vacs.find(function (v) { return v.id === id; });
    if (!found) return { ok: false, error: 'Vacante no encontrada.' };
    Object.assign(found, data);
    saveVacancies(vacs);
    return { ok: true, vacancy: found };
  }

  function deleteVacancy(id) {
    var vacs = getVacancies();
    var filtered = vacs.filter(function (v) { return v.id !== id; });
    saveVacancies(filtered);
    return { ok: true };
  }

  function getApplications() {
    var raw = localStorage.getItem(POSTULACIONES_KEY);
    var parsed = safeParse(raw);
    if (!Array.isArray(parsed)) {
      parsed = [];
      localStorage.setItem(POSTULACIONES_KEY, JSON.stringify(parsed));
    }
    return parsed;
  }

  function saveApplications(list) {
    localStorage.setItem(POSTULACIONES_KEY, JSON.stringify(list || []));
  }

  function getApplicationsByCompany(companyId) {
    var vacs = getVacanciesByCompany(companyId).map(function (v) { return v.id; });
    return getApplications().filter(function (a) { return vacs.includes(a.vacancyId); });
  }

  function addApplication(application) {
    var apps = getApplications();
    var id = 'post-' + Date.now();
    var newApp = Object.assign({
      id: id,
      createdAt: new Date().toISOString(),
      status: 'pendiente',
      progress: 0
    }, application);
    apps.push(newApp);
    saveApplications(apps);
    return { ok: true, application: newApp };
  }

  function updateApplicationStatus(id, status) {
    var apps = getApplications();
    var found = apps.find(function (a) { return a.id === id; });
    if (!found) return { ok: false, error: 'Postulación no encontrada' };
    found.status = status;
    saveApplications(apps);
    return { ok: true, application: found };
  }

  function updateApplicationProgress(id, progress) {
    var apps = getApplications();
    var found = apps.find(function (a) { return a.id === id; });
    if (!found) return { ok: false, error: 'Postulación no encontrada' };
    found.progress = Math.max(0, Math.min(100, progress));
    if (found.progress >= 100) {
      found.status = 'finalizado';
    } else if (found.status === 'finalizado') {
      found.status = 'aceptado';
    }
    saveApplications(apps);
    return { ok: true, application: found };
  }

  function downloadPDF(filename, content) {
    var blob = new Blob([content], { type: 'application/pdf' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  window.Empresa = {
    getCompanies: getCompanies,
    getCurrentCompany: getCurrentCompany,
    setCurrentCompany: setCurrentCompany,
    registerCompany: registerCompany,
    updateCompany: updateCompany,
    getVacancies: getVacancies,
    getVacanciesByCompany: getVacanciesByCompany,
    getVacancyById: getVacancyById,
    addVacancy: addVacancy,
    updateVacancy: updateVacancy,
    deleteVacancy: deleteVacancy,
    getApplicationsByCompany: getApplicationsByCompany,
    addApplication: addApplication,
    updateApplicationStatus: updateApplicationStatus,
    updateApplicationProgress: updateApplicationProgress,
    downloadPDF: downloadPDF
  };
})();
