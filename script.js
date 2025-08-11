// Typing Animation
const words = ['Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Student', 'Innovator'];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typedText');

function typeWriter() {
    const currentWord = words[currentWordIndex];
    
    if (!isDeleting) {
        // Typing
        typedTextElement.textContent = currentWord.slice(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentWord.length) {
            // Word complete, wait then start deleting
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        }
    } else {
        // Deleting
        typedTextElement.textContent = currentWord.slice(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
        }
    }
    
    // Adjust typing speed
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
}

// Skills Tab Functionality
let currentSkill = 0;
const skillTabs = document.querySelectorAll('.skill-tab');
const skillContents = document.querySelectorAll('.skill-content');

function showSkill(index) {
    // Remove active class from all tabs and contents
    skillTabs.forEach(tab => tab.classList.remove('active'));
    skillContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    skillTabs[index].classList.add('active');
    skillContents[index].classList.add('active');
    
    currentSkill = index;
}

// Add click event listeners to skill tabs
skillTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        showSkill(index);
    });
});

// Auto-rotate skills
function autoRotateSkills() {
    currentSkill = (currentSkill + 1) % skillTabs.length;
    showSkill(currentSkill);
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .interest-item, .skill-tab, .main-project');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax effect for floating orbs
function initParallax() {
    const orbs = document.querySelectorAll('.floating-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Add hover effects to project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add CSS for ripple effect
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeWriter();
    
    // Start auto-rotating skills after 5 seconds
    setTimeout(() => {
        setInterval(autoRotateSkills, 4000);
    }, 5000);
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize project card effects
    initProjectCardEffects();
    
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based animations
const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-orb');
    
    parallax.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform += ` translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', handleScroll);