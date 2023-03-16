import { SLIDE_DURATION, RESET_STATUS_BAR_SEC } from "../config.js";
import { wait } from "../helpers.js";

// ! Carousel
class CarouselView {
  _parentEl = document.querySelector(".service__carousel");
  _slides = document.querySelectorAll(".service-box");
  _statusBar = document.querySelector(".service__status-bar");
  _curSlide = 0;
  _interval = setInterval(() => this._nextSlide(), SLIDE_DURATION * 1000);

  /**
   * Upon class instance creation, automatically begins slideshow from the first slide
   */
  constructor() {
    this._goToSlide(0);
    this._statusBar.style.animation = `move-status-bar ${SLIDE_DURATION}s infinite linear`;
  }

  /**
   * Resets the time between each automatic slide change whenever user clicks on an arrow to manually change it.
   */
  async _resetInterval() {
    clearInterval(this._interval);
    this._statusBar.style.animation = `none`;

    this._interval = setInterval(
      () => this._nextSlide(),
      SLIDE_DURATION * 1000
    );

    await wait(RESET_STATUS_BAR_SEC); // ? Not putting wait before setInterval to prevent users from rapdily spamming with slide changes and therefore glitching the carousel
    this._statusBar.style.animation = `move-status-bar ${SLIDE_DURATION}s infinite linear`;
  }

  /**
   * Translates slides to display the one we want, usually take _curSlide variable as an argument
   * @param {number} slide defines to which slide you want to go, counting from 0
   */
  _goToSlide(slide) {
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  }

  /**
   * Allows to go to the previous slide, goes to the last one after reaching the first one
   */
  _prevSlide() {
    this._curSlide--;
    if (this._curSlide < 0) this._curSlide = this._slides.length - 1;

    this._goToSlide(this._curSlide);
  }

  /**
   * Allows to go to the next slide, goes back to the first one after reaching the last one
   */
  _nextSlide() {
    this._curSlide++;
    if (this._curSlide > this._slides.length - 1) this._curSlide = 0;

    this._goToSlide(this._curSlide);
  }

  /**
   * Adds event listeners to arrow click events and arrow key presses, called upon initialization
   */
  switchSlide() {
    this._parentEl.addEventListener("click", (e) => {
      const arrow = e.target.closest(".slide-arrow");
      if (!arrow) return;

      // console.log(arrow);
      arrow.classList.contains("slide-arrow--left")
        ? this._prevSlide()
        : this._nextSlide();
      //
      this._resetInterval();
    });

    document.documentElement.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this._prevSlide();
        this._resetInterval();
      }
      if (e.key === "ArrowRight") {
        this._nextSlide();
        this._resetInterval();
      }
    });
  }
}

export default new CarouselView();
