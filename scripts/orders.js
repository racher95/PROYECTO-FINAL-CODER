// Página de Mis Pedidos - Dulce Estrellita

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderOrders() {
  const container = document.getElementById("ordersContainer");
  const vacio = document.getElementById("ordersVacio");
  const noAuth = document.getElementById("ordersNoAuth");

  // Verificar si está logueado
  const session = typeof getSession === "function" ? getSession() : null;

  if (!session) {
    container.classList.add("d-none");
    vacio.classList.add("d-none");
    noAuth.classList.remove("d-none");
    return;
  }

  // Filtrar órdenes del usuario actual
  const allOrders = getOrders();
  const userOrders = allOrders.filter((order) => order.usuario === session.email);

  if (userOrders.length === 0) {
    container.classList.add("d-none");
    noAuth.classList.add("d-none");
    vacio.classList.remove("d-none");
    return;
  }

  container.classList.remove("d-none");
  vacio.classList.add("d-none");
  noAuth.classList.add("d-none");

  // Ordenar por fecha descendente (más reciente primero)
  userOrders.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  container.innerHTML = userOrders
    .map(
      (order) => `
    <div class="col-12">
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <strong class="text-primary">${order.id}</strong>
            <span class="text-muted ms-3">${formatDate(order.fecha)}</span>
          </div>
          <span class="badge bg-success">Confirmado</span>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <h6 class="mb-3">Productos:</h6>
              <ul class="list-unstyled">
                ${order.items
                  .map(
                    (item) => `
                  <li class="mb-2 d-flex align-items-center">
                    <img src="${item.imagen}" alt="${item.titulo}" class="cart-item-img me-2" />
                    <span>${item.titulo} x${item.cantidad}</span>
                    <span class="ms-auto">$${item.precio * item.cantidad}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
            <div class="col-md-4">
              <h6 class="mb-3">Detalles:</h6>
              <p class="mb-1"><strong>Cliente:</strong> ${order.cliente.nombre}</p>
              <p class="mb-1"><strong>Entrega:</strong> ${order.cliente.entrega === "delivery" ? "Delivery" : "Retiro en local"}</p>
              ${order.cliente.direccion ? `<p class="mb-1"><strong>Dirección:</strong> ${order.cliente.direccion}</p>` : ""}
              <p class="mb-1"><strong>Pago:</strong> ${order.cliente.pago}</p>
              ${order.cliente.fechaDeseada ? `<p class="mb-1"><strong>Fecha deseada:</strong> ${order.cliente.fechaDeseada}</p>` : ""}
            </div>
          </div>
        </div>
        <div class="card-footer text-end">
          <strong>Total: $${order.total}</strong>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderOrders);
