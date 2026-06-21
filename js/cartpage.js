/* ===== cartpage.js — página de carrito + cross-selling + cupones ===== */

const ENVIO_GRATIS_DESDE = 120000;
let _cupon = null;

(async function init() {
  await cargarProductos();
  renderHeader();
  renderFooter();
  render();
})();

function render() {
  const items = leerCarrito();
  const cont = document.getElementById('carrito');

  if (!items.length) {
    cont.innerHTML = `<div class="empty">
      <div class="e-ico">🛒</div><h3>Tu carrito está vacío</h3>
      <p>Agregá productos del catálogo y aprovechá nuestros precios bajos.</p>
      <a href="index.html" class="btn btn-primary">Ver catálogo</a></div>`;
    document.getElementById('cross-sec').style.display = 'none';
    return;
  }

  const detalle = items.map(i => ({ ...i, prod: getProducto(i.id) })).filter(i => i.prod);
  const subtotal = detalle.reduce((s, i) => s + i.prod.precio * i.cantidad, 0);
  const desc = _cupon ? Math.round(subtotal * CUPONES[_cupon]) : 0;
  const envioGratis = subtotal >= ENVIO_GRATIS_DESDE;
  const totalEstimado = subtotal - desc;

  cont.innerHTML = `
  <div class="cart-layout">
    <div class="cart-items">
      ${detalle.map(i => filaCarrito(i)).join('')}
    </div>
    <aside class="summary">
      <h3>Resumen de compra</h3>
      <div class="summary-row"><span>Subtotal (${totalItems()} ${totalItems() === 1 ? 'producto' : 'productos'})</span><b>${precioARS(subtotal)}</b></div>
      ${desc ? `<div class="summary-row" style="color:var(--verde)"><span>Cupón ${_cupon}</span><b>− ${precioARS(desc)}</b></div>` : ''}
      <div class="summary-row"><span>Envío</span><b>${envioGratis ? '<span style="color:var(--verde)">¡GRATIS!</span>' : 'Se calcula en el checkout'}</b></div>

      ${!envioGratis ? `<div style="font-size:.8rem;color:var(--gris-500);margin:6px 0 4px">
        Te faltan <b>${precioARS(ENVIO_GRATIS_DESDE - subtotal)}</b> para el envío gratis 🚚</div>
        <div style="height:6px;background:var(--gris-100);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${Math.min(100, subtotal / ENVIO_GRATIS_DESDE * 100)}%;background:var(--amarillo)"></div>
        </div>` : ''}

      <div class="cupon">
        <input id="cupon-input" placeholder="Código de cupón" value="${_cupon || ''}">
        <button onclick="aplicarCupon()">Aplicar</button>
      </div>
      <div id="cupon-msg" class="cupon-msg"></div>
      <div style="font-size:.74rem;color:var(--gris-500);margin-bottom:10px">Probá: <b>CANDE10</b> · <b>TODO10</b> · <b>FERRE15</b> · <b>MUNDIAL10</b></div>

      <div class="summary-row total"><span>Total</span><span>${precioARS(totalEstimado)}</span></div>
      <div style="font-size:.78rem;color:var(--gris-500);margin-bottom:14px">💳 ${cuotas(totalEstimado)}</div>

      <a href="checkout.html" class="btn btn-primary btn-block" style="margin-bottom:10px">Iniciar compra →</a>
      <a href="index.html" class="btn btn-ghost btn-block" style="color:var(--negro);border-color:var(--gris-300)">Seguir comprando</a>
    </aside>
  </div>`;

  renderCross(detalle);
}

function filaCarrito(i) {
  const p = i.prod;
  return `
  <div class="cart-item">
    <a href="product.html?id=${p.id}"><img src="${imgSrc(p)}" alt="${esc(p.nombre)}" onerror="this.onerror=null;this.src='${svgFallback(p)}'"></a>
    <div class="ci-info">
      <span class="marca">${esc(p.marca)}</span>
      <h4><a href="product.html?id=${p.id}">${esc(p.nombre)}</a></h4>
      <div style="font-size:.85rem;color:var(--gris-500)">${precioARS(p.precio)} c/u</div>
      <div class="ci-controls">
        <div class="stepper-sm">
          <button onclick="setQty('${p.id}', ${i.cantidad - 1})">−</button>
          <span>${i.cantidad}</span>
          <button onclick="setQty('${p.id}', ${i.cantidad + 1})">+</button>
        </div>
        <button class="remove" onclick="eliminar('${p.id}')">🗑 Quitar</button>
      </div>
    </div>
    <div class="ci-price">${precioARS(p.precio * i.cantidad)}</div>
  </div>`;
}

function setQty(id, n) { cambiarCantidad(id, n); render(); }
function eliminar(id) { quitarDelCarrito(id); render(); }

function aplicarCupon() {
  const code = document.getElementById('cupon-input').value.trim().toUpperCase();
  const msg = document.getElementById('cupon-msg');
  if (CUPONES[code]) {
    _cupon = code;
    msg.className = 'cupon-msg ok';
    msg.textContent = `✔ Cupón aplicado: ${Math.round(CUPONES[code] * 100)}% de descuento`;
    setTimeout(render, 800);
  } else {
    _cupon = null;
    msg.className = 'cupon-msg err';
    msg.textContent = '✖ Cupón inválido';
  }
}

/* Cross-selling: relacionados de los productos del carrito, que no estén ya en el carrito */
function renderCross(detalle) {
  const enCarrito = new Set(detalle.map(i => i.id));
  const sugeridos = [];
  const vistos = new Set();
  detalle.forEach(i => {
    getRelacionados(i.prod, 6).forEach(r => {
      if (!enCarrito.has(r.id) && !vistos.has(r.id)) { vistos.add(r.id); sugeridos.push(r); }
    });
  });
  const sec = document.getElementById('cross-sec');
  if (sugeridos.length) {
    sec.style.display = '';
    document.getElementById('cross').innerHTML = gridProductos(sugeridos.slice(0, 4));
  } else {
    sec.style.display = 'none';
  }
}
