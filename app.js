/* ════════════════════════════════════════════════
   Cent Robles portfolio - interactions
   ════════════════════════════════════════════════ */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── intro loader ── */
  window.addEventListener('load', () => {
    const intro = $('#intro');
    if (!intro) return;
    setTimeout(() => intro.classList.add('gone'), reduceMotion ? 0 : 900);
    setTimeout(() => intro.remove(), 1700);
  });

  /* ── year ── */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ── navbar scroll state ── */
  const navbar = $('#navbar');
  const onScroll = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 24);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── mobile menu ── */
  const menuToggle = $('#menuToggle'), navLinks = $('#navLinks');
  if (menuToggle && navLinks) menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

  /* ── smooth scroll for data-scroll links ── */
  $$('[data-scroll]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById(a.getAttribute('data-scroll'));
    if (t) t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    navLinks && navLinks.classList.remove('open');
  }));

  /* ── marquee ── */
  const tools = ['n8n','Make','Zapier','GoHighLevel','Botpress','Retell','Claude','OpenAI','Supabase','PostgreSQL','Airtable','Notion','Slack','HubSpot','Grafana','WhatsApp'];
  const mk = $('#marqueeTrack');
  if (mk) {
    const set = tools.map(t => `<span class="marquee__item"><i class="ph ph-circles-three-plus"></i>${t}</span>`).join('');
    mk.innerHTML = set + set; // duplicate for seamless loop
  }

  /* ── services (draw-on-hover inline SVG icons) ── */
  const services = [
    { t: 'AI Agent Development', d: 'Intelligent chatbots and AI agents built in n8n and Make for automated customer conversations.',
      svg: '<path pathLength="1" d="M16 8V4M9 13h.01M15 13h.01"/><rect pathLength="1" x="4" y="8" width="24" height="18" rx="5"/><path pathLength="1" d="M2 15v4M30 15v4M11 20c1.5 1.6 4 2.4 5 2.4S19.5 21.6 21 20"/>' },
    { t: 'Workflow Automation', d: 'Seamless workflows in n8n, Zapier and Make that streamline operations and remove repetitive work.',
      svg: '<rect pathLength="1" x="4" y="5" width="9" height="7" rx="2"/><rect pathLength="1" x="19" y="20" width="9" height="7" rx="2"/><path pathLength="1" d="M8.5 12v6a3 3 0 0 0 3 3H19"/>' },
    { t: 'CRM & Lead Management', d: 'Automated data entry, lead enrichment and tracking across GoHighLevel, HubSpot and Monday.',
      svg: '<ellipse pathLength="1" cx="16" cy="7" rx="11" ry="4"/><path pathLength="1" d="M5 7v8c0 2.2 4.9 4 11 4s11-1.8 11-4V7"/><path pathLength="1" d="M5 15v8c0 2.2 4.9 4 11 4s11-1.8 11-4v-8"/>' },
    { t: 'API Integration', d: 'Connecting platforms through APIs and webhooks into one automation ecosystem that just works.',
      svg: '<path pathLength="1" d="M14 18l-3 3a4 4 0 0 1-6-6l3-3"/><path pathLength="1" d="M18 14l3-3a4 4 0 0 0-6-6l-3 3"/><path pathLength="1" d="M12 20l8-8"/>' },
    { t: 'Process Optimization', d: 'Analyzing and tightening technical workflows with clear documentation and automation best practice.',
      svg: '<circle pathLength="1" cx="7" cy="7" r="3"/><circle pathLength="1" cx="7" cy="25" r="3"/><circle pathLength="1" cx="25" cy="16" r="3"/><path pathLength="1" d="M7 10v12M10 7h6a6 6 0 0 1 6 6M10 25h6a6 6 0 0 0 6-6"/>' },
    { t: 'Data Management', d: 'Automated collection, organization and reporting with Google Sheets, Airtable and Notion.',
      svg: '<rect pathLength="1" x="4" y="5" width="24" height="22" rx="3"/><path pathLength="1" d="M4 12h24M12 12v15M20 12v15M4 19h24"/>' }
  ];
  const sg = $('#servicesGrid');
  if (sg) sg.innerHTML = services.map(s => `
    <article class="tool-card reveal">
      <span class="tool-card__ico"><svg class="it-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s.svg}</svg></span>
      <h3 class="tool-card__t">${s.t}</h3>
      <p class="tool-card__d">${s.d}</p>
    </article>`).join('');

  /* ── projects ── */
  const fb = 'https://www.facebook.com/share/1CLuxwkpgg/';
  const fbLink = `<a href="${fb}" target="_blank" rel="noopener">Cent R Solutions AI</a>`;
  const projects = [
    { cat:'n8n', t:'AI LinkedIn Post Automation with Human Review', d:'Generates AI-crafted LinkedIn posts, routes them through a human approval loop over email and WhatsApp, then publishes automatically.', loom:'b63a4fb2cdf34c718bd6c09ddcf02896', chips:['Pattern Systems'] },
    { cat:'n8n', t:'YouTube Video Generation & Publishing Pipeline', d:'Generates scripts, visuals and voiceovers with AI, assembles YouTube-ready videos, and publishes via Telegram bot with credit and billing built in.', loom:'8b93ea4c8aef4dabaa3004ee3540609d', chips:['Pattern Systems'] },
    { cat:'n8n', t:'Smart Job Application Scoring & Categorization', d:'Automatically scores and categorizes job applications based on criteria matching and relevance.', loom:'93b49f8668fc4c9099e14573f4a395f5', chips:['Personal'] },
    { cat:'n8n', t:'Text & Voice Support Chatbot for Appointments', d:'Dual-mode chatbot handling text-based appointment scheduling and voice-powered customer support.', loom:'40863f85d8aa4cbc916e3bb04a3444fc', chips:['Personal'] },
    { cat:'n8n', t:'AI Content Generation Posted to Social Media', d:'End-to-end automation that generates video content with AI and posts to social platforms automatically.', loom:'8ec62e601b9148c582760cc6d7f5fec0', chips:['Personal'] },
    { cat:'n8n', t:'Meta Leads Data to PostgreSQL Database', d:'Captures Meta and Facebook leads and stores them in a PostgreSQL database for analytics.', loom:'816ac329dbb54a09b68db8611bc4c2ba', chips:['Client'] },
    { cat:'n8n', t:'AI Agent for Facebook Messenger', d:`A chatbot agent that replies to page followers with real-time AI responses. Test it on the ${fbLink} page.`, img:'facebook-messenger-agent.jpg' },
    { cat:'n8n', t:'Social Media Content Creator Bot', d:`Creates daily posts with AI captions, hashtags and media across platforms. See live output on the ${fbLink} page.`, img:'social-media-bot.jpg' },
    { cat:'n8n', t:'Automated ASMR Video Generator', d:`Generates AI ASMR videos by combining voice synthesis, visuals and workflow automation. Live on the ${fbLink} page.`, img:'asmr-generator-new.jpg' },
    { cat:'n8n', t:'Knowledge Base & Calendar Booking Chatbot', d:'Answers from a knowledge base and books calendar appointments. Try the chat assistant in the corner of this page.', img:'chatbot-knowledge-base.jpg' },
    { cat:'n8n', t:'WhatsApp AI Support with PostgreSQL & Supabase', d:'AI-powered WhatsApp customer support integrated with PostgreSQL and Supabase for solid data management.', img:'whatsapp-ai-support.jpg', chips:['WhatsApp','PostgreSQL','Supabase'] },
    { cat:'n8n', t:'Automated Contract Generator', d:'Generates customized contracts from AI-powered templates and integrated data workflows.', img:'contract-generator.jpg' },
    { cat:'claude', t:'V.O.L.T. Interactive Electronics Course', d:'A visual electronics learning platform built with Claude Code: 14 modules, 50+ animated circuit simulations and virtual labs. From Ohm\'s law to IC design, hands-on instead of passive video.', img:'volt-course.jpg', url:'https://volt-electronics-course.vercel.app/', chips:['React','Claude Code','Vercel'] },
    { cat:'claude', t:'Cent\'s AI Automation Dashboard', d:'A personal command center built with Claude Code: AI newsletter, earnings tracking, training, health and a live job board in one Next.js workspace, with light and dark modes.', img:'cent-dashboard.jpg', url:'https://cent-dashboard-mu.vercel.app/', chips:['Next.js','Claude Code','Vercel'] },
    { cat:'zapier', t:'Content Repurposing Automation', d:'Turns existing social content into new formats for multiple platforms, saving hours of manual reformatting.', img:'content-repurposing.jpg' },
    { cat:'zapier', t:'CRM Automation', d:'Automates customer data entry and updates across CRM systems for cleaner lead tracking.', img:'crm-automation.jpg' },
    { cat:'zapier', t:'Lead Enrichment Workflow', d:'Enhances raw leads with verified business info from integrated data sources to lift conversion.', img:'lead-enrichment.jpg' },
    { cat:'make', t:'Automated Export of Account Transactions', d:'Extracts transactions from Xero, formats them, and uploads task data to Asana for accounting tracking.', img:'account-transactions.jpg', chips:['Xero','Asana'] },
    { cat:'make', t:'Gmail Attachment Auto-Sorting', d:'Monitors Gmail for attachments, classifies them, and saves each to the right Drive folder automatically.', img:'gmail-sorting.jpg', chips:['Gmail','Google Drive'] },
    { cat:'ghl', t:'Salin Systems CRM Sales Pipeline', d:'Complete 7-stage GoHighLevel CRM for a live agency: n8n intake, ZeroBounce verification, email sequences, booking and Meta leads. <a href="https://salinsystems.com/" target="_blank" rel="noopener">salinsystems.com</a>', loom:'3669b1f479ca42c4bf66880237e2a614', chips:['GoHighLevel','n8n','ZeroBounce'] },
    { cat:'ghl', t:'Lead Generation with Instant Follow-ups', d:'Captures leads and fires instant follow-up sequences through GoHighLevel for maximum conversion.', img:'lead-generation-ghl.jpg' }
  ];
  const label = { n8n:'n8n', claude:'Claude Code', zapier:'Zapier', make:'Make', ghl:'GoHighLevel' };
  const pg = $('#projectsGrid');
  const catOrder = { claude: 0, n8n: 1, ghl: 2, make: 3, zapier: 4 };
  function renderProjects(filter) {
    const list = projects.filter(p => filter === 'all' || p.cat === filter);
    if (filter === 'all') list.sort((a, b) => catOrder[a.cat] - catOrder[b.cat]);
    pg.innerHTML = list.map(p => {
      const media = p.loom
        ? `<div class="project__media"><iframe src="https://www.loom.com/embed/${p.loom}" title="${p.t}" loading="lazy" allowfullscreen></iframe></div>`
        : p.url
          ? `<a class="project__media" href="${p.url}" target="_blank" rel="noopener" aria-label="Visit ${p.t}"><img src="assets/${p.img}" alt="${p.t}" loading="lazy"></a>`
          : `<div class="project__media"><img src="assets/${p.img}" alt="${p.t}" loading="lazy" data-zoom="assets/${p.img}"></div>`;
      const chips = p.chips ? `<div class="project__chips">${p.chips.map(c => `<span>${c}</span>`).join('')}</div>` : '';
      const visit = p.url ? `<a class="project__visit" href="${p.url}" target="_blank" rel="noopener">Visit site <i class="ph ph-arrow-up-right"></i></a>` : '';
      return `<article class="project">
        ${media}
        <div class="project__body">
          <span class="project__tag">${label[p.cat]}</span>
          <h3 class="project__t">${p.t}</h3>
          <p class="project__d">${p.d}</p>
          ${chips}
          ${visit}
        </div>
      </article>`;
    }).join('');
    observeReveals();
    bindZoom();
    if (track) { track.scrollLeft = 0; updateCarousel(); }
  }
  $$('#filters .filter').forEach(btn => btn.addEventListener('click', () => {
    $$('#filters .filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.getAttribute('data-filter'));
  }));

  /* ── build video: lazy-play only when in view, honor reduced motion ── */
  const buildVideo = $('#buildVideo');
  if (buildVideo) {
    if (reduceMotion) {
      buildVideo.removeAttribute('autoplay'); // keep poster frame, no motion
    } else {
      const vObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            if (buildVideo.preload === 'none') buildVideo.preload = 'auto';
            buildVideo.play().catch(() => {});
          } else {
            buildVideo.pause();
          }
        });
      }, { threshold: 0.25 });
      vObserver.observe(buildVideo);
    }
  }

  /* ── featured project: load Loom inline on play ── */
  const featPlay = $('#featPlay');
  if (featPlay) featPlay.addEventListener('click', () => {
    const media = featPlay.parentElement;
    media.innerHTML = '<iframe src="https://www.loom.com/embed/3669b1f479ca42c4bf66880237e2a614?autoplay=1" title="Salin Systems CRM walkthrough" allow="autoplay; fullscreen" allowfullscreen></iframe>';
  });

  /* ── projects carousel: arrows, drag, progress ── */
  const track = pg, prevBtn = $('#projPrev'), nextBtn = $('#projNext'), bar = $('#projBar');
  function updateCarousel() {
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (bar) {
      const prog = max > 0 ? track.scrollLeft / max : 0;
      const wPct = Math.min(100, (track.clientWidth / track.scrollWidth) * 100);
      bar.style.width = wPct + '%';
      bar.style.marginLeft = (prog * (100 - wPct)) + '%';
    }
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= max - 2;
    // focus the card nearest the horizontal center
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = null, bestDist = Infinity;
    track.querySelectorAll('.project').forEach(c => {
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) { bestDist = d; best = c; }
      c.classList.remove('is-active');
    });
    if (best) best.classList.add('is-active');
  }
  function stepCarousel(dir) {
    const card = track.querySelector('.project');
    const w = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * w, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  if (track) {
    prevBtn && prevBtn.addEventListener('click', () => stepCarousel(-1));
    nextBtn && nextBtn.addEventListener('click', () => stepCarousel(1));
    track.addEventListener('scroll', () => requestAnimationFrame(updateCarousel), { passive: true });
    addEventListener('resize', updateCarousel, { passive: true });
    // drag-to-scroll (pointer), with click suppression after a real drag
    let down = false, startX = 0, startScroll = 0, moved = false;
    track.addEventListener('pointerdown', e => {
      if (e.target.closest('iframe') || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('dragging');
    });
    track.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      track.scrollLeft = startScroll - dx;
    });
    const endDrag = () => { if (down) { down = false; track.classList.remove('dragging'); } };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    // arrow keys when carousel hovered/focused
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); stepCarousel(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepCarousel(-1); }
    });
  }

  /* ── lightbox ── */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbClose = $('#lbClose');
  function bindZoom() {
    $$('[data-zoom]').forEach(img => img.addEventListener('click', () => {
      lbImg.src = img.getAttribute('data-zoom'); lbImg.alt = img.alt; lb.classList.add('open');
    }));
  }
  function closeLb() { lb.classList.remove('open'); lbImg.src = ''; }
  lbClose && lbClose.addEventListener('click', closeLb);
  lb && lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

  /* ── contact tools (flat chip cloud) ── */
  const contactTools = ['n8n','Make','Zapier','GoHighLevel','Claude Code','ChatGPT','Supabase','PostgreSQL','HubSpot','Airtable','Notion','Grafana','Slack','WordPress'];
  const tgEl = $('#contactTools');
  if (tgEl) tgEl.innerHTML = contactTools.map(t => `<span>${t}</span>`).join('');

  /* ── FAQ accordion ── */
  $$('#faq .faq__item').forEach(item => {
    const q = $('.faq__q', item), a = $('.faq__a', item);
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      $$('#faq .faq__item').forEach(i => { i.classList.remove('open'); $('.faq__a', i).style.maxHeight = null; });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ── reveal on scroll ── */
  let revealObserver;
  function observeReveals() {
    if (reduceMotion) { $$('.reveal').forEach(el => el.classList.add('in')); return; }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) { setTimeout(() => e.target.classList.add('in'), (i % 6) * 70); revealObserver.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    $$('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
  }

  /* ── stat count-up ── */
  function countUp(el) {
    const target = +el.getAttribute('data-target'), suffix = el.getAttribute('data-suffix') || '';
    const dur = 1300, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { if (!reduceMotion) countUp(e.target); else e.target.textContent = e.target.getAttribute('data-target') + (e.target.getAttribute('data-suffix') || ''); statObserver.unobserve(e.target); } });
  }, { threshold: 0.6 });
  $$('.stat__n[data-target]').forEach(el => statObserver.observe(el));

  /* ── contact form (EmailJS) ── */
  const form = $('#contactForm');
  if (form && window.emailjs) {
    emailjs.init('vQodk4O1jTMRLtbqE');
    const msg = $('#cf-msg'), submit = $('#cf-submit');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submit.disabled = true; submit.innerHTML = 'Sending...';
      msg.className = 'form-msg';
      try {
        await emailjs.send('service_z4soxm6', 'template_n8jto4e', {
          form_name: form.name.value, form_email: form.email.value,
          form_subject: form.subject.value, form_message: form.message.value
        });
        msg.textContent = 'Message sent. Thanks for reaching out, I will get back to you soon.';
        msg.className = 'form-msg ok'; form.reset();
      } catch (err) {
        msg.textContent = 'Something went wrong. Please email centrobles@gmail.com directly.';
        msg.className = 'form-msg err';
      } finally {
        submit.disabled = false; submit.innerHTML = 'Send message <i class="ph ph-paper-plane-tilt"></i>';
      }
    });
  }

  /* ════════ FLOW-FIELD BACKGROUND ════════
     Particles drift along a noise-driven vector field, leaving fading
     curved trails. Navy streams with occasional orange on cream.
     Pauses motion and draws one static frame under reduced motion. */
  const canvas = $('#bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, t = 0, raf, particles = [];
    const NAVY = '11,30,63', ORANGE = '140,31,46';

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(innerWidth * dpr);
      h = canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      const count = Math.round(Math.min(260, (innerWidth * innerHeight) / 7000));
      particles = Array.from({ length: count }, spawn);
      ctx.fillStyle = '#F4F4ED';
      ctx.fillRect(0, 0, w, h);
    }
    function spawn() {
      return {
        x: Math.random() * w, y: Math.random() * h,
        life: 0, max: 120 + Math.random() * 320,
        orange: Math.random() < 0.12,
        speed: (0.5 + Math.random() * 0.9) * dpr
      };
    }
    // smooth swirling vector field (cheap pseudo-curl from layered trig)
    function angle(x, y, time) {
      const nx = x * 0.0016, ny = y * 0.0016;
      const v = Math.sin(nx + time) * Math.cos(ny - time * 0.6)
              + Math.sin((nx - ny) * 1.3 + time * 0.7)
              + Math.cos((nx + ny) * 0.7 - time * 0.4);
      return v * Math.PI;
    }
    function frame(fade) {
      // fade previous trails toward cream for soft streaks
      ctx.fillStyle = 'rgba(244,244,237,' + fade + ')';
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1.15 * dpr;
      ctx.lineCap = 'round';
      for (const p of particles) {
        const a = angle(p.x, p.y, t);
        const px = p.x, py = p.y;
        p.x += Math.cos(a) * p.speed;
        p.y += Math.sin(a) * p.speed;
        p.life++;
        const fadeIn = Math.min(1, p.life / 18) * Math.min(1, (p.max - p.life) / 40);
        const alpha = (p.orange ? 0.20 : 0.13) * Math.max(0, fadeIn);
        ctx.strokeStyle = 'rgba(' + (p.orange ? ORANGE : NAVY) + ',' + alpha.toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        if (p.life > p.max || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          Object.assign(p, spawn());
        }
      }
    }
    function loop() { frame(0.045); t += 0.0016; raf = requestAnimationFrame(loop); }
    function staticDraw() {
      // advance the field a few hundred steps without clearing -> a still flow map
      for (let i = 0; i < 240; i++) { frame(0.02); t += 0.0016; }
    }
    addEventListener('resize', () => { resize(); if (reduceMotion) staticDraw(); }, { passive: true });
    resize();
    if (reduceMotion) staticDraw(); else loop();
  }

  /* init reveals */
  renderProjects('all');
  observeReveals();
})();
