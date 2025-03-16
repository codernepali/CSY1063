// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get the mobile navigation toggle button
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    // Get the navigation links container
    const navLinks = document.querySelector('.nav-links');

    // Add click event listener to the mobile navigation toggle
    mobileNavToggle.addEventListener('click', function() {
        // Toggle the 'open' class on the navigation links
        navLinks.classList.toggle('open');
        
        // Update the aria-expanded attribute for accessibility
        const isExpanded = navLinks.classList.contains('open');
        mobileNavToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close the mobile menu when a navigation link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Only perform this action on mobile view
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', false);
            }
        });
    });

    // Close the mobile menu when clicking outside the menu
    document.addEventListener('click', function(event) {
        const isNavLinks = navLinks.contains(event.target);
        const isNavToggle = mobileNavToggle.contains(event.target);
        
        // If clicked outside of nav and toggle, and menu is open, close it
        if (!isNavLinks && !isNavToggle && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', false);
        }
    });

    // Add scroll animation for smooth scrolling to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements when they become visible during scroll
    const fadeInElements = document.querySelectorAll('.project-card, .about-content, .contact-container, .video-container, .report-section');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        
        fadeInElements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            appearOnScroll.observe(element);
        });
        
        // Add CSS for the appear class
        document.head.insertAdjacentHTML('beforeend', 
            '<style>.appear { opacity: 1 !important; transform: translateY(0) !important; }</style>'
        );
    }
}); 
