document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Interactive Social Media Particle Background
    const socialBg = document.getElementById('social-background');
    if (socialBg) {
        const platforms = [
            { class: 'fa-facebook', color: '#1877F2' },
            { class: 'fa-twitter', color: '#1DA1F2' },
            { class: 'fa-instagram', color: '#E1306C' },
            { class: 'fa-linkedin', color: '#0A66C2' },
            { class: 'fa-youtube', color: '#FF0000' },
            { class: 'fa-tiktok', color: '#ff0050' },
            { class: 'fa-whatsapp', color: '#25D366' },
            { class: 'fa-pinterest', color: '#E60023' },
            { class: 'fa-snapchat', color: '#FFFC00' },
            { class: 'fa-google', color: '#DB4437' },
            { class: 'fa-reddit', color: '#FF4500' }
        ];
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const particles = [];
        // Adjust particle count based on screen size for performance
        const particleCount = window.innerWidth > 768 ? 35 : 15;

        for (let i = 0; i < particleCount; i++) {
            createParticle(true);
        }

        function createParticle(initial = false) {
            const icon = document.createElement('i');
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            icon.classList.add('fab', platform.class, 'social-icon-particle');
            
            // Randomize properties
            const size = Math.random() * 2 + 1.5; // 1.5rem to 3.5rem
            const x = Math.random() * window.innerWidth;
            const y = initial ? Math.random() * window.innerHeight : window.innerHeight + 100;
            const speedY = Math.random() * 0.4 + 0.1;
            const speedX = (Math.random() - 0.5) * 0.2;
            const opacity = Math.random() * 0.15 + 0.05; // 0.05 to 0.20
            const blur = Math.random() * 4; // depth effect
            const rotationSpeed = (Math.random() - 0.5);
            
            icon.style.fontSize = `${size}rem`;
            icon.style.opacity = opacity;
            icon.style.filter = `blur(${blur}px)`;
            icon.style.color = platform.color;
            
            socialBg.appendChild(icon);
            
            particles.push({
                element: icon,
                x: x,
                y: y,
                speedY: speedY,
                speedX: speedX,
                rotation: Math.random() * 360,
                rotationSpeed: rotationSpeed,
                baseOpacity: opacity,
                baseColor: platform.color
            });
        }

        function animateParticles() {
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Move naturally
                p.y -= p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;
                
                // Mouse interaction - repulsion & glow
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 250;
                
                let pushX = 0;
                let pushY = 0;
                
                if (distance < maxDistance) {
                    const force = Math.pow((maxDistance - distance) / maxDistance, 2);
                    pushX = -(dx / distance) * force * 30;
                    pushY = -(dy / distance) * force * 30;
                    
                    p.element.style.opacity = Math.min(p.baseOpacity + force * 0.5, 0.8);
                    p.element.style.color = p.baseColor;
                    p.element.style.textShadow = `0 0 10px ${p.baseColor}`;
                } else {
                    p.element.style.opacity = p.baseOpacity;
                    p.element.style.color = p.baseColor;
                    p.element.style.textShadow = 'none';
                }
                
                // Apply transforms
                p.element.style.transform = `translate3d(${p.x + pushX}px, ${p.y + pushY}px, 0) rotate(${p.rotation}deg)`;
                
                // Reset if off screen
                if (p.y < -100) {
                    p.y = window.innerHeight + 100;
                    p.x = Math.random() * window.innerWidth;
                }
                if (p.x < -100) p.x = window.innerWidth + 100;
                if (p.x > window.innerWidth + 100) p.x = -100;
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }

    // Initialize Swiper for Certifications
    if (document.querySelector('.cert-swiper')) {
        const swiper = new Swiper('.cert-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // Auto play could be nice
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    }
});
