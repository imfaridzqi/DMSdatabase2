// Navbar Fixed

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

const flashAlert = document.querySelector(".flash-alert");

flashAlert.addEventListener("click", function () {
  flashAlert.classList.add("hidden");
});

const showModal = document.querySelector("#showModal");
const uploadModal = document.querySelector("#uploadModal");
const closeModal = document.querySelector("#closeModal");
const batal = document.querySelector("#batal");

showModal.addEventListener("click", function () {
  uploadModal.classList.remove("hidden");
});

batal.addEventListener("click", function () {
  uploadModal.classList.add("hidden");
});

closeModal.addEventListener("click", function () {
  uploadModal.classList.add("hidden");
});

const deleteBtn = document.querySelector(".delete-btn");
const deleteModal = document.querySelector(".delete-modal");
const cancelDelete = document.querySelector(".cancel-delete");

deleteBtn.addEventListener("click", function () {
  deleteModal.classList.remove("hidden");
});

cancelDelete.addEventListener("click", function () {
  deleteModal.classList.add("hidden");
});
