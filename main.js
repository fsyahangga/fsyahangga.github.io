// main.js

document.addEventListener("DOMContentLoaded", () => {
  initSidebarToggle();
  initSmoothScroll();
  initScrollSpy();
  initSectionReveal(); // ⬅️ tambahkan ini
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

function initSmoothScroll() {
  const links = document.querySelectorAll(".floating-menu a, .sidebar a");
  const sidebar = document.getElementById("sidebar");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Scroll halus ke elemen yang dituju
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Tutup sidebar jika di layar kecil
        if (window.innerWidth <= 768 && sidebar.classList.contains("show")) {
          setTimeout(() => {
            sidebar.classList.remove("show");
          }, 600); // delay agar scroll dulu baru sidebar tertutup
        }
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

function initSectionReveal() {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target); // animasi hanya sekali
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

