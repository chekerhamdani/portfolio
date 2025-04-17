// Main JavaScript for Cheker Hamdani's Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Portfolio filtering
    const filterItems = document.querySelectorAll('.filter-item');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active filter
            filterItems.forEach(filter => filter.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(portfolioItem => {
                if (filterValue === 'all' || portfolioItem.getAttribute('data-category') === filterValue) {
                    portfolioItem.style.display = 'block';
                    setTimeout(() => {
                        portfolioItem.style.opacity = '1';
                        portfolioItem.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    portfolioItem.style.opacity = '0';
                    portfolioItem.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        portfolioItem.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this template, we'll just show a success message
            
            const formElements = contactForm.elements;
            let isValid = true;
            
            // Basic validation
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    `;
                }, 3000);
            }
        });
    }
    
    // Add animation to skill bars
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const progress = item.querySelector('.skill-progress');
            const percentage = progress.style.width;
            
            progress.style.width = '0';
            
            setTimeout(() => {
                progress.style.transition = 'width 1s ease-in-out';
                progress.style.width = percentage;
            }, 200);
        });
    }
    
    // Trigger skill animation when skills section is in viewport
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
    
    // Add hover effect to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.portfolio-overlay').style.opacity = '1';
            this.querySelector('.portfolio-image').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.portfolio-overlay').style.opacity = '0';
            this.querySelector('.portfolio-image').style.transform = 'scale(1)';
        });
    });
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
            setTimeout(() => {
                scrollTopBtn.style.opacity = '1';
            }, 10);
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                scrollTopBtn.style.display = 'none';
            }, 300);
        }
    });
    
    // Add additional CSS for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-top-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-5px);
        }
        
        .success-message {
            padding: 20px;
            background-color: #d4edda;
            color: #155724;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .error {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
        }
        
        @media screen and (max-width: 768px) {
            .scroll-top-btn {
                width: 40px;
                height: 40px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add responsive styles for portfolio items
    const portfolioStyle = document.createElement('style');
    portfolioStyle.textContent = `
        @media screen and (max-width: 768px) {
            .portfolio-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
        }
        
        @media screen and (max-width: 576px) {
            .portfolio-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(portfolioStyle);
    
    // Add hamburger menu styles
    const hamburgerStyle = document.createElement('style');
    hamburgerStyle.textContent = `
        .hamburger {
            display: none;
            cursor: pointer;
            width: 30px;
            height: 20px;
            position: relative;
            z-index: 1001;
        }
        
        .hamburger:before,
        .hamburger:after,
        .hamburger i:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: var(--secondary-color);
            transition: all 0.3s ease;
        }
        
        .hamburger:before {
            top: 0;
        }
        
        .hamburger i:before {
            top: 9px;
        }
        
        .hamburger:after {
            bottom: 0;
        }
        
        .hamburger.active:before {
            transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger.active i:before {
            opacity: 0;
        }
        
        .hamburger.active:after {
            transform: translateY(-9px) rotate(-45deg);
        }
        
        @media screen and (max-width: 768px) {
            .hamburger {
                display: block;
            }
        }
    `;
    document.head.appendChild(hamburgerStyle);
    
    // Initialize the page
    updateActiveNav();
});
