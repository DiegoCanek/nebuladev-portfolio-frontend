import diegoMejiaAvatar from '../assets/team/DiegoMejia.webp';
import danielaElizabethAvatar from '../assets/team/DanielaElizabeth.webp';
import vanistelAvatar from '../assets/team/Vanistel.webp';
import valeriaHernandezAvatar from '../assets/team/ValeriaHernandez.webp';

export const companyInfo = {
  name: 'NebulaDev',
  brandName: 'NebulaDev Studio',
  headline: 'Desarrollo Web & Soluciones Digitales',
  description: 'Somos un estudio de desarrollo digital apasionado por crear soluciones tecnológicas innovadoras. Combinamos diseño espacial, código limpio y estrategia digital para llevar tu visión al siguiente nivel.',
  email: 'contacto@nebuladev.com',
  phone: '',
  location: 'Remoto — Disponible worldwide',
  founded: '2024',
  mission: 'Transformar ideas en experiencias digitales extraordinarias',
  vision: 'Ser el estudio de desarrollo digital de referencia, reconocido por transformar ideas en experiencias extraordinarias.',
  values: 'Innovación constante, calidad sin compromisos, transparencia total y pasión genuina por cada proyecto.',
  privacy_notice: 'He leído y acepto el Aviso de privacidad.',
};

export const teamMembers = [
  {
    id: 1,
    name: 'Diego Mejía',
    role: 'Frontend Developer',
    avatar: diegoMejiaAvatar,
    bio: 'Especialista en interfaces modernas y experiencias de usuario.',
    skills: ['React', 'CSS', 'Figma', 'TypeScript'],
  },
  {
    id: 2,
    name: 'Valeria Hernández',
    role: 'Backend Developer',
    avatar: valeriaHernandezAvatar,
    bio: 'Arquitecto de APIs robustas y sistemas escalables.',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    id: 3,
    name: 'Daniela Elizabeth',
    role: 'Full Stack Developer',
    avatar: danielaElizabethAvatar,
    bio: 'Apasionada por construir productos digitales de inicio a fin.',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
  },
  {
    id: 4,
    name: 'Vanistelroy Martinez',
    role: 'DevOps Engineer',
    avatar: vanistelAvatar,
    bio: 'Experto en infraestructura cloud y automatización de procesos.',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  },
];

export const companyStats = [];

export const services = [
  {
    id: 1,
    icon: '🌐',
    title: 'Desarrollo Web',
    description: 'Creamos sitios y aplicaciones web modernas, rápidas y escalables.',
    technologies: ['React', 'Vue', 'Next.js', 'Node.js', 'Django'],
    features: [
      'Diseño responsive para todos los dispositivos',
      'Optimización SEO y rendimiento',
      'Integración con APIs y bases de datos',
      'Panel de administración personalizado',
    ],
  },
  {
    id: 2,
    icon: '📱',
    title: 'Apps Móviles',
    description: 'Desarrollamos aplicaciones nativas y multiplataforma de alto rendimiento.',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
    features: [
      'Apps nativas iOS y Android',
      'Experiencia de usuario intuitiva',
      'Integración con servicios en la nube',
      'Publicación en App Store y Google Play',
    ],
  },
  {
    id: 3,
    icon: '🎨',
    title: 'Diseño UI/UX',
    description: 'Diseñamos interfaces atractivas centradas en la experiencia del usuario.',
    technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Prototyping'],
    features: [
      'Investigación y análisis de usuarios',
      'Wireframes y prototipos interactivos',
      'Sistema de diseño coherente',
      'Pruebas de usabilidad',
    ],
  },
  {
    id: 4,
    icon: '⚙️',
    title: 'Backend & APIs',
    description: 'Construimos arquitecturas robustas y APIs RESTful escalables.',
    technologies: ['Django', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'APIs RESTful y GraphQL',
      'Autenticación y autorización segura',
      'Optimización de bases de datos',
      'Despliegue en la nube',
    ],
  },
  {
    id: 5,
    icon: '🔒',
    title: 'Seguridad Digital',
    description: 'Protegemos tus aplicaciones con las mejores prácticas de seguridad.',
    technologies: ['OAuth', 'JWT', 'SSL', 'Penetration Testing'],
    features: [
      'Auditoría de seguridad',
      'Cifrado de datos sensibles',
      'Protección contra ataques comunes',
      'Cumplimiento de normativas',
    ],
  },
  {
    id: 6,
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Desplegamos y gestionamos infraestructura en la nube de forma eficiente.',
    technologies: ['AWS', 'Google Cloud', 'Docker', 'CI/CD', 'Kubernetes'],
    features: [
      'Configuración de servidores cloud',
      'Pipelines CI/CD automatizados',
      'Monitoreo y alertas',
      'Escalabilidad automática',
    ],
  },
];

export const projects = [];

export const technologies = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'JavaScript', icon: '💛', category: 'Frontend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'Django', icon: '🎸', category: 'Backend' },
  { name: 'CSS/SASS', icon: '🎨', category: 'Frontend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
  { name: 'Git/GitHub', icon: '🐙', category: 'DevOps' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
];

export const navLinks = [
  { id: 'hero', label: 'Inicio', icon: '🏠' },
  { id: 'about', label: 'Nosotros', icon: '👥' },
  { id: 'services', label: 'Servicios', icon: '⚡' },
  { id: 'projects', label: 'Proyectos', icon: '🚀' },
  { id: 'technologies', label: 'Tecnologías', icon: '💻' },
  { id: 'contact', label: 'Contacto', icon: '📧' },
];
