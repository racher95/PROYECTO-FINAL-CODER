// Catálogo dinámico - Dulce Estrellita

// Ruta base para imágenes (ajuste según ubicación de la página)
const BASE_PATH = window.location.pathname.includes("/pages/") ? "../" : "";

// Variable global para productos cargados
let productosData = [];

// Estado de filtros
let filtrosActuales = {
  busqueda: "",
  orden: "default"
};

async function cargarProductos() {
  try {
    const response = await fetch(`${BASE_PATH}data/productos.json`);
    if (!response.ok) throw new Error("Error al cargar productos");
    productosData = await response.json();
    return productosData;
  } catch (error) {
    console.error("Error cargando productos:", error);
    return [];
  }
}

// Aplicar filtros y ordenamiento
function aplicarFiltros() {
  let resultado = [...productosData];

  // Filtrar por búsqueda
  if (filtrosActuales.busqueda) {
    const termino = filtrosActuales.busqueda.toLowerCase();
    resultado = resultado.filter(
      (prod) =>
        prod.titulo.toLowerCase().includes(termino) ||
        prod.descripcion.toLowerCase().includes(termino)
    );
  }

  // Ordenar
  switch (filtrosActuales.orden) {
    case "precio-asc":
      resultado.sort((a, b) => a.precio - b.precio);
      break;
    case "precio-desc":
      resultado.sort((a, b) => b.precio - a.precio);
      break;
    case "nombre-asc":
      resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
      break;
    case "nombre-desc":
      resultado.sort((a, b) => b.titulo.localeCompare(a.titulo));
      break;
  }

  renderProductos(resultado);
}

function renderProductos(lista) {
  const container = document.getElementById("catalogoContainer");
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = `<div class="col-12 text-center"><p class="text-muted">No se encontraron productos.</p></div>`;
    return;
  }

  container.innerHTML = lista
    .map(
      (prod) => `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 producto-card">
        <img src="${BASE_PATH}${prod.imagen}" class="card-img-top" alt="${prod.alt}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${prod.titulo}</h5>
          <p class="card-text flex-grow-1">${prod.descripcion}</p>
          <div class="mt-auto">
            <p class="precio mb-2"><strong>Precio:</strong> $${prod.precio}</p>
            <button class="btn btn-primary w-100 js-add-cart" data-id="${prod.id}">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function initCatalogo() {
  renderProductos(productosData);

  const container = document.getElementById("catalogoContainer");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-add-cart");
    if (!btn) return;

    const id = btn.dataset.id;
    const prod = productosData.find((p) => p.id === id);

    if (prod) {
      addToCart({
        id: prod.id,
        titulo: prod.titulo,
        precio: prod.precio,
        imagen: BASE_PATH + prod.imagen,
      });
      showToast(`${prod.titulo} agregado al carrito`);
    }
  });
}

// Configurar event listeners para filtros
function initFiltros() {
  const sortSelect = document.getElementById("sortSelect");

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      filtrosActuales.orden = e.target.value;
      aplicarFiltros();
    });
  }

  // Escuchar búsqueda desde navbar
  window.addEventListener("navSearch", (e) => {
    filtrosActuales.busqueda = e.detail.query;
    aplicarFiltros();
  });

  // Verificar si hay búsqueda en URL al cargar
  const params = new URLSearchParams(window.location.search);
  const busqueda = params.get("q");
  if (busqueda) {
    filtrosActuales.busqueda = busqueda;
    aplicarFiltros();
  }
}

// Inicialización asíncrona
document.addEventListener("DOMContentLoaded", async () => {
  await cargarProductos();
  initCatalogo();
  initFiltros();
});
