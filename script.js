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