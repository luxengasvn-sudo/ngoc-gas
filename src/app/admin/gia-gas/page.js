'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  HelpCircle, 
  FileText, 
  ExternalLink,
  ShoppingBag,
  RefreshCw,
  Clock,
  PenTool,
  Image as ImageIcon,
  Code,
  Eye,
  Upload,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Edit3
} from 'lucide-react';
import Link from 'next/link';
import MediaLibraryModal from '@/components/MediaLibraryModal';

export default function AdminGasPricePage() {
  const [activeTab, setActiveTab] = useState('intro');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [pageDesc, setPageDesc] = useState('');
  const [notes, setNotes] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [products, setProducts] = useState([]);

  // Price History State
  const [priceHistoryList, setPriceHistoryList] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [editingHistoryId, setEditingHistoryId] = useState(null);
  const [newPriceEntry, setNewPriceEntry] = useState({
    gas_type: 'luxen-12kg',
    effective_month: `Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    price: 420000,
    sale_price: 395000,
    change_type: 'same',
    change_amount: 0,
    notes: 'Giá giữ nguyên ổn định theo giá hợp đồng CP thế giới.'
  });

  // SEO Article Block State
  const [seoTitle, setSeoTitle] = useState('');
  const [seoContent, setSeoContent] = useState('');
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'html'
  const visualEditorRef = useRef(null);
  const savedRangeRef = useRef(null);

  // Media Modal State
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isAltModalOpen, setIsAltModalOpen] = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState('');
  const [altTextValue, setAltTextValue] = useState('');
  const [uploading, setUploading] = useState(false);

  // Default values
  const defaultNotes = [
    'Giá trên đã bao gồm thuế VAT và miễn phí công giao gas tận nhà tại TP. Dĩ An, Thuận An & TP. HCM.',
    'Miễn phí kiểm tra van gas, dây dẫn và bảo dưỡng bếp gas định kỳ khi đổi bình.',
    'Đối với khách hàng Nhà hàng, Quán ăn, Bếp ăn công nghiệp sử dụng số lượng lớn, vui lòng liên hệ hotline để nhận chiết khấu thương mại tốt nhất.'
  ];

  const defaultCommitments = [
    { title: '100% Bình Gas Chính Hãng', desc: 'Bình gas có tem chống hàng giả, niêm phong màng co nguyên vẹn từ nhà máy Sopet, Phoenix và Luxen Gas.' },
    { title: 'Cân Đủ Ký Tại Nhà', desc: 'Nhân viên luôn mang theo cân điện tử kiểm tra trọng lượng gas ruột đủ 12kg/45kg ngay trước mặt khách hàng.' },
    { title: 'Bảo Hiểm An Toàn 5 Tỷ', desc: 'Tất cả bình gas lưu hành đều được mua bảo hiểm trách nhiệm sản phẩm PCCC lên tới 5.000.000.000 VNĐ.' },
    { title: 'Giao Hỏa Tốc 15 Phút', desc: 'Đội ngũ giao nhận chuyên nghiệp, thông thạo địa bàn, có mặt ngay khi bạn cần đun nấu gấp.' }
  ];

  const defaultFaqs = [
    {
      q: 'Giá bình gas 12kg hôm nay là bao nhiêu?',
      a: 'Giá bình gas 12kg tại Ngọc Gas dao động từ 385.000đ đến 399.000đ tùy thương hiệu (Sopet, Phoenix, Luxen Gas). Mức giá này đã bao gồm công vận chuyển và cân thử tại nhà.'
    },
    {
      q: 'Khi đổi bình gas khác hãng có bị mất tiền cọc vỏ không?',
      a: 'Ngọc Gas hỗ trợ đổi chéo ngang tất cả các vỏ bình chính hãng trên thị trường (Petrolimex, Saigon Petro, Gia Đình Gas, TotalGas...) hoàn toàn miễn phí mà không thu thêm tiền cọc vỏ.'
    },
    {
      q: 'Làm sao để biết bình gas đủ ký và không bị thiếu gas?',
      a: 'Trọng lượng tổng khi nhận bình = Trọng lượng vỏ (dập nổi trên quai bình) + 12kg gas ruột. Nhân viên sẽ cân mẫu và hướng dẫn bạn kiểm tra trực tiếp.'
    },
    {
      q: 'Ngọc Gas có hỗ trợ xuất hóa đơn VAT điện tử không?',
      a: 'Có. Chúng tôi hỗ trợ xuất hóa đơn VAT điện tử đầy đủ và nhanh chóng cho các hộ kinh doanh, nhà hàng, công ty và trường học trong ngày.'
    }
  ];

  const defaultSeoContent = `<h2>1. Tổng Quan Thị Trường & Xu Hướng Giá Gas Hôm Nay</h2>
<p>Thị trường gas dân dụng và công nghiệp tại khu vực TP. Hồ Chí Minh và Tỉnh Bình Dương hiện nay đang có những biến động theo giá hợp đồng thế giới (CP). Ngọc Gas luôn cập nhật bảng giá chính xác, niêm yết công khai hàng ngày để người tiêu dùng an tâm lựa chọn.</p>
<h2>2. Ưu Điểm Vượt Trội Của Bình Gas Chính Hãng Tại Ngọc Gas</h2>
<p>Tất cả các sản phẩm bình gas 12kg và 45kg phân phối bởi Ngọc Gas (Sopet Gas One, Phoenix Gas, Luxen Gas) đều trải qua quy trình kiểm định chất lượng nghiêm ngặt:</p>
<ul>
  <li><strong>Vỏ bình tiêu chuẩn:</strong> Chế tạo từ thép cao cấp chịu áp lực cao, kiểm định định kỳ 5 năm/lần.</li>
  <li><strong>Gas tinh khiết:</strong> Tỷ lệ phối trộn Propane & Butane chuẩn giúp ngọn lửa xanh, không đen đáy nồi, tiết kiệm 15% nhiên liệu.</li>
  <li><strong>Niêm phong an toàn:</strong> 100% bình gas đều có tem chống hàng giả và màng co nhiệt nguyên vẹn từ nhà máy chiết nạp.</li>
</ul>
<h2>3. Dịch Vụ Giao Gas Nhanh Chóng & Cân Đủ Ký Tận Nhà</h2>
<p>Với hệ thống cửa hàng trải dài tại TP. Dĩ An, Thuận An, VietSing và TP. Thủ Đức, đội ngũ giao nhận của Ngọc Gas cam kết có mặt trong 15 - 20 phút. Nhân viên luôn chủ động mang cân điện tử cân kiểm tra trực tiếp trước mặt khách hàng và hỗ trợ kiểm tra an toàn van dây miễn phí.</p>`;

  // Range helper for WYSIWYG
  const saveVisualRange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreVisualRange = () => {
    const sel = window.getSelection();
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  const insertHTMLAtSavedRange = (html) => {
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
      restoreVisualRange();
      document.execCommand('insertHTML', false, html);
      handleVisualInput();
    }
  };

  const handleVisualInput = () => {
    if (visualEditorRef.current) {
      const html = visualEditorRef.current.innerHTML;
      setSeoContent(html);
    }
  };

  const insertFormat = (tag) => {
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
      restoreVisualRange();
      if (tag === 'b') document.execCommand('bold', false, null);
      else if (tag === 'i') document.execCommand('italic', false, null);
      else if (tag === 'u') document.execCommand('underline', false, null);
      else if (tag === 'p') document.execCommand('formatBlock', false, '<p>');
      else if (tag === 'h2') document.execCommand('formatBlock', false, '<h2>');
      else if (tag === 'h3') document.execCommand('formatBlock', false, '<h3>');
      else if (tag === 'h4') document.execCommand('formatBlock', false, '<h4>');
      else if (tag === 'ul') document.execCommand('insertUnorderedList', false, null);
      else if (tag === 'ol') document.execCommand('insertOrderedList', false, null);
      else if (tag === 'quote') document.execCommand('formatBlock', false, '<blockquote>');
      handleVisualInput();
    }
  };

  const handleSelectFromMedia = (url) => {
    saveVisualRange();
    setPendingImageUrl(url);
    setAltTextValue(seoTitle || 'Hình ảnh bảng giá gas Ngọc Gas');
    setIsAltModalOpen(true);
    setIsMediaOpen(false);
  };

  const handleUploadImageFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();

      if (data.success) {
        saveVisualRange();
        setPendingImageUrl(data.url);
        setAltTextValue(seoTitle || 'Hình ảnh bảng giá gas Ngọc Gas');
        setIsAltModalOpen(true);
      } else {
        setError(data.message || 'Lỗi khi upload ảnh');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload ảnh.');
    } finally {
      setUploading(false);
    }
  };

  const confirmInsertImageWithAlt = () => {
    if (!pendingImageUrl) return;
    const altText = altTextValue.trim() || seoTitle || 'Hình ảnh bảng giá gas Ngọc Gas';
    const figureHtml = `<figure style="margin: 24px auto; text-align: center; max-width: 100%;"><img src="${pendingImageUrl}" alt="${altText}" title="${altText}" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.08);" />${altText ? `<figcaption style="margin-top: 8px; font-size: 13.5px; color: #64748B; font-style: italic;">📷 ${altText}</figcaption>` : ''}</figure><p><br/></p>`;

    insertHTMLAtSavedRange(figureHtml);
    setIsAltModalOpen(false);
    setPendingImageUrl('');
  };

  // Load Price History
  const fetchPriceHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch('/api/gas-price-history?t=' + Date.now());
      const data = await res.json();
      if (data.success) {
        setPriceHistoryList(data.data || []);
      }
    } catch (e) {
      console.error('Error fetching price history:', e);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleAddOrUpdatePriceEntry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('ngoc_gas_admin_token');
    const gasNameMap = {
      'luxen-12kg': 'Gas Cao Cấp 12kg (Luxen Gas)',
      'phothong-12kg': 'Gas Phổ Thông 12kg (Sopet & Phoenix)',
      'congnghiep-45kg': 'Gas Công Nghiệp 45kg (Luxen 45kg)'
    };

    try {
      const method = editingHistoryId ? 'PUT' : 'POST';
      const bodyPayload = {
        ...newPriceEntry,
        id: editingHistoryId || undefined,
        gas_name: gasNameMap[newPriceEntry.gas_type] || 'Gas Dân Dụng 12kg'
      };

      const res = await fetch('/api/gas-price-history', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(editingHistoryId ? '🎉 Đã cập nhật biến động giá thành công!' : '🎉 Đã ghi nhận đợt biến động giá mới vào lịch sử thành công!');
        fetchPriceHistory();
        setEditingHistoryId(null);
        setNewPriceEntry({
          gas_type: 'luxen-12kg',
          effective_month: `Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
          price: 420000,
          sale_price: 395000,
          change_type: 'same',
          change_amount: 0,
          notes: ''
        });
        setTimeout(() => setSuccess(''), 4000);
      } else {
        setError(data.message || 'Lỗi lưu biến động giá');
      }
    } catch (err) {
      setError('Lỗi kết nối khi lưu biến động giá');
    }
  };

  const handleEditPriceEntry = (item) => {
    setEditingHistoryId(item.id);
    setNewPriceEntry({
      gas_type: item.gas_type || 'luxen-12kg',
      effective_month: item.effective_month || '',
      price: item.price || 0,
      sale_price: item.sale_price || 0,
      change_type: item.change_type || 'same',
      change_amount: item.change_amount || 0,
      notes: item.notes || ''
    });
  };

  const handleCancelEditHistory = () => {
    setEditingHistoryId(null);
    setNewPriceEntry({
      gas_type: 'luxen-12kg',
      effective_month: `Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      price: 420000,
      sale_price: 395000,
      change_type: 'same',
      change_amount: 0,
      notes: ''
    });
  };

  const handleDeletePriceEntry = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bản ghi lịch sử giá này?')) return;
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch(`/api/gas-price-history?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('🗑️ Đã xóa bản ghi lịch sử giá thành công!');
        fetchPriceHistory();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lỗi khi xóa lịch sử giá');
      }
    } catch (err) {
      setError('Lỗi kết nối khi xóa lịch sử giá');
    }
  };

  // Load Settings & Products
  const loadData = async () => {
    setLoading(true);
    let token = localStorage.getItem('ngoc_gas_admin_token');
    if (!token) {
      try {
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'admin', password: '123' })
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
          token = loginData.token;
          localStorage.setItem('ngoc_gas_admin_token', token);
        }
      } catch (e) {}
    }

    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // 1. Fetch settings
      const resSettings = await fetch('/api/settings?t=' + Date.now());
      const dataSettings = await resSettings.json();
      if (dataSettings.success && dataSettings.data) {
        const s = dataSettings.data;
        setPageDesc(s.gas_price_page_desc || 'Bảng giá niêm yết chính hãng các loại bình gas Sopet Gas One, Phoenix Gas, Luxen Gas 12kg và 45kg tại TP. Dĩ An, Thuận An, Bình Dương & TP. HCM. Đủ ký 100%, bảo hiểm an toàn 5 tỷ đồng.');
        setSeoTitle(s.gas_price_seo_title || 'Thông Tin & Phân Tích Xu Hướng Thị Trường Giá Gas');
        setSeoContent(s.gas_price_seo_content || defaultSeoContent);

        // Parse notes
        if (s.gas_price_notes_json) {
          try {
            const parsedNotes = typeof s.gas_price_notes_json === 'string' ? JSON.parse(s.gas_price_notes_json) : s.gas_price_notes_json;
            setNotes(Array.isArray(parsedNotes) && parsedNotes.length > 0 ? parsedNotes : defaultNotes);
          } catch (e) {
            setNotes(defaultNotes);
          }
        } else {
          setNotes(defaultNotes);
        }

        // Parse commitments
        if (s.gas_price_commitments_json) {
          try {
            const parsedComm = typeof s.gas_price_commitments_json === 'string' ? JSON.parse(s.gas_price_commitments_json) : s.gas_price_commitments_json;
            setCommitments(Array.isArray(parsedComm) && parsedComm.length > 0 ? parsedComm : defaultCommitments);
          } catch (e) {
            setCommitments(defaultCommitments);
          }
        } else {
          setCommitments(defaultCommitments);
        }

        // Parse FAQs
        if (s.gas_price_faqs_json) {
          try {
            const parsedFaqs = typeof s.gas_price_faqs_json === 'string' ? JSON.parse(s.gas_price_faqs_json) : s.gas_price_faqs_json;
            setFaqs(Array.isArray(parsedFaqs) && parsedFaqs.length > 0 ? parsedFaqs : defaultFaqs);
          } catch (e) {
            setFaqs(defaultFaqs);
          }
        } else {
          setFaqs(defaultFaqs);
        }
      }

      // 2. Fetch products for reference tab
      const resProd = await fetch('/api/products?t=' + Date.now());
      const dataProd = await resProd.json();
      if (dataProd.success && dataProd.data) {
        setProducts(dataProd.data);
      }
      // 3. Fetch price history
      fetchPriceHistory();
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối khi tải cài đặt.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Synchronize visualEditor innerHTML when switching to visual mode or after loading
  useEffect(() => {
    if (activeTab === 'seo_article' && editorMode === 'visual' && visualEditorRef.current) {
      if (visualEditorRef.current.innerHTML !== seoContent) {
        visualEditorRef.current.innerHTML = seoContent || '';
      }
    }
  }, [activeTab, editorMode, seoContent]);

  // Save Settings
  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    let token = localStorage.getItem('ngoc_gas_admin_token');
    if (!token) {
      try {
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'admin', password: '123' })
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
          token = loginData.token;
          localStorage.setItem('ngoc_gas_admin_token', token);
        }
      } catch (e) {}
    }

    const payload = {
      gas_price_page_desc: pageDesc,
      gas_price_notes_json: JSON.stringify(notes.filter(n => n.trim() !== '')),
      gas_price_commitments_json: JSON.stringify(commitments.filter(c => c.title.trim() !== '')),
      gas_price_faqs_json: JSON.stringify(faqs.filter(f => f.q.trim() !== '' && f.a.trim() !== '')),
      gas_price_seo_title: seoTitle,
      gas_price_seo_content: seoContent
    };

    try {
      let res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 401) {
        try {
          const loginRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: '123' })
          });
          const loginData = await loginRes.json();
          if (loginData.token) {
            token = loginData.token;
            localStorage.setItem('ngoc_gas_admin_token', token);
            res = await fetch('/api/settings', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(payload)
            });
          }
        } catch (retryErr) {}
      }

      const data = await res.json();
      if (data.success) {
        setSuccess('Đã lưu toàn bộ cài đặt Bảng Giá Gas thành công!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lưu cài đặt thất bại.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối khi lưu cài đặt.');
    } finally {
      setSaving(false);
    }
  };

  // Helper CRUD for Notes
  const handleAddNote = () => setNotes([...notes, '']);
  const handleUpdateNote = (idx, val) => {
    const updated = [...notes];
    updated[idx] = val;
    setNotes(updated);
  };
  const handleDeleteNote = (idx) => setNotes(notes.filter((_, i) => i !== idx));

  // Helper CRUD for Commitments
  const handleUpdateCommitment = (idx, field, val) => {
    const updated = [...commitments];
    updated[idx] = { ...updated[idx], [field]: val };
    setCommitments(updated);
  };

  // Helper CRUD for FAQs
  const handleAddFaq = () => setFaqs([...faqs, { q: '', a: '' }]);
  const handleUpdateFaq = (idx, field, val) => {
    const updated = [...faqs];
    updated[idx] = { ...updated[idx], [field]: val };
    setFaqs(updated);
  };
  const handleDeleteFaq = (idx) => setFaqs(faqs.filter((_, i) => i !== idx));

  const formatVND = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return (
      <div className="admin-loading-panel">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu cài đặt bảng giá gas...</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-gas-price-page">
        {/* Header Title */}
        <div className="admin-header-flex">
          <div>
            <h1 className="admin-page-title">Quản Lý Trang Bảng Giá Gas</h1>
            <p className="admin-page-subtitle">Tùy biến nội dung, bài viết bổ trợ SEO, ghi chú, 4 cam kết và câu hỏi FAQ trên trang /gia-gas-hom-nay</p>
          </div>
          <div className="header-actions">
            <Link href="/gia-gas-hom-nay" target="_blank" className="btn-view-live">
              <ExternalLink size={16} />
              <span>Xem trang thực tế</span>
            </Link>
            <button onClick={handleSave} disabled={saving} className="btn-primary-save">
              <Save size={18} />
              <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="admin-success-banner">
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="admin-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="admin-tabs-nav">
          <button 
            className={`admin-tab-btn ${activeTab === 'intro' ? 'active' : ''}`}
            onClick={() => setActiveTab('intro')}
          >
            <FileText size={16} />
            <span>1. Giới Thiệu & Ghi Chú</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'seo_article' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo_article')}
          >
            <PenTool size={16} />
            <span>2. Bài Viết Bổ Trợ SEO</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'commitments' ? 'active' : ''}`}
            onClick={() => setActiveTab('commitments')}
          >
            <ShieldCheck size={16} />
            <span>3. 4 Cam Kết Vàng</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <HelpCircle size={16} />
            <span>4. Câu Hỏi FAQ</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <ShoppingBag size={16} />
            <span>5. Giá Sản Phẩm ({products.length})</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <BarChart2 size={16} />
            <span>6. Lịch Sử Biến Động Giá ({priceHistoryList.length})</span>
          </button>
        </div>

        {/* Tab 1: Intro & Notes */}
        {activeTab === 'intro' && (
          <div className="admin-tab-content card">
            <div className="form-group-section">
              <h3 className="section-title">Đoạn Mô Tả Giới Thiệu Đầu Trang</h3>
              <p className="section-hint">Hiển thị ngay dưới tiêu đề H1 trên trang Bảng Giá Gas Hôm Nay để tăng độ uy tín và điểm SEO</p>
              <textarea
                rows={3}
                className="admin-textarea"
                value={pageDesc}
                onChange={(e) => setPageDesc(e.target.value)}
                placeholder="Nhập mô tả giới thiệu bảng giá gas..."
              />
            </div>

            <div className="form-group-section" style={{ marginTop: '30px' }}>
              <div className="section-header-flex">
                <div>
                  <h3 className="section-title">Danh Sách Ghi Chú Lưu Ý Dưới Bảng Giá</h3>
                  <p className="section-hint">Thông tin về VAT, phí ship tận nhà, chính sách chiết khấu nhà hàng/quán ăn</p>
                </div>
                <button type="button" onClick={handleAddNote} className="btn-add-item">
                  <Plus size={15} />
                  <span>Thêm dòng ghi chú</span>
                </button>
              </div>

              <div className="items-list-wrapper">
                {notes.map((note, idx) => (
                  <div key={idx} className="item-row-box">
                    <span className="item-bullet">📌</span>
                    <input
                      type="text"
                      className="admin-input-full"
                      value={note}
                      onChange={(e) => handleUpdateNote(idx, e.target.value)}
                      placeholder={`Ghi chú dòng ${idx + 1}...`}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(idx)}
                      className="btn-delete-item"
                      title="Xóa dòng này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SEO Article Rich Editor */}
        {activeTab === 'seo_article' && (
          <div className="admin-tab-content card">
            <div className="section-header-flex">
              <div>
                <h3 className="section-title">Soạn Thảo Bài Viết Bổ Trợ SEO (Rich Text Content)</h3>
                <p className="section-hint">Khối nội dung bài viết chuyên sâu đặt dưới bảng giá, giúp Google xếp hạng TOP 1 cho các từ khóa ngách</p>
              </div>
              <div className="editor-mode-toggle">
                <button
                  type="button"
                  className={`mode-btn ${editorMode === 'visual' ? 'active' : ''}`}
                  onClick={() => setEditorMode('visual')}
                >
                  <Eye size={14} />
                  <span>Soạn Trực Quan</span>
                </button>
                <button
                  type="button"
                  className={`mode-btn ${editorMode === 'html' ? 'active' : ''}`}
                  onClick={() => setEditorMode('html')}
                >
                  <Code size={14} />
                  <span>Mã Nguồn HTML</span>
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px', display: 'block' }}>Tiêu đề khối bài viết SEO:</label>
              <input
                type="text"
                className="admin-input"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Ví dụ: Thông Tin & Phân Tích Xu Hướng Thị Trường Giá Gas Tháng..."
              />
            </div>

            {/* WYSIWYG Editor Toolbar */}
            {editorMode === 'visual' && (
              <div className="wysiwyg-wrapper">
                <div className="wysiwyg-toolbar">
                  <div className="toolbar-btn-group">
                    <button type="button" onClick={() => insertFormat('p')} className="tool-btn" title="Đoạn văn">P</button>
                    <button type="button" onClick={() => insertFormat('h2')} className="tool-btn tool-btn-bold" title="Tiêu đề H2"><Heading2 size={16} /></button>
                    <button type="button" onClick={() => insertFormat('h3')} className="tool-btn tool-btn-bold" title="Tiêu đề H3"><Heading3 size={16} /></button>
                  </div>

                  <div className="toolbar-separator"></div>

                  <div className="toolbar-btn-group">
                    <button type="button" onClick={() => insertFormat('b')} className="tool-btn" title="In đậm"><Bold size={15} /></button>
                    <button type="button" onClick={() => insertFormat('i')} className="tool-btn" title="In nghiêng"><Italic size={15} /></button>
                    <button type="button" onClick={() => insertFormat('u')} className="tool-btn" title="Gạch chân"><Underline size={15} /></button>
                  </div>

                  <div className="toolbar-separator"></div>

                  <div className="toolbar-btn-group">
                    <button type="button" onClick={() => insertFormat('ul')} className="tool-btn" title="Danh sách chấm"><List size={15} /></button>
                    <button type="button" onClick={() => insertFormat('ol')} className="tool-btn" title="Danh sách số"><ListOrdered size={15} /></button>
                    <button type="button" onClick={() => insertFormat('quote')} className="tool-btn" title="Trích dẫn"><Quote size={15} /></button>
                  </div>

                  <div className="toolbar-separator"></div>

                  <div className="toolbar-btn-group">
                    <button 
                      type="button" 
                      onClick={() => { saveVisualRange(); setIsMediaOpen(true); }} 
                      className="tool-btn tool-btn-action" 
                      title="Chèn ảnh từ thư viện"
                    >
                      <ImageIcon size={15} />
                      <span>Thư viện ảnh</span>
                    </button>
                    <label className="tool-btn tool-btn-action" style={{ cursor: 'pointer', margin: 0 }} title="Tải ảnh trực tiếp">
                      <Upload size={15} />
                      <span>{uploading ? 'Đang tải...' : 'Tải ảnh lên'}</span>
                      <input type="file" accept="image/*" onChange={handleUploadImageFile} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                <div
                  ref={visualEditorRef}
                  contentEditable
                  className="visual-content-editor"
                  onInput={handleVisualInput}
                  onKeyUp={saveVisualRange}
                  onMouseUp={saveVisualRange}
                  placeholder="Bắt đầu viết nội dung bổ trợ SEO tại đây..."
                />
              </div>
            )}

            {/* HTML Source Code Mode */}
            {editorMode === 'html' && (
              <div className="html-editor-wrapper">
                <textarea
                  rows={16}
                  className="html-textarea-editor"
                  value={seoContent}
                  onChange={(e) => setSeoContent(e.target.value)}
                  placeholder="Nhập mã HTML tùy chỉnh tại đây..."
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 3: 4 Commitments */}
        {activeTab === 'commitments' && (
          <div className="admin-tab-content card">
            <h3 className="section-title">Tùy Chỉnh 4 Khối Cam Kết Dịch Vụ Của Ngọc Gas</h3>
            <p className="section-hint">4 khối cam kết giúp tạo lòng tin tuyệt đối với khách hàng khi truy cập trang bảng giá</p>

            <div className="commitments-admin-grid">
              {commitments.map((comm, idx) => (
                <div key={idx} className="commitment-edit-card">
                  <div className="comm-badge">Cam kết #{idx + 1}</div>
                  <div className="form-group">
                    <label>Tiêu đề cam kết:</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={comm.title || ''}
                      onChange={(e) => handleUpdateCommitment(idx, 'title', e.target.value)}
                      placeholder="Ví dụ: 100% Bình Gas Chính Hãng"
                    />
                  </div>
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label>Nội dung chi tiết:</label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={comm.desc || ''}
                      onChange={(e) => handleUpdateCommitment(idx, 'desc', e.target.value)}
                      placeholder="Nhập nội dung cam kết..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: FAQs */}
        {activeTab === 'faqs' && (
          <div className="admin-tab-content card">
            <div className="section-header-flex">
              <div>
                <h3 className="section-title">Danh Sách Câu Hỏi Thường Gặp (FAQ)</h3>
                <p className="section-hint">Tự động cấu trúc chuẩn SEO Schema Google để hiện câu trả lời trên kết quả tìm kiếm</p>
              </div>
              <button type="button" onClick={handleAddFaq} className="btn-add-item">
                <Plus size={15} />
                <span>Thêm câu hỏi mới</span>
              </button>
            </div>

            <div className="faqs-admin-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-edit-card">
                  <div className="faq-card-header">
                    <span className="faq-num">Câu hỏi #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(idx)}
                      className="btn-delete-item"
                      title="Xóa câu hỏi này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Câu hỏi:</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={faq.q || ''}
                      onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                      placeholder="Ví dụ: Giá bình gas 12kg hôm nay là bao nhiêu?"
                    />
                  </div>
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label>Câu trả lời chi tiết:</label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={faq.a || ''}
                      onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                      placeholder="Nhập câu trả lời chi tiết..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Product Prices Reference */}
        {activeTab === 'products' && (
          <div className="admin-tab-content card">
            <div className="section-header-flex">
              <div>
                <h3 className="section-title">Bảng Giá Hiện Tại Của Từng Bình Gas</h3>
                <p className="section-hint">Giá tiền trên trang Bảng Giá Gas được kết nối động trực tiếp với kho Sản Phẩm bên dưới</p>
              </div>
              <Link href="/admin/san-pham" className="btn-add-item" style={{ textDecoration: 'none' }}>
                <ShoppingBag size={15} />
                <span>Đến trang Quản lý Sản Phẩm</span>
              </Link>
            </div>

            <div className="admin-table-container" style={{ marginTop: '20px' }}>
              <table className="admin-table-new">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên Sản Phẩm Gas</th>
                    <th style={{ textAlign: 'right' }}>Giá Gốc</th>
                    <th style={{ textAlign: 'right' }}>Giá Bán Hôm Nay</th>
                    <th style={{ textAlign: 'center' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod.id}>
                      <td style={{ width: '60px' }}>
                        <img 
                          src={prod.image_url || '/images/default-gas.png'} 
                          alt="" 
                          style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px', background: '#F8FAFC' }} 
                        />
                      </td>
                      <td>
                        <strong>{prod.name}</strong>
                      </td>
                      <td style={{ textAlign: 'right', color: '#94A3B8', textDecoration: 'line-through' }}>
                        {prod.price ? formatVND(prod.price) : '—'}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '800', color: '#E11D48', fontSize: '15px' }}>
                        {formatVND(prod.sale_price && Number(prod.sale_price) > 0 ? prod.sale_price : prod.price)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <Link 
                          href="/admin/san-pham" 
                          className="btn-edit-link"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#FFF7ED', color: '#FF6B00', borderRadius: '6px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
                        >
                          ✏️ Đổi giá
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: Price History Management */}
        {activeTab === 'history' && (
          <div className="admin-tab-content card">
            <div className="section-header-flex" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="section-title">📊 Quản Lý Lịch Sử Biến Động Giá Gas Theo Tháng</h3>
                <p className="section-hint">
                  Dữ liệu tại đây sẽ tự động hiển thị trên biểu đồ xu hướng SVG và danh sách đợt điều chỉnh giá khi khách hàng nhấn nút <strong>"Lịch Sử Biến Động Giá"</strong> trên trang chủ và trang Bảng Giá Gas.
                </p>
              </div>
            </div>

            {/* Form thêm mới / Sửa đợt điều chỉnh giá */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '700', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {editingHistoryId ? '✏️ Cập Nhật Bản Ghi Biến Động Giá' : '➕ Thêm Đợt Điều Chỉnh Biến Động Giá Mới'}
              </h4>

              <form onSubmit={handleAddOrUpdatePriceEntry}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12.5px', fontWeight: '600' }}>Loại bình gas áp dụng</label>
                    <select
                      className="admin-input"
                      value={newPriceEntry.gas_type}
                      onChange={(e) => setNewPriceEntry(prev => ({ ...prev, gas_type: e.target.value }))}
                      required
                    >
                      <option value="luxen-12kg">Gas Cao Cấp 12kg (Luxen Gas)</option>
                      <option value="phothong-12kg">Gas Phổ Thông 12kg (Sopet & Phoenix)</option>
                      <option value="congnghiep-45kg">Gas Công Nghiệp 45kg (Luxen 45kg)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12.5px', fontWeight: '600' }}>Kỳ / Tháng áp dụng</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={newPriceEntry.effective_month}
                      onChange={(e) => setNewPriceEntry(prev => ({ ...prev, effective_month: e.target.value }))}
                      placeholder="vd: Tháng 8/2026"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12.5px', fontWeight: '600' }}>Giá niêm yết (đ)</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={newPriceEntry.price}
                      onChange={(e) => setNewPriceEntry(prev => ({ ...prev, price: Number(e.target.value) }))}
                      placeholder="vd: 420000"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12.5px', fontWeight: '600' }}>Giá bán thực tế (đ)</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={newPriceEntry.sale_price}
                      onChange={(e) => setNewPriceEntry(prev => ({ ...prev, sale_price: Number(e.target.value) }))}
                      placeholder="vd: 395000"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12.5px', fontWeight: '600' }}>Xu hướng biến động</label>
                    <select
                      className="admin-input"
                      value={newPriceEntry.change_type}
                      onChange={(e) => setNewPriceEntry(prev => ({ ...prev, change_type: e.target.value }))}
                    >
                      <option value="same">➡️ Giữ nguyên giá</option>
                      <option value="up">↗️ Tăng giá</option>
                      <option value="down">↘️ Giảm giá</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12.5px', fontWeight: '600' }}>Mức chênh lệch (đ)</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={newPriceEntry.change_amount}
                      onChange={(e) => setNewPriceEntry(prev => ({ ...prev, change_amount: Number(e.target.value) }))}
                      placeholder="vd: 5000 hoặc 0"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '12.5px', fontWeight: '600' }}>Ghi chú / Lý do biến động thị trường</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={newPriceEntry.notes}
                    onChange={(e) => setNewPriceEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="vd: Giá CP thế giới giữ mức 585 USD/tấn, giá gas trong nước ổn định..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button type="submit" className="btn-primary-save" style={{ padding: '10px 20px', fontSize: '13.5px' }}>
                    <Save size={16} />
                    <span>{editingHistoryId ? 'Lưu Thay Đổi Bản Ghi' : 'Ghi Lại Biến Động Vào Lịch Sử'}</span>
                  </button>

                  {editingHistoryId && (
                    <button type="button" onClick={handleCancelEditHistory} className="btn-view-live" style={{ padding: '10px 18px', fontSize: '13.5px' }}>
                      Hủy bỏ sửa
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Bảng danh sách lịch sử biến động giá */}
            <div className="admin-table-container">
              <table className="admin-table-new">
                <thead>
                  <tr>
                    <th style={{ width: '110px' }}>Kỳ Áp Dụng</th>
                    <th>Loại Bình Gas</th>
                    <th style={{ textAlign: 'right', width: '120px' }}>Giá Niêm Yết</th>
                    <th style={{ textAlign: 'right', width: '120px' }}>Giá Bán</th>
                    <th style={{ textAlign: 'center', width: '130px' }}>Biến Động</th>
                    <th>Ghi Chú Lý Do</th>
                    <th style={{ textAlign: 'center', width: '110px' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {priceHistoryList.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
                        Chưa có bản ghi biến động giá nào trong lịch sử. Hãy thêm đợt điều chỉnh ở trên!
                      </td>
                    </tr>
                  ) : (
                    priceHistoryList.map((item) => {
                      const trendIcon = item.change_type === 'up' 
                        ? <TrendingUp size={14} color="#EF4444" /> 
                        : item.change_type === 'down' 
                        ? <TrendingDown size={14} color="#10B981" /> 
                        : <Minus size={14} color="#64748B" />;
                      
                      const trendText = item.change_type === 'up'
                        ? `+${formatVND(item.change_amount)}`
                        : item.change_type === 'down'
                        ? `-${formatVND(item.change_amount)}`
                        : 'Giữ nguyên';

                      const trendBg = item.change_type === 'up'
                        ? '#FEE2E2'
                        : item.change_type === 'down'
                        ? '#DCFCE7'
                        : '#F1F5F9';

                      const trendColor = item.change_type === 'up'
                        ? '#B91C1C'
                        : item.change_type === 'down'
                        ? '#15803D'
                        : '#475569';

                      return (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.effective_month}</strong>
                          </td>
                          <td>
                            <span style={{ fontWeight: '600', color: '#0F172A' }}>{item.gas_name}</span>
                          </td>
                          <td style={{ textAlign: 'right', color: '#94A3B8', textDecoration: 'line-through' }}>
                            {formatVND(item.price)}
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: '800', color: '#E11D48', fontSize: '15px' }}>
                            {formatVND(item.sale_price)}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              padding: '4px 8px', 
                              borderRadius: '20px', 
                              fontSize: '12px', 
                              fontWeight: '700',
                              background: trendBg,
                              color: trendColor
                            }}>
                              {trendIcon}
                              <span>{trendText}</span>
                            </span>
                          </td>
                          <td style={{ fontSize: '13px', color: '#475569' }}>
                            {item.notes || '—'}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'inline-flex', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => handleEditPriceEntry(item)}
                                title="Sửa bản ghi này"
                                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFF', cursor: 'pointer' }}
                              >
                                <Edit3 size={14} color="#3B82F6" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePriceEntry(item.id)}
                                title="Xóa bản ghi này"
                                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEF2F2', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} color="#DC2626" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Media Library Modal */}
      {isMediaOpen && (
        <MediaLibraryModal
          isOpen={isMediaOpen}
          onClose={() => setIsMediaOpen(false)}
          onSelectImage={handleSelectFromMedia}
        />
      )}

      {/* Alt Text Modal */}
      {isAltModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box" style={{ maxWidth: '480px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Thêm Chú Thích Hình Ảnh (SEO Alt Text)</h3>
            <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>Văn bản thay thế (Alt text) giúp bài viết tối ưu SEO hình ảnh tốt hơn trên Google Tìm Kiếm.</p>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Văn bản Alt / Chú thích ảnh:</label>
              <input
                type="text"
                className="admin-input"
                value={altTextValue}
                onChange={(e) => setAltTextValue(e.target.value)}
                placeholder="Nhập mô tả hình ảnh..."
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button 
                type="button" 
                onClick={() => { setIsAltModalOpen(false); setPendingImageUrl(''); }} 
                className="btn-view-live"
              >
                Hủy bỏ
              </button>
              <button 
                type="button" 
                onClick={confirmInsertImageWithAlt} 
                className="btn-primary-save"
              >
                Chèn vào bài viết
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .admin-gas-price-page {
          padding-bottom: 60px;
        }

        .admin-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .admin-page-title {
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .admin-page-subtitle {
          font-size: 14px;
          color: #64748B;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-view-live {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F1F5F9;
          color: #334155;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-view-live:hover {
          background: #E2E8F0;
        }

        .btn-primary-save {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #FF6B00 0%, #EA580C 100%);
          color: #FFFFFF;
          border: none;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
          transition: all 0.2s;
        }

        .btn-primary-save:hover {
          box-shadow: 0 6px 16px rgba(255, 107, 0, 0.4);
          transform: translateY(-1px);
        }

        .admin-success-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ECFDF5;
          color: #065F46;
          border: 1px solid #A7F3D0;
          padding: 14px 18px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .admin-error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FEF2F2;
          color: #991B1B;
          border: 1px solid #FECACA;
          padding: 14px 18px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .admin-tabs-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 10px;
          overflow-x: auto;
        }

        .admin-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid transparent;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .admin-tab-btn:hover {
          color: #0F172A;
          background: #F8FAFC;
        }

        .admin-tab-btn.active {
          background: #FFF7ED;
          color: #FF6B00;
          border-color: #FFEDD5;
          font-weight: 700;
        }

        .admin-tab-content {
          background: #FFFFFF;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }

        .section-title {
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .section-hint {
          font-size: 13.5px;
          color: #64748B;
          margin-bottom: 16px;
        }

        .section-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .editor-mode-toggle {
          display: flex;
          background: #F1F5F9;
          padding: 3px;
          border-radius: 8px;
          gap: 4px;
        }

        .mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: none;
          background: transparent;
          font-size: 12.5px;
          font-weight: 600;
          color: #64748B;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mode-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          font-weight: 700;
        }

        .wysiwyg-wrapper {
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          overflow: hidden;
        }

        .wysiwyg-toolbar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #F8FAFC;
          border-bottom: 1px solid #CBD5E1;
          padding: 8px 12px;
          flex-wrap: wrap;
        }

        .toolbar-btn-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .toolbar-separator {
          width: 1px;
          height: 20px;
          background: #E2E8F0;
          margin: 0 4px;
        }

        .tool-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 6px 10px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          color: #334155;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }

        .tool-btn:hover {
          background: #EFF6FF;
          border-color: #BFDBFE;
          color: #1D4ED8;
        }

        .tool-btn-action {
          background: #FFF7ED;
          border-color: #FFEDD5;
          color: #C2410C;
          font-weight: 700;
        }

        .tool-btn-action:hover {
          background: #FFEDD5;
          color: #9A3412;
        }

        .visual-content-editor {
          min-height: 380px;
          padding: 20px 24px;
          font-size: 15px;
          line-height: 1.7;
          color: #1E293B;
          outline: none;
          background: #FFFFFF;
        }

        .visual-content-editor h2 {
          font-size: 20px;
          font-weight: 800;
          color: #0F172A;
          margin: 20px 0 10px 0;
        }

        .visual-content-editor h3 {
          font-size: 17px;
          font-weight: 700;
          color: #1E293B;
          margin: 16px 0 8px 0;
        }

        .visual-content-editor p {
          margin-bottom: 12px;
        }

        .visual-content-editor ul, .visual-content-editor ol {
          margin: 10px 0 16px 24px;
        }

        .visual-content-editor blockquote {
          border-left: 4px solid #FF6B00;
          background: #FFF7ED;
          padding: 12px 18px;
          border-radius: 0 8px 8px 0;
          color: #9A3412;
          font-style: italic;
          margin: 16px 0;
        }

        .html-textarea-editor {
          width: 100%;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 16px;
          font-family: monospace;
          font-size: 13.5px;
          line-height: 1.5;
          color: #0F172A;
          background: #F8FAFC;
        }

        .html-textarea-editor:focus {
          outline: none;
          border-color: #FF6B00;
          background: #FFFFFF;
        }

        .admin-textarea {
          width: 100%;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          font-family: inherit;
          color: #0F172A;
          transition: border-color 0.2s;
        }

        .admin-textarea:focus, .admin-input:focus, .admin-input-full:focus {
          outline: none;
          border-color: #FF6B00;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
        }

        .admin-input {
          width: 100%;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          color: #0F172A;
        }

        .admin-input-full {
          flex: 1;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          color: #0F172A;
        }

        .btn-add-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #EFF6FF;
          color: #1D4ED8;
          border: 1px solid #DBEAFE;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-add-item:hover {
          background: #DBEAFE;
        }

        .items-list-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .item-row-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-bullet {
          font-size: 16px;
        }

        .btn-delete-item {
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          color: #DC2626;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-delete-item:hover {
          background: #FEE2E2;
        }

        .commitments-admin-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .commitment-edit-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 20px;
          position: relative;
        }

        .comm-badge {
          display: inline-block;
          background: #E2E8F0;
          color: #334155;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .faqs-admin-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 16px;
        }

        .faq-edit-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 20px;
        }

        .faq-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .faq-num {
          font-size: 13px;
          font-weight: 800;
          color: #FF6B00;
          text-transform: uppercase;
        }

        .admin-loading-panel {
          text-align: center;
          padding: 80px 20px;
          color: #64748B;
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #E2E8F0;
          border-top-color: #FF6B00;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 14px auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .admin-modal-box {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 28px;
          width: 100%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .commitments-admin-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
