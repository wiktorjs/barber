import service1 from "../../img/service1-s.jpg";
import service2 from "../../img/service2-s.jpg";
import service3 from "../../img/service3-s.jpg";
import service4 from "../../img/service4-s.jpg";
import service5 from "../../img/service5-s.jpg";
import service6 from "../../img/service6-s.jpg";

import icons from "../../img/icons.svg";

export const servicesMarkup = `
<div class="services modal__content">

    <h3 class="services__heading" style="flex: 1 0 100%">Our services</h3>

    <div class="service-box">
    <img class="service-box__img" src="${service1}" alt="service photo" />
    <div class="service-box__text-box">
        <h4>Beard grooming</h4>
        <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
        vel quae, quasi sed accusamus maiores inventore possimus sit.
        </p>
        
    </div>

    </div>

    <div class="service-box">
    <img class="service-box__img" src="${service2}" alt="service photo" />
    <div class="service-box__text-box">
        <h4>Hairdressing</h4>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Excepturi commodi ipsa quo at perferendis.
        </p>
    </div>
    </div>
    <div class="service-box">
    <img class="service-box__img" src="${service3}" alt="service photo" />
    <div class="service-box__text-box">
        <h4>Nails</h4>
        <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
        aperiam minus alias, quibusdam.
        </p>
    </div>
    </div>
    <div class="service-box">
    <img class="service-box__img" src="${service4}" alt="service photo" />
    <div class="service-box__text-box">
        <h4>SPA</h4>
        <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Molestias voluptas dolor ipsam eaque reprehenderit esse saepe
        magni, laborum doloribus omnis deleniti.
        </p>
    </div>
    </div>
    <div class="service-box">
    <img class="service-box__img" src="${service5}" alt="service photo" />
    <div class="service-box__text-box">
        <h4>Facial treatments</h4>
        <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus aliquam blanditiis.
        </p>
    </div>
    </div>
    <div class="service-box">
    <img class="service-box__img" src="${service6}" alt="service photo" />
    <div class="service-box__text-box">
        <h4>Waxing</h4>
        <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum aspernatur minus molestias.
        </p>
    </div>
    </div>
</div>
`;

export const bookMarkup = `
    
<div class="book modal__content">
  <form class="book__form" action="submit">
    <h3 class="book__heading">Interested? Book your visit now!</h3>
    <div class="form__group">
      <input
        id="name"
        class="book__form-input"
        type="text"
        placeholder="First name"
        pattern="[A-Za-z]{3,}"
      />
      <label for="name" class="book__form-label">First name</label>
    </div>

    <div class="form__group">
      <input
        id="email"
        class="book__form-input"
        type="email"
        placeholder="Email"
        pattern="[a-z0-8._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      <label for="email" class="book__form-label">Email</label>
    </div>
    <button id="book__btn" class="btn btn-tertiary">
      Book now<span class="btn__icon-arrow">&rarr;</span>
    </button>
  </form>

  <div class="book__img">
</div>
`;