/* OPICKO demo — vanilla, deferred-safe */
(function () {
    "use strict";
    const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const CFG = window.OPK_CONFIG || {};

    /* ---- config fill ---- */
    $$('[data-cfg]').forEach(el => { const k = el.dataset.cfg; if (CFG[k] != null) el.textContent = CFG[k]; });

    /* ---- announcement marquee (config-driven) ---- */
    (function () {
        const t = $('#opk-marquee .opk-marquee__track'); if (!t) return;
        const items = ['SHIPS FROM AUSTRALIA', `${CFG.returnsDays}-DAY EASY RETURNS`, 'EXPRESS DELIVERY AT CHECKOUT', '4 × WITH AFTERPAY'];
        if (CFG.freeShip) items.push(`FREE SHIPPING OVER AU$${CFG.freeShip}`);
        t.innerHTML = items.map(i => `<span>${i}</span><i>✦</i>`).join('');
        t.innerHTML += t.innerHTML; // seamless loop
    })();
    $$('.opk-marquee--words .opk-marquee__track').forEach(t => t.innerHTML += t.innerHTML);

    /* ---- header ---- */
    const header = $('#opk-header');
    addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 40), { passive: true });
    $('.opk-burger')?.addEventListener('click', () => header.classList.toggle('is-open'));
    $('#opkSearchBtn')?.addEventListener('click', () => { $('.opk-search').classList.toggle('is-open'); $('.opk-search input')?.focus(); });

    /* ---- toast ---- */
    let toastT; const toast = m => { const el = $('#opk-toast'); el.textContent = m; el.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('is-on'), 2600); };

    /* ---- bag drawer ---- */
    let bag = 0; const bagEl = $('#bagCount');
    const drawer = $('#opk-drawer'), veil = $('#opk-veil');
    const openBag = o => { drawer.classList.toggle('is-open', o); veil.classList.toggle('is-on', o); };
    $('#opkBagBtn')?.addEventListener('click', () => openBag(true));
    veil?.addEventListener('click', () => openBag(false));
    function addBag() { bag++; bagEl.textContent = bag; $('#bagItems').textContent = `YOUR BAG (${bag})`; toast('Added to bag ✓'); }

    /* ---- countdown ---- */
    (function () {
        const wrap = $('[data-cd]'); if (!wrap) return;
        const target = CFG.dropDate ? new Date(CFG.dropDate) : new Date(Date.now() + 30 * 864e5);
        const p = n => String(n).padStart(2, '0');
        setInterval(() => {
            let d = Math.max(0, target - Date.now()) / 1e3 | 0;
            const D = d / 86400 | 0, H = d / 3600 % 24 | 0, M = d / 60 % 60 | 0, S = d % 60;
            $('[data-cd-d]', wrap).textContent = p(D); $('[data-cd-h]', wrap).textContent = p(H);
            $('[data-cd-m]', wrap).textContent = p(M); $('[data-cd-s]', wrap).textContent = p(S);
        }, 1000);
    })();

    /* ---- product data + ONE card template ---- */
    const TEES = [
        { s: 'born-to-ride', n: 'Born To Ride', p: 35, c: ['#0B0B0C', '#F7F5F1'] },
        { s: 'crack-the-rules', n: 'Crack The Rules', p: 35, c: ['#F7F5F1', '#0B0B0C', '#E42A2A'] },
        { s: 'cyber-baron', n: 'Cyber Baron', p: 35, c: ['#0B0B0C', '#22C55E'] },
        { s: 'freedom', n: 'Freedom', p: 35, c: ['#0B0B0C', '#F7F5F1'] },
        { s: 'heritage', n: 'Heritage', p: 35, c: ['#F7F5F1', '#0B0B0C', '#E42A2A'] },
        { s: 'hustle-hard', n: 'Hustle Hard', p: 35, c: ['#0B0B0C'] },
        { s: 'immortal', n: 'Immortal', p: 35, c: ['#0B0B0C'] },
        { s: 'skull', n: 'Skull', p: 35, c: ['#0B0B0C', '#F7F5F1'] }
    ];
    const HOODIES = [
        { s: 'midnight-drop', n: 'Midnight Drop', p: 75, c: ['#0B0B0C'] },
        { s: 'limitless-mind', n: 'Limitless Mind', p: 75, c: ['#F7F5F1'] },
        { s: 'oni-no-hebi', n: 'Oni No Hebi', p: 75, c: ['#0B0B0C'] },
        { s: 'hell', n: 'Hell', p: 75, c: ['#0B0B0C', '#E42A2A'] }
    ];
    const card = (p, type, badge) => `
 <article class="opk-card">
  <div class="opk-card__media">
   <img loading="lazy" src="assets/img/products/${type}/${type === 'tees' ? 'tee' : 'hoodie'}-${p.s}-front.jpg" alt="${p.n} front">
   <img loading="lazy" class="opk-card__img--back" src="assets/img/products/${type}/${type === 'tees' ? 'tee' : 'hoodie'}-${p.s}-back.jpg" alt="${p.n} back print">
   ${badge ? `<span class="opk-badge${badge === 'crew' ? ' opk-badge--ink' : ''}">${badge === 'crew' ? 'CREW PICK' : 'NEW'}</span>` : ''}
   <button class="opk-card__wish" aria-label="Save ${p.n}"><svg class="ic"><use href="#i-heart"/></svg></button>
   <div class="opk-quick"><span class="opk-quick__label">QUICK ADD — AU$${p.p}</span>
     <div class="opk-quick__sizes">${['S', 'M', 'L', 'XL'].map(z => `<button data-add>${z}</button>`).join('')}</div>
   </div>
  </div>
  <div class="opk-card__info">
   <h3>${p.n}</h3>
   <div class="opk-card__rate">★★★★★<em>new</em></div>
   <p class="opk-card__price">AU$${p.p}.00<span class="opk-card__bnpl">4 × AU$${(p.p / 4).toFixed(2)}</span></p>
   <div class="opk-card__swatches">${p.c.map(c => `<i style="background:${c}"></i>`).join('')}</div>
  </div>
 </article>`;
    const fill = (id, items, type, badge) => { const el = $('#' + id); if (el) el.innerHTML = items.map(p => card(p, type, badge)).join(''); };
    fill('rail-newin', TEES, 'tees', 1);
    fill('rail-tees', TEES, 'tees', 1);
    fill('rail-hoodies', HOODIES, 'hoodies', 1);

    $('#rail-best').innerHTML = [TEES[4], HOODIES[2], TEES[3], TEES[6], HOODIES[3]].map((p, i) => card(p, i < 2 || i === 4 ? 'hoodies' : 'tees', 'crew')).join('');


    /* ---- quick add / wishlist (delegated) ---- */
    document.addEventListener('click', e => {
        const add = e.target.closest('[data-add]');
        if (add) { add.classList.add('is-added'); add.textContent = '✓'; addBag(); setTimeout(() => { add.classList.remove('is-added'); add.textContent = add.dataset.size || ['S', 'M', 'L', 'XL'][[...add.parentNode.children].indexOf(add)]; }, 1200); return; }
        const w = e.target.closest('.opk-card__wish'); if (w) { w.classList.toggle('is-on'); return; }
        const h = e.target.closest('.opk-spot__hot'); if (h) { const o = h.classList.contains('is-open'); $$('.opk-spot__hot').forEach(x => x.classList.remove('is-open')); if (!o) h.classList.add('is-open'); }
    });

    /* ---- rails arrows ---- */
    $$('.rail-wrap').forEach(w => {
        const r = $('.rail', w);
        $('[data-prev]', w)?.addEventListener('click', () => r.scrollBy({ left: -r.clientWidth * .8, behavior: 'smooth' }));
        $('[data-next]', w)?.addEventListener('click', () => r.scrollBy({ left: r.clientWidth * .8, behavior: 'smooth' }));
    });

    /* ---- category toggle ---- */
    $$('.opk-tabs button:not([disabled])').forEach(b => b.addEventListener('click', () => {
        $$('.opk-tabs button').forEach(x => x.classList.remove('is-active')); b.classList.add('is-active');
        $$('.opk-cats__pane').forEach(p => p.hidden = p.id !== 'pane-' + b.dataset.tab);
    }));

    /* ---- forms (mock) ---- */
    $$('form[data-mock]').forEach(f => f.addEventListener('submit', e => {
        e.preventDefault();
        const em = $('input[type=email]', f);
        if (!/^\S+@\S+\.\S+$/.test(em.value)) { toast('Enter a valid email'); em.focus(); return; }
        toast(f.dataset.ok || 'You’re on the list ✓'); f.reset();
    }));

    /* ---- FAQ one-open ---- */
    $$('.opk-faq details').forEach(d => d.addEventListener('toggle', () => { if (d.open) $$('.opk-faq details').forEach(x => { if (x !== d) x.open = false; }); }));
})();