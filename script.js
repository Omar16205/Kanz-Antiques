document.addEventListener('DOMContentLoaded', function() {
    // --- Carousel Data ---
    const carouselData = [
        { src: "assets/antique painting.jpg", caption: "'The Swing' by Jean-Honoré Fragonard, 1767" },
        { src: "assets/victorian-vase.jpg", caption: "Rare Victorian Porcelain Vase, circa 1850" },
        { src: "assets/grandfather-clock.jpg", caption: "Georgian Grandfather Clock, 18th Century" },
        { src: "assets/antique-furniture.jpg", caption: "Louis XVI Mahogany Writing Desk, 1780" },
        { src: "assets/chinese-ceramics.jpg", caption: "Ming Dynasty Ceramic Bowl, 15th Century" }
    ];
    let currentIndex = 0;

    // --- Navbar Scroll Behavior ---
    let lastScrollY = window.scrollY;
    const navContainer = document.querySelector('.nav-container');
    function handleNavbarScroll() {
        if (window.innerWidth <= 1024 || !navContainer) return;
        navContainer.classList.toggle('hidden', window.scrollY > lastScrollY && window.scrollY > 100);
        lastScrollY = window.scrollY;
    }

    // --- Smooth Scroll Animations ---
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.carousel-container, .about-section, .events-section, .footer');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }

    // --- Carousel Functionality ---
    const carouselImage = document.getElementById('carousel-image');
    const carouselCaption = document.getElementById('carousel-caption');
    function updateCarousel() {
        if (!carouselImage || !carouselCaption) return;
        carouselImage.style.opacity = '0';
        setTimeout(() => {
            carouselImage.src = carouselData[currentIndex].src;
            carouselCaption.textContent = carouselData[currentIndex].caption;
            carouselImage.style.opacity = '1';
        }, 150);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel();
    }

    // --- Stats Counter Animation ---
    function animateCounter(element) {
        const target = parseInt(element.dataset.target || '0');
        if (isNaN(target)) return;

        const duration = 2000;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            element.textContent = Math.floor(progress * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target + '+';
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- Mobile Menu (Hamburger) ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu(forceClose = false) {
        if (!hamburger || !mobileMenu) return;
        
        if (forceClose) {
            // Explicitly close the menu
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Toggle the menu state
            const isActive = mobileMenu.classList.contains('active');
            hamburger.classList.toggle('active', !isActive);
            mobileMenu.classList.toggle('active', !isActive);
            document.body.style.overflow = !isActive ? 'hidden' : '';
        }
    }
    
    if (hamburger) hamburger.addEventListener('click', () => toggleMobileMenu());
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close the menu first
            toggleMobileMenu(true);
            
            // Navigate to the target after a short delay to allow menu to close
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            }
        });
    });

    // FIX: Added a check to only run if the menu is active.
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMobileMenu(true);
        }
    });

    // --- Events Section ---
    const upcomingEvents = [
        { month: 'AUG', day: '15', name: 'Summer Event', desc: 'Discover rare finds from the Victorian era in our special summer exhibition.', loc: 'Erbil International Fair, Erbil', time: '10:00 AM - 7:00 PM' },
        { month: 'OCT', day: '30', name: 'Antique Auction', desc: 'A curated auction featuring fine art, furniture, and jewelry from renowned collectors.', loc: 'Erbil International Fair, Erbil', time: '10:00 AM - 7:00 PM' },
        { month: 'NOV', day: '14', name: 'Book Fair', desc: 'Explore a vast collection of first editions, signed copies, and historical manuscripts.', loc: 'Erbil International Fair, Erbil', time: '10:00 AM - 7:00 PM' },
        { month: 'NOV', day: '23', name: 'Antique Auction', desc: 'Our second autumn auction with a focus on Middle Eastern and Asian antiquities.', loc: 'Erbil International Fair, Erbil', time: '10:00 AM - 7:00 PM' },
        { month: 'DEC', day: '25', name: 'Christmas Sale', desc: 'Find the perfect timeless gift with exclusive discounts on selected items.', loc: 'Erbil International Fair, Erbil', time: '10:00 AM - 7:00 PM' }
    ];
    const previousEvents = [
        { month: 'JUN', day: '20', name: 'Art Deco Showcase', desc: 'A look back at the elegance and glamour of the Art Deco period. Event concluded.', loc: 'Sulaymaniyah Gallery, Sulaymaniyah', time: '10:00 AM - 7:00 PM' },
        { month: 'APR', day: '12', name: 'Spring Auction 2025', desc: 'Featured rare ceramics and silverware from the 18th century. Event concluded.', loc: 'Erbil International Fair, Erbil', time: '10:00 AM - 7:00 PM' },
        { month: 'JAN', day: '15', name: 'New Year Exhibition', desc: 'Celebrated the new year with a display of historical timepieces. Event concluded.', loc: 'Kanz Antiques Showroom, Erbil', time: '10:00 AM - 7:00 PM' },
        { month: 'NOV', day: '18', name: '2024 Grand Auction', desc: 'Our biggest auction of 2024, featuring items from around the globe. Event concluded.', loc: 'Baghdad Convention Center, Baghdad', time: '9:00 AM - 6:00 PM' }
    ];
    const eventsGrid = document.getElementById('events-grid-container');
    const tabs = document.querySelectorAll('.tab-btn');

    // FIX: Made event rendering more efficient.
    function renderEvents(events) {
        if (!eventsGrid) return;
        if (events.length === 0) {
            eventsGrid.innerHTML = '<p class="no-events-message">No events to display in this category.</p>';
            return;
        }
        const cardsHTML = events.map(event => `
            <div class="event-card">
                <div class="event-date-wrapper">
                    <div class="event-date">
                        <span class="event-month">${event.month}</span>
                        <span class="event-day">${event.day}</span>
                    </div>
                    <div class="event-content">
                        <h3 class="event-name">${event.name}</h3>
                        <p class="event-description">${event.desc}</p>
                        <div class="event-details">
                            📍 ${event.loc}<br>
                            🕒 ${event.time}
                        </div>
                    </div>
                </div>
            </div>`).join('');
        eventsGrid.innerHTML = cardsHTML;
    }

    if (eventsGrid) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.replace('active', 'inactive'));
                tab.classList.replace('inactive', 'active');
                const eventData = tab.textContent.includes('Upcoming') ? upcomingEvents : previousEvents;
                renderEvents(eventData);
            });
        });
        renderEvents(upcomingEvents); // Initial render
    }

    // --- Initialize Everything ---
    // Event Listeners
    document.querySelector('.prev')?.addEventListener('click', prevImage);
    document.querySelector('.next')?.addEventListener('click', nextImage);
    document.querySelector('.prev-mobile')?.addEventListener('click', prevImage);
    document.querySelector('.next-mobile')?.addEventListener('click', nextImage);
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.classList.contains('mobile-nav-link')) return; // handled separately
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll-based animations
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial state calls
    updateCarousel();
    handleScrollAnimations();

    // Intersection Observer for stats
    const statsContainer = document.querySelector('.stats-container');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const experienceCounter = document.querySelector('.years-experience');
                if (experienceCounter) {
                    // FIX: Calculate years of experience dynamically
                    const startYear = parseInt(experienceCounter.dataset.startYear);
                    const currentYear = new Date().getFullYear();
                    experienceCounter.dataset.target = Math.max(1, currentYear - startYear);
                }

                document.querySelectorAll('.stat-number').forEach(animateCounter);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (statsContainer) observer.observe(statsContainer);
});