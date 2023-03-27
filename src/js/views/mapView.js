import popupImg from '../../img/hero-s.jpg';
import icons from '../../img/icons.svg';

// todo CONFIGURE LEAFLET, regenerator-runtime

const generateFullStar = function (starsNum) {
  const starMarkup = `
  <svg class="review-box__icon-star"> 
    <use href="${icons}#icon-star-full"></use>
  </svg>
  `;
  const arr = new Array(starsNum).fill(starMarkup);

  const markup = [...arr].join('');

  return markup;
};

export const mapView = function () {
  const coords = [52.217691, 21.033053];
  const map = L.map('map').setView([52.219449, 21.033197], 16);

  L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  const marker = L.marker(coords).addTo(map);
  const popup = marker
    .bindPopup(
      L.popup({
        minWidth: 150,
        maxWidth: 400,
        closeOnEscapeKey: false,
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
        content: `
        <div class="popup-box">
          <div class="popup-box__img-box">
            <img class="popup-box__img-box--img" src="${popupImg}">
          </div>

          <div class="popup-box__content-container">
            <p class="popup-box__content-container--text">YOB Salon</p>

            <div class="review-box">
              ${generateFullStar(4)}
              <svg class="review-box__icon-star"> 
                <use href="${icons}#icon-star-half"></use>
              </svg>
              <p class="review-box__count">167 reviews</p>
            </div>
            <p class="popup-box__street">Agrykola st., 00-460, Warsaw</p>
          </div>
        </div>
        `,
      })
    )
    .openPopup();
};
