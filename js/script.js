function enviarWhatsApp(nombreProducto) {
  const telefono = "51903525222";
  const mensaje = `Hola! Me interesa el producto: ${nombreProducto}`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Lista de productos (puedes añadir todos los que quieras)
const productos = [
  {
    nombre: "Perfume Dior Sauvage",
    precio: "S/ 249.90",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaWN115ekVRvd1yapIDyjUoyXNk00UAs8-weOxTjtGJme95Ewe__jHBmcPyZ_ku48AuhTUhR97ud4BAlZMvkXwO7NGzD6OrSDG1gvt0j0TbYRGq9BnoOCP_0NxYGP-SXwJXKpDJ30H6ahcjoDvj16nHlmmAzqh-722_ytBLXqzYhhlWds1EOaDL16MvLHyzDsg4ytxqJIQcTwo72cqXL75Vm3zNIs4Q-ZbfNMPmDeEEUb3v1pUC7hnPYRzAccytSzV4wiV4MLQb4da",
  },
  {
    nombre: "Good Girl Carolina Herrera",
    precio: "S/ 279.90",
    imagen: "https://i.pinimg.com/736x/00/6e/57/006e573272a9ae68d90b0eb8c81b17b5.jpg",
  },
  {
    nombre: "Versace Eros Femme",
    precio: "S/ 259.90",
    imagen: "https://i.pinimg.com/736x/8a/d2/42/8ad2426220c2d263d9f7926b3b4d5c63.jpg",
  },
  {
    nombre: "YSL Black Opium",
    precio: "S/ 299.90",
    imagen: "https://i.pinimg.com/736x/1c/65/aa/1c65aaf473e47f8d585db3c1725e88c2.jpg",
  },
  {
    nombre: "Bleu de Chanel",
    precio: "S/ 289.90",
    imagen: "https://i.pinimg.com/736x/94/3b/9e/943b9eafbaaa73ffca093e3d7cc33c5c.jpg",
  },
  {
    nombre: "Jean Paul Gaultier Le Male",
    precio: "S/ 269.90",
    imagen: "https://i.pinimg.com/736x/03/1b/41/031b41660fc5c47bbec7d165048d1f7c.jpg",
  },
];

const contenedor = document.getElementById("productos-container");
const botonVerMas = document.getElementById("ver-mas");

let productosMostrados = 0;
const cantidadPorCarga = 3;

// Función para cargar productos de forma progresiva
function cargarProductos() {
  const fin = productosMostrados + cantidadPorCarga;
  const productosAmostrar = productos.slice(productosMostrados, fin);

  productosAmostrar.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className =
  "group relative overflow-hidden rounded-lg cursor-pointer opacity-0 translate-y-6 transition-all duration-700 ease-out";
    tarjeta.onclick = () => enviarWhatsApp(producto.nombre);

    tarjeta.innerHTML = `
      <div
        class="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style="background-image: url('${producto.imagen}')"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <p class="absolute bottom-10 left-4 text-gray-200 text-xl font-semibold">
        ${producto.nombre}
      </p>
      <p class="absolute bottom-4 left-4 text-white text-xl font-bold">
        ${producto.precio}
      </p>
    `;

    contenedor.appendChild(tarjeta);
    setTimeout(() => {
  tarjeta.classList.remove("opacity-0", "translate-y-6");
  tarjeta.classList.add("opacity-100", "translate-y-0");
}, 100);

  });

  productosMostrados += productosAmostrar.length;

  if (productosMostrados >= productos.length) {
    botonVerMas.style.display = "none"; // Oculta el botón cuando ya no hay más
  }
}

// Evento del botón
botonVerMas.addEventListener("click", cargarProductos);

// Cargar los primeros productos automáticamente
cargarProductos();
