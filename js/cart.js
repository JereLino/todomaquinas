/* ===== cart.js — carrito persistido en localStorage ===== */

const CART_KEY = 'todomaquinas_cart';
const CUPONES = { 'TODO10': 0.10, 'FERRE15': 0.15, 'BIENVENIDO': 0.05, 'CANDE10': 0.10, 'MUNDIAL10': 0.10, 'PAPA15': 0.15 };

function leerCarrito() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function guardarCarrito(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  actualizarBadge();
}

function agregarAlCarrito(id, cantidad = 1) {
  const items = leerCarrito();
  const existe = items.find(i => i.id === String(id));
  if (existe) existe.cantidad += cantidad;
  else items.push({ id: String(id), cantidad });
  guardarCarrito(items);
}

function cambiarCantidad(id, cantidad) {
  let items = leerCarrito();
  const it = items.find(i => i.id === String(id));
  if (!it) return;
  it.cantidad = cantidad;
  if (it.cantidad <= 0) items = items.filter(i => i.id !== String(id));
  guardarCarrito(items);
}

function quitarDelCarrito(id) {
  guardarCarrito(leerCarrito().filter(i => i.id !== String(id)));
}

function vaciarCarrito() { localStorage.removeItem(CART_KEY); actualizarBadge(); }

function totalItems() { return leerCarrito().reduce((s, i) => s + i.cantidad, 0); }

/* Requiere que los productos ya estén cargados (cargarProductos) */
function subtotalCarrito() {
  return leerCarrito().reduce((s, i) => {
    const p = getProducto(i.id);
    return p ? s + p.precio * i.cantidad : s;
  }, 0);
}

function actualizarBadge() {
  const b = document.getElementById('cart-badge');
  if (!b) return;
  const n = totalItems();
  const prev = Number(b.dataset.count || 0);
  b.textContent = n;
  b.dataset.count = n;
  b.style.display = n ? 'grid' : 'none';
  if (n > prev) {
    b.classList.remove('bump');
    void b.offsetWidth; // reinicia la animación
    b.classList.add('bump');
  }
}

/* Toast de "agregado al carrito" */
function mostrarToast(nombre) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = `<span class="t-ico">✔</span>
    <span><b>${esc(nombre)}</b> se agregó al carrito</span>
    <a href="cart.html">Ver carrito →</a>`;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}
