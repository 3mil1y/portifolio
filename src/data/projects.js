const fallbackImage = 'default.jpg';
const projects = [
    {
        title: "WaiSports",
        description: "Plataforma de geração de treinos com IA, unindo backend em Laravel e frontend moderno.",
        company: "Lintech Digital",
        image: "muscle.png",  
        fallbackImage: "default.jpg", 
        tech: ["PHP", "Laravel", "MySQL", "JavaScript", "Vue.js", "Vuetify"] 
    },
    {
        title: 'FastStok',
        description: 'Sistema de controle de estoque com interface intuitiva e relatórios dinâmicos.',
        image: 'faststok.png',
        fallbackImage: fallbackImage,
        tech: ['PHP', 'SQL', 'JavaScript', 'TailwindCSS'],
        company: 'Autônomo',
        link: 'https://github.com/3mil1y/faststok.git'
    },
    {
        title: 'Cantareira Pilates',
        description: 'Site institucional da empresa Cantareira Pilates.',
        image: 'cantareira.png',
        fallbackImage: fallbackImage,
        tech: ['HTML', 'CSS', 'JavaScript'],
        company: 'Publitiva',
        link: 'https://cantareirapilates.com.br'
    },
    {
        title: 'Info From Sky',
        description: 'Site institucional da empresa Info From Sky.',
        image: 'ifsky.png',
        fallbackImage: fallbackImage,
        tech: ['HTML', 'CSS', 'JavaScript'],
        company: 'Publitiva',
        link: 'https://ifsky.com.br/'
    },
    {
        title: 'Maxx Prêmios',
        description: 'Site de premiação da empresa Maxx TheraSkin.',
        image: '',
        fallbackImage: fallbackImage,
        tech: ['Laravel', 'MySQL', 'TailwindCSS', 'JavaScript'],
        company: 'Publitiva',
        link: 'https://maxxpremios.com.br'
    },
    {
        title: 'NBA Adv',
        description: 'Site Institucional da Advogada Niver Bosle Acosta.',
        image: 'nba-adv.png',
        fallbackImage: fallbackImage,
        tech: ['HTML', 'CSS', 'JavaScript'],
        company: 'Publitiva | Niver B. Acosta',
        link: 'https://niverb-acosta.com.br'
    },
    {
        title: 'Niver Concilia',
        description: 'Site da Advogada Niver Bosle Acosta, focado em acordos de conciliação.',
        image: 'nba-concilia.png',
        fallbackImage: fallbackImage,
        tech: ['HTML', 'CSS', 'TailwindCSS', 'JavaScript'],
        company: 'Publitiva | Niver B. Acosta',
        link: 'https://niverb-acosta.com.br'
    },
    {
        title: 'NBA Cursos',
        description: 'Site da Advogada Niver Bosle Acosta, focado em seus cursos de advocacia.',
        image: 'nba-cursos.png',
        fallbackImage: fallbackImage,
        tech: ['HTML', 'CSS', 'TailwindCSS', 'JavaScript'],
        company: 'Publitiva | Niver B. Acosta',
        link: 'https://niverb-acosta.com.br'
    }
];

export default projects;
