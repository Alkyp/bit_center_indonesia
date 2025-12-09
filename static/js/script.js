/* ===========================
   SPLASH SCREEN (muncul sekali)
=========================== */
document.addEventListener("DOMContentLoaded", function () {
    const splash = document.getElementById("splash");

    if (!localStorage.getItem("splashShown")) {
        splash.style.display = "flex";

        setTimeout(() => {
            splash.classList.add("fade-out");
            localStorage.setItem("splashShown", "true");
        }, 3600);

        setTimeout(() => {
            splash.style.display = "none";
        }, 3000);

    } else {
        splash.style.display = "none";
    }
});

/* ===========================
   NAVBAR STICKY
=========================== */
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 20);

    const scrollBtn = document.querySelector(".scroll-up-btn");
    if (scrollBtn) {
        scrollBtn.classList.toggle("show", window.scrollY > 500);
    }
});

/* ===========================
   MENU TOGGLE MOBILE
=========================== */
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".navbar .menu");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            menu.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });
    }

    document.querySelectorAll(".navbar .menu li a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            menuBtn.classList.remove("active");
        });
    });
});

/* ===========================
   SCROLL-UP BUTTON CLICK
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.querySelector(".scroll-up-btn");
    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

/* ===========================
   COUNTER ANIMATION
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const update = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const speed = 200;

            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(update, 10);
            } else {
                counter.innerText = target;
            }
        };

        update();
    });
});

/* ===========================
   PRODUCT SECTION ANIMATION
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const productImg = document.querySelector(".product-image img");
    const labels = document.querySelectorAll(".label");

    function showProductDetails() {
        if (!productImg) return;

        productImg.classList.add("show");

        setTimeout(() => {
            labels.forEach((label, index) => {
                setTimeout(() => {
                    label.classList.add("show");
                }, index * 300);
            });
        }, 500);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showProductDetails();
            }
        });
    });

    const productSection = document.querySelector(".product-section");
    if (productSection) observer.observe(productSection);
});

/* ===========================
   LOGO CAROUSEL (auto scroll)
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".logo-track");
    if (track) {
        const copy = track.cloneNode(true);
        track.parentElement.appendChild(copy);
    }
});

/* ===========================
   OWL CAROUSEL TEAMS
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");

    if (carousel && $(carousel).owlCarousel) {
        $(".carousel").owlCarousel({
            margin: 20,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            }
        });
    }
});

/* ===========================
   HOME BACKGROUND SLIDESHOW
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".home-slide");

    if (slides.length === 0) return;

    function showSlides() {
        slides.forEach(slide => slide.classList.remove("active"));

        slideIndex = (slideIndex + 1) % slides.length;

        slides[slideIndex].classList.add("active");

        setTimeout(showSlides, 4000);
    }

    showSlides();
});

/* ===========================
   HAMBURGER USING JQUERY
=========================== */
$(document).ready(function () {
    $(".hamburger").click(function () {
        $(".navbar .menu").toggleClass("active");
    });

    $(".navbar .menu li a").click(function () {
        $(".navbar .menu").removeClass("active");
    });
});

/* ===========================
   PRODUCT SLIDER (MANUAL)
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.product-prev');
    const nextBtn = document.querySelector('.product-next');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            showSlide(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            showSlide(currentIndex);
        });
    }

    // Tampilkan slide pertama
    showSlide(currentIndex);
});

