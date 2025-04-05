// Theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navLinks.classList.remove('active');
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Blog functionality using localStorage
    const blogGrid = document.getElementById('blog-posts');
    const blogForm = document.getElementById('blog-form');

    // Initialize blog posts in localStorage if not exists
    if (!localStorage.getItem('blogPosts')) {
        const initialPosts = [
            { 
                id: 1, 
                title: 'Welcome to Our Blog', 
                content: 'This is our first blog post!', 
                date: '2024-03-20' 
            },
            { 
                id: 2, 
                title: 'Web Development Tips', 
                content: 'Here are some tips for web development...', 
                date: '2024-03-21' 
            }
        ];
        localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }

    function loadBlogPosts() {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        
        blogGrid.innerHTML = posts.map(post => `
            <div class="blog-post">
                <h3>${post.title}</h3>
                <div class="date">${post.date}</div>
                <p>${post.content}</p>
            </div>
        `).join('');
    }

    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(blogForm);
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        
        const newPost = {
            id: posts.length + 1,
            title: formData.get('title'),
            content: formData.get('content'),
            date: new Date().toISOString().split('T')[0]
        };
        
        posts.unshift(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        
        blogForm.reset();
        loadBlogPosts();
    });

    // Contact form handling with localStorage
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        
        const newMessage = {
            id: messages.length + 1,
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };
        
        messages.push(newMessage);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Scroll-based animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .about-content, .blog-post');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Add initial styles for animation
    document.querySelectorAll('.service-card, .about-content, .blog-post').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial load
    loadBlogPosts();
    animateOnScroll();
}); 