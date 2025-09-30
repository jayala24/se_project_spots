import {
  disableButton,
  resetValidation,
  enableValidation,
  validationConfig,
} from "./validation.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

function createCircleAnimation(evt) {
  const circle = document.createElement("div");
  circle.classList.add("click-circle");
  circle.style.left = `${evt.clientX}px`;
  circle.style.top = `${evt.clientY}px`;
  document.body.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 300);
}

const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalCaption = imageModal.querySelector(".modal__caption");
const imageModalCloseBtn = imageModal.querySelector(".modal__close-btn");

imageModalCloseBtn.addEventListener("click", (evt) => {
  createCircleAnimation(evt);
  closeModal(imageModal);
});

imageModal.addEventListener("mousedown", (evt) => {
  if (evt.target === imageModal) {
    closeModal(imageModal);
  }
});

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editSubmitButton = editModal.querySelector(".modal__submit-btn");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const addCardButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardTitleInput = document.querySelector("#card-caption-input");
const addCardUrlInput = document.querySelector("#card-link-input");
const addSubmitButton = document.querySelector(".modal__submit-btn");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  };
  const cardElement = getCardElement(newCard);
  cardsList.prepend(cardElement);
  addCardForm.reset();
  disableButton(addSubmitButton);
  closeModal(addCardModal);
}

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  likeButton.addEventListener("click", (evt) => {
    createCircleAnimation(evt);
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", (evt) => {
    const circle = document.createElement("div");
    circle.classList.add("click-circle");

    circle.style.left = `${evt.clientX}px`;
    circle.style.top = `${evt.clientY}px`;

    document.body.appendChild(circle);

    imageModalImage.src = data.link;
    imageModalImage.alt = data.name;
    imageModalCaption.textContent = data.name;
    openModal(imageModal);

    setTimeout(() => {
      circle.remove();
    }, 300);
  });

  return cardElement;
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);

profileEditButton.addEventListener("click", (evt) => {
  createCircleAnimation(evt);
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, [
    editModalNameInput,
    editModalDescriptionInput,
  ]);
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", (evt) => {
  createCircleAnimation(evt);
  closeModal(editModal);
});

editModal.addEventListener("mousedown", (evt) => {
  if (evt.target === editModal) {
    closeModal(editModal);
  }
});

addCardButton.addEventListener("click", (evt) => {
  createCircleAnimation(evt);
  openModal(addCardModal);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

const addModalCloseBtn = addCardModal.querySelector(".modal__close-btn");
addModalCloseBtn.addEventListener("click", (evt) => {
  createCircleAnimation(evt);
  closeModal(addCardModal);
});

addCardModal.addEventListener("mousedown", (evt) => {
  if (evt.target === addCardModal) {
    closeModal(addCardModal);
  }
});

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}

enableValidation(validationConfig);
