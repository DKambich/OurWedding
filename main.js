(function () {
  "use strict";

  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-fh5co-nav-toggle").removeClass("active");
        }
      }
    });
  };

  var offcanvasMenu = function () {
    $("#page").prepend('<div id="fh5co-offcanvas" />');
    $("#page").prepend(
      '<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>'
    );
    var clone1 = $(".menu-1 > ul").clone();
    $("#fh5co-offcanvas").append(clone1);
    var clone2 = $(".menu-2 > ul").clone();
    $("#fh5co-offcanvas").append(clone2);

    $("#fh5co-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
    $("#fh5co-offcanvas").find("li").removeClass("has-dropdown");

    // Hover dropdown menu on mobile
    $(".offcanvas-has-dropdown")
      .mouseenter(function () {
        var $this = $(this);

        $this.addClass("active").find("ul").slideDown(500, "easeOutExpo");
      })
      .mouseleave(function () {
        var $this = $(this);
        $this.removeClass("active").find("ul").slideUp(500, "easeOutExpo");
      });

    $(window).resize(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-fh5co-nav-toggle").removeClass("active");
      }
    });

    // Mobile Menu click function
    $("#fh5co-offcanvas>ul>li").on("click", function (event) {
      $(".js-fh5co-nav-toggle").toggleClass("active");
      if ($("body").hasClass("overflow offcanvas")) {
        $("body").removeClass("overflow offcanvas");
      } else {
        $("body").addClass("overflow offcanvas");
      }
      // Prevent the link from redirecting
      event.preventDefault();
      return false;
    });

    // Nav Menu click function
    $("#fh5co-links>li").click(function (event) {
      $("#fh5co-links>li.active").removeClass("active");
      $("html, body").animate(
        {
          scrollTop: $(
            `#${event.currentTarget.className.replace("-link", "")}`
          ).offset().top,
        },
        "slow"
      );
      event.currentTarget.classList.add("active");
    });
  };

  var burgerMenu = function () {
    $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
      var $this = $(this);

      if ($("body").hasClass("overflow offcanvas")) {
        $("body").removeClass("overflow offcanvas");
      } else {
        $("body").addClass("overflow offcanvas");
      }
      $this.toggleClass("active");
      event.preventDefault();
    });
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 50);
        }
      },
      { offset: "85%" }
    );
  };

  var dropdown = function () {
    $(".has-dropdown")
      .mouseenter(function () {
        var $this = $(this);
        $this
          .find(".dropdown")
          .css("display", "block")
          .addClass("animated-fast fadeInUpMenu");
      })
      .mouseleave(function () {
        var $this = $(this);

        $this
          .find(".dropdown")
          .css("display", "none")
          .removeClass("animated-fast fadeInUpMenu");
      });
  };

  var testimonialCarousel = function () {
    var owl = $(".owl-carousel-fullwidth");
    owl.owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      responsiveClass: true,
      nav: false,
      dots: true,
      smartSpeed: 800,
      autoHeight: true,
    });
  };

  // Setup the ScrollToTop button
  const setupScrollToTop = function () {
    // Listen for when the ScrollToTop button is clicked
    $(".scrolltotop").on("click", function (event) {
      // Animate to the top of the page when the button is clicked
      $("html, body").animate(
        {
          scrollTop: $("html").offset().top,
        },
        500,
        "easeInOutExpo"
      );

      // Set only the home navigation link to active
      $("#fh5co-links>li.active").removeClass("active");
      $(".fh5co-header-link").addClass("active");

      // Prevent the link from redirecting
      event.preventDefault();
      return false;
    });

    // Listen to the window is scrolled, to toggle visibility of the ScrollToTop button
    $(window).on("scroll", function () {
      // If the window scrolls past the first section, toggle visbility of the button
      var $win = $(window);
      if (
        $win.scrollTop() >
        $("#fh5co-couple").scrollTop() + $("#fh5co-couple")[0].scrollHeight
      ) {
        $(".scrolltotop").addClass("active");
      } else {
        $(".scrolltotop").removeClass("active");
      }
    });
  };

  // Setup the PageLoader animator
  const setupPageLoader = function () {
    // Fade the page loader out 
    $(".page-cover").fadeOut("slow");
  };

  var counter = function () {
    $(".js-counter").countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };

  var counterWayPoint = function () {
    if ($("#fh5co-counter").length > 0) {
      $("#fh5co-counter").waypoint(
        function (direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" }
      );
    }
  };

  // Activate the parallax effect with Stellar (add data-stellar-background-ratio="#.#" on a div to use effect)
  const setupParallax = function () {
    $.stellar();
  };

  $(".simply-countdown-one").simplyCountdown({
    year: 2022,
    month: 10,
    day: 17,
    enableUtc: false,
  });

  $(function () {
    mobileMenuOutsideClick();
    setupParallax();
    offcanvasMenu();
    burgerMenu();
    contentWayPoint();
    dropdown();
    testimonialCarousel();
    setupScrollToTop();
    setupPageLoader();
    counter();
    counterWayPoint();
  });
})();
