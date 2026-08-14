'use client';

import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 350);
      }, 200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      const fallbackTimer = setTimeout(handleLoad, 600);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`page-loader-overlay ${fadeOut ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.35s ease, visibility 0.35s ease',
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? 'hidden' : 'visible',
        pointerEvents: fadeOut ? 'none' : 'all'
      }}
      aria-hidden="true"
    >
      <div className="loader-card">
        <div className="loader-flame-wrapper">
          <div className="loader-pulse-ring"></div>
          <Flame className="loader-flame-icon" size={36} />
        </div>
        
        <div className="loader-brand-box">
          <span className="loader-brand-title">NGỌC GAS</span>
          <span className="loader-brand-tagline">Năng lượng xanh • An tâm mọi nhà</span>
        </div>

        <div className="loader-progress-bar">
          <div className="loader-progress-fill"></div>
        </div>

        <span className="loader-status-text">Đang tải dữ liệu...</span>
      </div>
    </div>
  );
}
