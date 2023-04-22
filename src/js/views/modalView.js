import { servicesMarkup, bookMarkup } from './modalViewMarkups';
import { OVERLAY_TRANSITION_SEC } from '../config';
import { wait } from '../helpers';

class ModalView {
  #btnOpen = document.querySelectorAll('.btn-open-modal');
  #btnClose = document.getElementById('btn-close-modal');

  #overlay = document.querySelector('.overlay');
  #modalParent = document.querySelector('.modal-parent');

  async #hideModal() {
    this.#overlay.style.opacity = 0;

    // | Implemented for smooth transition - to make overlay and it's children disappear at the same time
    await wait(OVERLAY_TRANSITION_SEC);

    this.#overlay.classList.toggle('hidden');
  }

  #openModalListener() {
    this.#btnOpen.forEach((btn) =>
      btn.addEventListener('click', (e) => {
        // | Select the content of last displayed modal (if it was opened before)
        const modalContent = document.querySelector('.modal__content');

        // | Check what type of modal users wants to open - booking or services?
        const modalType = e.target.dataset.type;

        // | If the modal the user want to open is the same as the one which he has opened before, just show it instead of re-rendering everything
        if (
          (modalContent?.classList.contains('services') &&
            modalType === 'services') ||
          (modalContent?.classList.contains('book') && modalType === 'book')
        ) {
          this.#overlay.classList.toggle('hidden');
          this.#overlay.style.opacity = 1;
          return;
        }

        // | If not and there was a different modal opened earlier, remove it
        modalContent?.remove();

        // | Decide which markup to insert
        const modalMarkup =
          modalType === 'services' ? servicesMarkup : bookMarkup;
        //

        // | Apply correct class to modal parent
        modalType === 'book' &&
          this.#modalParent.classList.add('modal-parent__book');
        modalType === 'services' &&
          this.#modalParent.classList.remove('modal-parent__book');

        // | Insert desired modal
        this.#modalParent.insertAdjacentHTML('beforeend', modalMarkup);

        // | Show overlay
        this.#overlay.classList.toggle('hidden');
        this.#overlay.style.opacity = 1;
      })
    );
  }

  #hideModalListener() {
    this.#btnClose.addEventListener('click', this.#hideModal.bind(this));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.#overlay.classList.contains('hidden'))
        this.#hideModal();
      return;
    });

    this.#overlay.addEventListener('click', (e) => {
      if (e.target !== this.#overlay) return;
      this.#hideModal();
    });
  }

  init() {
    this.#overlay.style.transition = `opacity ${OVERLAY_TRANSITION_SEC}s ease`;
    this.#openModalListener();
    this.#hideModalListener();
  }
}

export default new ModalView();
