// Global variables
        let memories = [];
        
        // Set your relationship start date and time here
        const relationshipStart = new Date('2025-04-12 22:23:00');

        // Initialize everything when DOM loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeNavigation();
            initializeLoveTimer();
            initializeGallery();
            initializeHeartAnimation();
        });

        // Navigation functionality
        function initializeNavigation() {
            const toggleBtn = document.querySelector('.toggle-btn');
            const dropdown = document.querySelector('.drop-down');

            function toggleDropdown(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('open');
            }

            function handleOutsideClick(event) {
                if (!toggleBtn.contains(event.target) && !dropdown.contains(event.target)) {
                    dropdown.classList.remove('open');
                }
            }

            toggleBtn.addEventListener('click', toggleDropdown);
            toggleBtn.addEventListener('touchstart', toggleDropdown);
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('touchstart', handleOutsideClick);

            // Enhanced smooth scroll for all anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                function handleScroll(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    
                    if (targetId === '#' || targetId === '#top') {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        const targetSection = document.querySelector(targetId);
                        if (targetSection) {
                            const navbarHeight = 80;
                            const offsetTop = targetSection.offsetTop - navbarHeight;
                            
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                    
                    dropdown.classList.remove('open');
                }
                
                anchor.addEventListener('click', handleScroll);
                anchor.addEventListener('touchstart', handleScroll);
            });
        }

        // Love Timer functionality
        function initializeLoveTimer() {
            function updateLoveTimer() {
                const now = new Date();
                const timeDifference = now - relationshipStart;
                
                const totalSeconds = Math.floor(timeDifference / 1000);
                const totalMinutes = Math.floor(totalSeconds / 60);
                const totalHours = Math.floor(totalMinutes / 60);
                const totalDays = Math.floor(totalHours / 24);
                
                const years = Math.floor(totalDays / 365);
                const months = Math.floor((totalDays % 365) / 30);
                const days = totalDays % 30;
                const hours = totalHours % 24;
                const minutes = totalMinutes % 60;
                const seconds = totalSeconds % 60;
                
                document.getElementById('years').textContent = years;
                document.getElementById('months').textContent = months;
                document.getElementById('days').textContent = days;
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
                
                document.getElementById('total-days').textContent = totalDays.toLocaleString();
                document.getElementById('total-hours').textContent = totalHours.toLocaleString();
                document.getElementById('total-minutes').textContent = totalMinutes.toLocaleString();
            }

            updateLoveTimer();
            setInterval(updateLoveTimer, 1000);
        }

        // Gallery functionality
        function initializeGallery() {
            const addImageBtn = document.getElementById('addImageBtn');
            const addImageMenu = document.getElementById('addImageMenu');
            const submitMemory = document.getElementById('submitMemory');
            const cancelMemory = document.getElementById('cancelMemory');
            const imageInput = document.getElementById('imageInput');
            const fileHelper = document.getElementById('fileHelper');

            console.log('Gallery initialized!');

            // Toggle menu
            addImageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                addImageMenu.classList.toggle('open');
                console.log('Menu toggled:', addImageMenu.classList.contains('open'));
            });

            // Cancel button
            cancelMemory.addEventListener('click', () => {
                closeMenu();
            });

            // Submit button
            submitMemory.addEventListener('click', () => {
                handleSubmit();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!addImageBtn.contains(e.target) && !addImageMenu.contains(e.target)) {
                    closeMenu();
                }
            });

            // File input change handler
            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    fileHelper.innerHTML = `
                        <i class="fa-solid fa-check-circle"></i>
                        <span>${file.name}</span>
                    `;
                    fileHelper.classList.add('has-file');
                } else {
                    resetFileHelper();
                }
            });

            function closeMenu() {
                addImageMenu.classList.remove('open');
                clearForm();
            }

            function clearForm() {
                document.getElementById('nameInput').value = '';
                document.getElementById('imageInput').value = '';
                document.getElementById('messageInput').value = '';
                resetFileHelper();
            }

            function resetFileHelper() {
                fileHelper.innerHTML = `
                    <i class="fa-solid fa-camera"></i>
                    <span>Tap to add photo</span>
                `;
                fileHelper.classList.remove('has-file');
            }

            function handleSubmit() {
                const nameInput = document.getElementById('nameInput');
                const messageInput = document.getElementById('messageInput');

                // Validation
                if (!nameInput.value.trim()) {
                    showNotification('Please enter your name!', 'error');
                    return;
                }

                if (!imageInput.files[0]) {
                    showNotification('Please select an image!', 'error');
                    return;
                }

                if (!messageInput.value.trim()) {
                    showNotification('Please write a message!', 'error');
                    return;
                }

                // Show loading state
                submitMemory.disabled = true;
                submitMemory.textContent = 'Adding Memory...';

                // Create memory object
                const memory = {
                    id: Date.now(),
                    name: nameInput.value.trim(),
                    message: messageInput.value.trim(),
                    timestamp: new Date(),
                    imageFile: imageInput.files[0]
                };

                // Process the image
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    memory.imageURL = e.target.result;
                    memories.unshift(memory);
                    createMemoryCard(memory);
                    
                    // Reset form
                    submitMemory.disabled = false;
                    submitMemory.textContent = 'Add Memory';
                    closeMenu();
                    
                    showNotification('Memory added successfully! ❤️', 'success');
                    console.log('Memory added:', memory);
                };

                reader.onerror = () => {
                    submitMemory.disabled = false;
                    submitMemory.textContent = 'Add Memory';
                    showNotification('Failed to process image. Please try again.', 'error');
                };
                
                reader.readAsDataURL(memory.imageFile);
            }
        }

        // Create memory card
        function createMemoryCard(memory) {
            const galleryGrid = document.getElementById('galleryGrid');
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.setAttribute('data-id', memory.id);

            const timePosted = formatTime(memory.timestamp);

            card.innerHTML = `
                <div class="card-header">
                    <div class="card-name">${escapeHtml(memory.name)}</div>
                    <div class="card-time">${timePosted}</div>
                </div>
                <img src="${memory.imageURL}" alt="Memory by ${escapeHtml(memory.name)}" class="card-image" loading="lazy">
                <div class="card-message">${escapeHtml(memory.message)}</div>
            `;

            // Add to the beginning of the grid
            galleryGrid.insertBefore(card, galleryGrid.firstChild);

            // Smooth scroll to show the new card
            setTimeout(() => {
                galleryGrid.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }, 100);

            // Add entrance animation
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-30px) scale(0.9)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0) scale(1)';
                }, 50);
            }, 10);
        }

        // Utility functions
        function formatTime(timestamp) {
            const now = new Date();
            const diff = now - timestamp;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (minutes < 1) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            if (days < 7) return `${days}d ago`;
            
            return timestamp.toLocaleDateString();
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function showNotification(message, type) {
            // Remove any existing notifications
            const existing = document.querySelector('.gallery-notification');
            if (existing) existing.remove();

            const notification = document.createElement('div');
            notification.className = `gallery-notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }

        // Heart animation functionality
        function initializeHeartAnimation() {
            function createFallingHeart() {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.className = 'falling-heart';
                
                const startX = Math.random() * window.innerWidth;
                const size = Math.random() * 20 + 15;
                const duration = Math.random() * 3 + 2;
                const rotation = Math.random() * 360;
                const sway = Math.random() * 100 - 50;
                
                heart.style.position = 'fixed';
                heart.style.left = startX + 'px';
                heart.style.top = '-50px';
                heart.style.fontSize = size + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                heart.style.userSelect = 'none';
                heart.style.transform = `rotate(${rotation}deg)`;
                heart.style.opacity = Math.random() * 0.7 + 0.3;
                heart.style.animation = `fallDown ${duration}s linear forwards`;
                heart.style.setProperty('--sway', sway + 'px');
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, duration * 1000);
            }

            function startHeartRain() {
                const heartCount = 15;
                
                for (let i = 0; i < heartCount; i++) {
                    setTimeout(() => {
                        createFallingHeart();
                    }, i * 100);
                }
            }

            // Add click event to logo
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.addEventListener('click', function(e) {
                    e.preventDefault();
                    startHeartRain();
                    
                    // Add bounce effect to logo
                    logo.style.transform = 'translateY(-2px) scale(1.2)';
                    setTimeout(() => {
                        logo.style.transform = 'translateY(-2px) scale(1)';
                    }, 200);
                });
                
                logo.style.transition = 'transform 0.2s ease';
            }
        }
           