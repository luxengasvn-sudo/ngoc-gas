'use client';

import { Phone } from 'lucide-react';
import { trackClick } from '@/lib/analytics';

export default function ProductOrderButton({ productName, hotline }) {
  const cleanPhone = hotline.replace(/\./g, '').trim();
  
  return (
    <a 
      href={`tel:${cleanPhone}`} 
      className="btn btn-primary btn-booking"
      onClick={() => trackClick('product_hotline_click', `${productName} - ${hotline}`)}
    >
      <Phone size={18} />
      <span>Gọi đặt gas ngay: {hotline}</span>
    </a>
  );
}
