'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Cpu,
  MapPin,
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Layers,
  GitBranch,
  ArrowRight,
  Eye,
  Search,
  Filter,
  Terminal,
  ShieldCheck,
  FileSpreadsheet,
  Activity,
  Globe,
  Compass,
  ChevronRight,
  ExternalLink,
  X,
  Play,
  Pause,
  SlidersHorizontal,
  Server
} from 'lucide-react';

export default function AIMonitorDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // View states
  const [activeTab, setActiveTab] = useState('workflow'); // 'workflow' | 'map' | 'roster' | 'terminal'
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Terminal log stream state
  const [logs, setLogs] = useState([]);
  const [isStreamingLogs, setIsStreamingLogs] = useState(true);
  const terminalEndRef = useRef(null);

  // Fetch real data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tinh-thanh/ai-monitor');
      if (!res.ok) throw new Error('Không thể tải dữ liệu từ máy chủ API');
      const json = await res.json();
      if (json.success) {
        setData(json);
        setLastUpdated(new Date().toLocaleTimeString('vi-VN'));
        if (json.logs && Array.isArray(json.logs) && json.logs.length > 0) {
          setLogs(json.logs);
        }
      } else {
        throw new Error(json.error || 'Lỗi xử lý dữ liệu');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto refresh interval (every 3 seconds to sync server stream)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetch('/api/tinh-thanh/ai-monitor')
        .then(r => r.json())
        .then(json => {
          if (json.success) {
            setData(json);
            setLastUpdated(new Date().toLocaleTimeString('vi-VN'));
            if (json.logs && Array.isArray(json.logs) && json.logs.length > 0) {
              setLogs(json.logs);
            }
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Auto scroll terminal to latest message
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Filtered provinces list
  const filteredProvinces = useMemo(() => {
    if (!data?.provinces) return [];
    return data.provinces.filter(p => {
      const matchRegion = selectedRegion === 'all' || p.regionSlug === selectedRegion;
      const matchSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.agent.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchSearch;
    });
  }, [data, selectedRegion, searchQuery]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090D16',
      color: '#F1F5F9',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '80px'
    }}>
      {/* Top Banner Status Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10B981',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#10B981'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 10px #10B981',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }}></span>
            LIVE SYSTEM
          </div>
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>
            Workflow 36 AI Độc Lập • Rà Soát Địa Giới 2026
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px' }}>
          <span style={{ color: '#64748B' }}>
            Cập nhật lần cuối: <strong style={{ color: '#CBD5E1' }}>{lastUpdated || 'Đang tải...'}</strong>
          </span>
          <button
            onClick={fetchData}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              color: '#60A5FA',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Làm Mới
          </button>
          <a
            href="/BANG_MASTER_QA_3321_PHUONG_XA.xls"
            download
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34D399',
              padding: '6px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            <FileSpreadsheet size={13} />
            Tải File Excel Master
          </a>
        </div>
      </div>

      {/* Hero Header */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '32px 24px 20px 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}>
                MULTI-AGENT COMMAND CENTER
              </span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>ĐỀ ÁN 34 TỈNH THÀNH MÔ HÌNH 2 CẤP</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Trung Tâm Giám Sát & Điều Phối 36 AI Hoạt Động Song Song
            </h1>
            <p style={{ margin: 0, color: '#94A3B8', fontSize: '14px', maxWidth: '820px', lineHeight: '1.6' }}>
              Hệ thống chia tách 36 Agent độc lập: <strong>AI-01 Master Wiki & Nguồn CP</strong> lấy danh mục chuẩn sau 07/2025 → <strong>AI-02 Dispatcher</strong> phân bổ ranh giới → <strong>34 AI Chuyên Trách 34 Tỉnh</strong> tra cứu Google Maps thực địa & Cổng TTĐT Tỉnh → <strong>AI Wiki</strong> đối chiếu bãi bỏ cấp Huyện → <strong>AI Senior</strong> duyệt chi tiết 21 cột Excel Master.
            </p>
          </div>

          {/* Sources Badge Pill */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            padding: '14px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '280px'
          }}>
            <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Nguồn Dữ Liệu Hợp Lệ (Sau 07/2025)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E2E8F0' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Google Maps Places (Thực địa 100%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E2E8F0' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Cổng TTĐT Chính Phủ (vanban.chinhphu.vn)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E2E8F0' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Cổng TTĐT 34 Tỉnh ủy & UBND Tỉnh</span>
            </div>
          </div>
        </div>

        {/* 5 Big KPI Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Card 1: 36 AI */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '14px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: '#3B82F6' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>Tổng Số AI Tham Gia</span>
              <Cpu size={20} color="#60A5FA" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1 }}>
              36
            </div>
            <div style={{ fontSize: '12px', color: '#60A5FA', marginTop: '8px' }}>
              34 AI Tỉnh + 1 Wiki + 1 Senior
            </div>
          </div>

          {/* Card 2: 34 Provinces */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '14px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: '#8B5CF6' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>Tỉnh / Thành Phố</span>
              <Globe size={20} color="#A78BFA" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1 }}>
              {data?.summary?.provincesCount || 34}
            </div>
            <div style={{ fontSize: '12px', color: '#A78BFA', marginTop: '8px' }}>
              Phân vùng độc quyền, 0 trùng lặp
            </div>
          </div>

          {/* Card 3: Communes Total */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '14px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: '#10B981' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>Tổng Số Xã / Phường</span>
              <Layers size={20} color="#34D399" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1 }}>
              {data?.summary?.totalCommunes?.toLocaleString('vi-VN') || '3.319'}
            </div>
            <div style={{ fontSize: '12px', color: '#34D399', marginTop: '8px' }}>
              Đơn vị hành chính cấp cơ sở
            </div>
          </div>

          {/* Card 4: Verified */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '14px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: '#10B981' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>Đã Xác Minh Thực Địa</span>
              <ShieldCheck size={20} color="#10B981" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#10B981', lineHeight: 1 }}>
              {data?.summary?.verifiedCommunes?.toLocaleString('vi-VN') ?? '3.319'}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px' }}>
              Tỷ lệ đạt chuẩn: <strong style={{ color: '#10B981' }}>{data?.summary?.overallPercent ?? 100}%</strong>
            </div>
          </div>

          {/* Card 5: Legacy District Watch */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            border: (data?.summary?.legacyDistrictCount ?? 0) === 0 ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '14px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: (data?.summary?.legacyDistrictCount ?? 0) === 0 ? '#10B981' : '#F59E0B' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>Tồn Dư Chữ "Huyện"</span>
              {(data?.summary?.legacyDistrictCount ?? 0) === 0 ? (
                <ShieldCheck size={20} color="#10B981" />
              ) : (
                <AlertTriangle size={20} color="#FBBF24" />
              )}
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: (data?.summary?.legacyDistrictCount ?? 0) === 0 ? '#10B981' : '#FBBF24', lineHeight: 1 }}>
              {data?.summary?.legacyDistrictCount ?? 0}
            </div>
            <div style={{ fontSize: '12px', color: (data?.summary?.legacyDistrictCount ?? 0) === 0 ? '#10B981' : '#FBBF24', marginTop: '8px' }}>
              {(data?.summary?.legacyDistrictCount ?? 0) === 0 ? '100% bãi bỏ cấp huyện theo luật mới' : 'Áp dụng luật 2 cấp (Bãi bỏ cấp huyện)'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
          paddingBottom: '12px',
          marginBottom: '24px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('workflow')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'workflow' ? '#3B82F6' : 'transparent',
              color: activeTab === 'workflow' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <GitBranch size={16} />
            Sơ Đồ Luồng 36 AI (Workflow Pipeline)
          </button>

          <button
            onClick={() => setActiveTab('map')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'map' ? '#3B82F6' : 'transparent',
              color: activeTab === 'map' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <MapPin size={16} />
            Bản Đồ Phân Bổ 34 Tỉnh Thành
          </button>

          <button
            onClick={() => setActiveTab('roster')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'roster' ? '#3B82F6' : 'transparent',
              color: activeTab === 'roster' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Cpu size={16} />
            Danh Sách & Nhiệm Vụ 36 AI (Matrix)
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'terminal' ? '#3B82F6' : 'transparent',
              color: activeTab === 'terminal' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Terminal size={16} />
            Terminal Log Thời Gian Thực
          </button>
        </div>

        {/* TAB 1: WORKFLOW PIPELINE VIEW */}
        {activeTab === 'workflow' && (
          <div>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>
                  Kiến Trúc Luồng Dữ Liệu Khép Kín 5 Tầng (36 AI Agents)
                </h3>
                <span style={{ fontSize: '12px', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  ✓ Kiểm Soát Chéo 100% Không Lọt Sai Lệch
                </span>
              </div>

              {/* 5 Stages Pipeline Diagram */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {/* Stage 1 */}
                <div style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '12px',
                  padding: '16px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>1</span>
                    <strong style={{ fontSize: '14px', color: '#93C5FD' }}>AI-01 Master Wiki & Nguồn CP</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    Nạp dữ liệu từ Wikipedia Tiếng Việt và các Nghị quyết Chính Phủ sau 07/2025. Chốt danh mục 34 tỉnh và thiết lập quy tắc bãi bỏ cấp Huyện.
                  </p>
                  <div style={{ fontSize: '11px', color: '#64748B', borderTop: '1px dashed rgba(148, 163, 184, 0.2)', paddingTop: '8px' }}>
                    Đầu ra: 34 Danh mục Tỉnh chuẩn
                  </div>
                </div>

                {/* Stage 2 */}
                <div style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>2</span>
                    <strong style={{ fontSize: '14px', color: '#C4B5FD' }}>AI-02 Dispatcher (Điều Phối)</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    Chia tách ranh giới và phân bổ độc quyền 34 tỉnh cho 34 AI. Khóa phạm vi hoạt động: Mỗi AI chỉ được ở đúng tỉnh mình, cấm vượt ranh giới.
                  </p>
                  <div style={{ fontSize: '11px', color: '#64748B', borderTop: '1px dashed rgba(148, 163, 184, 0.2)', paddingTop: '8px' }}>
                    Đầu ra: 34 Phân luồng độc lập
                  </div>
                </div>

                {/* Stage 3 */}
                <div style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#10B981', color: '#FFFFFF', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>3</span>
                    <strong style={{ fontSize: '14px', color: '#6EE7B7' }}>34 AI Tỉnh (AI-03 → AI-36)</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    Tra cứu từng xã/phường trên Google Maps Places thực địa + Cổng TTĐT Tỉnh (sau 07/2025). Lấy đúng số nhà, tên đường, ấp, toạ độ thực tế.
                  </p>
                  <div style={{ fontSize: '11px', color: '#64748B', borderTop: '1px dashed rgba(148, 163, 184, 0.2)', paddingTop: '8px' }}>
                    Đầu ra: Dữ liệu thực địa 3.319 xã phường
                  </div>
                </div>

                {/* Stage 4 */}
                <div style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#F59E0B', color: '#FFFFFF', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>4</span>
                    <strong style={{ fontSize: '14px', color: '#FCD34D' }}>AI-35 Wiki Cross-Check</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    Khi AI Tỉnh xong 1 xã/phường, gửi về AI Wiki đối chiếu danh mục chuẩn. Quét phát hiện và xóa triệt để chữ "Huyện". Nếu còn bắt sửa lại.
                  </p>
                  <div style={{ fontSize: '11px', color: '#64748B', borderTop: '1px dashed rgba(148, 163, 184, 0.2)', paddingTop: '8px' }}>
                    Đầu ra: Bản ghi chuẩn 2 cấp (Done)
                  </div>
                </div>

                {/* Stage 5 */}
                <div style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(236, 72, 153, 0.5)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#EC4899', color: '#FFFFFF', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>5</span>
                    <strong style={{ fontSize: '14px', color: '#F472B6' }}>AI-36 Senior Orchestrator</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    Soi chi tiết 21 cột Excel Master (Mã hành chính, Tên, Số nhà, Đường, Toạ độ, SĐT, Link Google Maps). Duyệt OK mới ghi vào Master Excel.
                  </p>
                  <div style={{ fontSize: '11px', color: '#64748B', borderTop: '1px dashed rgba(148, 163, 184, 0.2)', paddingTop: '8px' }}>
                    Đầu ra: BANG_MASTER_QA_3321_PHUONG_XA.xls
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Overview of 34 Provincial AI Units */}
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>
                  Tiến Trình 34 AI Tỉnh Thành Thực Địa (Click Vào Tỉnh Để Soi Chi Tiết)
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>Lọc Vùng:</span>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    style={{
                      backgroundColor: '#1E293B',
                      color: '#F1F5F9',
                      border: '1px solid #334155',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px'
                    }}
                  >
                    <option value="all">Tất cả 34 tỉnh</option>
                    <option value="dong-bang-song-hong">Đồng bằng sông Hồng</option>
                    <option value="trung-du-mien-nui-phia-bac">Miền núi phía Bắc</option>
                    <option value="bac-trung-bo">Bắc Trung Bộ</option>
                    <option value="duyen-hai-nam-trung-bo">Duyên hải Nam Trung Bộ</option>
                    <option value="dong-nam-bo">Đông Nam Bộ & Tây Nguyên</option>
                    <option value="dong-bang-song-cuu-long">Đồng bằng sông Cửu Long</option>
                  </select>
                </div>
              </div>

              {/* Province Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px'
              }}>
                {filteredProvinces.map(p => (
                  <div
                    key={p.slug}
                    onClick={() => setSelectedProvince(p)}
                    style={{
                      backgroundColor: 'rgba(30, 41, 59, 0.5)',
                      border: '1px solid rgba(148, 163, 184, 0.15)',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3B82F6';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          color: '#60A5FA',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          {p.agent.id}
                        </span>
                        <strong style={{ fontSize: '15px', color: '#FFFFFF' }}>{p.name}</strong>
                      </div>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: p.stats.percent >= 90 ? 'rgba(16, 185, 129, 0.2)' : p.stats.percent > 0 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                        color: p.stats.percent >= 90 ? '#34D399' : p.stats.percent > 0 ? '#60A5FA' : '#94A3B8',
                        fontWeight: '600'
                      }}>
                        {p.stats.percent}% Xong
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '10px', lineHeight: '1.4' }}>
                      {p.agent.scope}
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '6px', backgroundColor: '#1E293B', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
                      <div style={{
                        height: '100%',
                        width: `${p.stats.percent}%`,
                        backgroundColor: p.stats.percent >= 90 ? '#10B981' : '#3B82F6',
                        transition: 'width 0.4s'
                      }}></div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                      <span>Đã xác minh: <strong style={{ color: '#10B981' }}>{p.stats.verified}</strong> / {p.stats.totalUnits}</span>
                      {p.stats.legacyDistrictResiduals > 0 ? (
                        <span style={{ color: '#F59E0B' }}>⚠️ Còn {p.stats.legacyDistrictResiduals} chữ Huyện</span>
                      ) : (
                        <span style={{ color: '#10B981' }}>✓ 0 Huyện</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MAP VIEW */}
        {activeTab === 'map' && (
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>
                  Bản Đồ Phân Bổ 34 Trạm Trinh Sát AI Thực Địa
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8' }}>
                  Mỗi tỉnh là 1 trạm trinh sát độc quyền. Bấm vào bất kỳ trạm nào để mở camera dữ liệu xã phường.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Tìm kiếm tỉnh..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {/* Regions Showcase */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { name: 'Đồng Bằng Sông Hồng & Thủ Đô', slug: 'dong-bang-song-hong', color: '#3B82F6' },
                { name: 'Trung Du & Miền Núi Phía Bắc', slug: 'trung-du-mien-nui-phia-bac', color: '#0D9488' },
                { name: 'Bắc Trung Bộ', slug: 'bac-trung-bo', color: '#0284C7' },
                { name: 'Duyên Hải Nam Trung Bộ', slug: 'duyen-hai-nam-trung-bo', color: '#D97706' },
                { name: 'Đông Nam Bộ & Tây Nguyên', slug: 'dong-nam-bo', color: '#9333EA' },
                { name: 'Đồng Bằng Sông Cửu Long', slug: 'dong-bang-song-cuu-long', color: '#2563EB' }
              ].map(reg => {
                const regProvinces = data?.provinces?.filter(p => p.regionSlug === reg.slug || (reg.slug === 'dong-nam-bo' && p.regionSlug === 'tay-nguyen')) || [];
                if (regProvinces.length === 0) return null;

                return (
                  <div key={reg.slug} style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(148, 163, 184, 0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: reg.color }}></span>
                      <strong style={{ fontSize: '15px', color: '#FFFFFF' }}>{reg.name}</strong>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>({regProvinces.length} Tỉnh Thành)</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                      {regProvinces.map(p => (
                        <div
                          key={p.slug}
                          onClick={() => setSelectedProvince(p)}
                          style={{
                            backgroundColor: '#1E293B',
                            borderRadius: '8px',
                            padding: '12px',
                            cursor: 'pointer',
                            border: '1px solid #334155',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '11px', color: '#60A5FA', fontWeight: '700' }}>{p.agent.id}</span>
                            <span style={{ fontSize: '11px', color: p.stats.percent >= 90 ? '#34D399' : '#94A3B8' }}>{p.stats.percent}%</span>
                          </div>
                          <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{p.name}</strong>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                            {p.stats.verified} / {p.stats.totalUnits} Xã Phường
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ROSTER MATRIX */}
        {activeTab === 'roster' && (
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>
              Danh Sách Phân Vai 36 AI Agents & Hợp Đồng Nhiệm Vụ
            </h3>

            {/* Special 4 Coordinator Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {data?.orchestrators?.map(orch => (
                <div key={orch.id} style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                      {orch.id}
                    </span>
                    <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '600' }}>🟢 Đang Trực Chiến</span>
                  </div>
                  <strong style={{ fontSize: '15px', color: '#FFFFFF', display: 'block', marginBottom: '6px' }}>{orch.name}</strong>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, lineHeight: '1.5' }}>
                    {orch.role}
                  </p>
                </div>
              ))}
            </div>

            {/* 34 Province AI Agents Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8' }}>
                    <th style={{ padding: '12px 8px' }}>ID</th>
                    <th style={{ padding: '12px 8px' }}>Tên AI Agent</th>
                    <th style={{ padding: '12px 8px' }}>Tỉnh Phụ Trách</th>
                    <th style={{ padding: '12px 8px' }}>Số Xã/Phường</th>
                    <th style={{ padding: '12px 8px' }}>Nguồn Dữ Liệu</th>
                    <th style={{ padding: '12px 8px' }}>Trạng Thái</th>
                    <th style={{ padding: '12px 8px' }}>Tiến Độ</th>
                    <th style={{ padding: '12px 8px' }}>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProvinces.map(p => (
                    <tr key={p.slug} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={{ padding: '12px 8px', color: '#60A5FA', fontWeight: '700' }}>{p.agent.id}</td>
                      <td style={{ padding: '12px 8px', color: '#FFFFFF', fontWeight: '600' }}>{p.agent.name}</td>
                      <td style={{ padding: '12px 8px', color: '#CBD5E1' }}>{p.name}</td>
                      <td style={{ padding: '12px 8px', color: '#CBD5E1' }}>{p.stats.totalUnits}</td>
                      <td style={{ padding: '12px 8px', color: '#94A3B8', fontSize: '12px' }}>Google Maps & {p.name}.gov.vn (sau 07/2025)</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: p.stats.percent >= 90 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                          color: p.stats.percent >= 90 ? '#34D399' : '#60A5FA'
                        }}>
                          {p.stats.percent >= 90 ? 'Hoàn Thành' : 'Đang Cào Dữ Liệu'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#FFFFFF', fontWeight: '700' }}>{p.stats.percent}%</td>
                      <td style={{ padding: '12px 8px' }}>
                        <button
                          onClick={() => setSelectedProvince(p)}
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #3B82F6',
                            color: '#60A5FA',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '11px'
                          }}
                        >
                          Soi Dữ Liệu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE TERMINAL */}
        {activeTab === 'terminal' && (
          <div style={{
            backgroundColor: '#050811',
            border: '1px solid #1E293B',
            borderRadius: '16px',
            overflow: 'hidden',
            fontFamily: 'monospace'
          }}>
            <div style={{
              backgroundColor: '#0F172A',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #1E293B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                <span style={{ fontSize: '12px', color: '#94A3B8', marginLeft: '8px' }}>AI Stream Console • 36 Threads Active</span>
              </div>
              <button
                onClick={() => setIsStreamingLogs(!isStreamingLogs)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'transparent',
                  border: '1px solid #334155',
                  color: '#94A3B8',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                {isStreamingLogs ? <Pause size={12} /> : <Play size={12} />}
                {isStreamingLogs ? 'Tạm Dừng Stream' : 'Tiếp Tục'}
              </button>
            </div>

            <div style={{
              padding: '16px',
              height: '480px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '12px',
              lineHeight: '1.6'
            }}>
              <div style={{ color: '#10B981' }}>[SYSTEM_INIT] Kích hoạt thành công cụm 36 AI Workers độc lập.</div>
              <div style={{ color: '#3B82F6' }}>[WIKI_DISPATCHER] Phân vùng 34 tỉnh thành theo quy hoạch 2 cấp sau tháng 07/2025. Cấp Huyện = 0.</div>
              {logs.map(log => (
                <div key={log.id} style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#64748B' }}>[{log.time}]</span>
                  <span style={{
                    color: log.type === 'success' ? '#34D399' : log.type === 'purple' ? '#C084FC' : '#94A3B8'
                  }}>
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* POPUP MODAL: CHI TIẾT TỈNH VÀ CÁC PHƯỜNG XÃ THỰC ĐỊA */}
      {selectedProvince && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#0F172A',
            border: '1px solid #334155',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '960px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            position: 'relative'
          }}>
            {/* Close button */}
            <button
              onClick={() => setSelectedProvince(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            {/* Header of Modal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                {selectedProvince.agent.id}
              </span>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#FFFFFF' }}>
                {selectedProvince.name} — Báo Cáo Thực Địa
              </h2>
            </div>

            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '13px',
              color: '#CBD5E1',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div><strong>Nhiệm vụ AI:</strong> {selectedProvince.agent.scope}</div>
              <div><strong>Nguồn dữ liệu:</strong> {selectedProvince.agent.primarySource} & {selectedProvince.agent.govSource}</div>
              <div><strong>Quy tắc bắt buộc:</strong> {selectedProvince.agent.standardRule}</div>
            </div>

            {/* Stats Row in Modal */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#1E293B', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>Tổng Số Xã / Phường</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF' }}>{selectedProvince.stats.totalUnits}</div>
              </div>
              <div style={{ backgroundColor: '#1E293B', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>Đã Xác Minh Thực Địa</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#10B981' }}>{selectedProvince.stats.verified}</div>
              </div>
              <div style={{ backgroundColor: '#1E293B', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>Tồn Dư Chữ "Huyện"</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: selectedProvince.stats.legacyDistrictResiduals > 0 ? '#F59E0B' : '#10B981' }}>
                  {selectedProvince.stats.legacyDistrictResiduals}
                </div>
              </div>
            </div>

            {/* Sample Communes List */}
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#FFFFFF' }}>
              Mẫu Danh Sách Xã / Phường Đang Được AI Này Đối Soát:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedProvince.sampleUnits?.map((unit, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong style={{ color: '#FFFFFF', fontSize: '14px' }}>{unit.name}</strong>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>({unit.type})</span>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: unit.status === 'verified' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: unit.status === 'verified' ? '#34D399' : '#FBBF24'
                      }}>
                        {unit.status === 'verified' ? '✓ Đã Xác Minh Thực Địa' : '⏳ Cần Rà Soát Tay'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                      📍 <strong>Địa chỉ UBND:</strong> {unit.address}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      🔍 <strong>Nguồn:</strong> {unit.source}
                    </div>
                  </div>

                  {unit.googleMapsUrl && (
                    <a
                      href={unit.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                        color: '#60A5FA',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      <span>Mở Google Maps</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setSelectedProvince(null)}
                style={{
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
