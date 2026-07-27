export const skillCategories = [
  'programming',
  'frameworks',
  'databases',
  'cloud',
  'tools',
  'languages',
  'softSkills'
];

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const createResume = () => ({
  id: uid(),
  personal: {
    photo: '/avatar-placeholder.svg',
    fullName: 'Avery Stone',
    jobTitle: 'Senior Frontend Engineer',
    email: 'avery.stone@example.com',
    phone: '+1 (415) 555-0188',
    address: 'San Francisco, California',
    linkedin: 'linkedin.com/in/averystone',
    github: 'github.com/averystone',
    portfolio: 'averystone.dev'
  },
  summary:
    'Design-led frontend engineer with 8+ years of experience crafting delightful product experiences, improving performance, and shipping polished user interfaces across SaaS platforms. Passionate about building accessible systems, mentoring teams, and translating complex workflows into elegant digital products.',
  experience: [
    {
      id: uid(),
      company: 'NovaStack',
      role: 'Lead Frontend Engineer',
      location: 'Remote',
      startDate: '2022-02',
      endDate: 'Present',
      description:
        'Led the redesign of a B2B analytics platform used by 40k+ customers, improving task completion by 31%. Built a reusable component system with React, TypeScript, and Tailwind. Partnered with product and design to launch AI-assisted workflows that increased activation by 18%.'
    },
    {
      id: uid(),
      company: 'PixelDock',
      role: 'Senior UI Engineer',
      location: 'New York, NY',
      startDate: '2018-06',
      endDate: '2022-01',
      description:
        'Developed experimentation frameworks, performance budgets, and design tokens for multiple client products. Reduced Lighthouse regressions by 42% and improved frontend release confidence through visual regression automation.'
    }
  ],
  education: [
    {
      id: uid(),
      college: 'University of Washington',
      degree: 'B.S. in Human Centered Design & Engineering',
      cgpa: '3.8 / 4.0',
      year: '2018',
      achievements: 'Dean’s List, Design Systems Research Assistant, Hackathon Winner'
    }
  ],
  skills: {
    programming: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    frameworks: ['React', 'Next.js', 'Vite', 'Framer Motion'],
    databases: ['PostgreSQL', 'Supabase', 'Firebase'],
    cloud: ['AWS', 'Vercel', 'Netlify'],
    tools: ['Figma', 'GitHub Actions', 'Storybook', 'Notion'],
    languages: ['English', 'Spanish'],
    softSkills: ['Leadership', 'Mentoring', 'Product Thinking', 'Communication']
  },
  projects: [
    {
      id: uid(),
      name: 'MotionKit Design System',
      description: 'Open-source design system with accessible component primitives and animation recipes.',
      techStack: 'React, Storybook, Tailwind CSS, Framer Motion',
      githubLink: 'github.com/averystone/motionkit',
      liveDemo: 'motionkit.vercel.app',
      achievements: '2.4k GitHub stars, adopted by 14 internal product squads'
    }
  ],
  certifications: [
    {
      id: uid(),
      certificate: 'AWS Certified Cloud Practitioner',
      organization: 'Amazon Web Services',
      issueDate: '2024-03',
      credentialId: 'AWS-CP-1044-AX1'
    }
  ],
  achievements: [
    {
      id: uid(),
      category: 'Awards',
      title: 'Product Excellence Award',
      description: 'Recognized for launching the highest-impact customer onboarding experience of the year.'
    },
    {
      id: uid(),
      category: 'Hackathons',
      title: '1st Place – AI for Accessibility',
      description: 'Built a voice-assisted prototyping tool for low-vision designers.'
    }
  ],
  languages: [
    { id: uid(), language: 'English', level: 'Native' },
    { id: uid(), language: 'Spanish', level: 'Advanced' }
  ]
});

export const defaultSettings = {
  darkMode: true,
  accentColor: '#6366f1',
  fontFamily: 'Inter, ui-sans-serif, system-ui',
  paperSize: 'A4',
  margins: 'Normal',
  autoSave: true
};
