// --- SLIDER LOGIC ---
        let currentSlide = 0;
        const totalSlides = 4;
        let autoSlideInterval;
        let isAutoPlaying = true;

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            const container = document.getElementById('sliderContainer');
            
            container.scrollTo({
                left: container.offsetWidth * index,
                behavior: 'smooth'
            });
            
            updateDots();
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        function manualSlide(index) {
            // Reset timer on manual interaction
            if(isAutoPlaying) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(nextSlide, 6000); // 6s interval
            }
            goToSlide(index);
        }

        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 6000);
            const btn = document.getElementById('autoBtn');
            btn.innerHTML = '<i class="fas fa-pause"></i>';
            isAutoPlaying = true;
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
            const btn = document.getElementById('autoBtn');
            btn.innerHTML = '<i class="fas fa-play"></i>';
            isAutoPlaying = false;
        }

        function toggleAuto() {
            if (isAutoPlaying) stopAutoSlide();
            else startAutoSlide();
        }

        document.addEventListener('DOMContentLoaded', () => {
            startAutoSlide();
            
            const container = document.getElementById('sliderContainer');
            
            // Detect scroll end for dot updates
            container.addEventListener('scroll', () => {
                const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
                if (newIndex !== currentSlide) {
                    currentSlide = newIndex;
                    updateDots();
                }
            });

            // Keyboard support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            });
        });

        // Modal Logic
        function openModal(title, desc) {
            const myModalEl = document.getElementById('serviceModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDesc = document.getElementById('modalDesc');

            modalTitle.innerText = title;
            modalDesc.innerText = desc;

            const myModal = new bootstrap.Modal(myModalEl);
            myModal.show();
        }