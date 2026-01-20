// Autenticación - Dulce Estrellita
// Sistema de login/registro con localStorage (sin backend)

// Hash simple con SHA-256 (Web Crypto API)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Obtener usuarios guardados
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Guardar usuarios
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Obtener sesión activa
function getSession() {
  return JSON.parse(localStorage.getItem("session")) || null;
}

// Guardar sesión
function saveSession(user) {
  // Guardar sin password por seguridad
  const sessionData = {
    email: user.email,
    nombre: user.nombre,
    loggedAt: new Date().toISOString(),
  };
  localStorage.setItem("session", JSON.stringify(sessionData));
  notifyAuthChange();
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("session");
  notifyAuthChange();
}

// Registrar nuevo usuario
async function registerUser(nombre, email, password) {
  const users = getUsers();

  // Verificar si ya existe
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: "El email ya está registrado" };
  }

  // Crear usuario
  const hashedPassword = await hashPassword(password);
  const newUser = {
    id: Date.now().toString(36),
    nombre: nombre.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

// Login
async function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  );

  if (!user) {
    return { success: false, message: "Usuario no encontrado" };
  }

  const hashedPassword = await hashPassword(password);
  if (user.password !== hashedPassword) {
    return { success: false, message: "Contraseña incorrecta" };
  }

  // Transferir carrito de guest al usuario
  if (typeof transferGuestCart === "function") {
    transferGuestCart(user.email);
  }

  saveSession(user);
  return { success: true, user };
}

// Evento personalizado para cambios de autenticación
function notifyAuthChange() {
  window.dispatchEvent(new CustomEvent("auth:changed"));
}

// Verificar si hay sesión activa
function isLoggedIn() {
  return getSession() !== null;
}
