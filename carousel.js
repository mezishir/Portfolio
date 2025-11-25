// Carousel functionality
class ProjectCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.cards = Array.from(document.querySelectorAll('.carousel-card'));
    this.prevBtn = document.querySelector('.carousel-nav.prev');
    this.nextBtn = document.querySelector('.carousel-nav.next');
    this.visitBtn = document.getElementById('visitSiteBtn');
    
    this.currentIndex = 0;
    this.autoScrollInterval = null;
    this.isTransitioning = false;
    
    this.init();
  }
  
  init() {
    // Clone first and last cards for infinite loop effect
    const firstClone = this.cards[0].cloneNode(true);
    const lastClone = this.cards[this.cards.length - 1].cloneNode(true);
    
    this.track.appendChild(firstClone);
    this.track.insertBefore(lastClone, this.cards[0]);
    
    // Update cards array with clones
    this.cards = Array.from(document.querySelectorAll('.carousel-card'));
    this.currentIndex = 1; // Start at first real card (after clone)
    
    this.updateCarousel(false);
    this.startAutoScroll();
    this.attachEvents();
  }
  
  attachEvents() {
    this.prevBtn.addEventListener('click', () => this.navigate('prev'));
    this.nextBtn.addEventListener('click', () => this.navigate('next'));
    
    // Pause on hover
    this.track.addEventListener('mouseenter', () => this.stopAutoScroll());
    this.track.addEventListener('mouseleave', () => this.startAutoScroll());
    
    // Visit button
    this.visitBtn.addEventListener('click', () => {
      const url = this.cards[this.currentIndex].dataset.url;
      if (url) window.open(url, '_blank');
    });
    
    // Click on card to make it active
    this.cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (index !== this.currentIndex) {
          this.currentIndex = index;
          this.updateCarousel(true);
          this.resetAutoScroll();
        }
      });
    });
  }
  
  navigate(direction) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    if (direction === 'next') {
      this.currentIndex++;
    } else {
      this.currentIndex--;
    }
    
    this.updateCarousel(true);
    this.resetAutoScroll();
    
    // Handle infinite loop
    setTimeout(() => {
      if (this.currentIndex === 0) {
        this.currentIndex = this.cards.length - 2;
        this.updateCarousel(false);
      } else if (this.currentIndex === this.cards.length - 1) {
        this.currentIndex = 1;
        this.updateCarousel(false);
      }
      this.isTransitioning = false;
    }, 500);
  }
  
  updateCarousel(animate = true) {
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 32;
    const offset = this.currentIndex * (cardWidth + gap);
    
    this.track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    this.track.style.transform = `translateX(calc(50% - ${offset}px - ${cardWidth / 2}px))`;
    
    // Update card states
    this.cards.forEach((card, index) => {
      card.classList.remove('active', 'adjacent');
      
      if (index === this.currentIndex) {
        card.classList.add('active');
      } else if (Math.abs(index - this.currentIndex) === 1) {
        card.classList.add('adjacent');
      }
    });
  }
  
  startAutoScroll() {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      this.navigate('next');
    }, 6000); // 4 seconds per slide
  }
  
  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }
  
  resetAutoScroll() {
    this.stopAutoScroll();
    this.startAutoScroll();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectCarousel();
});
