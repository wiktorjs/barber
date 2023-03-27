import { servicesMarkup, bookMarkup } from "./modalViewMarkups";
import { OVERLAY_TRANSITION_SEC } from "../config";
import { wait } from "../helpers";

class ModalView {
  #btnOpen = document.querySelectorAll(".btn-open-modal");
  #btnClose = document.getElementById("btn-close-modal");

  #overlay = document.querySelector(".overlay");
  #modalParent = document.querySelector(".modal-parent");

  async #hideModal() {
    this.#overlay.style.opacity = 0;

    // | Implemented for smooth transition - to make overlay and it's children disappear at the same time
    await wait(OVERLAY_TRANSITION_SEC);

    this.#overlay.classList.toggle("hidden");
  }

  #openModalListener() {
    this.#btnOpen.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        // | Check if there was a model rendered eariler - if so, remove it
        const modalContent = document.querySelector(".modal__content");
        if (modalContent) modalContent.remove();

        // | Check what type of modal users wants to open - booking or services?
        const modalType = e.target.dataset.type
        const modalMarkup = 
          modalType === "services" ? servicesMarkup : bookMarkup;
        //

        modalType === "book" && this.#modalParent.classList.add("modal-parent__book");
        modalType === "services" && this.#modalParent.classList.remove("modal-parent__book");
  
        // | Insert desired modal
        this.#modalParent.insertAdjacentHTML("beforeend", modalMarkup);

        // | Show overlay
        this.#overlay.classList.toggle("hidden");
        this.#overlay.style.opacity = 1;
      })
    );
  }

  #hideModalListener() {
    this.#btnClose.addEventListener("click", this.#hideModal.bind(this));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.#overlay.classList.contains("hidden"))
        this.#hideModal();
      return;
    });

    this.#overlay.addEventListener("click", (e) => {
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
