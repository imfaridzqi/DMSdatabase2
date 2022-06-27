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

const alertSuccess = document.getElementById("alert-success");
const alertDanger = document.getElementById("alert-danger");

alertSuccess.addEventListener("click", function () {
  alertSuccess.classList.add("hidden");
});

alertDanger.addEventListener("click", function () {
  alertDanger.classList.add("hidden");
});

const namaAscending = document.querySelector("#namaAscending");
const namaDescending = document.querySelector("#namaDescending");

namaAscending.addEventListener("click", function () {
  namaAscending.classList.add("hidden");
  // namaDescending.classList.remove("hidden");
});

const deleteBtn = document.querySelector("#deleteBtn");
deleteBtn.addEventListener("click", function () {
  alert("Hello");
});
