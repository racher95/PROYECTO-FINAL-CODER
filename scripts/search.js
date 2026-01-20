// Búsqueda global desde el navbar
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("navSearchForm");
  const input = document.getElementById("navSearchInput");

  if (!form || !input) return;

  // Determinar rutas según ubicación
  const isInPages = window.location.pathname.includes("/pages/");
  const catalogoUrl = isInPages ? "catalogo.html" : "pages/catalogo.html";

  // Si estamos en catálogo, cargar término de búsqueda desde URL
  if (
    window.location.pathname.includes("catalogo.html") ||
    window.location.pathname.endsWith("catalogo")
  ) {
    const params = new URLSearchParams(window.location.search);
    const busqueda = params.get("q");
    if (busqueda) {
      // Actualizar el input del navbar
      input.value = busqueda;
      // Disparar evento para que catalogo.js lo capture
      window.dispatchEvent(
        new CustomEvent("navSearch", { detail: { query: busqueda } })
      );
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      // Redirigir a catálogo con parámetro de búsqueda
      window.location.href = `${catalogoUrl}?q=${encodeURIComponent(query)}`;
    }
  });
});
