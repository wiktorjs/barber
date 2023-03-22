import { servicesMarkup, bookMarkup } from "./modalViewMarkups";
import { OVERLAY_TRANSITION_SEC } from "../config";
import { wait } from "../helpers";

class ModalView {
  _btnOpen = document.querySelectorAll(".btn-open-modal");
  _btnClose = document.getElementById("btn-close-modal");

  _overlay = document.querySelector(".overlay");
  _modalParent = document.querySelector(".modal-parent");

  constructor() {
    this._overlay.style.transition = `opacity ${OVERLAY_TRANSITION_SEC}s ease`;
    this._openModalListener();
    this._hideModalListener();
  }

  async _hideModal() {
    this._overlay.style.opacity = 0;

    // | Implemented for smooth transition - to make overlay and it's children disappear at the same time
    await wait(OVERLAY_TRANSITION_SEC);

    this._overlay.classList.toggle("hidden");
  }

  _openModalListener() {
    this._btnOpen.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        // | Check if there was a model rendered eariler - if so, remove it
        const modalContent = document.querySelector(".modal__content");
        if (modalContent) modalContent.remove();

        // | Check what type of modal users wants to open - booking or services?
        const modalType = e.target.dataset.type
        const modalMarkup = 
          modalType === "services" ? servicesMarkup : bookMarkup;
        //

        modalType === "book" && this._modalParent.classList.add("modal-parent__book");
        modalType === "services" && this._modalParent.classList.remove("modal-parent__book");
  
        // | Insert desired modal
        this._modalParent.insertAdjacentHTML("beforeend", modalMarkup);

        // | Show overlay
        this._overlay.classList.toggle("hidden");
        this._overlay.style.opacity = 1;
      })
    );
  }

  _hideModalListener() {
    this._btnClose.addEventListener("click", this._hideModal.bind(this));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this._overlay.classList.contains("hidden"))
        this._hideModal();
      return;
    });

    this._overlay.addEventListener("click", (e) => {
      if (e.target !== this._overlay) return;
      this._hideModal();
    });
  }
}

export default new ModalView();
