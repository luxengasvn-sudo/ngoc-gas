'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export default function PostCard({ post }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCoverImage = () => {
    if (post.image_url && post.image_url.trim()) return post.image_url.trim();
    if (post.content) {
      const match = post.content.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const coverImg = getCoverImage();
  const postUrl = `/tin-tuc/${post.slug}`;

  return (
    <>
      <div className="post-card card">
        {coverImg && (
          <Link href={postUrl} className="post-thumb-link">
            <div className="post-thumb-box">
              <img 
                src={coverImg} 
                alt={post.title || 'Bài viết Ngọc Gas'} 
                className="post-thumb-img" 
                loading="lazy" 
              />
            </div>
          </Link>
        )}

        <div className="post-card-content">
          <div className="post-meta">
            <span className="post-date">
              <Calendar size={14} />
              <span>{formatDate(post.created_at)}</span>
            </span>
          </div>
          <Link href={postUrl}>
            <h3 className="post-title">{post.title}</h3>
          </Link>
          <p className="post-excerpt">{post.excerpt}</p>
          <Link href={postUrl} className="read-more-link">
            <span>Đọc tiếp</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .post-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
          padding: 0 !important;
          overflow: hidden;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }

        .post-thumb-link {
          width: 100%;
          display: block;
          overflow: hidden;
        }

        .post-thumb-box {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background-color: #F8FAFC;
          position: relative;
          border-bottom: 1px solid #E2E8F0;
        }

        .post-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .post-card:hover .post-thumb-img {
          transform: scale(1.06);
        }

        .post-card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          width: 100%;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 12px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .post-date {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .post-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.4;
          margin-bottom: 12px;
          /* Line clamp 2 lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 50px;
        }

        .post-title:hover {
          color: var(--primary-dark);
        }

        .post-excerpt {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          /* Line clamp 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-top: auto;
          transition: gap 0.2s ease;
        }

        .read-more-link:hover {
          color: var(--primary);
          gap: 10px;
        }
      `}</style>
    </>
  );
}
