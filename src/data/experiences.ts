export type Experience = {
  role         : string
  company      : string
  duration     : string
  location     : string
  description  : string
  logo        ?: string
  technologies?: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Losgistic',
    company: 'Company A',
    duration: 'March 2026 - Present',
    location: 'Remote',
    description:
      'Responsible for the logistic and transportation of goods and services.',
    logo: '/static/coffee.png',
    technologies: ['Brain'],
  },
  {
    role: 'Software Engineer',
    company: 'New Harbor',
    duration: 'Sep 2024 - May 2025',
    location: 'Remote',
    description:
      'Building a cybersecurity platform. Full-stack work with modern Vue ecosystem.',
    logo: '/experience/newharbor_logo.jpg',
    technologies: [
      'TypeScript',
      'Nuxt',
      'Vue',
      'Supabase',
      'UX',
      'Tailwind CSS',
    ],
  },
  {
    role: 'Lead Engineer',
    company: 'Cyber Clinic',
    duration: 'Feb 2024 - Dec 2025',
    location: 'Las Vegas, NV',
    description:
      'Handling both internal and external projects while leading the software development team. Using PHP, Bootstrap, Microsoft Teams, etc.',
    logo: '/experience/cyberclinic.png',
    technologies: [
      'PHP',
      'Bootstrap',
      'Linux',
      'Cloudflare',
      'Microsoft Teams',
    ],
  },
  {
    role: 'Software Engineer I',
    company: 'DecentRE Labs',
    duration: 'Jan 2023 - Oct 2024',
    location: 'Remote',
    description:
      'Developed and maintained 4 production software products at DecentRE Labs, owning UX/UI, API integrations, and backend data ingestion/export pipelines end-to-end.',
    logo: '/experience/decentrepx.png',
    technologies: [
      'TypeScript',
      'React',
      'Zapier',
      'Next.js',
      'Express',
      'MongoDB',
      'Docker',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'DecentRE Labs',
    duration: 'Dec 2022 - Jun 2023',
    location: 'Hybrid',
    description:
      'Developed and maintained an online auction platform for residential real estate.',
    logo: '/experience/decentrepx.png',
    technologies: [
      'TypeScript',
      'React',
      'Zapier',
      'Firebase',
      'Blockchain',
      'Python',
      'Vite',
    ],
  },

  // {
  //   role: 'President',
  //   company: 'UNLV Association for Computing Machinery',
  //   duration: '2025',
  //   location: 'Las Vegas, NV',
  //   description:
  //     'Leadership, project management, campus outreach. Leading the ACM chapter.',
  // },
  {
    role: 'Teaching Assistant',
    company: 'University of Nevada, Las Vegas',
    duration: '2025',
    location: 'Las Vegas, NV',
    description:
      'OOP Course Assistant (C++, Java, Python); graded assignments and provided support during lab sessions and office hours.',
    logo: '/experience/unlv.jpg',
    technologies: ['C++', 'Python', 'Java', 'Linux', 'Ubuntu'],
  },
  {
    role: 'Undergraduate Tutor',
    company: 'University of Nevada, Las Vegas',
    duration: '2025',
    location: 'Las Vegas, NV',
    description:
      'Provided tutoring services for faculty and students with various computer science topics.',
    logo: '/experience/unlv.jpg',
    technologies: [
      'C/C++',
      'Python',
      'Java',
      'Rust',
      'JavaScript',
      'HTML',
      'CSS',
      'Linux',
    ],
  },
  {
    role: 'Undergraduate Research Assistant',
    company: 'IIS Lab, University of Nevada, Las Vegas',
    duration: '2025',
    location: 'Las Vegas, NV',
    description:
      'Helped with research on deep learning and generative AI in cybersecurity.',
    logo: '/experience/iislab.png',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'Keras'],
  },
]
