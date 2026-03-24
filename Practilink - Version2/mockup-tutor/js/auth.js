/*
  Mock Auth / Users (localStorage)
  - Mantiene una "tabla" de usuarios en localStorage
  - Permite login, logout, registro y activar/desactivar
*/
(function () {
  var STORAGE_KEY = 'pl_users';
  var SESSION_KEY = 'pl_current_user';

  var defaultUsers = [
    { email: 'tutor@utt.edu.mx', password: 'tutor123', role: 'tutor', active: true, name: 'MCA. Laura Trejo Medina' },
    { email: 'alumno@utt.edu.mx', password: 'alumno123', role: 'alumno', active: true, name: 'Alumno de Prueba' },
    { email: 'vinculacion@utt.edu.mx', password: 'vincu123', role: 'vinculacion', active: true, name: 'Área de Vinculación' },
    { email: 'empresa@utt.edu.mx', password: 'empresa123', role: 'empresa', active: true, name: 'Empresa Socio' }
  ];

  function getUsers() {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
      return defaultUsers.slice();
    }
    try {
      return JSON.parse(raw) || [];
    } catch (e) {
      console.warn('Usuario: no se pudo parsear storage, reseteando.', e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
      return defaultUsers.slice();
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users || []));
  }

  function getCurrentUser() {
    var raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function login(email, password) {
    var users = getUsers();
    var user = users.find(function (u) {
      return u.email.toLowerCase() === (email || '').trim().toLowerCase() && u.password === (password || '');
    });
    if (!user) return { ok: false, error: 'Usuario o contraseña incorrectos.' };
    if (!user.active) return { ok: false, error: 'La cuenta está desactivada. Contacta al área de vinculación.' };
    setCurrentUser({ email: user.email, role: user.role, name: user.name });
    return { ok: true, user: getCurrentUser() };
  }

  function logout() {
    setCurrentUser(null);
    window.location.href = 'login.html';
  }

  function registerUser(email, password, role, name) {
    if (!email || !password || !role) return { ok: false, error: 'Faltan datos obligatorios.' };
    var users = getUsers();
    if (users.some(function (u) { return u.email.toLowerCase() === email.trim().toLowerCase(); })) {
      return { ok: false, error: 'Ya existe un usuario con ese correo.' };
    }
    var newUser = {
      email: email.trim().toLowerCase(),
      password: password,
      role: role,
      active: true,
      name: name || 'Nuevo usuario'
    };
    users.push(newUser);
    saveUsers(users);
    return { ok: true, user: newUser };
  }

  function toggleUserActive(email) {
    var users = getUsers();
    var found = users.find(function (u) { return u.email.toLowerCase() === (email || '').trim().toLowerCase(); });
    if (!found) return false;
    found.active = !found.active;
    saveUsers(users);
    return true;
  }

  function ensureAuth(allowedRoles) {
    // Access restrictions are disabled in this mock environment.
    // This keeps the menu usable como navegación sin obligar a iniciar sesión.
    return true;
  }

  window.PLAuth = {
    getUsers: getUsers,
    getCurrentUser: getCurrentUser,
    login: login,
    logout: logout,
    registerUser: registerUser,
    toggleUserActive: toggleUserActive,
    ensureAuth: ensureAuth,
    setCurrentUser: setCurrentUser
  };
})();
