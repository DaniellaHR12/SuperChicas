# SuperChicas ✦ Joyería y Accesorios para Mujer

Tienda web estática (HTML + CSS + JavaScript, sin dependencias) para **SuperChicas**.

## Qué incluye

- **Hero** con ilustraciones animadas de joyas.
- **8 categorías**: collares, aretes, anillos, pulseras, relojes, bolsos, lentes de sol y accesorios para el cabello.
- **Tienda** con filtros por categoría y material, buscador y orden por precio / novedades.
- **Ficha de producto** con material, tallas/largos, cantidad, detalles y empaque de regalo.
- **Favoritos** y **bolsa de compras** guardados en el navegador, barra de progreso de envío gratis.
- **Pedido por WhatsApp**: el carrito arma el mensaje con productos, tallas y total.
- **Materiales** (plata 925, baño de oro 18k, oro rosa, acero quirúrgico 316L), garantía y beneficios.
- **Guía de tallas** con calculadora de anillos y tablas de collares y pulseras.
- **Cuidado de joyas**, testimonios, newsletter con cupón y footer con redes.
- Diseño responsive (móvil, tablet y escritorio) y accesible.

## Cómo verla

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Cómo personalizar

Todo el catálogo está en `js/products.js`:

- `STORE.currency` — símbolo de moneda (por defecto `S/`).
- `STORE.whatsapp` — número de WhatsApp para recibir pedidos (código de país + número, sin `+`).
- `STORE.freeShippingFrom` / `STORE.shippingCost` — envío gratis y costo de envío.
- `PRODUCTS` — agrega, edita o quita productos (nombre, categoría, material, precio, tallas, detalles…).

Los colores y tipografías están como variables al inicio de `css/styles.css`.
