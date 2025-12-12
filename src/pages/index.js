import "./index.css";

import {
  disableButton,
  resetValidation,
  enableValidation,
  validationConfig,
} from "../scripts/validation.js";

import { setButtonText } from "../utils/helpers.js";

import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ae15b623-2eef-49b1-bf36-4a1013dc8e0e",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then((data) => {
    data[0].forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

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
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
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

const avatarModal = document.querySelector("#avatar-modal");
const avatarFormElement = avatarModal.querySelector(".modal__form");
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarModalNameInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const addCardButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardTitleInput = document.querySelector("#card-caption-input");
const addCardUrlInput = document.querySelector("#card-link-input");
const addSubmitButton = document.querySelector(".modal__submit-btn");

let selectedCard;
let selectedCardId;

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  };

  api
    .addCard(newCard)
    .then((res) => {
      const cardEl = getCardElement(res);
      cardsList.prepend(cardEl);
      addCardForm.reset();
      disableButton(addSubmitButton);
      closeModal(addCardModal);
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo(avatarModalNameInput.value)
    .then((data) => {
      console.log(data.avatar);
    })
    .catch(console.error);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLike(evt, id) {
  evt.target.classList.toggle("card__like-button_active");
  // 1. check whether card is currently liked or not
  //   const isLiked = ???;
  // 2. call the changeLikeStatus method, passing the appropriate arguments
  // 3. handle the response (.then and .catch)
  // 4. in the .then toggle active class
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

  // TODO - if card is liked, set the active class on the card

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  deleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
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
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  setButtonText(submitBtn, true, "Save", "Saving...");
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = editModalNameInput.value;
      profileDescription.textContent = editModalDescriptionInput.value;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

editFormElement.addEventListener("submit", handleEditFormSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

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

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarFormElement.addEventListener("submit", handleAvatarSubmit);

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

enableValidation(validationConfig);
