document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ENTRANCE GATE CONTROLLER (BUKA KUNCI)
    // ==========================================
    const enterBtn = document.getElementById('enter-btn');
    const entranceGate = document.getElementById('entrance-gate');
    const fadeElements = document.querySelectorAll('.fade-element');

    if (enterBtn && entranceGate) {
        enterBtn.addEventListener('click', () => {
            // Tutup halaman awal pemicu kunci
            entranceGate.classList.add('fade-out');
            
            // Lepas kunci gulir tubuh utama web
            document.body.classList.remove('locked');

            // Jalankan urutan kemunculan teks Hero
            fadeElements.forEach(el => {
                el.classList.add('triggered');
            });
        });
    }

    // ==========================================
    // 2. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================
    // 3. MOBILE HAMBURGER MENU
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 4. HIGHLIGHT ACTIVE NAV ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section, header');
    
    const highlightNav = () => {
        let scrollY = window.scrollY;
        
        sections.forEach(sec => {
            const sectionHeight = sec.offsetHeight;
            const sectionTop = sec.offsetTop - 120;
            const sectionId = sec.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav, { passive: true });

    // ==========================================
    // 5. COUNTDOWN TIMER (TARGET: 12 JUNI 2026, 16:00 WITA)
    // ==========================================
    const countDownDate = new Date("Jun 12, 2026 16:00:00 GMT+0800").getTime();
    
    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('countdown-message');
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (countdownElement && daysEl) {
        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                countdownElement.classList.add('hidden');
                messageElement.classList.remove('hidden');
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days.toString().padStart(2, '0');
            hoursEl.innerText = hours.toString().padStart(2, '0');
            minutesEl.innerText = minutes.toString().padStart(2, '0');
            secondsEl.innerText = seconds.toString().padStart(2, '0');
        }, 1000);
    }

});