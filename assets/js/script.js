"use strict";

const navListEl = document.querySelector(".nav__list");

navListEl.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const nav = document.querySelector(".nav");

// Menu fade animation
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".header").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
    });
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".header").querySelectorAll(".nav__link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
    });
  }
});

const header = document.querySelector(".header");
const navBg = document.querySelector(".nav__bg");
const headerLogo = document.querySelector(".header__logo");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navBg.classList.add("sticky");
    headerLogo.classList.add("sticky");
    nav.classList.add("sticky");
  } else {
    navBg.classList.remove("sticky");
    headerLogo.classList.remove("sticky");
    nav.classList.remove("sticky");
  }
};

const headerObserve = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

headerObserve.observe(header);
