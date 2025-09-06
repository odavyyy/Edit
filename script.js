// Espera todo o HTML ser carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DO MENU HAMBURGUER ---
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

  // --- LÓGICA DO POPUP ---
  const bonusBtn = document.getElementById('bonusBtn');
  const popup = document.getElementById('popup');
  const closePopupBtn = document.getElementById('closePopupBtn');

  // Garante que os 3 elementos existem antes de adicionar os eventos
  if (bonusBtn && popup && closePopupBtn) {
    
    // 1. Abrir o popup ao clicar no botão da aula grátis
    bonusBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
    });

    // 2. Fechar o popup ao clicar no botão "Fechar"
    closePopupBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    // 3. (Opcional) Fechar o popup ao clicar fora dele
    popup.addEventListener('click', (event) => {
      // Verifica se o clique foi no fundo escuro (no próprio popup) e não nos filhos dele
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
  }

  // --- LÓGICA DO FAQ (ACCORDION) ---
  const faqItems = document.querySelectorAll('.faq-pergunta');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      // Fecha todos os outros itens para manter apenas um aberto
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.nextElementSibling.style.maxHeight = null;
        }
      });
      
      // Alterna o item clicado
      item.classList.toggle('active');
      const resposta = item.nextElementSibling;
      if (resposta.style.maxHeight) {
        resposta.style.maxHeight = null;
      } else {
        resposta.style.maxHeight = resposta.scrollHeight + "px";
      }
    });
  });

});