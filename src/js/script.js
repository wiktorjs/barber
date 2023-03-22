import "core-js/actual";
import "regenerator-runtime/runtime";
import carouselView from "./views/carouselView.js";
import { mapView } from "./views/mapView.js";
// import { showModal } from "./views/modalView.js";
import ModalView from "./views/modalView.js";

// ! ===== NAVIGATION =====
const controlNavigation = function () {
  const header = document.getElementById("home");
  const stickyNav = document.querySelector(".nav--sticky");

  const navHeight = stickyNav.getBoundingClientRect().height;

  const showNav = function (entries, observer) {
    const [entry] = entries;
    entry.isIntersecting
      ? stickyNav.classList.add("nav--hidden")
      : stickyNav.classList.remove("nav--hidden");
  };

  const headerObserver = new IntersectionObserver(showNav, {
    root: null,
    rootMargin: `-${navHeight}px`,
    threshold: 0,
  });
  headerObserver.observe(header);
};

// ! ===== SLIDES =====
const controlSlides = function () {
  carouselView.switchSlide();
};

const copyrightNotice = function () {
  const parentEl = document.querySelector(".copyright");
  const year = new Date().getFullYear();
  parentEl.textContent = `Copyright © ${year} by Wiktor Sienkiewicz. All rights reserved.`;
};

// ! ==== INITIALIZATION =====
const init = function () {
  controlNavigation();
  controlSlides();
  // showModal();
  mapView();
  copyrightNotice();
};
init();

