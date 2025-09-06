// script.js

// Alternar menu hamburguer em telas pequenas
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

  // Animações de entrada (reveal)
  const reveals = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // executar uma vez ao carregar

  // Hover suave nos botões (efeito ripple)
  const buttons = document.querySelectorAll('.cta-btn, .learn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('hovered');
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('hovered');
    });
  });
});

// Mostra o popup toda vez que abrir o site
window.onload = function() {
    setTimeout(() => {
        document.getElementById('popup').style.display = 'flex';
    }, 2500); // aparece depois de 2,5 segundos
}

// Fecha o popup
function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
}
