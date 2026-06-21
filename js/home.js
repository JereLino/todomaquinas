/* ===== home.js — lógica del catálogo / home ===== */

let _orden = 'rel';
let _catActiva = '';
let _busqueda = '';

(async function init() {
  await cargarProductos();

  const params = new URLSearchParams(location.search);
  _catActiva = params.get('cat') || '';
  _busqueda = (params.get('q') || '').toLowerCase();

  renderHeader(_catActiva);
  renderFooter();

  // Si hay filtro o búsqueda, ocultamos hero/ofertas y vamos directo al catálogo filtrado
  const hayFiltro = _catActiva || _busqueda;
  document.getElementById('hero').style.display = hayFiltro ? 'none' : '';
  document.getElementById('ofertas').style.display = hayFiltro ? 'none' : '';

  if (!hayFiltro) { renderDestacados(); initHeroCarousel(); }
  renderChips();
  renderCatalogo();

  document.getElementById('orden').addEventListener('change', e => {
    _orden = e.target.value; renderCatalogo();
  });
})();

// llamado desde los inputs de precio
function aplicarPrecio() { renderCatalogo(); }

/* ===== Carrusel de banners ===== */
let _heroIdx = 0, _heroN = 0, _heroTimer = null;

function initHeroCarousel() {
  const track = document.getElementById('hero-track');
  if (!track) return;
  _heroN = track.children.length;
  const dots = document.getElementById('hero-dots');
  dots.innerHTML = Array.from({ length: _heroN }, (_, i) =>
    `<button onclick="heroIr(${i})" class="${i === 0 ? 'active' : ''}" aria-label="Banner ${i + 1}"></button>`).join('');
  heroIr(0);
  _heroAuto();
  // pausa el autoplay al pasar el mouse
  const car = track.closest('.hero-carousel');
  car.addEventListener('mouseenter', () => clearInterval(_heroTimer));
  car.addEventListener('mouseleave', _heroAuto);
}
function _heroAuto() {
  clearInterval(_heroTimer);
  _heroTimer = setInterval(() => heroMover(1), 5500);
}
function heroIr(i) {
  if (!_heroN) return;
  _heroIdx = (i + _heroN) % _heroN;
  const track = document.getElementById('hero-track');
  if (track) track.style.transform = `translateX(-${_heroIdx * 100}%)`;
  document.querySelectorAll('#hero-dots button').forEach((d, k) =>
    d.classList.toggle('active', k === _heroIdx));
}
function heroMover(d) { heroIr(_heroIdx + d); _heroAuto(); }

function renderDestacados() {
  const dest = TM.productos.filter(p => p.destacado);
  document.getElementById('destacados').innerHTML = gridProductos(dest);
}

function renderChips() {
  const cats = getCategorias();
  const total = TM.productos.length;
  const chips = [`<button class="chip ${!_catActiva ? 'active' : ''}" data-cat="">Todas (${total})</button>`]
    .concat(cats.map(c =>
      `<button class="chip ${_catActiva === c.nombre ? 'active' : ''}" data-cat="${esc(c.nombre)}">${esc(c.nombre)} (${c.count})</button>`));
  const cont = document.getElementById('chips');
  cont.innerHTML = chips.join('');
  cont.querySelectorAll('.chip').forEach(ch =>
    ch.addEventListener('click', () => {
      _catActiva = ch.dataset.cat;
      _busqueda = '';
      const url = _catActiva ? `index.html?cat=${encodeURIComponent(_catActiva)}` : 'index.html';
      history.replaceState(null, '', url);
      renderHeader(_catActiva); renderFooter();
      document.getElementById('hero').style.display = (_catActiva ? 'none' : '');
      document.getElementById('ofertas').style.display = (_catActiva ? 'none' : '');
      if (!_catActiva) renderDestacados();
      renderChips(); renderCatalogo();
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
}

function filtrar() {
  let lista = TM.productos.slice();
  if (_catActiva) lista = lista.filter(p => p.categoria === _catActiva);
  if (_busqueda) lista = lista.filter(p =>
    (p.nombre + ' ' + p.marca + ' ' + p.categoria + ' ' + p.descripcion).toLowerCase().includes(_busqueda));

  // filtro por rango de precio
  const min = Number(document.getElementById('precio-min')?.value) || 0;
  const max = Number(document.getElementById('precio-max')?.value) || Infinity;
  if (min > 0 || max < Infinity) lista = lista.filter(p => p.precio >= min && p.precio <= max);

  switch (_orden) {
    case 'precio-asc': lista.sort((a, b) => a.precio - b.precio); break;
    case 'precio-desc': lista.sort((a, b) => b.precio - a.precio); break;
    case 'off': lista.sort((a, b) => descuento(b) - descuento(a)); break;
    case 'nombre': lista.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
  }
  return lista;
}

function renderCatalogo() {
  const lista = filtrar();
  document.getElementById('catalogo-grid').innerHTML = gridProductos(lista);
  document.getElementById('result-count').textContent = `${lista.length} producto${lista.length !== 1 ? 's' : ''}`;

  const titulo = document.getElementById('cat-titulo');
  const sub = document.getElementById('cat-sub');
  if (_busqueda) { titulo.textContent = `Resultados para "${_busqueda}"`; sub.textContent = 'Búsqueda en el catálogo'; }
  else if (_catActiva) { titulo.textContent = _catActiva; sub.textContent = 'Productos de esta categoría'; }
  else { titulo.textContent = 'Catálogo completo'; sub.textContent = 'Explorá toda nuestra variedad'; }
}
