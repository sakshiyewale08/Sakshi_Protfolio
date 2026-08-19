/* =========================================================
   SAKSHI YEWALE — PREMIUM PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });
    }


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    const header = document.querySelector(".header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (sections.length && navLinks.length) {

        window.addEventListener("scroll", () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }

            });

            navLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${currentSection}`) {
                    link.classList.add("active");
                }

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .skill-card, .project-card, .experience-card, .education-card, .contact-card"
    );

    if (revealElements.length) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    /* =====================================================
       NUMBER COUNTER
    ===================================================== */

    const counters = document.querySelectorAll("[data-counter]");

    if (counters.length) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;

                    const target = parseInt(
                        counter.getAttribute("data-counter"),
                        10
                    );

                    let current = 0;

                    const increment = Math.max(
                        1,
                        Math.ceil(target / 50)
                    );

                    const updateCounter = () => {

                        current += increment;

                        if (current >= target) {
                            counter.textContent = target;
                            return;
                        }

                        counter.textContent = current;

                        requestAnimationFrame(updateCounter);
                    };

                    updateCounter();

                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.6
            }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }


    /* =====================================================
       SKILL CARD HOVER EFFECT
    ===================================================== */

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });

    });


    /* =====================================================
       PROJECT FILTER
    ===================================================== */

    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectCards = document.querySelectorAll("[data-category]");

    if (filterButtons.length && projectCards.length) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                const filter = button.getAttribute("data-filter");

                projectCards.forEach(card => {

                    const category =
                        card.getAttribute("data-category");

                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.style.display = "flex";

                        setTimeout(() => {
                            card.classList.add("show");
                        }, 20);

                    } else {

                        card.style.display = "none";
                        card.classList.remove("show");

                    }

                });

            });

        });

    }


    /* =====================================================
       PROJECT CARD TILT EFFECT
       Subtle premium interaction
    ===================================================== */

    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 768) return;

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =====================================================
       COPY EMAIL
    ===================================================== */

    const emailButtons = document.querySelectorAll(
        "[data-copy-email]"
    );

    emailButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const email =
                button.getAttribute("data-copy-email");

            if (!email) return;

            try {

                await navigator.clipboard.writeText(email);

                const originalText =
                    button.textContent;

                button.textContent = "Copied ✓";

                setTimeout(() => {
                    button.textContent = originalText;
                }, 1800);

            } catch (error) {

                console.log(
                    "Unable to copy email."
                );

            }

        });

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CONTACT BUTTON — MAIL
    ===================================================== */

    const contactButtons =
        document.querySelectorAll("[data-contact]");

    contactButtons.forEach(button => {

        button.addEventListener("click", () => {

            window.location.href =
                "mailto:sakshiyewale08@gmail.com" +
                "?subject=Job Opportunity — Sakshi Yewale" +
                "&body=Hello Sakshi,%0D%0A%0D%0A" +
                "I would like to discuss a job opportunity with you.";

        });

    });


    /* =====================================================
       RESUME DOWNLOAD TRACKING
    ===================================================== */

    const resumeLinks =
        document.querySelectorAll(".resume-link");

    resumeLinks.forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                "Resume download clicked"
            );

        });

    });


    /* =====================================================
       CURSOR GLOW
       Desktop only
    ===================================================== */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.innerWidth > 900
    ) {

        document.addEventListener("mousemove", event => {

            cursorGlow.style.transform =
                `translate3d(
                    ${event.clientX}px,
                    ${event.clientY}px,
                    0
                )`;

        });

    }


    /* =====================================================
       HERO TEXT ANIMATION
    ===================================================== */

    const heroElements =
        document.querySelectorAll(
            ".hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-actions"
        );

    heroElements.forEach((element, index) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";

        setTimeout(() => {

            element.style.transition =
                "opacity .7s ease, transform .7s ease";

            element.style.opacity = "1";
            element.style.transform =
                "translateY(0)";

        }, 150 + index * 120);

    });


    /* =====================================================
       CLOSE MOBILE MENU WITH ESC
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (menuToggle && navMenu) {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");

            }

        }

    });


    /* =====================================================
       PREVENT BROKEN IMAGE UI
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            img.classList.add("image-error");

        });

    });


    console.log(
        "Sakshi Yewale Portfolio loaded successfully."
    );

});