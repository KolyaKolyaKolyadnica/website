/* Call header */
{
  const headerEl = document.querySelector(".head");
  const headerMenuEl = document.querySelector(".head__content");

  function getHeaderOff() {
    headerMenuEl.classList.remove("visible");
  }
  function getHeaderOn() {
    headerMenuEl.classList.add("visible");
    headerEl.addEventListener("mouseout", getHeaderOff);
  }
  headerEl.addEventListener("mouseover", getHeaderOn);
}

/* Nav */
{
  const contentBlocksEl = document.querySelectorAll(".content__block");
  const menuItemsEl = document.querySelectorAll(".menu__item");

  function getCurMenuItemActive(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuItemsEl[Number(entry.target.dataset.page)].classList.add("active");
      } else {
        menuItemsEl[Number(entry.target.dataset.page)].classList.remove(
          "active"
        );
      }
    });
  }
  const observer = new IntersectionObserver(getCurMenuItemActive, {
    root: null,
    rootMargin: "0px",
    threshold: 0.55,
  });

  contentBlocksEl.forEach((block) => observer.observe(block));

  const menuLiEl = document.querySelectorAll(".menu__link");
  function moveToCurContent(e) {
    if (
      e.target.classList.contains("menu__item") ||
      e.target.classList.contains("menu__link")
    ) {
      e.preventDefault();
      window.scrollTo({
        top: document.querySelector(`${e.target.hash}`).offsetTop,
        behavior: "smooth",
      });
    }
  }

  menuItemsEl.forEach((item) => {
    item.addEventListener("click", moveToCurContent);
  });
}

/* Scroll-gallery*/
{
  const imgAreaEl = document.querySelector(".img-scroll");
  const imgNodeListEl = document.querySelectorAll(".img-scroll__img ");
  const imgBoxNodeListEl = document.querySelectorAll(".img-scroll__box ");

  const arrImgNumbers = [];
  const middleImgIndex = Math.ceil(imgBoxNodeListEl.length / 2) - 1;

  function getImgPosition(i) {
    if (i < middleImgIndex - 1) {
      const posImgWithoutMainClasses = 40 - (middleImgIndex - i) * 15;
      imgBoxNodeListEl[arrImgNumbers[i]].style.left =
        posImgWithoutMainClasses + "%";
    }
    if (i >= middleImgIndex - 1 && i <= middleImgIndex + 1) {
      imgBoxNodeListEl[arrImgNumbers[i]].style.left = "";
    }
    if (i > middleImgIndex + 1) {
      const posImgWithoutMainClasses = 60 - (middleImgIndex - i) * 15;
      imgBoxNodeListEl[arrImgNumbers[i]].style.left =
        posImgWithoutMainClasses + "%";
    }
  }

  for (let i = 0; i < imgBoxNodeListEl.length; i += 1) {
    arrImgNumbers.push(i);
    getImgPosition(i);
  }

  function getMainClassesAdd() {
    imgBoxNodeListEl[arrImgNumbers[middleImgIndex - 1]].classList.add(
      "left-neighbor"
    );

    imgBoxNodeListEl[arrImgNumbers[middleImgIndex]].classList.add("active");

    imgBoxNodeListEl[arrImgNumbers[middleImgIndex + 1]].classList.add(
      "right-neighbor"
    );
  }
  getMainClassesAdd();

  function getMainClassesRemove() {
    imgBoxNodeListEl[arrImgNumbers[middleImgIndex - 1]].classList.remove(
      "left-neighbor"
    );
    imgBoxNodeListEl[arrImgNumbers[middleImgIndex]].classList.remove("active");
    imgBoxNodeListEl[arrImgNumbers[middleImgIndex + 1]].classList.remove(
      "right-neighbor"
    );
  }

  function getScrollImgRight() {
    getMainClassesRemove();

    imgBoxNodeListEl[arrImgNumbers[0]].classList.add("last");
    imgBoxNodeListEl[
      arrImgNumbers[imgBoxNodeListEl.length - 1]
    ].classList.remove("last");

    for (let i = 0; i < imgBoxNodeListEl.length; i += 1) {
      arrImgNumbers[i] += 1;
      if (arrImgNumbers[i] > imgBoxNodeListEl.length - 1) {
        arrImgNumbers[i] = 0;
      }
      getImgPosition(i);
    }

    getMainClassesAdd();
  }
  function getScrollImgLeft() {
    getMainClassesRemove();

    imgBoxNodeListEl[arrImgNumbers[0]].classList.remove("last");
    imgBoxNodeListEl[arrImgNumbers[imgBoxNodeListEl.length - 1]].classList.add(
      "last"
    );

    for (let i = 0; i < imgBoxNodeListEl.length; i += 1) {
      arrImgNumbers[i] -= 1;
      if (arrImgNumbers[i] < 0) {
        arrImgNumbers[i] = imgBoxNodeListEl.length - 1;
      }

      getImgPosition(i);
    }

    getMainClassesAdd();
  }

  function getScrollImg(e) {
    if (e.target.offsetParent.classList.contains("right-neighbor")) {
      getScrollImgRight();
    }

    if (e.target.offsetParent.classList.contains("left-neighbor")) {
      getScrollImgLeft();
    }
  }
  function getScrollImgArrow(e) {
    if (e.code === "ArrowRight") {
      getScrollImgRight();
    }

    if (e.code === "ArrowLeft") {
      getScrollImgLeft();
    }
  }

  imgAreaEl.addEventListener("mouseover", getScrollImg);
  document.addEventListener("keyup", getScrollImgArrow);
}
