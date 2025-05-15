        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const nav = document.querySelector('nav');
            
            mobileMenuBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.textContent = nav.classList.contains('active') ? '✕' : '☰';
            });
            
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                });
            });
            
            const fileUploadInput = document.getElementById('photoUpload');
            const fileNamesContainer = document.getElementById('fileNames');
            
            fileUploadInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    let names = '';
                    for (let i = 0; i < this.files.length; i++) {
                        names += this.files[i].name;
                        if (i < this.files.length - 1) {
                            names += ', ';
                        }
                    }
                    fileNamesContainer.textContent = 'Selected: ' + names;
                } else {
                    fileNamesContainer.textContent = '';
                }
            });
            
            const form = document.getElementById('artForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const description = document.getElementById('description').value;
                const files = fileUploadInput.files;
                
                if (!name || !email || !description) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                if (files.length === 0) {
                    alert('Please upload at least one photo');
                    return;
                }
                
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('description', description);
                
                for (let i = 0; i < files.length; i++) {
                    formData.append('photos', files[i]);
                }
                
                alert('Thank you for your submission! We\'ll process your request and contact you soon.');
                form.reset();
                fileNamesContainer.textContent = '';
                
                console.log('Form data:', {
                    name: name,
                    email: email,
                    description: description,
                    files: files
                });
            });
            
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.style.background = 'rgba(26, 26, 46, 0.95)';
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
                } else {
                    header.style.background = 'rgba(26, 26, 46, 0.9)';
                    header.style.boxShadow = 'none';
                }
            });
            
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.feature-card, .section-title, .gallery-item, .contact-form');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll();
        });
