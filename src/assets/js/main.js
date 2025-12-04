$(window).scroll(function () {
   var scroll = $(window).scrollTop();

   if (scroll >= 100) {
      $(".main-header").addClass("sticky-header");
   } else {
      $(".main-header").removeClass("sticky-header");
   }
});

// menu pr hover krne pr menu
$(document).ready(function () {
    let closeTimer;

    $(".nav-item.dropdown").on("mouseenter", function () {
        clearTimeout(closeTimer);
        $(".nav-item.dropdown").removeClass("show").find(".dropdown-menu").removeClass("show");

        $(this).addClass("show").find(".dropdown-menu").addClass("show");
    });

    $(".nav-item.dropdown").on("mouseleave", function () {
        let $this = $(this);
        closeTimer = setTimeout(function () {
            $this.removeClass("show").find(".dropdown-menu").removeClass("show");
        }, 200);
    });

    $(".nav-item.dropdown > a").attr("data-bs-toggle", "").on("click", function (e) {
        e.preventDefault();
    });
});




$('.navbar-collapse').on('shown.bs.collapse', function () {
  $('.navbar-brand').addClass('active'); 
});

$('.navbar-collapse').on('hidden.bs.collapse', function () {
  $('.navbar-brand').removeClass('active'); // class remove jab menu close ho
});

// w-shaped-start
$(window).on('scroll', function() {
    var rotateValue = $(window).scrollTop() / 5; // adjust speed
    $('.w-shaped img').css('transform', 'rotate(' + rotateValue + 'deg)');
});

// w-shaped-end
// search-filter-start
$(document).ready(function() {
    $('#search-filter').on('click', function() {
        $('#search-bar').toggle();
    });
});

// search-filter-end
$('.drop-btn').on('click', function () {
  $('.navigation-bar').slideToggle(300);
  $(this).toggleClass('show'); // Button par class toggle
});

// provider-slide-start
$('.provider-slider').owlCarousel({
    autoplay: false,
    loop: false,
    dots: false,
    margin: 10,
    nav: true,
    navText: ['<span class="fas fa-chevron-left"></span>', '<span class="fas fa-chevron-right"></span>'],
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
        },
        375: {
            items: 1.5,
        },
        767: {
            items: 2.5,
        },
        991: {
            items: 3.5,
        },
        1400: {
            items: 4.5,
        },
        1440: {
            items: 5.5,
        },
        1920: {
            items: 6.5,
        }
    }
});
// provider-slide-end


// get-know-start
$('.get-know-slider').owlCarousel({
    autoplay: false,
    loop: false,
    margin: 10,
    dots: true,
    nav: true,
    navText: ["<span class='fas fa-chevron-left'></span>", "<span class='fas fa-chevron-right'></span>"],
    items: 1
});
// get-know-end



$('.category-card-innr').on('click', function() {
    const $card = $(this).closest('.category-item');
    const $menu = $card.find('.category-menu');

    if ($card.hasClass('active')) {
        // Agar already active hai to toggle karke hata do
        $card.removeClass('active');
        $menu.slideUp();
    } else {
        // Sabse pehle sabhi card inactive karo
        $('.category-item').removeClass('active');
        $('.category-menu').slideUp();

        // Phir is card ko active banao aur menu dikhayo
        $card.addClass('active');
        $menu.slideDown();
    }
});


// provider-slide-start
$('.media-slider').owlCarousel({
    autoplay: true,
    loop: true,
    dots: false,
    margin: 0,
    nav: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1.5,
        },
        767: {
            items: 2.5,
        },
        991: {
            items: 3.5,
        },
        1440: {
            items: 4.5,
        }
    }
});
// provider-slide-end

// get-know-start
$('.testimonial-slider').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 0,
    dots: true,
    nav: false,
    items: 1
});
// get-know-end


// Jab accordion open ho jaye
$('.accordion').on('shown.bs.collapse', function (e) {
  // Sab accordion-item se active class hatao
  $('.accordion-item').removeClass('active');

  // Open hone wale accordion-item me active aur open dono lagao
  $(e.target).closest('.accordion-item')
    .addClass('open');
});

// Jab accordion fully band ho jaye
$('.accordion').on('hidden.bs.collapse', function (e) {
  // Jis accordion band ho gaya usme se open class hatao
  $(e.target).closest('.accordion-item').removeClass('open');
});

// Page load pe jo already open hai (show class wale), unme active + open lagao
$(document).ready(function () {
  $('.accordion-collapse.show').each(function () {
    $(this).closest('.accordion-item').addClass(' open');
  });
});


// Business Profile Tab jQuery
$(document).ready(function () {

	function openAccordionByIndex(index) {
		const target = '#business-0' + index;

		// Collapse all
		$('.accordion-button').addClass('collapsed');
		$('.accordion-collapse').removeClass('show');

		// Expand selected
		$(target).addClass('show');
		$(target).prev().find('.accordion-button').removeClass('collapsed');

		// Optional: scroll to the accordion for better UX
		$('html, body').animate({
			scrollTop: $(target).offset().top - 100
		}, 500);
	}

	// Left menu click
	$('.table-content-menu li a').on('click', function () {
		const index = $(this).parent().index() + 1;
		openAccordionByIndex(index);
	});

	// Mobile select change
	$('.custom-frm-bx select').on('change', function () {
		const index = $(this).prop('selectedIndex') + 1;
		openAccordionByIndex(index);
	});
});

// Slider
       const slides = document.querySelector(".slides");
        const totalSlides = document.querySelectorAll(".slide").length;
        const dotsContainer = document.getElementById("dots");
        let currentSlide = 0;

        function renderDots() {
            dotsContainer.innerHTML = "";
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement("span");
                if (i === currentSlide) dot.classList.add("active");
                dotsContainer.appendChild(dot);
            }
        }

        function showSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentSlide = index;
            slides.style.transform = `translateX(-${index * 100}%)`;
            renderDots();
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        renderDots();
        showSlide(0);
        

        

