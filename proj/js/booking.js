document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  const byId = id => document.getElementById(id);
  const prices = {"Deluxe Retreat":6500,"Premier Suite":9800,"Signature Villa":18500};
  const params = new URLSearchParams(window.location.search);
  if (params.get("room") && prices[params.get("room")]) byId("roomType").value = params.get("room");
  if (params.get("checkIn")) byId("checkIn").value = params.get("checkIn");
  if (params.get("checkOut")) byId("checkOut").value = params.get("checkOut");
  if (params.get("guests")) byId("guests").value = params.get("guests");

  const today = new Date();
  const dateString = d => {
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0,10);
  };
  byId("checkIn").min = dateString(today);
  byId("checkOut").min = byId("checkIn").value || dateString(today);

  function nightsBetween() {
    const ci = byId("checkIn").value, co = byId("checkOut").value;
    if (!ci || !co) return 0;
    return Math.round((new Date(`${co}T00:00:00`) - new Date(`${ci}T00:00:00`)) / 86400000);
  }
  function updateEstimate() {
    const nights = nightsBetween();
    const room = byId("roomType").value;
    const total = (prices[room] || 0) * Math.max(0,nights);
    byId("estimateTotal").textContent = `₹${total.toLocaleString("en-IN")}`;
    byId("estimateDetails").textContent = room && nights > 0 ? `${nights} night${nights===1?"":"s"} · ${room}` : "Choose a room and valid dates to calculate";
  }
  byId("checkIn").addEventListener("change", () => {
    byId("checkOut").min = byId("checkIn").value || dateString(today);
    if (byId("checkOut").value && byId("checkOut").value <= byId("checkIn").value) byId("checkOut").value = "";
    updateEstimate();
  });
  ["checkOut","roomType"].forEach(id => byId(id).addEventListener("change", updateEstimate));
  updateEstimate();

  function errorFor(input, message) {
    input.classList.toggle("invalid", Boolean(message));
    const holder = input.closest(".field")?.querySelector(".error");
    if (holder) holder.textContent = message || "";
  }
  function validate() {
    let ok = true;
    const fields = [...form.querySelectorAll("input[required], select[required]")];
    fields.forEach(input => {
      let message = "";
      if (input.type === "checkbox") {
        if (!input.checked) message = "Please confirm the details before continuing.";
      } else if (!input.value.trim()) {
        message = "This field is required.";
      } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        message = "Enter a valid email address.";
      } else if (input.id === "mobile" && !/^\d{10}$/.test(input.value.trim())) {
        message = "Enter a valid 10-digit mobile number.";
      } else if (input.id === "fullName" && input.value.trim().length < 2) {
        message = "Enter your full name.";
      }
      if (input.id === "checkIn" && input.value && input.value < dateString(today)) message = "Check-in cannot be in the past.";
      if (input.id === "checkOut" && input.value && input.value <= byId("checkIn").value) message = "Check-out must be after check-in.";
      errorFor(input,message);
      if (message) ok = false;
    });
    return ok;
  }
  form.querySelectorAll("input,select").forEach(input => input.addEventListener("input", () => {
    input.classList.remove("invalid");
    const e = input.closest(".field")?.querySelector(".error");
    if (e) e.textContent = "";
    if (input.id === "terms") document.querySelector(".terms-error").textContent = "";
  }));

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validate()) {
      form.querySelector(".invalid")?.focus();
      return;
    }
    const nights = nightsBetween();
    const booking = {
      reference: "AUR-" + Math.random().toString(36).slice(2,8).toUpperCase(),
      fullName: byId("fullName").value.trim(),
      email: byId("email").value.trim(),
      mobile: byId("mobile").value.trim(),
      roomType: byId("roomType").value,
      checkIn: byId("checkIn").value,
      checkOut: byId("checkOut").value,
      guests: byId("guests").value,
      requests: byId("requests").value.trim(),
      nights,
      total: prices[byId("roomType").value] * nights,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem("aureliaLastBooking", JSON.stringify(booking));
    window.location.href = "confirmation.html";
  });
});