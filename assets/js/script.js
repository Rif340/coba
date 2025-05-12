// OPACITY TURUN
window.addEventListener('scroll', function () {
	const header = document.querySelector('.header-upper');
	const liveAwal = document.querySelector('.live-awal');

	if (!header || !liveAwal) return;

	const posisiLiveAwal = liveAwal.getBoundingClientRect().top;
	const posisiHeader = header.getBoundingClientRect().bottom;

	if (posisiLiveAwal <= window.innerHeight && posisiLiveAwal > 0) {
		header.style.opacity = '0.5';
	}

	if (posisiHeader >= 0 && posisiLiveAwal > window.innerHeight) {
		header.style.opacity = '1';
	}
});
// AKHIR OPACITY TURUN

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

// COURSEL
document.addEventListener('DOMContentLoaded', function () {
	const wrapper = document.querySelector('.live-wrapper');
	const container = document.querySelector('.live-awal');

	if (!wrapper || !container) return;

	let isDown = false;
	let startX;
	let scrollLeft;

	// Logger untuk debugging
	function logState(message) {
		console.log(`${message} - isDown: ${isDown}, scrollLeft: ${scrollLeft}`);
	}

	// Tangani event mouse down
	container.addEventListener('mousedown', function (e) {
		isDown = true;
		wrapper.classList.add('dragging');
		startX = e.pageX;

		// Perbaikan: Gunakan computed style untuk mendapatkan transform saat ini
		const style = window.getComputedStyle(wrapper);
		const matrix = new DOMMatrix(style.transform);
		scrollLeft = matrix.m41; // Ambil nilai translateX dari matrix

		logState('Mouse down');
		e.preventDefault();
	});

	// Tangani event mouse leave dan mouse up
	container.addEventListener('mouseleave', function (e) {
		if (isDown) {
			resetDrag(e);
		}
	});

	container.addEventListener('mouseup', function (e) {
		resetDrag(e);
	});

	// Tangani event mouse move untuk dragging
	container.addEventListener('mousemove', function (e) {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX;
		const walk = (x - startX); // Seberapa jauh mouse telah bergerak
		wrapper.style.transform = `translateX(${scrollLeft + walk}px)`;
	});

	// Untuk touch devices
	container.addEventListener('touchstart', function (e) {
		isDown = true;
		wrapper.classList.add('dragging');
		startX = e.touches[0].pageX;

		// Perbaikan: Gunakan computed style untuk mendapatkan transform saat ini
		const style = window.getComputedStyle(wrapper);
		const matrix = new DOMMatrix(style.transform);
		scrollLeft = matrix.m41; // Ambil nilai translateX dari matrix

		logState('Touch start');
	}, { passive: false });

	container.addEventListener('touchend', resetDrag);
	container.addEventListener('touchcancel', resetDrag);

	container.addEventListener('touchmove', function (e) {
		if (!isDown) return;
		const x = e.touches[0].pageX;
		const walk = (x - startX);
		wrapper.style.transform = `translateX(${scrollLeft + walk}px)`;
		e.preventDefault();
	}, { passive: false });

	// Reset drag status
	function resetDrag(e) {
		if (!isDown) return; // Hindari multiple resets

		isDown = false;
		wrapper.classList.remove('dragging');
		logState('Reset drag');

		// Jangan reset posisi, biarkan di posisi terakhir saat masih hover
		if (!container.matches(':hover')) {
			// Hanya reset saat mouse tidak di atas container
			resetAnimation();
		}
	}

	// Reset animasi
	function resetAnimation() {
		logState('Reset animation');
		// Simpan transform saat ini sebelum di-reset
		const oldTransform = wrapper.style.transform;

		// Reset transform
		wrapper.style.transform = '';

		// Matikan animasi dulu
		wrapper.style.animation = 'none';

		// Paksa re-flow untuk memulai ulang animasi
		void wrapper.offsetWidth;

		// Nyalakan kembali animasi
		wrapper.style.animation = 'tickerMove 10s linear infinite';
	}

	// Event listener untuk reset animasi saat mouse leave
	container.addEventListener('mouseleave', function () {
		logState('Mouse leave');
		resetAnimation();
	});
});
// AKHIR COURSEL

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

// LIVE 2
document.addEventListener('DOMContentLoaded', function () {
	const wrapper = document.querySelector('.live2-wrapper');
	const container = document.querySelector('.live2-awal');

	if (!wrapper || !container) return;

	let isDown = false;
	let startX;
	let scrollLeft;

	function resetAnimation() {
		const oldTransform = wrapper.style.transform;
		wrapper.style.transform = '';
		wrapper.style.animation = 'none';
		void wrapper.offsetWidth;
		wrapper.style.animation = 'tickerMove2 10s linear infinite';
	}

	function resetDrag() {
		if (!isDown) return;
		isDown = false;
		wrapper.classList.remove('dragging');
		if (!container.matches(':hover')) {
			resetAnimation();
		}
	}

	container.addEventListener('mousedown', function (e) {
		isDown = true;
		wrapper.classList.add('dragging');
		startX = e.pageX;

		const style = window.getComputedStyle(wrapper);
		const matrix = new DOMMatrix(style.transform);
		scrollLeft = matrix.m41;

		e.preventDefault();
	});

	container.addEventListener('mousemove', function (e) {
		if (!isDown) return;
		const x = e.pageX;
		const walk = x - startX;
		wrapper.style.transform = `translateX(${scrollLeft + walk}px)`;
		e.preventDefault();
	});

	container.addEventListener('mouseleave', resetDrag);
	container.addEventListener('mouseup', resetDrag);

	// Touch support
	container.addEventListener('touchstart', function (e) {
		isDown = true;
		wrapper.classList.add('dragging');
		startX = e.touches[0].pageX;

		const style = window.getComputedStyle(wrapper);
		const matrix = new DOMMatrix(style.transform);
		scrollLeft = matrix.m41;
	}, { passive: false });

	container.addEventListener('touchmove', function (e) {
		if (!isDown) return;
		const x = e.touches[0].pageX;
		const walk = x - startX;
		wrapper.style.transform = `translateX(${scrollLeft + walk}px)`;
		e.preventDefault();
	}, { passive: false });

	container.addEventListener('touchend', resetDrag);
	container.addEventListener('touchcancel', resetDrag);
});

// AKHIR LIVE 2