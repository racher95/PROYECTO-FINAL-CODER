// Navegación y badge del carrito - Dulce Estrellita

// Detectar ruta base según ubicación de página
const NAV_BASE_PATH = window.location.pathname.includes("/pages/")
  ? ""
  : "pages/";

function updateCartBadge() {
  const count = cartCount();
  const cartLinks = document.querySelectorAll('a.nav-link[href*="carrito"]');

  cartLinks.forEach((link) => {
    // Buscar badge existente o crear uno nuevo
    let badge = link.querySelector(".badge");

    if (count > 0) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "badge bg-danger rounded-pill ms-1";
        link.appendChild(badge);
      }
      badge.textContent = count;
    } else {
      // Si no hay items, quitar badge
      if (badge) badge.remove();
    }
  });
}

// Actualizar navbar con estado de sesión
function updateAuthNav() {
  const navbarNav = document.querySelector("#navbarNav .navbar-nav");
  if (!navbarNav) return;

  // Buscar o crear el item de auth
  let authItem = document.getElementById("authNavItem");

  if (!authItem) {
    authItem = document.createElement("li");
    authItem.className = "nav-item";
    authItem.id = "authNavItem";
    navbarNav.appendChild(authItem);
  }

  const session = typeof getSession === "function" ? getSession() : null;

  if (session) {
    // Usuario logueado - mostrar nombre y logout
    authItem.innerHTML = `
      <div class="dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button"
           data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1 nav-user-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          ${session.nombre.split(" ")[0]}
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><span class="dropdown-item-text text-muted">${
            session.email
          }</span></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="${NAV_BASE_PATH}orders.html">Mis Pedidos</a></li>
          <li><a class="dropdown-item" href="#" id="logoutBtn">Cerrar sesión</a></li>
        </ul>
      </div>
    `;

    // Agregar evento de logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof logout === "function") {
          logout();
          window.location.reload();
        }
      });
    }
  } else {
    // No logueado - mostrar link a login
    authItem.innerHTML = `
      <a class="nav-link" href="${NAV_BASE_PATH}login.html">Ingresar</a>
    `;
  }
}

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  updateAuthNav();
});

// Escuchar cambios en el carrito
window.addEventListener("cart:updated", updateCartBadge);

// Escuchar cambios de autenticación
window.addEventListener("auth:changed", updateAuthNav);
