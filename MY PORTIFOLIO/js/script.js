/**
 * ===================================================================
 * MUGENYI SHAFIK - PORTFOLIO INTERACTIVITY SCRIPT
 * Typewriter, Theme Switching, Modal Demos, Form Validation,
 * Mobile Menu, Toast Alerts & Smooth Interactions
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Set Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------------
  // 3. THEME TOGGLE (DARK / LIGHT MODE)
  // -----------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or use dark mode default
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
      
      // Refresh icons if needed
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  // -----------------------------------------------------------------
  // 4. MOBILE NAVIGATION DRAWER
  // -----------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-links .btn');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // -----------------------------------------------------------------
  // 5. HERO TYPEWRITER ANIMATION
  // -----------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const words = [
      'clean HTML, CSS & JavaScript.',
      'responsive & intuitive web UI.',
      'modern Python & automation scripts.',
      'scalable apps with Node.js & React.'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDelay = 1800;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = 400;
      }

      setTimeout(typeEffect, timeout);
    }

    typeEffect();
  }

  // -----------------------------------------------------------------
  // 6. ACTIVE NAVIGATION LINK ON SCROLL
  // -----------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // -----------------------------------------------------------------
  // 7. BACK TO TOP BUTTON
  // -----------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -----------------------------------------------------------------
  // 8. COPY TO CLIPBOARD FUNCTIONALITY
  // -----------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            showToast(`Copied "${textToCopy}" to clipboard!`);
          })
          .catch(() => {
            fallbackCopy(textToCopy);
          });
      } else if (textToCopy) {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied "${text}" to clipboard!`);
  }

  // -----------------------------------------------------------------
  // 9. TOAST NOTIFICATION SYSTEM
  // -----------------------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // -----------------------------------------------------------------
  // 10. INTERACTIVE PROJECT DEMO MODALS
  // -----------------------------------------------------------------
  const demoModal = document.getElementById('demo-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const projectDemoButtons = document.querySelectorAll('.project-link');

  function openModal(title, content) {
    if (!demoModal || !modalBody || !modalTitle) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    demoModal.classList.add('active');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function closeModal() {
    if (!demoModal) return;
    demoModal.classList.remove('active');
    demoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && demoModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach click handlers to project demo links
  projectDemoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectType = btn.getAttribute('data-project');

      if (projectType === 'task-tracker') {
        openTaskTrackerDemo();
      } else if (projectType === 'weather-dashboard') {
        openWeatherDemo();
      }
    });
  });

  // Demo 1: Interactive Task Tracker (Vanilla JS in Modal)
  function openTaskTrackerDemo() {
    const htmlContent = `
      <div class="demo-task-app">
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Try Mugenyi Shafik's vanilla JavaScript task manager right now! Add tasks, mark them complete, or remove them.
        </p>
        <div class="demo-input-row">
          <input type="text" id="demo-new-task" class="demo-input" placeholder="Enter a new task (e.g. Study React hooks)..." />
          <button class="btn btn-primary btn-sm" id="demo-add-task-btn">Add Task</button>
        </div>
        <div class="demo-list" id="demo-task-list">
          <div class="demo-item">
            <span>Learn HTML & CSS Basics</span>
            <span style="color: var(--accent-emerald); font-size: 0.8rem; font-weight: 700;">Completed ✓</span>
          </div>
          <div class="demo-item">
            <span>Master JavaScript DOM & Events</span>
            <span style="color: var(--accent-emerald); font-size: 0.8rem; font-weight: 700;">Completed ✓</span>
          </div>
          <div class="demo-item">
            <span>Build Python Automation Scripts</span>
            <button class="demo-del-btn" onclick="this.parentElement.remove()">Delete</button>
          </div>
        </div>
      </div>
    `;

    openModal('Interactive Task Tracker (Live Demo)', htmlContent);

    // Setup events inside modal
    setTimeout(() => {
      const addBtn = document.getElementById('demo-add-task-btn');
      const input = document.getElementById('demo-new-task');
      const list = document.getElementById('demo-task-list');

      function addTask() {
        const text = input.value.trim();
        if (!text) return;

        const item = document.createElement('div');
        item.className = 'demo-item';
        item.innerHTML = `
          <span>${escapeHtml(text)}</span>
          <button class="demo-del-btn" style="color: #ef4444; font-size: 0.8rem; padding: 0.2rem 0.5rem; background: none; border: none; cursor: pointer;">Delete</button>
        `;

        item.querySelector('.demo-del-btn').addEventListener('click', () => {
          item.remove();
        });

        item.addEventListener('click', (e) => {
          if (e.target.tagName.toLowerCase() !== 'button') {
            item.classList.toggle('done');
          }
        });

        list.prepend(item);
        input.value = '';
        input.focus();
      }

      if (addBtn && input) {
        addBtn.addEventListener('click', addTask);
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') addTask();
        });
      }
    }, 50);
  }

  // Demo 2: Interactive Weather Dashboard Simulation
  function openWeatherDemo() {
    const htmlContent = `
      <div class="demo-weather-app">
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Simulated asynchronous API weather lookup demonstrating JavaScript fetch logic and dynamic UI responses.
        </p>
        <div class="demo-input-row">
          <input type="text" id="demo-city-input" class="demo-input" placeholder="Type a city: Kampala, Nairobi, London, Tokyo..." value="Kampala" />
          <button class="btn btn-primary btn-sm" id="demo-weather-search-btn">Check Weather</button>
        </div>
        <div id="demo-weather-result" style="background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); text-align: center;">
          <h4 style="font-size: 1.4rem; margin-bottom: 0.35rem;">Kampala, Uganda</h4>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-cyan); margin: 0.5rem 0;">26°C</div>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">Partly Cloudy • Humidity: 65% • Wind: 11 km/h</p>
        </div>
      </div>
    `;

    openModal('Live Weather Dashboard (Demo)', htmlContent);

    setTimeout(() => {
      const searchBtn = document.getElementById('demo-weather-search-btn');
      const cityInput = document.getElementById('demo-city-input');
      const resultDiv = document.getElementById('demo-weather-result');

      const mockData = {
        'kampala': { temp: '26°C', condition: 'Sunny & Warm', hum: '62%', wind: '9 km/h' },
        'nairobi': { temp: '22°C', condition: 'Mild & Breezy', hum: '58%', wind: '14 km/h' },
        'london': { temp: '15°C', condition: 'Overcast & Light Drizzle', hum: '81%', wind: '20 km/h' },
        'tokyo': { temp: '19°C', condition: 'Clear Skies', hum: '50%', wind: '12 km/h' },
        'new york': { temp: '18°C', condition: 'Partly Sunny', hum: '55%', wind: '16 km/h' },
      };

      function updateWeather() {
        const query = cityInput.value.trim().toLowerCase();
        resultDiv.innerHTML = `<p style="color: var(--accent-primary);">Fetching live meteorological data for "${escapeHtml(cityInput.value)}"...</p>`;

        setTimeout(() => {
          const match = mockData[query] || {
            temp: `${Math.floor(Math.random() * 15) + 18}°C`,
            condition: 'Clear & Pleasant',
            hum: `${Math.floor(Math.random() * 30) + 50}%`,
            wind: `${Math.floor(Math.random() * 15) + 5} km/h`
          };

          const formattedCity = cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);

          resultDiv.innerHTML = `
            <h4 style="font-size: 1.4rem; margin-bottom: 0.35rem;">${escapeHtml(formattedCity)}</h4>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-cyan); margin: 0.5rem 0;">${match.temp}</div>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">${match.condition} • Humidity: ${match.hum} • Wind: ${match.wind}</p>
          `;
        }, 400);
      }

      if (searchBtn && cityInput) {
        searchBtn.addEventListener('click', updateWeather);
        cityInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') updateWeather();
        });
      }
    }, 50);
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }

  // -----------------------------------------------------------------
  // 11. CONTACT FORM VALIDATION & SUBMISSION
  // -----------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameGroup = nameInput.closest('.form-group');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = emailInput.closest('.form-group');
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = messageInput.closest('.form-group');
      if (!messageInput.value.trim()) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // Simulate sending
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span><i data-lucide="send"></i>`;
        
        formStatus.textContent = "Thank you, your message has been sent successfully! Shafik will reply soon.";
        formStatus.classList.add('success');
        showToast("Message sent successfully!");
        
        contactForm.reset();

        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 6000);
      }, 1200);
    });

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group && group.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      }
    });
  }

  // -----------------------------------------------------------------
  // 12. HERO CODE RUNNER INTERACTIVITY
  // -----------------------------------------------------------------
  const runCodeBtn = document.getElementById('run-code-btn');
  const consoleMsg = document.getElementById('console-msg');

  if (runCodeBtn && consoleMsg) {
    runCodeBtn.addEventListener('click', () => {
      consoleMsg.textContent = "Executing developer.hireShafik()...";
      consoleMsg.classList.remove('active-output');

      setTimeout(() => {
        consoleMsg.textContent = '"Dedicated engineer ready to bring value to your team!"';
        consoleMsg.classList.add('active-output');
        showToast("Code executed successfully in browser!");
      }, 350);
    });
  }

  // -----------------------------------------------------------------
  // 13. PROJECT CATEGORY FILTERING
  // -----------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });

        // Re-initialize icons inside cards if needed
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    });
  }
});
