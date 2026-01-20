// Página de carrito - Dulce Estrellita

// Gestión de órdenes en localStorage
function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function generateOrderId() {
  return "DE-" + Date.now().toString(36).toUpperCase();
}

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
               class="cart-item-img me-3" />
          <span>${item.titulo}</span>
        </div>
      </td>
      <td>$${item.precio}</td>
      <td>
        <input type="number" class="form-control js-qty cart-qty-input"
               value="${item.cantidad}" min="1" max="99" />
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
  const checkoutCollapse = document.getElementById("checkoutCollapse");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutExito = document.getElementById("checkoutExito");
  const numeroPedido = document.getElementById("numeroPedido");
  const carritoContenido = document.getElementById("carritoContenido");

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

  // Vaciar carrito con confirmación SweetAlert2
  btnVaciar.addEventListener("click", () => {
    Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6e39b7",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        renderCart();
        // Ocultar formulario si estaba abierto
        const bsCollapse = bootstrap.Collapse.getInstance(checkoutCollapse);
        if (bsCollapse) bsCollapse.hide();
        Swal.fire({
          title: "Carrito vacío",
          text: "El carrito ha sido vaciado correctamente.",
          icon: "success",
          confirmButtonColor: "#6e39b7",
        });
      }
    });
  });

  // Abrir formulario de checkout
  btnCheckout.addEventListener("click", () => {
    const bsCollapse = new bootstrap.Collapse(checkoutCollapse, {
      toggle: true,
    });
  });

  // Enviar formulario de checkout
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validación básica
    if (!checkoutForm.checkValidity()) {
      checkoutForm.classList.add("was-validated");
      return;
    }

    // Validar dirección si es delivery
    const entrega = document.getElementById("checkoutEntrega").value;
    const direccion = document.getElementById("checkoutDireccion").value.trim();
    if (entrega === "delivery" && !direccion) {
      Swal.fire({
        title: "Dirección requerida",
        text: "Por favor ingresa tu dirección para el delivery.",
        icon: "warning",
        confirmButtonColor: "#6e39b7",
      });
      return;
    }

    // Crear orden
    const orderId = generateOrderId();
    const session = typeof getSession === "function" ? getSession() : null;

    const order = {
      id: orderId,
      fecha: new Date().toISOString(),
      usuario: session ? session.email : "guest",
      cliente: {
        nombre: document.getElementById("checkoutNombre").value.trim(),
        telefono: document.getElementById("checkoutTelefono").value.trim(),
        entrega: entrega,
        direccion: direccion,
        pago: document.getElementById("checkoutPago").value,
        fechaDeseada: document.getElementById("checkoutFecha").value,
        notas: document.getElementById("checkoutNotas").value.trim(),
      },
      items: getCart(),
      total: cartTotal(),
    };

    // Guardar orden y vaciar carrito
    saveOrder(order);
    clearCart();

    // Mostrar éxito
    carritoContenido.classList.add("d-none");
    checkoutExito.classList.remove("d-none");
    numeroPedido.textContent = orderId;

    // SweetAlert de confirmación
    Swal.fire({
      title: "¡Pedido confirmado!",
      text: `Tu número de pedido es ${orderId}. Te contactaremos pronto.`,
      icon: "success",
      confirmButtonColor: "#6e39b7",
    });
  });
}

document.addEventListener("DOMContentLoaded", initCarrito);
