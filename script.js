// Enhanced Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingSpinner').classList.add('hidden');
        // Initialize animations after loading
        initializeAnimations();
    }, 2000);
});

// Dynamic Tab Titles
const pageTitles = {
    'home': 'Ajyad Investment - Home',
    'about': 'About Ajyad Investment',
    'profile': 'Company Profile - Ajyad Investment',
    'sectors': 'Our Investment Sectors',
    'board': 'Board of Directors',
    'contact': 'Contact Ajyad Investment'
};

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.getElementById('mainNav').classList.add('scrolled');
    } else {
        document.getElementById('mainNav').classList.remove('scrolled');
    }

    // Scroll to top button
    if (window.scrollY > 300) {
        document.getElementById('scrollToTop').classList.add('show');
    } else {
        document.getElementById('scrollToTop').classList.remove('show');
    }

    // Trigger animations on scroll
    checkAnimations();
});

// Scroll to top functionality
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            // Update page title
            if (pageTitles[targetId]) {
                document.title = pageTitles[targetId];
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation system
function initializeAnimations() {
    // Add animation classes to all elements that should animate
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.classList.add('animated');
    });
}

function checkAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animated');
        } else {
            element.classList.remove('animated');
        }
    });
}

// Counter animation for stats
function animateCounter(element, finalValue, duration) {
    let start = 0;
    const increment = finalValue / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= finalValue) {
            element.textContent = finalValue + (element.id === 'stat4' ? 'M+' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.id === 'stat4' ? 'M+' : '+');
        }
    }, 16);
}

// Intersection Observer for counter animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.getElementById('stat1'), 15, 2000);
            animateCounter(document.getElementById('stat2'), 200, 2000);
            animateCounter(document.getElementById('stat3'), 6, 2000);
            animateCounter(document.getElementById('stat4'), 50, 2000);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats-section'));

// Form submission animation
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAnimations();
});
