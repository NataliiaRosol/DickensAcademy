const headerMenuItems = document.querySelectorAll(".menu-list-item");
const questionsAccordionItems = document.querySelectorAll(
  ".questions-accordion-item"
);

const sliderList = document.querySelector(".testimonials-list");
const slides = document.querySelectorAll(".testimonials-list-item");
const paginationContainer = document.querySelector(".testimonials-pagination");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Header submenu animation
headerMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("animate");

    setTimeout(() => {
      item.classList.remove("animate");
    }, 800);
  });
});

// Header nav
const menuBtn = document.querySelector(".header-menu-icon");
const menuClose = document.querySelector(".header-menu-close");
const menuList = document.querySelector(".header-menu-list");
const loginBtn = document.querySelector(".header-login-btn");

menuBtn.addEventListener("click", () => {
  menuList.classList.toggle("open");
  loginBtn.classList.toggle("btn");
});

menuClose.addEventListener("click", () => {
  menuList.classList.remove("open");
  loginBtn.classList.toggle("btn");
});

// Slider
let currentPage = 0,
  gap,
  slide_width,
  list_width;
let slidesPerPage = 2;
let totalPages = Math.ceil(slides.length / slidesPerPage);

function setSlidesPerPage() {
    
  const screenWidth = window.innerWidth;
  if (screenWidth > 800) {
    slidesPerPage = 2;
  } else {
    slidesPerPage = 1;
  }
  totalPages = Math.ceil(slides.length / slidesPerPage);

  updatePagination();
  updateSlider();
}

function updateSlider() {
  list_width = sliderList.scrollWidth;
  slide_width = slides[0].offsetWidth;
  const offset = currentPage * slidesPerPage * (slide_width + gap);
  sliderList.style.transform = `translateX(-${offset}px)`;
  const track = document.querySelector(".carousel-track");
  let styles = window.getComputedStyle(track);

  gap = parseInt(styles.getPropertyValue("--gap"));
  perPage = parseInt(styles.getPropertyValue("--perPage"));

  if (currentPage === 0) {
    prevBtn.classList.add("inactive");
  } else if (currentPage === totalPages - 1) {
    nextBtn.classList.add("inactive");
  } else {
    prevBtn.classList.remove("inactive");
    nextBtn.classList.remove("inactive");
  }
}

function updatePagination() {
  paginationContainer.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("testimonials-pagination-dots");
    if (i === currentPage) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentPage = i;
      updateSlider();
      updatePagination();
    });
    paginationContainer.appendChild(dot);
  }
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updateSlider();
    updatePagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateSlider();
    updatePagination();
  }
});

window.addEventListener('resize', setSlidesPerPage);

setSlidesPerPage();
updateSlider();
updatePagination();

questionsAccordionItems.forEach((item) => {
  const itemTitle = item.querySelector(".questions-accordion-item-wrapper");

  itemTitle.addEventListener("click", () => {
    questionsAccordionItems.forEach((elem) => {
      if (elem !== item) {
        elem.classList.remove("active");
      }
    });
    item.classList.toggle("active");
  });
});
