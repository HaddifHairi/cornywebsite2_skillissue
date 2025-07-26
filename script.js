// script.js
const toggleBtn = document.querySelector('.toggle-btn');
const dropdown = document.querySelector('.drop-down');

// Function to toggle dropdown
function toggleDropdown(e) {
   e.preventDefault();
   e.stopPropagation();
   dropdown.classList.toggle('open');
}

// Add both click and touch events for mobile compatibility
toggleBtn.addEventListener('click', toggleDropdown);
toggleBtn.addEventListener('touchstart', toggleDropdown);

// Function to handle outside clicks/touches
function handleOutsideClick(event) {
   if (!toggleBtn.contains(event.target) && !dropdown.contains(event.target)) {
       dropdown.classList.remove('open');
   }
}

// Close dropdown when clicking/touching outside
document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchstart', handleOutsideClick);

// Close dropdown when any dropdown link is clicked
const dropdownLinks = document.querySelectorAll('.drop-down a');
dropdownLinks.forEach(link => {
   link.addEventListener('click', function() {
       dropdown.classList.remove('open');
   });
   
   // Add touch event for mobile
   link.addEventListener('touchstart', function() {
       dropdown.classList.remove('open');
   });
});

// Enhanced smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   function handleScroll(e) {
       e.preventDefault();
       
       const targetId = this.getAttribute('href');
       
       if (targetId === '#' || targetId === '#top') {
           // Scroll to top
           window.scrollTo({
               top: 0,
               behavior: 'smooth'
           });
       } else {
           // Scroll to specific section
           const targetSection = document.querySelector(targetId);
           if (targetSection) {
               const navbarHeight = 80; // Adjust based on your navbar height
               const offsetTop = targetSection.offsetTop - navbarHeight;
               
               window.scrollTo({
                   top: offsetTop,
                   behavior: 'smooth'
               });
           }
       }
       
       // Close dropdown after scrolling
       dropdown.classList.remove('open');
   }
   
   // Add both click and touch events
   anchor.addEventListener('click', handleScroll);
   anchor.addEventListener('touchstart', handleScroll);
});

// Prevent default touch behaviors that might interfere
document.addEventListener('touchstart', function() {}, { passive: true });

// Handle orientation change on mobile
window.addEventListener('orientationchange', function() {
   dropdown.classList.remove('open');
});

// Ensure dropdown closes when page loads
window.addEventListener('load', function() {
   dropdown.classList.remove('open');
});

// Love Stopwatch - Add this to your JavaScript file

// Set your relationship start date and time here
const relationshipStart = new Date('2025-04-12 22:23:00'); // Year-Month-Day Hour:Minute:Second

function updateLoveTimer() {
    const now = new Date();
    const timeDifference = now - relationshipStart;
    
    // Calculate time units
    const totalSeconds = Math.floor(timeDifference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    // Calculate remaining time for each unit
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = totalDays % 30;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    // Update the display
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update totals
    document.getElementById('total-days').textContent = totalDays.toLocaleString();
    document.getElementById('total-hours').textContent = totalHours.toLocaleString();
    document.getElementById('total-minutes').textContent = totalMinutes.toLocaleString();
}

// Start the timer when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update immediately
    updateLoveTimer();
    
    // Update every second
    setInterval(updateLoveTimer, 1000);
});

// Alternative: Simple version that just shows days/hours/minutes/seconds
function simpleLoveTimer() {
    const now = new Date();
    const timeDifference = now - relationshipStart;
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Update simple display
    document.getElementById('simple-timer').innerHTML = 
        `${days} days, ${hours}h ${minutes}m ${seconds}s`;
}

// For the simple version, use this instead:
// setInterval(simpleLoveTimer, 1000);


// Heart rain function
function createFallingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'falling-heart';
    
    // Random starting position across the screen width
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 20 + 15; // Random size between 15px and 35px
    const duration = Math.random() * 3 + 2; // Fall duration between 2-5 seconds
    const rotation = Math.random() * 360; // Random rotation
    const sway = Math.random() * 100 - 50; // Horizontal sway (-50px to +50px)
    
    // Set initial styles
    heart.style.position = 'fixed';
    heart.style.left = startX + 'px';
    heart.style.top = '-50px';
    heart.style.fontSize = size + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.userSelect = 'none';
    heart.style.transform = `rotate(${rotation}deg)`;
    heart.style.opacity = Math.random() * 0.7 + 0.3; // Random opacity
    
    // Animation properties
    heart.style.animation = `fallDown ${duration}s linear forwards`;
    heart.style.setProperty('--sway', sway + 'px');
    
    document.body.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, duration * 1000);
}

// Create multiple hearts
function startHeartRain() {
    const heartCount = 15; // Number of hearts to create
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createFallingHeart();
        }, i * 100); // Stagger the hearts every 100ms
    }
}

// Add click event to logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            startHeartRain();
            
            // Add a little bounce effect to the logo
            logo.style.transform = 'translateY(-2px) scale(1.2)';
            setTimeout(() => {
                logo.style.transform = 'translateY(-2px) scale(1)';
            }, 200);
        });
        
        // Add smooth transition for logo transform
        logo.style.transition = 'transform 0.2s ease';
    }
});

// CSS Animation (add this to your CSS file)
const heartStyles = `
@keyframes fallDown {
    0% {
        transform: translateY(-50px) translateX(0) rotate(var(--initial-rotation, 0deg));
        opacity: 1;
    }
    25% {
        transform: translateY(25vh) translateX(calc(var(--sway) * 0.3)) rotate(calc(var(--initial-rotation, 0deg) + 90deg));
    }
    50% {
        transform: translateY(50vh) translateX(calc(var(--sway) * 0.7)) rotate(calc(var(--initial-rotation, 0deg) + 180deg));
    }
    75% {
        transform: translateY(75vh) translateX(var(--sway)) rotate(calc(var(--initial-rotation, 0deg) + 270deg));
    }
    100% {
        transform: translateY(100vh) translateX(var(--sway)) rotate(calc(var(--initial-rotation, 0deg) + 360deg));
        opacity: 0.3;
    }
}

.falling-heart {
    position: fixed;
    pointer-events: none;
    user-select: none;
    z-index: 9999;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
`;

// Inject CSS styles
const styleSheet = document.createElement('style');
styleSheet.textContent = heartStyles;
document.head.appendChild(styleSheet);