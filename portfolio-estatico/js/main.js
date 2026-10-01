document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcons('light');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
        
        updateThemeIcons(newTheme);
    });
    
    function updateThemeIcons(theme) {
        if (theme === 'light') {
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
        } else {
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
        }
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    // Only apply animations if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback or if reduced motion is requested
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
