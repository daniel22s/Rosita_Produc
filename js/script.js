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
    categoria: "perfume",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaWN115ekVRvd1yapIDyjUoyXNk00UAs8-weOxTjtGJme95Ewe__jHBmcPyZ_ku48AuhTUhR97ud4BAlZMvkXwO7NGzD6OrSDG1gvt0j0TbYRGq9BnoOCP_0NxYGP-SXwJXKpDJ30H6ahcjoDvj16nHlmmAzqh-722_ytBLXqzYhhlWds1EOaDL16MvLHyzDsg4ytxqJIQcTwo72cqXL75Vm3zNIs4Q-ZbfNMPmDeEEUb3v1pUC7hnPYRzAccytSzV4wiV4MLQb4da",
  },
  {
    nombre: "Good Girl Carolina Herrera",
    precio: "S/ 279.90",
    categoria: "perfume",
    imagen: "https://i.pinimg.com/736x/00/6e/57/006e573272a9ae68d90b0eb8c81b17b5.jpg",
  },
  {
    nombre: "Crema Facial Hidratante",
    precio: "S/ 89.90",
    categoria: "piel",
    imagen: "https://cdn.pixabay.com/photo/2020/11/26/10/28/skincare-5779776_1280.jpg",
  },
  {
    nombre: "Vestido Floral de Verano",
    precio: "S/ 129.90",
    categoria: "ropa",
    imagen: "https://cdn.pixabay.com/photo/2016/03/27/19/33/fashion-1283863_960_720.jpg",
  },
];


const contenedor = document.getElementById("productos-container");
const botonVerMas = document.getElementById("ver-mas");
let productosMostrados = 0;
// Detectar si estamos en productos.html
const esPaginaProductos = window.location.pathname.includes("productos.html");

// Si estamos en productos.html mostramos todos, si no, solo 3
const cantidadPorCarga = esPaginaProductos ? productos.length : 3;
let categoriaSeleccionada = "all";

// Función para limpiar productos antes de mostrar otros
function limpiarProductos() {
  contenedor.innerHTML = "";
  productosMostrados = 0;
  botonVerMas.style.display = "block";
}

// Función para cargar productos (respetando la categoría seleccionada)
function cargarProductos() {
  const productosFiltrados =
    categoriaSeleccionada === "all"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  const fin = productosMostrados + cantidadPorCarga;
  const productosAmostrar = productosFiltrados.slice(productosMostrados, fin);

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

    // Animación suave de entrada
    setTimeout(() => {
      tarjeta.classList.remove("opacity-0", "translate-y-6");
      tarjeta.classList.add("opacity-100", "translate-y-0");
    }, 100);
  });

  productosMostrados += productosAmostrar.length;

  if (productosMostrados >= productosFiltrados.length) {
    botonVerMas.style.display = "none";
  }
}

// Eventos de los botones de categoría
const botonesCategoria = document.querySelectorAll(".filter-btn");
botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", () => {
    categoriaSeleccionada = boton.dataset.category;
    limpiarProductos();
    cargarProductos();

    botonesCategoria.forEach((b) => b.classList.remove("bg-primary", "text-white"));
    boton.classList.add("bg-primary", "text-white");
  });
});

// Evento del botón “Ver más”
botonVerMas.addEventListener("click", cargarProductos);

// Carga inicial
cargarProductos();
if (esPaginaProductos) {
  botonVerMas.style.display = "none";
}

// 🕵️‍♂️ Función de búsqueda en productos
function activarBuscador() {
  const inputs = [
    document.getElementById("search-desktop"),
    document.getElementById("search-mobile"),
  ];

  inputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const tarjetas = document.querySelectorAll("#productos-container > div");

        tarjetas.forEach((tarjeta) => {
          const nombre = tarjeta
            .querySelector("p:first-of-type")
            .textContent.toLowerCase();
          tarjeta.style.display = nombre.includes(searchText) ? "block" : "none";
        });
      });
    }
  });
}

// ✅ Activa el buscador una vez cargados los productos
cargarProductos();
activarBuscador();
