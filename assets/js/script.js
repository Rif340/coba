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

// LIVE !
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
// AKHIR LIVE !

// COURSEL
document.addEventListener("DOMContentLoaded", function () {
	let currentIndex = 0;
	const slides = document.querySelectorAll(".bidang-slide");
	const dots = document.querySelectorAll(".dot");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");
	const totalSlides = slides.length;
	let isAnimating = false; // Flag untuk mencegah klik cepat berulang

	// Inisialisasi semua slide
	slides.forEach((slide, index) => {
		// Siapkan slide yang tidak aktif dengan opacity 0
		if (index !== 0) {
			slide.style.opacity = "0";
			slide.style.display = "none";
		}
	});

	// Fungsi untuk menampilkan slide dengan transisi super smooth
	function showSlide(index, direction = 'next') {
		// Jika sedang animasi, jangan lakukan apa-apa
		if (isAnimating) return;
		isAnimating = true;

		// Validasi index agar tidak keluar batas
		if (index < 0) index = 0;
		if (index >= totalSlides) index = totalSlides - 1;

		// Slide yang aktif saat ini
		const currentSlide = document.querySelector(".bidang-slide.active");
		const targetSlide = slides[index];

		// Reset all transitions first
		slides.forEach(slide => {
			slide.style.transition = 'none';
		});

		// Siapkan target slide untuk ditampilkan, tapi masih dengan opacity 0
		targetSlide.style.display = "flex";
		targetSlide.style.opacity = "0";

		// Absolute smooth fade transition
		if (currentSlide) {
			// Force browser reflow
			void currentSlide.offsetWidth;

			// Atur transisi untuk fade out smooth
			currentSlide.style.transition = 'opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
			currentSlide.style.opacity = "0";

			// Delay sangat kecil sebelum memulai fade in
			setTimeout(() => {
				// Force browser reflow lagi
				void targetSlide.offsetWidth;

				// Atur transisi untuk fade in smooth
				targetSlide.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
				targetSlide.style.opacity = "1";

				// Tambahkan kelas active ke target slide
				targetSlide.classList.add("active");

				// Update dots navigation
				dots.forEach((dot, i) => {
					dot.classList.toggle("active", i === index);
				});

				// Setelah fade out selesai, hapus kelas active dari slide saat ini
				setTimeout(() => {
					if (currentSlide) {
						currentSlide.classList.remove("active");
						currentSlide.style.display = "none"; // Hide completely
					}

					// Update current index
					currentIndex = index;

					// Reset flag animasi
					isAnimating = false;
				}, 600); // Sedikit lebih lama dari durasi fade out
			}, 50); // Delay minimal untuk smooth
		} else {
			// Jika tidak ada slide aktif (pertama kali load)
			targetSlide.classList.add("active");
			void targetSlide.offsetWidth;
			targetSlide.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
			targetSlide.style.opacity = "1";

			// Update dots navigation
			dots.forEach((dot, i) => {
				dot.classList.toggle("active", i === index);
			});

			// Update current index
			currentIndex = index;

			// Reset flag animasi
			setTimeout(() => {
				isAnimating = false;
			}, 800);
		}
	}

	// Event listener untuk navigasi prev button
	if (prevBtn) {
		prevBtn.addEventListener("click", function () {
			if (currentIndex > 0) {
				showSlide(currentIndex - 1, 'prev');
			}
		});
	}

	// Event listener untuk navigasi next button
	if (nextBtn) {
		nextBtn.addEventListener("click", function () {
			if (currentIndex < slides.length - 1) {
				showSlide(currentIndex + 1, 'next');
			}
		});
	}

	// Event listener untuk navigasi dots
	dots.forEach((dot, i) => {
		dot.addEventListener("click", function () {
			const direction = i > currentIndex ? 'next' : 'prev';
			showSlide(i, direction);
		});
	});

	// Tambahkan keyboard navigation
	document.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowLeft' && currentIndex > 0) {
			showSlide(currentIndex - 1, 'prev');
		} else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
			showSlide(currentIndex + 1, 'next');
		}
	});

	// Tambahkan touch swipe untuk mobile
	let touchStartX = 0;
	let touchEndX = 0;
	let touchStartY = 0;
	let touchEndY = 0;

	const bidangSection = document.querySelector('.bidang-section');
	if (bidangSection) {
		bidangSection.addEventListener('touchstart', function (e) {
			touchStartX = e.changedTouches[0].screenX;
			touchStartY = e.changedTouches[0].screenY;
		}, { passive: true });

		bidangSection.addEventListener('touchend', function (e) {
			touchEndX = e.changedTouches[0].screenX;
			touchEndY = e.changedTouches[0].screenY;
			handleSwipe();
		}, { passive: true });
	}

	function handleSwipe() {
		const swipeThreshold = 50; // Minimum pixel yang dianggap sebagai swipe

		// Hitung jarak swipe horizontal dan vertikal
		const deltaX = touchEndX - touchStartX;
		const deltaY = touchEndY - touchStartY;

		// Hanya proses swipe jika horizontal lebih dominan
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			if (deltaX < -swipeThreshold && currentIndex < slides.length - 1) {
				// Swipe kiri = next
				showSlide(currentIndex + 1, 'next');
			}

			if (deltaX > swipeThreshold && currentIndex > 0) {
				// Swipe kanan = prev
				showSlide(currentIndex - 1, 'prev');
			}
		}
	}

	// Tampilkan slide pertama saat halaman dimuat
	// Gunakan setTimeout untuk memastikan DOM sudah siap
	setTimeout(() => {
		slides[0].style.display = "flex";
		slides[0].classList.add("active");
		setTimeout(() => {
			slides[0].style.transition = 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1)';
			slides[0].style.opacity = "1";
		}, 50);
	}, 100);
});
// COURSEL

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