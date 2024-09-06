(function ($) {
  "use strict";

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".navbar").fadeIn("slow").css("display", "flex");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Scroll to Bottom
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scroll-to-bottom").fadeOut("slow");
    } else {
      $(".scroll-to-bottom").fadeIn("slow");
    }
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Gallery carousel
  $(".gallery-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1500,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
})(jQuery);
$("#submit").click(() => {
  if ($("#name").val() == "") {
    alert("Vui lòng nhập tên");
    return;
  }
  if ($("#email").val() == "") {
    alert("Vui lòng nhập email");
    return;
  }
  if ($("#confirm").val() == "") {
    alert("Vui lòng nhập mã xác nhận");
    return;
  }

  if ($("#numberGuest").val() == "Number of Guest") {
    alert("Vui lòng nhập số lượng khách");
    return;
  }
  if ($("#message").val() == "") {
    alert("Vui lòng nhập nội dung");
    return;
  }

  var formData = {
    id: 0,
    code: "nkt",
    name: $("#name").val(),
    opportunityCode: $("#confirm").val(),
    workingBy: $("#email").val(),
    priority: parseInt($("#numberGuest").val()),
    description: $("#message").val(),
    createdAt: new Date(),
  };

  $.ajax({
    type: "POST",
    url: "https://apis-stag.fpt.vn/mes/api/Billing",
    data: JSON.stringify(formData),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    encode: true,
  }).done(function (data) {});
  alert("Cảm ơn bạn đã cho mình biết nhé!");
});

const volumeIcon = document.getElementById("icon-volume");
const muteIcon = document.getElementById("icon-mute");
const audioPlayer = document.getElementById("audio-player");

// Function to play the audio and show the mute icon
volumeIcon.addEventListener("click", () => {
  volumeIcon.style.display = "none";
  muteIcon.style.display = "inline";
  audioPlayer.pause(); // Play the audio
});

// Function to pause the audio and show the volume icon
muteIcon.addEventListener("click", () => {
  muteIcon.style.display = "none";
  volumeIcon.style.display = "inline";
  audioPlayer.play(); // Pause the audio
});

$.ajax({
    type: "GET",
    dataType: "json",
    data: {},
    url: "https://apis-stag.fpt.vn/mes/api/Billing?code=nkt",
    success: function (data) {
        let i = 0;

        if (data.length > 0) {
            data.forEach(item => {
                $("#dataList").append("<tr><td>" + item.name + "</td><td>" + item.description + "</td></tr>");
            });
        }
    }
});
