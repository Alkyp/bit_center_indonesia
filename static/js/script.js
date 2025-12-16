/* ============================================================
   MAIN SCRIPT - REFACTOR
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       SPLASH SCREEN
    =========================== */
    const splash = document.getElementById("splash");
    if (splash) {
        if (!localStorage.getItem("splashShown")) {
            splash.style.display = "flex";

            setTimeout(() => {
                splash.classList.add("fade-out");
                localStorage.setItem("splashShown", "true");
            }, 3600);

            setTimeout(() => splash.style.display = "none", 4000);
        } else {
            splash.style.display = "none";
        }
    }

    /* ===========================
       NAVBAR STICKY & SCROLL UP BUTTON
    =========================== */
    const navbar = document.querySelector(".navbar");
    const scrollBtn = document.querySelector(".scroll-up-btn");

    window.addEventListener("scroll", () => {
        if (navbar) navbar.classList.toggle("sticky", window.scrollY > 20);
        if (scrollBtn) scrollBtn.classList.toggle("show", window.scrollY > 500);
    });

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    /* ===========================
       HAMBURGER MENU
    =========================== */
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".navbar .menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });

        document.querySelectorAll(".navbar .menu li a").forEach(link => {
            link.addEventListener("click", (e) => {
                const parentLi = link.parentElement;
                if (!parentLi.classList.contains("dropdown")) {
                    menu.classList.remove("active");
                    hamburger.classList.remove("active");
                } else e.preventDefault();
            });
        });
    }

    /* ===========================
       COUNTER
    =========================== */
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const speed = 200;

        const updateCounter = () => {
            let count = +counter.innerText || 0;
            const increment = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                requestAnimationFrame(updateCounter);
            } else counter.innerText = target;
        };

        updateCounter();
    });

    /* ===========================
       PRODUCT SECTION ANIMATION
    =========================== */
    const productImg = document.querySelector(".product-image img");
    const labels = document.querySelectorAll(".label");
    const productSection = document.querySelector(".product-section");

    if (productSection && productImg) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    productImg.classList.add("show");
                    labels.forEach((label, index) => {
                        setTimeout(() => label.classList.add("show"), index * 300);
                    });
                }
            });
        });
        observer.observe(productSection);
    }

    /* ===========================
       LOGO CAROUSEL INFINITE
    =========================== */
    const logoTrack = document.querySelector(".logo-track");
    if (logoTrack) {
        const clone = logoTrack.cloneNode(true);
        logoTrack.parentElement.appendChild(clone);
    }

    /* ===========================
       OWL CAROUSEL
    =========================== */
    if ($(".carousel").owlCarousel) {
        $(".carousel").owlCarousel({
            margin: 20,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }
        });
    }

    /* ===========================
       HOME SLIDESHOW AUTO
    =========================== */
    const homeSlides = document.querySelectorAll(".home-slide");
    if (homeSlides.length) {
        let i = 0;
        const showHomeSlides = () => {
            homeSlides.forEach(slide => slide.classList.remove("active"));
            i = (i + 1) % homeSlides.length;
            homeSlides[i].classList.add("active");
            setTimeout(showHomeSlides, 4000);
        };
        showHomeSlides();
    }

    /* ===========================
       PRODUCT & SERVICE SLIDERS
    =========================== */
    const initSlider = (slidesSelector, prevBtn, nextBtn) => {
        const slides = document.querySelectorAll(slidesSelector);
        let index = 0;

        const showSlide = i => slides.forEach((slide, idx) => slide.classList.toggle("active", idx === i));

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index === 0) ? slides.length - 1 : index - 1;
                showSlide(index);
            });
            nextBtn.addEventListener("click", () => {
                index = (index === slides.length - 1) ? 0 : index + 1;
                showSlide(index);
            });
        }

        showSlide(index);
    };

    initSlider(".product-slide", document.querySelector(".product-prev"), document.querySelector(".product-next"));
    initSlider(".service-slide", document.querySelector(".service-prev"), document.querySelector(".service-next"));

    /* ===========================
       DROPDOWN NAVBAR (MOBILE + DESKTOP)
    =========================== */
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(drop => {
        const link = drop.querySelector("a");
        const submenu = drop.querySelector(".dropdown-menu");

        link.addEventListener("click", e => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                dropdowns.forEach(other => {
                    if (other !== drop) other.querySelector(".dropdown-menu").classList.remove("active");
                });
                submenu.classList.toggle("active");
            }
        });

        drop.addEventListener("mouseenter", () => window.innerWidth > 900 && submenu.classList.add("active"));
        drop.addEventListener("mouseleave", () => window.innerWidth > 900 && submenu.classList.remove("active"));
    });

    document.addEventListener("click", e => {
        if (window.innerWidth > 900) return;
        dropdowns.forEach(drop => {
            if (!drop.contains(e.target)) drop.querySelector(".dropdown-menu").classList.remove("active");
        });
    });

    /* ===========================
       TESTIMONI MODAL
    =========================== */
    const cards = document.querySelectorAll(".testimoni .card");
    const modal = document.getElementById("testimoniModal");
    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalText = document.getElementById("modalText");
    const modalClose = document.querySelector(".modal-close");

    // Klik card untuk buka modal
    cards.forEach(card => {
        card.addEventListener("click", () => {
            modalImg.src = card.querySelector("img").src;
            modalName.innerText = card.querySelector(".text").innerText;
            modalText.innerText = card.querySelector("p").innerText;
            modal.style.display = "flex";
        });
    });

    // Klik tombol close
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Klik di luar modal content untuk tutup
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Tekan Escape untuk tutup modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });

    /* ===========================
       ABOUT SLIDER AUTO
    =========================== */
    const aboutSlides = document.querySelectorAll(".about-slider img");
    if (aboutSlides.length) {
        let currentSlide = 0;
        const showNextSlide = () => {
            aboutSlides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % aboutSlides.length;
            aboutSlides[currentSlide].classList.add("active");
        };
        setInterval(showNextSlide, 4000);
    }

    /* ===========================
       PRODUCT CARD TAP (MOBILE)
    =========================== */
    const productCards = document.querySelectorAll(".product-container .card");

    productCards.forEach(card => {
        card.addEventListener("click", () => {
            if (window.innerWidth <= 1024) {
                productCards.forEach(c => c !== card && c.classList.remove("active"));
                card.classList.toggle("active");
            }
        });
    });

    document.querySelectorAll(".product-container .card a").forEach(link => link.addEventListener("click", e => e.stopPropagation()));

    /* ===========================
       PANELS CENTER INTERACTION
    =========================== */
    const panels = document.querySelectorAll('.center .panel');
    panels.forEach(panel => panel.addEventListener('click', () => {
        panels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
    }));

});
