// Import CSS
import '../css/main.css';

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  // Detect iOS devices and apply appropriate class for background attachment
  function detectIOSDevice() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod|macintosh/.test(userAgent) && 'ontouchend' in document;
    
    if (iOS) {
      document.body.classList.add('ios-device');
    }
  }
  
  // Run iOS detection
  detectIOSDevice();
  
  // Mobile menu toggle
  document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu?.classList.toggle('hidden');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
      document.getElementById('mobile-menu')?.classList.add('hidden');
    });
  });
  
  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const arrow = this.querySelector('.faq-arrow');
      
      answer?.classList.toggle('hidden');
      arrow?.classList.toggle('rotate-180');
    });
  });
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header?.classList.add('py-2', 'shadow-md');
      header?.classList.remove('py-3');
    } else {
      header?.classList.add('py-3');
      header?.classList.remove('py-2', 'shadow-md');
    }
  });
});