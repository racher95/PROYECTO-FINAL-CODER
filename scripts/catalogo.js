// Catálogo dinámico - Dulce Estrellita

function renderProductos(lista) {
  const container = document.getElementById("catalogoContainer");
  if (!container) return;

  container.innerHTML = lista
    .map(
      (prod) => `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 producto-card">
        <img src="${prod.imagen}" class="card-img-top" alt="${prod.alt}" />
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

function mostrarFeedback(mensaje) {
  let feedback = document.getElementById("cartFeedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "cartFeedback";
    feedback.className =
      "alert alert-success alert-dismissible fade show position-fixed";
    feedback.style.cssText =
      "top: 100px; right: 20px; z-index: 1050; min-width: 250px;";
    feedback.innerHTML = `
      <span id="feedbackMsg"></span>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(feedback);
  }

  document.getElementById("feedbackMsg").textContent = mensaje;
  feedback.classList.remove("d-none");
  feedback.classList.add("show");

  setTimeout(() => {
    feedback.classList.add("d-none");
  }, 3000);
}

function initCatalogo() {
  renderProductos(productos);

  const container = document.getElementById("catalogoContainer");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-add-cart");
    if (!btn) return;

    const id = btn.dataset.id;
    const prod = productos.find((p) => p.id === id);

    if (prod) {
      addToCart({
        id: prod.id,
        titulo: prod.titulo,
        precio: prod.precio,
        imagen: prod.imagen,
      });
      mostrarFeedback(`${prod.titulo} agregado al carrito`);
    }
  });
}

document.addEventListener("DOMContentLoaded", initCatalogo);
