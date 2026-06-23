/* ===== info.js — páginas de información legal / ayuda ===== */

const DEMO = `<div class="demo-note">ℹ️ <b>Proyecto académico:</b> este es un sitio de demostración. Los pagos, envíos y datos son simulados; no se realizan transacciones ni envíos reales.</div>`;

const SECCIONES = {
  'nosotros': {
    titulo: 'Nosotros',
    html: `
      <p>En <b>Todo Máquinas OK</b> somos una ferretería de Longchamps especializada en herramientas y máquinas. Hace años acompañamos a profesionales, pymes y a quienes arreglan su casa, ofreciendo la mejor relación precio-calidad y atención de verdad.</p>
      <h2>🎯 Nuestra misión</h2>
      <p>Acercar a cada cliente las herramientas y máquinas que necesita para su trabajo o proyecto, al precio más bajo del mercado, con stock permanente, asesoramiento honesto y un servicio rápido y confiable. Queremos que comprar la herramienta correcta sea fácil para todos.</p>
      <h2>🔭 Nuestra visión</h2>
      <p>Ser la ferretería de herramientas líder de la zona sur del Gran Buenos Aires, reconocida por nuestros precios bajos, nuestra variedad y la confianza de nuestros clientes; creciendo hacia la venta online a todo el país sin perder el trato cercano que nos caracteriza.</p>
      <h2>🎯 Nuestro objetivo</h2>
      <p>Digitalizar la ferretería con una tienda online propia que permita comprar 24/7, ampliar nuestra base de clientes más allá del barrio y aumentar las ventas, ofreciendo medios de pago electrónicos, envíos a todo el país y una experiencia de compra simple, segura y al mejor precio.</p>
      <div class="demo-note">📍 Visitanos en Carlos Diehl 690, Longchamps · 📞 011 6033-6914 · 📷 <a href="https://www.instagram.com/todomaquinasok/" target="_blank" rel="noopener">@todomaquinasok</a></div>`
  },
  'promociones': {
    titulo: 'Promociones del mes',
    html: `
      <p>Estas son las promos vigentes en <b>Todo Máquinas</b>. Aprovechá los cupones cargando tu carrito y aplicándolos en el checkout.</p>
      <div class="cards-pay">
        <div class="pay-card"><div class="pc-ico">🎁</div><b>Mes del Padre</b><span>15% OFF con el cupón <b>PAPA15</b></span></div>
        <div class="pay-card"><div class="pc-ico">⚽</div><b>Mundial de Fútbol</b><span>10% OFF con el cupón <b>MUNDIAL10</b></span></div>
        <div class="pay-card"><div class="pc-ico">🏷️</div><b>Cupón de bienvenida</b><span>10% OFF con <b>CANDE10</b> o <b>TODO10</b></span></div>
        <div class="pay-card mp"><div class="pc-ico">💵</div><b>Pago en efectivo / transferencia</b><span>10% de descuento adicional</span></div>
      </div>
      <h2>🚚 Envío gratis</h2>
      <p>Envío estándar <b>sin cargo</b> en compras superiores a $120.000 a todo el país. Retiro en el local siempre gratis.</p>
      <h2>💳 Cuotas sin interés</h2>
      <p>Hasta <b>6 cuotas sin interés</b> con todas las tarjetas en toda la tienda.</p>
      <div class="demo-note">Las promociones pueden combinarse con las cuotas pero los cupones de descuento no son acumulables entre sí. Vigentes durante el mes en curso.</div>
      <h2>🔥 Productos en oferta</h2>
      <p>Estos productos están con descuento esta semana. ¡Stock limitado!</p>
      <div id="promos-ofertas"><div class="loader"><div class="spinner"></div>Cargando ofertas...</div></div>`
  },
  'contacto': {
    titulo: 'Contacto',
    html: `
      <p>¿Tenés una consulta o querés una cotización? Escribinos o acercate al local. Te respondemos a la brevedad.</p>
      <div class="cards-pay">
        <div class="pay-card"><div class="pc-ico">📍</div><b>Local</b><span>Carlos Diehl 690, B1854 Longchamps, Buenos Aires</span></div>
        <div class="pay-card"><div class="pc-ico">📞</div><b>Teléfono</b><span><a href="tel:01160336914">011 6033-6914</a></span></div>
        <div class="pay-card mp"><div class="pc-ico">💬</div><b>WhatsApp</b><span><a href="https://wa.me/5491160336914" target="_blank" rel="noopener">Escribinos por WhatsApp</a></span></div>
        <div class="pay-card"><div class="pc-ico">📷</div><b>Instagram</b><span><a href="https://www.instagram.com/todomaquinasok/" target="_blank" rel="noopener">@todomaquinasok</a></span></div>
      </div>
      <h2>🕒 Horarios de atención</h2>
      <ul>
        <li>Lunes: 7 a 19 hs</li>
        <li>Martes a Viernes: 9 a 19 hs</li>
        <li>Sábados: 9 a 18 hs</li>
        <li>Domingos: 9 a 13 hs</li>
      </ul>
      <a class="link-pago" style="background:var(--teal)" href="https://www.google.com/maps/search/Todo+Maquinas+OK,+Carlos+Diehl+690,+Longchamps" target="_blank" rel="noopener">📍 Cómo llegar</a>`
  },
  'aviso-legal': {
    titulo: 'Aviso legal',
    html: `${DEMO}
      <p>El presente sitio web pertenece a <b>Todo Máquinas OK</b> (en adelante, "la Empresa"), tienda de herramientas con domicilio comercial en <b>Carlos Diehl 690, B1854 Longchamps, Partido de Almirante Brown, Provincia de Buenos Aires</b>. Tel.: 011 6033-6914. El uso del sitio implica la aceptación de las presentes condiciones.</p>
      <h2>Titularidad</h2>
      <p>Todo Máquinas es responsable del contenido publicado. Los datos de contacto figuran en el pie de página de cada sección.</p>
      <h2>Propiedad intelectual</h2>
      <p>El logo, marca, textos e imágenes son propiedad de la Empresa o se utilizan con autorización. Queda prohibida su reproducción sin consentimiento expreso.</p>
      <h2>Responsabilidad</h2>
      <p>La Empresa procura que la información de productos y precios sea correcta y esté actualizada. Pueden existir errores tipográficos o de stock que se corregirán a la brevedad. Las imágenes son ilustrativas.</p>
      <h2>Legislación aplicable</h2>
      <p>Esta relación se rige por las leyes de la República Argentina, en particular la Ley 24.240 de Defensa del Consumidor y la Ley 25.326 de Protección de Datos Personales.</p>`
  },
  'cambios': {
    titulo: 'Política de cambios y devoluciones',
    html: `${DEMO}
      <h2>Derecho de arrepentimiento</h2>
      <p>Según el Art. 34 de la Ley 24.240, en compras realizadas a distancia podés revocar la compra dentro de los <b>10 días corridos</b> desde la recepción del producto, sin costo ni necesidad de justificar tu decisión.</p>
      <h2>Condiciones para el cambio o devolución</h2>
      <ul>
        <li>El producto debe estar sin uso, en su embalaje original y con todos sus accesorios.</li>
        <li>Debés presentar la factura o comprobante de compra.</li>
        <li>Las herramientas eléctricas y máquinas deben conservar los precintos y etiquetas.</li>
      </ul>
      <h2>¿Cómo gestionarlo?</h2>
      <ul>
        <li>Escribinos por WhatsApp o email indicando el número de orden.</li>
        <li>Coordinamos el retiro o podés acercarte al local.</li>
        <li>El reintegro se realiza por el mismo medio de pago dentro de los 10 días hábiles.</li>
      </ul>
      <h2>Garantía</h2>
      <p>Todos los productos cuentan con garantía legal de <b>6 meses</b> (Art. 11, Ley 24.240). Las máquinas y herramientas eléctricas incluyen además la garantía del fabricante.</p>
      <h2>Productos con falla</h2>
      <p>Si el producto presenta un defecto de fábrica, gestionamos el cambio o la reparación sin cargo dentro del período de garantía.</p>`
  },
  'envios': {
    titulo: 'Envíos y logística',
    html: `${DEMO}
      <h2>Cobertura</h2>
      <p>Realizamos envíos a todo el país a través de <b>Correo Argentino</b> (estándar) y <b>Andreani</b> (express). También podés retirar tu compra sin costo en nuestro local.</p>
      <h2>Opciones y plazos</h2>
      <div class="cards-pay">
        <div class="pay-card"><div class="pc-ico">🏪</div><b>Retiro en local</b><span>Gratis · Listo en ~2 hs</span></div>
        <div class="pay-card"><div class="pc-ico">🚚</div><b>Envío estándar</b><span>Correo Argentino · 3 a 5 días hábiles</span></div>
        <div class="pay-card"><div class="pc-ico">⚡</div><b>Envío express</b><span>Andreani · 24 a 48 hs</span></div>
      </div>
      <h2>Costo de envío</h2>
      <ul>
        <li>El costo se calcula automáticamente en el checkout según el método elegido.</li>
        <li><b>Envío estándar gratis</b> en compras desde $120.000.</li>
        <li>El retiro en local nunca tiene costo.</li>
      </ul>
      <h2>Seguimiento</h2>
      <p>Al confirmar tu compra recibís un número de orden y el seguimiento del envío. Te avisamos en cada etapa: pago confirmado, en preparación, en camino y entregado.</p>
      <h2>Plazos de despacho</h2>
      <p>Despachamos los pedidos dentro de las 24/48 hs hábiles posteriores a la acreditación del pago.</p>`
  },
  'presentacion': {
    titulo: 'Presentación del Proyecto',
    html: `
      <div class="ppt-intro">
        <div class="ppt-slide">
          <h2>📊 Todo Máquinas — Tienda Online</h2>
          <p style="font-size:1.1rem;color:var(--teal-osc);font-weight:600">Un proyecto académico que lleva la ferretería al mundo digital</p>
        </div>
      </div>

      <div class="ppt-slide">
        <h2>🎯 La idea</h2>
        <p><b>Problema:</b> Todo Máquinas OK es una ferretería de Longchamps con excelentes precios y stock. Sin embargo, solo vende en el local físico, limitando su mercado a la zona.</p>
        <p><b>Solución:</b> Crear una tienda online moderna que permita vender 24/7, llegar a clientes de todo el país y mantener el modelo de negocio: <b>liderazgo en costos y alta rotación</b>.</p>
        <p><b>Resultado:</b> Una plataforma web que replica la ferretería con catálogo completo, pagos seguros, envíos a todo el país y experiencia simple.</p>
      </div>

      <div class="ppt-slide">
        <h2>🛍️ El trabajo realizado</h2>
        <ul>
          <li><b>Catálogo:</b> 113 productos reales con fotos, organizados en 10 categorías (Herramientas Eléctricas, Máquinas, Sanitarios, Electricidad, etc.)</li>
          <li><b>Búsqueda:</b> Buscador predictivo con sugerencias mientras escribís</li>
          <li><b>Filtros:</b> Por categoría, precio y orden (relevancia, precio, descuento)</li>
          <li><b>Carrito:</b> Persistente en el navegador, cupones de descuento, envío gratis desde $120.000</li>
          <li><b>Checkout:</b> Opciones de retiro en local, envío estándar o express, múltiples formas de pago</li>
          <li><b>Asistente:</b> Marito, un chatbot que recomienda herramientas según tu proyecto ("colgar un estante", "pintar el living", etc.)</li>
          <li><b>Información:</b> Páginas legales, misión/visión, promociones, cómo comprar, FAQ</li>
          <li><b>Tour guiado:</b> Recorrido interactivo de 11 pasos para nuevos usuarios</li>
        </ul>
      </div>

      <div class="ppt-slide">
        <h2>🛠️ Stack tecnológico</h2>
        <p><b>Frontend:</b> HTML / CSS / JavaScript vanilla (sin frameworks)</p>
        <p><b>Almacenamiento de datos:</b> CSV con 113 productos (nombre, categoría, precio, marca, descripción, stock, emoji, imagen, relacionados)</p>
        <p><b>Parser CSV:</b> Parser robusto en JavaScript que maneja comillas y caracteres especiales</p>
        <p><b>Imágenes:</b> 113 fotos reales descargadas de la API VTEX de Easy.com.ar</p>
        <p><b>Fallback visual:</b> SVG dinámico por categoría si la imagen no carga</p>
        <p><b>Persistencia:</b> localStorage para carrito, cupones aplicados, preferencias del usuario</p>
        <p><b>Servidor:</b> Python HTTP server para desarrollo (sin backend propio)</p>
      </div>

      <div class="ppt-slide">
        <h2>🔗 Cómo se conectaron las piezas</h2>
        <div class="ppt-flow">
          <div class="ppt-flow-item">
            <strong>data.js</strong>
            <span>Carga el CSV, parsea productos, genera helpers globales (precioARS, descuento, imgSrc)</span>
          </div>
          <div class="ppt-flow-item">
            <strong>ui.js</strong>
            <span>Header/footer/componentes compartidos, buscador predictivo, Marito chatbot, tour guiado</span>
          </div>
          <div class="ppt-flow-item">
            <strong>home.js</strong>
            <span>Catálogo con filtros, orden y rango de precio</span>
          </div>
          <div class="ppt-flow-item">
            <strong>cart.js</strong>
            <span>Carrito en localStorage, cupones, cálculo de envío gratis</span>
          </div>
          <div class="ppt-flow-item">
            <strong>checkout.js</strong>
            <span>Formulario con validaciones (email, DNI, tarjeta Luhn), opciones de envío/pago, confirmación</span>
          </div>
          <div class="ppt-flow-item">
            <strong>product.js</strong>
            <span>Ficha de producto con foto, precio, cuotas, cross-selling</span>
          </div>
        </div>
      </div>

      <div class="ppt-slide">
        <h2>🎬 POC y features completadas</h2>
        <h3>MVP (Versión 1 — Funcional)</h3>
        <ul>
          <li>✅ Carrusel de banners con autoplay</li>
          <li>✅ Catálogo 37 productos iniciales con búsqueda y filtros</li>
          <li>✅ Ficha de producto con cross-selling</li>
          <li>✅ Carrito con cupones</li>
          <li>✅ Checkout simulado (sin transacciones reales)</li>
          <li>✅ Marito chatbot por reglas</li>
          <li>✅ Páginas legales y de información</li>
          <li>✅ Deploy en GitHub Pages</li>
        </ul>
      </div>

      <div class="ppt-slide">
        <h2>🚀 Versión 2 — Ampliación y experiencia</h2>
        <h3>Catálogo ampliado</h3>
        <ul>
          <li>✅ 37 → 113 productos reales (3x más variedad)</li>
          <li>✅ +2 categorías nuevas: Sanitarios (13) y Electricidad (11)</li>
          <li>✅ Más productos en categorías existentes para mejor búsqueda</li>
        </ul>
        <h3>Tour guiado interactivo</h3>
        <ul>
          <li>✅ 11 pasos que iluminan elementos reales (spotlight)</li>
          <li>✅ Auto-aparece en la 1ª visita, recordado en el navegador</li>
          <li>✅ Accesible desde botón en el footer</li>
          <li>✅ Deep-linkeable: <code>?tour=5</code> abre en paso 5</li>
          <li>✅ Responsive en celular, cierra con Escape</li>
        </ul>
      </div>

      <div class="ppt-slide">
        <h2>🎨 Marca y diseño</h2>
        <p><b>Paleta:</b> Teal (#1FA8BE) + Amarillo (#F4C61E) + Gris (#2b2b2b), tomados del logo original de la ferretería.</p>
        <p><b>Tipografía:</b> Sistema nativo del navegador (Segoe UI, Roboto, sans-serif) para máximo rendimiento.</p>
        <p><b>Responsive:</b> Optimizado para desktop, tablet y celular.</p>
        <p><b>Accesibilidad:</b> Validaciones claras, mensajes de error por campo, alternativas de imagen SVG generadas dinámicamente.</p>
      </div>

      <div class="ppt-slide">
        <h2>📱 Experiencia de usuario</h2>
        <ul>
          <li><b>Búsqueda predictiva:</b> Sugiere mientras escribís, mostrando foto y precio</li>
          <li><b>Cupones:</b> PAPA15 (15%), FERRE15, TODO10, BIENVENIDO, MUNDIAL10, etc.</li>
          <li><b>Envío gratis:</b> Desde $120.000 en envío estándar o retiro sin cargo en local</li>
          <li><b>Cuotas:</b> Hasta 6 cuotas sin interés con todas las tarjetas</li>
          <li><b>Marito:</b> Escribile "colgar estante" o "pintar" y te recomienda herramientas</li>
          <li><b>Contacto directo:</b> WhatsApp, teléfono e Instagram siempre a mano</li>
          <li><b>Tour guiado:</b> Para nuevos usuarios, explica cada sección en 11 pasos</li>
        </ul>
      </div>

      <div class="ppt-slide">
        <h2>🌐 Despliegue y actualización</h2>
        <p><b>Plataforma:</b> GitHub Pages (https://jerelino.github.io/todomaquinas/)</p>
        <p><b>Redeploy automático:</b> ~30 segundos al hacer push a la rama main</p>
        <p><b>Refresh de catálogo:</b> Script Python que scrappea Easy.com.ar y regenera CSV + fotos en 1 comando</p>
        <p><b>Versionado:</b> Git con commits descriptivos para cada feature</p>
      </div>

      <div class="ppt-slide" style="background:var(--teal-claro);text-align:center;padding:40px">
        <h2 style="font-size:1.6rem;margin-bottom:16px">✨ Resultado final</h2>
        <p style="font-size:1.1rem;color:var(--teal-osc)"><b>Una tienda online moderna, rápida y fácil de usar</b></p>
        <p style="margin-top:20px;color:var(--gris-700)">Que respeta el modelo de negocio de liderazgo en costos y alta rotación, permitiendo a Todo Máquinas vender a todo el país 24/7.</p>
        <p style="margin-top:24px">🎓 <b>Proyecto académico completado</b></p>
      </div>
    `
  },

  'pagos': {
    titulo: 'Medios y link de pago',
    html: `${DEMO}
      <p>Aceptamos múltiples medios de pago para que elijas el que más te convenga. Todos los pagos online se procesan de forma segura.</p>
      <div class="cards-pay">
        <div class="pay-card"><div class="pc-ico">💳</div><b>Tarjetas</b><span>Crédito y débito · hasta 6 cuotas sin interés</span></div>
        <div class="pay-card"><div class="pc-ico">🏦</div><b>Transferencia</b><span>10% de descuento · acreditación inmediata</span></div>
        <div class="pay-card mp"><div class="pc-ico">💙</div><b>MercadoPago</b><span>Pagá con tu cuenta, dinero o tarjeta</span></div>
        <div class="pay-card"><div class="pc-ico">💵</div><b>Efectivo</b><span>10% de descuento · al retirar o recibir</span></div>
      </div>
      <h2>Link de pago</h2>
      <p>Si preferís, generamos un <b>link de pago de MercadoPago</b> y te lo enviamos por WhatsApp o email para que pagues cuando quieras, desde cualquier dispositivo.</p>
      <a class="link-pago" href="#" onclick="alert('Link de pago de MercadoPago generado (simulado). En producción se enviaría por WhatsApp/email.');return false;">💙 Generar link de pago</a>
      <h2>Seguridad</h2>
      <p>No almacenamos los datos de tu tarjeta. El procesamiento se realiza a través de pasarelas de pago certificadas (en esta demo, simuladas).</p>`
  },
  'como-comprar': {
    titulo: 'Cómo comprar',
    html: `${DEMO}
      <h2>Comprar es muy fácil</h2>
      <ul>
        <li><b>1.</b> Buscá tu producto en el catálogo o con el buscador.</li>
        <li><b>2.</b> Entrá al producto, elegí la cantidad y tocá "Agregar al carrito".</li>
        <li><b>3.</b> Revisá tu carrito y aprovechá los productos relacionados sugeridos.</li>
        <li><b>4.</b> Iniciá la compra, completá tus datos y elegí envío y medio de pago.</li>
        <li><b>5.</b> ¡Listo! Recibís la confirmación con tu número de orden y seguimiento.</li>
      </ul>
      <h2>¿Necesitás ayuda?</h2>
      <p>Escribinos por WhatsApp y te asesoramos en tu compra.</p>`
  },
  'faq': {
    titulo: 'Preguntas frecuentes',
    html: `${DEMO}
      <h2>¿Hacen factura?</h2>
      <p>Sí, emitimos factura por todas las compras.</p>
      <h2>¿Tienen stock de lo que está publicado?</h2>
      <p>El stock se muestra en cada producto y se actualiza permanentemente.</p>
      <h2>¿Puedo retirar en el local?</h2>
      <p>Sí, sin costo. Te avisamos cuando tu pedido esté listo (aprox. 2 hs).</p>
      <h2>¿Hacen descuento por cantidad?</h2>
      <p>Sí, para compras mayoristas escribinos por WhatsApp para una cotización especial.</p>
      <h2>¿Los precios incluyen IVA?</h2>
      <p>Sí, todos los precios publicados son finales e incluyen IVA.</p>`
  },
  'privacidad': {
    titulo: 'Política de privacidad',
    html: `${DEMO}
      <p>En cumplimiento de la Ley 25.326 de Protección de Datos Personales, informamos cómo tratamos tu información.</p>
      <h2>Datos que recolectamos</h2>
      <p>Nombre, email, teléfono, DNI y domicilio, únicamente para procesar tu compra y envío.</p>
      <h2>Uso de los datos</h2>
      <p>Usamos tus datos para gestionar pedidos, envíos, facturación y atención al cliente. No los cedemos a terceros ajenos a la operación.</p>
      <h2>Tus derechos</h2>
      <p>Podés solicitar el acceso, rectificación o supresión de tus datos escribiéndonos por email. La Agencia de Acceso a la Información Pública es el órgano de control de la Ley 25.326.</p>`
  },
  'terminos': {
    titulo: 'Términos y condiciones',
    html: `${DEMO}
      <h2>Aceptación</h2>
      <p>Al utilizar este sitio y realizar una compra, aceptás estos términos y condiciones.</p>
      <h2>Precios y disponibilidad</h2>
      <p>Los precios están expresados en pesos argentinos e incluyen IVA. Pueden modificarse sin previo aviso. La compra se confirma una vez acreditado el pago.</p>
      <h2>Promociones</h2>
      <p>Las promociones, cuotas sin interés y cupones son válidos según las condiciones vigentes al momento de la compra y no son acumulables salvo indicación expresa.</p>
      <h2>Jurisdicción</h2>
      <p>Para cualquier controversia se aplican las leyes argentinas y la jurisdicción de los tribunales ordinarios correspondientes al domicilio de la Empresa.</p>`
  },
};

const ORDEN_NAV = [
  ['nosotros', '🏢 Nosotros'],
  ['promociones', '🎁 Promociones del mes'],
  ['contacto', '📞 Contacto'],
  ['aviso-legal', '⚖️ Aviso legal'],
  ['cambios', '🔄 Política de cambios'],
  ['envios', '🚚 Envíos y logística'],
  ['pagos', '💳 Medios y link de pago'],
  ['como-comprar', '🛒 Cómo comprar'],
  ['faq', '❓ Preguntas frecuentes'],
  ['privacidad', '🔒 Privacidad'],
  ['terminos', '📄 Términos y condiciones'],
];

(async function init() {
  await cargarProductos().catch(() => {}); // para el badge del carrito
  renderHeader();
  renderFooter();

  let sec = new URLSearchParams(location.search).get('seccion') || 'aviso-legal';
  if (!SECCIONES[sec]) sec = 'aviso-legal';

  document.getElementById('info-nav').innerHTML = ORDEN_NAV.map(([k, label]) =>
    `<a href="info.html?seccion=${k}" class="${k === sec ? 'active' : ''}">${label}</a>`).join('');

  const data = SECCIONES[sec];
  document.title = `${data.titulo} — Todo Máquinas`;
  document.getElementById('bc').textContent = data.titulo;
  document.getElementById('info-content').innerHTML =
    `<h1>${data.titulo}</h1><div class="upd">Última actualización: junio 2026</div>${data.html}`;

  // En "Promociones" inyectamos los productos en oferta desde la base
  if (sec === 'promociones') {
    const cont = document.getElementById('promos-ofertas');
    if (cont) {
      const ofertas = TM.productos
        .filter(p => descuento(p) > 0)
        .sort((a, b) => descuento(b) - descuento(a));
      cont.innerHTML = ofertas.length
        ? gridProductos(ofertas)
        : '<p style="color:var(--gris-500)">Por el momento no hay productos en oferta. ¡Volvé pronto!</p>';
    }
  }
})();
