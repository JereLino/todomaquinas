/* ===== product.js — ficha de producto + cross-selling ===== */

(async function init() {
  await cargarProductos();
  const id = new URLSearchParams(location.search).get('id');
  const p = getProducto(id);

  renderHeader(p ? p.categoria : '');
  renderFooter();

  if (!p) {
    document.getElementById('producto').innerHTML =
      `<div class="empty"><div class="e-ico">😕</div><h3>Producto no encontrado</h3><p>Puede que ya no esté disponible.</p><a href="index.html" class="btn btn-primary">Volver al catálogo</a></div>`;
    return;
  }

  document.title = `${p.nombre} — Todo Máquinas`;
  document.getElementById('breadcrumb').innerHTML =
    `<a href="index.html">Inicio</a> › <a href="${urlCategoria(p.categoria)}">${esc(p.categoria)}</a> › ${esc(p.nombre)}`;

  const off = descuento(p);
  const stockBajo = p.stock <= 10;
  const features = p.descripcion.split(/[.,] ?/).filter(s => s.trim().length > 8).slice(0, 4);

  document.getElementById('producto').innerHTML = `
  <div class="product">
    <div class="gallery">
      <img src="${imgSrc(p)}" alt="${esc(p.nombre)}" onerror="this.onerror=null;this.src='${svgFallback(p)}'">
    </div>
    <div class="info">
      <span class="marca">${esc(p.marca)} · ${esc(p.categoria)}</span>
      <h1>${esc(p.nombre)}</h1>
      <div class="rating">★★★★★ <span>(${20 + (Number(p.id) * 7) % 180} opiniones · Cód. TM-${String(p.id).padStart(4, '0')})</span></div>

      <div class="price-box">
        <div class="precio-row">
          <span class="precio">${precioARS(p.precio)}</span>
          ${off ? `<span class="precio-old">${precioARS(p.precioAnterior)}</span><span class="precio-off">-${off}%</span>` : ''}
        </div>
        <div class="cuotas">💳 ${cuotas(p.precio)}</div>
        <div class="cuotas">💵 ${precioARS(p.precio * 0.9)} con transferencia o efectivo (10% off)</div>
        <div class="stock-line ${stockBajo ? 'bajo' : ''}">
          ${p.stock > 0 ? (stockBajo ? `⚠️ ¡Quedan solo ${p.stock} unidades!` : `✔ En stock (${p.stock} disponibles)`) : '✖ Sin stock'}
        </div>

        <div class="qty">
          <span style="font-weight:600;font-size:.9rem">Cantidad:</span>
          <div class="stepper">
            <button onclick="stepQty(-1)">−</button>
            <input id="qty" type="number" value="1" min="1" max="${p.stock}">
            <button onclick="stepQty(1)">+</button>
          </div>
        </div>

        <button class="btn btn-primary btn-block" style="margin-bottom:10px;font-size:1.05rem;padding:15px" onclick="comprar('${p.id}')">
          🛒 Agregar al carrito
        </button>
        <button class="btn btn-dark btn-block" onclick="comprarYa('${p.id}')">⚡ Comprar ahora</button>
      </div>

      <div class="product-desc">
        <h3>📋 Descripción</h3>
        <p>${esc(p.descripcion)}</p>
        ${features.length ? `<ul class="feature-list">${features.map(f => `<li>${esc(f.trim())}</li>`).join('')}</ul>` : ''}
      </div>

      <div class="product-desc">
        <h3>🚚 Envío y retiro</h3>
        <p>Calculá el envío a tu domicilio en el checkout. También podés retirar sin cargo en nuestro local de Carlos Diehl 690, Longchamps. Despachamos en 24/48hs.</p>
      </div>
    </div>
  </div>`;

  // Cross-selling
  const rel = getRelacionados(p, 4);
  if (rel.length) {
    document.getElementById('relacionados-sec').style.display = '';
    document.getElementById('relacionados').innerHTML = gridProductos(rel);
  }
})();

function stepQty(d) {
  const i = document.getElementById('qty');
  const max = Number(i.max) || 99;
  i.value = Math.min(max, Math.max(1, (Number(i.value) || 1) + d));
}

function comprar(id) {
  const c = Math.max(1, Number(document.getElementById('qty').value) || 1);
  agregarAlCarrito(id, c);
  mostrarToast(getProducto(id).nombre);
}

function comprarYa(id) {
  const c = Math.max(1, Number(document.getElementById('qty').value) || 1);
  agregarAlCarrito(id, c);
  location.href = 'cart.html';
}
