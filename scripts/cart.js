// Carrito de compras - Dulce Estrellita
// Gestión de carrito con localStorage (por usuario o guest)

const CART_KEY_GUEST = "carrito_guest";

// Obtener la key del carrito según sesión
function getCartKey() {
  const session = localStorage.getItem("session");
  if (session) {
    const { email } = JSON.parse(session);
    return `carrito_${email}`;
  }
  return CART_KEY_GUEST;
}

// Dispara evento para notificar cambios en el carrito
function notifyCartChange() {
  window.dispatchEvent(new CustomEvent("cart:updated"));
}

function getCart() {
  const data = localStorage.getItem(getCartKey());
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  notifyCartChange();
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find((p) => p.id === item.id);

  if (existing) {
    existing.cantidad++;
  } else {
    cart.push({
      id: item.id,
      titulo: item.titulo,
      precio: item.precio,
      imagen: item.imagen,
      cantidad: 1,
    });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find((p) => p.id === id);

  if (item) {
    item.cantidad = qty;
    if (item.cantidad <= 0) {
      removeFromCart(id);
    } else {
      saveCart(cart);
    }
  }
}

function clearCart() {
  localStorage.removeItem(getCartKey());
  notifyCartChange();
}

// Transferir carrito de guest a usuario logueado
function transferGuestCart(userEmail) {
  const guestCart = JSON.parse(localStorage.getItem(CART_KEY_GUEST)) || [];
  if (guestCart.length === 0) return;

  const userCartKey = `carrito_${userEmail}`;
  const userCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

  // Merge: agregar items de guest al carrito del usuario
  guestCart.forEach((guestItem) => {
    const existing = userCart.find((p) => p.id === guestItem.id);
    if (existing) {
      existing.cantidad += guestItem.cantidad;
    } else {
      userCart.push(guestItem);
    }
  });

  // Guardar carrito del usuario y vaciar guest
  localStorage.setItem(userCartKey, JSON.stringify(userCart));
  localStorage.removeItem(CART_KEY_GUEST);
  notifyCartChange();
}

function cartCount() {
  return getCart().reduce((total, item) => total + item.cantidad, 0);
}

function cartTotal() {
  return getCart().reduce((total, item) => {
    const precio = typeof item.precio === "number" ? item.precio : 0;
    return total + precio * item.cantidad;
  }, 0);
}
