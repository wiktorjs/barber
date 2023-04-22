
class NavigationView {
  #header = document.getElementById('home');
  #stickyNav = document.querySelector('.nav--sticky');
  #hamburgerBtn = document.querySelector('.nav-menu__button');
  #navHeight;
  #headerObserver;
  #isObserving;

  #showNav(entries, observer) {
    const [entry] = entries;
    entry.isIntersecting
      ? this.#stickyNav.classList.add('nav--hidden')
      : this.#stickyNav.classList.remove('nav--hidden');
  }

  #controlNavigation() {
    this.#navHeight = this.#stickyNav.getBoundingClientRect().height;

    this.#headerObserver = new IntersectionObserver(this.#showNav.bind(this), {
      root: null,
      rootMargin: `-${this.#navHeight}px`,
      threshold: 0,
    });

    this.#headerObserver.observe(this.#header);
    this.#isObserving = true;
  }

  #controlMobileNavigation() {
    if (this.#isObserving) {
      this.#headerObserver.unobserve(this.#header);
      this.#isObserving = false;
    }
    if(this.#hamburgerBtn.classList.contains('box--active')) {
      this.#hamburgerBtn.classList.remove('box--active');
      [...this.#hamburgerBtn.children].forEach(span => span.classList.remove('active'));
    }
  }

  #mobileNavigationVisibilityCheck(e) {

    [...this.#hamburgerBtn.children].forEach((span) => span.classList.toggle('active'));

    this.#stickyNav.classList.toggle('nav--hidden');
  
    this.#hamburgerBtn.classList.toggle('box--active');
 
    this.#hamburgerBtn.ariaExpanded = !this.#stickyNav.classList.contains('nav--hidden');

  }

  init() {
    const phoneMediaQuery = window.matchMedia('(max-width: 600px)');

    window.addEventListener('load', () => {
      phoneMediaQuery.matches
        ? this.#controlMobileNavigation()
        : this.#controlNavigation();
    });

    phoneMediaQuery.addEventListener('change', (e) =>{
    this.#stickyNav.classList.add('nav--hidden');
      e.matches ? this.#controlMobileNavigation() : this.#controlNavigation()}
    );

    this.#hamburgerBtn.addEventListener(
      'click',
      (e) => this.#mobileNavigationVisibilityCheck(e)
    );
  }
}

export default new NavigationView();
