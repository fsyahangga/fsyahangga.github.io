// main.js

document.addEventListener("DOMContentLoaded", () => {
  initdotsBg();
  setCanvasHeightToScroll();
  initSidebarToggle();
  initSmoothScroll();
  initScrollSpy();
  initSectionShow();
  initAbout();
  initAboutReveal();
  initServices();
  initExperiences();
  initSectionReveal(); // ⬅️ tambahkan ini
  initProjectReveal();
  initTestimonialSlider();
  initDividerReveal(); 
  AnimateOnScroll();
  observeGearIcon();
  getPopUpQR();
  observeLogoWrapper();
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 10) {
    nav.style.background = 'rgba(30, 41, 59, 0.9)';
  } else {
    nav.style.background = 'rgba(30, 41, 59, 0.6)';
  }
});
window.addEventListener("resize", () => {
  resizeDotsCanvas();
  setCanvasHeightToScroll();
});
window.addEventListener('load', resizeDotsCanvas);

function resizeDotsCanvas() {
  const canvas = document.getElementById('dots-bg');
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}
function setCanvasHeightToScroll() {
  const canvas = document.getElementById('dots-bg');
  if (canvas) {
    canvas.height = document.body.scrollHeight;
  }
}


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

function initProjectReveal() {
 // --- animasi scroll untuk project card ---
  const cards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}
function initSectionShow() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // opsional: hanya animasi sekali
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

function initTestimonialSlider() {
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  function getSlideWidth() {
    const visibleCard = cards[0];
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap || 0);
    return visibleCard.offsetWidth + gap;
  }
  function updateDots() {
    const allDots = document.querySelectorAll('.carousel-dot');
    allDots.forEach(dot => dot.classList.remove('active'));
    allDots[currentIndex].classList.add('active');
  }
  function updateCarousel() {
    const slideWidth = getSlideWidth();
    const totalTranslate = currentIndex * slideWidth;
    track.style.transform = `translateX(-${totalTranslate}px)`;

    updateDots();
  }

  function goTo(index) {
    currentIndex = (index + cards.length) % cards.length;
    updateCarousel();
  }

  function goNext() {
    goTo(currentIndex + 1);
  }

  function goPrev() {
    goTo(currentIndex - 1);
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);
  window.addEventListener("resize", updateCarousel);

  // Buat dot untuk setiap testimonial card
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active'); // dot pertama aktif
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      currentIndex  = i;
      updateCarousel();
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });

  
  // Auto slide
  setInterval(goNext, 5000);

  updateCarousel();
}



function initAbout(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-card').forEach(card => {
    observer.observe(card);
  });
}
function initExperiences(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // hanya sekali animasi
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.experience-item').forEach(item => {
    observer.observe(item);
  });
}
function initAboutReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initServices(){
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeEls.forEach(el => observer.observe(el));
}

function getPopUpQR(){
  document.querySelector('.qr-popup-button').addEventListener('click', function () {
    document.getElementById('qrPopup').style.display = 'flex';
  });
}

function initDividerReveal() {
  const dividers = document.querySelectorAll(".section-divider-wrapper");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // hanya animasi sekali
      }
    });
  }, {
    threshold: 0.2
  });

  dividers.forEach(divider => observer.observe(divider));
}

function observeGearIcon() {
  const gears = document.querySelectorAll('.observe-gear svg');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  gears.forEach(icon => {
    icon.style.animation = 'rotateGearInfinite 4s linear infinite';
    icon.style.animationPlayState = 'paused';
    observer.observe(icon);
  });
}
function observeLogoWrapper(){
  const observers = document.querySelectorAll('.logo-wrapper');

  const bounceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('bounce-in-view');
      } else {
        entry.target.classList.remove('bounce-in-view');
      }
    });
  }, {
    threshold: 0.3
  });

  observers.forEach(el => bounceObserver.observe(el));
}

function AnimateOnScroll(){
  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function initdotsBg(){
  const canvas = document.getElementById('dots-bg');
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dots = [];
  const numDots = 180;
  let mouse = { x: width / 2, y: height / 2 };
  let scrollY = 0;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createDots();
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function createDots() {
    dots = [];
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        opacity: Math.random() * 0.4 + 0.3,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * 0.01 + 0.002,
        direction: 1
      });
    }
  }

  function drawLine(dot1, dot2, dist) {
    const opacity = 1 - dist / 120;
    ctx.beginPath();
    ctx.moveTo(dot1.x, dot1.y);
    ctx.lineTo(dot2.x, dot2.y);
    ctx.strokeStyle = `rgba(0, 255, 145, ${opacity * 0.3})`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  function animateDots() {
    ctx.clearRect(0, 0, width, height);

    dots.forEach((dot, i) => {
      const dx = mouse.x - dot.x;
      const dy = (mouse.y + scrollY) - dot.y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      const maxMouseDist = 150;
      const influence = Math.max(0, (maxMouseDist - distToMouse) / maxMouseDist);

      dot.x += dot.dx + (dx / distToMouse || 0) * influence * 0.4;
      dot.y += dot.dy + (dy / distToMouse || 0) * influence * 0.4;

      dot.y += scrollY * 0.0005;

      if (dot.x < 0 || dot.x > width) dot.dx *= -1;
      if (dot.y < 0 || dot.y > height) dot.dy *= -1;

      dot.opacity += dot.pulse * dot.direction;
      if (dot.opacity >= 0.9 || dot.opacity <= 0.2) dot.direction *= -1;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 145, ${dot.opacity})`;
      ctx.shadowColor = 'rgba(0, 255, 145, 0.5)';
      ctx.shadowBlur = 6;
      ctx.fill();

      for (let j = i + 1; j < dots.length; j++) {
        const otherDot = dots[j];
        const dx = dot.x - otherDot.x;
        const dy = dot.y - otherDot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          drawLine(dot, otherDot, dist);
        }
      }
    });

    requestAnimationFrame(animateDots);
  }

  resizeCanvas();
  animateDots();
}
