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

const pilihTanggal = document.querySelector("#pilih-tanggal");
const calendar = document.querySelector(".tanggal-modal");
const closeTanggal = document.querySelector("#close-tanggal");
const batalTanggal = document.querySelector("#batal-tanggal");

pilihTanggal.addEventListener("click", function () {
  calendar.classList.remove("hidden");
});

closeTanggal.addEventListener("click", function () {
  calendar.classList.add("hidden");
});

batalTanggal.addEventListener("click", function () {
  calendar.classList.add("hidden");
});
