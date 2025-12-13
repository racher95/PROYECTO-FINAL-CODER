// Promos dinámicas - Dulce Estrellita

function renderPromos(lista) {
  const container = document.getElementById("promosGrid");
  if (!container) return;

  container.innerHTML = lista
    .map(
      (promo) => `
    <div class="promo-card">
      <div class="promo-image">
        <img src="${promo.imagen}" alt="${promo.alt}" />
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

function mostrarFeedbackPromo(mensaje) {
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

function initPromos() {
  renderPromos(promos);

  const container = document.getElementById("promosGrid");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-add-cart");
    if (!btn) return;

    const id = btn.dataset.id;
    const promo = promos.find((p) => p.id === id);

    if (promo) {
      addToCart({
        id: promo.id,
        titulo: promo.titulo,
        precio: promo.precioNuevo,
        imagen: promo.imagen,
      });
      mostrarFeedbackPromo(`${promo.titulo} agregado al carrito`);
    }
  });
}

document.addEventListener("DOMContentLoaded", initPromos);
