document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Navigation Menu Logic
    const menuBtn = document.getElementById('menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    let isSidebarOpen = false;

    const toggleSidebar = () => {
        isSidebarOpen = !isSidebarOpen;
        if (isSidebarOpen) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            menuIcon.classList.add('rotate-90');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            menuIcon.classList.remove('rotate-90');

            const featuresFlyout = document.getElementById('features-flyout');
            const featuresArrow = document.getElementById('features-arrow');
            if (featuresFlyout) featuresFlyout.classList.remove('active');
            if (featuresArrow) featuresArrow.style.transform = 'rotate(0deg)';
        }
    };

    if (menuBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
    }

    const featuresToggleBtn = document.getElementById('features-toggle-btn');
    const featuresFlyout = document.getElementById('features-flyout');
    const featuresArrow = document.getElementById('features-arrow');
    const featuresBackBtn = document.getElementById('features-back-btn');

    if (featuresToggleBtn && featuresFlyout && featuresArrow) {
        featuresToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = featuresFlyout.classList.contains('active');
            if (isOpen) {
                featuresFlyout.classList.remove('active');
                featuresArrow.style.transform = 'rotate(0deg)';
            } else {
                featuresFlyout.classList.add('active');
                featuresArrow.style.transform = 'rotate(90deg)';
            }
        });
    }

    if (featuresBackBtn && featuresFlyout && featuresArrow) {
        featuresBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            featuresFlyout.classList.remove('active');
            featuresArrow.style.transform = 'rotate(0deg)';
        });
    }

    const submenuLinks = document.querySelectorAll('#features-flyout a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isSidebarOpen) {
                toggleSidebar();
            }
        });
    });

    // Scroll animations observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Dynamic Video Playback Control (IntersectionObserver)
    const videoObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, videoObserverOptions);

    document.querySelectorAll('video').forEach((video) => {
        videoObserver.observe(video);
    });
});
