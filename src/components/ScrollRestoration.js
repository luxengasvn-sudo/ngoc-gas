'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Enable manual scroll restoration to prevent browser from forcing scroll to 0
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const storageKey = `ngoc_gas_scroll_${pathname}`;

    // 1. Restore scroll position on initial mount / F5
    const savedPos = sessionStorage.getItem(storageKey);
    if (savedPos !== null) {
      const targetY = parseInt(savedPos, 10);
      if (!isNaN(targetY) && targetY > 0) {
        // Immediate attempt
        window.scrollTo({ top: targetY, behavior: 'instant' });

        // Backup attempts for dynamic/hydrated content
        const rafId = requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        });

        const timer1 = setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }, 60);

        const timer2 = setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }, 180);

        return () => {
          cancelAnimationFrame(rafId);
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, [pathname]);

  useEffect(() => {
    const storageKey = `ngoc_gas_scroll_${pathname}`;

    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(storageKey, String(Math.round(window.scrollY)));
        }
      }, 80);
    };

    const handleBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(storageKey, String(Math.round(window.scrollY)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  return null;
}
