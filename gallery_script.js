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
            const targetHref = this.getAttribute('href');

            if (!targetHref.startsWith('#')) {
                toggleMobileMenu(true);
                return; 
            }

            e.preventDefault();
            const targetElement = document.querySelector(targetHref);
            
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
    
    //Category and Subcategory Structure
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

    // Artifact information structure 
    const allArtifacts = [
        {
            id: 1,
            title: 'Miniture Car Models',
            category: 'collectibles',
            subcategory: 'cars',
            era: '(1980s-1990s)',
            location: 'United Kingdom',
            image: 'assets/KanzProducts/IMG_0225.PNG',
            description: 'A diverse collection of classical cars from the United Kingdom for collectors and amateur fans alike',
            type: 'Miniture Model',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'Classical cars from different UK based brands from the 1980s and 1990s in varying conditions.',
            keywords: ['gramophone', 'victorian', 'england', 'brass', 'oak', 'wood', 'steel', 'sound', 'recording', 'music', 'antique', 'london', 'horn', 'acoustic', 'mechanical'],
            images: [
                'assets/KanzProducts/IMG_0225.PNG',
                'assets/KanzProducts/IMG_0226.PNG',
				'assets/KanzProducts/IMG_0227.PNG',
				'assets/KanzProducts/IMG_0228.PNG',
				'assets/KanzProducts/IMG_0229.PNG',
				'assets/KanzProducts/IMG_0230.PNG',
				'assets/KanzProducts/IMG_0231.PNG',
				'assets/KanzProducts/IMG_0232.PNG',
				'assets/KanzProducts/IMG_0233.PNG',
				'assets/KanzProducts/IMG_0234.PNG',
				'assets/KanzProducts/IMG_0235.PNG',
				'assets/KanzProducts/IMG_0236.PNG',
				'assets/KanzProducts/IMG_0237.PNG',
				'assets/KanzProducts/IMG_0238.PNG',
				'assets/KanzProducts/IMG_0239.PNG',
				'assets/KanzProducts/IMG_0240.PNG',
				'assets/KanzProducts/IMG_0241.PNG',
				'assets/KanzProducts/IMG_0242.PNG',
				'assets/KanzProducts/IMG_0243.PNG',
				'assets/KanzProducts/IMG_0244.PNG',
				'assets/KanzProducts/IMG_0245.PNG',
				'assets/KanzProducts/IMG_0246.PNG',
				'assets/KanzProducts/IMG_0247.PNG',
				'assets/KanzProducts/IMG_0248.PNG',
				'assets/KanzProducts/IMG_0249.PNG',
				'assets/KanzProducts/IMG_0250.PNG',
				'assets/KanzProducts/IMG_0251.PNG',
				'assets/KanzProducts/IMG_0252.PNG',
				'assets/KanzProducts/IMG_0253.PNG',
				'assets/KanzProducts/IMG_0254.PNG',
				'assets/KanzProducts/IMG_0274.PNG',
				'assets/KanzProducts/IMG_0277.PNG',
				'assets/KanzProducts/IMG_0281.PNG',
				'assets/KanzProducts/IMG_0282.PNG',
				
				
            ]
        },
        {
            id: 2,
            title: 'Victorian Vanity Set',
            category: 'for-her',
            subcategory: 'jewellery',
            era: 'VICTORIAN ERA (1837-1901)',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0192.PNG',
            description: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and precious stones. Each piece tells a story of craftsmanship and elegance from a bygone era.',
            type: 'Vanity Set',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and embroidery. Each piece in this set demonstrates the exceptional craftsmanship of 19th-century jewelers, with hand-engraved details and carefully selected gemstones. The design reflects the romantic sensibilities of the Victorian era, incorporating nature motifs and symbolic elements that were popular among the aristocracy.',
            keywords: ['jewelry', 'victorian', 'england', 'gold', 'diamonds', 'pearls', 'necklace', 'earrings', 'brooch', 'aristocracy', 'luxury', 'precious', 'stones', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0192.PNG',
            ]
        },
		{
            id: 16,
            title: 'Victorian Vanity Set',
            category: 'for-her',
            subcategory: 'jewellery',
            era: 'VICTORIAN ERA (1837-1901)',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0193.PNG',
            description: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and precious stones. Each piece tells a story of craftsmanship and elegance from a bygone era.',
            type: 'Vanity Set',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and embroidery. Each piece in this set demonstrates the exceptional craftsmanship of 19th-century jewelers, with hand-engraved details and carefully selected gemstones. The design reflects the romantic sensibilities of the Victorian era, incorporating nature motifs and symbolic elements that were popular among the aristocracy.',
            keywords: ['jewelry', 'victorian', 'england', 'gold', 'diamonds', 'pearls', 'necklace', 'earrings', 'brooch', 'aristocracy', 'luxury', 'precious', 'stones', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0193.PNG',
            ]
        },
        {
            id: 3,
            title: 'Antique Mantel Clock',
            category: 'home',
            subcategory: 'brass',
            era: '1900s',
            location: 'Germany',
            image: 'assets/KanzProducts/IMG_0182.PNG',
            description: 'A beautifully preserved timepiece showcasing the mechanical mastery of German clockmakers. Features an ornate marble case with brass fittings and a melodious chime mechanism.',
            type: 'Mechanical Clock',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A beautifully preserved timepiece showcasing the mechanical mastery of German clockmakers. This elegant mantel clock features an ornate marble case with brass fittings and a melodious chime mechanism that strikes the hours with precision. The movement is entirely mechanical, powered by weights and regulated by a pendulum system that demonstrates the sophisticated understanding of horology during this period. The clock face features Roman numerals and delicate hands, while the case is adorned with carved decorative elements typical of German furniture design.',
            keywords: ['clock', 'mantel', 'victorian', 'england', 'mahogany', 'brass', 'crystal', 'timepiece', 'mechanical', 'chime', 'pendulum', 'horology', 'roman', 'numerals', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0182.PNG',
            ]
        },
        {
            id: 4,
            title: 'Red Base Globe',
            category: 'home',
            subcategory: 'globe',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0188.PNG',
            description: 'Simple antique globe',
            type: 'Globe',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'An elegant porcelain tea service featuring hand-painted floral designs and gold gilt accents. This complete set represents the height of Victorian tea culture and social refinement, when afternoon tea was an essential ritual of proper society. Each piece is hand-painted with delicate roses and forget-me-nots, finished with 24-karat gold trim that catches the light beautifully. The set includes a teapot, sugar bowl, cream jug, and six cups with saucers, all crafted from the finest bone china and fired at high temperatures for durability and translucency.',
            keywords: ['tea', 'teapot', 'porcelain', 'victorian', 'england', 'royal', 'china', 'gold', 'gilt', 'floral', 'roses', 'pottery', 'ceramic', 'service', 'antique'],
            images: ['assets/KanzProducts/IMG_0188.PNG'] 
        },
        {
            id: 5,
            title: 'Tanned Globe',
            category: 'home',
            subcategory: 'globe',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0189.PNG',
            description: 'Simple antique globe',
            type: 'Globe',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'An elegant porcelain tea service featuring hand-painted floral designs and gold gilt accents. This complete set represents the height of Victorian tea culture and social refinement, when afternoon tea was an essential ritual of proper society. Each piece is hand-painted with delicate roses and forget-me-nots, finished with 24-karat gold trim that catches the light beautifully. The set includes a teapot, sugar bowl, cream jug, and six cups with saucers, all crafted from the finest bone china and fired at high temperatures for durability and translucency.',
            keywords: ['tea', 'teapot', 'porcelain', 'victorian', 'england', 'royal', 'china', 'gold', 'gilt', 'floral', 'roses', 'pottery', 'ceramic', 'service', 'antique'],
            images: ['assets/KanzProducts/IMG_0189.PNG'] 
        },
        {
            id: 6,
            title: 'Wellington Collection Eagle Sculpture',
            category: 'collectibles',
            subcategory: 'sculptures',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0198.PNG',
            description: 'A masterfully sculpted eagle',
            type: 'Sculpture',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A masterfully crafteds sculpture representing a soaring eagle. The intricate details showcase the sculptor\'s exceptional skill and artistic vision. The smooth finish and lifelike expression demonstrate the highest level of sculptural achievement.',
            keywords: ['statue', 'bust', 'marble', 'neoclassical', 'uk', 'carrara', 'sculpture', 'classical', 'roman', 'greek', 'stone', 'art', 'carved', 'antique'],
            images: ['assets/KanzProducts/IMG_0198.PNG'] 
        },
        {
            id: 7,
            title: 'French Vase',
            category: 'home',
            subcategory: 'porcelain',
            era: '1980s',
            location: 'France',
            image: 'assets/KanzProducts/IMG_0178.PNG',
            description: 'An exceptional piece of French porcelain featuring intricate blue and white patterns.',
            type: 'Porcelain Vase',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'An exceptional piece of French porcelain featuring intricate blue and white patterns. This vase represents the pinnacle of French ceramic artistry, with hand-painted designs that tell stories of natural beauty.',
            keywords: ['ming', 'dynasty', 'vase', 'china', 'chinese', 'porcelain', 'blue', 'white', 'ceramic', 'imperial', 'antique'],
            images: ['assets/KanzProducts/IMG_0178.PNG'] 
        },
        {
            id: 8,
			title: 'Antique Mahogany Base Eagle Sculpture',
            category: 'collectibles',
            subcategory: 'sculptures',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0195.PNG',
            description: 'A masterfully sculpted eagle.',
            type: 'Sculpture',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A masterfully crafteds sculpture representing a soaring eagle. The intricate details showcase the sculptor\'s exceptional skill and artistic vision. The smooth finish and lifelike expression demonstrate the highest level of sculptural achievement.',
            keywords: ['statue', 'bust', 'marble', 'neoclassical', 'uk', 'carrara', 'sculpture', 'classical', 'roman', 'greek', 'stone', 'art', 'carved', 'antique'],
            images: ['assets/KanzProducts/IMG_0195.PNG'] 
        },
        {
            id: 9,
            title: 'Perched White Owl Sculpture',
            category: 'collectibles',
            subcategory: 'sculptures',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0196.PNG',
            description: 'A masterfully sculpted owl.',
            type: 'Sculpture',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A masterfully crafteds sculpture representing a soaring owl. The intricate details showcase the sculptor\'s exceptional skill and artistic vision. The smooth finish and lifelike expression demonstrate the highest level of sculptural achievement.',
            keywords: ['statue', 'bust', 'marble', 'neoclassical', 'uk', 'carrara', 'sculpture', 'classical', 'roman', 'greek', 'stone', 'art', 'carved', 'antique'],
            images: ['assets/KanzProducts/IMG_0196.PNG']  
        },
        {
            id: 10,
            title: 'Bronze Colored Roman Chariot Sculpture',
            category: 'collectibles',
            subcategory: 'sculptures',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0197.PNG',
            description: 'A masterfully sculpted chariot.',
            type: 'Sculpture',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A masterfully crafteds sculpture representing a galloping chariot. The intricate details showcase the sculptor\'s exceptional skill and artistic vision. The smooth finish and lifelike expression demonstrate the highest level of sculptural achievement.',
            keywords: ['statue', 'bust', 'marble', 'neoclassical', 'uk', 'carrara', 'sculpture', 'classical', 'roman', 'greek', 'stone', 'art', 'carved', 'antique'],
            images: ['assets/KanzProducts/IMG_0197.PNG']  
        },
        {
            id: 11,
           title: 'White Horse Sculpture',
            category: 'collectibles',
            subcategory: 'sculptures',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0199.PNG',
            description: 'A masterfully sculpted horse.',
            type: 'Sculpture',
            rarity: 5,
            availability: 'Available',
            fullDescription: 'A masterfully crafteds sculpture representing a standing horse The intricate details showcase the sculptor\'s exceptional skill and artistic vision. The smooth finish and lifelike expression demonstrate the highest level of sculptural achievement.',
            keywords: ['statue', 'bust', 'marble', 'neoclassical', 'uk', 'carrara', 'sculpture', 'classical', 'roman', 'greek', 'stone', 'art', 'carved', 'antique'],
            images: ['assets/KanzProducts/IMG_0199.PNG']  
        },
        {
            id: 12,
            title: 'French Porcelain Trinket box',
            category: 'for-her',
            subcategory: 'trinkets',
            era: '1900s',
            location: 'France',
            image: 'assets/KanzProducts/IMG_0179.PNG',
            description: 'A small storage box for trinkets and other small items. Great gift idea',
            type: 'Trinket Box',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A trinket box is a small container designed to hold jewelry, coins, or sentimental items. Often made from wood, porcelain, or metal, it combines practicality with decorative charm.',
            keywords: ['jewelry', 'victorian', 'France', 'gold', 'diamonds', 'pearls', 'necklace', 'earrings', 'brooch', 'aristocracy', 'luxury', 'precious', 'stones', 'antique'],
            images: ['assets/KanzProducts/IMG_0179.PNG'] 
        },
        {
            id: 13,
			title: 'Flower Fairies Trinket box',
            category: 'for-her',
            subcategory: 'trinkets',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0171.PNG',
            description: 'A small storage box for trinkets and other small items. Great gift idea',
            type: 'Trinket Box',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A trinket box is a small container designed to hold jewelry, coins, or sentimental items. Often made from wood, porcelain, or metal, it combines practicality with decorative charm.',
            keywords: ['jewelry', 'victorian', 'england', 'gold', 'diamonds', 'pearls', 'necklace', 'earrings', 'brooch', 'aristocracy', 'luxury', 'precious', 'stones', 'antique'],
            images: ['assets/KanzProducts/IMG_0171.PNG'] 
        },
        {
            id: 14,
            title: 'Floral Trinket box',
            category: 'for-her',
            subcategory: 'trinkets',
            era: '1900s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0194.PNG',
            description: 'A small storage box for trinkets and other small items. Great gift idea',
            type: 'Trinket Box',
            rarity: 2,
            availability: 'Available',
            fullDescription: 'A trinket box is a small container designed to hold jewelry, coins, or sentimental items. Often made from wood, porcelain, or metal, it combines practicality with decorative charm.',
            keywords: ['jewelry', 'victorian', 'england', 'gold', 'diamonds', 'pearls', 'necklace', 'earrings', 'brooch', 'aristocracy', 'luxury', 'precious', 'stones', 'antique'],
            images: ['assets/KanzProducts/IMG_0194.PNG'] 
        },
		{
            id: 15,
            title: 'Victorian Vanity Set',
            category: 'for-her',
            subcategory: 'jewellery',
            era: 'VICTORIAN ERA (1837-1901)',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0190.PNG',
            description: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and precious stones. Each piece tells a story of craftsmanship and elegance from a bygone era.',
            type: 'Vanity Set',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'An exquisite collection of Victorian-era jewelry featuring intricate metalwork and embroidery. Each piece in this set demonstrates the exceptional craftsmanship of 19th-century jewelers, with hand-engraved details and carefully selected gemstones. The design reflects the romantic sensibilities of the Victorian era, incorporating nature motifs and symbolic elements that were popular among the aristocracy.',
            keywords: ['jewelry', 'victorian', 'england', 'gold', 'diamonds', 'pearls', 'necklace', 'earrings', 'brooch', 'aristocracy', 'luxury', 'precious', 'stones', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0190.PNG',
            ]
		},
		{
            id: 17,
            title: 'Japanese Decorative Plate',
            category: 'home',
            subcategory: 'decorative-plates',
            era: '1970s',
            location: 'Japan',
            image: 'assets/KanzProducts/IMG_0201.PNG',
            description: 'An exquisite japanese-art inspired decorative plate',
            type: 'Decorative Plate',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative plate with Japanese art masterfully hand-painted on it',
            keywords: ['japanese', 'plate', 'england', 'gold', 'decorative', 'china', 'porcelain', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0201.PNG',
            ]
		},
		{
            id: 18,
            title: 'Medieval Decorative Plate #1',
            category: 'home',
            subcategory: 'decorative-plates',
            era: '1980s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0210.PNG',
            description: 'An exquisite medieval art inspired decorative plate',
            type: 'Decorative Plate',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative plate with Medieval art masterfully hand-painted on it',
            keywords: ['japanese', 'plate', 'england', 'gold', 'decorative', 'china', 'porcelain', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0210.PNG',
            ]
		},
		{
            id: 19,
            title: 'Medieval Decorative Plate #2',
            category: 'home',
            subcategory: 'decorative-plates',
            era: '1980s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0211.PNG',
            description: 'An exquisite medieval art inspired decorative plate',
            type: 'Decorative Plate',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative plate with Medieval art masterfully hand-painted on it',
            keywords: ['japanese', 'plate', 'england', 'gold', 'decorative', 'china', 'porcelain', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0211.PNG',
            ]
		},
		{
            id: 20,
            title: 'Medieval Decorative Plate #3',
            category: 'home',
            subcategory: 'decorative-plates',
            era: '1980s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0213.PNG',
            description: 'An exquisite medieval art inspired decorative plate',
            type: 'Decorative Plate',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative plate with Medieval art masterfully hand-painted on it',
            keywords: ['japanese', 'plate', 'england', 'gold', 'decorative', 'china', 'porcelain', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0213.PNG',
            ]
		},
		{
            id: 21,
            title: 'Medieval Decorative Plate #4',
            category: 'home',
            subcategory: 'decorative-plates',
            era: '1980s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0214.PNG',
            description: 'An exquisite medieval art inspired decorative plate',
            type: 'Decorative Plate',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative plate with Medieval art masterfully hand-painted on it',
            keywords: ['japanese', 'plate', 'england', 'gold', 'decorative', 'china', 'porcelain', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0214.PNG',
            ]
		},
		{
            id: 22,
            title: 'Medieval Decorative Plate #5',
            category: 'home',
            subcategory: 'decorative-plates',
            era: '1980s',
            location: 'England',
            image: 'assets/KanzProducts/IMG_0215.PNG',
            description: 'An exquisite medieval art inspired decorative plate',
            type: 'Decorative Plate',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative plate with Medieval art masterfully hand-painted on it',
            keywords: ['japanese', 'plate', 'england', 'gold', 'decorative', 'china', 'porcelain', 'antique'],
            images: [
                'assets/KanzProducts/IMG_0215.PNG',
            ]
		},
		{
            id: 23,
            title: 'Soviet Authentic Gas Mask',
            category: 'memorabilia',
            subcategory: 'soviet',
            era: '1960s',
            location: 'USSR',
            image: 'assets/KanzProducts/IMG_0177.PNG',
            description: 'A genuine gas mask used by the Red Army',
            type: 'Gas Mask',
            rarity: 4,
            availability: 'Available',
            fullDescription: 'A unique and rare piece of the history of the army. Used to help protect infantry from potential chemical and gas attacks',
            keywords: ['soviet', 'Army', 'gas', 'masl', 'memorabilia', 'collectible', 'ussr', 'war'],
            images: [
                'assets/KanzProducts/IMG_0177.PNG',
            ]
		},
		{
            id: 24,
            title: 'Small Stained Glass Asian Table Lamp',
            category: 'home',
            subcategory: 'brass',
            era: '1980s',
            location: 'Hong Kong',
            image: 'assets/KanzProducts/IMG_0187.PNG',
            description: 'A unique asian table lamp with brass finishing',
            type: 'Lamp',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative lamp with Medieval art masterfully hand-painted on it',
            keywords: ['asian', 'lantern', 'brass', 'glass', 'decorative', 'stained'],
            images: [
                'assets/KanzProducts/IMG_0187.PNG',
            ]
		},
		{
            id: 25,
            title: 'Small Stained Glass Asian Table Lamp',
            category: 'home',
            subcategory: 'brass',
            era: '1980s',
            location: 'Hong Kong',
            image: 'assets/KanzProducts/IMG_0186.PNG',
            description: 'A unique asian table lamp with brass finishing',
            type: 'Lamp',
            rarity: 3,
            availability: 'Available',
            fullDescription: 'A unique decorative lamp with Medieval art masterfully hand-painted on it',
            keywords: ['asian', 'lantern', 'brass', 'glass', 'decorative', 'stained'],
            images: [
                'assets/KanzProducts/IMG_0186.PNG',
            ]
		},
		
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
            
            let availabilitySpan = '';
            if (artifact.availability === 'Sold Out') {
                const availabilityClass = 'sold-out';
                const availabilityText = 'Sold Out';
                availabilitySpan = `<span class="artifact-location ${availabilityClass}">${availabilityText}</span>`;
            } else {
                availabilitySpan = '<span class="artifact-location"></span>';
            }

            const artifactHTML = `
                <div class="artifact-card" data-category="${artifact.category}" data-id="${artifact.id}">
                    <img src="${artifact.image}" alt="${artifact.title}" class="artifact-image">
                    <div class="artifact-content">
                        <h3 class="artifact-title">${artifact.title}</h3>
                        <div class="artifact-era">${artifact.era}</div>
                        <p class="artifact-description">${artifact.description}</p>
                        <div class="artifact-divider"></div>
                        <div class="artifact-footer">
                            ${availabilitySpan} 
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