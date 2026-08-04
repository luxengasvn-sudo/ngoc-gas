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

  const postUrl = `/tin-tuc/${post.slug}`;

  return (
    <>
      <div className="post-card card">
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

      <style jsx global>{`
        .post-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
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
        }

        .read-more-link:hover {
          color: var(--primary);
          gap: 10px;
        }
      `}</style>
    </>
  );
}
