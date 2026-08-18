'use client';

import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroSection({ initialSettings }) {
  const [settings, setSettings] = useState(() => {
    const init = initialSettings || {};
    return {
      company_name: init.company_name || 'NGỌC GAS',
      slogan: init.slogan || 'Nhà cung cấp gas chuyên nghiệp, uy tín tại TP. HCM & Bình Dương. Chuyên thiết kế, thi công hệ thống gas công nghiệp và giao lẻ gas dân dụng chính hãng, an toàn tuyệt đối.',
      logo_url: init.logo_url || '',
      hero_call_title: init.hero_call_title || 'Khách gọi đặt gas...',
      hero_call_desc: init.hero_call_desc || 'Bình Sopet 12kg Xám',
      hero_delivery_title: init.hero_delivery_title || 'Đang giao gas...',
      hero_delivery_desc: init.hero_delivery_desc || 'Dự kiến đến trong 15 phút',
      hero_mode: init.hero_mode || 'slide',
      hero_slide_speed: init.hero_slide_speed || '5',
      hero_video_url: init.hero_video_url || '',
      hero_slide_1: init.hero_slide_1 || '',
      hero_slide_2: init.hero_slide_2 || '',
      hero_slide_3: init.hero_slide_3 || '',
      hero_slide_1_mobile: init.hero_slide_1_mobile || '',
      hero_slide_2_mobile: init.hero_slide_2_mobile || '',
      hero_slide_3_mobile: init.hero_slide_3_mobile || '',
      hero_show_text_block: init.hero_show_text_block !== undefined ? init.hero_show_text_block : '1',
      hero_badge_text: init.hero_badge_text || '',
      hero_title_text: init.hero_title_text || '',
      hero_subtitle_text: init.hero_subtitle_text || '',
      hero_btn1_text: init.hero_btn1_text || '',
      hero_btn1_link: init.hero_btn1_link || '',
      hero_btn2_text: init.hero_btn2_text || '',
      hero_show_btn2: init.hero_show_btn2 !== undefined ? init.hero_show_btn2 : '1'
    };
  });

  const [animationState, setAnimationState] = useState('idle'); // idle -> calling -> loading -> delivering -> resetting
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (initialSettings) {
      setSettings(prev => ({
        ...prev,
        ...initialSettings
      }));
    }

    const fetchHeroSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.data) {
          setSettings(prev => ({
            ...prev,
            ...data.data
          }));
        }
      } catch (e) {
        console.error('Error fetching hero settings:', e);
      }
    };
    fetchHeroSettings();
  }, [initialSettings]);

  // Build slides with desktop/mobile fallback
  const desktopSlides = [
    settings.hero_slide_1,
    settings.hero_slide_2,
    settings.hero_slide_3
  ].filter(Boolean);

  const mobileSlides = [
    settings.hero_slide_1_mobile,
    settings.hero_slide_2_mobile,
    settings.hero_slide_3_mobile
  ].filter(Boolean);

  // Pick slides: prefer device-specific, fallback to the other
  let slides;
  if (isMobile) {
    slides = mobileSlides.length > 0 ? mobileSlides : desktopSlides;
  } else {
    slides = desktopSlides.length > 0 ? desktopSlides : mobileSlides;
  }

  if (slides.length === 0) {
    slides.push('/images/delivery-motorcycle.webp');
    slides.push('/images/gas-cylinder.webp');
  }

  const optimizedSlides = slides.map(s => (s && s.startsWith('/images/') ? s.replace(/\.(jpe?g|png)$/i, '.webp') : s));

  useEffect(() => {
    if (settings.hero_mode !== 'slide' || slides.length <= 1) return;
    
    const intervalTime = (parseInt(settings.hero_slide_speed, 10) || 5) * 1000;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [settings.hero_mode, settings.hero_slide_speed, slides.length]);

  // Timeline loop for the delivery animation
  useEffect(() => {
    setIsMounted(true);
    let timer;
    const runAnimationCycle = () => {
      timer = setTimeout(() => {
        setAnimationState('calling');
        
        timer = setTimeout(() => {
          setAnimationState('loading');
          
          timer = setTimeout(() => {
            setAnimationState('delivering');
            
            timer = setTimeout(() => {
              setAnimationState('resetting');
              
              timer = setTimeout(() => {
                setAnimationState('idle');
                runAnimationCycle();
              }, 800);
            }, 2200);
          }, 1800);
        }, 2000);
      }, 3000);
    };

    runAnimationCycle();
    return () => clearTimeout(timer);
  }, []);

  const triggerDemo = () => {
    if (animationState !== 'idle') return;
    setAnimationState('calling');
  };

  return (
    <>
      <section className="hero">
        {/* Background slide/video container */}
        <div className="hero-background-wrapper">
          {settings.hero_mode === 'video' && settings.hero_video_url ? (
            <video 
              src={settings.hero_video_url} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="hero-bg-video"
            />
          ) : (
            optimizedSlides.map((img, idx) => (
              <div 
                key={idx}
                className={`hero-bg-slide ${idx === activeSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }}
              >
                {idx === 0 && (
                  <img 
                    src={img} 
                    alt="Ngọc Gas Banner" 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, pointerEvents: 'none' }}
                    fetchPriority="high"
                    decoding="sync"
                  />
                )}
              </div>
            ))
          )}
          <div className="hero-gradient-overlay"></div>
        </div>

        {/* Slide Indicator Dots */}
        {settings.hero_mode === 'slide' && slides.length > 1 && (
          <div className="hero-slide-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`slide-dot ${idx === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                title={`Xem slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <div className={`container hero-container ${settings.hero_show_text_block === '0' ? 'text-hidden' : ''}`}>
          {settings.hero_show_text_block !== '0' && (
            <div className="hero-content animate-fade-in-up">
              {settings.hero_badge_text && (
                <div className="hero-badge">
                  <Flame size={16} />
                  <span>{settings.hero_badge_text}</span>
                </div>
              )}
              <h1 className="hero-title">
                {settings.hero_title_text || settings.company_name}
              </h1>
              <p className="hero-subtitle">
                {settings.hero_subtitle_text || settings.slogan}
              </p>
              <div className="hero-actions">
                <Link href={settings.hero_btn1_link || "/san-pham"} className="btn btn-primary btn-lg">
                  <span>{settings.hero_btn1_text || 'Xem sản phẩm'}</span>
                  <ArrowRight size={18} />
                </Link>
                {settings.hero_show_btn2 !== '0' && (
                  <Link href={settings.hero_btn2_link || "/lien-he"} className="btn btn-outline btn-lg">
                    <span>{settings.hero_btn2_text || 'Liên hệ ngay'}</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        .no-transition {
          transition: none !important;
        }

        .hero-slide-dots {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10;
        }

        .slide-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .slide-dot:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }

        .slide-dot.active {
          width: 32px;
          border-radius: 6px;
          background-color: #FF6B00;
          box-shadow: 0 0 10px rgba(255, 107, 0, 0.6);
        }

        .hero {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #111111;
          color: #FFFFFF;
          padding: 140px 0 80px 0;
          margin-top: -80px;
        }

        .hero-background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-bg-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }

        .hero-bg-slide.active {
          opacity: 1;
        }

        .hero-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: 2;
        }

        .hero-container {
          position: relative;
          z-index: 5;
        }

        .hero-container.text-hidden {
          grid-template-columns: 1fr;
          justify-items: center;
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(245, 183, 49, 0.15);
          border: 1px solid rgba(245, 183, 49, 0.3);
          color: var(--primary);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .hero-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 54px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          color: #FFFFFF;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-subtitle {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 40px;
          max-width: 600px;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        @media (max-width: 992px) {
          .hero {
            padding: 60px 0;
            min-height: auto;
          }
          .hero-container {
            grid-template-columns: 1fr;
            gap: 45px;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .hero-title {
            font-size: 38px;
          }
          .hero-subtitle {
            font-size: 16px;
            margin-bottom: 30px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }
        }

        .hero-animation-canvas {
          position: relative;
          width: 100%;
          height: 380px;
          background-color: transparent;
          overflow: hidden;
        }

        .animation-road {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          height: 45px;
          background-color: #334155;
          border-top: 3px dashed #E2E8F0;
          border-bottom: 4px solid #475569;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* Popup Notification */
        .phone-call-popup {
          position: absolute;
          top: 15px;
          left: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: var(--radius);
          z-index: 100;
          transform: translateY(-20px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: var(--shadow-lg);
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid rgba(245, 183, 49, 0.3) !important;
        }

        .phone-call-popup.show {
          transform: translateY(0);
          opacity: 1;
        }

        .phone-call-popup.fade-out {
          transform: translateY(-20px);
          opacity: 0;
        }

        .phone-icon-circle {
          background-color: var(--success);
          color: #FFFFFF;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phone-icon-circle.ringing {
          animation: ring 0.5s infinite ease-in-out;
        }

        .phone-call-info {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .phone-call-info strong {
          font-size: 15px;
          color: var(--text);
        }

        .phone-call-info span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Status Badge */
        .delivery-status-badge {
          position: absolute;
          top: 15px;
          right: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: var(--radius);
          z-index: 100;
          transform: translateY(-20px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: var(--shadow-lg);
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid rgba(22, 163, 74, 0.3) !important;
        }

        .delivery-status-badge.show {
          transform: translateY(0);
          opacity: 1;
        }

        .success-icon-circle {
          background-color: var(--primary);
          color: #111111;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-info {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .status-info strong {
          font-size: 15px;
          color: var(--text);
        }

        .status-info span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Motorcycle Group */
        .motorcycle-group {
          position: absolute;
          bottom: 24px;
          left: 10px;
          width: 220px;
          height: 150px;
          z-index: 20;
          transition: transform 1.8s cubic-bezier(0.45, 0, 0.55, 1), opacity 0.4s;
          will-change: transform, opacity;
        }

        .motorcycle-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.12));
        }

        .motorcycle-img.engine-idle {
          animation: idleEngine 1.2s infinite ease-in-out;
        }

        .motorcycle-group.drive-away {
          transform: translateX(500px);
        }

        /* Gas Cylinder Item */
        .gas-cylinder-item {
          position: absolute;
          bottom: 28px;
          left: 350px;
          width: 60px;
          height: 85px;
          z-index: 30;
          transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s;
          will-change: transform, left, bottom, opacity;
        }

        .cylinder-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.15));
        }

        .cylinder-img.cylinder-float {
          animation: floatCylinder 2.5s infinite ease-in-out;
        }

        /* Alignment with back rack of motorcycle */
        .gas-cylinder-item.loaded {
          left: 20px;
          bottom: 95px;
          transform: scale(0.85);
        }

        .gas-cylinder-item.loaded.drive-away {
          transform: scale(0.85) translateX(500px);
          transition: transform 1.8s cubic-bezier(0.45, 0, 0.55, 1);
        }

        /* Reset state */
        .motorcycle-group.fade-in, .gas-cylinder-item.fade-in {
          opacity: 0;
          transition: none;
        }

        @keyframes ring {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }

        /* Micro-animations */
        @keyframes idleEngine {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes floatCylinder {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
