// ==========================
// 📦 LISTA DE PRODUCTOS
// ==========================
const productos = [
  { id: 1, nombre: "Perfume Ekos Frescor Maracujá 150 ml", categoria: "perfume", precio: "S/ 65.00", imagen: "../img/Maracuja-Natura.webp" },
  { id: 2, nombre: "Crema corporal Frutos Rojas Tododia 400 ml", categoria: "piel", precio: "S/ 45.00", imagen: "../img/Crema-frutas-rojas.webp" },
  { id: 3, nombre: "Avon Onduty Men 50ml", categoria: "cuidado-personal", precio: "S/ 17.90", imagen: "../img/Avon-Onduty-50ml.jpg" },
  { id: 4, nombre: "KaiaK Eau de Toilette", categoria: "perfume", precio: "S/ 75.00", imagen: "../img/KaiaK Eau de Toilette.webp" },
  { id: 5, nombre: "Natura Humor Da Minha Vida 75 ml", categoria: "perfume", precio: "S/ 74.90", imagen: "../img/Natura Humor Da Minha Vida 75 ml.webp" },
  { id: 6, nombre: "Tododia Body Splash Hojas de Limón y Guanábana", categoria: "perfume", precio: "S/ 35.00", imagen: "../img/Tododia Body Splash Hojas de Limón y Guanábana.jpg" },
  { id: 7, nombre: "Tododia Jabon Tocador Frutas Rojas", categoria: "cuidado-personal", precio: "S/ 35.00", imagen: "../img/Tododia-Jabon-Tocador.webp" },
  { id: 8, nombre: "300 km/h Virtual Adrenaline", categoria: "perfume", precio: "S/ 45.00", imagen: "../img/virtual-adrenaline-300km.webp" },
  { id: 9, nombre: "Kaiak Pulso 100 ml", categoria: "perfume", precio: "S/ 60.0", imagen: "../img/KAIAK-PULSO-100ML.webp" },
  {id: 10, nombre: "Kaiak Tradicional 100 ml", categoria: 'perfume', precio: 'S/65.00', imagen:'../img/Kaiak-Tradicional.webp' },
  {id: 11, nombre: "Perfume Masculino OHM" , categoria: 'perfume', precio: 'S/ 70.00', imagen:'../img/OHM.webp' },
  {id: 12, nombre: "Xool Eau de Toilette" , categoria: 'perfume' , precio: 'S/ 45.00' , imagen:'../img/Perfume_Masculino_Xool.webp' },
  {id: 13, nombre: "Natura Horus Azul Marine 100 ml" , categoria: 'perfume' , precio: 'S/ 60.00' , imagen:'../img/Horus.webp' },
  {id: 14 , nombre: "Hidratante Corporal Águas Jabuticaba 150g" , categoria: 'cuidado-personal' , precio: 'S/ 35.00' , imagen:'../img/aguas.webp' },
  {id: 15 , nombre: "Águas colonia femenina Jabuticaba 150 ml" , categoria: 'perfume' , precio: 'S/ 50.00' , imagen:'../img/jabuticaba.webp' },
  {id: 16 , nombre: "Body Spa Kids Shampoo - Acondicionador" , categoria: 'cuidado-personal' , precio: 'S/ 40.00' , imagen:'../img/body-spa.webp' },
  {id: 17 , nombre: "Total Block Jumbo SPF 100" , categoria: 'piel' , precio: 'S/ 65.00' , imagen:'../img/protector.webp' },
  {id: 18 , nombre: "Ekos Pulpa Hidratante Corporal Tukumã 400 ml " , categoria: 'piel' , precio: 'S/ 42.00' , imagen:'../img/tukuma.webp' },
  {id: 19 , nombre: "EKOS Néctar hidratante maracuyá 400 ml" , categoria: 'piel' , precio: 'S/ 69.00' , imagen:'../img/nectar.webp' },
  {id: 20 , nombre: "Avon Senses Crema para Peinar “Chocolate y Castaña de Brasil” 300 g" , categoria: 'cuidado-personal' , precio: 'S/ 25.00' , imagen:'../img/peinar.webp' },
  {id: 21 , nombre: "Shampoo L'Oréal Kids Manzanilla 265 ml" , categoria: 'cuidado-personal' , precio: 'S/ 35.00' , imagen:'../img/loreal.webp' },
  {id: 22 , nombre: "Avon Universo Shampoo y Acondicionador 2 en 1 200 ml" , categoria: 'cuidado-personal' , precio: 'S/ 20.00' , imagen:'../img/shampoo.webp' },
  {id: 23 , nombre: "Colonia Universo 150 ml" , categoria: 'perfume' , precio: 'S/ 15.00' , imagen:'../img/universo.webp' },
  {id: 24 , nombre: "" , categoria: '' , precio: '' , imagen:'' },
  {id: 25 , nombre: "" , categoria: '' , precio: '' , imagen:'' },

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
    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-56 object-contain bg-white">
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
