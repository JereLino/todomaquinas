/* ===== data.js — carga del CSV, parseo y helpers compartidos ===== */

const TM = {
  productos: [],
  cargado: false,
};

/* --- Parser CSV robusto (soporta comillas y comas internas) --- */
function parseCSV(texto) {
  const filas = [];
  let campo = '', fila = [], dentroComillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i], sig = texto[i + 1];
    if (dentroComillas) {
      if (c === '"' && sig === '"') { campo += '"'; i++; }
      else if (c === '"') { dentroComillas = false; }
      else { campo += c; }
    } else {
      if (c === '"') dentroComillas = true;
      else if (c === ',') { fila.push(campo); campo = ''; }
      else if (c === '\n') { fila.push(campo); filas.push(fila); fila = []; campo = ''; }
      else if (c === '\r') { /* ignorar */ }
      else campo += c;
    }
  }
  if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila); }
  return filas;
}

/* --- Carga el catálogo desde data/productos.csv --- */
async function cargarProductos() {
  if (TM.cargado) return TM.productos;
  try {
    const resp = await fetch('data/productos.csv');
    if (!resp.ok) throw new Error('No se pudo leer el CSV');
    const filas = parseCSV(await resp.text()).filter(f => f.length > 1);
    const headers = filas[0].map(h => h.trim());
    TM.productos = filas.slice(1).map(cols => {
      const o = {};
      headers.forEach((h, i) => o[h] = (cols[i] ?? '').trim());
      return {
        id: o.id,
        nombre: o.nombre,
        categoria: o.categoria,
        precio: Number(o.precio),
        precioAnterior: Number(o.precio_anterior) || 0,
        marca: o.marca,
        descripcion: o.descripcion,
        stock: Number(o.stock) || 0,
        destacado: o.destacado === '1',
        emoji: o.emoji || '🛠️',
        imagen: o.imagen || '',
        relacionados: o.relacionados ? o.relacionados.split(';').map(s => s.trim()).filter(Boolean) : [],
      };
    });
    TM.cargado = true;
    return TM.productos;
  } catch (e) {
    console.error('Error cargando productos:', e);
    document.body.insertAdjacentHTML('afterbegin',
      `<div style="background:#dc2626;color:#fff;padding:12px;text-align:center;font-size:.9rem">
       ⚠️ No se pudo cargar el catálogo. Serví el sitio con un servidor local
       (ej: <b>python3 -m http.server</b>) en vez de abrir el archivo directamente.</div>`);
    return [];
  }
}

function getProducto(id) {
  return TM.productos.find(p => p.id === String(id));
}

function getRelacionados(prod, n = 4) {
  let rel = prod.relacionados.map(id => getProducto(id)).filter(Boolean);
  if (rel.length < n) {
    const extra = TM.productos.filter(p =>
      p.categoria === prod.categoria && p.id !== prod.id && !rel.includes(p));
    rel = rel.concat(extra);
  }
  return rel.slice(0, n);
}

/* --- Categorías únicas con conteo --- */
function getCategorias() {
  const map = {};
  TM.productos.forEach(p => map[p.categoria] = (map[p.categoria] || 0) + 1);
  return Object.entries(map).map(([nombre, count]) => ({ nombre, count }));
}

/* --- Helpers de formato --- */
function precioARS(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
  }).format(n);
}

function descuento(prod) {
  if (!prod.precioAnterior || prod.precioAnterior <= prod.precio) return 0;
  return Math.round((1 - prod.precio / prod.precioAnterior) * 100);
}

function cuotas(precio, n = 6) {
  return `${n} cuotas sin interés de ${precioARS(precio / n)}`;
}

/* --- Imagen SVG branded generada al vuelo (data URI) --- */
const COLORES_CAT = {
  'Herramientas Eléctricas': ['#1A1A1A', '#FFB400'],
  'Máquinas':               ['#0f2a4a', '#4aa3ff'],
  'Herramientas Manuales':  ['#3a2a10', '#FFB400'],
  'Fijaciones':             ['#444', '#bbb'],
  'Construcción':           ['#5a3a1a', '#ff9f43'],
  'Pinturería':             ['#1a4a3a', '#34d399'],
  'Seguridad':              ['#7a1020', '#ff6b6b'],
  'Jardín':                 ['#14401a', '#7bd957'],
  'Sanitarios':             ['#0e3a4a', '#3fc7e0'],
  'Electricidad':           ['#2a2410', '#ffd633'],
};

/* Devuelve la foto real si existe; si no, el placeholder SVG */
function imgSrc(prod) {
  return prod.imagen || imagenProducto(prod);
}
/* data-URI SVG para usar como fallback en onerror de <img> */
function svgFallback(prod) {
  // escapa comillas para usar dentro de un atributo HTML
  return imagenProducto(prod).replace(/'/g, '%27');
}

function imagenProducto(prod) {
  const [bg, fg] = COLORES_CAT[prod.categoria] || ['#1A1A1A', '#FFB400'];
  const nombreCorto = prod.nombre.length > 34 ? prod.nombre.slice(0, 32) + '…' : prod.nombre;
  const svg =
`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="${shade(bg,30)}"/>
  </linearGradient></defs>
  <rect width="500" height="500" fill="url(#g)"/>
  <circle cx="250" cy="205" r="120" fill="${fg}" opacity="0.13"/>
  <text x="250" y="250" font-size="150" text-anchor="middle" dominant-baseline="middle">${prod.emoji}</text>
  <rect x="0" y="400" width="500" height="100" fill="rgba(0,0,0,0.35)"/>
  <text x="250" y="438" font-size="22" font-weight="bold" fill="${fg}" text-anchor="middle" font-family="Segoe UI,Arial">${esc(prod.marca)}</text>
  <text x="250" y="468" font-size="17" fill="#fff" text-anchor="middle" font-family="Segoe UI,Arial">${esc(nombreCorto)}</text>
</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function esc(s) { return String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])); }
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.min(255, Math.max(0, r)); g = Math.min(255, Math.max(0, g)); b = Math.min(255, Math.max(0, b));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}
