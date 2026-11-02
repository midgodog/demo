document.addEventListener("DOMContentLoaded", () => {
  const holder = document.getElementById("confirmationDetails");
  if (!holder) return;
  let booking;
  try { booking = JSON.parse(localStorage.getItem("aureliaLastBooking") || "null"); } catch (_) {}
  if (!booking) {
    holder.innerHTML = '<h3>No recent booking request</h3><p><span>Start a new reservation</span><a href="booking.html">Book a stay ↗</a></p>';
    return;
  }
  const fmt = date => new Date(`${date}T00:00:00`).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
  const rows = [
    ["Reference", booking.reference], ["Guest", booking.fullName], ["Room", booking.roomType],
    ["Stay", `${fmt(booking.checkIn)} – ${fmt(booking.checkOut)}`],
    ["Guests", `${booking.guests} guest${booking.guests==="1"?"":"s"}`],
    ["Duration", `${booking.nights} night${booking.nights===1?"":"s"}`],
    ["Email", booking.email], ["Estimated total", `₹${Number(booking.total).toLocaleString("en-IN")}`]
  ];
  holder.innerHTML = `<h3>Booking summary</h3>` + rows.map(([label,value]) =>
    `<p><span>${label}</span><strong>${String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}</strong></p>`
  ).join("");
});