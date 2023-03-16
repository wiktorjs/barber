import { SLIDE_DURATION } from "../config.js";

// ! Carousel
class CarouselView {
  _parentEl = document.querySelector(".service__carousel");
  _slides = document.querySelectorAll(".service-box");
  _statusBar = document.querySelector(".service__status-bar");
  _curSlide = 0;

  constructor() {
    this.changeSlides();
    this._statusBar.style.animation = `move-status-bar ${SLIDE_DURATION}s infinite linear`;
  }

  _goToSlide(slide) {
    
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  }

  changeSlides() {
    // | Go to the slide
    this._goToSlide(this._curSlide);

    // | Change current slide variable to prepare for next slide
    this._curSlide++;

    // | Reset when it reaches last slide
    if (this._curSlide > this._slides.length - 1) this._curSlide = 0;
  }
  
}

export default new CarouselView();
