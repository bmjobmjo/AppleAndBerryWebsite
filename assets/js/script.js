/*
 * script.js
 *
 * Adds interactivity to the Apple and Berry Technologies web page.
 * Handles the mobile navigation toggle, dynamic navigation highlighting
 * based on scroll position, reveals elements on scroll, and intercepts
 * the contact form submission with a friendly message. This file is
 * intentionally free of external dependencies – everything is vanilla JS.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  const navItems = document.querySelectorAll('.nav-links a');

  // Toggle navigation menu on mobile
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close menu when a nav link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Highlight current nav item on scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // IntersectionObserver to reveal elements on scroll
  const faders = document.querySelectorAll(
    '.card, .about-text, .about-image'
  );
  const appearOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(el => appearOnScroll.observe(el));

  // Handle contact form submission
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert(
      'Thank you for getting in touch! We will respond as soon as possible.'
    );
    form.reset();
  });
});