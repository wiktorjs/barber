import { SLIDE_DURATION, RESET_STATUS_BAR_SEC } from '../config.js';
import { wait } from '../helpers.js';

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

  // | ===== STARTING CONDITIONS =====
  #isIntersecting;
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
    this.#isIntersecting = true;
  }

  #stop() {
    clearInterval(this.#interval);
    this.#statusBar.style.animation = 'none';
    this.#isIntersecting = false;
  }

  // | ===== GENERAL FUNCTIONS =====

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

    await wait(RESET_STATUS_BAR_SEC); // ? Not putting wait before setInterval to prevent users from rapdily spamming with slide changes and therefore glitching the carousel
    this.#statusBar.style.animation = `move-status-bar ${SLIDE_DURATION}s infinite linear`;
  }

  // | ===== SLIDE CHANGES =====
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
  }

  /**
   * Allows to go to the next slide, goes back to the first one after reaching the last one
   */
  #nextSlide() {
    this.#curSlide++;
    if (this.#curSlide > this.#slides.length - 1) this.#curSlide = 0;

    this.#goToSlide(this.#curSlide);
  }

  /**
   * Adds event listeners to arrow click events and arrow key presses, called upon initialization
   */
  #switchSlide() {
    this.#parentEl.addEventListener('click', (e) => {
      if (!this.#isIntersecting) return;

      const arrow = e.target.closest('.carousel__icon-box');
      if (!arrow) return;

      arrow.classList.contains('carousel__icon-box--left')
        ? this.#prevSlide()
        : this.#nextSlide();
      //
      this.#resetInterval();
    });

    document.documentElement.addEventListener(
      'keydown',
      ((e) => {
        if (!this.#isIntersecting) return;

        if (e.key === 'ArrowLeft') {
          this.#prevSlide();
          this.#resetInterval();
        }
        if (e.key === 'ArrowRight') {
          this.#nextSlide();
          this.#resetInterval();
        }
      }).bind(this)
    ); 
  }

  #touchSwipe() {
    this.#parentEl.addEventListener(
      'touchstart',
      (e) => (this.#touchstart = e.changedTouches[0].screenX)
    );

    this.#parentEl.addEventListener('touchend', (e) => {
      this.#touchend = e.changedTouches[0].screenX;
      this.#swipeSlides();
    });
  }

  #swipeSlides() {
    // | when swiped left for at least 20px, go to the next slide
    if (
      this.#touchstart > this.#touchend &&
      this.#touchstart - this.#touchend > 20
    )
      this.#nextSlide();

    // | when swiped right for at least 20px, go to the previous slide
    if (
      this.#touchstart < this.#touchend &&
      this.#touchstart - this.#touchend < -20
    )
      this.#prevSlide();
  }

  init() {
    this.#switchSlide();
    this.#carouselObserver.observe(this.#section);
    this.#goToSlide(0);
    this.#touchSwipe();
  }
}

export default new CarouselView();
