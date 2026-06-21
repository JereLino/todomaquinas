/* ===== checkout.js — gestor de envíos + procesador de pagos (simulados) ===== */

const ENVIOS = [
  { id: 'retiro',   ico: '🏪', nombre: 'Retiro en local',          desc: 'Carlos Diehl 690, Longchamps · Listo en 2hs', costo: 0,     dias: '' },
  { id: 'estandar', ico: '🚚', nombre: 'Envío estándar a domicilio', desc: 'Correo Argentino · 3 a 5 días hábiles', costo: 8500,  dias: '3-5 días' },
  { id: 'express',  ico: '⚡', nombre: 'Envío express',            desc: 'Andreani · 24 a 48hs',               costo: 15900, dias: '24-48hs' },
];
const ENVIO_GRATIS_DESDE_CO = 120000;

let _envioSel = 'estandar';
let _pagoSel = 'tarjeta';

(async function init() {
  await cargarProductos();
  renderHeader();
  renderFooter();

  const items = leerCarrito().map(i => ({ ...i, prod: getProducto(i.id) })).filter(i => i.prod);
  if (!items.length) {
    document.getElementById('checkout').innerHTML =
      `<div class="empty"><div class="e-ico">🛒</div><h3>No hay productos para pagar</h3><a href="index.html" class="btn btn-primary">Ir al catálogo</a></div>`;
    return;
  }
  render(items);
})();

function costoEnvio(subtotal) {
  if (_envioSel === 'retiro') return 0;
  if (_envioSel === 'estandar' && subtotal >= ENVIO_GRATIS_DESDE_CO) return 0;
  return ENVIOS.find(e => e.id === _envioSel).costo;
}

function render(items) {
  const subtotal = items.reduce((s, i) => s + i.prod.precio * i.cantidad, 0);
  const envio = costoEnvio(subtotal);
  const total = subtotal + envio;

  document.getElementById('checkout').innerHTML = `
  <h2 style="margin-bottom:6px">Finalizá tu compra</h2>
  <p style="color:var(--gris-500);margin-bottom:22px">Completá tus datos. Los pagos y envíos son <b>simulados</b> (proyecto académico).</p>
  <div class="checkout-layout">
    <div>
      <!-- Paso 1: datos -->
      <div class="step">
        <h3><span class="step-num">1</span> Datos de contacto${_envioSel === 'retiro' ? '' : ' y envío'}</h3>
        <div class="step-sub">${_envioSel === 'retiro' ? 'Te contactamos cuando esté listo para retirar' : '¿A dónde enviamos tu pedido?'}</div>
        <div class="form-grid">
          <div class="field"><label>Nombre y apellido *</label><input id="f-nombre" placeholder="Juan Pérez" onblur="validarCampo('f-nombre')"></div>
          <div class="field"><label>Email *</label><input id="f-email" type="email" placeholder="juan@email.com" onblur="validarCampo('f-email')"></div>
          <div class="field"><label>Teléfono *</label><input id="f-tel" inputmode="tel" placeholder="11 5555-5555" onblur="validarCampo('f-tel')"></div>
          <div class="field"><label>DNI *</label><input id="f-dni" inputmode="numeric" placeholder="30.123.456" onblur="validarCampo('f-dni')"></div>
          ${_envioSel === 'retiro' ? '' : `
          <div class="field full"><label>Dirección *</label><input id="f-dir" placeholder="Calle, número, piso, depto" onblur="validarCampo('f-dir')"></div>
          <div class="field"><label>Localidad *</label><input id="f-loc" placeholder="Longchamps" onblur="validarCampo('f-loc')"></div>
          <div class="field"><label>Código Postal *</label><input id="f-cp" inputmode="numeric" placeholder="1854" onblur="validarCampo('f-cp')"></div>`}
        </div>
      </div>

      <!-- Paso 2: envío -->
      <div class="step">
        <h3><span class="step-num">2</span> Método de envío</h3>
        <div class="step-sub">Elegí cómo querés recibir tu compra</div>
        <div class="ship-options">
          ${ENVIOS.map(e => {
            const gratis = (e.id === 'retiro') || (e.id === 'estandar' && subtotal >= ENVIO_GRATIS_DESDE_CO);
            return `
            <label class="ship-opt ${_envioSel === e.id ? 'sel' : ''}">
              <input type="radio" name="envio" value="${e.id}" ${_envioSel === e.id ? 'checked' : ''} onchange="cambiarEnvio('${e.id}')">
              <span class="so-ico">${e.ico}</span>
              <span class="so-main"><b>${e.nombre}</b><span>${e.desc}</span></span>
              <span class="so-price ${gratis ? 'gratis' : ''}">${gratis ? 'GRATIS' : precioARS(e.costo)}</span>
            </label>`;
          }).join('')}
        </div>
        ${_envioSel === 'retiro' ? `
        <div style="background:var(--teal-claro);border:2px solid var(--teal);border-radius:12px;padding:16px;margin-top:14px;display:flex;gap:14px;align-items:center">
          <span style="font-size:1.8rem">📍</span>
          <div style="flex:1">
            <b>Retirás en nuestro local</b>
            <div style="font-size:.9rem;color:var(--gris-700)">Carlos Diehl 690, B1854 Longchamps, Buenos Aires</div>
            <div style="font-size:.82rem;color:var(--gris-500)">Lun 7-19h · Mar a Vie 9-19h · Sáb 9-18h · Dom 9-13h · Tel: 011 6033-6914</div>
          </div>
          <a href="https://www.google.com/maps/search/Todo+Maquinas+OK,+Carlos+Diehl+690,+Longchamps" target="_blank" rel="noopener" class="btn btn-dark" style="padding:9px 14px;white-space:nowrap">🗺️ Ver mapa</a>
        </div>` : ''}
      </div>

      <!-- Paso 3: pago -->
      <div class="step">
        <h3><span class="step-num">3</span> Método de pago</h3>
        <div class="step-sub">Procesador de pagos seguro (simulado)</div>
        <div class="pay-tabs">
          <button class="pay-tab ${_pagoSel === 'tarjeta' ? 'sel' : ''}" onclick="cambiarPago('tarjeta')">💳 Tarjeta</button>
          <button class="pay-tab ${_pagoSel === 'mercadopago' ? 'sel' : ''}" onclick="cambiarPago('mercadopago')">💙 MercadoPago</button>
          <button class="pay-tab ${_pagoSel === 'transferencia' ? 'sel' : ''}" onclick="cambiarPago('transferencia')">🏦 Transferencia</button>
          <button class="pay-tab ${_pagoSel === 'efectivo' ? 'sel' : ''}" onclick="cambiarPago('efectivo')">💵 Efectivo</button>
        </div>
        <div id="pago-form">${formPago()}</div>
      </div>
    </div>

    <!-- Resumen -->
    <aside class="summary">
      <h3>Tu pedido</h3>
      ${items.map(i => `
        <div class="summary-row"><span>${i.cantidad}× ${esc(i.prod.nombre)}</span><b>${precioARS(i.prod.precio * i.cantidad)}</b></div>`).join('')}
      <div class="summary-row" style="border-top:1px solid var(--gris-100);padding-top:10px;margin-top:10px"><span>Subtotal</span><b>${precioARS(subtotal)}</b></div>
      <div class="summary-row"><span>Envío</span><b>${envio === 0 ? '<span style="color:var(--verde)">GRATIS</span>' : precioARS(envio)}</b></div>
      <div class="summary-row total"><span>Total</span><span id="total-final">${precioARS(total)}</span></div>
      <button class="btn btn-primary btn-block" style="margin-top:14px;font-size:1.05rem;padding:15px" onclick="pagar(${total})">
        🔒 Pagar ${precioARS(total)}
      </button>
      <div class="muted-note">🔒 Compra protegida · Tus datos están seguros (demo)</div>
    </aside>
  </div>`;
}

function formPago() {
  if (_pagoSel === 'tarjeta') return `
    <div class="card-visual">
      <div class="cv-chip"></div>
      <div class="cv-num" id="cv-num">•••• •••• •••• ••••</div>
      <div class="cv-row">
        <span>Titular<b id="cv-name">NOMBRE APELLIDO</b></span>
        <span>Vence<b id="cv-exp">MM/AA</b></span>
      </div>
    </div>
    <div class="form-grid">
      <div class="field full"><label>Número de tarjeta *</label><input id="p-num" inputmode="numeric" maxlength="19" placeholder="4111 1111 1111 1111" oninput="liveCard()" onblur="validarCampo('p-num')"></div>
      <div class="field full"><label>Nombre del titular *</label><input id="p-name" placeholder="Como figura en la tarjeta" oninput="liveCard()" onblur="validarCampo('p-name')"></div>
      <div class="field"><label>Vencimiento *</label><input id="p-exp" inputmode="numeric" maxlength="5" placeholder="08/29" oninput="liveCard()" onblur="validarCampo('p-exp')"></div>
      <div class="field"><label>CVV *</label><input id="p-cvv" inputmode="numeric" maxlength="4" placeholder="123" onblur="validarCampo('p-cvv')"></div>
      <div class="field full"><label>Cuotas</label>
        <select id="p-cuotas">
          <option>1 cuota</option><option selected>6 cuotas sin interés</option><option>12 cuotas</option>
        </select>
      </div>
    </div>
    <div class="muted-note">💳 Procesado por <b>TodoPay</b> (pasarela simulada). No ingreses datos reales.</div>`;

  if (_pagoSel === 'mercadopago') return `
    <div style="background:var(--teal-claro);border:2px solid #009ee3;border-radius:12px;padding:20px;text-align:center">
      <div style="font-size:2.2rem">💙</div>
      <b style="font-size:1.05rem;display:block;margin:6px 0">Pagá con MercadoPago</b>
      <p style="font-size:.88rem;color:var(--gris-700);margin-bottom:14px">Al confirmar, te redirigimos a MercadoPago para pagar con tu cuenta, dinero en cuenta o cualquier tarjeta, en cuotas.</p>
      <span style="display:inline-block;background:#009ee3;color:#fff;font-weight:700;padding:10px 20px;border-radius:8px;font-size:.9rem">🔗 Link de pago seguro</span>
    </div>
    <div class="muted-note">💙 Serás redirigido a MercadoPago (checkout simulado). No ingreses datos reales.</div>`;

  if (_pagoSel === 'transferencia') return `
    <div style="background:var(--gris-50);border-radius:10px;padding:18px;font-size:.9rem">
      <p style="margin-bottom:10px">Transferí a la siguiente cuenta y subí el comprobante. <b>10% de descuento</b> ya aplicado en efectivo/transferencia.</p>
      <p><b>Banco:</b> Banco Demo · <b>CBU:</b> 0000003100010000000001<br>
      <b>Alias:</b> TODO.MAQUINAS.FERRE · <b>Titular:</b> Todo Máquinas SRL</p>
    </div>
    <div class="muted-note">🏦 Acreditación inmediata (simulada) al confirmar.</div>`;

  return `
    <div style="background:var(--gris-50);border-radius:10px;padding:18px;font-size:.9rem">
      <p>Pagás en efectivo al retirar en el local o al recibir el pedido. <b>10% de descuento</b> por pago en efectivo.</p>
    </div>
    <div class="muted-note">💵 Coordinamos el pago al momento de la entrega (simulado).</div>`;
}

function cambiarEnvio(id) { _envioSel = id; reRender(); }
function cambiarPago(id) { _pagoSel = id; reRender(); }
function reRender() {
  const items = leerCarrito().map(i => ({ ...i, prod: getProducto(i.id) })).filter(i => i.prod);
  render(items);
}

/* Vista previa en vivo de la tarjeta */
function liveCard() {
  const num = document.getElementById('p-num');
  if (num) {
    let v = num.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    num.value = v;
    document.getElementById('cv-num').textContent = (v || '•••• •••• •••• ••••').padEnd(19, '•');
  }
  const name = document.getElementById('p-name');
  if (name) document.getElementById('cv-name').textContent = name.value.toUpperCase() || 'NOMBRE APELLIDO';
  const exp = document.getElementById('p-exp');
  if (exp) {
    let v = exp.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    exp.value = v;
    document.getElementById('cv-exp').textContent = v || 'MM/AA';
  }
}

/* ===== Validaciones del checkout ===== */

// Algoritmo de Luhn (valida número de tarjeta real)
function _luhnOk(num) {
  let suma = 0, alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = +num[i];
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    suma += d; alt = !alt;
  }
  return suma % 10 === 0;
}

// Cada validador devuelve un mensaje de error, o '' si está bien.
const VALIDADORES = {
  'f-nombre': v => {
    v = v.trim();
    if (!v) return 'Ingresá tu nombre y apellido';
    if (v.length < 3) return 'El nombre es demasiado corto';
    if (!/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s'.]+$/.test(v)) return 'El nombre solo puede tener letras';
    if (v.split(/\s+/).length < 2) return 'Ingresá nombre y apellido';
    return '';
  },
  'f-email': v => {
    v = v.trim();
    if (!v) return 'Ingresá tu email';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'No es un email válido (ej: nombre@correo.com)';
    return '';
  },
  'f-tel': v => {
    const d = v.replace(/[\s\-().+]/g, '');
    if (!d) return 'Ingresá tu teléfono';
    if (/[a-zA-Z]/.test(v)) return 'El teléfono solo puede tener números';
    if (!/^\d+$/.test(d)) return 'El teléfono solo puede tener números';
    if (d.length < 8 || d.length > 13) return 'Teléfono inválido (entre 8 y 13 dígitos)';
    return '';
  },
  'f-dni': v => {
    const d = v.replace(/[.\s]/g, ''); // permite con o sin puntos
    if (!d) return 'Ingresá tu DNI';
    if (!/^\d+$/.test(d)) return 'El DNI solo puede tener números';
    if (d.length < 7 || d.length > 8) return 'DNI inválido (7 u 8 dígitos)';
    return '';
  },
  'f-dir': v => v.trim() ? (v.trim().length < 5 ? 'Ingresá una dirección completa' : '') : 'Ingresá tu dirección',
  'f-loc': v => v.trim() ? '' : 'Ingresá tu localidad',
  'f-cp': v => {
    const d = v.trim();
    if (!d) return 'Ingresá tu código postal';
    if (!/^\d{4}$/.test(d)) return 'Código postal inválido (4 números)';
    return '';
  },
  'p-num': v => {
    const d = v.replace(/\s/g, '');
    if (!d) return 'Ingresá el número de tarjeta';
    if (!/^\d+$/.test(d)) return 'El número de tarjeta solo puede tener números';
    if (d.length < 15 || d.length > 16) return 'El número de tarjeta debe tener 16 dígitos';
    if (!_luhnOk(d)) return 'El número de tarjeta no es válido';
    return '';
  },
  'p-name': v => {
    v = v.trim();
    if (!v) return 'Ingresá el nombre del titular';
    if (!/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s'.]+$/.test(v)) return 'El nombre solo puede tener letras';
    return '';
  },
  'p-exp': v => {
    v = v.trim();
    const m = v.match(/^(\d{2})\/(\d{2})$/);
    if (!m) return 'Vencimiento inválido (MM/AA)';
    const mes = +m[1], anio = 2000 + +m[2];
    if (mes < 1 || mes > 12) return 'El mes debe estar entre 01 y 12';
    const hoy = new Date();
    const ultimoDia = new Date(anio, mes, 0); // último día de ese mes
    if (ultimoDia < new Date(hoy.getFullYear(), hoy.getMonth(), 1)) return 'La tarjeta está vencida';
    if (anio > hoy.getFullYear() + 15) return 'Revisá el año de vencimiento';
    return '';
  },
  'p-cvv': v => {
    v = v.trim();
    if (!v) return 'Ingresá el CVV';
    if (!/^\d{3,4}$/.test(v)) return 'CVV inválido (3 o 4 dígitos)';
    return '';
  },
};

// Qué campos se validan según envío/pago elegidos
function _camposActivos() {
  let ids = ['f-nombre', 'f-email', 'f-tel', 'f-dni'];
  if (_envioSel !== 'retiro') ids.push('f-dir', 'f-loc', 'f-cp');
  if (_pagoSel === 'tarjeta') ids.push('p-num', 'p-name', 'p-exp', 'p-cvv');
  return ids;
}

function _setError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  const field = el.closest('.field');
  el.classList.toggle('invalid', !!msg);
  if (!field) return;
  let err = field.querySelector('.field-error');
  if (msg) {
    if (!err) { err = document.createElement('small'); err.className = 'field-error'; field.appendChild(err); }
    err.textContent = '⚠ ' + msg;
  } else if (err) {
    err.remove();
  }
}

// Valida un campo puntual (usado en onblur)
function validarCampo(id) {
  const el = document.getElementById(id);
  if (!el || !VALIDADORES[id]) return true;
  const msg = VALIDADORES[id](el.value);
  _setError(id, msg);
  return !msg;
}

function validar() {
  let ok = true;
  _camposActivos().forEach(id => { if (!validarCampo(id)) ok = false; });
  return ok;
}

function pagar(total) {
  if (!validar()) {
    const primer = document.querySelector('.invalid');
    primer?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => primer?.focus(), 300);
    return;
  }
  // Overlay "procesando pago"
  const ov = document.createElement('div');
  ov.className = 'overlay';
  const proc = _pagoSel === 'mercadopago' ? 'Redirigiendo a MercadoPago (simulado)' : 'Conectando con TodoPay (simulado)';
  ov.innerHTML = `<div class="box"><div class="spinner"></div><b>Procesando pago...</b><br><span style="color:var(--gris-500);font-size:.85rem">${proc}</span></div>`;
  document.body.appendChild(ov);

  setTimeout(() => {
    ov.remove();
    confirmar(total);
  }, 2200);
}

function confirmar(total) {
  const orden = 'TM-' + Date.now().toString().slice(-8);
  const nombre = (document.getElementById('f-nombre')?.value || 'Cliente').split(' ')[0];
  const envio = ENVIOS.find(e => e.id === _envioSel);
  const entrega = _envioSel === 'retiro' ? 'Listo para retirar en ~2hs' :
    _envioSel === 'express' ? 'Llega en 24-48hs' : 'Llega en 3 a 5 días hábiles';

  vaciarCarrito();

  document.getElementById('checkout').innerHTML = `
  <div class="confirm">
    <div class="check">✔</div>
    <h1>¡Gracias por tu compra, ${esc(nombre)}!</h1>
    <p style="color:var(--gris-500)">Tu pago fue aprobado y estamos preparando tu pedido.</p>
    <div class="order-num">N° de orden: ${orden}</div>
    <p style="margin:8px 0">Total abonado: <b>${precioARS(total)}</b> · ${({tarjeta:'💳 Tarjeta', mercadopago:'💙 MercadoPago', transferencia:'🏦 Transferencia', efectivo:'💵 Efectivo'})[_pagoSel]}</p>

    <div class="track">
      <h4>📦 Seguimiento de tu envío — ${esc(envio.nombre)}</h4>
      <div class="track-steps">
        <div class="track-step done"><span class="ts-dot">✔</span>Pago<br>confirmado</div>
        <div class="track-step done"><span class="ts-dot">📦</span>En<br>preparación</div>
        <div class="track-step"><span class="ts-dot">🚚</span>En<br>camino</div>
        <div class="track-step"><span class="ts-dot">🏠</span>${_envioSel === 'retiro' ? 'Listo para<br>retirar' : 'Entregado'}</div>
      </div>
      <p style="text-align:center;margin-top:16px;color:var(--gris-700);font-size:.9rem">📍 ${entrega}</p>
    </div>

    <p style="font-size:.85rem;color:var(--gris-500);margin-bottom:20px">Te enviamos un email de confirmación con el detalle (simulado).</p>
    <a href="index.html" class="btn btn-primary">Seguir comprando</a>
  </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
