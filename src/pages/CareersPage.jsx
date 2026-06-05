import { useMemo, useState } from 'react';
import { FiArrowRight, FiBriefcase, FiCheckCircle, FiChevronDown, FiMapPin, FiUploadCloud, FiX } from 'react-icons/fi';
import { careerRoles, CAREER_APPLICATIONS_KEY } from '../data/careers';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  resume: null,
};

function readStoredApplications() {
  try {
    const stored = window.localStorage.getItem(CAREER_APPLICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeApplication(application) {
  const applications = readStoredApplications();
  window.localStorage.setItem(
    CAREER_APPLICATIONS_KEY,
    JSON.stringify([application, ...applications])
  );
}

function readResumeFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Unable to read resume file.'));
    reader.readAsDataURL(file);
  });
}

function ApplicationModal({ selectedRole, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resumeLabel = form.resume?.name || 'Upload resume';

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Enter exactly 10 digits.';
    }

    if (!form.resume) {
      nextErrors.resume = 'Resume is required.';
    } else if (form.resume.size > 2.5 * 1024 * 1024) {
      nextErrors.resume = 'Resume must be under 2.5 MB for local storage.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const resumeDataUrl = await readResumeFile(form.resume);

      storeApplication({
        id: `applicant-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        roleId: selectedRole.id,
        roleTitle: selectedRole.title,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        resumeName: form.resume.name,
        resumeType: form.resume.type || 'application/octet-stream',
        resumeSize: form.resume.size,
        resumeDataUrl,
        submittedAt: new Date().toISOString(),
      });

      setIsSubmitted(true);
      setForm(emptyForm);
    } catch (error) {
      setErrors({ resume: error instanceof Error ? error.message : 'Resume upload failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/55 px-4 py-5 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[1.5rem] border border-white/40 bg-white p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-black/10 text-black/60 transition hover:bg-black hover:text-white"
          aria-label="Close application form"
        >
          <FiX />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-black text-white">
              <FiCheckCircle size={25} />
            </div>
            <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.24em] text-zinc-400">
              Application received
            </p>
            <h2 className="text-2xl font-black tracking-[-0.04em] text-black">
              Thanks for applying.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-600">
              Your application has been saved locally. Our admin page can now view the applicant details from this browser.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-zinc-800"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.24em] text-zinc-400">
              Apply for role
            </p>
            <h2 className="pr-12 text-2xl font-black tracking-[-0.04em] text-black sm:text-3xl">
              {selectedRole.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Share your details and resume. We review every application with care and respond when there is a strong match.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Full name
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-2xl border-black/10 bg-zinc-50 px-4 py-3 text-sm font-semibold text-black focus:border-black focus:ring-black/10"
                  placeholder="Your name"
                />
                {errors.name && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.name}</span>}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                    Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="w-full rounded-2xl border-black/10 bg-zinc-50 px-4 py-3 text-sm font-semibold text-black focus:border-black focus:ring-black/10"
                    placeholder="you@example.com"
                  />
                  {errors.email && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.email}</span>}
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                    Phone
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(event) => {
                      const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10);
                      setForm((current) => ({ ...current, phone: digitsOnly }));
                    }}
                    className="w-full rounded-2xl border-black/10 bg-zinc-50 px-4 py-3 text-sm font-semibold text-black focus:border-black focus:ring-black/10"
                    placeholder="10 digit number"
                  />
                  {errors.phone && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.phone}</span>}
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Resume
                </span>
                <div className="rounded-2xl border border-dashed border-black/20 bg-zinc-50 p-4 transition hover:border-black/45">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => setForm((current) => ({ ...current, resume: event.target.files?.[0] || null }))}
                    className="sr-only"
                    id="career-resume-upload"
                  />
                  <label htmlFor="career-resume-upload" className="flex cursor-pointer items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white">
                      <FiUploadCloud size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-black">{resumeLabel}</span>
                      <span className="text-xs font-medium text-zinc-500">PDF, DOC, or DOCX under 2.5 MB</span>
                    </span>
                  </label>
                </div>
                {errors.resume && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.resume}</span>}
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting' : 'Submit application'}
                <FiArrowRight />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function RoleCard({ role, isOpen, onApply, onToggle }) {
  return (
    <article className="overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.045)]">
      <button
        type="button"
        onClick={() => onToggle(role.id)}
        className="flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5 md:p-6"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 gap-3 sm:gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white">
            <FiBriefcase />
          </span>
          <span className="min-w-0">
            <span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.22em] text-zinc-400">
              {role.type}
            </span>
            <span className="block text-[1.28rem] font-black leading-tight tracking-[-0.04em] text-black md:text-2xl">
              {role.title}
            </span>
            <span className="mt-2 block max-w-3xl text-sm leading-6 text-zinc-600">{role.summary}</span>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-600">
              <FiMapPin />
              {role.mode}
            </span>
          </span>
        </span>
        <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 transition ${isOpen ? 'rotate-180 bg-black text-white' : 'text-black'}`}>
          <FiChevronDown />
        </span>
      </button>

      <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-black/8 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-zinc-400">What you will own</h3>
                <ul className="space-y-2.5">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2 text-[0.86rem] leading-5 text-zinc-700">
                      <FiCheckCircle className="mt-0.5 shrink-0 text-black" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-zinc-400">Good match if</h3>
                <ul className="space-y-2.5">
                  {role.requirements.map((item) => (
                    <li key={item} className="flex gap-2 text-[0.86rem] leading-5 text-zinc-700">
                      <FiCheckCircle className="mt-0.5 shrink-0 text-black" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onApply(role)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 sm:w-auto"
            >
              Apply now
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [openRoleId, setOpenRoleId] = useState(careerRoles[0]?.id || null);
  const openRolesCount = useMemo(() => careerRoles.length.toString().padStart(2, '0'), []);

  return (
    <main className="px-4 pb-12 pt-24 sm:px-5 sm:pt-28 md:px-8 md:pb-24 md:pt-40">
      <section className="mx-auto mb-8 grid max-w-screen-2xl gap-6 md:mb-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-black px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-white">
            Careers at Blitz
          </p>
          <h1 className="max-w-4xl text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.07em] text-black sm:text-[4rem] md:text-[6.6rem]">
            Build work that ships.
          </h1>
        </div>
        <div className="rounded-[1.5rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-zinc-400">Open roles</span>
            <span className="text-3xl font-black tracking-[-0.06em] text-black">{openRolesCount}</span>
          </div>
          <p className="text-sm leading-6 text-zinc-600 md:text-base md:leading-7">
            We are building a compact, high-ownership team for web platforms, product interfaces, customer workflows, and support excellence.
          </p>
        </div>
      </section>

      <section className="mx-auto mb-10 grid max-w-screen-2xl gap-3 sm:grid-cols-3 md:mb-14">
        {[
          
        ].map(([title, description]) => (
          <div key={title} className="rounded-[1.1rem] border border-black/8 bg-zinc-50 p-4">
            <h2 className="mb-2 text-sm font-black tracking-tight text-black">{title}</h2>
            <p className="text-[0.82rem] leading-5 text-zinc-600">{description}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-5xl gap-3 md:gap-4">
        {careerRoles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            isOpen={openRoleId === role.id}
            onApply={setSelectedRole}
            onToggle={(roleId) => setOpenRoleId((current) => (current === roleId ? null : roleId))}
          />
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-screen-2xl rounded-[1.5rem] bg-black p-5 text-white md:mt-14 md:p-8">
        <div className="grid gap-5 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div>
            <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.24em] text-white/45">Hiring standard</p>
            <h2 className="text-2xl font-black tracking-[-0.04em] md:text-4xl">How we review</h2>
          </div>
          <p className="text-sm leading-6 text-white/70 md:text-base md:leading-7">
            We look for people who communicate clearly, care about the final user experience, can own responsibility without hand-holding, and want to build professional products that clients can trust.
          </p>
        </div>
      </section>

      {selectedRole && (
        <ApplicationModal selectedRole={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </main>
  );
}
