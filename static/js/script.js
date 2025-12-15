/* ============================================================
   MAIN SCRIPT - GABUNGAN SEMUA FITUR WEBSITE
============================================================ */

/* ===========================
   SLIDER UTAMA
=========================== */
let index = 0;
const slides = document.getElementById("slides");
const total = document.querySelectorAll(".slide").length;

function moveSlide(dir) {
    index = (index + dir + total) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

/* ============================================================
   SEMUA SCRIPT DIJALANKAN SAAT DOM SIAP
============================================================ */
document.addEventListener("DOMContentLoaded", function () {

    /* ===========================
       SPLASH SCREEN
    ============================ */
    const splash = document.getElementById("splash");
    if (splash) {
        if (!localStorage.getItem("splashShown")) {
            splash.style.display = "flex";

            setTimeout(() => {
                splash.classList.add("fade-out");
                localStorage.setItem("splashShown", "true");
            }, 3600);

            setTimeout(() => {
                splash.style.display = "none";
            }, 4000);

        } else {
            splash.style.display = "none";
        }
    }

    /* ===========================
       NAVBAR STICKY
    ============================ */
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.toggle("sticky", window.scrollY > 20);

        const scrollBtn = document.querySelector(".scroll-up-btn");
        if (scrollBtn) scrollBtn.classList.toggle("show", window.scrollY > 500);
    });

    /* ===========================
       HAMBURGER MENU
    ============================ */
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".navbar .menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });

        // Tutup menu saat klik link biasa, kecuali dropdown
        document.querySelectorAll(".navbar .menu li a").forEach(link => {
            link.addEventListener("click", (e) => {
                const parentLi = link.parentElement;

                if (parentLi.classList.contains("dropdown")) {
                    e.preventDefault();
                    return;
                }

                menu.classList.remove("active");
                hamburger.classList.remove("active");
            });
        });
    }

    /* ===========================
       SCROLL-UP BUTTON
    ============================ */
    const scrollBtn = document.querySelector(".scroll-up-btn");
    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ===========================
       COUNTER
    ============================ */
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

    /* ===========================
       PRODUCT SECTION ANIMATION
    ============================ */
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

    const productSection = document.querySelector(".product-section");
    if (productSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) showProductDetails();
            });
        });
        observer.observe(productSection);
    }

    /* ===========================
       LOGO CAROUSEL (INFINITE)
    ============================ */
    const track = document.querySelector(".logo-track");
    if (track) {
        const copy = track.cloneNode(true);
        track.parentElement.appendChild(copy);
    }

    /* ===========================
       OWL CAROUSEL
    ============================ */
    if ($(".carousel").owlCarousel) {
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

    /* ===========================
       HOME SLIDESHOW AUTO
    ============================ */
    const homeSlides = document.querySelectorAll(".home-slide");
    if (homeSlides.length > 0) {
        let i = 0;

        function showHomeSlides() {
            homeSlides.forEach(slide => slide.classList.remove("active"));
            i = (i + 1) % homeSlides.length;
            homeSlides[i].classList.add("active");
            setTimeout(showHomeSlides, 4000);
        }

        showHomeSlides();
    }

    /* ===========================
       PRODUCT SLIDER
    ============================ */
    const productSlides = document.querySelectorAll('.product-slide');
    const productPrev = document.querySelector('.product-prev');
    const productNext = document.querySelector('.product-next');
    let productIndex = 0;

    function showProductSlide(index) {
        productSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    if (productPrev && productNext) {
        productPrev.addEventListener('click', () => {
            productIndex = (productIndex === 0) ? productSlides.length - 1 : productIndex - 1;
            showProductSlide(productIndex);
        });

        productNext.addEventListener('click', () => {
            productIndex = (productIndex === productSlides.length - 1) ? 0 : productIndex + 1;
            showProductSlide(productIndex);
        });
    }

    showProductSlide(productIndex);

    /* ===========================
       SERVICES SLIDER
    ============================ */
    const serviceSlides = document.querySelectorAll('.service-slide');
    const servicePrev = document.querySelector('.service-prev');
    const serviceNext = document.querySelector('.service-next');
    let serviceIndex = 0;

    function showServiceSlide(index) {
        serviceSlides.forEach((slide, i) =>
            slide.classList.toggle('active', i === index)
        );
    }

    if (servicePrev && serviceNext) {
        servicePrev.addEventListener('click', () => {
            serviceIndex = (serviceIndex === 0) ? serviceSlides.length - 1 : serviceIndex - 1;
            showServiceSlide(serviceIndex);
        });

        serviceNext.addEventListener('click', () => {
            serviceIndex = (serviceIndex === serviceSlides.length - 1) ? 0 : serviceIndex + 1;
            showServiceSlide(serviceIndex);
        });
    }

    showServiceSlide(serviceIndex);

    /* ===========================
       DROPDOWN NAVBAR (MOBILE + DESKTOP)
    ============================ */
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(drop => {
        const link = drop.querySelector("a");
        const submenu = drop.querySelector(".dropdown-menu");

        // MOBILE
        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();

                dropdowns.forEach(other => {
                    if (other !== drop) {
                        const otherMenu = other.querySelector(".dropdown-menu");
                        otherMenu.classList.remove("active");
                    }
                });

                submenu.classList.toggle("active");
            }
        });

        // DESKTOP
        drop.addEventListener("mouseenter", () => {
            if (window.innerWidth > 900) submenu.classList.add("active");
        });

        drop.addEventListener("mouseleave", () => {
            if (window.innerWidth > 900) submenu.classList.remove("active");
        });
    });

    // Klik luar → tutup dropdown (mobile)
    document.addEventListener("click", function (e) {
        if (window.innerWidth > 900) return;

        dropdowns.forEach(drop => {
            const submenu = drop.querySelector(".dropdown-menu");
            if (!drop.contains(e.target)) submenu.classList.remove("active");
        });
    });

    /* ===========================
       TESTIMONI MODAL
    ============================ */
    const cards = document.querySelectorAll(".testimoni .card");
    const modal = document.getElementById("testimoniModal");
    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalText = document.getElementById("modalText");
    const modalClose = document.querySelector(".modal-close");

    if (cards && modal && modalClose) {
        cards.forEach(card => {
            card.addEventListener("click", () => {
                modalImg.src = card.querySelector("img").src;
                modalName.innerText = card.querySelector(".text").innerText;
                modalText.innerText = card.querySelector("p").innerText;

                modal.style.display = "flex";
            });
        });

        modalClose.addEventListener("click", () => {
            modal.style.display = "none";
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }

        const slides = document.querySelectorAll(".about-slider img");
    let currentSlide = 0;

    function showNextSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    // Auto slide setiap 4 detik
    setInterval(showNextSlide, 4000);

}); // END DOM
