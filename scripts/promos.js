// Promos dinámicas - Dulce Estrellita

// Ruta base para imágenes (ajuste según ubicación de la página)
const BASE_PATH = window.location.pathname.includes("/pages/") ? "../" : "";

// Variable global para promos cargadas
let promosData = [];

async function cargarPromos() {
  try {
    const response = await fetch(`${BASE_PATH}data/promos.json`);
    if (!response.ok) throw new Error("Error al cargar promos");
    promosData = await response.json();
    return promosData;
  } catch (error) {
    console.error("Error cargando promos:", error);
    return [];
  }
}

function renderPromos(lista) {
  const container = document.getElementById("promosGrid");
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = `<div class="text-center"><p class="text-muted">No se encontraron promociones.</p></div>`;
    return;
  }

  container.innerHTML = lista
    .map(
      (promo) => `
    <div class="promo-card">
      <div class="promo-image">
        <img src="${BASE_PATH}${promo.imagen}" alt="${promo.alt}" />
        <div class="promo-badge">${promo.badge}</div>
      </div>
      <div class="promo-content">
        <h2>${promo.titulo}</h2>
        <p class="promo-description">${promo.descripcion}</p>
        <div class="promo-price">
          ${
            promo.precioViejo
              ? `<span class="old-price">$${promo.precioViejo}</span>`
              : ""
          }
          <span class="new-price">$${promo.precioNuevo}</span>
        </div>
        <p class="promo-validity">${promo.validez}</p>
        <button class="btn btn-primary js-add-cart" data-id="${promo.id}">
          Agregar al carrito
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function initPromos() {
  renderPromos(promosData);

  const container = document.getElementById("promosGrid");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-add-cart");
    if (!btn) return;

    const id = btn.dataset.id;
    const promo = promosData.find((p) => p.id === id);

    if (promo) {
      addToCart({
        id: promo.id,
        titulo: promo.titulo,
        precio: promo.precioNuevo,
        imagen: BASE_PATH + promo.imagen,
      });
      showToast(`${promo.titulo} agregado al carrito`);
    }
  });
}

// Inicialización asíncrona
document.addEventListener("DOMContentLoaded", async () => {
  await cargarPromos();
  initPromos();
});
