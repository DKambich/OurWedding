if (window.document.documentMode) {
  alert(
    "You are using an unsupported web browser. Please use a browser such as Google Chrome, Microsoft Edge, or Mozilla Firefox"
  );
}

(function () {
  "use strict";
  
  var guestJSON;

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
        "easeInOutExpo"
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
      if ($win.scrollTop() >= $("#fh5co-header")[0].scrollHeight) {
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

  const setupDateCounter = function () {
    $(".date-countdown").simplyCountdown({
      year: 2022,
      month: 9,
      day: 17,
      enableUtc: false,
    });

    // Hide the seconds field
    $(".simply-seconds-section").hide();
  };

  const setupRSVPForm = function () {
    // Load RSVP GUest JSON
    $.getJSON("guest.json", function (data) {
      guestJSON = data;
    });

    // Hide the RSVP submit button
    $("#rsvp-submit").hide();

    // Setup an RSVP button click handler
    $("#rsvp-submit").on("click", function () {
      // Create a list of the guest responses
      var guestResponses = [];

      // For each guest response in the form
      $("#guest-list")
        .children("div")
        .each(function (index, element) {
          // Retrieve the guest name and their response
          const guestName = $(`#guest-${index}`).val();
          const response = $(`input[name="guest-${index}"]:checked`).val();

          // Add the response to the list of guest responses
          guestResponses.push({ guest: guestName, response: response });
        });

      const stringResponse = JSON.stringify(guestResponses);

      // Add the guest response list stringified to a hidden field
      $("#RSVP-response").val(stringResponse);

      const invitationCode = $("#code").val();
      const primaryEmail = $("#email").val();
      const timestamp = new Date().toUTCString();

      // Submit the RSVP form
      $("#RSVP-form").submit();

      // Submit the Backup form
      fetch(
        `https://getpantry.cloud/apiv1/pantry/8f3cb133-12cc-48be-b7ec-a7083ef5368d/basket/${invitationCode}`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          //make sure to serialize your JSON body
          body: JSON.stringify({
            [timestamp]: {
              primaryEmail: primaryEmail,
              response: stringResponse,
            },
          }),
        }
      );

      // Show the confirmation popup
      $.magnificPopup.open({
        items: {
          src: `#rsvp-popup`, // can be a HTML string, jQuery object, or CSS selector
          type: "inline",
        },
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
          beforeOpen: function () {
            this.st.mainClass = "mfp-zoom-in"; //TODO: This is the animation class that is defined
          },
        },
      });

      // Animate the populated guest list out
      $("#guest-list").slideUp().empty();
      // Fade the RSVP submit button out
      $("#rsvp-submit").hide();
      // Animate a scroll to the top of the RSVP section
      $("html, body").animate(
        {
          scrollTop: $(`#fh5co-started`).offset().top,
        },
        "easeInOutExpo"
      );
    });

    // Setup an RSVP invitation code input handler
    $("#code").on("input", function () {
      // Get the guests corresponding to the inputted code
      const guests = guestJSON[this.value];
      // If the guests exist
      if (guests !== undefined) {
        // Add the RSVP info paragraph
        $("#guest-list").append(
          `<p style="color: #FFFC; text-align: center;" class="col-xs-12">Please mark accept or decline for each member of your party. If you are invited with a guest, please enter their name where indicated. If your guest is not able to attend, leave their spot blank and mark it as declined.</p>`
        );

        // Add a row on the form for each guest
        for (const index in guests) {
          $("#guest-list").append(`
        	  <div>
						  <div class="col-md-8 col-sm-8 col-xs-12">
								<div class="form-group">
									<label for=" name" class="sr-only"></label>
									<input type="name" class="form-control" id="guest-${index}" placeholder="Enter Your Guest's Name" value="${guests[index]}">
								</div>
							</div>
								
              <div class="col-md-2 col-sm-2 col-xs-6">
								<div class="rsvp-radio">
									<input id="guest-accept-${index}" name="guest-${index}" type="radio" value="accept" checked>
									<label for="guest-accept-${index}" class="radio-label">Accept</label>
								</div>
							</div>
								
              <div class="col-md-2 col-sm-2 col-xs-6">
								<div class="rsvp-radio ">
									<input id="guest-decline-${index}" name="guest-${index}" type="radio" value="decline">
									<label for="guest-decline-${index}" class="radio-label">Decline</label>
							</div>							
            </div>
          `);
        }

        // Animate the populated guest list in
        $("#guest-list").hide().slideDown();
        // Fade the RSVP submit button in
        $("#rsvp-submit").fadeIn(1000);
        // Animate a scroll to the top of the RSVP section
        $("html, body").animate(
          {
            scrollTop: $(`#fh5co-started`).offset().top,
          },
          "easeInOutExpo"
        );
      } else {
        // If there is no corresponding guest
        // Animate the guest list out
        $("#guest-list").slideUp().empty();
        // Fade the RSVP submit button out
        $("#rsvp-submit").hide();
      }
    });
  };

  // Activate the parallax effect with Stellar (add data-stellar-background-ratio="#.#" on a div to use effect)
  const setupParallax = function () {
    $.stellar();
  };

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
    setupDateCounter();
    setupRSVPForm();
  });
})();