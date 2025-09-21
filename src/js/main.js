import skills from '/src/data/skills.js';
import techStack from '/src/data/stack.js';
import projects from '/src/data/projects.js';

// Make functions available globally
window.typeText = typeText;
window.loadProjects = loadProjects;
window.loadSkills = loadSkills;
window.setupMobileMenu = setupMobileMenu;
window.setupActiveNavigation = setupActiveNavigation;

// Start animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Remover qualquer opacidade inicial das seções
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
    });
    
    // Iniciar as funcionalidades
    typeText();
    loadProjects();
    loadSkills();
    setupMobileMenu();
    setupActiveNavigation();
});

// Setup active navigation
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Função para atualizar link ativo
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
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
    
    // Atualizar no scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Atualizar no carregamento
    updateActiveLink();
}

// Typing animation for tech stack
let currentTechIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const techStackElement = document.getElementById('techStack');
    if (!techStackElement) return;
    
    const currentTech = techStack[currentTechIndex];

    if (isDeleting) {
        techStackElement.textContent = currentTech.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        techStackElement.textContent = currentTech.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentTech.length) {
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTechIndex = (currentTechIndex + 1) % techStack.length;
    }

    setTimeout(typeText, typingSpeed);
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;
    
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            menuOpen = false;
        }
    });
}

// Variáveis globais para o carrossel
let currentSlide = 0;
let slideInterval;
const PROJECTS_PER_PAGE = 9;
let currentPage = 1;

// Função para criar o HTML de um card de projeto
function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-image-container">
                <img 
                    src="src/assets/projects/${project.image}" 
                    alt="${project.title}"
                    class="project-image"
                    onerror="this.onerror=null; this.src='src/assets/projects/${project.fallbackImage}'; if(this.src.includes('default.jpg')) this.style.opacity=0.5;"
                >
                <div class="project-image-overlay"></div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-info-row">
                    <div class="project-company">
                        <i class="fas fa-building"></i>
                        <span>${project.company}</span>
                    </div>
                    ${project.link ? `
                        <a href="${project.link}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Ver Projeto
                        </a>
                    ` : ''}
                </div>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Função para renderizar a página atual
function renderPage(page, projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    const start = (page - 1) * PROJECTS_PER_PAGE;
    const end = start + PROJECTS_PER_PAGE;
    const paginatedProjects = projects.slice(start, end);
    
    projectsGrid.innerHTML = paginatedProjects.map(project => createProjectCard(project)).join('');
}

// Função para criar a paginação
function createPagination(totalPages) {
    const paginationContainer = document.querySelector('.projects-pagination');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = `pagination-button ${i === 1 ? 'active' : ''}`;
        button.addEventListener('click', () => {
            currentPage = i;
            renderPage(currentPage, projects);
            updatePaginationButtons();
            // Rola até a seção de projetos suavemente
            document.getElementById('projects').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
        paginationContainer.appendChild(button);
    }
}

// Função para atualizar os botões de paginação ativos
function updatePaginationButtons() {
    const buttons = document.querySelectorAll('.pagination-button');
    buttons.forEach((button, index) => {
        if (index + 1 === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Função para inicializar o carrossel
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelector('.carousel-indicators');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (!track || !indicators || !prevButton || !nextButton) return;
    
    // Criar slides
    track.innerHTML = projects.map(project => 
        `<div class="carousel-slide">${createProjectCard(project)}</div>`
    ).join('');
    
    // Criar indicadores
    indicators.innerHTML = projects.map((_, index) => 
        `<button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
    ).join('');
    
    // Atualizar slide atual
    function updateSlide() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualizar indicadores
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Avançar para o próximo slide
    function nextSlide() {
        currentSlide = currentSlide === projects.length - 1 ? 0 : (currentSlide + 1);
        updateSlide();
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        currentSlide = currentSlide === 0 ? projects.length - 1 : (currentSlide - 1);
        updateSlide();
        resetInterval();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Navegação pelos indicadores
    document.querySelectorAll('.carousel-indicator').forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentSlide = parseInt(indicator.dataset.slide);
            updateSlide();
            resetInterval();
        });
    });
    
    // Iniciar autoplay
    function startInterval() {
        slideInterval = setInterval(nextSlide, 10000); // 10 segundos
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    startInterval();
    
    // Pausar autoplay ao passar o mouse
    const carousel = document.querySelector('.projects-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', startInterval);
    
    // Suporte para touch
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startInterval();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) { // Limite de 50px para considerar um swipe
            if (diff > 0) {
                currentSlide = (currentSlide + 1) % projects.length;
            } else {
                currentSlide = (currentSlide - 1 + projects.length) % projects.length;
            }
            updateSlide();
        }
    }
}

// Load project cards with pagination and carousel
function loadProjects() {
    // Renderizar primeira página
    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
    renderPage(currentPage, projects);
    createPagination(totalPages);
    
    // Inicializar carrossel (será escondido em desktop pelo CSS)
    if (window.innerWidth <= 768) {
        initCarousel();
    }
    
    // Atualizar ao redimensionar a janela
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            initCarousel();
        } else {
            renderPage(currentPage, projects);
        }
    });
}

// Load skills with animations
function loadSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    // Limpa o container
    skillsContainer.innerHTML = '';

    // Função para criar uma categoria de habilidades
    function createSkillCategory(title, skills) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        categoryDiv.style.opacity = '0';
        categoryDiv.style.transform = 'translateY(20px)';
        
        const titleEl = document.createElement('h3');
        titleEl.className = 'skill-category-title';
        titleEl.textContent = title;
        categoryDiv.appendChild(titleEl);

        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            
            skillItem.innerHTML = `
                <div class="skill-header">
                    <i class="${skill.icon}"></i>
                    <div class="skill-info">
                        <h4>${skill.name}</h4>
                        <p class="skill-description">${skill.description}</p>
                    </div>
                </div>
                <div class="skill-bar-container">
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 0%"></div>
                    </div>
                    <span class="skill-percentage">${skill.level}%</span>
                </div>
                ${skill.details ? `
                    <div class="skill-details">
                        ${Object.entries(skill.details).map(([key, value]) => `
                            <div class="skill-detail-item">
                                <span class="detail-label">${key}:</span>
                                <span class="detail-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            `;
            
            categoryDiv.appendChild(skillItem);
        });

        return categoryDiv;
    }

    // Cria todas as categorias primeiro
    const categories = [
        createSkillCategory('Frontend', skills.frontend),
        createSkillCategory('Backend', skills.backend),
        createSkillCategory('Idiomas', skills.languages)
    ];

    // Adiciona todas as categorias ao container
    categories.forEach(category => {
        skillsContainer.appendChild(category);
    });

    // Anima a entrada das categorias em sequência
    categories.forEach((category, index) => {
        setTimeout(() => {
            category.style.transition = 'all 0.5s ease';
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';

            // Anima as barras de progresso depois que o card aparecer
            setTimeout(() => {
                const progressBars = category.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const level = bar.parentElement.nextElementSibling.textContent.replace('%', '');
                    bar.style.width = `${level}%`;
                });
            }, 500);
        }, index * 200);
    });
}

// Smooth scroll for navigation links
// This code will run when the script loads
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuBtn = document.querySelector('.menu-btn');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
            }
        }
    });
}); 
