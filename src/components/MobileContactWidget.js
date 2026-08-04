'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { trackClick } from '@/lib/analytics';

export default function MobileContactWidget({ phone: initialPhone }) {
  const [phone, setPhone] = useState(initialPhone || '19009396');

  useEffect(() => {
    if (initialPhone) {
      setPhone(initialPhone);
      return;
    }
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.data && data.data.phone) {
          setPhone(data.data.phone);
        }
      } catch (e) {
        console.error('Error fetching settings for contact widget:', e);
      }
    };
    fetchSettings();
  }, [initialPhone]);

  const cleanPhone = phone.replace(/\./g, '').trim();

  return (
    <>
      <div className="mobile-contact-widget">
        {/* Zalo Button */}
        <a 
          href={`https://zalo.me/${cleanPhone}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="widget-btn zalo-btn"
          aria-label="Chat Zalo"
          onClick={() => trackClick('zalo_click', phone)}
        >
          <div className="widget-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 5.58 2 10c0 2.9 1.88 5.47 4.73 6.93L5.5 21l4.75-2.22C10.74 18.9 11.36 19 12 19c5.52 0 10-3.58 10-8s-4.48-8-10-8zm-1.5 12H9v-4.5H7.5V8.5h4.5v1.5h-3v1.5h3V13h-3v1zm6.5 0h-3v-4.5h-1.5V8.5h4.5v1.5h-3v1.5h3V13h-3v1z" />
            </svg>
          </div>
          <span className="pulse-ring"></span>
        </a>

        {/* Call Now Button */}
        <a 
          href={`tel:${cleanPhone}`} 
          className="widget-btn phone-btn"
          aria-label="Gọi điện thoại"
          onClick={() => trackClick('hotline_click', phone)}
        >
          <div className="widget-icon-wrapper">
            <Phone size={24} fill="currentColor" />
          </div>
          <span className="pulse-ring"></span>
        </a>
      </div>

      <style jsx global>{`
        .mobile-contact-widget {
          position: fixed;
          bottom: 80px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 1500;
        }

        /* Hide on Desktop screens */
        @media (min-width: 1024px) {
          .mobile-contact-widget {
            display: none;
          }
        }

        .widget-btn {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
        }

        .widget-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .zalo-btn {
          background-color: #0068FF; /* Zalo Official Blue */
        }

        .phone-btn {
          background-color: #22C55E; /* Modern Green */
        }

        .widget-icon-wrapper {
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Pulsing ring animation for attention */
        .pulse-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }

        .zalo-btn .pulse-ring {
          border: 2px solid #0068FF;
          animation: widget-pulse 1.8s infinite ease-out;
        }

        .phone-btn .pulse-ring {
          border: 2px solid #22C55E;
          animation: widget-pulse 1.8s infinite ease-out;
          animation-delay: 0.5s;
        }

        @keyframes widget-pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
