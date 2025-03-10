// Import CSS
import '../css/main.css';

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
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
  
  // Apply language-specific elements based on current language
  function applyLanguageSpecificElements(lang) {
    // Show/hide elements based on language
    document.querySelectorAll('[data-lang-specific]').forEach(el => {
      const specificLangs = el.dataset.langSpecific.split(' ');
      if (specificLangs.includes(lang)) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }
  
  // Language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      
      // Update active language button
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.remove('lang-active');
      });
      this.classList.add('lang-active');
      
      // Set language in localStorage
      localStorage.setItem('website-language', lang);
      
      // Update content
      updateLanguage(lang);
      
      // Apply language-specific elements
      applyLanguageSpecificElements(lang);
      
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    });
  });
  
  // Language switcher functionality
  function updateLanguage(lang) {
    // Get language resources
    const langResources = document.querySelector(`#lang-${lang}`);
    if (!langResources) return;
    
    // Update all elements with data-lang-key attribute
    document.querySelectorAll('[data-lang-key]').forEach(element => {
      const key = element.getAttribute('data-lang-key');
      const translation = langResources.querySelector(`[data-key="${key}"]`);
      
      if (translation) {
        element.innerHTML = translation.innerHTML;
      }
    });
  }
  
  // Set initial language from localStorage or default to Russian
  const savedLang = localStorage.getItem('website-language') || 'ru';
  
  // Set active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('lang-active');
    if (btn.getAttribute('data-lang') === savedLang) {
      btn.classList.add('lang-active');
    }
  });
  
  // Update content
  updateLanguage(savedLang);
  
  // Apply language-specific elements for initial language
  applyLanguageSpecificElements(savedLang);
  
  // Update HTML lang attribute
  document.documentElement.lang = savedLang;
});