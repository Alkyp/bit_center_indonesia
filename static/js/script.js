/* ============================================================
   SEMUA SCRIPT DIJALANKAN SAAT DOM SUDAH SIAP
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
            }, 3000);

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
       MENU TOGGLE MOBILE
    ============================ */
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
            if (menuBtn) menuBtn.classList.remove("active");
        });
    });

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
       COUNTER ANIMATION
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
       LOGO CAROUSEL AUTO SCROLL
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
       HOME SLIDESHOW
    ============================ */
    const homeSlides = document.querySelectorAll(".home-slide");
    if (homeSlides.length > 0) {
        let homeIndex = 0;

        function showHomeSlides() {
            homeSlides.forEach(slide => slide.classList.remove("active"));
            homeIndex = (homeIndex + 1) % homeSlides.length;
            homeSlides[homeIndex].classList.add("active");
            setTimeout(showHomeSlides, 4000);
        }

        showHomeSlides();
    }

    /* ===========================
       HAMBURGER (jQuery)
    ============================ */
    $(".hamburger").click(function () {
        $(".navbar .menu").toggleClass("active");
    });

    $(".navbar .menu li a").click(function () {
        $(".navbar .menu").removeClass("active");
    });

    /* ===========================
       PRODUCT SLIDER (MANUAL)
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
       SERVICES SLIDER (MANUAL)
    ============================ */
    const serviceSlides = document.querySelectorAll('.service-slide');
    const servicePrev = document.querySelector('.service-prev');
    const serviceNext = document.querySelector('.service-next');
    let serviceIndex = 0;

    function showServiceSlide(index) {
        serviceSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
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
       NAVBAR DROPDOWN (Desktop & Mobile)
    ============================ */
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(drop => {
        const link = drop.querySelector("a");
        const submenu = drop.querySelector(".dropdown-menu");

        // Mobile – klik buka
        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                submenu.classList.toggle("active");
            }
        });

        // Desktop – hover buka
        drop.addEventListener("mouseenter", () => {
            if (window.innerWidth > 768) submenu.classList.add("active");
        });

        drop.addEventListener("mouseleave", () => {
            if (window.innerWidth > 768) submenu.classList.remove("active");
        });
    });
    /* ===========================
    SLIDER CENTER
    =========================== */
    const slides = document.querySelectorAll(".center-slide");
    const prevBtn = document.querySelector(".center-prev");
    const nextBtn = document.querySelector(".center-next");

    let index = 0;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[i].classList.add("active");
    }

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    });

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    });

    showSlide(index);

    /* ===========================
    TESTIMONI MODAL
    =========================== */
    const cards = document.querySelectorAll(".testimoni .card");
    const modal = document.getElementById("testimoniModal");
    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalText = document.getElementById("modalText");
    const modalClose = document.querySelector(".modal-close");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img").src;
            const name = card.querySelector(".text").innerText;
            const text = card.querySelector("p").innerText;

            modalImg.src = img;
            modalName.innerText = name;
            modalText.innerText = text;

            modal.style.display = "flex";
        });
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });




}); // END DOMContentLoaded
