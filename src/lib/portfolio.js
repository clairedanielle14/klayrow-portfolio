export const navLinks = [
  { href: '#top', label: 'About' },
  { href: '#projects', label: 'Works' },
  { href: '#skills', label: 'Skills' },
  { href: '#path', label: 'Career Path' },
  { href: '#contact', label: 'Encore' }
];

export const projectCards = [
  {
    title: "Bijoux",
    time: "03:42",
    type: "Web Development",
    stack: 'HTML - CSS - PHP - JAVASCRIPT - JQUERY',
    description:
      "Bijoux is an e-commerce website where users can create an account to browse and buy products like sunglasses, rings,earrings, bracelets etc. They can also add to cart a product, edit the quantity and delete it from the cart. ",
    preview: "preview-wave",
    image: {
      src: 'projects/bijoux.png',
      alt: 'Bijoux jewelry website homepage preview'
    },
    dark: true,
  },
  {
    title: "Photobooth",
    time: "02:58",
    type: "Web Development",
    stack: "SVELTE - NODEJS",
    description: "Klayrow's Photobooth is a simple web photobooth that allows users to take photos with various filters and effects (in progress :P).",
    preview: "preview-grid",
    liveSite: "https://classy-custard-ad75ee.netlify.app/",
    images: [
      {
        src: 'projects/pb1.png',
        alt: 'Photobooth app preview one'
      },
      {
        src: 'projects/pb2.png',
        alt: 'Photobooth app preview two'
      }
    ],
    dark: true
  },
  {
    title: "SKonnect",
    time: "04:11",
    type: "Web Development",
    stack: 'REACTJS - LARAVEL - MYSQL',
    description:
      "SKonnect is a Project Management and Monitoring Tool for SK where Sangguniang Kabataan Users can create events and monitor existing projects to ensure that they are on track with the project timeline.",
    preview: "preview-orbit",
    dark: true,
  },
];

export const skills = [
  {
    heading: 'Frontend',
    items: ['Svelte', 'React', 'TypeScript', 'Tailwind', 'Animation']
  },
  {
    heading: 'Backend',
    items: ['Node', 'Laravel', 'REST APIs', 'SQL', 'Auth Flows']
  },
  {
    heading: 'Tools',
    items: ['Figma', 'Git', 'VS Code', 'Storytelling', 'Design QA']
  }
];

export const timeline = [
  {
    year: '2026',
    role: 'Full Stack Developer',
    description: 'Built polished product flows and reusable frontend systems.'
  },
  {
    year: '2025',
    role: 'Frontend Developer',
    description: 'Shaped responsive landing pages and component libraries.'
  },
  {
    year: '2024',
    role: 'UI Designer',
    description: 'Designed visual systems for brand-forward digital products.'
  }
];
