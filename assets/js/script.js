'use strict';

// ------------------ Utility Functions ------------------
const elementToggleFunc = (elem) => { elem.classList.toggle("active"); }

// ------------------ Sidebar ------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// ------------------ Testimonials Modal ------------------
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
    item.addEventListener("click", () => {
        modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
    });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// ------------------ Custom Select + Filter ------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle select dropdown
select.addEventListener("click", () => elementToggleFunc(select));

// Filter function
const filterFunc = (selectedValue) => {
    selectedValue = selectedValue.toLowerCase().replace(/\s/g,'');
    filterItems.forEach(item => {
        const category = item.dataset.category.toLowerCase().replace(/\s/g,'');
        if(selectedValue === "all" || category === selectedValue){
            item.classList.add("active");
            item.classList.remove("inactive");
        } else {
            item.classList.remove("active");
            item.classList.add("inactive");
        }
    });
};

// Filter buttons
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        const selectedValueText = this.innerText;
        selectValue.innerText = selectedValueText;
        filterFunc(selectedValueText);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
});

// Select dropdown items
selectItems.forEach(item => {
    item.addEventListener("click", () => {
        const selectedValueText = item.innerText;
        selectValue.innerText = selectedValueText;
        filterFunc(selectedValueText);
        select.classList.remove("active");
    });
});

// ------------------ Project Overlay ------------------


// ------------------ Page Navigation ------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(navLink => {
    navLink.addEventListener("click", function() {
        const pageName = this.innerText.trim().toLowerCase();

        pages.forEach(page => {
            if(page.dataset.page === pageName){
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }
        });

        navigationLinks.forEach(link => {
            if(link === this) link.classList.add("active");
            else link.classList.remove("active");
        });

        window.scrollTo(0, 0);
    });
});

