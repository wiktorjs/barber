import 'core-js/actual';
import 'regenerator-runtime/runtime';
import CarouselView from './views/carouselView.js';
import { mapView } from './views/mapView.js';
import ModalView from './views/modalView.js';
import NavigationView from './views/navigationView.js';

const copyrightNotice = function () {
  const parentEl = document.querySelector('.copyright');
  const year = new Date().getFullYear();
  parentEl.textContent = `Copyright © ${year} by Wiktor Sienkiewicz.`;
};

// ! ==== INITIALIZATION =====
const init = function () {
  NavigationView.init();
  CarouselView.init();
  ModalView.init();
  mapView();
  copyrightNotice();
};
init();
