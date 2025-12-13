// Datos de productos y promociones - Dulce Estrellita

const productos = [
  {
    id: "prod-1",
    titulo: "Chocotorta Clásica",
    descripcion:
      "Nuestra famosa chocotorta con galletas de chocolate y dulce de leche casero. Un clásico que nunca falla.",
    imagen: "../img/gm6.jpg",
    alt: "Chocotorta clásica",
    precio: 650,
  },
  {
    id: "prod-2",
    titulo: "Cheesecake Frutos Rojos",
    descripcion:
      "Delicioso cheesecake cremoso con una mezcla de frutos rojos frescos. Perfecto para ocasiones especiales.",
    imagen: "../img/catalogoprueba1.jpg",
    alt: "Cheesecake de frutos rojos",
    precio: 750,
  },
  {
    id: "prod-3",
    titulo: "Brownies Artesanales",
    descripcion:
      "Brownies húmedos y deliciosos, hechos con chocolate premium. Disponibles con nueces o sin nueces.",
    imagen: "../img/promo02.jpg",
    alt: "Brownies artesanales",
    precio: 350,
  },
];

const promos = [
  {
    id: "promo-1",
    badge: "2x1",
    titulo: "Chocotorta Clásica",
    descripcion: "Lleva 2 porciones y paga solo 1. ¡Oferta limitada!",
    precioViejo: 400,
    precioNuevo: 200,
    validez: "Válido hasta el domingo",
    imagen: "../img/gm6.jpg",
    alt: "Chocotorta Clásica en promoción",
  },
  {
    id: "promo-2",
    badge: "COMBO",
    titulo: "Combo Cumpleaños",
    descripcion: "Torta + 12 cupcakes + velas de regalo",
    precioViejo: 1500,
    precioNuevo: 1200,
    validez: "Válido para pedidos con 48hs de anticipación",
    imagen: "../img/promo01.jpg",
    alt: "Combo Cumpleaños",
  },
  {
    id: "promo-3",
    badge: "30% OFF",
    titulo: "Brownies Premium",
    descripcion: "Caja de 6 brownies artesanales con descuento especial",
    precioViejo: 600,
    precioNuevo: 420,
    validez: "Válido solo esta semana",
    imagen: "../img/promo02.jpg",
    alt: "Brownies Premium",
  },
  {
    id: "promo-4",
    badge: "NUEVO",
    titulo: "Merienda Dulce",
    descripcion: "Selección de mini tortas y alfajores para compartir",
    precioViejo: null,
    precioNuevo: 800,
    validez: "Válido para grupos de 4 o más personas",
    imagen: "../img/promo03.jpg",
    alt: "Merienda Dulce",
  },
];
