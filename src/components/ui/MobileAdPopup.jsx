import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import adPopupImage from '../../assets/ad_popup.jpeg';

const MotionDiv = motion.div;

const MIN_WIDTH = 320;
const MAX_WIDTH = 530;
const SHOW_DELAY_MS = 3000;
const STORAGE_KEY = 'blitz-mobile-ad-dismissed';

function isSupportedMobileWidth() {
  if (typeof window === 'undefined') {
    return false;
  }

  const width = window.innerWidth;
  return width >= MIN_WIDTH && width <= MAX_WIDTH;
}

export default function MobileAdPopup() {
  const [isEligible, setIsEligible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateEligibility = () => {
      const dismissed = window.sessionStorage.getItem(STORAGE_KEY) === 'true';
      setIsEligible(isSupportedMobileWidth() && !dismissed);
    };

    updateEligibility();
    window.addEventListener('resize', updateEligibility);

    return () => {
      window.removeEventListener('resize', updateEligibility);
    };
  }, []);

  useEffect(() => {
    if (!isEligible) {
      setIsOpen(false);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isEligible]);

  const handleClose = () => {
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    setIsEligible(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionDiv
            className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <MotionDiv
            className="fixed inset-x-3.5 bottom-3.5 z-[80] mx-auto w-[calc(100%-1.75rem)] max-w-[21.5rem]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full overflow-hidden rounded-[1.4rem] border border-white/70 bg-transparent shadow-[0_24px_70px_rgba(0,0,0,0.26)]">
              <div className="relative w-full aspect-[9/16] max-h-[76svh] overflow-hidden rounded-[1.4rem]">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black shadow-sm ring-1 ring-black/5">
                  Ad
                </span>

                <button
                  type="button"
                  aria-label="Close advertisement"
                  onClick={handleClose}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/92 text-black shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white"
                >
                  <X size={16} />
                </button>

                <img
                  src={adPopupImage}
                  alt="Blitz promotional advertisement"
                  className="absolute inset-0 block h-full w-full min-h-full min-w-full object-cover object-center"
                />
              </div>
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
}
