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

window.onload = function () {
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");

  const flashAlert = document.querySelector(".flash-alert");

  const showModal = document.querySelector("#showModal");
  const uploadModal = document.querySelector("#uploadModal");
  const closeModal = document.querySelector("#closeModal");
  const batal = document.querySelector("#batal");

  var pilihTanggal = document.querySelector("#pilih-tanggal");
  var calendar = document.querySelector("#tanggal-modal");
  var closeTanggal = document.querySelector("#close-tanggal");
  var batalTanggal = document.querySelector("#batal-tanggal");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");
  });

  flashAlert.addEventListener("click", function () {
    flashAlert.classList.add("hidden");
  });

  showModal.addEventListener("click", function () {
    uploadModal.classList.remove("hidden");
  });

  batal.addEventListener("click", function () {
    uploadModal.classList.add("hidden");
  });

  closeModal.addEventListener("click", function () {
    uploadModal.classList.add("hidden");
  });

  pilihTanggal.addEventListener("click", function () {
    calendar.classList.remove("hidden");
  });

  closeTanggal.addEventListener("click", function () {
    calendar.classList.add("hidden");
  });

  batalTanggal.addEventListener("click", function () {
    calendar.classList.add("hidden");
  });
};
