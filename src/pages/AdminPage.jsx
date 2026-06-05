import { useEffect, useMemo, useState } from 'react';
import { FiDownload, FiEye, FiFileText, FiLock, FiLogOut, FiMail, FiPhone, FiTrash2, FiX } from 'react-icons/fi';
import { ADMIN_PASSCODE, CAREER_APPLICATIONS_KEY } from '../data/careers';

const ADMIN_AUTH_KEY = 'blitz-admin-authenticated';

function loadApplications() {
  try {
    const stored = window.localStorage.getItem(CAREER_APPLICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatFileSize(size) {
  if (!size) {
    return 'Unknown size';
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function ResumePreviewModal({ application, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!application) return null;

  const isPdf =
    application.resumeType === 'application/pdf' ||
    application.resumeName?.toLowerCase().endsWith('.pdf');

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/55 px-4 py-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-[85vh] w-full max-w-4xl flex-col rounded-[1.5rem] border border-white/40 bg-white p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between pr-10">
          <div>
            <p className="mb-1 text-[0.65rem] font-black uppercase tracking-[0.24em] text-zinc-400">
              Resume Preview
            </p>
            <h2 className="text-xl font-black tracking-[-0.04em] text-black sm:text-2xl">
              {application.name}
            </h2>
            <p className="text-xs font-semibold text-zinc-500">
              {application.roleTitle} · {application.resumeName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-black/10 text-black/60 transition hover:bg-black hover:text-white"
            aria-label="Close preview"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-1 min-h-0 w-full overflow-hidden rounded-2xl bg-zinc-50">
          {isPdf ? (
            <iframe
              src={application.resumeDataUrl}
              className="h-full w-full border-0 rounded-2xl"
              title={`Resume of ${application.name}`}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-zinc-100 text-zinc-600">
                <FiFileText size={24} />
              </div>
              <h3 className="text-lg font-black tracking-tight text-black">
                Preview not available
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-600">
                Direct in-browser previews are only supported for PDF documents. Word documents (.doc/.docx) must be downloaded to view.
              </p>
              <a
                href={application.resumeDataUrl}
                download={application.resumeName}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-zinc-800"
              >
                <FiDownload />
                Download to View
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true'
  );
  const [applications, setApplications] = useState(() => (
    window.sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' ? loadApplications() : []
  ));
  const [previewApplication, setPreviewApplication] = useState(null);

  const roleCounts = useMemo(() => {
    return applications.reduce((counts, application) => {
      counts[application.roleTitle] = (counts[application.roleTitle] || 0) + 1;
      return counts;
    }, {});
  }, [applications]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (passcode !== ADMIN_PASSCODE) {
      setError('Incorrect 6 digit passcode.');
      return;
    }

    window.sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    setIsAuthenticated(true);
    setApplications(loadApplications());
    setError('');
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleDelete = (applicationId) => {
    const nextApplications = applications.filter((application) => application.id !== applicationId);
    window.localStorage.setItem(CAREER_APPLICATIONS_KEY, JSON.stringify(nextApplications));
    setApplications(nextApplications);
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <section className="w-full max-w-md rounded-[1.5rem] border border-black/8 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-7">
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-black text-white">
            <FiLock size={24} />
          </div>
          <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.24em] text-zinc-400">Admin access</p>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-black">Applicant dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Enter the 6 digit passcode to view career applications saved in this browser.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                Passcode
              </span>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={passcode}
                onChange={(event) => {
                  setPasscode(event.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                className="w-full rounded-2xl border-black/10 bg-zinc-50 px-4 py-3 text-center text-lg font-black tracking-[0.35em] text-black focus:border-black focus:ring-black/10"
                placeholder=""
              />
              {error && <span className="mt-2 block text-xs font-semibold text-red-600">{error}</span>}
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-zinc-800"
            >
              Unlock admin
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="px-4 pb-12 pt-24 sm:px-5 sm:pt-28 md:px-8 md:pb-24 md:pt-40">
      <section className="mx-auto mb-8 flex max-w-screen-2xl flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.24em] text-zinc-400">Blitz admin</p>
          <h1 className="text-[2.5rem] font-black uppercase leading-[0.9] tracking-[-0.07em] text-black sm:text-[4rem] md:text-[5.6rem]">
            Applicants
          </h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white"
        >
          <FiLogOut />
          Logout
        </button>
      </section>

      <section className="mx-auto mb-8 grid max-w-screen-2xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[1.2rem] bg-black p-5 text-white">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/45">Total</p>
          <p className="mt-3 text-4xl font-black tracking-[-0.06em]">{applications.length}</p>
        </div>
        {Object.entries(roleCounts).slice(0, 3).map(([role, count]) => (
          <div key={role} className="rounded-[1.2rem] border border-black/8 bg-white p-5">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-zinc-400">{role}</p>
            <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-black">{count}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-screen-2xl">
        {applications.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-black/15 bg-white p-8 text-center">
            <p className="text-lg font-black tracking-tight text-black">No applications yet.</p>
            <p className="mt-2 text-sm text-zinc-600">Applications submitted from the careers page will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((application) => (
              <article key={application.id} className="rounded-[1.35rem] border border-black/8 bg-white p-4 shadow-[0_14px_40px_rgba(0,0,0,0.045)] sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="mb-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-zinc-400">
                      {application.roleTitle}
                    </p>
                    <h2 className="text-2xl font-black tracking-[-0.04em] text-black">{application.name}</h2>
                    <p className="mt-2 text-xs font-semibold text-zinc-500">{formatDate(application.submittedAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewApplication(application)}
                      className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-zinc-800"
                    >
                      <FiEye />
                      Preview
                    </button>
                    <a
                      href={application.resumeDataUrl}
                      download={application.resumeName}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
                    >
                      <FiDownload />
                      Download
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(application.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-red-700 transition hover:bg-red-100"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <a href={`mailto:${application.email}`} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 text-sm font-semibold text-zinc-700">
                    <FiMail className="shrink-0 text-black" />
                    <span className="truncate">{application.email}</span>
                  </a>
                  <a href={`tel:${application.phone}`} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 text-sm font-semibold text-zinc-700">
                    <FiPhone className="shrink-0 text-black" />
                    {application.phone}
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 text-sm font-semibold text-zinc-700">
                    <FiFileText className="shrink-0 text-black" />
                    <span className="truncate">{application.resumeName} · {formatFileSize(application.resumeSize)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {previewApplication && (
        <ResumePreviewModal
          application={previewApplication}
          onClose={() => setPreviewApplication(null)}
        />
      )}
    </main>
  );
}
