// main.js

document.addEventListener("DOMContentLoaded", () => {
  initSidebarToggle();
  initSmoothScroll();
  initScrollSpy();
});

// Toggle sidebar (☰)
function initSidebarToggle() {
  const toggleBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }
}

// Smooth scroll for both floating-menu and sidebar
function initSmoothScroll() {
  const links = document.querySelectorAll(".floating-menu a, .sidebar a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // adjust for navbar height
          behavior: "smooth"
        });
      }
    });
  });
}

// Highlight active section on scroll (ScrollSpy)
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".floating-menu a, .sidebar a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const hrefId = link.getAttribute("href").substring(1);
      if (hrefId === currentSectionId) {
        link.classList.add("active");
      }
    });
  });
}
