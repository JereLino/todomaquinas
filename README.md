# Todo Máquinas 🛠️

Tienda online (e-commerce) para la ferretería **Todo Máquinas**, estilo Tienda Nube.
Proyecto académico: todo funciona, pero **pagos y envíos son simulados (mock)**.

**Autor:** Jeremías Pascolo — jeremiaspascolo@yahoo.com.ar
**Sitio en vivo:** https://jerelino.github.io/todomaquinas/

Modelo de negocio: **liderazgo en costos y alta rotación** → la UI prioriza precios bajos,
descuentos visibles, "últimas unidades", envío gratis por monto y **cross-selling** (venta cruzada).

## Funcionalidades

- 🏠 **Home / catálogo** con hero, ofertas destacadas, filtros por categoría, ordenamiento y buscador.
- 📦 **Base de productos en CSV** (`data/productos.csv`) — editá ese archivo para cargar/cambiar productos.
- 🖼️ **Ficha de producto** con foto, descripción, precio, cuotas, stock y cantidad.
- 🔗 **Cross-selling**: "También te puede interesar" en la ficha y "Completá tu compra" en el carrito.
- 🛒 **Carrito** persistente (localStorage), con cupones de descuento y barra de envío gratis.
- 💳 **Checkout** con **procesador de pagos simulado** (tarjeta con preview en vivo, transferencia, efectivo).
- 🚚 **Gestor de envíos simulado**: retiro en local, Correo Argentino (estándar) y Andreani (express).
- ✅ **Confirmación** con N° de orden y **seguimiento de envío**.
- 📱 Diseño **responsive**.

## Cómo ejecutarlo

El sitio lee el catálogo desde un CSV con `fetch`, así que **necesita un servidor local**
(no funciona abriendo el `index.html` directamente con doble clic, por seguridad del navegador).

Opción 1 — Python (ya viene en Mac/Linux):

```bash
cd todomaquinas
python3 -m http.server 8000
```

Luego abrí: **http://localhost:8000**

Opción 2 — Node (si tenés npm):

```bash
cd todomaquinas
npx serve
```

## Cupones de prueba

| Código       | Descuento |
|--------------|-----------|
| `TODO10`     | 10%       |
| `FERRE15`    | 15%       |
| `BIENVENIDO` | 5%        |

## Cargar productos

Editá `data/productos.csv`. Columnas:

`id, nombre, categoria, precio, precio_anterior, marca, descripcion, stock, destacado, emoji, imagen, relacionados`

- `precio_anterior`: si es mayor al precio, se muestra el % de descuento tachado.
- `destacado`: `1` para que aparezca en "Ofertas destacadas".
- `emoji`: ícono que se usa en el placeholder SVG (fallback si la foto no carga).
- `imagen`: ruta a la foto real del producto (ej: `assets/productos/p1.jpg`). Si está vacía, se usa el placeholder SVG.
- `relacionados`: ids separados por `;` para el cross-selling (si faltan, se completan con la misma categoría).

### Origen de los productos reales

Los productos y fotos actuales se obtuvieron de la API pública de catálogo (VTEX) de Easy
y las imágenes se **descargaron localmente** a `assets/productos/` para que el sitio funcione
sin internet. El script está en `scripts/scrape_easy.py` (volvé a correrlo para refrescar el catálogo).
El catálogo original de placeholders quedó respaldado en `data/productos_placeholder_backup.csv`.

## Estructura

```
todomaquinas/
├── index.html        # home + catálogo
├── product.html      # ficha de producto
├── cart.html         # carrito
├── checkout.html     # pago + envío
├── css/styles.css
├── js/
│   ├── data.js       # carga CSV + helpers + imágenes SVG
│   ├── cart.js       # carrito (localStorage)
│   ├── ui.js         # header, footer, tarjetas
│   ├── home.js       # lógica catálogo
│   ├── product.js    # lógica ficha + cross-sell
│   ├── cartpage.js   # lógica carrito + cross-sell
│   └── checkout.js   # pago + envío simulados
└── data/productos.csv
```
