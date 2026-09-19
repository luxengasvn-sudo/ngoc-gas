'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';

// 5 Map Tile Layer Configurations
const MAP_LAYERS = [
  {
    id: 'osm',
    name: 'Đường Phố mới (OSM)',
    icon: '🗺️',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c']
  },
  {
    id: 'esri_sat',
    name: 'Vệ tinh (Esri Satellite)',
    icon: '🛰️',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; World Imagery',
    maxZoom: 18,
    subdomains: ['server', 'services']
  },
  {
    id: 'google',
    name: 'Google Maps (Chuẩn)',
    icon: '🗺️',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    id: 'topo',
    name: 'Độ Cao Địa hình (Topo)',
    icon: '⛰️',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data &copy; OpenTopoMap',
    maxZoom: 17,
    subdomains: ['a', 'b', 'c']
  },
  {
    id: 'esri_street',
    name: 'Đường Phố cũ (Esri)',
    icon: '🌲',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri World Street Map',
    maxZoom: 19,
    subdomains: ['server', 'services']
  }
];

export default function TraCuuInteractiveMap({
  units = [],
  selectedUnit = null,
  onSelectUnit = () => {},
  height = '480px'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const islandsLayerRef = useRef(null);
  const markersMapRef = useRef(new Map());

  const [activeLayerId, setActiveLayerId] = useState('osm');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    // Default center for Southeast region (TP.HCM / Binh Duong)
    const defaultLat = 10.8231;
    const defaultLng = 106.7729;

    const map = L.map(mapContainerRef.current, {
      center: [defaultLat, defaultLng],
      zoom: 10,
      zoomControl: false,
      scrollWheelZoom: true
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Initial tile layer
    const layerConfig = MAP_LAYERS.find(l => l.id === activeLayerId) || MAP_LAYERS[0];
    const tileLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    markersLayerRef.current = L.layerGroup().addTo(map);
    islandsLayerRef.current = L.featureGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted]);

  // Handle Layer Switching
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    const layerConfig = MAP_LAYERS.find(l => l.id === activeLayerId) || MAP_LAYERS[0];
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [activeLayerId]);

  // Render Markers for current units
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    markersLayerRef.current.clearLayers();
    markersMapRef.current.clear();

    const bounds = [];

    units.forEach(u => {
      const lat = u.lat || (u.ubnd && u.ubnd.lat) || 10.8231;
      const lng = u.lng || (u.ubnd && u.ubnd.lng) || 106.7729;

      bounds.push([lat, lng]);

      const isPhuong = u.type === 'Phường' || (u.name && u.name.startsWith('Phường'));
      const isXã = u.type === 'Xã' || (u.name && u.name.startsWith('Xã'));
      const bgColor = isPhuong ? '#ea580c' : (isXã ? '#16a34a' : '#2563eb');

      // HTML custom pin
      const iconHtml = `
        <div style="
          display: flex;
          align-items: center;
          gap: 4px;
          background: #ffffff;
          border: 2px solid ${bgColor};
          border-radius: 9999px;
          padding: 3px 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
          font-family: system-ui, sans-serif;
          white-space: nowrap;
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: transform 0.15s;
        " onmouseover="this.style.transform='translate(-50%, -50%) scale(1.1)'" onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: ${bgColor}; display: inline-block;"></span>
          <strong style="font-size: 11px; color: #0f172a;">${u.name}</strong>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'tt-map-tracuu-pin',
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const popupHtml = `
        <div style="padding: 6px; font-family: system-ui, sans-serif; max-width: 250px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <strong style="font-size: 13px; color: #0f172a;">${u.name}</strong>
            <span style="font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: ${bgColor}20; color: ${bgColor};">
              ${u.type || 'Xã/Phường'}
            </span>
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">
            ${u.district || ''} - Sáp nhập từ: <strong>${(u.oldUnits || []).slice(0, 2).join(', ')}</strong>
          </div>
          <div style="display: flex; gap: 8px; font-size: 11px; margin-bottom: 8px; background: #f8fafc; padding: 4px 6px; border-radius: 6px;">
            <span>📐 <strong>${u.areaKm2 || 12} km²</strong></span>
            <span>👥 <strong>${u.population ? u.population.toLocaleString('vi-VN') : '25.000'}</strong></span>
          </div>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 4px 6px; font-size: 11px; color: #1d4ed8; margin-bottom: 6px;">
            🏛️ <strong>${u.ubnd?.name || 'Trụ sở UBND ' + u.name}</strong>
          </div>
          <a href="/tinh-thanh/province/ho-chi-minh/${u.wardSlug || u.slug}" style="display: block; text-align: center; background: #2563eb; color: #ffffff; padding: 5px; border-radius: 6px; font-size: 11px; font-weight: 800; text-decoration: none;">
            Xem chi tiết địa giới ↗
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectUnit(u);
      });

      markersLayerRef.current.addLayer(marker);
      markersMapRef.current.set(u.id || u.wardSlug || u.slug, marker);
    });

    // Auto-fit bounds if we have units and no specific unit is selected
    if (bounds.length > 0 && !selectedUnit) {
      try {
        mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      } catch {}
    }
  }, [units]);

  // Fly to selected unit
  useEffect(() => {
    if (!selectedUnit || !mapInstanceRef.current) return;
    const lat = selectedUnit.lat || (selectedUnit.ubnd && selectedUnit.ubnd.lat) || 10.8231;
    const lng = selectedUnit.lng || (selectedUnit.ubnd && selectedUnit.ubnd.lng) || 106.7729;

    mapInstanceRef.current.flyTo([lat, lng], 14, {
      duration: 1.2
    });

    const marker = markersMapRef.current.get(selectedUnit.id || selectedUnit.wardSlug || selectedUnit.slug);
    if (marker) {
      setTimeout(() => {
        try {
          marker.openPopup();
        } catch {}
      }, 1250);
    }
  }, [selectedUnit]);

  // Permanent Sovereignty Islands Layer (Hoàng Sa & Trường Sa)
  useEffect(() => {
    if (!mapInstanceRef.current || !islandsLayerRef.current) return;
    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    const layer = islandsLayerRef.current;
    layer.clearLayers();

    // Biển Đông Label
    const seaIcon = L.divIcon({
      html: `<div class="tt-sea-label" style="font-size: 11px; letter-spacing: 3px;">BIỂN ĐÔNG (VIỆT NAM)</div>`,
      className: 'tt-sea-label-div',
      iconSize: [240, 24],
      iconAnchor: [120, 12]
    });
    L.marker([14.5, 113.8], { icon: seaIcon, interactive: false }).addTo(layer);

    // Hoàng Sa
    const hoangSaIcon = L.divIcon({
      html: `
        <div class="tt-island-marker" style="padding: 3px 8px; font-size: 11px;">
          <span class="tt-island-flag" style="width: 14px; height: 14px; font-size: 9px;">★</span>
          <span>Quần đảo Hoàng Sa</span>
        </div>
      `,
      className: 'tt-island-div-icon',
      iconSize: [160, 30],
      iconAnchor: [80, 15]
    });
    const hsMarker = L.marker([16.5388, 112.0000], { icon: hoangSaIcon, zIndexOffset: 2000 });
    hsMarker.bindPopup(`
      <div style="padding: 6px; font-family: system-ui, sans-serif; max-width: 250px;">
        <strong style="font-size: 13px; color: #dc2626;">🇻🇳 Quần đảo Hoàng Sa (Việt Nam)</strong>
        <div style="font-size: 11px; color: #64748b; margin: 4px 0 6px 0;">Trực thuộc: <strong>Thành phố Đà Nẵng</strong></div>
        <p style="font-size: 11px; color: #334155; margin: 0 0 6px 0; line-height: 1.4;">
          Quần đảo Hoàng Sa là phần lãnh thổ thiêng liêng không thể tách rời của Tổ quốc Việt Nam.
        </p>
        <a href="/tinh-thanh/province/da-nang" style="display: block; text-align: center; background: #dc2626; color: #ffffff; padding: 4px; border-radius: 4px; font-size: 11px; font-weight: 700; text-decoration: none;">
          Xem địa giới Đà Nẵng →
        </a>
      </div>
    `);
    hsMarker.addTo(layer);

    // Trường Sa
    const truongSaIcon = L.divIcon({
      html: `
        <div class="tt-island-marker" style="padding: 3px 8px; font-size: 11px;">
          <span class="tt-island-flag" style="width: 14px; height: 14px; font-size: 9px;">★</span>
          <span>Quần đảo Trường Sa</span>
        </div>
      `,
      className: 'tt-island-div-icon',
      iconSize: [160, 30],
      iconAnchor: [80, 15]
    });
    const tsMarker = L.marker([9.5000, 113.0000], { icon: truongSaIcon, zIndexOffset: 2000 });
    tsMarker.bindPopup(`
      <div style="padding: 6px; font-family: system-ui, sans-serif; max-width: 250px;">
        <strong style="font-size: 13px; color: #dc2626;">🇻🇳 Quần đảo Trường Sa (Việt Nam)</strong>
        <div style="font-size: 11px; color: #64748b; margin: 4px 0 6px 0;">Trực thuộc: <strong>Tỉnh Khánh Hòa</strong></div>
        <p style="font-size: 11px; color: #334155; margin: 0 0 6px 0; line-height: 1.4;">
          Quần đảo Trường Sa là phần lãnh thổ và hải phận thiêng liêng bất khả xâm phạm của Tổ quốc Việt Nam.
        </p>
        <a href="/tinh-thanh/province/khanh-hoa" style="display: block; text-align: center; background: #dc2626; color: #ffffff; padding: 4px; border-radius: 4px; font-size: 11px; font-weight: 700; text-decoration: none;">
          Xem địa giới Khánh Hòa →
        </a>
      </div>
    `);
    tsMarker.addTo(layer);
  }, [isMounted]);

  // Handle fit bounds reset
  const handleFitAll = () => {
    if (!mapInstanceRef.current || units.length === 0) return;
    const bounds = units.map(u => [
      u.lat || (u.ubnd && u.ubnd.lat) || 10.8231,
      u.lng || (u.ubnd && u.ubnd.lng) || 106.7729
    ]);
    try {
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    } catch {}
  };

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: '16px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      {/* Map Target Container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', backgroundColor: '#f1f5f9' }} />

      {/* Khẳng định Chủ Quyền Biển Đảo */}
      <div className="tt-sovereignty-badge" style={{ top: '12px', right: '160px' }}>
        <span>🇻🇳</span>
        <span>Hoàng Sa & Trường Sa là của Việt Nam</span>
      </div>

      {/* Layer Switcher Control (Top Right) */}
      <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 1000 }}>
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsLayerMenuOpen(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              fontSize: '12px',
              fontWeight: '800',
              color: '#0f172a',
              cursor: 'pointer'
            }}
          >
            <span>{MAP_LAYERS.find(l => l.id === activeLayerId)?.icon}</span>
            <span>{MAP_LAYERS.find(l => l.id === activeLayerId)?.name.split(' ')[0]}</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>▾</span>
          </button>

          {isLayerMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                width: '210px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '6px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', padding: '6px 8px', textTransform: 'uppercase' }}>
                Chọn Lớp Bản Đồ
              </div>
              {MAP_LAYERS.map(layer => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    setActiveLayerId(layer.id);
                    setIsLayerMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: activeLayerId === layer.id ? '800' : '600',
                    backgroundColor: activeLayerId === layer.id ? '#fff7ed' : 'transparent',
                    color: activeLayerId === layer.id ? '#ea580c' : '#334155'
                  }}
                >
                  <span>{layer.icon}</span>
                  <span>{layer.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Map Toolbar (Bottom Left) */}
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 1000, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleFitAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            border: 'none',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}
        >
          <span>🔍</span>
          <span>Bao quát ({units.length} điểm)</span>
        </button>

        <div style={{
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(4px)',
          border: '1px solid #cbd5e1',
          fontSize: '11px',
          fontWeight: '700',
          color: '#2563eb',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
        }}>
          🏛️ Dữ liệu hành chính 2026
        </div>
      </div>
    </div>
  );
}
