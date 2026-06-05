import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import adPopupImage from '../../assets/ad_popup.png';
import adPopupImage2 from '../../assets/ad_popup2.png';

const MotionDiv = motion.div;

const MIN_WIDTH = 320;
const MAX_WIDTH = 530;
const SHOW_DELAY_MS = 3000;
const NEXT_AD_DELAY_MS = 5500;
const AUTO_ADVANCE_DELAY_MS = 8500;
const STORAGE_KEY_PREFIX = 'blitz-mobile-ad-dismissed-v2:';
const CHAT_TOUR_READY_KEY = 'blitz-chat-tour-ready';
const CHAT_TOUR_EVENT = 'blitz:chat-tour-ready';
const ads = [
  {
    id: 'website-247',
    image: adPopupImage,
    alt: 'Blitz 24/7 website support advertisement',
  },
  {
    id: 'ai-chatbot',
    image: adPopupImage2,
    alt: 'Blitz AI chatbot advertisement',
  },
];

function isSupportedMobileWidth() {
  if (typeof window === 'undefined') {
    return false;
  }

  const width = window.innerWidth;
  return width >= MIN_WIDTH && width <= MAX_WIDTH;
}

function getDismissedKey(adId) {
  return `${STORAGE_KEY_PREFIX}${adId}`;
}

function isAdDismissed(adId) {
  return window.sessionStorage.getItem(getDismissedKey(adId)) === 'true';
}

function findNextAdIndex(startIndex = 0) {
  return ads.findIndex((ad, index) => index >= startIndex && !isAdDismissed(ad.id));
}

function notifyChatTourReady() {
  window.sessionStorage.setItem(CHAT_TOUR_READY_KEY, 'true');
  window.dispatchEvent(new CustomEvent(CHAT_TOUR_EVENT));
}

export default function MobileAdPopup() {
  const [isEligible, setIsEligible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeAdIndex, setActiveAdIndex] = useState(null);
  const [dismissalVersion, setDismissalVersion] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const updateEligibility = () => {
      const hasAvailableAd = ads.some((ad) => !isAdDismissed(ad.id));
      setIsEligible(isSupportedMobileWidth() && hasAvailableAd);
    };

    updateEligibility();
    window.addEventListener('resize', updateEligibility);

    return () => {
      window.removeEventListener('resize', updateEligibility);
    };
  }, [dismissalVersion]);

  useEffect(() => {
    if (!isEligible || isOpen) {
      if (!isEligible) {
        const resetTimer = window.setTimeout(() => {
          setIsOpen(false);
          setActiveAdIndex(null);
        }, 0);

        return () => {
          window.clearTimeout(resetTimer);
        };
      }

      return undefined;
    }

    const nextAdIndex = findNextAdIndex();

    if (nextAdIndex === -1) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setActiveAdIndex(nextAdIndex);
      setIsOpen(true);
      setHasStarted(true);
    }, hasStarted ? NEXT_AD_DELAY_MS : SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [dismissalVersion, hasStarted, isEligible, isOpen]);

  useEffect(() => {
    if (!isEligible || !isOpen || activeAdIndex === null) {
      return undefined;
    }

    const nextAdIndex = findNextAdIndex(activeAdIndex + 1);

    if (nextAdIndex === -1) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(getDismissedKey(ads[activeAdIndex].id), 'true');
      setActiveAdIndex(nextAdIndex);
      setDismissalVersion((version) => version + 1);
    }, AUTO_ADVANCE_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeAdIndex, isEligible, isOpen]);

  const handleClose = () => {
    if (activeAdIndex !== null) {
      const activeAd = ads[activeAdIndex];
      window.sessionStorage.setItem(getDismissedKey(activeAd.id), 'true');

      if (activeAd.id === 'ai-chatbot') {
        notifyChatTourReady();
      }
    }

    setIsOpen(false);
    setActiveAdIndex(null);
    setDismissalVersion((version) => version + 1);
  };

  const activeAd = activeAdIndex === null ? null : ads[activeAdIndex];

  return (
    <AnimatePresence>
      {isEligible && isOpen && activeAd && (
        <>
          <MotionDiv
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <MotionDiv
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-[1.35rem] border border-white/80 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
              style={{
                width: 'min(92vw, calc(78svh * 9 / 16), 22rem)',
                aspectRatio: '9 / 16',
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.35rem]">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black shadow-sm ring-1 ring-black/5">
                  Ad
                </span>

                <button
                  type="button"
                  aria-label="Close advertisement"
                  onClick={handleClose}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-black shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white"
                >
                  <X size={16} />
                </button>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeAd.id}
                    src={activeAd.image}
                    alt={activeAd.alt}
                    className="absolute inset-0 block h-full w-full object-cover object-center"
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
}
