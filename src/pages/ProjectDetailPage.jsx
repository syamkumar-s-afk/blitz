import { Link, Navigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import { getProjectBySlug } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { detail } = project;

  return (
    <main className="px-4 sm:px-5 md:px-8 pt-24 sm:pt-28 md:pt-40 pb-10 sm:pb-12 md:pb-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8 md:mb-14">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-[0.82rem] sm:text-sm font-bold tracking-tight text-black transition-colors hover:bg-zinc-50"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to Projects
          </Link>
        </div>

        <article className="rounded-[1.4rem] sm:rounded-[1.6rem] md:rounded-[2rem] border border-black/8 bg-white p-4 sm:p-5 md:p-14 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-6 sm:mb-8 md:mb-10 space-y-2.5 sm:space-y-3 md:space-y-4 text-center">
            <p className="text-[0.58rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.24em] md:tracking-[0.3em] text-zinc-400">
              {detail.eyebrow}
            </p>
            <h1 className="text-[1.9rem] leading-[1.02] sm:text-[2.25rem] md:text-[56px] md:leading-[58px] tracking-[-0.04em] font-black text-black">
              {project.title}
            </h1>
            <p className="mx-auto max-w-2xl text-[0.9rem] leading-6 sm:text-[0.98rem] sm:leading-7 md:text-[18px] md:leading-[30px] text-zinc-600">
              {detail.headline}
            </p>
          </div>

          <div className="mb-6 sm:mb-8 md:mb-10 overflow-hidden rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] border border-black/8 bg-surface-container-low">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-[1.3fr_0.7fr] md:gap-10">
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              <section className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <h2 className="text-[1rem] sm:text-[1.1rem] md:text-xl font-black tracking-tight">Overview</h2>
                <p className="text-[0.88rem] leading-6 sm:text-[0.95rem] sm:leading-7 md:text-base md:leading-8 text-zinc-600">{detail.overview}</p>
              </section>
              <section className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <h2 className="text-[1rem] sm:text-[1.1rem] md:text-xl font-black tracking-tight">Challenge</h2>
                <p className="text-[0.88rem] leading-6 sm:text-[0.95rem] sm:leading-7 md:text-base md:leading-8 text-zinc-600">{detail.challenge}</p>
              </section>
              <section className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <h2 className="text-[1rem] sm:text-[1.1rem] md:text-xl font-black tracking-tight">Solution</h2>
                <p className="text-[0.88rem] leading-6 sm:text-[0.95rem] sm:leading-7 md:text-base md:leading-8 text-zinc-600">{detail.solution}</p>
              </section>
            </div>

            <aside className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] border border-black/8 bg-surface-container-low p-4 sm:p-5 md:p-6">
                <h3 className="text-[0.58rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400 mb-3 sm:mb-4">
                  Services
                </h3>
                <ul className="space-y-2.5 sm:space-y-3">
                  {detail.services.map((item) => (
                    <li key={item} className="text-[0.82rem] sm:text-sm font-semibold text-black">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] border border-black/8 bg-surface-container-low p-4 sm:p-5 md:p-6">
                <h3 className="text-[0.58rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400 mb-3 sm:mb-4">
                  Stack
                </h3>
                <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                  {detail.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-black/8 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-[0.78rem] sm:text-sm font-semibold text-black"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] border border-black/8 bg-surface-container-low p-4 sm:p-5 md:p-6">
                <h3 className="text-[0.58rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400 mb-3 sm:mb-4">
                  Outcomes
                </h3>
                <ul className="space-y-2.5 sm:space-y-3">
                  {detail.outcomes.map((item) => (
                    <li key={item} className="text-[0.82rem] leading-5 sm:text-sm sm:leading-6 font-medium text-zinc-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            {project.action.type === 'demo' && (
              <a
                href={project.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 sm:px-6 py-2.5 sm:py-3 text-[0.82rem] sm:text-sm font-bold tracking-tight text-white transition-colors hover:bg-zinc-800"
              >
                <FiArrowUpRight aria-hidden="true" />
                View Demo
              </a>
            )}
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-[0.82rem] sm:text-sm font-bold tracking-tight text-black transition-colors hover:bg-zinc-50"
            >
              Start a Similar Project
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
