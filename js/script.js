// ==========================
// 📦 LISTA DE PRODUCTOS
// ==========================
const productos = [
  { id: 1, nombre: "Perfume Floral", categoria: "perfume", precio: "S/ 89.90", imagen: "img/perfume1.jpg" },
  { id: 2, nombre: "Perfume Amaderado", categoria: "perfume", precio: "S/ 99.90", imagen: "img/perfume2.jpg" },
  { id: 3, nombre: "Blusa Elegante", categoria: "ropa", precio: "S/ 59.90", imagen: "img/ropa1.jpg" },
  { id: 4, nombre: "Polo Casual", categoria: "ropa", precio: "S/ 39.90", imagen: "img/ropa2.jpg" },
  { id: 5, nombre: "Crema Hidratante", categoria: "piel", precio: "S/ 49.90", imagen: "img/piel1.jpg" },
  { id: 6, nombre: "Mascarilla Facial", categoria: "piel", precio: "S/ 29.90", imagen: "img/piel2.jpg" },
  { id: 7, nombre: "Perfume Cítrico", categoria: "perfume", precio: "S/ 84.90", imagen: "img/perfume3.jpg" },
  { id: 8, nombre: "Vestido de Verano", categoria: "ropa", precio: "S/ 89.00", imagen: "img/ropa3.jpg" },
  { id: 9, nombre: "Sérum Facial", categoria: "piel", precio: "S/ 69.90", imagen: "img/piel3.jpg" },
];

// ==========================
// ⚙️ VARIABLES GLOBALES
// ==========================
const contenedor = document.getElementById("productos-container");
const botonesFiltro = document.querySelectorAll(".filter-btn");
const verMasBtn = document.getElementById("ver-mas");
const searchDesktop = document.getElementById("search-desktop");
const searchMobile = document.getElementById("search-mobile");

let productosVisibles = 6;
let categoriaSeleccionada = "all";
let textoBusqueda = "";

// ==========================
// 🧩 FUNCIONES PRINCIPALES
// ==========================
function mostrarProductos() {
  if (!contenedor) return; // Si no hay contenedor (ej. en otra página), salir

  contenedor.innerHTML = "";

  let filtrados = productos.filter((p) => {
    const coincideCategoria = categoriaSeleccionada === "all" || p.categoria === categoriaSeleccionada;
    const coincideBusqueda = p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const productosAMostrar = filtrados.slice(0, productosVisibles);

  if (productosAMostrar.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400">No se encontraron productos.</p>`;
    if (verMasBtn) verMasBtn.style.display = "none";
    return;
  }

  productosAMostrar.forEach((producto) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden";

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">${producto.nombre}</h3>
        <p class="text-primary font-bold mb-3">${producto.precio}</p>
        <a href="https://wa.me/934991872?text=¡Hola!%20Estoy%20interesado%20en%20${encodeURIComponent(
          producto.nombre
        )}%20(${encodeURIComponent(producto.precio)})"
          target="_blank"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          Consultar por WhatsApp
        </a>
      </div>
    `;

    contenedor.appendChild(card);
  });

  // Mostrar u ocultar el botón “Ver más”
  if (verMasBtn) {
    verMasBtn.style.display = filtrados.length > productosVisibles ? "block" : "none";
  }
}

// ==========================
// 🧭 EVENTOS
// ==========================

// Filtros de categoría (solo en productos.html)
if (botonesFiltro.length > 0) {
  botonesFiltro.forEach((btn) => {
    btn.addEventListener("click", () => {
      botonesFiltro.forEach((b) => b.classList.remove("bg-primary", "text-white"));
      botonesFiltro.forEach((b) => b.classList.add("bg-gray-200", "text-gray-800"));

      btn.classList.add("bg-primary", "text-white");
      btn.classList.remove("bg-gray-200", "text-gray-800");

      categoriaSeleccionada = btn.dataset.category;
      productosVisibles = 6;
      mostrarProductos();
    });
  });
}

// Botón “Ver más”
if (verMasBtn) {
  verMasBtn.addEventListener("click", () => {
    productosVisibles += 3;
    mostrarProductos();
  });
}

// Buscadores
function actualizarBusqueda(e) {
  textoBusqueda = e.target.value;
  productosVisibles = 6;
  mostrarProductos();
}
if (searchDesktop) searchDesktop.addEventListener("input", actualizarBusqueda);
if (searchMobile) searchMobile.addEventListener("input", actualizarBusqueda);

// ==========================
// 🚀 INICIALIZAR
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // Si estamos en index.html → muestra solo 3 productos destacados
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    productosVisibles = 3;
  }
  mostrarProductos();
});
