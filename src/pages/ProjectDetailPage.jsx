import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import ImageLightbox from '../components/ui/ImageLightbox';
import { getProjectBySlug } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { detail } = project;
  const demoHref =
    project.demoHref || (project.action.type === 'demo' ? project.action.href : null);

  return (
    <main className="px-4 sm:px-5 md:px-8 pt-24 sm:pt-28 md:pt-40 pb-10 sm:pb-12 md:pb-28">
      <ImageLightbox
        isOpen={isImageOpen}
        src={project.image}
        alt={project.title}
        onClose={() => setIsImageOpen(false)}
      />

      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <div className="mb-6 sm:mb-8 md:mb-14">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-[0.82rem] sm:text-sm font-bold tracking-tight text-black transition-colors hover:bg-zinc-50"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to Projects
          </Link>
        </div>

        {/* Case Study Card */}
        <article className="rounded-[1.4rem] sm:rounded-[1.6rem] md:rounded-[2rem] border border-black/8 bg-white p-4 sm:p-5 md:p-14 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          {/* Hero */}
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

          {/* Project Image */}
          <div className="mb-6 sm:mb-8 md:mb-10 overflow-hidden rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] border border-black/8 bg-surface-container-low">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full cursor-zoom-in object-cover"
              onClick={() => setIsImageOpen(true)}
            />
          </div>

          {/* Highlight Badges */}
          {detail.highlights && detail.highlights.length > 0 && (
            <div className="mb-8 sm:mb-10 md:mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {detail.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/8 bg-zinc-50 px-3.5 py-2 sm:px-4 sm:py-2.5 text-[0.72rem] sm:text-[0.8rem] font-bold tracking-tight text-black"
                >
                  <FiCheckCircle className="text-black/40" size={13} />
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Narrative Sections */}
          <div className="space-y-7 sm:space-y-8 md:space-y-10">
            {/* The Business */}
            <section className="space-y-2 sm:space-y-2.5 md:space-y-3">
              <h2 className="text-[0.6rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400">
                The Business
              </h2>
              <p className="text-[0.88rem] leading-6 sm:text-[0.95rem] sm:leading-7 md:text-base md:leading-8 text-zinc-700">
                {detail.business}
              </p>
            </section>

            {/* The Challenge */}
            <section className="space-y-2 sm:space-y-2.5 md:space-y-3">
              <h2 className="text-[0.6rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400">
                The Challenge
              </h2>
              <p className="text-[0.88rem] leading-6 sm:text-[0.95rem] sm:leading-7 md:text-base md:leading-8 text-zinc-700">
                {detail.challenge}
              </p>
            </section>

            {/* What We Delivered */}
            <section className="space-y-3 sm:space-y-4">
              <h2 className="text-[0.6rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400">
                What We Delivered
              </h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {detail.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-black/8 bg-zinc-50 px-3.5 py-2 sm:px-4 sm:py-2.5 text-[0.78rem] sm:text-sm font-semibold text-black"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </section>

            {/* Our Approach */}
            <section className="space-y-2 sm:space-y-2.5 md:space-y-3">
              <h2 className="text-[0.6rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400">
                Our Approach
              </h2>
              <p className="text-[0.88rem] leading-6 sm:text-[0.95rem] sm:leading-7 md:text-base md:leading-8 text-zinc-700">
                {detail.approach}
              </p>
            </section>

            {/* Results */}
            <section className="space-y-3 sm:space-y-4">
              <h2 className="text-[0.6rem] sm:text-[0.64rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] text-zinc-400">
                Results
              </h2>
              <div className="grid gap-3 sm:gap-3.5">
                {detail.outcomes.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 sm:gap-4 rounded-[1rem] sm:rounded-[1.15rem] border border-black/6 bg-zinc-50/70 p-3.5 sm:p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-[0.65rem] font-black text-white sm:h-8 sm:w-8 sm:text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[0.84rem] leading-5 sm:text-sm sm:leading-6 font-medium text-zinc-700 pt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 border-t border-black/8">
            {demoHref && (
              <a
                href={demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 sm:px-6 py-2.5 sm:py-3 text-[0.82rem] sm:text-sm font-bold tracking-tight text-white transition-colors hover:bg-zinc-800"
              >
                <FiArrowUpRight aria-hidden="true" />
                View Live Project
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

        {/* CTA Banner */}
        <div className="mt-6 sm:mt-8 md:mt-10 rounded-[1.4rem] sm:rounded-[1.6rem] md:rounded-[2rem] bg-black p-6 sm:p-8 md:p-12 text-center">
          <p className="mb-2 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] sm:tracking-[0.24em] text-white/40">
            Next step
          </p>
          <h2 className="text-[1.6rem] leading-[1.05] sm:text-[2rem] md:text-[2.5rem] font-black tracking-[-0.04em] text-white">
            Have a similar project?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[0.88rem] leading-6 sm:text-sm sm:leading-7 text-white/60">
            We help businesses turn ideas into polished digital products. Tell us what you're building and we'll show you what's possible.
          </p>
          <Link
            to="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 sm:px-7 sm:py-3.5 text-[0.82rem] sm:text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-zinc-100"
          >
            Get in Touch
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
