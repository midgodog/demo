document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });
  }

  const minDate = new Date();
  const localISO = date => {
    const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return d.toISOString().slice(0, 10);
  };
  ["quickCheckIn", "quickCheckOut", "checkIn", "checkOut"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.min = localISO(minDate);
  });

  const quickBook = document.getElementById("quickBook");
  if (quickBook) {
    quickBook.addEventListener("click", event => {
      const ci = document.getElementById("quickCheckIn")?.value;
      const co = document.getElementById("quickCheckOut")?.value;
      const guests = document.getElementById("quickGuests")?.value || "2 Guests";
      if (ci || co) {
        event.preventDefault();
        const params = new URLSearchParams();
        if (ci) params.set("checkIn", ci);
        if (co) params.set("checkOut", co);
        params.set("guests", guests.split(" ")[0]);
        window.location.href = `booking.html?${params.toString()}`;
      }
    });
  }

  const account = document.getElementById("navAccount");
  const activeUser = localStorage.getItem("aureliaCurrentUser");
  if (account && activeUser) {
    try {
      const user = JSON.parse(activeUser);
      account.textContent = `Hi, ${user.name.split(" ")[0]}`;
      account.href = "#";
      account.addEventListener("click", event => {
        event.preventDefault();
        if (confirm("Sign out of your Aurelia demo account?")) {
          localStorage.removeItem("aureliaCurrentUser");
          window.location.reload();
        }
      });
    } catch (_) {}
  }
});