document.addEventListener('DOMContentLoaded', function() {
    const mainCategoryButtons = document.querySelectorAll('.main-category-btn');
    const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
    const searchInput = document.getElementById('search-input');
    
    let activeMainCategory = 'all';
    let activeSubcategories = new Set();
    
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navContainer = document.querySelector('.nav-container');
    
    function toggleMobileMenu(forceClose = false) {
        if (!hamburger || !mobileMenu) return;
        
        if (forceClose) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            const isActive = mobileMenu.classList.contains('active');
            hamburger.classList.toggle('active', !isActive);
            mobileMenu.classList.toggle('active', !isActive);
            document.body.style.overflow = !isActive ? 'hidden' : '';
        }
    }
    
    if (hamburger) hamburger.addEventListener('click', () => toggleMobileMenu());
    if (mobileClose) mobileClose.addEventListener('click', () => toggleMobileMenu(true));
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            toggleMobileMenu(true);
            
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
    
    let lastScrollY = window.scrollY;
    function handleNavbarScroll() {
        if (window.innerWidth <= 1024 || !navContainer) return;
        
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navContainer.classList.add('hidden');
        } else {
            navContainer.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            toggleMobileMenu(true);
        }
    });
    
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalDisplayImage = document.getElementById('modal-display-image');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPeriod = document.getElementById('modal-period');
    const modalOrigin = document.getElementById('modal-origin');
    const modalMaterial = document.getElementById('modal-material');
    const modalRarity = document.getElementById('modal-rarity');
    const modalAvailability = document.getElementById('modal-availability');
    const modalType = document.getElementById('modal-type');

    function getStarRating(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '★' : '☆';
        }
        return stars;
    }
    
    const categoryStructure = {
        'books': {
            name: 'Books',
            subcategories: ['rare', 'novels', 'history', 'kurdistan', 'iraq', 'palestine', 'poetry', 'religious', 'islamic', 'christianity', 'judaism', 'comics', 'magazines']
        },
        'collectibles': {
            name: 'Collectibles',
            subcategories: ['bank-notes', 'coins', 'stamps', 'cars', 'comics', 'magazines', 'sculptures', 'taxidermy', 'maps', 'antique-prints']
        },
        'academic': {
            name: 'Academic Majors',
            subcategories: ['architecture', 'medical', 'law', 'pharmacy']
        },
        'memorabilia': {
            name: 'Memorabilia',
            subcategories: ['soviet', 'nazi', 'world-war']
        },
        'electronics': {
            name: 'Vintage Electronics',
            subcategories: ['typewriters', 'televisions', 'cameras']
        },
        'armoury': {
            name: 'Armoury',
            subcategories: ['swords', 'daggers', 'shields']
        },
        'for-her': {
            name: 'For Her',
            subcategories: ['jewellery', 'trinkets']
        },
        'home': {
            name: 'Home',
            subcategories: ['tea-sets', 'dinner-sets', 'cutlery', 'porcelain', 'decorative-plates', 'brass', 'globe', 'paintings']
        },
        'countries': {
            name: 'Countries',
            subcategories: ['british', 'egyptian', 'french']
        },
        'music': {
            name: 'Music',
            subcategories: ['vinyls', 'cds', 'cassettes', 'gramophones']
        }
    };

    const allArtifacts = [
        {
            id: 1,
            title: 'Historic Gramophone',
            category: 'music',
            subcategory: 'gramophones',
            era: 'VICTORIAN ERA (1837-1901)',
            location: 'England',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
            description: 'A magnificent example of early sound recording technology, this gramophone represents the dawn of home entertainment. Crafted with precision brass components and featuring hand-carved wooden elements.',
            type: 'Acoustic Player',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A magnificent example of early sound recording technology, this gramophone represents the dawn of home entertainment. Crafted with precision brass components and featuring hand-carved wooden elements, this piece showcases the ingenuity of Victorian-era inventors. The large brass horn amplifies sound naturally, while the intricate mechanical movement plays wax cylinders with remarkable clarity. This particular model was manufactured in London and represents the pinnacle of acoustic recording technology before the advent of electronic amplification.',
            keywords: ['gramophone', 'victorian', 'england', 'brass', 'oak', 'wood', 'steel', 'sound', 'recording', 'music', 'antique', 'london', 'horn', 'acoustic', 'mechanical'],
            images: [
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1517436338561-8b43f07a7837?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1547746219-4824559828ec?w=800&h=600&fit=crop'
            ]
        },
        {
            id: 2,
            title: 'Victorian Jewelry Set',
            category: 'for-her',
            subcategory: 'jewellery',
            era: 'VICTORIAN ERA (1837-1901)',
            location: 'England',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
            description: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and precious stones. Each piece tells a story of craftsmanship and elegance from a bygone era.',
            type: 'Jewellery Parure',
            rarity: 4,
            availability: 'Sold Out',
            fullDescription: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and precious stones. Each piece in this set demonstrates the exceptional craftsmanship of 19th-century jewelers, with hand-engraved details and carefully selected gemstones. The design reflects the romantic sensibilities of the Victorian era, incorporating nature motifs and symbolic elements that were popular among the aristocracy. This complete parure includes a necklace, earrings, and brooch, all crafted from 18-karat gold and adorned with old-cut diamonds and natural pearls.',
            keywords: ['jewelry', 'victorian', 'england', 'gold', 'diamonds', 'pearls', 'necklace', 'earrings', 'brooch', 'aristocracy', 'luxury', 'precious', 'stones', 'antique'],
            images: [
                'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1582294101168-f91d84e1b7f0?w=800&h=600&fit=crop' 
            ]
        },
        {
            id: 3,
            title: 'Antique Mantel Clock',
            category: 'home',
            subcategory: 'brass',
            era: 'VICTORIAN ERA (1837-1901)',
            location: 'England',
            image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=600&fit=crop',
            description: 'A beautifully preserved timepiece showcasing the mechanical mastery of Victorian clockmakers. Features an ornate wooden case with brass fittings and a melodious chime mechanism.',
            type: 'Mechanical Clock',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A beautifully preserved timepiece showcasing the mechanical mastery of Victorian clockmakers. This elegant mantel clock features an ornate mahogany case with brass fittings and a melodious chime mechanism that strikes the hours with precision. The movement is entirely mechanical, powered by weights and regulated by a pendulum system that demonstrates the sophisticated understanding of horology during this period. The clock face features Roman numerals and delicate hands, while the case is adorned with carved decorative elements typical of Victorian furniture design.',
            keywords: ['clock', 'mantel', 'victorian', 'england', 'mahogany', 'brass', 'crystal', 'timepiece', 'mechanical', 'chime', 'pendulum', 'horology', 'roman', 'numerals', 'antique'],
            images: [
                'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1550547668-55444983a54d?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1627964645391-76672322521c?w=800&h=600&fit=crop'
            ]
        },
        {
            id: 4,
            title: 'Royal Tea Service',
            category: 'home',
            subcategory: 'tea-sets',
            era: 'VICTORIAN ERA (1837-1901)',
            location: 'England',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
            description: 'An elegant porcelain tea service featuring hand-painted floral designs and gold gilt accents. This complete set represents the height of Victorian tea culture and social refinement.',
            type: 'Porcelain Set',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'An elegant porcelain tea service featuring hand-painted floral designs and gold gilt accents. This complete set represents the height of Victorian tea culture and social refinement, when afternoon tea was an essential ritual of proper society. Each piece is hand-painted with delicate roses and forget-me-nots, finished with 24-karat gold trim that catches the light beautifully. The set includes a teapot, sugar bowl, cream jug, and six cups with saucers, all crafted from the finest bone china and fired at high temperatures for durability and translucency.',
            keywords: ['tea', 'teapot', 'porcelain', 'victorian', 'england', 'royal', 'china', 'gold', 'gilt', 'floral', 'roses', 'pottery', 'ceramic', 'service', 'antique'],
            images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'] 
        },
        {
            id: 5,
            title: 'Vintage Tube Radio',
            category: 'electronics',
            subcategory: 'televisions',
            era: 'ART DECO ERA (1920-1940)',
            location: 'America',
            image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop',
            description: 'A stunning example of Art Deco design meeting cutting-edge radio technology. This beautifully crafted wooden cabinet houses the electronic marvels that brought the world into homes.',
            type: 'Vacuum Tube Radio',
            rarity: 4,
            availability: 'Sold Out',
            fullDescription: 'A stunning example of Art Deco design meeting cutting-edge radio technology. This beautifully crafted radio cabinet houses the electronic marvels that brought the world into homes during the golden age of broadcasting. The sleek Bakelite case exemplifies the Art Deco aesthetic with its geometric lines and rich amber color. Inside, vacuum tubes glow warmly as they amplify radio signals from distant stations, while the fabric speaker grille protects the large dynamic speaker. This model represents the transition from crystal radios to sophisticated superheterodyne receivers.',
            keywords: ['radio', 'vintage', 'tube', 'art', 'deco', 'america', 'bakelite', 'vacuum', 'tubes', 'fabric', 'electronic', 'broadcasting', 'amber', 'speaker', 'antique'],
            images: ['https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop'] 
        },
        {
            id: 6,
            title: 'Classical Marble Bust',
            category: 'collectibles',
            subcategory: 'sculptures',
            era: 'NEOCLASSICAL ERA (1750-1850)',
            location: 'Greece',
            image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop',
            description: 'A masterfully sculpted marble bust representing the revival of classical Greek and Roman artistic traditions. The intricate details showcase exceptional skill and artistic vision.',
            type: 'Marble Sculpture',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A masterfully sculpted marble bust representing the revival of classical Greek and Roman artistic traditions. The intricate details showcase the sculptor\'s exceptional skill and artistic vision, with every fold of drapery and curl of hair carved with precision from a single block of Carrara marble. This piece exemplifies the Neoclassical movement\'s dedication to idealized beauty and perfect proportions, drawing inspiration from ancient Greek and Roman sculptures while incorporating the refined techniques of 18th-century European artisans. The smooth finish and lifelike expression demonstrate the highest level of sculptural achievement.',
            keywords: ['statue', 'bust', 'marble', 'neoclassical', 'greece', 'carrara', 'sculpture', 'classical', 'roman', 'greek', 'stone', 'art', 'carved', 'antique'],
            images: ['https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop'] 
        },
        {
            id: 7,
            title: 'Ming Dynasty Vase',
            category: 'home',
            subcategory: 'porcelain',
            era: 'MING DYNASTY (1368-1644)',
            location: 'China',
            image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&h=600&fit=crop',
            description: 'An exceptional piece of Chinese porcelain featuring intricate blue and white patterns characteristic of the Ming Dynasty period.',
            type: 'Porcelain Vase',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'An exceptional piece of Chinese porcelain featuring intricate blue and white patterns characteristic of the Ming Dynasty period. This vase represents the pinnacle of Chinese ceramic artistry, with hand-painted designs that tell stories of imperial court life and natural beauty.',
            keywords: ['ming', 'dynasty', 'vase', 'china', 'chinese', 'porcelain', 'blue', 'white', 'ceramic', 'imperial', 'antique'],
            images: ['https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&h=600&fit=crop'] 
        },
        {
            id: 8,
            title: 'Persian Carpet Fragment',
            category: 'home',
            subcategory: 'paintings',
            era: 'SAFAVID PERIOD (1501-1736)',
            location: 'Persia',
            image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop',
            description: 'A rare fragment of a Persian carpet showcasing the intricate knotting techniques and vibrant dyes of the Safavid period.',
            type: 'Textile Fragment',
            rarity: 5,
            availability: 'Sold Out',
            fullDescription: 'A rare fragment of a Persian carpet showcasing the intricate knotting techniques and vibrant dyes of the Safavid period. This textile masterpiece demonstrates the sophisticated artistry of Persian weavers.',
            keywords: ['persian', 'carpet', 'textile', 'safavid', 'persia', 'silk', 'weaving', 'knots', 'antique'],
            images: ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop'] 
        },
        {
            id: 9,
            title: 'Egyptian Canopic Jar',
            category: 'countries',
            subcategory: 'egyptian',
            era: 'NEW KINGDOM (1550-1077 BC)',
            location: 'Egypt',
            image: 'https://images.unsplash.com/photo-1594736797933-d0dba4a3a3d8?w=800&h=600&fit=crop',
            description: 'An authentic Egyptian canopic jar used in the mummification process, featuring hieroglyphic inscriptions and traditional craftsmanship.',
            type: 'Burial Vessel',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'An authentic Egyptian canopic jar used in the mummification process, featuring hieroglyphic inscriptions and traditional craftsmanship. This artifact provides insight into ancient Egyptian burial customs.',
            keywords: ['egyptian', 'canopic', 'jar', 'egypt', 'hieroglyphic', 'mummification', 'limestone', 'ancient', 'antique'],
            images: ['https://images.unsplash.com/photo-1594736797933-d0dba4a3a3d8?w=800&h=600&fit=crop'] 
        },
        {
            id: 10,
            title: 'Art Nouveau Mirror',
            category: 'home',
            subcategory: 'brass',
            era: 'ART NOUVEAU (1890-1910)',
            location: 'France',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
            description: 'An elegant Art Nouveau mirror featuring flowing organic forms and nature-inspired motifs typical of the movement.',
            type: 'Bronze Mirror',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'An elegant Art Nouveau mirror featuring flowing organic forms and nature-inspired motifs typical of the movement. The bronze frame showcases the characteristic sinuous lines and botanical elements.',
            keywords: ['art', 'nouveau', 'mirror', 'france', 'bronze', 'organic', 'nature', 'botanical', 'antique'],
            images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'] 
        },
        {
            id: 11,
            title: 'Japanese Samurai Tsuba',
            category: 'armoury',
            subcategory: 'swords',
            era: 'EDO PERIOD (1603-1868)',
            location: 'Japan',
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
            description: 'A finely crafted iron tsuba (sword guard) featuring traditional Japanese metalworking techniques and symbolic designs.',
            type: 'Sword Guard (Tsuba)',
            rarity: 5,
            availability: 'Sold Out',
            fullDescription: 'A finely crafted iron tsuba (sword guard) featuring traditional Japanese metalworking techniques and symbolic designs. This piece demonstrates the artistic skill of Japanese swordsmiths.',
            keywords: ['japanese', 'samurai', 'tsuba', 'japan', 'iron', 'sword', 'guard', 'edo', 'metalwork', 'antique'],
            images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop'] 
        },
        {
            id: 12,
            title: 'Roman Glass Vessel',
            category: 'home',
            subcategory: 'porcelain',
            era: 'ROMAN EMPIRE (27 BC - 476 AD)',
            location: 'Italy',
            image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
            description: 'A well-preserved Roman glass vessel showcasing the advanced glassmaking techniques of the ancient world.',
            type: 'Ancient Glassware',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A well-preserved Roman glass vessel showcasing the advanced glassmaking techniques of the ancient world. This piece demonstrates the sophistication of Roman craftsmanship.',
            keywords: ['roman', 'glass', 'vessel', 'italy', 'ancient', 'empire', 'glassmaking', 'craftsmanship', 'antique'],
            images: ['https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop'] 
        },
        {
            id: 13,
            title: 'Medieval Illuminated Manuscript',
            category: 'books',
            subcategory: 'rare',
            era: 'MEDIEVAL PERIOD (500-1500)',
            location: 'England',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
            description: 'A rare illuminated manuscript featuring gold leaf decoration and intricate calligraphy from medieval monasteries.',
            type: 'Illuminated Book',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A rare illuminated manuscript featuring gold leaf decoration and intricate calligraphy from medieval monasteries. This book represents the pinnacle of medieval artistic and literary achievement.',
            keywords: ['medieval', 'manuscript', 'illuminated', 'england', 'parchment', 'gold', 'leaf', 'calligraphy', 'monastery', 'book', 'antique'],
            images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'] 
        },
        {
            id: 14,
            title: 'Rococo Porcelain Figurine',
            category: 'home',
            subcategory: 'porcelain',
            era: 'ROCOCO PERIOD (1720-1770)',
            location: 'Germany',
            image: 'https://images.unsplash.com/photo-1578408271953-0577d27ddd7e?w=800&h=600&fit=crop',
            description: 'An exquisite Rococo porcelain figurine featuring delicate modeling and hand-painted details in pastel colors.',
            type: 'Porcelain Figurine',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'An exquisite Rococo porcelain figurine featuring delicate modeling and hand-painted details in pastel colors. This piece exemplifies the refined elegance of the Rococo style.',
            keywords: ['rococo', 'porcelain', 'figurine', 'germany', 'delicate', 'pastel', 'enamel', 'elegant', 'antique'],
            images: ['https://images.unsplash.com/photo-1578408271953-0577d27ddd7e?w=800&h=600&fit=crop'] 
        },
        {
            id: 15,
            title: 'Celtic Bronze Torc',
            category: 'for-her',
            subcategory: 'jewellery',
            era: 'IRON AGE (800 BC - 100 AD)',
            location: 'Ireland',
            image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=600&fit=crop',
            description: 'An ancient Celtic bronze torc (neck ring) featuring intricate spiral patterns and masterful metalworking.',
            type: 'Bronze Jewellery',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'An ancient Celtic bronze torc (neck ring) featuring intricate spiral patterns and masterful metalworking. This piece represents the sophisticated artistry of Celtic craftsmen.',
            keywords: ['celtic', 'bronze', 'torc', 'ireland', 'iron', 'age', 'spiral', 'patterns', 'metalworking', 'ancient', 'antique'],
            images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=600&fit=crop'] 
        }
    ];
    
    const itemsPerPage = 12;
    let currentPage = 1;
    let currentDataSet = allArtifacts;
    let totalPages = Math.ceil(allArtifacts.length / itemsPerPage);
    
    let currentSearchTerm = '';
    
    mainCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            mainCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.subcategory-buttons').forEach(section => {
                section.classList.remove('active');
            });
            
            activeSubcategories.clear();
            subcategoryButtons.forEach(btn => btn.classList.remove('active'));
            
            activeMainCategory = category;
            
            if (category !== 'all') {
                const subcategorySection = document.getElementById(`subcategories-${category}`);
                if (subcategorySection) {
                    subcategorySection.classList.add('active');
                }
            }
            
            currentPage = 1;
            applyFiltersAndPagination();
        });
    });
    
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subcategory = this.getAttribute('data-subcategory');
            
            if (activeSubcategories.has(subcategory)) {
                activeSubcategories.delete(subcategory);
                this.classList.remove('active');
            } else {
                activeSubcategories.add(subcategory);
                this.classList.add('active');
            }
            
            currentPage = 1;
            applyFiltersAndPagination();
        });
    });
    
    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.toLowerCase().trim();
        currentPage = 1;
        applyFiltersAndPagination();
    });
    
    function applyFiltersAndPagination() {
        let filteredData = allArtifacts.filter(artifact => {
            let categoryMatch = false;
            
            if (activeSubcategories.size > 0) {
                categoryMatch = activeSubcategories.has(artifact.subcategory);
            }
            else {
                categoryMatch = activeMainCategory === 'all' || artifact.category === activeMainCategory;
            }
            
            let searchMatch = true;
            if (currentSearchTerm !== '') {
                const searchFields = [
                    artifact.title,
                    artifact.era,
                    artifact.location,
                    artifact.description,
                    artifact.type,
                    artifact.availability,
                    ...artifact.keywords
                ].join(' ').toLowerCase();
                
                searchMatch = searchFields.includes(currentSearchTerm);
            }
            
            return categoryMatch && searchMatch;
        });
        
        currentDataSet = filteredData;
        totalPages = Math.ceil(currentDataSet.length / itemsPerPage);
        
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 1;
        }
        
        displayArtifacts();
        updatePaginationControls();
        updatePaginationInfo();
        showNoResultsMessage(currentDataSet.length === 0);
    }
    
    function displayArtifacts() {
        const artifactsGrid = document.getElementById('artifacts-grid');
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageArtifacts = currentDataSet.slice(startIndex, endIndex);
        
        artifactsGrid.innerHTML = '';
        
        pageArtifacts.forEach((artifact, index) => {
            const availabilityClass = artifact.availability === 'Sold Out' ? 'sold-out' : 'available';
            const availabilityText = artifact.availability === 'Sold Out' ? 'Sold Out' : 'Available';
            
            const artifactHTML = `
                <div class="artifact-card" data-category="${artifact.category}" data-id="${artifact.id}">
                    <img src="${artifact.image}" alt="${artifact.title}" class="artifact-image">
                    <div class="artifact-content">
                        <h3 class="artifact-title">${artifact.title}</h3>
                        <div class="artifact-era">${artifact.era}</div>
                        <p class="artifact-description">${artifact.description}</p>
                        <div class="artifact-divider"></div>
                        <div class="artifact-footer">
                            <span class="artifact-location ${availabilityClass}">${availabilityText}</span>
                            <button class="view-details-btn">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            artifactsGrid.insertAdjacentHTML('beforeend', artifactHTML);
        });
        
        addArtifactEventListeners();
        
        const newCards = artifactsGrid.querySelectorAll('.artifact-card');
        newCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100 + 100);
        });
    }
    
    function addArtifactEventListeners() {
        const artifactCards = document.querySelectorAll('.artifact-card');
        
        artifactCards.forEach(card => {
            const viewBtn = card.querySelector('.view-details-btn');
            
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const artifactId = parseInt(card.dataset.id);
                const artifact = allArtifacts.find(item => item.id === artifactId);
                if (artifact) {
                    openModal(artifact);
                }
            });
        });
    }
    
    function updatePaginationControls() {
        const paginationNumbers = document.getElementById('pagination-numbers');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const controlsContainer = document.querySelector('.pagination-controls');

        if (!paginationNumbers || !prevBtn || !nextBtn || !controlsContainer) return;
        
        paginationNumbers.innerHTML = '';
        
        if (totalPages <= 1) {
            controlsContainer.style.display = 'none';
            return;
        }
        
        controlsContainer.style.display = 'flex';
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalPages;
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            addPageNumber(1);
            if (startPage > 2) {
                paginationNumbers.insertAdjacentHTML('beforeend', '<span class="pagination-ellipsis">...</span>');
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            addPageNumber(i);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationNumbers.insertAdjacentHTML('beforeend', '<span class="pagination-ellipsis">...</span>');
            }
            addPageNumber(totalPages);
        }
        
        function addPageNumber(pageNum) {
            const pageElement = document.createElement('button');
            pageElement.className = `pagination-number ${pageNum === currentPage ? 'active' : ''}`;
            pageElement.textContent = pageNum;
            pageElement.addEventListener('click', () => goToPage(pageNum));
            paginationNumbers.appendChild(pageElement);
        }
    }
    
    function updatePaginationInfo() {
        const infoText = document.getElementById('pagination-info-text');
        if (!infoText) return;
        
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, currentDataSet.length);
        const totalItems = currentDataSet.length;
        
        let infoMessage = '';
        
        if (totalItems > 0 && totalPages > 1) {
            infoMessage = `Showing ${startItem}-${endItem} of ${totalItems} artifacts`;
        } else if (totalItems > 0 && totalPages <= 1) {
            infoMessage = `Showing ${totalItems} artifacts`;
        }
        
        infoText.textContent = infoMessage;
    }

    function goToPage(pageNum) {
        if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
            currentPage = pageNum;
            applyFiltersAndPagination();
            
            document.getElementById('artifacts-grid').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });

    function openModal(artifact) {
        modalTitle.textContent = artifact.title;
        modalPeriod.textContent = artifact.era;
        modalOrigin.textContent = artifact.location;
        modalDescription.textContent = artifact.fullDescription;

        const rarityStars = getStarRating(artifact.rarity);

        document.getElementById('spec-rarity-value').innerHTML = `<span class="star-rating">${rarityStars}</span>`;
        document.getElementById('spec-availability-value').textContent = artifact.availability;
        document.getElementById('spec-type-value').textContent = artifact.type;

        const availabilityElement = document.getElementById('spec-availability-value');
        availabilityElement.className = artifact.availability === 'Sold Out' ? 'spec-value sold-out-text' : 'spec-value available-text';
        
        modalThumbnails.innerHTML = ''; 
        
        const imagesToDisplay = Array.isArray(artifact.images) && artifact.images.length > 0
            ? artifact.images
            : [artifact.image]; 
        
        if (modalDisplayImage) {
            modalDisplayImage.src = imagesToDisplay[0];
            modalDisplayImage.alt = artifact.title;
        }

        imagesToDisplay.forEach((imgUrl, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imgUrl;
            thumbnail.alt = `${artifact.title} View ${index + 1}`;
            thumbnail.className = 'thumbnail-image';
            
            if (index === 0) {
                thumbnail.classList.add('active');
            }

            thumbnail.addEventListener('click', () => switchMainImage(imgUrl, thumbnail));
            thumbnail.addEventListener('mouseover', () => switchMainImage(imgUrl, thumbnail));
            
            modalThumbnails.appendChild(thumbnail);
        });
        
        modalThumbnails.style.display = imagesToDisplay.length > 1 ? 'flex' : 'none';

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function switchMainImage(newImageUrl, clickedThumbnail) {
        if (modalDisplayImage.src !== newImageUrl) {
            modalDisplayImage.style.opacity = '0';
            
            setTimeout(() => {
                modalDisplayImage.src = newImageUrl;
                modalDisplayImage.style.opacity = '1';
            }, 150);
        }

        document.querySelectorAll('.thumbnail-image').forEach(thumb => {
            thumb.classList.remove('active');
        });
        clickedThumbnail.classList.add('active');
    }

    function showNoResultsMessage(show) {
        let noResultsMsg = document.getElementById('no-results-message');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'no-results-message';
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div class="no-results-content">
                    <h3>No artifacts found matching your criteria.</h3>
                </div>
            `;
            document.getElementById('artifacts-grid').appendChild(noResultsMsg);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    window.clearSearch = function() {
        searchInput.value = '';
        currentSearchTerm = '';
        activeMainCategory = 'all';
        currentPage = 1;
        activeSubcategories.clear();
        
        mainCategoryButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
        subcategoryButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.subcategory-buttons').forEach(section => {
            section.classList.remove('active');
        });
        
        applyFiltersAndPagination();
    };

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    const footer = document.querySelector('.footer');
    const footerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    if (footer) {
        footerObserver.observe(footer);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element) {
        const target = element.textContent;
        const isPlus = target.includes('+');
        const number = parseInt(target.replace('+', '').replace('%', ''));
        let current = 0;
        const increment = number / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (isPlus ? '+' : target.includes('%') ? '%' : '');
            }
        }, 50);
    }

    applyFiltersAndPagination();
});