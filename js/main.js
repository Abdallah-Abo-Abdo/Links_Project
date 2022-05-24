// print the element the user clicked in the Console
document.addEventListener("click", function handleClickOutsideBox(event) {
  console.log("user clicked: ", event.target);
});

window.Truns_01 = function (href) {
  document.querySelector("body").classList.add("Truns_01");
  setTimeout(function () {
    window.location.href = href;
  }, 1000);
};

window.Truns_02 = function (href) {
  document.querySelector("body").classList.add("Truns_02");
  setTimeout(function () {
    window.location.href = href;
  }, 1000);
};

// ================================================================================
jQuery(document).ready(function () {
  var scroll_zoom = new ScrollZoom($(".Zoom"), 4, 0.05);

  jQuery(".all-lines line").click(function () {
    Truns_01("./Rect.html");
  });

  jQuery(".rect .shape").click(function () {
    Truns_02("./index.html");
  });

  jQuery(".rect .rect-lines").click(function () {
    Truns_01("./Rect_02.html");
  });

  jQuery(".rect_02 .shape").click(function () {
    Truns_02("./Rect.html");
  });

  jQuery(".R-circles").click(function () {
    $(".K-circles , .M-circles , .G-circles ,  .N-circles").fadeToggle(1000);
    $(".K-lines , .M-lines , .G-lines ,  .N-lines ,.R-K").fadeToggle(1000);
  });

  jQuery(".K-circles").click(function () {
    $(".R-circles , .M-circles , .G-circles ,  .N-circles").fadeToggle(1000);
    jQuery(".R-lines , .M-lines , .G-lines ,  .N-lines ,.K-M").fadeToggle(1000);
  });

  jQuery(".M-circles").click(function () {
    $(".R-circles , .K-circles , .G-circles ,  .N-circles").fadeToggle(1000);
    $(".R-lines , .K-lines , .G-lines ,  .N-lines ,.M-G").fadeToggle(1000);
  });

  jQuery(".G-circles").click(function () {
    $(".R-circles , .K-circles , .M-circles ,  .N-circles").fadeToggle(1000);
    $(".R-lines , .K-lines , .M-lines ,  .N-lines ,.G-N").fadeToggle(1000);
  });

  jQuery(".N-circles").click(function () {
    $(".R-circles , .K-circles , .M-circles ,  .G-circles").fadeToggle(1000);
    $(".R-lines , .K-lines , .M-lines ,  .G-lines ").fadeToggle(1000);
  });
});

// ================================================================================

function ScrollZoom(container, max_scale, factor) {
  var target = container.children().first();
  var size = { w: target.width(), h: target.height() };
  var pos = { x: 0, y: 0 };
  var scale = 1;
  var zoom_target = { x: 0, y: 0 };
  var zoom_point = { x: 0, y: 0 };
  var curr_tranform = target.css("transition");
  var last_mouse_position = { x: 0, y: 0 };
  var drag_started = 0;

  target.css("transform-origin", "0 0");
  target.on("mousewheel DOMMouseScroll", scrolled);
  target.on("mousemove", moved);
  target.on("mousedown", function () {
    drag_started = 1;
    target.css({ cursor: "move", transition: "transform 0s" });
    /* Save mouse position */
    last_mouse_position = { x: event.pageX, y: event.pageY };
  });

  target.on("mouseup mouseout", function () {
    drag_started = 0;
    target.css({ cursor: "default", transition: curr_tranform });
  });

  function scrolled(e) {
    var offset = container.offset();
    zoom_point.x = e.pageX - offset.left;
    zoom_point.y = e.pageY - offset.top;

    e.preventDefault();
    var delta = e.delta || e.originalEvent.wheelDelta;
    if (delta === undefined) {
      //we are on firefox
      delta = e.originalEvent.detail;
    }
    delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

    // determine the point on where the slide is zoomed in
    zoom_target.x = (zoom_point.x - pos.x) / scale;
    zoom_target.y = (zoom_point.y - pos.y) / scale;

    // apply zoom
    scale += delta * factor * scale;
    scale = Math.max(1, Math.min(max_scale, scale));

    // calculate x and y based on zoom
    pos.x = -zoom_target.x * scale + zoom_point.x;
    pos.y = -zoom_target.y * scale + zoom_point.y;

    update();
  }

  function moved(event) {
    if (drag_started == 1) {
      var current_mouse_position = { x: event.pageX, y: event.pageY };
      var change_x = current_mouse_position.x - last_mouse_position.x;
      var change_y = current_mouse_position.y - last_mouse_position.y;

      /* Save mouse position */
      last_mouse_position = current_mouse_position;
      //Add the position change
      pos.x += change_x;
      pos.y += change_y;

      update();
    }
  }

  function update() {
    // Make sure the slide stays in its container area when zooming out
    if (pos.x > 0) pos.x = 0;
    if (pos.x + size.w * scale < size.w) pos.x = -size.w * (scale - 1);
    if (pos.y > 0) pos.y = 0;
    if (pos.y + size.h * scale < size.h) pos.y = -size.h * (scale - 1);

    target.css(
      "transform",
      "translate(" +
        pos.x +
        "px," +
        pos.y +
        "px) scale(" +
        scale +
        "," +
        scale +
        ")"
    );
  }
}

// =======================================================
