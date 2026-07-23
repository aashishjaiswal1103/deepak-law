/* ============================================
   DEEPAK BUNKAR — ADVOCATE
   Luxury Editorial Minimalism Animations & API
   (Anime.js + Resend API Integration)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Animations, Form Handler & Security Protection
  initNavEffects();
  initAnimeAnimations();
  initContactFormAPI();
  initCodeProtection();

  /* ============================================
     1. NAVBAR EFFECTS
     ============================================ */
  function initNavEffects() {
    const headerNav = document.querySelector('.header-nav');
    if (!headerNav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        headerNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        headerNav.style.padding = '14px 0';
      } else {
        headerNav.style.boxShadow = 'none';
        headerNav.style.padding = '22px 0';
      }
    });

    // Smooth scroll for nav anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ============================================
     2. ANIME.JS ANIMATION ENGINE
     ============================================ */
  function initAnimeAnimations() {
    if (typeof anime === 'undefined') return;

    // A. Hero Section Timeline Reveal (Spring & Stagger)
    const heroTl = anime.timeline({
      easing: 'spring(1, 80, 12, 0)',
      duration: 1200
    });

    heroTl
      .add({
        targets: '.header-nav',
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 800
      })
      .add({
        targets: '.hero-col-left .anim-reveal',
        translateY: [35, 0],
        opacity: [0, 1],
        delay: anime.stagger(100)
      }, '-=400')
      .add({
        targets: '.hero-statue-img',
        scale: [0.88, 1],
        opacity: [0, 1],
        duration: 1000
      }, '-=800')
      .add({
        targets: '.hero-col-right .anim-reveal',
        translateX: [40, 0],
        opacity: [0, 1],
        duration: 900
      }, '-=800');

    // B. Continuous Subtle Floating Animation for 3D Visual Objects
    anime({
      targets: '.hero-statue-img',
      translateY: [-10, 10],
      duration: 3200,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    });

    anime({
      targets: '.expertise-books-img',
      translateY: [-8, 8],
      duration: 2800,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    anime({
      targets: '.pencils-bowl-img',
      rotate: [-3, 3],
      translateY: [-6, 6],
      duration: 3500,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    anime({
      targets: '.gavel-img',
      rotate: [-4, 4],
      translateY: [-6, 6],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    // C. Scroll Reveal Observer with Staggering
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target.classList.contains('practice-grid-5')) {
            anime({
              targets: target.querySelectorAll('.practice-card'),
              translateY: [40, 0],
              opacity: [0, 1],
              delay: anime.stagger(120),
              easing: 'easeOutCubic',
              duration: 800
            });
          } else if (target.classList.contains('about-features-grid')) {
            anime({
              targets: target.querySelectorAll('.about-feature-box'),
              translateY: [30, 0],
              opacity: [0, 1],
              delay: anime.stagger(100),
              easing: 'easeOutCubic',
              duration: 700
            });
          } else if (target.classList.contains('expertise-col-right')) {
            anime({
              targets: target.querySelectorAll('.expertise-feature-item'),
              translateX: [30, 0],
              opacity: [0, 1],
              delay: anime.stagger(120),
              easing: 'easeOutCubic',
              duration: 800
            });
          } else {
            anime({
              targets: target,
              translateY: [30, 0],
              opacity: [0, 1],
              easing: 'easeOutCubic',
              duration: 800
            });
          }

          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Observe reveal elements outside hero
    document.querySelectorAll('.section:not(#hero) .anim-reveal, .section:not(#hero) .anim-card, .practice-grid-5, .about-features-grid, .expertise-col-right').forEach(el => {
      revealObserver.observe(el);
    });

    // D. Micro-interactions on buttons & cards
    document.querySelectorAll('.btn-pill').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        anime({
          targets: btn,
          scale: 1.03,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
      btn.addEventListener('mouseleave', () => {
        anime({
          targets: btn,
          scale: 1.0,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  }

  /* ============================================
     3. CONTACT FORM API INTEGRATION (RESEND API)
     ============================================ */
  function initContactFormAPI() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
    const formStatus = document.getElementById('formStatus');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const phoneInput = document.getElementById('formPhone');
      const matterInput = document.getElementById('formMatter');
      const descInput = document.getElementById('formDescription');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const matter = matterInput ? matterInput.value : '';
      const description = descInput ? descInput.value.trim() : '';

      // Reset status
      if (formStatus) {
        formStatus.className = 'form-status-msg';
        formStatus.style.display = 'none';
        formStatus.innerHTML = '';
      }

      // Basic Client-Side Validation
      if (!name || !phone || !matter) {
        showStatus('Please fill in all required fields (Name, Phone, and Matter Type).', 'error');
        return;
      }

      // Loading state
      setSubmittingState(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            matter,
            description
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Success State from Vercel Resend API
          showStatus(`<strong>Thank you, ${escapeHtml(name)}!</strong><br>Your consultation inquiry has been submitted successfully. Advocate Deepak Bunkar will get back to you shortly.`, 'success');
          contactForm.reset();
        } else {
          // Server endpoint returned error (e.g. missing API key)
          const errMsg = data.error || 'Unable to send message via backend API.';
          showStatus(`<strong>Inquiry Received!</strong><br>Thank you, ${escapeHtml(name)}. Redirecting to your mail client to send directly to <strong>dbunkar533@gmail.com</strong>...`, 'success');
          
          setTimeout(() => {
            triggerMailtoFallback(name, phone, matter, description);
          }, 1000);
          contactForm.reset();
        }
      } catch (err) {
        // Network error (occurs when testing locally via file:// or static server without Vercel serverless function endpoint)
        console.warn('Backend API endpoint not available in local preview. Using mailto handler:', err);
        
        showStatus(`<strong>Thank you, ${escapeHtml(name)}!</strong><br>Your consultation inquiry has been recorded. Opening your mail app to send directly to <strong>dbunkar533@gmail.com</strong>...`, 'success');
        
        setTimeout(() => {
          triggerMailtoFallback(name, phone, matter, description);
        }, 1000);
        
        contactForm.reset();
      } finally {
        setSubmittingState(false);
      }
    });

    function triggerMailtoFallback(name, phone, matter, description) {
      const subject = encodeURIComponent(`Consultation Inquiry from ${name} (${matter})`);
      const body = encodeURIComponent(`Client Name: ${name}\nPhone Number: ${phone}\nMatter Type: ${matter}\n\nCase Description:\n${description || 'N/A'}`);
      window.location.href = `mailto:dbunkar533@gmail.com?subject=${subject}&body=${body}`;
    }

    function setSubmittingState(isSubmitting) {
      if (!submitBtn) return;
      submitBtn.disabled = isSubmitting;
      if (isSubmitting) {
        if (btnText) btnText.style.display = 'none';
        if (btnSpinner) btnSpinner.style.display = 'inline-block';
      } else {
        if (btnText) btnText.style.display = 'inline';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    }

    function showStatus(msg, type) {
      if (!formStatus) return;
      formStatus.innerHTML = msg;
      formStatus.className = `form-status-msg ${type}`;
      formStatus.style.display = 'block';

      if (typeof anime !== 'undefined') {
        anime({
          targets: formStatus,
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 500,
          easing: 'easeOutCubic'
        });
      }
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, function (m) {
        return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        }[m];
      });
    }
  }

  /* ============================================
     4. CODE & INSPECTION PROTECTION
     ============================================ */
  function initCodeProtection() {
    // Print Security Warning Banner in DevTools Console
    console.log(
      '%cStop! Security Notice',
      'color: #C8A96E; font-size: 22px; font-weight: bold;'
    );
    console.log(
      '%cThis website and its source code are protected. Unauthorized copying of text, graphics, or code is prohibited.\nAdvocate Deepak Bunkar — All Rights Reserved.',
      'font-size: 12px; color: #666666; font-family: sans-serif;'
    );

    // Disable Right-Click Context Menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable DevTools & View Source Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.keyCode === 123 || e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 73 || e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 74 || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+C / Cmd+Option+C (Element Selector)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 67 || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U / Cmd+Option+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 85 || e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 83 || e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    });

    // Prevent Image Dragging
    document.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
  }

});
