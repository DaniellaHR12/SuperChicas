/* ==========================================================
   SuperChicas · Lógica de la tienda
   ========================================================== */
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const money = n => `${STORE.currency} ${n.toFixed(2)}`;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* almacenamiento no disponible */ }
    }
  };

  const state = {
    cat: '',
    metal: '',
    q: '',
    sort: 'destacados',
    showWishlist: false,
    cart: store.get('sc-cart', []),
    wish: store.get('sc-wish', [])
  };

  /* ---------- Arte estático (hero) ---------- */
  $$('[data-art]').forEach(el => {
    el.innerHTML = jewelArt(el.dataset.art, el.dataset.metal, el.dataset.metal === 'plata' ? '#9fd3f0' : '#e8a0b4');
  });
  $$('[data-currency-amount]').forEach(el => { el.textContent = `${STORE.currency} ${el.dataset.currencyAmount}`; });
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Categorías ---------- */
  $('#categoryGrid').innerHTML = CATEGORIES.map(c => {
    const count = PRODUCTS.filter(p => p.cat === c.id).length;
    return `<button class="category" data-cat="${c.id}">
      <span class="category__art">${jewelArt(c.art, c.metal, c.id === 'bolsos' ? '#e8a0b4' : '#e8a0b4')}</span>
      <span class="category__name">${c.name}</span>
      <span class="category__desc">${c.desc}</span>
      <span class="category__count">${count} piezas</span>
    </button>`;
  }).join('');

  $('#filterChips').innerHTML = [{ id: '', name: 'Todo' }, ...CATEGORIES]
    .map(c => `<button class="chip" role="tab" data-chip="${c.id}">${c.name}</button>`).join('');

  const goToCategory = cat => {
    state.cat = cat;
    state.showWishlist = false;
    renderProducts();
    $('#tienda').scrollIntoView({ behavior: 'smooth' });
  };
  $('#categoryGrid').addEventListener('click', e => {
    const btn = e.target.closest('[data-cat]');
    if (btn) goToCategory(btn.dataset.cat);
  });
  $$('[data-go-cat]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); goToCategory(a.dataset.goCat); }));
  $('#filterChips').addEventListener('click', e => {
    const chip = e.target.closest('[data-chip]');
    if (!chip) return;
    state.cat = chip.dataset.chip;
    state.showWishlist = false;
    renderProducts();
  });

  /* ---------- Productos ---------- */
  const priceHTML = p => `<span class="price">${money(p.price)}</span>${p.oldPrice ? `<s class="old-price">${money(p.oldPrice)}</s>` : ''}`;
  // Foto real si el producto tiene `img`; si no, la ilustración SVG
  const productMedia = p => p.img
    ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" decoding="async">`
    : jewelArt(artFor(p), p.metal, p.stone);
  const tagClass = t => ({ 'Nuevo': 'tag--new', 'Oferta': 'tag--sale', 'Top ventas': 'tag--top' }[t] || '');

  function filtered() {
    let list = PRODUCTS.filter(p =>
      (!state.showWishlist || state.wish.includes(p.id)) &&
      (!state.cat || p.cat === state.cat) &&
      (!state.metal || p.metal === state.metal) &&
      (!state.q || (p.name + ' ' + p.desc + ' ' + METALS[p.metal].label).toLowerCase().includes(state.q))
    );
    const by = {
      'precio-asc': (a, b) => a.price - b.price,
      'precio-desc': (a, b) => b.price - a.price,
      'nuevos': (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
      'destacados': (a, b) => (b.tag === 'Top ventas') - (a.tag === 'Top ventas') || b.rating - a.rating
    }[state.sort];
    return by ? [...list].sort(by) : list;
  }

  function renderProducts() {
    const list = filtered();
    $$('.chip').forEach(c => {
      const active = !state.showWishlist && c.dataset.chip === state.cat;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-selected', active);
    });
    const label = state.showWishlist ? 'en tus favoritos' : '';
    $('#resultsCount').textContent = `${list.length} ${list.length === 1 ? 'pieza' : 'piezas'} ${label}`.trim();

    $('#productGrid').innerHTML = list.length ? list.map(p => `
      <article class="card" data-id="${p.id}">
        <div class="card__media" style="--stone:${p.stone}">
          ${p.tag ? `<span class="tag ${tagClass(p.tag)}">${p.tag}</span>` : ''}
          <button class="wish ${state.wish.includes(p.id) ? 'is-on' : ''}" data-wish="${p.id}" aria-label="Agregar ${esc(p.name)} a favoritos" aria-pressed="${state.wish.includes(p.id)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.5-9.3 9-9.3 9z"/></svg>
          </button>
          <button class="card__art" data-view="${p.id}" aria-label="Ver detalles de ${esc(p.name)}">${productMedia(p)}</button>
          <button class="quick-add" data-add="${p.id}">${p.sizes && p.sizes.length > 1 ? 'Elegir talla' : 'Agregar a la bolsa'}</button>
        </div>
        <div class="card__info">
          <p class="card__metal"><span class="dot dot--${p.metal}"></span>${METALS[p.metal].label}</p>
          <h3 class="card__name"><button data-view="${p.id}">${esc(p.name)}</button></h3>
          <div class="card__row"><div>${priceHTML(p)}</div><span class="rating" aria-label="Calificación ${p.rating}">★ ${p.rating.toFixed(1)}</span></div>
        </div>
      </article>`).join('')
      : `<div class="empty"><p>${state.showWishlist ? 'Aún no tienes favoritos. Toca el ♡ en las piezas que te encanten.' : 'No encontramos piezas con esos filtros.'}</p>
         <button class="btn btn--ghost" id="resetFilters">Ver todo</button></div>`;
  }

  $('#productGrid').addEventListener('click', e => {
    const w = e.target.closest('[data-wish]');
    if (w) return toggleWish(w.dataset.wish);
    const v = e.target.closest('[data-view]');
    if (v) return openProduct(v.dataset.view);
    const a = e.target.closest('[data-add]');
    if (a) {
      const p = PRODUCTS.find(x => x.id === a.dataset.add);
      return (p.sizes && p.sizes.length > 1) ? openProduct(p.id) : addToCart(p.id, p.sizes ? p.sizes[0] : '');
    }
    if (e.target.id === 'resetFilters') {
      Object.assign(state, { cat: '', metal: '', q: '', showWishlist: false });
      $('#searchInput').value = ''; $('#metalFilter').value = '';
      renderProducts();
    }
  });

  let searchTimer;
  $('#searchInput').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.q = e.target.value.trim().toLowerCase(); renderProducts(); }, 150);
  });
  $('#metalFilter').addEventListener('change', e => { state.metal = e.target.value; renderProducts(); });
  $('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });

  /* ---------- Favoritos ---------- */
  function toggleWish(id) {
    const i = state.wish.indexOf(id);
    if (i >= 0) state.wish.splice(i, 1); else state.wish.push(id);
    store.set('sc-wish', state.wish);
    updateBadges();
    renderProducts();
    toast(i >= 0 ? 'Quitado de favoritos' : '♡ Guardado en favoritos');
  }
  $('#openWishlist').addEventListener('click', () => {
    state.showWishlist = !state.showWishlist;
    state.cat = '';
    renderProducts();
    $('#tienda').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Modal de producto ---------- */
  const modal = $('#productModal');
  function openProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const cat = CATEGORIES.find(c => c.id === p.cat);
    const sizeLabel = p.cat === 'anillos' ? 'Talla' : p.cat === 'collares' ? 'Largo' : p.cat === 'aretes' ? 'Tamaño' : 'Talla';
    $('#modalBody').innerHTML = `
      <div class="pd__media" style="--stone:${p.stone}">${productMedia(p)}</div>
      <div class="pd__info">
        <p class="eyebrow">${cat.name}</p>
        <h2 id="modalTitle">${esc(p.name)}</h2>
        <div class="pd__price">${priceHTML(p)} ${p.oldPrice ? `<span class="save">Ahorras ${money(p.oldPrice - p.price)}</span>` : ''}</div>
        <p class="pd__desc">${esc(p.desc)}</p>
        <p class="card__metal"><span class="dot dot--${p.metal}"></span>${METALS[p.metal].label}</p>
        ${p.sizes ? `
          <fieldset class="sizes">
            <legend>${sizeLabel} ${p.cat === 'anillos' ? '<a href="#guia" data-close>¿Cuál es mi talla?</a>' : ''}</legend>
            ${p.sizes.map((s, i) => `<label><input type="radio" name="size" value="${esc(s)}" ${i === 0 ? 'checked' : ''}><span>${esc(s)}</span></label>`).join('')}
          </fieldset>` : ''}
        <label class="gift"><input type="checkbox" id="giftWrap" checked> <span>🎁 Empaque de regalo con tarjeta <strong>(gratis)</strong></span></label>
        <div class="pd__actions">
          <div class="qty" aria-label="Cantidad">
            <button type="button" data-q="-1" aria-label="Menos">−</button><output id="pdQty">1</output><button type="button" data-q="1" aria-label="Más">+</button>
          </div>
          <button class="btn btn--primary btn--block" id="pdAdd">Agregar a la bolsa</button>
        </div>
        <ul class="pd__details">${p.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
      </div>`;
    let qty = 1;
    $$('[data-q]', modal).forEach(b => b.addEventListener('click', () => {
      qty = Math.max(1, Math.min(10, qty + Number(b.dataset.q)));
      $('#pdQty').textContent = qty;
    }));
    $('#pdAdd').addEventListener('click', () => {
      const size = $('input[name="size"]:checked', modal)?.value || '';
      addToCart(p.id, size, qty, $('#giftWrap').checked);
      closeModal();
    });
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
  }
  function closeModal() { if (modal.open) modal.close(); }
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.closest('[data-close]')) closeModal();
  });

  /* ---------- Carrito ---------- */
  const drawer = $('#cartDrawer');
  const overlay = $('#overlay');
  const cartKey = (id, size) => `${id}|${size}`;

  function addToCart(id, size = '', qty = 1, gift = true) {
    const key = cartKey(id, size);
    const item = state.cart.find(i => i.key === key);
    if (item) item.qty = Math.min(10, item.qty + qty);
    else state.cart.push({ key, id, size, qty, gift });
    saveCart();
    const p = PRODUCTS.find(x => x.id === id);
    toast(`✦ ${p.name} agregado a tu bolsa`);
    openDrawer();
  }
  function saveCart() {
    store.set('sc-cart', state.cart);
    updateBadges();
    renderCart();
  }
  function totals() {
    const subtotal = state.cart.reduce((s, i) => s + PRODUCTS.find(p => p.id === i.id).price * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= STORE.freeShippingFrom ? 0 : STORE.shippingCost;
    return { subtotal, shipping, total: subtotal + shipping };
  }
  function renderCart() {
    const { subtotal, shipping, total } = totals();
    const missing = STORE.freeShippingFrom - subtotal;
    const pct = Math.min(100, (subtotal / STORE.freeShippingFrom) * 100);
    $('#shippingBar').innerHTML = state.cart.length ? `
      <p>${missing > 0 ? `Te faltan <strong>${money(missing)}</strong> para el envío gratis` : '🎉 ¡Tienes <strong>envío gratis</strong>!'}</p>
      <div class="progress"><span style="width:${pct}%"></span></div>` : '';

    $('#drawerItems').innerHTML = state.cart.length ? state.cart.map(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return `<div class="line" data-key="${esc(i.key)}">
        <div class="line__art" style="--stone:${p.stone}">${productMedia(p)}</div>
        <div class="line__info">
          <p class="line__name">${esc(p.name)}</p>
          <p class="line__meta">${METALS[p.metal].label}${i.size ? ` · ${esc(i.size)}` : ''}${i.gift ? ' · 🎁 Regalo' : ''}</p>
          <div class="qty qty--sm">
            <button data-line-q="-1" aria-label="Menos">−</button><output>${i.qty}</output><button data-line-q="1" aria-label="Más">+</button>
          </div>
        </div>
        <div class="line__right">
          <p>${money(p.price * i.qty)}</p>
          <button class="link" data-remove>Quitar</button>
        </div>
      </div>`;
    }).join('') : `<div class="empty empty--cart"><p>Tu bolsa está vacía.</p><a href="#tienda" class="btn btn--primary" data-close-drawer>Descubrir piezas</a></div>`;

    $('#drawerFoot').innerHTML = state.cart.length ? `
      <dl class="sum">
        <div><dt>Subtotal</dt><dd>${money(subtotal)}</dd></div>
        <div><dt>Envío</dt><dd>${shipping ? money(shipping) : 'Gratis'}</dd></div>
        <div class="sum__total"><dt>Total</dt><dd>${money(total)}</dd></div>
      </dl>
      <button class="btn btn--primary btn--block" id="checkout">Finalizar pedido por WhatsApp</button>
      <p class="secure">Coordinamos pago y envío contigo por WhatsApp ✦</p>` : '';
  }
  $('#drawerItems').addEventListener('click', e => {
    const line = e.target.closest('[data-key]');
    if (!line) return;
    const item = state.cart.find(i => i.key === line.dataset.key);
    if (e.target.closest('[data-remove]')) {
      state.cart = state.cart.filter(i => i !== item);
    } else if (e.target.closest('[data-line-q]')) {
      item.qty += Number(e.target.closest('[data-line-q]').dataset.lineQ);
      if (item.qty < 1) state.cart = state.cart.filter(i => i !== item);
      item.qty = Math.min(10, item.qty);
    } else return;
    saveCart();
  });
  $('#drawerFoot').addEventListener('click', e => {
    if (e.target.id !== 'checkout') return;
    const { subtotal, shipping, total } = totals();
    const lines = state.cart.map(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return `• ${i.qty} × ${p.name} (${METALS[p.metal].label}${i.size ? `, ${i.size}` : ''})${i.gift ? ' 🎁' : ''} — ${money(p.price * i.qty)}`;
    });
    const msg = [`¡Hola ${STORE.name}! ✨ Quiero hacer este pedido:`, '', ...lines, '',
      `Subtotal: ${money(subtotal)}`, `Envío: ${shipping ? money(shipping) : 'Gratis'}`, `Total: ${money(total)}`].join('\n');
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    document.body.classList.add('no-scroll');
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');
  }
  $('#openCart').addEventListener('click', openDrawer);
  overlay.addEventListener('click', () => { closeDrawer(); closeNav(); });
  drawer.addEventListener('click', e => { if (e.target.closest('[data-close-drawer]')) closeDrawer(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeNav(); } });

  function updateBadges() {
    const count = state.cart.reduce((s, i) => s + i.qty, 0);
    const cb = $('#cartCount'), wb = $('#wishCount');
    cb.textContent = count; cb.hidden = !count;
    wb.textContent = state.wish.length; wb.hidden = !state.wish.length;
  }

  /* ---------- WhatsApp directo ---------- */
  $$('.js-whatsapp').forEach(a => {
    a.href = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent('¡Hola SuperChicas! Tengo una consulta ✨')}`;
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Menú móvil ---------- */
  const nav = $('#nav'), menuBtn = $('.menu-toggle');
  function closeNav() { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });

  /* ---------- Guía de tallas ---------- */
  // Talla (numeración US) → circunferencia interna en mm
  const RING_SIZES = [[3, 44.2], [4, 46.8], [5, 49.3], [6, 51.9], [7, 54.4], [8, 57.0], [9, 59.5], [10, 62.1], [11, 64.6]];
  $('#ringTable').innerHTML = RING_SIZES.map(([s, mm]) =>
    `<tr data-size="${s}"><td>${s}</td><td>${mm.toFixed(1)} mm</td><td>${(mm / Math.PI).toFixed(1)} mm</td></tr>`).join('');
  $('#mmInput').addEventListener('input', e => {
    const mm = parseFloat(e.target.value);
    $$('#ringTable tr').forEach(r => r.classList.remove('is-match'));
    if (!mm) { $('#sizeOutput').textContent = 'Talla —'; return; }
    const match = RING_SIZES.find(([, c]) => c >= mm - 0.3);
    if (!match) { $('#sizeOutput').textContent = mm < 44 ? 'Menor a 3' : 'Mayor a 11'; return; }
    $('#sizeOutput').textContent = `Talla ${match[0]}`;
    $(`#ringTable tr[data-size="${match[0]}"]`).classList.add('is-match');
  });
  $$('.tab').forEach(t => t.addEventListener('click', () => {
    $$('.tab').forEach(x => { x.classList.toggle('is-active', x === t); x.setAttribute('aria-selected', x === t); });
    $$('.tabpanel').forEach(p => { p.hidden = p.dataset.panel !== t.dataset.tab; });
  }));

  /* ---------- Newsletter ---------- */
  $('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#nlEmail'), msg = $('#nlMsg');
    if (!input.checkValidity() || !input.value) {
      msg.textContent = 'Ingresa un correo válido, por favor.';
      msg.className = 'form-msg is-error';
      return;
    }
    msg.textContent = '¡Bienvenida al club! Tu código es SUPERCHICA10 ✦';
    msg.className = 'form-msg is-ok';
    input.value = '';
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(text) {
    const t = $('#toast');
    t.textContent = text;
    t.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-show'), 2200);
  }

  /* ---------- Header con sombra al hacer scroll ---------- */
  const header = $('.header');
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 10), { passive: true });

  renderProducts();
  renderCart();
  updateBadges();
})();
