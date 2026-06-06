/* ============================================
   RITIK JAYASWAL — ANIMATION ENGINE
   GSAP + ScrollTrigger + Custom Cursor
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Inject content from content.js first
  injectContent();

  // Wait for GSAP to load
  const initInterval = setInterval(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      clearInterval(initInterval);
      gsap.registerPlugin(ScrollTrigger);
      initAll();
    }
  }, 50);

  function initAll() {
    initCustomCursor();
    initGridOverlay();
    initPageLoadSequence();
    initScrollAnimations();
    initNavigation();
    initFormHandling();
    initMobileNav();
    initSmoothScroll();
    initFaqAccordion();
  }

  /* ============================================
     CUSTOM CURSOR (Desktop Only)
     ============================================ */
  function initCustomCursor() {
    if (window.innerWidth < 768) return;

    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Outline follows with slight lag
    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover state for interactive elements
    const hoverElements = document.querySelectorAll('[data-hover]');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hovering');
        outline.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hovering');
        outline.classList.remove('hovering');
      });
    });
  }

  /* ============================================
     BLUEPRINT GRID OVERLAY
     ============================================ */
  function initGridOverlay() {
    if (window.innerWidth < 768) return;

    const hLines = document.getElementById('hLines');
    const vLines = document.getElementById('vLines');
    if (!hLines || !vLines) return;

    const spacing = 64;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Create horizontal lines
    const hCount = Math.ceil(vh / spacing) + 1;
    for (let i = 0; i < hCount; i++) {
      const line = document.createElement('div');
      line.className = 'h-line';
      line.style.top = (i * spacing) + 'px';
      hLines.appendChild(line);
    }

    // Create vertical lines
    const vCount = Math.ceil(vw / spacing) + 1;
    for (let i = 0; i < vCount; i++) {
      const line = document.createElement('div');
      line.className = 'v-line';
      line.style.left = (i * spacing) + 'px';
      vLines.appendChild(line);
    }
  }

  /* ============================================
     PAGE LOAD SEQUENCE
     ============================================ */
  function initPageLoadSequence() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 0.0s — Grid lines draw in
    if (window.innerWidth >= 768) {
      tl.to('.h-line', {
        width: '100%',
        duration: 1.2,
        stagger: 0.03,
        ease: 'power2.out'
      }, 0);

      tl.to('.v-line', {
        height: '100vh',
        duration: 1.2,
        stagger: 0.03,
        ease: 'power2.out'
      }, 0.3);
    }

    // 0.8s — Background fade
    tl.to('body', {
      backgroundColor: '#0A0A0A',
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0.8);

    // 1.0s — Hero label letter-by-letter
    const heroLabel = document.getElementById('heroLabel');
    if (heroLabel) {
      const text = heroLabel.textContent;
      heroLabel.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        if (char === ' ') span.style.width = '0.3em';
        heroLabel.appendChild(span);
      });

      tl.to(heroLabel, { opacity: 1, duration: 0.01 }, 1.0);
      tl.to(heroLabel.children, {
        opacity: 1,
        duration: 0.04,
        stagger: 0.04,
        ease: 'none'
      }, 1.0);
    }

    // 1.4s — Hero name clip mask reveal
    tl.to('#heroName span', {
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, 1.4);

    // 1.8s — Gold rule draws in
    tl.to('#heroGoldRule', {
      width: '100%',
      duration: 0.6,
      ease: 'power2.out'
    }, 1.8);

    // 2.2s — Tagline fade in
    tl.to('#heroTagline', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, 2.2);

    // 2.6s — CTA buttons
    tl.to('#heroCtas', {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 2.6);

    // 3.0s — Portrait
    tl.to('#heroPortrait', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 3.0);

    // Set initial portrait y
    gsap.set('#heroPortrait', { y: 20 });

    // 3.2s — Scroll indicator
    tl.to('#scrollIndicator', {
      opacity: 1,
      duration: 0.4
    }, 3.2);
  }

  /* ============================================
     SCROLL ANIMATIONS
     ============================================ */
  function initScrollAnimations() {
    const isMobile = window.innerWidth < 768;

    // --- Section Labels: letter-by-letter stagger ---
    document.querySelectorAll('[data-anim="label"]').forEach(label => {
      const text = label.textContent;
      label.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        if (char === ' ') span.style.width = '0.3em';
        label.appendChild(span);
      });

      ScrollTrigger.create({
        trigger: label,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          if (isMobile) {
            gsap.to(label.children, { opacity: 1, duration: 0.4 });
          } else {
            gsap.to(label.children, {
              opacity: 1,
              duration: 0.03,
              stagger: 0.03,
              ease: 'none'
            });
          }
        }
      });
    });

    // --- Section Titles: clip mask reveal ---
    document.querySelectorAll('[data-anim="title"]').forEach(title => {
      gsap.set(title, { clipPath: 'inset(100% 0 0 0)', opacity: 0 });

      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(title, {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out'
          });
        }
      });
    });

    // --- Cards: fade up with stagger ---
    document.querySelectorAll('[data-anim="card"]').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: (i % 3) * 0.1,
            ease: 'power2.out'
          });
        }
      });
    });

    // --- Gold margin rules ---
    document.querySelectorAll('[data-anim="gold-rule"]').forEach(rule => {
      ScrollTrigger.create({
        trigger: rule.parentElement,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(rule, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    });

    // --- Statement Quote ---
    const statementQuote = document.getElementById('statementQuote');
    if (statementQuote) {
      ScrollTrigger.create({
        trigger: statementQuote,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(statementQuote, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
          gsap.to('#statementRule', {
            width: 80,
            duration: 0.6,
            delay: 0.4,
            ease: 'power2.out'
          });
          gsap.to('#statementAttrib', {
            opacity: 1,
            duration: 0.4,
            delay: 0.6,
            ease: 'power2.out'
          });
        }
      });
    }

    // --- Philosophy blocks: sequential fade ---
    document.querySelectorAll('[data-anim="philosophy"]').forEach((block, i) => {
      ScrollTrigger.create({
        trigger: block,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(block, {
            opacity: 1,
            duration: 0.6,
            delay: i * 0.4,
            ease: 'power2.out'
          });
        }
      });
    });

    // --- Philosophy left rule ---
    document.querySelectorAll('[data-anim="gold-rule-v"]').forEach(rule => {
      ScrollTrigger.create({
        trigger: rule.parentElement,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(rule, {
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out'
          });
        }
      });
    });

    // --- Gold rule lines in sections (draw width) ---
    // Already handled by gold-rule animation above
  }

  /* ============================================
     NAVIGATION
     ============================================ */
  function initNavigation() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScrollY = scrollY;
    }, { passive: true });
  }

  /* ============================================
     FORM HANDLING
     ============================================ */
  function initFormHandling() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmit');
    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate required fields
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const matter = document.getElementById('formMatter').value;
      const description = document.getElementById('formDescription').value.trim();

      if (!name || !phone || !matter) return;

      // Update button state to sending
      const originalText = submitBtn.querySelector('span').textContent;
      submitBtn.querySelector('span').textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone, matter, description }),
        });

        if (response.ok) {
          // Success animation
          submitBtn.classList.add('sent');
          submitBtn.querySelector('span').textContent = 'Message Sent ✓';
          form.reset();
        } else {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to send message');
        }
      } catch (err) {
        console.error('Error submitting form:', err);
        submitBtn.querySelector('span').textContent = 'Error. Try Again';
      } finally {
        submitBtn.disabled = false;
        // Reset button state
        setTimeout(() => {
          submitBtn.classList.remove('sent');
          submitBtn.querySelector('span').textContent = originalText;
        }, 3000);
      }
    });
  }

  /* ============================================
     MOBILE NAV
     ============================================ */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const overlay = document.getElementById('mobileNav');
    const close = document.getElementById('mobileNavClose');
    if (!toggle || !overlay || !close) return;

    toggle.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close on link click
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================
     SMOOTH SCROLL
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = 80; // Account for fixed nav
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');
      if (!trigger || !content) return;
      
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  /* ============================================
     DYNAMIC CONTENT INJECTION
     ============================================ */
  function injectContent() {
    if (typeof SITE_CONTENT === 'undefined') return;

    // Hero Section
    const heroLabel = document.getElementById('heroLabel');
    if (heroLabel) heroLabel.innerHTML = SITE_CONTENT.hero.label;

    const heroName = document.getElementById('heroName');
    if (heroName) {
      heroName.innerHTML = `<span>${SITE_CONTENT.hero.nameFirst}</span><span>${SITE_CONTENT.hero.nameLast}</span>`;
    }

    const heroTagline = document.getElementById('heroTagline');
    if (heroTagline) heroTagline.innerHTML = SITE_CONTENT.hero.tagline;

    const heroCtas = document.getElementById('heroCtas');
    if (heroCtas) {
      heroCtas.innerHTML = `
        <a href="#contact" class="btn btn-primary" data-hover><span>${SITE_CONTENT.hero.ctaPrimary}</span></a>
        <a href="#practice" class="btn btn-ghost" data-hover><span>${SITE_CONTENT.hero.ctaSecondary}</span></a>
      `;
    }

    // Overview Section
    const overviewSection = document.getElementById('overview');
    if (overviewSection) {
      const label = overviewSection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.overview.label;

      const title = overviewSection.querySelector('[data-anim="title"]');
      if (title) title.innerHTML = SITE_CONTENT.overview.title;

      const def = overviewSection.querySelector('.profile-definition');
      if (def) def.innerHTML = SITE_CONTENT.overview.definition;

      const highlight = overviewSection.querySelector('.profile-philosophy-highlight');
      if (highlight) highlight.innerHTML = SITE_CONTENT.overview.highlight;

      const sidebarTitle = overviewSection.querySelector('.sidebar-title');
      if (sidebarTitle) sidebarTitle.innerHTML = SITE_CONTENT.overview.sidebarTitle;

      const credentialsList = overviewSection.querySelector('.credentials-list');
      if (credentialsList) {
        credentialsList.innerHTML = SITE_CONTENT.overview.credentials.map(c => `
          <li>
            <span class="cred-label">${c.label}</span>
            <span class="cred-val">${c.val}</span>
          </li>
        `).join('');
      }
    }

    // Statement Section
    const statementQuote = document.getElementById('statementQuote');
    if (statementQuote) statementQuote.innerHTML = SITE_CONTENT.statement.quote;

    const statementAttrib = document.getElementById('statementAttrib');
    if (statementAttrib) statementAttrib.innerHTML = SITE_CONTENT.statement.attribution;

    // Practice Section
    const practiceSection = document.getElementById('practice');
    if (practiceSection) {
      const label = practiceSection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.practice.label;

      const title = practiceSection.querySelector('[data-anim="title"]');
      if (title) title.innerHTML = SITE_CONTENT.practice.title;

      const grid = practiceSection.querySelector('.practice-grid');
      if (grid) {
        grid.innerHTML = SITE_CONTENT.practice.cards.map(card => `
          <div class="practice-card" data-anim="card" data-hover>
            <span class="practice-card-numeral">${card.numeral}</span>
            <h3 class="practice-card-title">${card.title}</h3>
            <p class="practice-card-desc">${card.desc}</p>
          </div>
        `).join('');
      }
    }

    // Approach Section
    const approachSection = document.getElementById('approach');
    if (approachSection) {
      const label = approachSection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.approach.label;

      const title = approachSection.querySelector('[data-anim="title"]');
      if (title) title.innerHTML = SITE_CONTENT.approach.title;

      const grid = approachSection.querySelector('.approach-grid');
      if (grid) {
        grid.innerHTML = SITE_CONTENT.approach.cards.map(card => `
          <div class="approach-card" data-anim="card" data-hover>
            <h3 class="approach-card-title">${card.title}</h3>
            <p class="approach-card-quote">${card.quote}</p>
            <p class="approach-card-desc">${card.desc}</p>
          </div>
        `).join('');
      }
    }

    // Philosophy Section
    const philosophySection = document.getElementById('philosophy');
    if (philosophySection) {
      const label = philosophySection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.philosophy.label;

      const title = philosophySection.querySelector('[data-anim="title"]');
      if (title) title.innerHTML = SITE_CONTENT.philosophy.title;

      const content = philosophySection.querySelector('.philosophy-content');
      if (content) {
        content.innerHTML = `
          <div class="philosophy-left-rule" data-anim="gold-rule-v"></div>
          ${SITE_CONTENT.philosophy.blocks.map(b => `
            <div class="philosophy-block" data-anim="philosophy">
              <span class="philosophy-marker">${b.marker}</span>
              <h3 class="philosophy-subtitle">${b.title}</h3>
              <p class="philosophy-text">${b.text}</p>
            </div>
          `).join('')}
        `;
      }
    }

    // About Section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const label = aboutSection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.about.label;

      const title = aboutSection.querySelector('.section-title');
      if (title) title.innerHTML = SITE_CONTENT.about.title;

      const sub = aboutSection.querySelector('.about-right-sub');
      if (sub) sub.innerHTML = SITE_CONTENT.about.sub;

      const right = aboutSection.querySelector('.about-right');
      if (right) {
        const labels = right.querySelector('.about-right-label');
        if (labels) labels.innerHTML = SITE_CONTENT.about.label;

        const name = right.querySelector('.about-right-name');
        if (name) name.innerHTML = SITE_CONTENT.about.title;

        // Clear existing paragraphs and insert new ones
        const paragraphs = right.querySelectorAll('.about-text');
        paragraphs.forEach(p => p.remove());

        const closing = right.querySelector('.about-closing');
        if (closing) closing.innerHTML = SITE_CONTENT.about.closing;

        // Insert new paragraphs before the closing phrase
        SITE_CONTENT.about.texts.forEach(text => {
          const p = document.createElement('p');
          p.className = 'about-text';
          p.innerHTML = text;
          right.insertBefore(p, closing);
        });
      }

      const detailsList = aboutSection.querySelector('.about-details');
      if (detailsList) {
        detailsList.innerHTML = SITE_CONTENT.about.details.map(d => `
          <div class="about-detail-row">
            <span class="about-detail-label">${d.label}</span>
            <span class="about-detail-value">${d.val}</span>
          </div>
        `).join('');
      }
    }

    // Testimonials Section
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      const label = testimonialsSection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.testimonials.label;

      const title = testimonialsSection.querySelector('[data-anim="title"]');
      if (title) title.innerHTML = SITE_CONTENT.testimonials.title;

      const grid = testimonialsSection.querySelector('.testimonials-grid');
      if (grid) {
        grid.innerHTML = SITE_CONTENT.testimonials.cards.map(card => `
          <div class="testimonial-card" data-anim="card" data-hover>
            <div class="testimonial-card-quote-mark">"</div>
            <p class="testimonial-card-text">${card.quote}</p>
            <div class="testimonial-card-attribution">${card.attribution}</div>
            ${card.rating ? `<div class="testimonial-card-stars">${card.rating}</div>` : ''}
          </div>
        `).join('');
      }
    }

    // FAQ Section
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      const label = faqSection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.faq.label;

      const title = faqSection.querySelector('[data-anim="title"]');
      if (title) title.innerHTML = SITE_CONTENT.faq.title;

      const container = faqSection.querySelector('.faq-accordion-container');
      if (container) {
        container.innerHTML = SITE_CONTENT.faq.items.map(item => `
          <div class="faq-item" data-anim="card" data-hover>
            <button class="faq-trigger" aria-expanded="false">
              <span>${item.question}</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-content">
              <p>${item.answer}</p>
            </div>
          </div>
        `).join('');
      }
    }

    // Contact Section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const label = contactSection.querySelector('[data-anim="label"]');
      if (label) label.innerHTML = SITE_CONTENT.contact.label;

      const title = contactSection.querySelector('[data-anim="title"]');
      if (title) title.innerHTML = SITE_CONTENT.contact.title;

      const tagline = contactSection.querySelector('.contact-tagline');
      if (tagline) tagline.innerHTML = SITE_CONTENT.contact.tagline;

      const details = contactSection.querySelector('.contact-details');
      if (details) {
        details.innerHTML = SITE_CONTENT.contact.details.map(d => `
          <div class="contact-detail">
            <div class="contact-detail-icon"></div>
            <div class="contact-detail-content">
              <span class="contact-detail-label">${d.label}</span>
              <span class="contact-detail-value">${d.val}</span>
            </div>
          </div>
        `).join('');
      }
    }
  }

});
