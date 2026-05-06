export const projectCategories = ['All Work', 'Mobile', 'Web', 'Platform'];

export const projects = [
  {
    slug: 'creativepluz',
    type: 'featured',
    image: '/images/creativepluz.png',
    title: 'Creativepluz',
    category: 'Portfolio Platform',
    tags: ['Web'],
    summary: 'A polished portfolio experience built for clarity, visual identity, and trust.',
    outcome: 'Sharper brand presentation',
    action: {
      type: 'demo',
      label: 'View Demo',
      href: 'https://creativepluz-gamma.vercel.app/',
    },
    detail: {
      eyebrow: 'Web Experience',
      headline: 'A portfolio-led website designed to present work with more confidence and less noise.',
      overview:
        'Creativepluz needed a web presence that felt curated, premium, and easy to navigate. The focus was not feature bloat. The focus was stronger storytelling, a cleaner browsing flow, and visuals that supported the work instead of competing with it.',
      challenge:
        'Portfolio sites often become visually busy or structurally thin. The challenge here was to create something expressive without losing pace, readability, or credibility.',
      solution:
        'We organized the experience around a tighter visual hierarchy, cleaner project presentation, and a responsive layout that remains calm across screen sizes.',
      services: ['Product direction', 'Visual design', 'Frontend implementation'],
      stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      outcomes: [
        'Stronger first impression for new visitors',
        'Clearer project scanning and navigation',
        'A more premium visual system for future growth',
      ],
    },
  },
  {
    slug: 'lumina-mobile',
    type: 'regular',
    image: '/images/lumina-mobile.png',
    title: 'Lumina Mobile',
    category: 'Mobile Product',
    tags: ['Mobile'],
    summary: 'A mobile concept focused on a cleaner launch path and stronger product framing.',
    outcome: 'Launch-ready product direction',
    gradient: 'from-secondary-container to-secondary-fixed',
    action: {
      type: 'detail',
      label: 'View Details',
    },
    detail: {
      eyebrow: 'Mobile Product',
      headline: 'A mobile concept shaped around usability, structure, and a more realistic path to launch.',
      overview:
        'Lumina Mobile represents the kind of product engagement where interface quality and product framing need to move together. The work focused on clarifying the product shape before scaling feature complexity.',
      challenge:
        'The risk with early-stage mobile products is jumping into interface production before the user journey is stable. That usually creates noise, rework, and weak launch readiness.',
      solution:
        'We reduced the experience to the key journeys, designed around the highest-value flows, and created a cleaner structure that can support future release planning.',
      services: ['Mobile product planning', 'UX design', 'Interface systems'],
      stack: ['React Native', 'TypeScript', 'Figma'],
      outcomes: [
        'A clearer product direction for the first release',
        'Less ambiguity across core user flows',
        'A stronger handoff foundation for engineering',
      ],
    },
  },
  {
    slug: 'ops-core-platform',
    type: 'regular',
    image: '/images/creativepluz.png',
    title: 'Ops Core Platform',
    category: 'Internal Platform',
    tags: ['Platform'],
    summary: 'An internal software concept focused on workflows, dashboards, and operational clarity.',
    outcome: 'Better workflow visibility',
    gradient: 'from-tertiary-container to-tertiary-fixed',
    action: {
      type: 'detail',
      label: 'View Details',
    },
    detail: {
      eyebrow: 'Custom Software',
      headline: 'A platform concept for teams that need operations, data, and decision-making in one place.',
      overview:
        'Ops Core Platform is a representative custom software engagement where the goal is not just to digitize a workflow, but to make teams faster and more aligned in the way they work every day.',
      challenge:
        'Internal tools often become cluttered because they try to satisfy everyone at once. That leads to weak prioritization, poor discoverability, and low adoption.',
      solution:
        'We structured the concept around the highest-frequency operational actions first, then built the surrounding dashboard and reporting layers to support those decisions.',
      services: ['Workflow mapping', 'Dashboard design', 'Platform architecture'],
      stack: ['React', 'Node.js', 'PostgreSQL', 'Figma'],
      outcomes: [
        'A more usable operational structure',
        'Clearer ownership across tasks and status tracking',
        'Infrastructure that can expand into a broader platform later',
      ],
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
