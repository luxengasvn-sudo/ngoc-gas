'use client';

import { useState } from 'react';
import { Flame } from 'lucide-react';

export default function ProductGallery({ mainImage, imagesJson }) {
  let images = [];
  try {
    images = JSON.parse(imagesJson || '[]');
  } catch (e) {
    images = [];
  }

  // Combine main image and album images into a single list of unique images
  const allImages = Array.from(new Set([mainImage, ...images])).filter(Boolean);
  const [activeImage, setActiveImage] = useState(allImages[0] || '');

  return (
    <>
      <div className="product-gallery">
        {/* Main large image */}
        <div className="gallery-main-view card">
          {activeImage ? (
            <img src={activeImage} alt="Sản phẩm Ngọc Gas" className="main-display-img" />
          ) : (
            <div className="gallery-placeholder">
              <Flame size={90} className="placeholder-icon" />
            </div>
          )}
        </div>

        {/* Thumbnails row */}
        {allImages.length > 1 && (
          <div className="gallery-thumbnails-row">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`thumb-btn card ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
                onMouseEnter={() => setActiveImage(img)}
              >
                <img src={img} alt="" className="thumb-img" />
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .product-gallery {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
        }

        .gallery-main-view {
          height: 380px;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 20px;
          border: 1px solid var(--border);
        }

        .main-display-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .main-display-img:hover {
          transform: scale(1.03);
        }

        .gallery-placeholder {
          color: var(--primary-dark);
          opacity: 0.6;
        }

        .gallery-thumbnails-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .thumb-btn {
          width: 70px;
          height: 70px;
          padding: 5px;
          background-color: #FFFFFF;
          border: 2px solid transparent;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .thumb-btn:hover, .thumb-btn.active {
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .thumb-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
    </>
  );
}
