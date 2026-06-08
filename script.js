document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');
    const icon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times (close)
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Sticky Navbar Effect on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Get form values
            const nameInput = document.getElementById('name').value;
            const emailInput = document.getElementById('email').value;
            const serviceInput = document.getElementById('service').value;
            const deadlineInput = document.getElementById('deadline').value;
            const messageInput = document.getElementById('message').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Basic validation
            if (nameInput && emailInput && serviceInput && deadlineInput && messageInput) {
                // Change button state to show processing
                const originalText = submitBtn.innerText;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Format the message for Email
                const emailAddress = "lastminuteassignmate@gmail.com";
                const subject = `New Inquiry from ${nameInput} - ${serviceInput}`;
                const body = `Name: ${nameInput}%0AEmail: ${emailInput}%0AService Required: ${serviceInput}%0ADeadline: ${deadlineInput}%0A%0AMessage:%0A${messageInput}`;
                const mailtoURL = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${body}`;

                // Simulate processing and open Email client
                setTimeout(() => {
                    window.location.href = mailtoURL;
                    
                    // Show success message
                    if(formSuccess) formSuccess.style.display = 'block';
                    
                    // Reset form and button
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if(formSuccess) formSuccess.style.display = 'none';
                    }, 5000);
                }, 800);
            }
        });
    }

    // 4. Smooth scrolling for anchor links (safeguard for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Offset for sticky navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
