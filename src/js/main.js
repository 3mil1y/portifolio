console.log('JavaScript carregado com sucesso!');

// Skills data
const skills = {
    frontend: [
        {
            name: 'HTML5/CSS3',
            level: 90,
            description: 'HTML semântico, Flexbox, Grid, Design responsivo e acessível',
            icon: 'fas fa-code'
        },
        {
            name: 'TailwindCSS',
            level: 70,
            description: 'Estilização ágil, design responsivo e componentes reutilizáveis',
            icon: 'fas fa-wind'
        },
        {
            name: 'JavaScript',
            level: 80,
            description: 'Interfaces interativas, manipulação do DOM, consumo de APIs',
            icon: 'fab fa-js'
        }
    ],
    backend: [
        {
            name: 'PHP',
            level: 85,
            description: 'POO, MVC, Laravel',
            icon: 'fab fa-php'
        },
        {
            name: 'MySQL',
            level: 80,
            description: 'Queries complexas, Otimização, Modelagem',
            icon: 'fas fa-database'
        },
        {
            name: 'Git',
            level: 80,
            description: 'Versionamento, Branches, Git Flow',
            icon: 'fab fa-git-alt'
        }
    ],
    languages: [
        {
            name: 'Inglês',
            level: 60,
            description: 'B2 - Intermediário (CEFR: 56)',
            details: {
                conversation: 'B1 - Intermediário',
                reading: 'C2 - Avançado',
                writing: 'C1 - Avançado'
            },
            icon: 'fas fa-language'
        }
    ]
};

// Start animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando animações...');
    
    // Remover qualquer opacidade inicial das seções
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
    });
    
    // Iniciar as funcionalidades
    typeText();
    loadProjects();
    loadSkills();
    setupMobileMenu();
    // setupContactForm();
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
const techStack = ['HTML5/CSS3', 'TailwindCSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL'];
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

// Project cards data
const projects = [
    {
        title: 'FastStok',
        description: 'Sistema de controle de estoque com interface intuitiva e relatórios dinâmicos.',
        image: 'src/assets/projects/faststok.png',
        fallbackImage: 'src/assets/projects/default.jpg',
        tech: ['PHP', 'SQL', 'JavaScript', 'TailwindCSS'],
        company: 'Autônomo',
        link: 'https://github.com/3mil1y/faststok.git'
    },
    // {
    //     title: 'Café Pomerano',
    //     description: 'Site institucional da empresa café pomerano.',
    //     image: 'src/assets/projects/cafe-pomerano.jpg',
    //     fallbackImage: 'src/assets/projects/default.jpg',
    //     tech: ['PHP', 'SQL'],
    //     company: 'Café Pomerano'
    // },
    // {
    //     title: 'Oh! Rainha',
    //     description: 'Site institucional da empresa Oh! Rainha.',
    //     image: 'src/assets/projects/oh-rainha.jpg',
    //     fallbackImage: 'src/assets/projects/default.jpg',
    //     tech: ['HTML', 'CSS', 'JavaScript'],
    //     company: 'Oh! Rainha'
    // },
    {
        title: 'Cantareira Pilates',
        description: 'Site institucional da empresa Cantareira Pilates.',
        image: 'src/assets/projects/cantareira.png',
        fallbackImage: 'src/assets/projects/default.jpg',
        tech: ['HTML', 'CSS', 'JavaScript'],
        company: 'Publitiva',
        link: 'https://cantareirapilates.com.br'
    }
];

// Load project cards
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image-container">
                <img 
                    src="${project.image}" 
                    alt="${project.title}"
                    class="project-image"
                    onerror="this.onerror=null; this.src='${project.fallbackImage}'; if(this.src.includes('default.jpg')) this.style.opacity=0.5;"
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
        `;
        
        projectsGrid.appendChild(projectCard);
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

// Contact form handling
    function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                showNotification('Mensagem enviada com sucesso!', 'success');
                form.reset();
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        }
    });
}

// setupContactForm();

// Contact form handling
// function setupContactForm() {
//     const form = document.getElementById('contactForm');
//     if (!form) return;
    
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const formData = new FormData(form);
//         const data = Object.fromEntries(formData);
        
//         try {
//             console.log('Form submitted:', data);
//             showNotification('Mensagem enviada com sucesso!', 'success');
//             form.reset();
//         } catch (error) {
//             showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
//         }
//     }); 
// }

// }

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation links
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
