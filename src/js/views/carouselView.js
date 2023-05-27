import { SLIDE_DURATION, RESET_STATUS_BAR_SEC } from '../config.js';
import { wait } from '../helpers.js';
import service1 from '../../img/service1.webp';
import service2 from '../../img/service2.webp';
import service3 from '../../img/service3.webp';

// ! Carousel
class CarouselView {
  #parentEl = document.querySelector('.carousel');
  #section = document.getElementById('services');
  #slides = document.querySelectorAll('.slide-box');
  #statusBar = document.querySelector('.slide-status-bar');
  #curSlide = 0;
  #interval;
  #touchstart;
  #touchend;

  // ! ===== ACTIVE STATE CONDITIONS =====
  // Variable responsible for event listeners response - if false, nothing will happen f.e. on arrow key press
  #carouselIsVisible = false;
  /** Observe whether there is at least 20% of carousel section visible */
  #carouselObserver = new IntersectionObserver(this.#observe.bind(this), {
    root: null,
    threshold: 0.2,
  });

  /**
   *  If the condition from #carouselObserver is met, execute this function - start or stop the carousel.
   * Implemented for better performance, to avoid carousel running in the background the whole time.
   * @param {Array} IntersectionObserverEntry An array containing all the entries
   */
  #observe(entries) {
    const [entry] = entries;
    entry.isIntersecting ? this.#start() : this.#stop();
  }

  #start() {
    this.#interval = setInterval(
      () => this.#nextSlide(),
      SLIDE_DURATION * 1000
    );
    this.#statusBar.style.animation = `move-status-bar ${SLIDE_DURATION}s infinite linear`;
    this.#carouselIsVisible = true;
  }

  #stop() {
    clearInterval(this.#interval);
    this.#statusBar.style.animation = 'none';
    this.#carouselIsVisible = false;
  }

  // ! ===== GENERAL FUNCTIONS =====

  /**
   * Resets the time between each automatic slide change whenever user clicks on an arrow to manually change it.
   */
  async #resetInterval() {
    clearInterval(this.#interval);
    this.#statusBar.style.animation = `none`;

    this.#interval = setInterval(
      () => this.#nextSlide(),
      SLIDE_DURATION * 1000
    );

    await wait(RESET_STATUS_BAR_SEC);  // | Otherwise animation reset doesn't work
    // ? Not putting wait before setInterval to prevent users from rapdily spamming with slide changes and therefore glitching the carousel
    this.#statusBar.style.animation = `move-status-bar ${SLIDE_DURATION}s infinite linear`;
  }

  // ! ===== SLIDE CHANGES =====
  /**
   * Translates slides to display the one we want, usually take #curSlide variable as an argument
   * @param {number} slide defines to which slide you want to go, counting from 0
   */
  #goToSlide(slide) {
    this.#slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  }

  /**
   * Allows to go to the previous slide, goes to the last one after reaching the first one
   */
  #prevSlide() {
    this.#curSlide--;
    if (this.#curSlide < 0) this.#curSlide = this.#slides.length - 1;

    this.#goToSlide(this.#curSlide);
    this.#resetInterval();
  }

  /**
   * Allows to go to the next slide, goes back to the first one after reaching the last one
   */
  #nextSlide() {
    this.#curSlide++;
    if (this.#curSlide > this.#slides.length - 1) this.#curSlide = 0;

    this.#goToSlide(this.#curSlide);
    this.#resetInterval();
  }

  /**
   * Adds event listeners to arrow click events and arrow key presses, called upon initialization
   */
  #initEventListeners() {
    this.#parentEl.addEventListener('click', (e) => {
      if (!this.#carouselIsVisible) return;
      
      const arrow = e.target.closest('.carousel__icon-box');
      if (!arrow) return;

      arrow.classList.contains('carousel__icon-box--left')
        ? this.#prevSlide()
        : this.#nextSlide();
      //
    });

    document.documentElement.addEventListener(
      'keydown',
      ((e) => {
        if (!this.#carouselIsVisible) return;

        if (e.key === 'ArrowLeft') {
          this.#prevSlide();
        }
        if (e.key === 'ArrowRight') {
          this.#nextSlide();
        }
      }).bind(this)
    );

    this.#parentEl.addEventListener(
      'touchstart',
      (e) => (this.#touchstart = e.changedTouches[0].screenX), {passive: true}
    );

    this.#parentEl.addEventListener('touchend', (e) => {
      this.#touchend = e.changedTouches[0].screenX;
      this.#swipeSlides();
    }, {passive: true});
  }

  #parentElWidth = this.#parentEl.getBoundingClientRect().width;
  #swipeSlides() {
    // | when swiped left for at least 1/7th of carousel width, go to the next slide
    if (
      this.#touchstart > this.#touchend &&
      this.#touchstart - this.#touchend > this.#parentElWidth / 7
    )
      this.#nextSlide();

    // | when swiped right for at least 1/7th of carousel width, go to the previous slide
    if (
      this.#touchstart < this.#touchend &&
      this.#touchstart - this.#touchend < this.#parentElWidth / 7
    )
      this.#prevSlide();
  }

  // ! ===== LAZY LOADING IMAGES =====
  // Select every image
  #carouselImages = document.querySelectorAll('img[data-carousel-src]');
  
  // Observer
  #loadImagesObserver = new IntersectionObserver(this.#lazyLoadImages.bind(this), {
    root: null,
    rootMargin: `${this.#section.getBoundingClientRect().height / 5}px`,
    threshold: 0,
  })
  
  #lazyLoadImages(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    // Make services images array
    const services = [service1, service2, service3];

    this.#carouselImages.forEach((img, i) => {
      // Assign high-resolution image to every slide
      img.src = services[i];

      // Remove blur when image loads
      img.addEventListener('load', () =>
        img.classList.remove('slide-box__img--lazy')
      );
    });

    // Unobserve so that it only happens once per page load
    observer.unobserve(this.#section);
  }

  
  init() {
    this.#initEventListeners();
    this.#carouselObserver.observe(this.#section);
    this.#loadImagesObserver.observe(this.#section);
    this.#goToSlide(0);
  }
}

export default new CarouselView();
