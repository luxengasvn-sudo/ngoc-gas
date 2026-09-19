import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dataDir = path.join(/*turbopackIgnore: true*/ process.cwd(), 'src', 'data', 'tinhthanh');
    const provincesFile = path.join(dataDir, 'provinces-34.json');
    
    if (!fs.existsSync(provincesFile)) {
      return NextResponse.json({ error: 'Provinces data not found' }, { status: 404 });
    }

    const provincesRaw = fs.readFileSync(provincesFile, 'utf8');
    const provinces = JSON.parse(provincesRaw);

    let totalGlobalUnits = 0;
    let totalGlobalVerified = 0;
    let totalGlobalPending = 0;
    let totalLegacyDistricts = 0;

    const provinceStats = provinces.map((p, index) => {
      const agentId = `AI-${String(index + 3).padStart(2, '0')}`;
      const slug = p.slug;
      
      // Look for data file
      const possibleFiles = [
        path.join(dataDir, `administrative-units-${slug}.json`),
        path.join(dataDir, `administrative-units-${slug.replace(/-/g, '')}.json`)
      ];
      
      let units = [];
      for (const f of possibleFiles) {
        if (fs.existsSync(f)) {
          try {
            units = JSON.parse(fs.readFileSync(f, 'utf8'));
            break;
          } catch (err) {}
        }
      }

      const total = units.length || p.totalUnits || 0;
      let verified = 0;
      let legacyDistCount = 0;

      units.forEach(u => {
        if (u.ubnd?.reviewStatus === 'verified') {
          verified++;
        }
        const hasLegacyDistrictInDistrict = u.district && /\bhuyện\b/i.test(u.district);
        const hasLegacyDistrictInAddress = u.ubnd?.address && /\bhuyện\s+(?!bến\b)[a-zà-ỹ]/i.test(u.ubnd.address);
        if (hasLegacyDistrictInDistrict || hasLegacyDistrictInAddress) {
          legacyDistCount++;
        }
      });

      const pending = total - verified;
      totalGlobalUnits += total;
      totalGlobalVerified += verified;
      totalGlobalPending += pending;
      totalLegacyDistricts += legacyDistCount;

      const percent = total > 0 ? Math.round((verified / total) * 100) : 0;
      
      let status = 'queued';
      if (percent >= 90) status = 'completed';
      else if (percent > 0) status = 'in_progress';
      else if (index < 6) status = 'active_scanning';

      return {
        slug: p.slug,
        name: p.name,
        type: p.type,
        region: p.region,
        regionSlug: p.regionSlug,
        postalCode: p.postalCode,
        agent: {
          id: agentId,
          name: `AI Chuyên Trách ${p.name}`,
          status,
          scope: `Độc quyền ${total} xã/phường tại ${p.name} (Tuyệt đối không xâm lấn địa bàn khác)`,
          primarySource: 'Google Maps Places & Geocoding API',
          govSource: `Cổng Thông Tin Điện Tử ${p.name} (Dữ liệu công bố sau 07/2025)`,
          standardRule: 'Chuẩn 2 cấp: Tỉnh -> Phường/Xã (Loại bỏ 100% cấp huyện)',
          currentAction: status === 'completed' 
            ? 'Đã đối soát Wiki & hoàn tất duyệt 21 cột' 
            : status === 'in_progress'
            ? 'Đang thu thập Google Maps & đối soát Cổng TTĐT sau 07/2025'
            : 'Đang xếp hàng chờ lệnh Dispatcher'
        },
        stats: {
          totalUnits: total,
          verified,
          pending,
          percent,
          legacyDistrictResiduals: legacyDistCount
        },
        sampleUnits: units.slice(0, 8).map(u => ({
          name: u.name,
          type: u.type,
          district: u.district,
          ubndName: u.ubnd?.name || `UBND ${u.name}`,
          address: u.ubnd?.address || 'Đang cập nhật thực địa',
          googleMapsUrl: u.ubnd?.googleMapsUrl || '',
          source: u.ubnd?.verificationSource || 'Google Maps & Cổng TTĐT sau 07/2025',
          status: u.ubnd?.reviewStatus || 'pending'
        }))
      };
    });

    // Special coordinator AI agents
    const orchestratorAgents = [
      {
        id: 'AI-01',
        name: 'AI Master Wiki & Cổng TTĐT Chính Phủ',
        role: 'Trích xuất danh mục 34 tỉnh và chuẩn hóa khung pháp lý sau 07/2025',
        sources: [
          'https://vi.wikipedia.org/wiki/Việt_Nam (Mục Phân chia hành chính 34 tỉnh)',
          'Cổng TTĐT Chính Phủ (vanban.chinhphu.vn - Nghị quyết sắp xếp sau 07/2025)',
          'Cổng TTĐT Bộ Nội vụ (moha.gov.vn - Đề án mô hình chính quyền 2 cấp)'
        ],
        status: 'online',
        targetCount: 34,
        completedCount: 34
      },
      {
        id: 'AI-02',
        name: 'AI Provincial Dispatcher (Điều Phối Viên Vùng)',
        role: 'Phân bổ độc quyền 34 tỉnh cho 34 AI, giám sát hàng đợi và ngăn chặn trùng lặp ranh giới',
        status: 'online',
        assignedQueues: 34,
        collisionChecks: 0
      },
      {
        id: 'AI-35',
        name: 'AI Wiki Cross-Check & Lọc Bỏ Cấp Huyện',
        role: 'Đối chiếu chéo từng xã phường với cơ sở dữ liệu Wiki sau 07/2025, phát hiện và xóa sạch chữ Huyện',
        status: 'active',
        scannedCommunes: totalGlobalUnits,
        detectedResiduals: totalLegacyDistricts
      },
      {
        id: 'AI-36',
        name: 'AI Senior Master Auditor (Tổng Thư Ký)',
        role: 'Kiểm tra chi tiết 21 cột Excel Master (Mã, Tên, Số nhà, Đường, SĐT, Toạ độ...) trước khi xuất file',
        status: 'active',
        reviewedUnits: totalGlobalVerified,
        pendingReview: totalGlobalPending
      }
    ];

    // Shared server-side log stream
    let serverLogs = [];
    const logsFile = path.join(dataDir, 'ai-workflow-logs.json');
    if (fs.existsSync(logsFile)) {
      try {
        serverLogs = JSON.parse(fs.readFileSync(logsFile, 'utf8'));
      } catch (err) {}
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalAgents: 36,
        provincesCount: 34,
        totalCommunes: totalGlobalUnits,
        verifiedCommunes: totalGlobalVerified,
        pendingCommunes: totalGlobalPending,
        legacyDistrictCount: totalLegacyDistricts,
        overallPercent: totalGlobalUnits > 0 ? Math.round((totalGlobalVerified / totalGlobalUnits) * 100) : 0,
        sources: [
          'Google Maps Places (Thực địa số nhà, tên đường, tọa độ)',
          'Cổng TTĐT Chính Phủ & Bộ Nội Vụ (Văn bản sau tháng 07/2025)',
          'Cổng TTĐT 34 Tỉnh/Thành phố trực thuộc',
          'Wikipedia Tiếng Việt (Bản cập nhật địa giới 34 tỉnh mới nhất)'
        ]
      },
      orchestrators: orchestratorAgents,
      provinces: provinceStats,
      logs: serverLogs.slice(-60)
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
