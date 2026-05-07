import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const MotionDiv = motion.div;

export default function ImageLightbox({ isOpen, src, alt, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && src && (
        <>
          <MotionDiv
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <MotionDiv
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex max-h-[86svh] w-full max-w-5xl items-center justify-center">
              <button
                type="button"
                aria-label="Close image preview"
                onClick={onClose}
                className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-black shadow-lg ring-1 ring-black/10 transition-colors hover:bg-white sm:right-3 sm:top-3"
              >
                <X size={18} />
              </button>

              <div
                className="w-full overflow-hidden rounded-[1.1rem] sm:rounded-[1.5rem] border border-white/10 bg-zinc-950/40 shadow-[0_30px_90px_rgba(0,0,0,0.38)]"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={src}
                  alt={alt}
                  className="block max-h-[86svh] w-full object-contain"
                />
              </div>
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
}
