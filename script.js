// Modern Mage Portfolio - Subtle Interactive Magic
// Amber Cruse / Mez

// ========================================
// ANIMATED MAGIC BACKGROUND
// ========================================
function initMagicBackground() {
  const orbsContainer = document.getElementById('orbsContainer');
  const starsContainer = document.getElementById('starsContainer');
  
  // Generate floating orbs
  const orbCount = 5;
  for (let i = 0; i < orbCount; i++) {
    const orb = document.createElement('div');
    orb.className = 'floating-orb';
    
    const size = Math.random() * 400 + 200;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    // Alternate between purple and pink
    const color = i % 2 === 0 
      ? 'radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)'
      : 'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)';
    
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${left}%`;
    orb.style.top = `${top}%`;
    orb.style.background = color;
    orb.style.animationDuration = `${duration}s`;
    orb.style.animationDelay = `${delay}s`;
    
    orbsContainer.appendChild(orb);
  }
  
  // Generate twinkling stars
  const starCount = 50;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'particle-star';
    
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;
    
    starsContainer.appendChild(star);
  }
}

// Initialize background on load
initMagicBackground();

// ========================================
// FORTUNE TELLING CRYSTAL BALL
// ========================================
const fortunes = [
  "I see... a need for better UX in your future. ✨",
  "The spirits say... your website needs more personality. 🔮",
  "I foresee... a collaboration between us. 💫",
  "The crystal reveals... your users crave intuitive design. 🌙",
  "Ancient wisdom shows... consistency is the key to your success. ⭐",
  "The mists clear to show... a mobile-first approach in your destiny. 📱",
  "I perceive... accessibility will unlock new opportunities. ♿",
  "The oracle whispers... visual hierarchy will guide your path. 👁️",
  "Mystical energies indicate... your brand needs a refresh. 🎨",
  "The stars align to reveal... user research is your greatest ally. 🔬",
  "I sense... animation will breathe life into your project. 🌟",
  "The cosmos declares... white space is not empty space. 🌌",
  "Arcane knowledge shows... typography speaks louder than words. 📝",
  "The void reveals... performance optimization awaits you. ⚡",
  "I divine... your call-to-action needs more clarity. 🎯",
  "The ether suggests... you need a design system. 📚",
  "Magical forces converge... simplicity is the ultimate sophistication. ✨",
  "The crystal whispers... your color palette needs harmony. 🎨",
  "I see in the mist... your journey to great design begins today. 🚀",
  "The spirits agree... you've found the right designer. 😉"
];

function showFortune() {
  const modal = document.getElementById('fortuneModal');
  const fortuneText = document.getElementById('fortuneText');
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  
  fortuneText.textContent = randomFortune;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideFortune() {
  const modal = document.getElementById('fortuneModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Event listeners for fortune telling
const crystalBallPhoto = document.getElementById('crystalBallPhoto');
const fortuneClose = document.getElementById('fortuneClose');
const fortuneAgain = document.getElementById('fortuneAgain');
const fortuneModal = document.getElementById('fortuneModal');

if (crystalBallPhoto) {
  crystalBallPhoto.addEventListener('click', showFortune);
}

if (fortuneClose) {
  fortuneClose.addEventListener('click', hideFortune);
}

if (fortuneAgain) {
  fortuneAgain.addEventListener('click', () => {
    showFortune();
  });
}

if (fortuneModal) {
  fortuneModal.addEventListener('click', (e) => {
    if (e.target === fortuneModal) {
      hideFortune();
    }
  });
  
  // Mobile swipe to dismiss
  let touchStartY = 0;
  let touchEndY = 0;
  
  const fortuneContent = fortuneModal.querySelector('.fortune-content');
  
  fortuneContent.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  fortuneContent.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
    const diff = touchEndY - touchStartY;
    
    // Visual feedback while swiping
    if (diff > 0) {
      fortuneContent.style.transform = `translateY(${diff * 0.5}px)`;
      fortuneContent.style.opacity = `${1 - (diff / 500)}`;
    }
  }, { passive: true });
  
  fortuneContent.addEventListener('touchend', () => {
    const swipeDistance = touchEndY - touchStartY;
    
    // If swiped down more than 100px, close modal
    if (swipeDistance > 100) {
      hideFortune();
    }
    
    // Reset position
    fortuneContent.style.transform = '';
    fortuneContent.style.opacity = '';
    touchStartY = 0;
    touchEndY = 0;
  }, { passive: true });
}

// Add visual tap feedback for mobile
if (crystalBallPhoto) {
  crystalBallPhoto.addEventListener('touchstart', () => {
    crystalBallPhoto.style.transform = 'scale(0.95)';
  }, { passive: true });
  
  crystalBallPhoto.addEventListener('touchend', () => {
    crystalBallPhoto.style.transform = '';
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // Smooth scroll with offset for fixed nav
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Parallax effect on hero section
  // ========================================
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      heroSection.style.opacity = 1 - (scrolled / 800);
    });
  }

  // ========================================
  // Cursor trail effect (subtle sparkles)
  // ========================================
  let particles = [];
  const maxParticles = 30;
  
  document.addEventListener('mousemove', (e) => {
    if (particles.length < maxParticles && Math.random() > 0.85) {
      createParticle(e.clientX, e.clientY);
    }
  });

  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Random color from theme palette
    const colors = ['#b794f6', '#60d5f5', '#ffd700'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;
    particle.style.boxShadow = `0 0 10px ${randomColor}`;
    
    document.body.appendChild(particle);
    particles.push(particle);

    setTimeout(() => {
      particle.remove();
      particles = particles.filter(p => p !== particle);
    }, 1000);
  }

  // Add CSS for cursor particles
  const style = document.createElement('style');
  style.textContent = `
    .cursor-particle {
      position: fixed;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: fadeOut 1s ease-out forwards;
    }
    
    @keyframes fadeOut {
      0% {
        opacity: 0.8;
        transform: scale(1) translateY(0);
      }
      100% {
        opacity: 0;
        transform: scale(0) translateY(-30px);
      }
    }
  `;
  document.head.appendChild(style);

  // ========================================
  // Project card hover glow effect
  // ========================================
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 50px rgba(183, 148, 246, 0.6)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });

  // ========================================
  // Intersection Observer for fade-in animations
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add initial state and observe elements
  const animatedElements = document.querySelectorAll('.project-card, .about-section, .skills-section, .contact-section');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // ========================================
  // Typing effect for hero subtitle
  // ========================================
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // ========================================
  // Constellation connection lines
  // ========================================
  const constellation = document.querySelector('.constellation-cluster');
  if (constellation) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    constellation.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = constellation.offsetWidth;
    canvas.height = constellation.offsetHeight;
    
    // Aries constellation pattern (Hamal, Sheratan, Mesarthim, 41 Arietis, and the curve)
    const stars = [
      { x: 0.20, y: 0.40 },  // Hamal (Alpha Arietis - brightest)
      { x: 0.35, y: 0.30 },  // Sheratan (Beta Arietis)
      { x: 0.55, y: 0.25 },  // Mesarthim (Gamma Arietis)
      { x: 0.75, y: 0.35 },  // 41 Arietis
      { x: 0.85, y: 0.50 }   // Extended curve
    ];
    
    function drawConstellation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(183, 148, 246, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < stars.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x * canvas.width, stars[i].y * canvas.height);
        ctx.lineTo(stars[i + 1].x * canvas.width, stars[i + 1].y * canvas.height);
        ctx.stroke();
      }
    }
    
    drawConstellation();
  }

  // ========================================
  // Skills hover randomization
  // ========================================
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const colors = ['#b794f6', '#60d5f5', '#ffd700'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      this.style.borderColor = randomColor;
      this.style.boxShadow = `0 0 25px ${randomColor}80`;
    });
  });

  console.log('✨ Portfolio magic initialized by Mez');
});
