'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// 5 Map Tile Layer Configurations
const MAP_LAYERS = [
  {
    id: 'osm',
    name: 'Đường Phố mới (OSM)',
    icon: '🗺️',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c']
  },
  {
    id: 'esri_sat',
    name: 'Vệ tinh (Esri Satellite)',
    icon: '🛰️',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
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
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17,
    subdomains: ['a', 'b', 'c']
  },
  {
    id: 'esri_street',
    name: 'Đường Phố cũ (Esri)',
    icon: '🌲',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China',
    maxZoom: 19,
    subdomains: ['server', 'services']
  }
];

// Helper to generate natural boundary polygon if Nominatim boundary is not available
function generateBoundaryPolygon(centerLat, centerLng, areaKm2, nameSeed) {
  const effectiveArea = areaKm2 > 0 ? areaKm2 : 15;
  const radiusKm = Math.sqrt(effectiveArea / Math.PI);
  const radiusDeg = radiusKm / 111;

  let hash = 0;
  for (let i = 0; i < nameSeed.length; i++) {
    hash = (hash << 5) - hash + nameSeed.charCodeAt(i);
    hash |= 0;
  }

  const numPoints = 24;
  const coordinates = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const seedVal = Math.abs(Math.sin((i + 1) * 2.3 + hash));
    const noise = 1 + 0.2 * Math.sin(angle * 3 + hash) + 0.1 * Math.cos(angle * 2);
    const r = radiusDeg * noise * (0.88 + 0.24 * seedVal);

    const lat = centerLat + r * Math.cos(angle);
    const lng = centerLng + (r * Math.sin(angle)) / Math.cos((centerLat * Math.PI) / 180);
    coordinates.push([lng, lat]);
  }

  coordinates.push(coordinates[0]);

  return {
    type: 'Feature',
    properties: { name: nameSeed },
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates]
    }
  };
}

// Global cache for geojson boundary responses
const geojsonBoundaryCache = new Map();

export default function InteractiveWardMap({ unit, province, isProvince = false, onCenterChange }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const boundaryLayerRef = useRef(null);
  const centerMarkerRef = useRef(null);
  const onCenterChangeRef = useRef(onCenterChange);

  useEffect(() => {
    onCenterChangeRef.current = onCenterChange;
  }, [onCenterChange]);

  const [activeLayerId, setActiveLayerId] = useState('osm');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(true);

  const initialLat = Number(unit?.lat) || (isProvince ? 10.7769 : 10.9034);
  const initialLng = Number(unit?.lng) || (isProvince ? 106.7009 : 106.759);
  const unitKey = `${unit?.slug || unit?.wardSlug || unit?.name || ''}_${province?.slug || province?.name || ''}`;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    let isCancelled = false;

    import('leaflet').then((L) => {
      if (isCancelled || !mapContainerRef.current) return;

      // Fix default marker icon paths in Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
      });

      // 1. Initialize Map instance
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: isProvince ? 11 : 13,
        zoomControl: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      // Add Zoom Control at top-left
      L.control.zoom({ position: 'topleft' }).addTo(map);

      // Add attribution control at bottom-right
      L.control.attribution({ position: 'bottomright', prefix: '<a href="https://leafletjs.com" target="_blank">Leaflet</a>' }).addTo(map);

      // 2. Add Active Tile Layer
      const layerConfig = MAP_LAYERS.find(l => l.id === activeLayerId) || MAP_LAYERS[0];
      const tileLayer = L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution,
        maxZoom: layerConfig.maxZoom,
        subdomains: layerConfig.subdomains
      }).addTo(map);
      tileLayerRef.current = tileLayer;

      // 3. Initial Boundary Polygon
      const initialBoundaryGeoJson = generateBoundaryPolygon(
        initialLat,
        initialLng,
        unit.areaKm2 || 20,
        unit.name || 'Địa giới'
      );

      const boundaryLayer = L.geoJSON(initialBoundaryGeoJson, {
        style: {
          color: '#ef4444',
          weight: 2.5,
          opacity: 0.95,
          fillColor: '#ef4444',
          fillOpacity: 0.15,
          dashArray: '4, 4'
        }
      }).addTo(map);
      boundaryLayerRef.current = boundaryLayer;

      try {
        map.fitBounds(boundaryLayer.getBounds(), { padding: [35, 35], maxZoom: isProvince ? 10 : 15 });
      } catch (e) {
        map.setView([initialLat, initialLng], isProvince ? 10 : 13);
      }

      // 4. Center Main Marker (Blue Pin)
      const centerIcon = L.divIcon({
        className: 'tt-map-center-pin',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
            <div style="background: #2563eb; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 12px rgba(37,99,235,0.4); white-space: nowrap; border: 2px solid #ffffff;">
              📍 ${unit.name}
            </div>
            <div style="width: 14px; height: 14px; background: #2563eb; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); margin-top: 2px;"></div>
          </div>
        `,
        iconSize: [0, 0]
      });

      const centerMarker = L.marker([initialLat, initialLng], { icon: centerIcon }).addTo(map);
      centerMarkerRef.current = centerMarker;

      centerMarker.bindPopup(`
        <div style="font-family: inherit; padding: 4px;">
          <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 14px; font-weight: 800;">📍 ${unit.name}</h4>
          <div style="font-size: 12px; color: #475569; line-height: 1.5;">
            <div>📐 Diện tích: <strong>${typeof unit.areaKm2 === 'number' ? unit.areaKm2.toLocaleString('vi-VN') : unit.areaKm2} km²</strong></div>
            <div>👥 Dân số: <strong>${unit.population ? unit.population.toLocaleString('vi-VN') : 'Đang cập nhật'} người</strong></div>
            <div>🏛️ Trực thuộc: <strong>${province?.name || ''}</strong></div>
          </div>
        </div>
      `);

      // 5. POI Markers (UBND, Police)
      if (unit.ubnd && unit.ubnd.lat && unit.ubnd.lng) {
        const ubndIcon = L.divIcon({
          className: 'tt-poi-marker',
          html: `<div style="background: #c2410c; color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">🏛️</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });
        L.marker([unit.ubnd.lat, unit.ubnd.lng], { icon: ubndIcon })
          .addTo(map)
          .bindPopup(`<strong>${unit.ubnd.name}</strong><br/><span style="font-size: 11px; color: #64748b;">${unit.ubnd.address}</span>`);
      }

      // 6. FETCH OFFICIAL OSM BOUNDARY & SNAP PIN TO EXACT POLYGON CENTROID
      const cacheKey = `${unit.name}_${province?.name || ''}_${isProvince ? 'prov' : 'ward'}`;
      
      const applyGeoJson = (geojson) => {
        if (isCancelled || !mapInstanceRef.current) return;
        
        if (boundaryLayerRef.current) {
          mapInstanceRef.current.removeLayer(boundaryLayerRef.current);
        }

        const osmLayer = L.geoJSON(geojson, {
          style: {
            color: '#ef4444',
            weight: isProvince ? 3 : 2.5,
            opacity: 0.95,
            fillColor: '#ef4444',
            fillOpacity: isProvince ? 0.08 : 0.15
          }
        }).addTo(mapInstanceRef.current);
        boundaryLayerRef.current = osmLayer;

        // Calculate the centroid of the red boundary polygon
        const polyBounds = osmLayer.getBounds();
        const polyCenter = polyBounds.getCenter();

        // SNAP BLUE PIN DEAD-CENTER INTO THE POLYGON
        if (centerMarkerRef.current) {
          centerMarkerRef.current.setLatLng(polyCenter);
        }


        // Fit map viewport smoothly to the official boundary with zoom constraints
        if (mapInstanceRef.current) {
          mapInstanceRef.current.fitBounds(polyBounds, {
            padding: isProvince ? [20, 20] : [40, 40],
            maxZoom: isProvince ? 10 : 16,
            animate: false
          });
          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.invalidateSize();
            }
          }, 100);
        }

        // Inform parent page to update coordinate label if callback provided
        if (onCenterChangeRef.current) {
          onCenterChangeRef.current(polyCenter.lat, polyCenter.lng);
        }
      };

      if (geojsonBoundaryCache.has(cacheKey)) {
        applyGeoJson(geojsonBoundaryCache.get(cacheKey));
      } else {
        const searchQueries = isProvince
          ? [
              `${province?.name || unit.name}, Vietnam`,
              `${unit.name}, Vietnam`
            ]
          : [
              `${unit.name}, ${province?.name || ''}, Vietnam`,
              `${unit.name}, ${unit.district || ''}, Vietnam`,
              `${unit.name}, Vietnam`
            ];

        (async () => {
          for (const q of searchQueries) {
            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&polygon_geojson=1&format=json`, {
                headers: { 'User-Agent': 'NgocGas-MapPortal/2.0' }
              });
              const data = await res.json();
              if (Array.isArray(data) && data.length > 0) {
                const poly = isProvince
                  ? data.find(d => d.geojson && (d.geojson.type === 'Polygon' || d.geojson.type === 'MultiPolygon') && (d.class === 'boundary' || d.type === 'administrative'))
                  : data.find(d => d.geojson && (d.geojson.type === 'Polygon' || d.geojson.type === 'MultiPolygon'));

                if (poly && poly.geojson) {
                  // For province, ensure bbox span is not a small building
                  if (isProvince && Array.isArray(poly.boundingbox)) {
                    const latSpan = Math.abs(parseFloat(poly.boundingbox[1]) - parseFloat(poly.boundingbox[0]));
                    if (latSpan < 0.2) {
                      continue;
                    }
                  }
                  geojsonBoundaryCache.set(cacheKey, poly.geojson);
                  applyGeoJson(poly.geojson);
                  break;
                }
              }
            } catch (err) {
              // Try next query
            }
          }
        })();
      }
    });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [unitKey]);

  // Handle Layer Switch
  const handleSelectLayer = (layerId) => {
    setActiveLayerId(layerId);
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    import('leaflet').then((L) => {
      const selected = MAP_LAYERS.find(l => l.id === layerId);
      if (selected && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
        const newLayer = L.tileLayer(selected.url, {
          attribution: selected.attribution,
          maxZoom: selected.maxZoom,
          subdomains: selected.subdomains
        }).addTo(mapInstanceRef.current);
        tileLayerRef.current = newLayer;

        if (boundaryLayerRef.current) {
          boundaryLayerRef.current.bringToFront();
        }
      }
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '540px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      {/* Map DOM Target */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

      {/* FLOATING LAYER SWITCHER CARD (TOP-RIGHT) */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          minWidth: '220px',
          maxWidth: '260px'
        }}
      >
        {/* Switcher Header */}
        <div
          onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            paddingBottom: isLayerMenuOpen ? '8px' : '0',
            borderBottom: isLayerMenuOpen ? '1px solid #f1f5f9' : 'none',
            userSelect: 'none'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: '900', color: '#1e293b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            LOẠI BẢN ĐỒ
          </span>
          <button
            type="button"
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '11px',
              color: '#64748b',
              cursor: 'pointer',
              padding: '2px 4px'
            }}
          >
            {isLayerMenuOpen ? '▲' : '▼'}
          </button>
        </div>

        {/* Switcher Body */}
        {isLayerMenuOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
            {MAP_LAYERS.map((layer) => {
              const isActive = activeLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleSelectLayer(layer.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: isActive ? '#2563eb' : 'transparent',
                    color: isActive ? '#ffffff' : '#334155',
                    fontSize: '12px',
                    fontWeight: isActive ? '800' : '600',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{layer.icon}</span>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {layer.name}
                  </span>
                </button>
              );
            })}

            {/* Switcher Footer */}
            <div
              style={{
                marginTop: '6px',
                paddingTop: '8px',
                borderTop: '1px solid #f1f5f9',
                fontSize: '11px',
                textAlign: 'center',
                color: '#64748b'
              }}
            >
              <a
                href="https://ngocgas.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '800' }}
              >
                NgocGas.com
              </a>
              <span style={{ color: '#94a3b8' }}> · Bản đồ hành chính</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Map Legend Indicator (Bottom-Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(6px)',
          borderRadius: '8px',
          padding: '6px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #ef4444', backgroundColor: 'rgba(239,68,68,0.2)', borderRadius: '2px' }}></span>
          <span style={{ fontWeight: '700', color: '#0f172a' }}>Ranh giới địa giới</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px' }}>🏛️</span>
          <span style={{ fontWeight: '700', color: '#1d4ed8' }}>Trụ sở UBND</span>
        </div>
      </div>

      {/* CSS Animation Keyframes for Pulsing Marker */}
      <style jsx global>{`
        @keyframes tt-ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
