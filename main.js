if (window.document.documentMode) {
  alert(
    "You are using an unsupported web browser. Please use a browser such as Google Chrome, Microsoft Edge, or Mozilla Firefox"
  );
}

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
    // $.getJSON("./guest.json", function (data) {
    //   guestJSON = data;
    // });

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

var guestJSON = {
  79341: ["Paul McKinney", "Chery McKinney", "Betsy McKinney", "Jack Long"],
  73498: ["Emma McKinney", "Charlie Wissler"],
  35879: ["Douglas Kambich", "Michelle Kambich"],
  86142: ["Ryan Kambich", "Lindsey Dierig"],
  42576: ["William McKinney", "Phyllis McKinney"],
  56493: ["Bill Dodd", "Peach Dodd"],
  29345: ["Anthony Kambich", "Carolyn Kambich"],
  39648: ["Mel Karasek", "Nancy Karasek"],
  43689: ["Michael McKinney"],
  69827: [
    "Patrick McKinney",
    "Stephanie McKinney",
    "Olivia McKinney",
    "Sophie McKinney",
    "Davin Greenlee",
    "Ava McKinney",
    "Nathan Ashbrook",
  ],
  43295: ["Hannah McKinney", "David Webster"],
  46328: [
    "Don McKinney",
    "Sarah McKinney",
    "Rachel McKinney",
    "Joel McKinney",
    "Lindsey McKinney",
  ],
  61748: ["Brandon Cobb", "Cindy Cobb", "Baylor Cobb", "Carley Cobb"],
  23897: ["Josh Inman", "Brooke Inman", "Dalton Inman"],
  67159: ["Tim Courtney", "Lisa Kambich", "Celeste Courney", "Neal Matson"],
  64538: ["Christian Courtney", "Maria Pesek"],
  51342: ["Tony Kambich"],
  61534: ["Rod Burns"],
  27813: ["Brian Petzel", "Johanna Petzel", "Ben Tousey"],
  56138: [
    "Mark Karasek",
    "Kate Karasek",
    "Isabelle Karasek",
    "Lexi Karasek",
    "Brooklyn Karasek",
  ],
  56748: ["Charles Karasek", "Amy Karasek", "Malory Karasek", "Sloan Karasek"],
  32854: ["Matthew Gray", "Summer Coleman"],
  23189: ["Rachel Koerner", "Lucas McCoy"],
  81432: ["Kelsey Martin"],
  36794: ["Aileen Boyle"],
  39251: ["Evan Tippitt", ""],
  61298: ["Ian Carniello"],
  16924: ["Brent Bouslog", ""],
  59637: ["Anthony Montalbano", ""],
  18724: ["Ben Michel", ""],
  16728: ["Andrew Devedjian", ""],
  52981: ["Brooke Buranosky", ""],
  26813: ["Sara Kenward"],
  38974: ["Jake Lewis", ""],
  67425: ["Joey Balke"],
  79834: ["Jonah Sugarman"],
  29781: ["Judd Fishman"],
  65723: ["Rob Winter"],
  82543: ["Francesca Rascati"],
  16438: ["Jackie Rosborough"],
  21697: ["Emily Pure", ""],
  89256: ["Ariel Feldman"],
  19528: ["Claire Cunningham"],
  79215: ["Dennis Kurtz", "Madi Wiley"],
  87945: ["Casey Johnson"],
  52963: ["Carli Bruggemeier", ""],
  41869: ["Joseph Dugdale", "Kathy Dugdale"],
  29671: ["Jeffrey Dugdale", "Bill Mirola"],
  25314: ["Chris Brown", "Ashley Brown"],
  31748: ["Rick Witsken", "Bridget Witsken"],
  32586: ["Reinhold Mueller", "Lora Mueller"],
  37581: ["Ray Mack", "Renne Mack"],
  95168: ["Robbie Hansen", "Kim Hansen"],
  95723: [
    "John Zehner",
    "Lori Zehner",
    "Kayla Zehner",
    "Paige Zehner",
    "Maci Zehner",
  ],
  63598: [
    "Steve Craft",
    "Pam Craft",
    "Natasha Craft",
    "Nathan Craft",
    "Nicholas Craft",
  ],
  95184: ["Margret Zehner"],
  26375: [
    "Sean Keller",
    "Anne Keller",
    "Madeline Keller",
    "Claudia Keller",
    "Meagan Keller",
  ],
  34856: ["Jim Blum", "Joan Blum", "Evan Blum"],
  84935: ["Pete McCasland", "Marilyn MaCasland"],
  35789: [
    "Kevin Kerchner",
    "Katie Kerchner",
    "Isabella Kerchner",
    "Gabriella Kerchner",
    "Sofia Kerchner",
  ],
  24697: ["Tom Wynegar", "Kathy Wynegar"],
  75916: ["Kerry McKernon", "Jennifer McKinney"],
  93751: ["Robin Driver"],
  75912: ["Mary Ingram"],
  97583: ["Jim Giselbach", "Leketta Giselbach"],
  49387: ["Rob MacMillan", "Linda MacMillan"],
  96134: ["Frank Guerino", "Nora Guerino"],
  94316: ["Ryan Kolze", "Danielle Kolze", "Autumn Kolze"],
  63784: ["Michelle Tourtillo", ""],
  59183: ["John Remko", "Ginny Remko"],
  62851: [
    "David Viront",
    "Joleen Viront",
    "John Viront",
    "Jamie Viront",
    "Joe Viront",
  ],
  87234: [
    "Hugh Rider",
    "Lesa Rider",
    "Hugh Rider Jr.",
    "Ben Rider",
    "Margaret Rider",
  ],
  47326: ["Kent Geibel", "Leslie Geibel", "Adam Geibel", "Claire Geibel"],
  36724: ["Beth Leeth", "Kay Pothast"],
  67854: [
    "Jeff Hansen",
    "Bonnie Hansen",
    "Maggie Hansen",
    "Maggie's Guest",
    "Nick Hansen",
  ],
  73491: ["Emily Hansen", ""],
  18473: ["Claire Hansen"],
  43715: ["Ted Denten", "Katie Denten", "Luke Denten", "Peter Denten"],
  43792: ["Jack Denten"],
  83957: ["Gary Porento", "Rose Porento", "Jake Porento", "Alex Porento"],
  37495: ["Bob Taylor", "Debbie Taylor"],
  27395: ["Lawson Huntsinger"],
  17394: ["Jon Bell", ""],
  12345: ["Daniel Kambich", "Abigail McKinney"],
};
