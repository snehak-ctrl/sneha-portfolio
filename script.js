/**
 * Sneha Kattimani - Personal Portfolio Website Script
 * Interactive features:
 * - Active navigation while scrolling
 * - Navbar shadow on scroll
 * - Scroll reveal animations
 * - Smooth navigation
 * - Dynamic footer year
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const revealElements = document.querySelectorAll(
    '.hero-content, .about-content, .journey-card, .project-card, .skill, .career-content, .contact-card'
  );

  // 1. Active Navigation Link on Scroll
  function updateActiveNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');

          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // 2. Navbar Shadow on Scroll
    if (navbar) {
      navbar.style.boxShadow =
        scrollY > 40
          ? '0 8px 25px rgba(0, 0, 0, 0.12)'
          : '0 1px 4px rgba(0, 0, 0, 0.05)';
    }
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // 3. Add Active Navigation and Reveal Styles
  const style = document.createElement('style');

  style.textContent = `
    nav a.active {
      color: #2563eb !important;
      font-weight: 700;
    }

    .reveal-ready {
      opacity: 0;
      transform: translateY(25px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .reveal-ready.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  document.head.appendChild(style);

  // 4. Scroll Reveal Animation
  revealElements.forEach(element => {
    element.classList.add('reveal-ready');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add('revealed');
    });
  }

  // 5. Smooth Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 6. Secure External GitHub Links
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // 7. Update Footer Year Automatically
  const footer = document.querySelector('footer');

  if (footer) {
    footer.innerHTML =
      `© ${new Date().getFullYear()} <strong>Sneha Kattimani</strong> | B.Tech CSIT Student`;
  }
});
