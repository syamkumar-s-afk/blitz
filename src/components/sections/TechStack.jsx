import {
  SiCss,
  SiDart,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiKubernetes,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { TbApi, TbAdjustmentsHorizontal, TbMessageChatbot } from 'react-icons/tb';

const techStack = [
  { name: 'React', category: 'Frontend', Icon: SiReact },
  { name: 'Next.js', category: 'Frontend', Icon: SiNextdotjs },
  { name: 'TypeScript', category: 'Frontend', Icon: SiTypescript },
  { name: 'JavaScript', category: 'Frontend', Icon: SiJavascript },
  { name: 'Vite', category: 'Frontend', Icon: SiVite },
  { name: 'Tailwind CSS', category: 'Frontend', Icon: SiTailwindcss },
  { name: 'Framer Motion', category: 'Frontend', Icon: SiFramer },
  { name: 'HTML5', category: 'Frontend', Icon: SiHtml5 },
  { name: 'CSS3', category: 'Frontend', Icon: SiCss },
  { name: 'Redux', category: 'Frontend', Icon: SiRedux },
  { name: 'Zustand', category: 'Frontend', Icon: TbAdjustmentsHorizontal },
  { name: 'Flutter', category: 'Mobile', Icon: SiFlutter },
  { name: 'React Native', category: 'Mobile', Icon: SiReact },
  { name: 'Dart', category: 'Mobile', Icon: SiDart },
  { name: 'Node.js', category: 'Backend', Icon: SiNodedotjs },
  { name: 'Express.js', category: 'Backend', Icon: SiExpress },
  { name: 'NestJS', category: 'Backend', Icon: SiNestjs },
  { name: 'Python', category: 'Backend', Icon: SiPython },
  { name: 'Django', category: 'Backend', Icon: SiDjango },
  { name: 'FastAPI', category: 'Backend', Icon: SiFastapi },
  { name: 'Go', category: 'Backend', Icon: SiGo },
  { name: 'GraphQL', category: 'Backend', Icon: SiGraphql },
  { name: 'REST API', category: 'Backend', Icon: TbApi },
  { name: 'PostgreSQL', category: 'Database', Icon: SiPostgresql },
  { name: 'MongoDB', category: 'Database', Icon: SiMongodb },
  { name: 'MySQL', category: 'Database', Icon: SiMysql },
  { name: 'Redis', category: 'Database', Icon: SiRedis },
  { name: 'Prisma', category: 'Database', Icon: SiPrisma },
  { name: 'Supabase', category: 'Database', Icon: SiSupabase },
  { name: 'Firebase', category: 'Database', Icon: SiFirebase },
  { name: 'AWS', category: 'Cloud and DevOps', Icon: FaAws },
  { name: 'Docker', category: 'Cloud and DevOps', Icon: SiDocker },
  { name: 'Kubernetes', category: 'Cloud and DevOps', Icon: SiKubernetes },
  { name: 'Vercel', category: 'Cloud and DevOps', Icon: SiVercel },
  { name: 'Netlify', category: 'Cloud and DevOps', Icon: SiNetlify },
  { name: 'GitHub Actions', category: 'Cloud and DevOps', Icon: SiGithubactions },
  { name: 'Nginx', category: 'Cloud and DevOps', Icon: SiNginx },
  { name: 'Linux', category: 'Cloud and DevOps', Icon: SiLinux },
  { name: 'OpenAI', category: 'AI and Tools', Icon: SiOpenai },
  { name: 'AI Chatbots', category: 'AI and Automation', Icon: TbMessageChatbot },
  { name: 'LangChain', category: 'AI and Tools', Icon: SiLangchain },
  { name: 'TensorFlow', category: 'AI and Tools', Icon: SiTensorflow },
  { name: 'Git', category: 'AI and Tools', Icon: SiGit },
  { name: 'GitHub', category: 'AI and Tools', Icon: SiGithub },
  { name: 'Figma', category: 'AI and Tools', Icon: SiFigma },
  { name: 'Jira', category: 'AI and Tools', Icon: SiJira },
  { name: 'Postman', category: 'AI and Tools', Icon: SiPostman },
];

const midpoint = Math.ceil(techStack.length / 2);
const rowOne = techStack.slice(0, midpoint);
const rowTwo = techStack.slice(midpoint);

const marqueeRowOne = [...rowOne, ...rowOne];
const marqueeRowTwo = [...rowTwo, ...rowTwo];

function TechPill({ name, category, Icon }) {
  const IconComponent = Icon;

  return (
    <div className="tech-pill shrink-0 rounded-full border border-black/10 bg-white/90 px-4 py-3 md:px-5 md:py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:text-black hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-[1rem] text-zinc-900 md:h-9 md:w-9 md:text-[1.05rem]">
          <IconComponent aria-hidden="true" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-bold tracking-tight text-black md:text-[0.95rem]">{name}</span>
          <span className="hidden text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-zinc-400 md:block">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="px-0 py-20 md:py-32 overflow-hidden">
      <div className="px-8 max-w-screen-2xl mx-auto">
        <h2 className="text-[0.6875rem] font-black uppercase tracking-[0.3em] mb-10 md:mb-16 text-center">
          Engineered with Precision
        </h2>
      </div>

      <div className="tech-marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f9f9f9] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f9f9f9] to-transparent md:w-24" />

        <div className="space-y-4 md:space-y-5">
          <div className="overflow-hidden">
            <div className="tech-marquee-track tech-marquee-track-right flex w-max items-center gap-3 md:gap-4 pl-3 md:pl-4">
              {marqueeRowOne.map((tech, index) => (
                <TechPill
                  key={`${tech.name}-row-one-${index}`}
                  name={tech.name}
                  category={tech.category}
                  Icon={tech.Icon}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="tech-marquee-track tech-marquee-track-left flex w-max items-center gap-3 md:gap-4 pl-3 md:pl-4">
              {marqueeRowTwo.map((tech, index) => (
                <TechPill
                  key={`${tech.name}-row-two-${index}`}
                  name={tech.name}
                  category={tech.category}
                  Icon={tech.Icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
