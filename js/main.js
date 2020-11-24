import galleryList from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const openModalRef = document.querySelector(".js-lightbox");
const imgModalRef = document.querySelector(".lightbox__image");
const closeModalRef = document.querySelector('[data-action="close-lightbox"]');
const closeOverlayRef = document.querySelector(".lightbox__overlay");

const galleryItems = createGallery(galleryList);
galleryRef.insertAdjacentHTML("afterbegin", galleryItems);

galleryRef.addEventListener("click", galleryClick);
closeModalRef.addEventListener("click", () => {
  closeModal();
});
closeOverlayRef.addEventListener("click", () => {
  closeModal();
});
const duStuffOnKeydown = (event) => {
  if (event.code !== "Escape") {
    return;
  }
  closeModal();
  window.removeEventListener("keydown", duStuffOnKeydown);
};
window.addEventListener("keydown", duStuffOnKeydown);

function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </li>`;
    })
    .join("");
}

function galleryClick(event) {
  event.preventDefault();
  const imgRef = event.target;

  if (imgRef.nodeName !== "IMG") {
    return;
  }

  const originalImageURL = imgRef.dataset.source;
  setOriginalImageSrc(originalImageURL);
  openModal();
}

function setOriginalImageSrc(url) {
  imgModalRef.src = url;
}

function openModal() {
  openModalRef.classList.add("is-open");
}

function closeModal() {
  openModalRef.classList.remove("is-open");
  imgModalRef.src = "";
}
