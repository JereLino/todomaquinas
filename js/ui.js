/* ===== ui.js — header, footer y componentes compartidos ===== */

const TELEFONO = '011 6033-6914';
const WHATSAPP = '5491160336914'; // formato internacional sin signos, para wa.me
const DIRECCION = 'Carlos Diehl 690, B1854 Longchamps, Buenos Aires';
const INSTAGRAM = 'https://www.instagram.com/todomaquinasok/';
// Coordenadas reales (Carlos Diehl, Longchamps - CP B1854)
const LAT = -34.8551863, LNG = -58.3727016;
const MAPS_QUERY = 'Todo Maquinas OK, Carlos Diehl 690, Longchamps';
// Embeds keyless de Google (formato /maps/embed?pb=, sin API key)
const MAPS_EMBED = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${encodeURIComponent('Todo Maquinas OK Carlos Diehl 690 Longchamps')}!6i17`;
const STREETVIEW_EMBED = `https://www.google.com/maps/embed?origin=mfe&pb=!6m6!1m5!2m2!1d${LAT}!2d${LNG}!4f-0!5f1`;
const MAPS_LINK = `https://www.google.com/maps/search/${encodeURIComponent(MAPS_QUERY)}`;
const STREETVIEW_LINK = `https://www.google.com/maps?q=&layer=c&cbll=${LAT},${LNG}`;
const NAV_CATS = ['Herramientas Eléctricas', 'Máquinas', 'Herramientas Manuales', 'Construcción', 'Pinturería', 'Seguridad', 'Jardín', 'Fijaciones'];

function urlCategoria(c) { return `index.html?cat=${encodeURIComponent(c)}`; }

/* --- Logos de marca (SVG oficiales) --- */
const SVG_WHATSAPP = `<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.12.55 4.18 1.6 6L4 28l6.13-1.6a12 12 0 0 0 5.9 1.5h.01C22.68 27.9 28 22.5 28 15.96 28 9.4 22.68 4 16.04 4zm0 21.8c-1.86 0-3.68-.5-5.27-1.45l-.38-.22-3.64.95.97-3.55-.25-.4a9.8 9.8 0 0 1-1.5-5.24c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.96c0 5.44-4.42 9.85-9.86 9.85zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z"/></svg>`;
const SVG_INSTAGRAM = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.93 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>`;
const SVG_TEL = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.5 11.5 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .57 3.6 1 1 0 0 1-.25 1.02l-2.2 2.17z"/></svg>`;

function renderHeader(activo = '') {
  const cont = document.getElementById('app-header');
  if (!cont) return;
  cont.innerHTML = `
  <div class="topbar"><div class="container">
    <span>🚚 Envío gratis en compras desde ${precioARS(120000)} · 📍 Retiro en local sin costo</span>
    <div class="tb-right">
      <a href="tel:${TELEFONO.replace(/[^0-9+]/g, '')}">📞 ${TELEFONO}</a>
      <a href="#">Mi cuenta</a>
      <a href="#">Ayuda</a>
    </div>
  </div></div>

  <header class="header"><div class="container">
    <a href="index.html" class="logo">
      <img class="logo-mark" src="assets/logo.jpg" alt="Todo Máquinas">
      <span class="logo-txt"><b>TODO</b> <i>MÁQUINAS</i></span>
    </a>
    <div class="search-wrap">
      <form class="search" onsubmit="return irABusqueda(event)">
        <input id="search-input" type="search" placeholder="Buscá herramientas, máquinas, marcas..." autocomplete="off"
               oninput="sugerirBusqueda(this.value)" onfocus="sugerirBusqueda(this.value)">
        <button type="submit">🔍</button>
      </form>
      <div class="search-suggest" id="search-suggest"></div>
    </div>
    <div class="header-actions">
      <a href="#" class="icon-btn"><span class="ico">❤️</span>Favoritos</a>
      <a href="cart.html" class="cart-btn">
        <span class="ico">🛒</span>
        <span class="cart-label"><small>Mi compra</small><b>Carrito</b></span>
        <span class="cart-badge" id="cart-badge" style="display:none">0</span>
      </a>
    </div>
  </div></header>

  <nav class="nav"><div class="container">
    ${NAV_CATS.map(c => `<a href="${urlCategoria(c)}" class="${c === activo ? 'active' : ''}">${c}</a>`).join('')}
    <a href="info.html?seccion=promociones" class="nav-promos">🎁 Promociones</a>
    <a href="info.html?seccion=nosotros" class="nav-nosotros">🏢 Nosotros</a>
    <span class="nav-tag">🔥 Precios bajos siempre</span>
  </div></nav>`;
  actualizarBadge();
  renderFloatingContact();
  renderChatbot();
  renderTour();

  // si venimos con búsqueda en la URL, reflejarla en el input
  const q = new URLSearchParams(location.search).get('q');
  if (q) { const i = document.getElementById('search-input'); if (i) i.value = q; }
}

/* Botones de contacto flotantes (fixed, siempre visibles al scrollear) */
function renderFloatingContact() {
  if (document.getElementById('float-contact')) return;
  const div = document.createElement('div');
  div.id = 'float-contact';
  div.className = 'float-contact';
  div.innerHTML = `
    <a class="fc-wa" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="WhatsApp">
      ${SVG_WHATSAPP}<span class="fc-tip">Escribinos por WhatsApp</span>
    </a>
    <a class="fc-ig" href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram">
      ${SVG_INSTAGRAM}<span class="fc-tip">Seguinos en Instagram</span>
    </a>
    <a class="fc-tel" href="tel:${TELEFONO.replace(/[^0-9+]/g, '')}" aria-label="Llamar">
      ${SVG_TEL}<span class="fc-tip">Llamanos ${TELEFONO}</span>
    </a>`;
  document.body.appendChild(div);
}

function irABusqueda(e) {
  e.preventDefault();
  const q = document.getElementById('search-input').value.trim();
  location.href = q ? `index.html?q=${encodeURIComponent(q)}` : 'index.html';
  return false;
}

/* Buscador predictivo: sugiere productos mientras escribís */
function sugerirBusqueda(valor) {
  const cont = document.getElementById('search-suggest');
  if (!cont) return;
  const q = _norm((valor || '').trim());
  if (q.length < 2 || !TM.productos.length) { cont.classList.remove('open'); cont.innerHTML = ''; return; }

  const res = TM.productos.filter(p =>
    _norm(p.nombre + ' ' + p.marca + ' ' + p.categoria).includes(q)).slice(0, 6);

  if (!res.length) {
    cont.innerHTML = `<div class="ss-empty">Sin coincidencias para "<b>${esc(valor)}</b>"</div>`;
    cont.classList.add('open');
    return;
  }

  cont.innerHTML =
    res.map(p => `
      <a class="ss-item" href="product.html?id=${p.id}">
        <img src="${imgSrc(p)}" alt="" onerror="this.onerror=null;this.src='${svgFallback(p)}'">
        <span class="ss-nom">${esc(p.nombre)}<small>${esc(p.categoria)}</small></span>
        <span class="ss-precio">${precioARS(p.precio)}</span>
      </a>`).join('') +
    `<a class="ss-all" href="index.html?q=${encodeURIComponent(valor.trim())}">🔍 Ver todos los resultados de "${esc(valor.trim())}"</a>`;
  cont.classList.add('open');
}

// Cerrar sugerencias al hacer click fuera
document.addEventListener('click', e => {
  const w = e.target.closest('.search-wrap');
  if (!w) document.getElementById('search-suggest')?.classList.remove('open');
});

// Cerrar el recorrido guiado con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('tour-ov')?.classList.contains('open')) cerrarTour();
});

/* ===== Asistente / Chatbot mockeado ===== */
function _norm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Proyecto -> palabras que lo detectan + términos para buscar productos + consejo
const PROYECTOS = [
  { nombre: 'colgar un estante', emoji: '🪚', detect: ['estante', 'repisa', 'cuadro', 'colgar', 'pared', 'biblioteca', 'soporte'],
    buscar: ['taladro', 'mecha', 'tarugo', 'tornillo', 'nivel'],
    consejo: 'Para colgar un estante necesitás perforar la pared, fijar bien y que quede derecho. Te recomiendo:' },
  { nombre: 'pintar una pared', emoji: '🎨', detect: ['pintar', 'pintura', 'pared', 'rodillo', 'pincel', 'latex', 'esmalte'],
    buscar: ['rodillo', 'pincel', 'cinta papel', 'cinta de papel'],
    consejo: 'Para pintar prolijo te conviene rodillo, pincel para los bordes y cinta de enmascarar:' },
  { nombre: 'perforar / hacer agujeros', emoji: '🕳️', detect: ['agujero', 'perforar', 'taladrar', 'taladro', 'mecha', 'broca'],
    buscar: ['taladro', 'mecha', 'tarugo', 'rotomartillo'],
    consejo: 'Para hacer agujeros necesitás un buen taladro y las mechas correctas según el material:' },
  { nombre: 'atornillar', emoji: '🪛', detect: ['atornillar', 'tornillo', 'destornillador', 'atornillador', 'mueble', 'armar'],
    buscar: ['atornillador', 'destornillador', 'tornillo', 'llave'],
    consejo: 'Para atornillar cómodo, un atornillador inalámbrico te va a ahorrar mucho tiempo:' },
  { nombre: 'cortar madera', emoji: '🪵', detect: ['cortar madera', 'madera', 'sierra', 'caladora', 'tabla', 'aglomerado'],
    buscar: ['sierra', 'caladora'],
    consejo: 'Para cortar madera, según el tipo de corte te sirve una sierra circular o una caladora:' },
  { nombre: 'cortar o amolar metal', emoji: '⚙️', detect: ['metal', 'amoladora', 'amolar', 'hierro', 'caño', 'desbastar', 'disco'],
    buscar: ['amoladora'],
    consejo: 'Para cortar o desbastar metal, una amoladora angular es la herramienta clave:' },
  { nombre: 'lijar', emoji: '🟫', detect: ['lijar', 'lijadora', 'lija', 'pulir', 'alisar'],
    buscar: ['lijadora'],
    consejo: 'Para dejar una superficie lisa, una lijadora orbital te facilita el trabajo:' },
  { nombre: 'soldar', emoji: '⚡', detect: ['soldar', 'soldadora', 'soldadura'],
    buscar: ['soldadora', 'antiparra', 'guante'],
    consejo: 'Para soldar, además de la soldadora no te olvides de la protección:' },
  { nombre: 'trabajo de jardín', emoji: '🌿', detect: ['jardin', 'jardín', 'podar', 'pasto', 'cesped', 'césped', 'planta', 'arbol', 'árbol', 'regar', 'manguera'],
    buscar: ['tijera', 'motosierra', 'desmalezadora', 'manguera'],
    consejo: 'Para el jardín, según la tarea te sirve podar, desmalezar o regar:' },
  { nombre: 'albañilería / construcción', emoji: '🧱', detect: ['albañil', 'albanil', 'construccion', 'construcción', 'cemento', 'mezcla', 'ladrillo', 'carretilla', 'obra'],
    buscar: ['carretilla', 'balde', 'cuchara', 'hormigonera', 'mezcladora'],
    consejo: 'Para trabajos de obra y albañilería estos básicos no pueden faltar:' },
  { nombre: 'limpieza a presión', emoji: '🚿', detect: ['lavar', 'hidrolavadora', 'limpiar', 'presion', 'presión', 'vereda', 'auto'],
    buscar: ['hidrolavadora'],
    consejo: 'Para limpiar con fuerza (vereda, auto, frente), una hidrolavadora es ideal:' },
  { nombre: 'seguridad y protección', emoji: '⛑️', detect: ['seguridad', 'proteccion', 'protección', 'casco', 'guante', 'antiparra', 'auditivo', 'cuidar'],
    buscar: ['casco', 'guante', 'antiparra', 'protector'],
    consejo: 'La seguridad primero. Estos elementos de protección personal te cuidan:' },
];

const CHIPS_INICIO = ['Colgar un estante', 'Pintar una pared', 'Cortar metal', 'Trabajo de jardín'];

function _buscarProductosPorTerminos(terminos, n = 4) {
  const out = [], vistos = new Set();
  for (const t of terminos) {
    const tn = _norm(t);
    for (const p of TM.productos) {
      if (vistos.has(p.id)) continue;
      if (_norm(p.nombre + ' ' + p.categoria).includes(tn)) { vistos.add(p.id); out.push(p); }
    }
  }
  return out.slice(0, n);
}

function _cardChat(p) {
  return `<div class="chat-card">
    <img src="${imgSrc(p)}" alt="${esc(p.nombre)}" onerror="this.onerror=null;this.src='${svgFallback(p)}'">
    <div class="cc-info">
      <a href="product.html?id=${p.id}">${esc(p.nombre)}</a>
      <div class="cc-precio">${precioARS(p.precio)}</div>
    </div>
    <button class="cc-add" onclick="chatAgregar('${p.id}')">+ Agregar</button>
  </div>`;
}

function chatAgregar(id) {
  agregarAlCarrito(id, 1);
  const p = getProducto(id);
  if (p) mostrarToast(p.nombre);
  _chatBot(`✅ Agregué <b>${esc(p ? p.nombre : 'el producto')}</b> a tu carrito. ¿Necesitás algo más para tu proyecto?`);
}

function _chatScroll() {
  const b = document.getElementById('chat-body');
  if (b) b.scrollTop = b.scrollHeight;
}
function _chatBot(html) {
  const b = document.getElementById('chat-body');
  if (!b) return;
  b.insertAdjacentHTML('beforeend', `<div class="chat-msg bot">${html}</div>`);
  _chatScroll();
}
function _chatUser(text) {
  const b = document.getElementById('chat-body');
  if (!b) return;
  b.insertAdjacentHTML('beforeend', `<div class="chat-msg user">${esc(text)}</div>`);
  _chatScroll();
}
function _chatChips(arr) {
  const b = document.getElementById('chat-body');
  if (!b) return;
  b.insertAdjacentHTML('beforeend',
    `<div class="chat-chips">${arr.map(c => `<button onclick="chatResponder('${c.replace(/'/g, "\\'")}')">${esc(c)}</button>`).join('')}</div>`);
  _chatScroll();
}
function _chatTyping(on) {
  const b = document.getElementById('chat-body');
  if (!b) return;
  const ex = document.getElementById('chat-typing');
  if (on && !ex) {
    b.insertAdjacentHTML('beforeend', `<div class="chat-typing" id="chat-typing"><span></span><span></span><span></span></div>`);
    _chatScroll();
  } else if (!on && ex) ex.remove();
}

// Procesa el mensaje del usuario y responde (con un pequeño "escribiendo...")
function chatResponder(texto) {
  texto = (texto || '').trim();
  if (!texto) return;
  _chatUser(texto);
  const input = document.getElementById('chat-input');
  if (input) input.value = '';
  _chatTyping(true);

  setTimeout(() => {
    _chatTyping(false);
    const tn = _norm(texto);
    const proy = PROYECTOS.find(p => p.detect.some(k => tn.includes(_norm(k))));

    if (proy) {
      const recs = _buscarProductosPorTerminos(proy.buscar, 4);
      _chatBot(`${proy.emoji} <b>${proy.nombre.charAt(0).toUpperCase() + proy.nombre.slice(1)}</b><br>${proy.consejo}`);
      if (recs.length) {
        const b = document.getElementById('chat-body');
        b.insertAdjacentHTML('beforeend', `<div class="chat-rec">${recs.map(_cardChat).join('')}</div>`);
        _chatScroll();
        _chatBot('¿Querés que te recomiende algo para otro proyecto?');
      } else {
        _chatBot('Por ahora no tengo esos productos cargados, pero podés ver todo el catálogo en la tienda 🙂');
      }
      return;
    }

    // Búsqueda directa de productos por lo que escribió
    const directos = _buscarProductosPorTerminos([texto], 4);
    if (directos.length) {
      _chatBot(`Encontré esto que puede servirte para "<b>${esc(texto)}</b>":`);
      const b = document.getElementById('chat-body');
      b.insertAdjacentHTML('beforeend', `<div class="chat-rec">${directos.map(_cardChat).join('')}</div>`);
      _chatScroll();
      return;
    }

    _chatBot('Mmm, no estoy seguro de qué proyecto tenés en mente 🤔. Probá con alguna de estas opciones o contame qué querés hacer:');
    _chatChips(CHIPS_INICIO);
  }, 650);
}

let _chatIniciado = false;
function abrirChat() {
  const panel = document.getElementById('chat-panel');
  if (!panel) return;
  panel.classList.add('open');
  document.getElementById('chat-launcher').style.display = 'none';
  if (!_chatIniciado) {
    _chatIniciado = true;
    _chatBot('¡Hola! 👋 Soy <b>Marito</b>, el asistente de <b>Todo Máquinas</b>. Contame qué proyecto tenés en mente y te recomiendo las herramientas justas.');
    _chatBot('Por ejemplo:');
    _chatChips(CHIPS_INICIO);
  }
  setTimeout(() => document.getElementById('chat-input')?.focus(), 250);
}
function cerrarChat() {
  document.getElementById('chat-panel')?.classList.remove('open');
  const l = document.getElementById('chat-launcher');
  if (l) l.style.display = 'flex';
}

function renderChatbot() {
  if (document.getElementById('chat-launcher')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button class="chat-launcher" id="chat-launcher" onclick="abrirChat()">
      <span class="cl-ico">🛠️</span> Consultá a Marito<span class="cl-dot"></span>
    </button>
    <div class="chat-panel" id="chat-panel">
      <div class="chat-head">
        <img src="assets/logo.jpg" alt="Todo Máquinas">
        <div class="ch-info"><b>Marito · Asistente</b><span>En línea</span></div>
        <button class="ch-close" onclick="cerrarChat()" aria-label="Cerrar">✕</button>
      </div>
      <div class="chat-body" id="chat-body"></div>
      <form class="chat-foot" onsubmit="return chatEnviar(event)">
        <input id="chat-input" type="text" placeholder="Escribí tu proyecto..." autocomplete="off">
        <button type="submit" aria-label="Enviar">➤</button>
      </form>
    </div>`;
  document.body.appendChild(wrap);
}
function chatEnviar(e) {
  e.preventDefault();
  const i = document.getElementById('chat-input');
  if (i && i.value.trim()) chatResponder(i.value);
  return false;
}

/* ===== Recorrido guiado interactivo (spotlight sobre la página real) ===== */
// Cada paso apunta a un elemento real del home. `sel` = selector; si no existe, se saltea.
const TOUR_STEPS = [
  { sel: null, centro: true, ico: '👋', titulo: '¡Bienvenido a Todo Máquinas!',
    txt: 'Te muestro la tienda paso a paso, marcando cada parte de la página. Dale a <b>Siguiente</b> para arrancar (o cerrá con la ✕ cuando quieras).' },
  { sel: '.search-wrap', ico: '🔍', titulo: 'Buscador',
    txt: 'Escribí acá un <b>producto</b>, una <b>marca</b> o lo que vayas a hacer. Mientras tipeás aparecen sugerencias con foto y precio.' },
  { sel: '.nav-promos', ico: '🎁', titulo: 'Promociones del mes',
    txt: 'Acá juntamos todas las <b>ofertas vigentes</b> y los <b>cupones de descuento</b> para que pagues menos.' },
  { sel: '#ofertas', ico: '🔥', titulo: 'Ofertas destacadas',
    txt: 'Los productos de <b>mayor rotación</b> al mejor precio. Mirá las rebajas del momento apenas entrás.' },
  { sel: '#chips', ico: '🗂️', titulo: 'Categorías',
    txt: 'Filtrá el catálogo por rubro: Herramientas, Máquinas, <b>Sanitarios</b>, <b>Electricidad</b> y más. Tocá un chip para ver solo esa categoría.' },
  { sel: '.toolbar-right', ico: '⚙️', titulo: 'Ordenar y filtrar',
    txt: 'Ordená por <b>precio</b> o <b>descuento</b> y acotá por <b>rango de precio</b> para encontrar justo lo que buscás.' },
  { sel: '#catalogo-grid', ico: '🛍️', titulo: 'Todo el catálogo',
    txt: 'Más de 100 productos reales con foto. Tocá cualquiera para ver su <b>ficha</b>, fotos y agregarlo al carrito.' },
  { sel: '.cart-btn', ico: '🛒', titulo: 'Tu carrito',
    txt: 'Lo que sumes queda guardado acá (aunque cierres la página). Desde el carrito aplicás <b>cupones</b> y vas al <b>pago</b>.' },
  { sel: '#chat-launcher', ico: '🤖', titulo: 'Consultá a Marito',
    txt: 'Nuestro asistente. Contale tu proyecto («colgar un estante», «pintar el living») y te recomienda las <b>herramientas justas</b>.' },
  { sel: '#float-contact', ico: '📞', titulo: 'Contacto directo',
    txt: '<b>WhatsApp</b>, <b>Instagram</b> y teléfono siempre a mano para sacarte cualquier duda al toque.' },
  { sel: '.footer', ico: '📍', titulo: 'Info y dónde estamos',
    txt: 'Legales, medios de pago, horarios y el <b>Street View</b> de nuestro local en Longchamps. ¡Listo, ya conocés la tienda!' },
];

let _tourIdx = 0, _tourEnPantalla = false, _tourEl = null, _tourRAF = null;
const _esHome = () => !!document.getElementById('chips');

function renderTour() {
  if (document.getElementById('tour-ov')) return;
  const ov = document.createElement('div');
  ov.id = 'tour-ov';
  ov.className = 'tour-ov';
  ov.innerHTML = `
    <div class="tour-catch"></div>
    <div class="tour-spot" id="tour-spot"></div>
    <div class="tour-pop" id="tour-pop" role="dialog" aria-modal="true" aria-label="Recorrido guiado">
      <button class="tour-x" onclick="cerrarTour()" aria-label="Cerrar recorrido">✕</button>
      <div class="tour-pop-head"><span class="tour-ico" id="tour-ico"></span><h3 class="tour-titulo" id="tour-titulo"></h3></div>
      <p class="tour-txt" id="tour-txt"></p>
      <div class="tour-dots" id="tour-dots"></div>
      <div class="tour-nav">
        <button class="tour-prev" id="tour-prev" onclick="tourMover(-1)">← Anterior</button>
        <span class="tour-cont" id="tour-cont"></span>
        <button class="tour-next" id="tour-next" onclick="tourMover(1)">Siguiente →</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  ov.querySelector('.tour-catch').addEventListener('click', cerrarTour);
  window.addEventListener('resize', () => { if (_tourEnPantalla) posicionarTour(); });
  window.addEventListener('scroll', () => { if (_tourEnPantalla) posicionarTour(); }, { passive: true });

  // Arranque automático: primera visita, o si venimos redirigidos con ?tour=N
  const param = new URLSearchParams(location.search).get('tour');
  const pedido = param !== null;
  if (_esHome() && (pedido || !localStorage.getItem('tm_tour_visto'))) {
    const inicio = parseInt(param, 10) - 1;  // ?tour=5 → empieza en el paso 5
    setTimeout(() => abrirTour(inicio > 0 ? inicio : 0), pedido ? 400 : 1100);
  }
}

function abrirTour(inicio = 0) {
  // El recorrido interactivo vive en el home; desde otra página, redirigimos allá
  if (!_esHome()) { location.href = 'index.html?tour=1'; return; }
  const ov = document.getElementById('tour-ov');
  if (!ov) return;
  _tourIdx = (typeof inicio === 'number' && inicio >= 0 && inicio < TOUR_STEPS.length) ? inicio : 0;
  _tourEnPantalla = true;
  ov.classList.add('open');
  mostrarPaso();
}

function cerrarTour() {
  document.getElementById('tour-ov')?.classList.remove('open');
  cancelAnimationFrame(_tourRAF);
  _tourEnPantalla = false;
  _tourEl = null;
  localStorage.setItem('tm_tour_visto', '1');
  if (new URLSearchParams(location.search).get('tour')) {
    history.replaceState(null, '', location.pathname);
  }
}

function tourMover(d) {
  const next = _tourIdx + d;
  if (next < 0) return;
  if (next >= TOUR_STEPS.length) { cerrarTour(); return; }
  _tourIdx = next;
  mostrarPaso();
}

function tourIr(n) { _tourIdx = n; mostrarPaso(); }

function mostrarPaso() {
  const s = TOUR_STEPS[_tourIdx];
  const ultimo = _tourIdx === TOUR_STEPS.length - 1;
  const el = s.sel ? document.querySelector(s.sel) : null;

  // Si el elemento de este paso no existe, lo salteamos
  if (s.sel && !el) {
    if (_tourIdx < TOUR_STEPS.length - 1) { _tourIdx++; mostrarPaso(); }
    else cerrarTour();
    return;
  }
  _tourEl = el;

  // Contenido del cartelito
  document.getElementById('tour-ico').textContent = s.ico;
  document.getElementById('tour-titulo').textContent = s.titulo;
  document.getElementById('tour-txt').innerHTML = s.txt;
  document.getElementById('tour-cont').textContent = `${_tourIdx + 1} de ${TOUR_STEPS.length}`;
  document.getElementById('tour-prev').style.visibility = _tourIdx === 0 ? 'hidden' : 'visible';
  document.getElementById('tour-next').innerHTML = ultimo ? '¡Listo! 🚀' : 'Siguiente →';
  document.getElementById('tour-dots').innerHTML = TOUR_STEPS
    .map((_, i) => `<button class="tour-dot ${i === _tourIdx ? 'active' : ''}" onclick="tourIr(${i})" aria-label="Paso ${i + 1}"></button>`)
    .join('');

  cancelAnimationFrame(_tourRAF);
  if (el) {
    // Scroll instantáneo (confiable): el deslizamiento visual lo da la transición
    // CSS del recuadro de foco, que glidea de un elemento al siguiente.
    el.scrollIntoView({ behavior: 'auto', block: 'center' });
    // Reposicionamos unos cuantos cuadros por si el layout aún se acomoda (imágenes, etc.)
    seguirElemento(performance.now() + 400);
  } else {
    posicionarTour(); // paso de bienvenida: sin foco, cartelito centrado
  }
}

function seguirElemento(hasta) {
  posicionarTour();
  if (_tourEnPantalla && performance.now() < hasta) {
    _tourRAF = requestAnimationFrame(() => seguirElemento(hasta));
  }
}

function posicionarTour() {
  const spot = document.getElementById('tour-spot');
  const pop = document.getElementById('tour-pop');
  const vw = window.innerWidth, vh = window.innerHeight, gap = 14;

  // Paso sin elemento (bienvenida): apagar spotlight y centrar el cartelito
  if (!_tourEl) {
    spot.classList.add('off');
    pop.style.top = Math.max(gap, (vh - pop.offsetHeight) / 2) + 'px';
    pop.style.left = Math.max(gap, (vw - pop.offsetWidth) / 2) + 'px';
    return;
  }

  spot.classList.remove('off');
  const r = _tourEl.getBoundingClientRect();
  const pad = 6;
  spot.style.top = (r.top - pad) + 'px';
  spot.style.left = (r.left - pad) + 'px';
  spot.style.width = (r.width + pad * 2) + 'px';
  spot.style.height = (r.height + pad * 2) + 'px';

  // Ubicar el cartelito: preferimos abajo del elemento; si no entra, arriba; si no, al costado/centro
  const ph = pop.offsetHeight, pw = pop.offsetWidth;
  let top;
  if (r.bottom + gap + ph <= vh) top = r.bottom + gap;
  else if (r.top - gap - ph >= 0) top = r.top - gap - ph;
  else top = Math.max(gap, Math.min(vh - ph - gap, r.top));
  let left = r.left + r.width / 2 - pw / 2;
  left = Math.max(gap, Math.min(left, vw - pw - gap));
  pop.style.top = top + 'px';
  pop.style.left = left + 'px';
}

function renderFooter() {
  const cont = document.getElementById('app-footer');
  if (!cont) return;
  cont.innerHTML = `
  <footer class="footer"><div class="container">
    <!-- Marca + redes + medios de pago -->
    <div>
      <div class="logo"><img class="logo-mark" src="assets/logo.jpg" alt="Todo Máquinas"><span class="logo-txt" style="color:#fff"><b style="color:var(--teal)">TODO</b> <i style="color:var(--amarillo)">MÁQUINAS</i></span></div>
      <p style="font-size:.88rem">Tu ferretería de confianza. Herramientas y máquinas al mejor precio, con la mayor variedad y stock permanente.</p>

      <h4 style="margin-top:18px">Redes y contacto</h4>
      <div class="social-links">
        <a class="ig" href="${INSTAGRAM}" target="_blank" rel="noopener" title="Instagram @todomaquinasok">${SVG_INSTAGRAM}</a>
        <a class="wa" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" title="WhatsApp">${SVG_WHATSAPP}</a>
        <a class="tel" href="tel:${TELEFONO.replace(/[^0-9+]/g, '')}" title="Llamar">${SVG_TEL}</a>
      </div>

      <h4 style="margin-top:18px">Medios de pago</h4>
      <div class="pay-badges">
        <span>💳 Tarjetas</span>
        <span>🏦 Transferencia</span>
        <span class="mp">💙 MercadoPago</span>
        <span>💵 Efectivo</span>
      </div>
    </div>

    <!-- Información legal -->
    <div>
      <h4>Información legal</h4>
      <ul>
        <li><a href="info.html?seccion=nosotros">Nosotros (misión y visión)</a></li>
        <li><a href="info.html?seccion=aviso-legal">Aviso legal</a></li>
        <li><a href="info.html?seccion=cambios">Política de cambios y devoluciones</a></li>
        <li><a href="info.html?seccion=privacidad">Política de privacidad</a></li>
        <li><a href="info.html?seccion=terminos">Términos y condiciones</a></li>
        <li><a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor" target="_blank" rel="noopener">Defensa del Consumidor</a></li>
      </ul>
      <button class="foot-tour" onclick="abrirTour()" title="Recorrido guiado por la tienda">
        🧭 ¿Primera vez acá? <b>Hacé el recorrido guiado</b>
      </button>
    </div>

    <!-- Compra y envíos -->
    <div>
      <h4>Compra y envíos</h4>
      <ul>
        <li><a href="info.html?seccion=promociones">🎁 Promociones del mes</a></li>
        <li><a href="info.html?seccion=como-comprar">Cómo comprar</a></li>
        <li><a href="info.html?seccion=pagos">Medios y link de pago</a></li>
        <li><a href="info.html?seccion=envios">Envíos y logística</a></li>
        <li><a href="info.html?seccion=cambios">Cambios y devoluciones</a></li>
        <li><a href="info.html?seccion=contacto">Contacto</a></li>
        <li><a href="info.html?seccion=faq">Preguntas frecuentes</a></li>
      </ul>
    </div>

    <!-- Ubicación + Street View de Google -->
    <div>
      <h4>Dónde estamos</h4>
      <ul>
        <li>📍 ${esc(DIRECCION)}</li>
        <li>📞 <a href="tel:${TELEFONO.replace(/[^0-9+]/g, '')}">${TELEFONO}</a></li>
        <li>💬 <a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a></li>
        <li>🕒 Lun 7-19h · Mar a Vie 9-19h</li>
        <li style="margin-left:1.4em;color:#999">Sáb 9-18h · Dom 9-13h</li>
      </ul>
      <iframe class="map-embed" src="${STREETVIEW_EMBED}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Vista a la calle (Street View) de Todo Máquinas"></iframe>
      <div class="map-links">
        <a href="${MAPS_LINK}" target="_blank" rel="noopener">📍 Cómo llegar</a>
        <a class="sv" href="${STREETVIEW_LINK}" target="_blank" rel="noopener">🛣️ Abrir Street View</a>
      </div>
    </div>
  </div>
  <div class="foot-bottom container">
    © 2026 Todo Máquinas — Proyecto académico (demo). Pagos y envíos simulados, sin transacciones reales.<br>
    Desarrollado por <b>Jeremías Pascolo</b>.
  </div></footer>`;
}

/* --- Tarjeta de producto reutilizable --- */
function cardProducto(p) {
  const off = descuento(p);
  const stockBajo = p.stock > 0 && p.stock <= 10;
  return `
  <div class="card">
    <a href="product.html?id=${p.id}" class="thumb">
      ${off ? `<span class="badge">-${off}%</span>` : ''}
      ${stockBajo ? `<span class="badge badge-stock badge-bajo">¡Últimas ${p.stock}!</span>`
                  : `<span class="badge badge-stock">En stock</span>`}
      <img src="${imgSrc(p)}" alt="${esc(p.nombre)}" loading="lazy" onerror="this.onerror=null;this.src='${svgFallback(p)}'">
    </a>
    <div class="body">
      <span class="marca">${esc(p.marca)}</span>
      <h3><a href="product.html?id=${p.id}">${esc(p.nombre)}</a></h3>
      <div class="precio-row">
        <span class="precio">${precioARS(p.precio)}</span>
        ${off ? `<span class="precio-old">${precioARS(p.precioAnterior)}</span>` : ''}
      </div>
      ${off ? `<span class="precio-off">Ahorrás ${precioARS(p.precioAnterior - p.precio)}</span>` : '<span class="precio-off">&nbsp;</span>'}
      <span class="cuotas">${cuotas(p.precio)}</span>
      <button class="btn btn-primary card-btn btn-block" onclick="agregarAlCarrito('${p.id}');mostrarToast('${esc(p.nombre).replace(/'/g,"\\'")}')">
        🛒 Agregar
      </button>
    </div>
  </div>`;
}

function gridProductos(lista) {
  if (!lista.length) return `<div class="empty"><div class="e-ico">🔍</div><h3>No encontramos productos</h3><p>Probá con otra búsqueda o categoría.</p><a href="index.html" class="btn btn-primary">Ver todo el catálogo</a></div>`;
  return `<div class="grid">${lista.map(cardProducto).join('')}</div>`;
}
