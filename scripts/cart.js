// Carrito de compras - Dulce Estrellita
// Gestión de carrito guest con localStorage

const CART_KEY = "carrito";

function getCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
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
  localStorage.removeItem(CART_KEY);
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
