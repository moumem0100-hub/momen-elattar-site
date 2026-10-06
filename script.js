/* =========================================================
   NOIRÉ — SCRIPT.JS
   Luxury Coffee Website
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     SETTINGS
     ========================================================= */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const body = document.body;

  const preloader = document.getElementById("preloader");

  const header = document.querySelector(".site-header");

  const cursor = document.getElementById("cursor");
  const cursorFollower =
    document.getElementById("cursorFollower");

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

  const backTop =
    document.getElementById("backTop");


  /* =========================================================
     PRELOADER
     ========================================================= */

  body.classList.add("is-loading");

  function finishLoading() {
    body.classList.remove("is-loading");
    body.classList.add("page-loaded");

    if (preloader) {
      preloader.classList.add("hidden");

      setTimeout(() => {
        preloader.style.display = "none";
      }, 900);
    }
  }

  if (document.readyState === "complete") {
    setTimeout(
      finishLoading,
      reduceMotion ? 100 : 1200
    );
  } else {
    window.addEventListener(
      "load",
      () => {
        setTimeout(
          finishLoading,
          reduceMotion ? 100 : 1200
        );
      },
      { once: true }
    );
  }


  /* =========================================================
     HEADER
     ========================================================= */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     CUSTOM CURSOR
     ========================================================= */

  if (
    cursor &&
    cursorFollower &&
    finePointer &&
    !reduceMotion
  ) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let followerX = mouseX;
    let followerY = mouseY;

    document.documentElement.classList.add(
      "custom-cursor"
    );

    document.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.transform =
          `translate3d(${mouseX}px, ${mouseY}px, 0) ` +
          `translate(-50%, -50%)`;
      }
    );

    function animateCursor() {
      followerX +=
        (mouseX - followerX) * 0.12;

      followerY +=
        (mouseY - followerY) * 0.12;

      cursorFollower.style.transform =
        `translate3d(${followerX}px, ${followerY}px, 0) ` +
        `translate(-50%, -50%)`;

      requestAnimationFrame(
        animateCursor
      );
    }

    animateCursor();

    const cursorTargets =
      document.querySelectorAll(
        "a, button, .magnetic, " +
        ".experience-card, .gallery-item, .menu-item"
      );

    cursorTargets.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        () => {
          cursor.classList.add(
            "cursor-hover"
          );

          cursorFollower.classList.add(
            "cursor-hover"
          );
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          cursor.classList.remove(
            "cursor-hover"
          );

          cursorFollower.classList.remove(
            "cursor-hover"
          );
        }
      );
    });
  }


  /* =========================================================
     MAGNETIC ELEMENTS
     ========================================================= */

  if (
    finePointer &&
    !reduceMotion
  ) {
    const magneticElements =
      document.querySelectorAll(
        ".magnetic"
      );

    magneticElements.forEach(
      (element) => {

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

            const strength = 0.15;

            element.style.transform =
              `translate3d(${x * strength}px, ` +
              `${y * strength}px, 0)`;
          }
        );

        element.addEventListener(
          "mouseleave",
          () => {
            element.style.transform = "";
          }
        );
      }
    );
  }


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  function openMenu() {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.add("open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("menu-open");
  }

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
      "click",
      () => {

        const opened =
          mobileMenu.classList.contains(
            "open"
          );

        if (opened) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    );

    mobileLinks.forEach(
      (link) => {
        link.addEventListener(
          "click",
          closeMenu
        );
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      }
    );
  }


  /* =========================================================
     SMOOTH ANCHOR SCROLL
     ========================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  anchorLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute("href");

          if (
            !href ||
            href === "#"
          ) {
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

          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: reduceMotion
              ? "auto"
              : "smooth"
          });
        }
      );
    }
  );


  /* =========================================================
     REVEAL ANIMATIONS
     ========================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );

  if (revealElements.length) {

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {

      revealElements.forEach(
        (element) => {
          element.classList.add(
            "visible"
          );
        }
      );

    } else {

      const revealObserver =
        new IntersectionObserver(
          (entries, observer) => {

            entries.forEach(
              (entry) => {

                if (
                  !entry.isIntersecting
                ) {
                  return;
                }

                const delay =
                  Number(
                    entry.target
                      .dataset.delay || 0
                  );

                setTimeout(
                  () => {
                    entry.target.classList.add(
                      "visible"
                    );
                  },
                  delay
                );

                observer.unobserve(
                  entry.target
                );
              }
            );
          },
          {
            threshold: 0.12,
            rootMargin:
              "0px 0px -60px 0px"
          }
        );

      revealElements.forEach(
        (element) => {
          revealObserver.observe(
            element
          );
        }
      );
    }
  }


  /* =========================================================
     PARALLAX
     ========================================================= */

  if (!reduceMotion) {

    const parallaxElements =
      document.querySelectorAll(
        ".hero-media, .night-media"
      );

    let parallaxTicking = false;

    function updateParallax() {

      const viewportHeight =
        window.innerHeight;

      parallaxElements.forEach(
        (element) => {

          const rect =
            element.getBoundingClientRect();

          if (
            rect.bottom < 0 ||
            rect.top > viewportHeight
          ) {
            return;
          }

          const center =
            rect.top +
            rect.height / 2;

          const distance =
            (center -
              viewportHeight / 2) /
            viewportHeight;

          const movement =
            distance * -35;

          element.style.transform =
            `translate3d(0, ${movement}px, 0)`;
        }
      );

      parallaxTicking = false;
    }

    function requestParallax() {

      if (!parallaxTicking) {

        requestAnimationFrame(
          updateParallax
        );

        parallaxTicking = true;
      }
    }

    window.addEventListener(
      "scroll",
      requestParallax,
      { passive: true }
    );

    updateParallax();
  }


  /* =========================================================
     MENU FILTERS
     ========================================================= */

  const filterButtons =
    document.querySelectorAll(
      ".filter-button"
    );

  const menuItems =
    document.querySelectorAll(
      ".menu-item"
    );

  if (
    filterButtons.length &&
    menuItems.length
  ) {

    filterButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const filter =
              button.dataset.filter;

            filterButtons.forEach(
              (item) => {
                item.classList.remove(
                  "active"
                );
              }
            );

            button.classList.add(
              "active"
            );

            menuItems.forEach(
              (item) => {

                const category =
                  item.dataset.category;

                if (
                  filter === "all" ||
                  category === filter
                ) {

                  item.classList.remove(
                    "hidden"
                  );

                  requestAnimationFrame(
                    () => {
                      item.classList.remove(
                        "filter-hidden"
                      );
                    }
                  );

                } else {

                  item.classList.add(
                    "filter-hidden"
                  );

                  setTimeout(
                    () => {
                      item.classList.add(
                        "hidden"
                      );
                    },
                    300
                  );
                }
              }
            );
          }
        );
      }
    );
  }


  /* =========================================================
     BACK TO TOP
     ========================================================= */

  function updateBackTop() {

    if (!backTop) return;

    if (window.scrollY > 700) {
      backTop.classList.add(
        "visible"
      );
    } else {
      backTop.classList.remove(
        "visible"
      );
    }
  }

  updateBackTop();

  window.addEventListener(
    "scroll",
    updateBackTop,
    { passive: true }
  );

  if (backTop) {

    backTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: reduceMotion
            ? "auto"
            : "smooth"
        });
      }
    );
  }


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const navLinks =
    document.querySelectorAll(
      '.site-header a[href^="#"]'
    );

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  if (
    navLinks.length &&
    sections.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              const id =
                entry.target.id;

              navLinks.forEach(
                (link) => {

                  link.classList.remove(
                    "active"
                  );

                  if (
                    link.getAttribute(
                      "href"
                    ) === `#${id}`
                  ) {
                    link.classList.add(
                      "active"
                    );
                  }
                }
              );
            }
          );
        },
        {
          threshold: 0.25,
          rootMargin:
            "-20% 0px -55% 0px"
        }
      );

    sections.forEach(
      (section) => {
        sectionObserver.observe(
          section
        );
      }
    );
  }


  /* =========================================================
     IMAGE LOADING
     ========================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );

  images.forEach(
    (image) => {

      image.addEventListener(
        "load",
        () => {
          image.classList.add(
            "loaded"
          );
        }
      );

      if (image.complete) {
        image.classList.add(
          "loaded"
        );
      }
    }
  );


  /* =========================================================
     KEYBOARD ACCESSIBILITY
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Tab"
      ) {
        body.classList.add(
          "keyboard-user"
        );
      }
    }
  );


  /* =========================================================
     RESIZE
     ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900 &&
        mobileMenu
      ) {
        closeMenu();
      }
    }
  );


  /* =========================================================
     CONSOLE BRANDING
     ========================================================= */

  console.log(
    "%c NOIRÉ ",
    "font-size:28px;font-weight:bold;letter-spacing:8px;"
  );

  console.log(
    "%c Coffee Beyond Ordinary.",
    "font-size:14px;letter-spacing:3px;"
  );
});
