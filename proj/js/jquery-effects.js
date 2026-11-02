/* jQuery enhancements for Aurelia Grand Resort
   jQuery is used for room search/filtering, smooth scrolling and subtle reveal effects. */
$(function () {
  // Room search and price filtering (rooms.html)
  const $roomCards = $(".room-list-card");
  function filterRooms() {
    if (!$roomCards.length) return;
    const query = ($("#roomSearch").val() || "").trim().toLowerCase();
    const maxPrice = Number($("#roomPriceFilter").val() || 999999);
    let visible = 0;

    $roomCards.each(function () {
      const $card = $(this);
      const searchable = (($card.attr("data-room-search") || "") + " " + $card.text()).toLowerCase();
      const price = Number($card.attr("data-price") || 0);
      const matches = searchable.includes(query) && price <= maxPrice;

      if (matches) {
        $card.stop(true, true).fadeIn(180);
        visible++;
      } else {
        $card.stop(true, true).fadeOut(140);
      }
    });

    $("#roomFilterStatus").text(
      visible === 0 ? "No rooms match those filters. Try another search." :
      `Showing ${visible} room type${visible === 1 ? "" : "s"}.`
    );
  }

  $("#roomSearch").on("input", filterRooms);
  $("#roomPriceFilter").on("change", filterRooms);
  $("#clearRoomFilters").on("click", function () {
    $("#roomSearch").val("");
    $("#roomPriceFilter").val("999999");
    filterRooms();
  });

  // Smooth scrolling for in-page links.
  $('a[href^="#"]').on("click", function (event) {
    const href = $(this).attr("href");
    if (!href || href === "#") return;
    const $target = $(href);
    if ($target.length) {
      event.preventDefault();
      $("html, body").stop().animate({ scrollTop: $target.offset().top - 85 }, 500);
    }
  });

  // Gentle entrance effect for room and facility cards.
  $(".room-card, .facility-grid article").css({ opacity: 0 }).each(function (index) {
    const $item = $(this);
    setTimeout(function () {
      $item.animate({ opacity: 1 }, 420);
    }, Math.min(index * 100, 400));
  });

  // jQuery form feedback: visually mark required fields after a user begins typing.
  $("form input[required], form select[required]").on("blur", function () {
    const $field = $(this);
    const empty = $field.attr("type") === "checkbox" ? !$field.is(":checked") : !$field.val();
    $field.toggleClass("jquery-empty-field", empty);
  }).on("input change", function () {
    const $field = $(this);
    const filled = $field.attr("type") === "checkbox" ? $field.is(":checked") : Boolean($field.val());
    if (filled) $field.removeClass("jquery-empty-field");
  });
});
