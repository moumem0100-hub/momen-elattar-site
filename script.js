/* =========================================================
   TRANSIT — MAIN SCRIPT
   Premium Coffee Experience
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

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

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  /* =========================================================
     PRELOADER
     ========================================================= */

  body.classList.add("is-loading");

  const finishLoading = () => {
    body.classList.remove("is-loading");
    body.classList.add("page-loaded");

    if (preloader) {
      preloader.classList.add("hidden");

      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }
  };

  window.addEventListener(
    "load",
    () => {
      setTimeout(
        finishLoading,
        reducedMotion ? 100 : 1000
      );
    },
    { once: true }
  );


  /* =========================================================
     HEADER
     ========================================================= */

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 50
    );
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const openMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");
    mobileMenu.classList.add("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add("menu-open");
  };

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("menu-open");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener(
      "click",
      () => {
        if (
          mobileMenu.classList.contains("open")
        ) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    );

    mobileLinks.forEach((link) => {
      link.addEventListener(
        "click",
        closeMenu
      );
    });

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
     SMOOTH SCROLL
     ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const id =
            link.getAttribute("href");

          if (!id || id === "#") return;

          const target =
            document.querySelector(id);

          if (!target) return;

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top: position,
            behavior: reducedMotion
              ? "auto"
              : "smooth"
          });
        }
      );
    });


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealItems =
    document.querySelectorAll(".reveal");

  if (revealItems.length) {

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {

      revealItems.forEach((item) => {
        item.classList.add("visible");
      });

    } else {

      const observer =
        new IntersectionObserver(
          (entries, obs) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              const delay =
                Number(
                  entry.target.dataset.delay || 0
                );

              setTimeout(() => {
                entry.target.classList.add(
                  "visible"
                );
              }, delay);

              obs.unobserve(entry.target);
            });
          },
          {
            threshold: 0.12,
            rootMargin:
              "0px 0px -50px 0px"
          }
        );

      revealItems.forEach((item) => {
        observer.observe(item);
      });
    }
  }


  /* =========================================================
     CUSTOM CURSOR
     ========================================================= */

  if (
    cursor &&
    cursorFollower &&
    finePointer &&
    !reducedMotion
  ) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let followerX = mouseX;
    let followerY = mouseY;

    document.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left =
          `${mouseX}px`;

        cursor.style.top =
          `${mouseY}px`;
      }
    );

    const moveFollower = () => {

      followerX +=
        (mouseX - followerX) * 0.12;

      followerY +=
        (mouseY - followerY) * 0.12;

      cursorFollower.style.left =
        `${followerX}px`;

      cursorFollower.style.top =
        `${followerY}px`;

      requestAnimationFrame(
        moveFollower
      );
    };

    moveFollower();

    const interactive =
      document.querySelectorAll(
        "a, button, .magnetic, " +
        ".experience-card, " +
        ".gallery-item, " +
        ".menu-item"
      );

    interactive.forEach((element) => {

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
     MAGNETIC BUTTONS
     ========================================================= */

  if (
    finePointer &&
    !reducedMotion
  ) {

    document
      .querySelectorAll(".magnetic")
      .forEach((element) => {

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
              `translate(${x * 0.12}px, ${y * 0.12}px)`;
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


  /* =========================================================
     PARALLAX
     ========================================================= */

  if (!reducedMotion) {

    const parallaxElements =
      document.querySelectorAll(
        ".hero-media, .night-media"
      );

    let ticking = false;

    const updateParallax = () => {

      parallaxElements.forEach(
        (element) => {

          const rect =
            element.getBoundingClientRect();

          const screen =
            window.innerHeight;

          if (
            rect.bottom < 0 ||
            rect.top > screen
          ) {
            return;
          }

          const distance =
            (rect.top + rect.height / 2) -
            screen / 2;

          const movement =
            distance * -0.035;

          element.style.transform =
            `translate3d(0, ${movement}px, 0)`;
        }
      );

      ticking = false;
    };

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


  /* =========================================================
     MENU FILTER
     ========================================================= */

  const filters =
    document.querySelectorAll(
      ".filter-button"
    );

  const menuItems =
    document.querySelectorAll(
      ".menu-item"
    );

  if (
    filters.length &&
    menuItems.length
  ) {

    filters.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const filter =
            button.dataset.filter;

          filters.forEach((item) => {
            item.classList.remove(
              "active"
            );
          });

          button.classList.add(
            "active"
          );

          menuItems.forEach((item) => {

            const category =
              item.dataset.category;

            const show =
              filter === "all" ||
              category === filter;

            if (show) {
              item.classList.remove(
                "hidden"
              );
            } else {
              item.classList.add(
                "hidden"
              );
            }
          });
        }
      );
    });
  }


  /* =========================================================
     BACK TO TOP
     ========================================================= */

  const updateBackTop = () => {

    if (!backTop) return;

    if (window.scrollY > 600) {
      backTop.classList.add(
        "visible"
      );
    } else {
      backTop.classList.remove(
        "visible"
      );
    }
  };

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
          behavior: reducedMotion
            ? "auto"
            : "smooth"
        });
      }
    );
  }


  /* =========================================================
     RESIZE
     ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900
      ) {
        closeMenu();
      }
    }
  );


  /* =========================================================
     TRANSIT
     ========================================================= */

  console.log(
    "%cTRANSIT",
    "font-size:28px;font-weight:700;letter-spacing:8px;"
  );

  console.log(
    "%cCoffee • Culture • Experience",
    "font-size:12px;letter-spacing:3px;"
  );
});
