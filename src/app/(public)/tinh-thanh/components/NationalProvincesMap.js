'use client';

import { useEffect, useRef, useState } from 'react';

// 34 Provinces coordinate map and metadata for Vietnam 2026
const PROVINCE_COORDINATES = {
  'ha-noi': { lat: 21.0285, lng: 105.8542 },
  'hai-phong': { lat: 20.8449, lng: 106.6881 },
  'quang-ninh': { lat: 20.9505, lng: 107.0734 },
  'bac-ninh': { lat: 21.2300, lng: 106.1500 },
  'hung-yen': { lat: 20.6464, lng: 106.0511 },
  'ninh-binh': { lat: 20.2506, lng: 105.9745 },
  'cao-bang': { lat: 22.6666, lng: 106.2639 },
  'dien-bien': { lat: 21.3853, lng: 103.0168 },
  'lai-chau': { lat: 22.3963, lng: 103.4684 },
  'lang-son': { lat: 21.8537, lng: 106.7621 },
  'lao-cai': { lat: 22.4856, lng: 103.9707 },
  'phu-tho': { lat: 21.3228, lng: 105.4019 },
  'son-la': { lat: 21.3283, lng: 103.9148 },
  'thai-nguyen': { lat: 21.5942, lng: 105.8482 },
  'tuyen-quang': { lat: 21.8234, lng: 105.2144 },
  'hue': { lat: 16.4637, lng: 107.5909 },
  'ha-tinh': { lat: 18.3435, lng: 105.9058 },
  'nghe-an': { lat: 18.6734, lng: 105.6813 },
  'quang-tri': { lat: 17.4690, lng: 106.6225 },
  'thanh-hoa': { lat: 19.8067, lng: 105.7852 },
  'da-nang': { lat: 16.0544, lng: 108.2022 },
  'khanh-hoa': { lat: 12.2388, lng: 109.1967 },
  'quang-ngai': { lat: 15.1213, lng: 108.7923 },
  'dak-lak': { lat: 12.6662, lng: 108.0383 },
  'gia-lai': { lat: 13.9833, lng: 108.0000 },
  'lam-dong': { lat: 11.9404, lng: 108.4583 },
  'ho-chi-minh': { lat: 10.7769, lng: 106.7009 },
  'dong-nai': { lat: 10.9575, lng: 106.8427 },
  'tay-ninh': { lat: 10.9500, lng: 106.2500 },
  'can-tho': { lat: 10.0452, lng: 105.7469 },
  'an-giang': { lat: 10.0125, lng: 105.0809 },
  'ca-mau': { lat: 9.1769, lng: 105.1524 },
  'dong-thap': { lat: 10.3538, lng: 106.3639 },
  'vinh-long': { lat: 10.2537, lng: 105.9722 }
};

// Region color scheme
const REGION_COLORS = {
  'dong-bang-song-hong': '#ea580c',
  'trung-du-mien-nui-phia-bac': '#0d9488',
  'bac-trung-bo': '#0284c7',
  'duyen-hai-nam-trung-bo': '#d97706',
  'tay-nguyen': '#16a34a',
  'dong-nam-bo': '#9333ea',
  'dong-bang-song-cuu-long': '#2563eb'
};

// Quần đảo Hoàng Sa & Trường Sa - Chủ quyền lãnh thổ thiêng liêng của Việt Nam
const SPECIAL_ISLAND_TERRITORIES = [
  {
    id: 'hoang-sa',
    name: 'Quần đảo Hoàng Sa',
    sovereigntyTitle: 'Quần đảo Hoàng Sa (Việt Nam)',
    adminUnit: 'Huyện đảo Hoàng Sa, TP. Đà Nẵng',
    provinceSlug: 'da-nang',
    coords: { lat: 16.5388, lng: 112.0000 },
    subIslands: [
      { name: 'Đảo Hoàng Sa', lat: 16.5342, lng: 111.6033 },
      { name: 'Đảo Phú Lâm', lat: 16.8344, lng: 112.3364 },
      { name: 'Đảo Tri Tôn', lat: 15.7892, lng: 111.2042 },
      { name: 'Đảo Cây', lat: 16.9833, lng: 112.2667 },
      { name: 'Đảo Linh Côn', lat: 16.6667, lng: 112.7333 }
    ],
    description: 'Quần đảo Hoàng Sa là một phần lãnh thổ thiêng liêng không thể tách rời của Tổ quốc Việt Nam, trực thuộc sự quản lý hành chính của Ủy ban Nhân dân Huyện đảo Hoàng Sa, Thành phố Đà Nẵng.',
    legalBasis: 'Khẳng định chủ quyền toàn vẹn lãnh thổ bất khả xâm phạm của Nước CHXHCN Việt Nam'
  },
  {
    id: 'truong-sa',
    name: 'Quần đảo Trường Sa',
    sovereigntyTitle: 'Quần đảo Trường Sa (Việt Nam)',
    adminUnit: 'Huyện đảo Trường Sa, Tỉnh Khánh Hòa',
    provinceSlug: 'khanh-hoa',
    coords: { lat: 9.5000, lng: 113.0000 },
    subIslands: [
      { name: 'Đảo Trường Sa Lớn (Thị trấn Trường Sa)', lat: 8.6444, lng: 111.9194 },
      { name: 'Đảo Song Tử Tây', lat: 11.4292, lng: 114.3308 },
      { name: 'Đảo Sinh Tồn', lat: 9.8833, lng: 114.3167 },
      { name: 'Đảo Nam Yết', lat: 10.1806, lng: 114.3647 },
      { name: 'Đảo Sơn Ca', lat: 10.3783, lng: 114.4750 },
      { name: 'Đảo Phan Vinh', lat: 8.9667, lng: 113.6833 },
      { name: 'Đảo An Bang', lat: 7.8833, lng: 112.9167 },
      { name: 'Đảo Thuyền Chài', lat: 8.1667, lng: 112.3500 }
    ],
    description: 'Quần đảo Trường Sa là phần lãnh thổ và hải phận thiêng liêng bất khả xâm phạm của Tổ quốc Việt Nam, trực thuộc sự quản lý hành chính của Ủy ban Nhân dân Huyện đảo Trường Sa, Tỉnh Khánh Hòa.',
    legalBasis: 'Khẳng định chủ quyền toàn vẹn lãnh thổ bất khả xâm phạm của Nước CHXHCN Việt Nam'
  }
];

const SEA_LABELS = [
  {
    text: 'BIỂN ĐÔNG (VIỆT NAM)',
    coords: { lat: 14.5, lng: 113.8 }
  }
];

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

export default function NationalProvincesMap({
  provinces = [],
  selectedRegion = 'all',
  activeProvinceSlug = null,
  onSelectProvince = () => {}
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersGroupRef = useRef(null);
  const islandsGroupRef = useRef(null);
  const markersBySlugRef = useRef({});

  const [activeLayer, setActiveLayer] = useState('osm');
  const [showLayerSelector, setShowLayerSelector] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    // Default Vietnam bounds covering mainland and both Hoang Sa & Truong Sa archipelagoes
    const defaultCenter = [15.2, 110.0];
    const defaultZoom = 6;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        minZoom: 5,
        maxZoom: 18,
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
      islandsGroupRef.current = L.featureGroup().addTo(map);
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
  }, [isMounted]);

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

  // Populate 34 Province Markers
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
    markersBySlugRef.current = {};

    provinces.forEach(p => {
      const coords = PROVINCE_COORDINATES[p.slug];
      if (!coords) return;

      const regionColor = REGION_COLORS[p.regionSlug] || '#0284c7';
      const isSelected = activeProvinceSlug === p.slug;

      const markerHtml = `
        <div class="tt-national-marker ${isSelected ? 'active' : ''}" style="--marker-color: ${regionColor}">
          <div class="tt-national-marker-dot"></div>
          <div class="tt-national-marker-badge">${p.name.replace('Thành phố ', 'TP. ').replace('Tỉnh ', '')}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'tt-national-div-icon',
        iconSize: [120, 36],
        iconAnchor: [60, 18]
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon });

      // Rich popup
      const popupContent = `
        <div style="font-family: inherit; width: 260px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 800; color: ${regionColor}; text-transform: uppercase; letter-spacing: 0.5px;">
              ${p.region}
            </span>
            <span style="font-size: 10px; font-weight: 700; background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #475569;">
              ${p.licensePlates.join(', ')}
            </span>
          </div>
          <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 900; color: #0f172a;">
            ${p.name}
          </h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 10px 0; line-height: 1.4;">
            ${p.description ? p.description.slice(0, 95) + '...' : ''}
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 8px; background-color: #f8fafc; border-radius: 8px; font-size: 11px; margin-bottom: 10px;">
            <div>
              <span style="color: #94a3b8; display: block; font-size: 10px;">Diện tích:</span>
              <strong style="color: #0f172a;">${p.areaKm2 ? p.areaKm2.toLocaleString('vi-VN') : '-'} km²</strong>
            </div>
            <div>
              <span style="color: #94a3b8; display: block; font-size: 10px;">Dân số:</span>
              <strong style="color: #ea580c;">${p.population ? (p.population / 1000000).toFixed(1) : '-'} tr người</strong>
            </div>
            <div>
              <span style="color: #94a3b8; display: block; font-size: 10px;">Xã/phường:</span>
              <strong style="color: #16a34a;">${p.totalUnits} đơn vị</strong>
            </div>
            <div>
              <span style="color: #94a3b8; display: block; font-size: 10px;">Trung tâm:</span>
              <strong style="color: #0f172a;">${p.center || '-'}</strong>
            </div>
          </div>
          <div style="display: flex; gap: 6px;">
            <a
              href="/tinh-thanh/province/${p.slug}"
              style="flex: 1; text-align: center; padding: 8px 10px; background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff; border-radius: 6px; font-size: 11px; font-weight: 800; text-decoration: none; box-shadow: 0 2px 6px rgba(2,132,199,0.3);"
            >
              Khám Phá Tỉnh Thành →
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280, minWidth: 250, offset: [0, -10] });

      marker.on('click', () => {
        onSelectProvince(p.slug);
      });

      marker.on('mouseover', () => {
        setHoveredProvince(p);
      });

      marker.on('mouseout', () => {
        setHoveredProvince(null);
      });

      marker.addTo(markersGroup);
      markersBySlugRef.current[p.slug] = marker;
    });
  }, [provinces, activeProvinceSlug, onSelectProvince]);

  // Populate Island Sovereignty Markers & Sea Labels (Hoàng Sa & Trường Sa)
  useEffect(() => {
    if (!mapInstanceRef.current || !islandsGroupRef.current) return;
    let L;
    try {
      L = require('leaflet');
    } catch {
      return;
    }

    const islandsGroup = islandsGroupRef.current;
    islandsGroup.clearLayers();

    // 1. Nhãn Địa Danh BIỂN ĐÔNG (VIỆT NAM)
    SEA_LABELS.forEach(sea => {
      const seaIcon = L.divIcon({
        html: `<div class="tt-sea-label">${sea.text}</div>`,
        className: 'tt-sea-label-div',
        iconSize: [260, 30],
        iconAnchor: [130, 15]
      });
      L.marker([sea.coords.lat, sea.coords.lng], { icon: seaIcon, interactive: false }).addTo(islandsGroup);
    });

    // 2. Markers Quần đảo Hoàng Sa & Quần đảo Trường Sa
    SPECIAL_ISLAND_TERRITORIES.forEach(island => {
      const islandIcon = L.divIcon({
        html: `
          <div class="tt-island-marker">
            <span class="tt-island-flag">★</span>
            <span>${island.name}</span>
            <span class="tt-island-pulse"></span>
          </div>
        `,
        className: 'tt-island-div-icon',
        iconSize: [180, 36],
        iconAnchor: [90, 18]
      });

      const islandMarker = L.marker([island.coords.lat, island.coords.lng], {
        icon: islandIcon,
        zIndexOffset: 2000
      });

      const popupContent = `
        <div style="font-family: inherit; width: 280px; padding: 4px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 2px solid #dc2626;">
            <span style="font-size: 18px;">🇻🇳</span>
            <div>
              <div style="font-size: 10px; font-weight: 800; color: #dc2626; text-transform: uppercase; letter-spacing: 0.5px;">
                Chủ Quyền Lãnh Thổ Việt Nam
              </div>
              <h4 style="margin: 2px 0 0 0; font-size: 15px; font-weight: 900; color: #0f172a;">
                ${island.sovereigntyTitle}
              </h4>
            </div>
          </div>
          <div style="background-color: #fef2f2; border-left: 3px solid #dc2626; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #991b1b; font-weight: 700; margin-bottom: 8px;">
            🏛️ ${island.adminUnit}
          </div>
          <p style="font-size: 11px; color: #334155; margin: 0 0 10px 0; line-height: 1.5;">
            ${island.description}
          </p>
          <div style="font-size: 10px; color: #64748b; margin-bottom: 10px; padding: 6px; background: #f8fafc; border-radius: 6px; line-height: 1.4;">
            <strong style="color: #0f172a;">Các điểm đảo tiêu biểu:</strong><br/>
            ${island.subIslands.map(s => s.name).join(' • ')}
          </div>
          <div style="display: flex; gap: 6px;">
            <a
              href="/tinh-thanh/province/${island.provinceSlug}"
              style="flex: 1; text-align: center; padding: 8px 10px; background: linear-gradient(135deg, #dc2626, #b91c1c); color: #ffffff; border-radius: 6px; font-size: 11px; font-weight: 800; text-decoration: none; box-shadow: 0 2px 6px rgba(220,38,38,0.3);"
            >
              Xem Chi Tiết Địa Giới ${island.provinceSlug === 'da-nang' ? 'Đà Nẵng' : 'Khánh Hòa'} →
            </a>
          </div>
        </div>
      `;

      islandMarker.bindPopup(popupContent, { maxWidth: 300, minWidth: 270, offset: [0, -12] });
      islandMarker.addTo(islandsGroup);

      // Sub islands small point markers
      island.subIslands.forEach(sub => {
        const subDot = L.circleMarker([sub.lat, sub.lng], {
          radius: 4,
          fillColor: '#dc2626',
          color: '#fef08a',
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.95
        });
        subDot.bindTooltip(`🇻🇳 ${sub.name}`, {
          permanent: false,
          direction: 'top',
          className: 'tt-subisland-tooltip'
        });
        subDot.addTo(islandsGroup);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted]);

  // Handle Region Change: Fit bounds to provinces of that region
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (selectedRegion === 'all') {
      map.flyTo([15.2, 110.0], 6, { duration: 1.2 });
      return;
    }

    const regionProvinces = provinces.filter(p => p.regionSlug === selectedRegion);
    const validCoords = regionProvinces
      .map(p => PROVINCE_COORDINATES[p.slug])
      .filter(Boolean)
      .map(c => [c.lat, c.lng]);

    if (validCoords.length > 0) {
      let L;
      try {
        L = require('leaflet');
      } catch {
        return;
      }
      const bounds = L.latLngBounds(validCoords);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 9, duration: 1.2 });
    }
  }, [selectedRegion, provinces]);

  // Handle Active Province Selection from outside: FlyTo and open popup
  useEffect(() => {
    if (!mapInstanceRef.current || !activeProvinceSlug) return;
    const coords = PROVINCE_COORDINATES[activeProvinceSlug];
    const marker = markersBySlugRef.current[activeProvinceSlug];

    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 9, {
        duration: 1.2
      });

      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 1200);
      }
    }
  }, [activeProvinceSlug]);

  const handleResetVietnamView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([15.2, 110.0], 6, { duration: 1.2 });
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
    <div className={`tt-national-map-card ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Map Control Bar Top */}
      <div className="tt-national-map-header">
        <div className="tt-national-map-title-wrap">
          <div className="tt-national-pulse-icon"></div>
          <div>
            <h3 className="tt-national-map-title">
              Bản Đồ Số 34 Tỉnh Thành Việt Nam 2026
            </h3>
            <span className="tt-national-map-sub">
              {hoveredProvince
                ? `Đang xem: ${hoveredProvince.name} • ${hoveredProvince.totalUnits} xã/phường • ${hoveredProvince.region}`
                : `Phân bố địa giới 34 tỉnh thành theo 6 vùng kinh tế trọng điểm`}
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

          {/* Reset Zoom Full Vietnam */}
          <button
            onClick={handleResetVietnamView}
            className="tt-map-ctrl-btn"
            title="Xem toàn cảnh Việt Nam"
          >
            <span>🇻🇳 Toàn cảnh</span>
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

      {/* Leaflet Map Canvas */}
      <div className="tt-national-map-canvas-wrap">
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: '100%', minHeight: isFullscreen ? '100vh' : '520px', zIndex: 1 }}
        />

        {/* Khẳng định Chủ Quyền Biển Đảo Việt Nam Badge */}
        <div className="tt-sovereignty-badge">
          <span style={{ fontSize: '14px' }}>🇻🇳</span>
          <span>Hoàng Sa & Trường Sa là của Việt Nam</span>
        </div>

        {/* Legend Overlay at bottom-left */}
        <div className="tt-national-legend-overlay">
          <div className="tt-national-legend-title">6 VÙNG KINH TẾ</div>
          <div className="tt-national-legend-items">
            {Object.entries(REGION_COLORS).map(([key, color]) => {
              const labels = {
                'dong-bang-song-hong': 'ĐB Sông Hồng',
                'trung-du-mien-nui-phia-bac': 'Trung Du & Miền Núi Phía Bắc',
                'bac-trung-bo': 'Bắc Trung Bộ',
                'duyen-hai-nam-trung-bo': 'Duyên Hải Nam Trung Bộ',
                'tay-nguyen': 'Tây Nguyên',
                'dong-nam-bo': 'Đông Nam Bộ',
                'dong-bang-song-cuu-long': 'ĐB Sông Cửu Long'
              };
              return (
                <div key={key} className="tt-legend-row">
                  <span className="tt-legend-dot" style={{ backgroundColor: color }}></span>
                  <span className="tt-legend-text">{labels[key]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Overlay */}
        <div className="tt-national-brand-overlay">
          <span>🗺️ Cổng Bản Đồ Địa Giới 34 Tỉnh Thành Mới (2026)</span>
        </div>
      </div>
    </div>
  );
}
