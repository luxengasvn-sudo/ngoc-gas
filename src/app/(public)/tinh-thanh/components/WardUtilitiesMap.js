'use client';

import { useEffect, useRef, useState } from 'react';

// 5 Tile Providers for Ward Utilities Map
const TILE_PROVIDERS = {
  osm: {
    name: 'Đường Phố (OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  satellite: {
    name: 'Vệ Tinh (Esri)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery'
  },
  google: {
    name: 'Google Maps',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps'
  },
  topo: {
    name: 'Địa Hình (Topo)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap'
  },
  esriStreet: {
    name: 'Đường Phố Cũ (Esri)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri Street'
  }
};

const CATEGORY_STYLES = {
  ubnd: { color: '#d97706', bg: '#fef3c7', icon: '🏛️' },
  police: { color: '#2563eb', bg: '#dbeafe', icon: '👮' },
  hospital: { color: '#9333ea', bg: '#f3e8ff', icon: '🏥' },
  school: { color: '#059669', bg: '#d1fae5', icon: '🏫' },
  post: { color: '#4f46e5', bg: '#e0e7ff', icon: '📮' },
  gas: { color: '#ea580c', bg: '#ffedd5', icon: '🔥' },
  default: { color: '#0284c7', bg: '#e0f2fe', icon: '📍' }
};

export default function WardUtilitiesMap({
  unit = {},
  pois = [],
  selectedPOI = null,
  onSelectPOI = () => {},
  height = '540px'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersGroupRef = useRef(null);
  const markersByKeyRef = useRef({});

  const [activeLayer, setActiveLayer] = useState('osm');
  const [showLayerSelector, setShowLayerSelector] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const centerLat = unit.lat || 10.9034;
  const centerLng = unit.lng || 106.759;

  // Initialize Map
  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 14,
        minZoom: 10,
        maxZoom: 19,
        scrollWheelZoom: true,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Base tile layer
      tileLayerRef.current = L.tileLayer(TILE_PROVIDERS.osm.url, {
        attribution: TILE_PROVIDERS.osm.attribution,
        maxZoom: 19
      }).addTo(map);

      markersGroupRef.current = L.featureGroup().addTo(map);
      mapInstanceRef.current = map;

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted, centerLat, centerLng]);

  // Switch Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    const provider = TILE_PROVIDERS[activeLayer] || TILE_PROVIDERS.osm;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    tileLayerRef.current = L.tileLayer(provider.url, {
      attribution: provider.attribution,
      maxZoom: 19
    }).addTo(mapInstanceRef.current);
  }, [activeLayer]);

  // Populate POI Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;
    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    markersGroup.clearLayers();
    markersByKeyRef.current = {};

    // Center marker for ward
    const centerHtml = `
      <div class="tt-national-marker" style="--marker-color: #0284c7">
        <div class="tt-national-marker-dot"></div>
        <div class="tt-national-marker-badge">📍 Tâm ${unit.name || 'địa bàn'}</div>
      </div>
    `;
    const centerIcon = L.divIcon({
      html: centerHtml,
      className: 'tt-national-div-icon',
      iconSize: [120, 36],
      iconAnchor: [60, 18]
    });
    const centerMarker = L.marker([centerLat, centerLng], { icon: centerIcon });
    centerMarker.bindPopup(`
      <div style="font-family: inherit; width: 220px; padding: 2px;">
        <strong style="color: #0284c7; font-size: 13px;">Tâm Hành Chính: ${unit.name}</strong>
        <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0;">${unit.district} • ${unit.province || 'TP. Hồ Chí Minh'}</p>
      </div>
    `);
    centerMarker.addTo(markersGroup);

    // Render POI markers
    pois.forEach((poi, idx) => {
      const lat = poi.lat || (centerLat + 0.001 * (idx + 1));
      const lng = poi.lng || (centerLng + 0.0015 * (idx + 1));
      const style = CATEGORY_STYLES[poi.category] || CATEGORY_STYLES.default;
      const isSelected = selectedPOI && selectedPOI.name === poi.name;

      const markerHtml = `
        <div class="tt-tc-marker ${isSelected ? 'active' : ''}" style="--pin-color: ${style.color}">
          <div class="tt-tc-marker-pin">${poi.icon || style.icon}</div>
          <div class="tt-tc-marker-label">${poi.name}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'tt-tc-div-icon',
        iconSize: [130, 40],
        iconAnchor: [65, 20]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

      const popupContent = `
        <div style="font-family: inherit; width: 260px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 800; color: ${style.color}; text-transform: uppercase;">
              ${poi.categoryName || 'Cơ sở tiện ích'}
            </span>
            <span style="font-size: 14px;">${poi.icon || style.icon}</span>
          </div>
          <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 800; color: #0f172a;">
            ${poi.name}
          </h4>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px; line-height: 1.4;">
            <div>📍 <strong>Địa chỉ:</strong> ${poi.address || 'Đang cập nhật'}</div>
            ${poi.phone ? `<div>📞 <strong>Số điện thoại:</strong> ${poi.phone}</div>` : ''}
            ${poi.workingHours ? `<div>⏰ <strong>Giờ làm việc:</strong> ${poi.workingHours}</div>` : ''}
          </div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            <a
              href="${googleDirectionsUrl}"
              target="_blank"
              rel="noopener noreferrer"
              style="flex: 1; text-align: center; padding: 6px 10px; background: #ea580c; color: #ffffff; border-radius: 6px; font-size: 11px; font-weight: 800; text-decoration: none;"
            >
              Chỉ đường Google Maps ↗
            </a>
          </div>
          <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #e2e8f0; font-size: 10px; color: #2563eb; font-weight: 700; display: flex; justify-content: space-between;">
            <span>🏛️ Dữ liệu tiện ích số 2026</span>
            <span>NgocGas.com</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280, minWidth: 240, offset: [0, -10] });

      marker.on('click', () => {
        onSelectPOI(poi);
      });

      marker.addTo(markersGroup);
      markersByKeyRef.current[poi.name] = marker;
    });

    // Fit bounds if POIs exist
    if (pois.length > 0) {
      const coords = pois.map((p, idx) => [
        p.lat || (centerLat + 0.001 * (idx + 1)),
        p.lng || (centerLng + 0.0015 * (idx + 1))
      ]);
      coords.push([centerLat, centerLng]);
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [pois, unit, centerLat, centerLng, selectedPOI, onSelectPOI]);

  // Handle selectedPOI changes from outside: flyTo and open popup
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedPOI) return;
    const marker = markersByKeyRef.current[selectedPOI.name];
    const lat = selectedPOI.lat || centerLat;
    const lng = selectedPOI.lng || centerLng;

    mapInstanceRef.current.flyTo([lat, lng], 16, { duration: 1.2 });

    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 1200);
    }
  }, [selectedPOI, centerLat, centerLng]);

  const handleResetCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([centerLat, centerLng], 14, { duration: 1.0 });
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
  };

  return (
    <div className={`tt-national-map-card ${isFullscreen ? 'fullscreen' : ''}`} style={{ marginBottom: '20px' }}>
      {/* Map Control Bar Top */}
      <div className="tt-national-map-header">
        <div className="tt-national-map-title-wrap">
          <div className="tt-national-pulse-icon"></div>
          <div>
            <h3 className="tt-national-map-title">
              Bản Đồ Số Tiện Ích {unit.name || ''} (Leaflet 5 Lớp)
            </h3>
            <span className="tt-national-map-sub">
              {selectedPOI
                ? `Đang chọn: ${selectedPOI.name} • ${selectedPOI.categoryName}`
                : `Hiển thị ${pois.length} cơ sở tiện ích dân sinh • Tọa độ tâm: ${centerLat}°B, ${centerLng}°Đ`}
            </span>
          </div>
        </div>

        {/* Buttons Controls */}
        <div className="tt-national-controls">
          {/* Layer Selector */}
          <div className="tt-layer-picker-wrapper">
            <button
              onClick={() => setShowLayerSelector(!showLayerSelector)}
              className="tt-map-ctrl-btn"
              title="Chọn lớp bản đồ"
            >
              <span>🗺️ Lớp bản đồ ▾</span>
            </button>
            {showLayerSelector && (
              <div className="tt-layer-dropdown">
                {Object.entries(TILE_PROVIDERS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveLayer(key);
                      setShowLayerSelector(false);
                    }}
                    className={`tt-layer-item ${activeLayer === key ? 'active' : ''}`}
                  >
                    <span>{item.name}</span>
                    {activeLayer === key && <span style={{ color: '#16a34a' }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Center */}
          <button
            onClick={handleResetCenter}
            className="tt-map-ctrl-btn"
            title="Quay lại tâm địa bàn"
          >
            <span>🎯 Về tâm xã/phường</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="tt-map-ctrl-btn"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          >
            <span>{isFullscreen ? '✕ Thu nhỏ' : '⛶ Mở rộng'}</span>
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="tt-national-map-canvas-wrap" style={{ height: isFullscreen ? 'calc(100vh - 65px)' : height }}>
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        />

        {/* Brand Overlay */}
        <div className="tt-national-brand-overlay">
          <span>🗺️ Bản Đồ Tiện Ích Hành Chính & Dân Sinh</span>
        </div>
      </div>
    </div>
  );
}
