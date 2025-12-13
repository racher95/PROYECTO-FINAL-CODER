// Página de carrito - Dulce Estrellita

function renderCart() {
  const cart = getCart();
  const itemsContainer = document.getElementById("carritoItems");
  const contenido = document.getElementById("carritoContenido");
  const vacio = document.getElementById("carritoVacio");
  const totalEl = document.getElementById("carritoTotal");

  if (cart.length === 0) {
    contenido.classList.add("d-none");
    vacio.classList.remove("d-none");
    return;
  }

  contenido.classList.remove("d-none");
  vacio.classList.add("d-none");

  itemsContainer.innerHTML = cart
    .map(
      (item) => `
    <tr data-id="${item.id}">
      <td>
        <div class="d-flex align-items-center">
          <img src="${item.imagen}" alt="${item.titulo}"
               style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;"
               class="me-3" />
          <span>${item.titulo}</span>
        </div>
      </td>
      <td>$${item.precio}</td>
      <td>
        <input type="number" class="form-control js-qty"
               value="${item.cantidad}" min="1" max="99"
               style="width: 70px;" />
      </td>
      <td>$${item.precio * item.cantidad}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger js-remove">
          Eliminar
        </button>
      </td>
    </tr>
  `
    )
    .join("");

  totalEl.textContent = `$${cartTotal()}`;
}

function initCarrito() {
  renderCart();

  const itemsContainer = document.getElementById("carritoItems");
  const btnVaciar = document.getElementById("btnVaciar");
  const btnCheckout = document.getElementById("btnCheckout");
  const checkoutMsg = document.getElementById("checkoutMsg");

  // Delegación de eventos en la tabla
  itemsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-remove");
    if (!btn) return;

    const row = btn.closest("tr");
    const id = row.dataset.id;
    removeFromCart(id);
    renderCart();
  });

  itemsContainer.addEventListener("change", (e) => {
    const input = e.target.closest(".js-qty");
    if (!input) return;

    const row = input.closest("tr");
    const id = row.dataset.id;
    const qty = parseInt(input.value, 10);

    if (qty > 0) {
      updateQty(id, qty);
    } else {
      removeFromCart(id);
    }
    renderCart();
  });

  // Vaciar carrito
  btnVaciar.addEventListener("click", () => {
    clearCart();
    renderCart();
    checkoutMsg.classList.add("d-none");
  });

  // Proceder con la compra - muestra mensaje en DOM
  btnCheckout.addEventListener("click", () => {
    checkoutMsg.classList.remove("d-none");
  });
}

document.addEventListener("DOMContentLoaded", initCarrito);
