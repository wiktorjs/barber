import { servicesMarkup, bookMarkup } from "./modalViewMarkups";

export const showModal = function () {
  const btnOpen = document.querySelectorAll(".btn-open-modal");
  const overlay = document.querySelector(".overlay");

  btnOpen.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const modalType = e.target.dataset.type;

      overlay.innerHTML =
        modalType === "services" ? servicesMarkup : bookMarkup;

      overlay.classList.toggle("hidden");

      const btnClose = document.getElementById("btn-close-modal");
      btnClose.addEventListener("click", () =>
        overlay.classList.toggle("hidden")
      );
    })
  );
};
