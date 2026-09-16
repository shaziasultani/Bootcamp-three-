/**
 * Axen Ltd - Website Interactivity Script
 * Designed specifically to map onto your exact HTML structure and CSS classes.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. ANIMATED STAT COUNTERS
  // ==========================================
  function initStatCounters() {
    // Targets the original <h3> text nodes within your counter containers
    const counterElements = document.querySelectorAll(
      ".numers h3, .stats strong, .stat-item h3",
    );

    counterElements.forEach((element) => {
      // Extract the original target number (e.g., extracts "472" from "472+")
      const originalText = element.textContent.trim();
      const targetValue = parseInt(originalText.replace(/[^0-9]/g, ""), 10);

      if (isNaN(targetValue)) return; // Skip if no numeric match found

      const duration = 2000; // Animation runs for 2 seconds
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(progress * targetValue);

        // Updates text while maintaining your original "+" style sign formatting
        element.textContent = currentValue + "+";

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = originalText; // Revert to exact original text string at end
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }

  // Fire counter engine
  initStatCounters();

  // ==========================================
  // 2. STICKY NAVBAR BACKGROUND TRANSITION
  // ==========================================
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    // Store your exact initial custom styling definitions to reset back to cleanly
    const initialPosition = navbar.style.position;
    const initialTop = navbar.style.top;
    const initialWidth = navbar.style.width;
    const initialBackground = navbar.style.background;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        // Smoothly inject layout style updates directly without requiring CSS edits
        navbar.style.position = "fixed";
        navbar.style.top = "12px";
        navbar.style.width = "82%";
        navbar.style.background = "rgba(40, 50, 50, 0.75)";
        navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
        navbar.style.transition = "all 0.4s ease";
      } else {
        // Revert seamlessly to your exact initial CSS styles
        navbar.style.position = initialPosition;
        navbar.style.top = initialTop;
        navbar.style.width = initialWidth;
        navbar.style.background = initialBackground;
        navbar.style.boxShadow = "none";
      }
    });
  }

  // ==========================================
  // 3. SMOOTH NAVIGATION CLICK SCROLLING
  // ==========================================
  const menuItems = document.querySelectorAll(".navbar > ul li");
  const heroButtons = document.querySelectorAll(".btn-2 button");

  // Maps index-based navigation seamlessly across your document sections
  const sectionsMapping = [
    document.querySelector(".general"), // HOME
    document.querySelector(".section1"), // ABOUT US
    document.querySelector(".section2"), // SERVICES
    document.querySelector(".client-logos"), // FEATURES
    document.querySelector(".page-shell"), // CONTACT
  ];

  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const targetSection = sectionsMapping[index];
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Map your custom hero action CTA buttons to scroll smoothly down
  heroButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const target =
        index === 0
          ? document.querySelector(".section1")
          : document.querySelector(".section2");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ==========================================
  // 4. LIGHT / DARK THEME INTERACTIVE TOGGLE
  // ==========================================
  // Automatically selects your middle icon (⚙️) from your original icon tray markup
  const targetIcons = document.querySelectorAll(".navbar .icons i");
  const settingsIcon = targetIcons[1]; // Grabs the second icon container element

  if (settingsIcon) {
    settingsIcon.style.cursor = "pointer";

    // Check for saved local browser preferences
    if (localStorage.getItem("theme-preference") === "light") {
      applyThemeStyles(true);
    }

    settingsIcon.addEventListener("click", () => {
      const isCurrentlyLight =
        document.body.style.background.includes("#f8f8f7") === false &&
        document.body.style.backgroundColor === "rgb(250, 250, 250)";
      const toggleToLight = !isCurrentlyLight;

      applyThemeStyles(toggleToLight);
      localStorage.setItem(
        "theme-preference",
        toggleToLight ? "light" : "dark",
      );
    });
  }

  function applyThemeStyles(shouldBeLight) {
    const bodyHeadingElements = document.querySelectorAll(
      ".section1 h1, .left-content h2, .page-shell h1",
    );

    if (shouldBeLight) {
      document.body.style.background = "#fafafa";
      document.body.style.backgroundColor = "#fafafa";
      document.body.style.color = "#111111";
      bodyHeadingElements.forEach((h) => (h.style.color = "#111111"));
    } else {
      // Revert directly back to your exact styling sheet definitions
      document.body.style.background = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      bodyHeadingElements.forEach((h) => (h.style.color = ""));
    }
  }

  // ==========================================
  // 5. SCROLL-DRIVEN VISUAL ENTRANCE
  // ==========================================
  const visualSections = document.querySelectorAll(
    ".section1, .section2, .client-logos, .page-shell, .middle",
  );

  // Preset hidden properties safely via native JS manipulation properties
  visualSections.forEach((sec) => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(30px)";
    sec.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
  });

  const contentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          contentObserver.unobserve(entry.target); // Animates once smoothly
        }
      });
    },
    { threshold: 0.08 },
  );

  visualSections.forEach((sec) => contentObserver.observe(sec));
});
const newsletterForm = document.querySelector(".newsletter-form");
const message = document.querySelector(".form-message");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = newsletterForm.querySelector("input").value;
  message.textContent = `Thank you! ${email} has been subscribed.`;

  newsletterForm.reset();
});
document.querySelector(".contact-button").addEventListener("click", (event) => {
  event.preventDefault();

  event.currentTarget.textContent = "THANK YOU!";

  setTimeout(() => {
    event.currentTarget.innerHTML = 'CONTACT US <span>↗</span>';
  }, 1200);
});