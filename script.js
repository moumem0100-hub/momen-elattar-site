document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".site-header");
  const preloader = document.getElementById("preloader");

  /* =========================
     PRELOADER
  ========================= */

  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("hidden");
        body.classList.add("page-loaded");

        setTimeout(() => {
          preloader.style.display = "none";
        }, 700);
      }, 900);
    });
  } else {
    body.classList.add("page-loaded");
  }


  /* =========================
     HEADER
  ========================= */

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 50
    );
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {
      const isOpen =
        mobileMenu.classList.toggle("open");

      menuButton.classList.toggle(
        "active",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      mobileMenu.setAttribute(
        "aria-hidden",
        String(!isOpen)
      );

      body.classList.toggle(
        "menu-open",
        isOpen
      );
    });


    mobileMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          menuButton.classList.remove("active");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          mobileMenu.setAttribute(
            "aria-hidden",
            "true"
          );

          body.classList.remove(
            "menu-open"
          );
        });
      });


    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {

          mobileMenu.classList.remove(
            "open"
          );

          menuButton.classList.remove(
            "active"
          );

          body.classList.remove(
            "menu-open"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          mobileMenu.setAttribute(
            "aria-hidden",
            "true"
          );
        }
      }
    );
  }


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute("href");

          if (!href || href === "#") {
            return;
          }

          const target =
            document.querySelector(href);

          if (!target) return;

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top,
            behavior: "smooth"
          });
        }
      );
    });


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* =========================
     MENU FILTER
  ========================= */

  const filterButtons =
    document.querySelectorAll(
      ".filter-button"
    );

  const menuItems =
    document.querySelectorAll(
      ".menu-item"
    );

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const selected =
        button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      menuItems.forEach((item) => {

        const category =
          item.dataset.category;

        if (
          selected === "all" ||
          category === selected
        ) {
          item.classList.remove(
            "hidden"
          );
        } else {
          item.classList.add(
            "hidden"
          );
        }

      });
    });

  });


  /* =========================
     PARALLAX
  ========================= */

  const parallaxElements =
    document.querySelectorAll(
      ".hero-media, .night-media"
    );

  if (parallaxElements.length) {

    let ticking = false;

    function updateParallax() {

      parallaxElements.forEach(
        (element) => {

          const rect =
            element.getBoundingClientRect();

          const viewport =
            window.innerHeight;

          if (
            rect.bottom < 0 ||
            rect.top > viewport
          ) {
            return;
          }

          const distance =
            (rect.top - viewport / 2) *
            -0.025;

          element.style.transform =
            `translate3d(0, ${distance}px, 0)`;
        }
      );

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          requestAnimationFrame(
            updateParallax
          );

          ticking = true;
        }

      },
      { passive: true }
    );
  }


  /* =========================
     BACK TO TOP
  ========================= */

  const backTop =
    document.getElementById("backTop");

  if (backTop) {

    window.addEventListener(
      "scroll",
      () => {

        backTop.classList.toggle(
          "visible",
          window.scrollY > 600
        );

      },
      { passive: true }
    );


    backTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );
  }


  /* =========================
     MAGNETIC BUTTONS
  ========================= */

  const magnetic =
    document.querySelectorAll(
      ".magnetic"
    );

  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    magnetic.forEach((element) => {

      element.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          element.style.transform =
            `translate(${x * 0.1}px, ${y * 0.1}px)`;
        }
      );


      element.addEventListener(
        "mouseleave",
        () => {
          element.style.transform = "";
        }
      );

    });
  }


  /* =========================
     RESIZE
  ========================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900 &&
        mobileMenu
      ) {
        mobileMenu.classList.remove(
          "open"
        );

        body.classList.remove(
          "menu-open"
        );
      }

    }
  );

});
