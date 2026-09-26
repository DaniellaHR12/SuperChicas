/* ==========================================================
   SuperChicas · Catálogo de productos
   Edita este archivo para agregar, quitar o cambiar productos.
   ========================================================== */

const STORE = {
  name: 'SuperChicas',
  currency: 'S/',          // Cambia el símbolo de moneda aquí
  whatsapp: '51993842348', // Número de WhatsApp (código de país + número, sin +)
  freeShippingFrom: 150,
  shippingCost: 12,
  // ID del agente de voz de ElevenLabs (ElevenLabs → Agents → tu agente → Widget).
  // Déjalo vacío ('') para ocultar el asistente.
  elevenlabsAgentId: ''
};

const METALS = {
  'oro':      { label: 'Baño de oro 18k',       a: '#f3d98b', b: '#c9973d', c: '#8a6420' },
  'plata':    { label: 'Plata 925',             a: '#f4f5f7', b: '#b9bec7', c: '#7c828c' },
  'oro-rosa': { label: 'Oro rosa',              a: '#f7d0c2', b: '#d4927e', c: '#9c5f4f' },
  'acero':    { label: 'Acero quirúrgico 316L', a: '#e6e8ea', b: '#9ea4aa', c: '#5d636a' },
  'otros':    { label: 'Otros materiales',      a: '#e9d5c3', b: '#b48a6a', c: '#6e4d36' }
};

const CATEGORIES = [
  { id: 'collares',  name: 'Collares',          desc: 'Cadenas, dijes y gargantillas', art: 'collar',  metal: 'oro' },
  { id: 'aretes',    name: 'Aretes',            desc: 'Topos, argollas y colgantes',   art: 'aretes',  metal: 'plata' },
  { id: 'anillos',   name: 'Anillos',           desc: 'Solitarios, midi y ajustables', art: 'anillo',  metal: 'oro-rosa' },
  { id: 'pulseras',  name: 'Pulseras',          desc: 'Esclavas, charms y tobilleras', art: 'pulsera', metal: 'oro' },
  { id: 'relojes',   name: 'Relojes',           desc: 'Minimalistas y elegantes',      art: 'reloj',   metal: 'oro-rosa' },
  { id: 'bolsos',    name: 'Bolsos',            desc: 'Carteras, clutches y minis',    art: 'bolso',   metal: 'otros' },
  { id: 'lentes',    name: 'Lentes de sol',     desc: 'Protección UV400 con estilo',   art: 'lentes',  metal: 'oro' },
  { id: 'cabello',   name: 'Para el cabello',   desc: 'Pinzas, scrunchies y vinchas',  art: 'pinza',   metal: 'oro' }
];

/*  Campos:
    id, name, cat, metal, price, oldPrice (opcional), tag (opcional: 'Nuevo', 'Top ventas', 'Oferta'),
    stone (color de piedra/acento), sizes (opcional), desc, details (lista), isNew, rating,
    img (opcional: ruta a la foto, p. ej. 'assets/productos/c01.jpg'; si falta se usa la ilustración) */
const PRODUCTS = [
  { id: 'c01', name: 'Collar Corazón Eterno',  cat: 'collares', metal: 'oro', price: 89, oldPrice: 110, tag: 'Top ventas', stone: '#e8a0b4',
    sizes: ['40 cm', '45 cm', '50 cm'], desc: 'Dije de corazón con circonita rosada sobre cadena fina tipo rolo. Un clásico para regalar.',
    details: ['Baño de oro 18k sobre plata 925', 'Circonita AAA', 'Cierre de mosquetón', 'Extensor de 5 cm'], rating: 4.9 },
  { id: 'c02', name: 'Gargantilla Perlas Luna',  cat: 'collares', metal: 'plata', price: 75, tag: 'Nuevo', stone: '#fbf6ee', isNew: true,
    sizes: ['35 cm', '40 cm'], desc: 'Perlas de agua dulce cultivadas intercaladas con eslabones de plata. Elegancia atemporal.',
    details: ['Plata 925', 'Perlas de agua dulce 4 mm', 'Hipoalergénico'], rating: 4.8 },
  { id: 'c03', name: 'Collar Inicial Personalizado', cat: 'collares', metal: 'oro-rosa', price: 69, stone: '#f1c6d3',
    sizes: ['40 cm', '45 cm'], desc: 'Tu inicial en letra cursiva. Elige la letra en la nota de tu pedido.',
    details: ['Baño de oro rosa', 'Letra de 1.2 cm', 'Personalizable'], rating: 4.9 },
  { id: 'c04', name: 'Collar Capas Estrella', cat: 'collares', metal: 'acero', price: 59, stone: '#ffffff',
    sizes: ['40/45 cm'], desc: 'Doble cadena con estrella y punto de luz. Resistente al agua.',
    details: ['Acero quirúrgico 316L', 'No se oxida', 'Apto para el agua'], rating: 4.7 },

  { id: 'a01', name: 'Argollas Clásicas Gold', cat: 'aretes', metal: 'oro', price: 49, tag: 'Top ventas', stone: '#f3d98b',
    sizes: ['15 mm', '25 mm', '35 mm'], desc: 'Argollas lisas y ligeras que combinan con todo. Tu básico favorito.',
    details: ['Baño de oro 18k', 'Cierre de clic', 'Ligeras: 2 g por par'], rating: 4.9 },
  { id: 'a02', name: 'Topos Punto de Luz', cat: 'aretes', metal: 'plata', price: 39, stone: '#dff4ff',
    desc: 'Circonita redonda de 5 mm con engaste de cuatro garras. Discretos y brillantes.',
    details: ['Plata 925', 'Circonita 5 mm', 'Tope de silicona'], rating: 4.8 },
  { id: 'a03', name: 'Aretes Gota Esmeralda', cat: 'aretes', metal: 'oro', price: 79, oldPrice: 95, tag: 'Oferta', stone: '#3fa37a',
    desc: 'Colgantes con piedra verde en forma de gota. Ideales para eventos y ocasiones especiales.',
    details: ['Baño de oro 18k', 'Cristal verde esmeralda', 'Largo 3 cm'], rating: 4.7 },
  { id: 'a04', name: 'Ear Cuff Trenzado', cat: 'aretes', metal: 'acero', price: 35, tag: 'Nuevo', stone: '#cfd4d9', isNew: true,
    desc: 'Sin perforación: se ajusta al borde de la oreja. Luce varios a la vez.',
    details: ['Acero quirúrgico 316L', 'No requiere perforación', 'Unidad'], rating: 4.6 },

  { id: 'r01', name: 'Anillo Solitario Aurora', cat: 'anillos', metal: 'plata', price: 85, tag: 'Top ventas', stone: '#dff4ff',
    sizes: ['5', '6', '7', '8', '9'], desc: 'Solitario con circonita talla brillante. Perfecto para una promesa.',
    details: ['Plata 925', 'Circonita 6 mm', 'Grabado de ley'], rating: 5.0 },
  { id: 'r02', name: 'Anillo Midi Minimal', cat: 'anillos', metal: 'oro', price: 39, stone: '#f3d98b',
    sizes: ['3', '4', '5'], desc: 'Banda delgada para usar en la falange o combinar en capas.',
    details: ['Baño de oro 18k', 'Grosor 1 mm', 'Apilable'], rating: 4.7 },
  { id: 'r03', name: 'Anillo Rosa Encantada', cat: 'anillos', metal: 'oro-rosa', price: 65, tag: 'Nuevo', stone: '#e8a0b4', isNew: true,
    sizes: ['Ajustable'], desc: 'Flor con pétalos de circonita rosada. Ajustable para que siempre te quede.',
    details: ['Baño de oro rosa', 'Talla ajustable', 'Circonitas rosadas'], rating: 4.8 },
  { id: 'r04', name: 'Set 3 Anillos Stack', cat: 'anillos', metal: 'acero', price: 55, stone: '#cfd4d9',
    sizes: ['6', '7', '8'], desc: 'Trío de anillos: liso, trenzado y con punto de luz.',
    details: ['Acero quirúrgico 316L', '3 piezas', 'Resistente al agua'], rating: 4.6 },
  { id: 'r05', name: 'Anillo Trenzado Brillante', cat: 'anillos', metal: 'oro', price: 89, tag: 'Nuevo', stone: '#f3d98b', isNew: true,
    img: 'assets/productos/anillo-trenzado-oro.jpg',
    sizes: ['5', '6', '7', '8', '9'], desc: 'Dos bandas entrelazadas con circonitas en pavé que atrapan la luz desde todos los ángulos. Ideal para aniversarios o como anillo de promesa.',
    details: ['Baño de oro 18k', 'Circonitas en pavé', 'Diseño trenzado', 'Hipoalergénico'], rating: 4.9 },

  { id: 'p01', name: 'Esclava Nudo de Amor', cat: 'pulseras', metal: 'oro', price: 72, stone: '#f3d98b',
    sizes: ['S', 'M', 'L'], desc: 'Esclava rígida con nudo central. Símbolo de unión, ideal para regalar a tu mejor amiga.',
    details: ['Baño de oro 18k', 'Apertura lateral', 'Con cajita de regalo'], rating: 4.8 },
  { id: 'p02', name: 'Pulsera Charms Dulces', cat: 'pulseras', metal: 'plata', price: 95, oldPrice: 120, tag: 'Oferta', stone: '#e8a0b4',
    sizes: ['S', 'M', 'L'], desc: 'Pulsera base con 4 charms: corazón, estrella, luna y flor. Agrega más cuando quieras.',
    details: ['Plata 925', '4 charms incluidos', 'Esmalte de colores'], rating: 4.9 },
  { id: 'p03', name: 'Tobillera Conchitas', cat: 'pulseras', metal: 'acero', price: 42, tag: 'Nuevo', stone: '#fbf6ee', isNew: true,
    sizes: ['Única'], desc: 'Tobillera playera con conchitas y cadena fina. No se oxida con el agua de mar.',
    details: ['Acero quirúrgico 316L', 'Largo 22 + 5 cm', 'Resistente al agua'], rating: 4.7 },

  { id: 'w01', name: 'Reloj Blush Minimal', cat: 'relojes', metal: 'oro-rosa', price: 159, tag: 'Top ventas', stone: '#f7e4e0',
    desc: 'Esfera limpia de 32 mm con malla milanesa magnética. Elegante de día y de noche.',
    details: ['Caja de acero con baño oro rosa', 'Malla milanesa ajustable', 'Resistente a salpicaduras'], rating: 4.8 },
  { id: 'w02', name: 'Reloj Perla Classic', cat: 'relojes', metal: 'oro', price: 179, tag: 'Nuevo', stone: '#fbf6ee', isNew: true,
    desc: 'Esfera de nácar con índices dorados y correa de cuero vegano color camel.',
    details: ['Esfera de nácar', 'Cuero vegano', 'Maquinaria japonesa'], rating: 4.9 },

  { id: 'b01', name: 'Mini Bolso Acolchado', cat: 'bolsos', metal: 'otros', price: 139, stone: '#e8a0b4',
    desc: 'Mini bolso acolchado con cadena dorada desmontable. Caben celular, llaves y labial.',
    details: ['Cuero vegano', 'Cadena de 110 cm', '18 × 12 × 6 cm'], rating: 4.8 },
  { id: 'b02', name: 'Clutch Noche Dorada', cat: 'bolsos', metal: 'otros', price: 119, oldPrice: 149, tag: 'Oferta', stone: '#2e2a33',
    desc: 'Clutch rígido con broche joya. Para bodas, graduaciones y noches especiales.',
    details: ['Satén negro', 'Broche dorado', 'Cadena interna opcional'], rating: 4.7 },

  { id: 'l01', name: 'Lentes Cat-Eye Glam', cat: 'lentes', metal: 'oro', price: 89, tag: 'Top ventas', stone: '#3d2b33',
    desc: 'Montura ojo de gato con detalles dorados en las patillas. Incluye estuche.',
    details: ['Protección UV400', 'Lunas polarizadas', 'Estuche y paño'], rating: 4.8 },
  { id: 'l02', name: 'Lentes Redondos Rosé', cat: 'lentes', metal: 'oro-rosa', price: 79, tag: 'Nuevo', stone: '#e8a0b4', isNew: true,
    desc: 'Montura metálica fina con lunas degradadas rosadas. Estilo retro.',
    details: ['Protección UV400', 'Montura metálica', 'Estuche incluido'], rating: 4.6 },

  { id: 'h01', name: 'Pinza Perlas Soñadas', cat: 'cabello', metal: 'oro', price: 29, stone: '#fbf6ee',
    desc: 'Pinza alargada con fila de perlas sintéticas. Perfecta para un peinado romántico.',
    details: ['Metal con baño dorado', 'Perlas sintéticas', 'Largo 7 cm'], rating: 4.7 },
  { id: 'h02', name: 'Set Scrunchies Satín', cat: 'cabello', metal: 'otros', price: 25, tag: 'Top ventas', stone: '#d9a7c7',
    desc: 'Tres scrunchies de satín que cuidan tu cabello: no lo quiebran ni marcan.',
    details: ['Satín suave', '3 colores', 'Anti-frizz'], rating: 4.9 },
  { id: 'h03', name: 'Vincha Joya Cristal', cat: 'cabello', metal: 'plata', price: 49, tag: 'Nuevo', stone: '#dff4ff', isNew: true,
    desc: 'Vincha acolchada con aplicaciones de cristal. El accesorio estrella de la temporada.',
    details: ['Terciopelo', 'Cristales aplicados', 'Talla única'], rating: 4.8 }
];

/* ==========================================================
   Ilustraciones SVG de cada tipo de pieza
   ========================================================== */
let __svgId = 0;
function jewelArt(type, metalKey = 'oro', stone = '#e8a0b4') {
  const m = METALS[metalKey] || METALS.oro;
  const id = 'g' + (++__svgId);
  const defs = `<defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${m.a}"/><stop offset=".55" stop-color="${m.b}"/><stop offset="1" stop-color="${m.c}"/>
    </linearGradient>
    <radialGradient id="${id}s" cx=".35" cy=".3" r=".8">
      <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="${stone}"/><stop offset="1" stop-color="${stone}" stop-opacity=".75"/>
    </radialGradient>
  </defs>`;
  const g = `url(#${id})`, s = `url(#${id}s)`;
  const shine = (x, y, r = 3) => `<path d="M${x} ${y - r * 2}l${r * .5} ${r * 1.5} ${r * 1.5} ${r * .5}-${r * 1.5} ${r * .5}-${r * .5} ${r * 1.5}-${r * .5}-${r * 1.5}-${r * 1.5}-${r * .5} ${r * 1.5}-${r * .5}z" fill="#fff" opacity=".9"/>`;
  let body = '';
  switch (type) {
    case 'collar':
      body = `<path d="M40 30 C40 110 160 110 160 30" fill="none" stroke="${g}" stroke-width="3" stroke-dasharray="5 3" stroke-linecap="round"/>
        <circle cx="100" cy="98" r="4" fill="none" stroke="${g}" stroke-width="2.5"/>
        <path d="M100 150 C70 128 72 104 88 104 C95 104 100 110 100 114 C100 110 105 104 112 104 C128 104 130 128 100 150z" fill="${g}"/>
        <path d="M100 138 C84 124 85 112 92 112 C96 112 100 116 100 120 C100 116 104 112 108 112 C115 112 116 124 100 138z" fill="${s}"/>
        ${shine(92, 120)}`;
      break;
    case 'aretes':
      body = `<g><circle cx="68" cy="52" r="7" fill="${g}"/><path d="M68 59v12" stroke="${g}" stroke-width="3"/>
        <path d="M68 71 C50 100 50 128 68 138 C86 128 86 100 68 71z" fill="${g}"/>
        <path d="M68 86 C58 104 58 122 68 128 C78 122 78 104 68 86z" fill="${s}"/>${shine(64, 108)}</g>
        <g><circle cx="132" cy="52" r="7" fill="${g}"/><path d="M132 59v12" stroke="${g}" stroke-width="3"/>
        <path d="M132 71 C114 100 114 128 132 138 C150 128 150 100 132 71z" fill="${g}"/>
        <path d="M132 86 C122 104 122 122 132 128 C142 122 142 104 132 86z" fill="${s}"/>${shine(128, 108)}</g>`;
      break;
    case 'argollas':
      body = `<circle cx="70" cy="100" r="34" fill="none" stroke="${g}" stroke-width="7"/>
        <circle cx="130" cy="100" r="34" fill="none" stroke="${g}" stroke-width="7"/>${shine(52, 78)}${shine(148, 78)}`;
      break;
    case 'anillo':
      body = `<ellipse cx="100" cy="118" rx="44" ry="40" fill="none" stroke="${g}" stroke-width="9"/>
        <path d="M84 80 L92 64 H108 L116 80 Z" fill="${g}"/>
        <path d="M78 64 L88 44 H112 L122 64 L100 86 Z" fill="${s}" stroke="#fff" stroke-opacity=".6" stroke-width="1.5"/>
        <path d="M78 64 H122 M88 44 L100 64 L112 44 M100 64 V86" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1"/>
        ${shine(92, 54, 3.5)}`;
      break;
    case 'pulsera':
      body = `<ellipse cx="100" cy="104" rx="62" ry="40" fill="none" stroke="${g}" stroke-width="8"/>
        <ellipse cx="100" cy="104" rx="62" ry="40" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="2 8"/>
        <circle cx="100" cy="144" r="10" fill="${s}" stroke="${g}" stroke-width="3"/>
        <path d="M60 138 l6 12 M140 138 l-6 12" stroke="${g}" stroke-width="3"/>
        <circle cx="66" cy="154" r="6" fill="${g}"/><path d="M134 150 l6 6 -6 6 -6 -6z" fill="${g}"/>${shine(96, 140)}`;
      break;
    case 'reloj':
      body = `<rect x="80" y="18" width="40" height="44" rx="6" fill="${g}" opacity=".85"/>
        <rect x="80" y="138" width="40" height="44" rx="6" fill="${g}" opacity=".85"/>
        <path d="M80 30h40M80 42h40M80 150h40M80 162h40" stroke="#fff" stroke-opacity=".35"/>
        <circle cx="100" cy="100" r="44" fill="${g}"/>
        <circle cx="100" cy="100" r="36" fill="${s}"/>
        <path d="M100 70v4M100 126v4M70 100h4M126 100h4" stroke="${m.c}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M100 100 L100 80 M100 100 L114 108" stroke="${m.c}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="2.5" fill="${m.c}"/><rect x="143" y="96" width="7" height="8" rx="2" fill="${g}"/>`;
      break;
    case 'bolso':
      body = `<path d="M68 70 C68 30 132 30 132 70" fill="none" stroke="${g}" stroke-width="4" stroke-dasharray="6 3"/>
        <rect x="46" y="70" width="108" height="84" rx="14" fill="${stone}"/>
        <path d="M46 96 H154 M46 124 H154 M73 70 V154 M100 70 V154 M127 70 V154" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
        <path d="M46 84 Q46 70 60 70 H140 Q154 70 154 84 V104 Q100 120 46 104 Z" fill="${stone}" style="filter:brightness(.9)"/>
        <rect x="90" y="100" width="20" height="14" rx="3" fill="${g}"/>${shine(96, 106, 2.5)}`;
      break;
    case 'lentes':
      body = `<path d="M34 86 Q30 72 46 72 H86 Q98 72 94 88 L88 112 Q84 128 66 128 H56 Q40 128 38 112 Z" fill="${stone}" opacity=".9" stroke="${g}" stroke-width="5"/>
        <path d="M166 86 Q170 72 154 72 H114 Q102 72 106 88 L112 112 Q116 128 134 128 H144 Q160 128 162 112 Z" fill="${stone}" opacity=".9" stroke="${g}" stroke-width="5"/>
        <path d="M94 86 Q100 78 106 86" fill="none" stroke="${g}" stroke-width="5"/>
        <path d="M34 80 L20 70 M166 80 L180 70" stroke="${g}" stroke-width="5" stroke-linecap="round"/>
        <path d="M52 84 L66 84 L50 106 Z M122 84 L136 84 L120 106 Z" fill="#fff" opacity=".35"/>`;
      break;
    case 'pinza':
      body = `<rect x="30" y="86" width="140" height="28" rx="14" fill="${g}"/>
        ${[50, 72, 94, 116, 138].map(x => `<circle cx="${x + 6}" cy="100" r="10" fill="${s}"/>`).join('')}
        <path d="M34 120 H166" stroke="${m.c}" stroke-width="3" stroke-linecap="round" opacity=".6"/>${shine(52, 96, 2.5)}${shine(118, 96, 2.5)}`;
      break;
    default:
      body = `<circle cx="100" cy="100" r="40" fill="${g}"/>`;
  }
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">${defs}${body}</svg>`;
}

/* Tipo de ilustración según producto */
function artFor(p) {
  if (p.id === 'a01') return 'argollas';
  const cat = CATEGORIES.find(c => c.id === p.cat);
  return cat ? cat.art : 'collar';
}
