document.addEventListener("DOMContentLoaded", () => {
  // Menuja responsive për telefon dhe tablet
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.textContent = isOpen ? "✕" : "☰";
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Viti aktual në footer
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Mos lejo datë të kaluar në formular
  const dateInput = document.querySelector("#date");
  if (dateInput) {
    const now = new Date();
    dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
  }

  // Formulari hap WhatsApp me kërkesën e rezervimit
  const form = document.querySelector("#booking-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);

      const message = [
        "Përshëndetje Barber House! Dua të kërkoj një termin.",
        `Emri: ${data.get("name")}`,
        `Telefoni: ${data.get("phone")}`,
        `Shërbimi: ${data.get("service")}`,
        `Data: ${data.get("date")}`,
        `Ora: ${data.get("time")}`,
        data.get("message") ? `Shënim: ${data.get("message")}` : ""
      ].filter(Boolean).join("\n");

      // Zëvendësoje me numrin real të WhatsApp-it, me prefiks shteti,
      // pa shenjën +, pa hapësira (p.sh. 3897XXXXXXXX).
      const whatsappNumber = "38970123456";
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener"
      );
    });
  }
});