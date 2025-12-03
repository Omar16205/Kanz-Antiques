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
        { month: 'NOV', day: '22', name: 'Youth Bazar 2024', desc: 'An event for young innovators & creators to showcase their talents and ideas, empowering the next generation for a brighter future! 16,000+ visitors . Event concluded.', loc: 'Babylon media -  Erbil, Kurdistan Iraq ', time: 'November 22-23' },
        { month: 'APR', day: '3', name: 'Oral cancer awareness campaign 2025', desc: 'A fundraising event with proceeds going to nanakali hospital assisting them in providing critical healthcare services, including oral cancer treatment to underserved populations . Event concluded.', loc: 'Sami AbdulRahman Park - Erbil, Kurdistan Iraq', time: 'April 3-4' },
        { month: 'APR', day: '9', name: 'Erbil international book fair 2025', desc: 'A major annual cultural event in the capital of Kurdistan featuring hundreds of publishers and offering a wide array of books, along with cultural and intellectual activities.80,000+ visitors  . Event concluded.', loc: 'Sami AbdulRahman park - fair grounds ', time: 'April 9-19' },
        { month: 'APR', day: '17', name: 'UKH X HMU dentistry 2025', desc: 'A collaborative dentistry event by university of Kurdistan hawker and hawler medical university for students . Event concluded.', loc: 'UKH school of medicine campus ', time: 'April 9-19' },
        { month: 'APR', day: '26', name: 'British grammar school 2025', desc: 'A on campus marketplace filled with activities, shopping stalls and food for students along with their family and friends . Event concluded.', loc: 'British grammar school - Erbil Kurdistan Iraq  ', time: 'April 26' },
        { month: 'APR', day: '28', name: 'Knowledge university festival 2025', desc: 'A on campus festival for students . Event concluded.', loc: 'Knowledge university - Erbil Kurdistan Iraq  ', time: 'April 28' },
        { month: 'MAY', day: '2', name: 'Shanadar park trade festival and local production 2025', desc: 'Organized by the Kurdistan Regional Government, a spring event for local businesses showcasing their products . Event concluded.', loc: 'Shanadar park - Erbil Kurdistan Iraq ', time: 'May 2-7' }
    ];
    const eventsGrid = document.getElementById('events-grid-container');
    const tabs = document.querySelectorAll('.tab-btn');

    
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
        renderEvents(upcomingEvents);
    }

    document.querySelector('.prev')?.addEventListener('click', prevImage);
    document.querySelector('.next')?.addEventListener('click', nextImage);
    document.querySelector('.prev-mobile')?.addEventListener('click', prevImage);
    document.querySelector('.next-mobile')?.addEventListener('click', nextImage);
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.classList.contains('mobile-nav-link')) return;
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
        });
    });

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

    updateCarousel();
    handleScrollAnimations();

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






