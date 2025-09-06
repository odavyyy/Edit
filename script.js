// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Alternar menu hamburguer em telas pequenas
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

  // Hover suave nos botões
  const buttons = document.querySelectorAll('.cta-btn, .learn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('hovered');
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('hovered');
    });
  });

  // --- LÓGICA DO PLAYER DE VÍDEO BÔNUS ---
  const player = document.getElementById('bonus-video-player');

  if (player) {
    const video = player.querySelector('.preview-video');
    const playPauseBtn = player.querySelector('.play-pause-btn i');
    const progressBar = player.querySelector('.progress-bar');
    const timeDisplay = player.querySelector('.time-display');
    const muteBtn = player.querySelector('.mute-btn i');
    const volumeSlider = player.querySelector('.volume-slider');

    // Função Play/Pause
    function togglePlay() {
      if (video.paused) {
        video.play();
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
      } else {
        video.pause();
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
      }
    }

    // Função para formatar o tempo (ex: 65s -> 01:05)
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Atualizar barra de progresso e tempo
    function updateProgress() {
      progressBar.value = (video.currentTime / video.duration) * 100;
      timeDisplay.textContent = formatTime(video.currentTime);
      
      // Atualiza o preenchimento da barra de progresso
      const progressPercent = progressBar.value;
      progressBar.style.background = `linear-gradient(to right, var(--cor-destaque) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`;
    }
    
    // Buscar posição na barra de progresso
    function setProgress() {
      video.currentTime = (progressBar.value / 100) * video.duration;
    }
    
    // Controle de volume
    function handleVolume() {
        video.volume = volumeSlider.value;
        video.muted = volumeSlider.value === 0;

        // Atualiza o ícone
        if (video.muted || video.volume === 0) {
            muteBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
        } else {
            muteBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
        }

        // Atualiza o preenchimento da barra de volume
        const volumePercent = volumeSlider.value * 100;
        volumeSlider.style.background = `linear-gradient(to right, var(--cor-destaque) ${volumePercent}%, rgba(255,255,255,0.2) ${volumePercent}%)`;
    }

    // Mutar/Desmutar
    function toggleMute() {
        video.muted = !video.muted;
        if(video.muted) {
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = video.volume > 0 ? video.volume : 0.5;
        }
        handleVolume();
    }

    // Carregar metadados do vídeo (duração)
    function loadVideoData() {
        timeDisplay.textContent = formatTime(video.duration);
        handleVolume(); // Inicia a barra de volume com a cor certa
    }

    // Event Listeners
    playPauseBtn.parentElement.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', loadVideoData);
    progressBar.addEventListener('input', setProgress);
    volumeSlider.addEventListener('input', handleVolume);
    muteBtn.parentElement.addEventListener('click', toggleMute);
  }
});

// Mostra o popup toda vez que abrir o site
window.onload = function() {
    setTimeout(() => {
        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'flex';
        }
    }, 2500); // aparece depois de 2,5 segundos
}

// Fecha o popup
function fecharPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}
