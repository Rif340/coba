// NAVBAR
(function($) {
	
	"use strict";
	

	function handlePreloader() {
		if($('.preloader').length){
			$('body').addClass('page-loaded');
			$('.preloader').delay(1000).fadeOut(300);
		}
	}
	
	
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var headerUpper = $('.header-upper');
			var headerTop = $('.header-top');
			var scrollLink = $('.scroll-to-top');
			
			
			if (windowpos > 136) {
				
				headerUpper.addClass('sticky');
			
				headerTop.fadeOut(300);
				
				scrollLink.fadeIn(1000);
			} else {
				
				headerUpper.removeClass('sticky');
				
				headerTop.fadeIn(300);
			
				scrollLink.fadeOut(300);
			}
		}
	}
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
	
	headerStyle();

	$(window).on('scroll', function() {
		headerStyle();
	});

	
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
		
	}


	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
	
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
	
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}


	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		 
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);
// AKHIR  NAVBAR


// LIVE KABINET
document.addEventListener("DOMContentLoaded", function () {
  const liveHero = document.querySelector(".live-wrapper");
  const items = Array.from(liveHero.children);
  const screenWidth = window.innerWidth;
  let totalWidth = liveHero.scrollWidth;

  // Gandakan sampai lebar cukup melebihi layar 2x (untuk seamless loop)
  while (totalWidth < screenWidth * 2) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      liveHero.appendChild(clone);
    });
    totalWidth = liveHero.scrollWidth;
  }
});
// AKHIR LIVE KABINET

// BIDANG PERJALANAN
document.addEventListener("DOMContentLoaded", function () {
	let currentIndex = 0;
	const slides = document.querySelectorAll(".bidang-slide");
	const dots = document.querySelectorAll(".dot");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");

	function showSlide(index) {
		slides.forEach((slide, i) => {
			if (i === index) {
				slide.style.opacity = "0";
				slide.style.transform = "translateY(20px)"; // Efek geser ke bawah
				setTimeout(() => {
					slides.forEach((s) => s.classList.remove("active")); // Hapus active di semua
					slide.classList.add("active");
					slide.style.opacity = "1";
					slide.style.transform = "translateY(0)";
				}, 200); // Delay agar tidak langsung muncul
			} else {
				slide.style.opacity = "0";
				slide.style.transform = "translateY(-20px)"; // Efek geser ke atas saat pindah
			}
		});

		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === index);
		});
	}

	prevBtn.addEventListener("click", function () {
		if (currentIndex > 0) {
			currentIndex--;
			showSlide(currentIndex);
		}
	});

	nextBtn.addEventListener("click", function () {
		if (currentIndex < slides.length - 1) {
			currentIndex++;
			showSlide(currentIndex);
		}
	});

	dots.forEach((dot, i) => {
		dot.addEventListener("click", function () {
			currentIndex = i;
			showSlide(currentIndex);
		});
	});

	// Tampilkan slide pertama saat halaman dimuat
	showSlide(currentIndex);
});

// LIVE KABINET 2
document.addEventListener("DOMContentLoaded", function () {
  const liveHero = document.querySelector(".live2-wrapper");
  const items = Array.from(liveHero.children);
  const screenWidth = window.innerWidth;
  let totalWidth = liveHero.scrollWidth;

  // Gandakan sampai lebar cukup melebihi layar 2x (untuk seamless loop)
  while (totalWidth < screenWidth * 2) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      liveHero.appendChild(clone);
    });
    totalWidth = liveHero.scrollWidth;
  }
});
// AKHIR LIVE KABINET 2