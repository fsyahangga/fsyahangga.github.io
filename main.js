// main.js

document.addEventListener("DOMContentLoaded", () => {
  initDotsBg();
  initDotsCanvas();
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
  clearTimeout(window._dotsResizeTimer);
  window._dotsResizeTimer = setTimeout(initDotsBg, 300); 
});
// window.addEventListener('load', resizeDotsCanvas);

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

function initDotsBg() {
  const svg = document.getElementById('dots-bg-svg');
  if (!svg) return;

  const width = window.innerWidth;
  const height = document.body.scrollHeight;

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.innerHTML = ''; // reset

  const isMobile = width < 768;
  const totalDots = isMobile ? 30 : 200; // ringan di mobile

  for (let i = 0; i < totalDots; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = Math.random() * 1.2 + 0.4;

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cy);
    dot.setAttribute('r', r);
    dot.setAttribute('class', 'dot');
    dot.style.animationDelay = `${Math.random() * 6}s`;
    svg.appendChild(dot);
  }
}

function initDotsCanvas() {
  const canvas = document.getElementById('dots-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const totalDots = window.innerWidth < 768 ? 60 : 200;

  // Buat dots dengan warna gradasi hijau acak
  const dots = Array.from({ length: totalDots }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.4,
    speedY: Math.random() * 0.3 + 0.1,
    alpha: Math.random() * 0.5 + 0.3,
    phase: Math.random() * Math.PI * 2,
    glowCanvas: createGlowCanvas(getRandomGreenHue()) // 👈 simpan canvas glow unik
  }));

  function getRandomGreenHue() {
    const greenBase = 120;
    const offset = Math.floor(Math.random() * 30 - 15); // -15 hingga +15
    return greenBase + offset;
  }

  function createGlowCanvas(hue) {
    const size = 20;
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = size;
    glowCanvas.height = size;
    const gCtx = glowCanvas.getContext('2d');

    const gradient = gCtx.createRadialGradient(10, 10, 0, 10, 10, 10);
    gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.8)`);
    gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);

    gCtx.fillStyle = gradient;
    gCtx.beginPath();
    gCtx.arc(10, 10, 10, 0, Math.PI * 2);
    gCtx.fill();

    return glowCanvas;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
      dot.y += dot.speedY;
      if (dot.y > canvas.height) dot.y = 0;
      dot.alpha = 0.4 + 0.3 * Math.sin(dot.phase += 0.01);

      const size = dot.r * 10;
      ctx.globalAlpha = dot.alpha;
      ctx.drawImage(dot.glowCanvas, dot.x - size / 2, dot.y - size / 2, size, size);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();
}



