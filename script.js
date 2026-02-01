(() => {
  // ===== Settings =====
  const PHONE_E164 = "79197590259"; // без +
  const PHONE_PRETTY = "+7 (919) 759-02-59";
  const ADDRESS = "Ставропольский край, г. Пятигорск, ул. Ермолова, зд. 12";

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // WhatsApp helpers
  const enc = (s) => encodeURIComponent(s);

  function buildMessage(extra = "") {
    return (
      `Здравствуйте! Хочу обратиться в «КомпьюМаркет».\n` +
      `Адрес: ${ADDRESS}\n` +
      (extra ? `${extra}\n` : "") +
      `Спасибо!`
    ).trim();
  }

  function openWhatsApp(extra) {
    const url = `https://wa.me/${PHONE_E164}?text=${enc(buildMessage(extra))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Buttons
  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", fn);
  };

  bind("waHero", () => openWhatsApp("Нужна консультация по ремонту."));
  bind("waCard", () => openWhatsApp("Здравствуйте! Хочу уточнить по ремонту."));
  bind("waPrices", () => openWhatsApp("Хочу уточнить стоимость и сроки ремонта."));
  bind("waContacts", () => openWhatsApp("Здравствуйте! Хочу уточнить по ремонту."));
  bind("waMobile", () => openWhatsApp("Здравствуйте!"));

  // Contact form => WhatsApp prefilled
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      const extra =
        `Заявка с сайта\n` +
        `Имя: ${data.name || "-"}\n` +
        `Телефон: ${data.phone || "-"}\n` +
        `Описание: ${data.message || "-"}`;

      openWhatsApp(extra);
      form.reset();

      setTimeout(() => {
        alert(`Спасибо! Сейчас откроется WhatsApp.\nЕсли не открылся — позвоните: ${PHONE_PRETTY}`);
      }, 50);
    });
  }

  // Mobile menu
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.getElementById("siteNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // close on link click
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("nav-open")) {
          nav.classList.remove("nav-open");
          menuBtn.setAttribute("aria-expanded", "false");
        }
      });
    });

    // close on outside click
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!target) return;
      const clickedInside = nav.contains(target) || menuBtn.contains(target);
      if (!clickedInside && nav.classList.contains("nav-open")) {
        nav.classList.remove("nav-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
