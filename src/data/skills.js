const skills = {
    frontend: [
        {
            name: 'HTML5/CSS3',
            level: 90,
            description: 'HTML semântico, Flexbox, Grid, design responsivo e acessível',
            icon: 'fas fa-code'
        },
        {
            name: 'TailwindCSS',
            level: 75,
            description: 'Estilização ágil, criação de componentes reutilizáveis, design moderno e responsivo',
            icon: 'fas fa-wind'
        },
        {
            name: 'JavaScript',
            level: 85,
            description: 'Interfaces interativas, manipulação do DOM, consumo de APIs REST, ES6+',
            icon: 'fab fa-js'
        },
        {
            name: 'Vue.js',
            level: 80,
            description: 'Composition API, Pinia, Vuetify, criação de componentes reutilizáveis e integração com APIs',
            icon: 'fab fa-vuejs'
        },
        {
            name: 'TypeScript',
            level: 70,
            description: 'Tipagem estática, segurança no código e integração com Vue.js',
            icon: 'fas fa-file-code'
        }
    ],
    backend: [
        {
            name: 'PHP & Laravel',
            level: 85,
            description: 'POO, MVC, desenvolvimento de APIs REST, segurança web (SQLi, XSS, CSRF)',
            icon: 'fab fa-php'
        },
        {
            name: 'MySQL',
            level: 80,
            description: 'Queries complexas, otimização e modelagem de banco de dados relacional',
            icon: 'fas fa-database'
        },
        {
            name: 'MongoDB',
            level: 60,
            description: 'Banco de dados NoSQL, modelagem de documentos e consultas otimizadas',
            icon: 'fas fa-database'
        },
        {
            name: 'Git & Bitbucket',
            level: 80,
            description: 'Versionamento, branches, Git Flow, colaboração em equipes remotas',
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

export default skills;
