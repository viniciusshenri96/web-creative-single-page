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

const slides = document.querySelectorAll(".brand__slide");
const title = document.querySelector(".brand__title");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const textArr = [
  "Brand naming & guidelines",
  "Brand identity & merchandise",
  "Brand identity & web design",
];
let curSlide = 0;
let maxSlide = slides.length;

const goToSlide = function (curSlide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;

    if (i < curSlide) {
      return (s.style.display = "none");
    } else return (s.style.display = "grid");
  });
};

goToSlide(0);

const nextSlide = function (e) {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  title.textContent = textArr[curSlide];
  goToSlide(curSlide);
};

const prevSlide = function (e) {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  title.textContent = textArr[curSlide];
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});
