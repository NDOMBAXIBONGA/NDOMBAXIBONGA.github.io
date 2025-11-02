// NAVBAR MOBILE - CÓDIGO CORRIGIDO
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Previne scroll quando menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

        hamburger.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            const isClickInsideNav = e.target.closest('.nav-container');
            const isClickOnHamburger = e.target.closest('.hamburger');
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Smooth scroll para navegação
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                // Links externos (como index.html) não precisam de preventDefault
            });
        });

        // Restante do código JavaScript permanece o mesmo...
        // Funções do carrossel
        function showSlide(carouselId, index) {
            const carousel = document.getElementById(carouselId);
            const slides = carousel.querySelectorAll('.carousel-slide');
            const dots = carousel.querySelectorAll('.carousel-dot');
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide(carouselId) {
            const carousel = document.getElementById(carouselId);
            const slides = carousel.querySelectorAll('.carousel-slide');
            const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(carouselId, nextIndex);
        }

        function prevSlide(carouselId) {
            const carousel = document.getElementById(carouselId);
            const slides = carousel.querySelectorAll('.carousel-slide');
            const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(carouselId, prevIndex);
        }

        function goToSlide(carouselId, index) {
            showSlide(carouselId, index);
        }

        // Filtro de projetos
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active de todos os botões
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Adiciona active ao botão clicado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
                const categories = document.querySelectorAll('.project-category');
                
                if (filter === 'all') {
                    projects.forEach(project => project.style.display = 'block');
                    categories.forEach(category => category.style.display = 'block');
                } else {
                    categories.forEach(category => category.style.display = 'none');
                    projects.forEach(project => {
                        const categories = project.getAttribute('data-category');
                        if (categories.includes(filter)) {
                            project.style.display = 'block';
                            project.closest('.project-category').style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    });
                }
            });
        });

        // Cria partículas de fundo
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Posição aleatória
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                
                // Tamanho aleatório
                const size = Math.random() * 3 + 1;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Opacidade aleatória
                const opacity = Math.random() * 0.5 + 0.1;
                particle.style.opacity = opacity;
                
                // Duração da animação aleatória
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Delay aleatório
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Inicia carrosséis automáticos
        function startCarousels() {
            setInterval(() => {
                const carousels = document.querySelectorAll('.project-carousel');
                carousels.forEach(carousel => {
                    if (!carousel.hasAttribute('data-paused')) {
                        nextSlide(carousel.id);
                    }
                });
            }, 5000);
        }

        // Pausa carrossel quando o mouse está sobre ele
        document.querySelectorAll('.project-carousel').forEach(carousel => {
            carousel.addEventListener('mouseenter', () => {
                carousel.setAttribute('data-paused', 'true');
            });
            
            carousel.addEventListener('mouseleave', () => {
                carousel.removeAttribute('data-paused');
            });
        });

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            startCarousels();
            createParticles();
            
            // Animação de entrada para elementos
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observa elementos para animação
            document.querySelectorAll('.project-card, .category-header').forEach(el => {
                el.style.opacity = '0';
                observer.observe(el);
            });
        });