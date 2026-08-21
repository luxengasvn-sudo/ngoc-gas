'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle, Upload, Bold, Italic, Type, Image as ImageIcon, Search, Check, Info, Globe, Link2, ShoppingBag } from 'lucide-react';
import MediaLibraryModal from '@/components/MediaLibraryModal';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState('image_url'); // 'image_url' | 'content'
  const [editorMode, setEditorMode] = useState('split'); // 'split' | 'code' | 'visual'

  // Product insertion states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // Alt Text Modal states
  const [isAltModalOpen, setIsAltModalOpen] = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState('');
  const [altTextValue, setAltTextValue] = useState('');

  // Floating Link Tooltip State
  const [linkTooltip, setLinkTooltip] = useState({
    visible: false,
    url: '',
    targetNode: null,
    top: 0,
    left: 0
  });

  // Floating Heading Tooltip State
  const [headingTooltip, setHeadingTooltip] = useState({
    visible: false,
    currentTag: 'p',
    targetNode: null,
    top: 0,
    left: 0
  });

  const visualEditorRef = useRef(null);
  const lastSelectionRangeRef = useRef(null);

  const handleEditorClick = (e) => {
    if (!visualEditorRef.current) return;
    
    // Check link click
    const anchor = e.target.closest('a');
    if (anchor && visualEditorRef.current.contains(anchor)) {
      const rect = anchor.getBoundingClientRect();
      setLinkTooltip({
        visible: true,
        url: anchor.getAttribute('href') || '',
        targetNode: anchor,
        top: rect.bottom + 6,
        left: Math.max(10, rect.left)
      });
      setHeadingTooltip(prev => ({ ...prev, visible: false }));
      return;
    } else {
      setLinkTooltip(prev => ({ ...prev, visible: false }));
    }

    // Check heading click (h2, h3, h4)
    const headingBlock = e.target.closest('h2, h3, h4');
    if (headingBlock && visualEditorRef.current.contains(headingBlock)) {
      const rect = headingBlock.getBoundingClientRect();
      const tagName = headingBlock.tagName.toLowerCase();
      setHeadingTooltip({
        visible: true,
        currentTag: tagName,
        targetNode: headingBlock,
        top: rect.top - 38 > 10 ? rect.top - 38 : rect.bottom + 6,
        left: Math.max(10, rect.left)
      });
    } else {
      setHeadingTooltip(prev => ({ ...prev, visible: false }));
    }
  };

  const convertHeadingTag = (newTag) => {
    if (!headingTooltip.targetNode) return;
    const oldNode = headingTooltip.targetNode;
    const newNode = document.createElement(newTag);
    newNode.innerHTML = oldNode.innerHTML;
    if (oldNode.className) newNode.className = oldNode.className;
    oldNode.parentNode.replaceChild(newNode, oldNode);
    handleVisualInput();
    setHeadingTooltip({
      visible: true,
      currentTag: newTag,
      targetNode: newNode,
      top: headingTooltip.top,
      left: headingTooltip.left
    });
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (typeof window === 'undefined') return;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && visualEditorRef.current) {
        try {
          const range = sel.getRangeAt(0);
          if (visualEditorRef.current.contains(range.commonAncestorContainer)) {
            lastSelectionRangeRef.current = range.cloneRange();
          }
        } catch (e) {}
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const saveVisualRange = () => {
    if (typeof window === 'undefined') return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && visualEditorRef.current) {
      try {
        const range = sel.getRangeAt(0);
        if (visualEditorRef.current.contains(range.commonAncestorContainer)) {
          lastSelectionRangeRef.current = range.cloneRange();
        }
      } catch (e) {}
    }
  };

  const restoreVisualRange = () => {
    if (typeof window === 'undefined' || !lastSelectionRangeRef.current) return;
    const sel = window.getSelection();
    if (sel) {
      try {
        sel.removeAllRanges();
        sel.addRange(lastSelectionRangeRef.current);
      } catch (e) {}
    }
  };

  const insertHTMLAtSavedRange = (html) => {
    if (!visualEditorRef.current) return;

    const sel = window.getSelection();
    let range = null;

    if (lastSelectionRangeRef.current) {
      try {
        const testRange = lastSelectionRangeRef.current;
        if (visualEditorRef.current.contains(testRange.commonAncestorContainer)) {
          range = testRange;
        }
      } catch (e) {}
    }

    if (!range && sel && sel.rangeCount > 0) {
      try {
        const testRange = sel.getRangeAt(0);
        if (visualEditorRef.current.contains(testRange.commonAncestorContainer)) {
          range = testRange;
        }
      } catch (e) {}
    }

    if (!range) {
      try {
        range = document.createRange();
        range.selectNodeContents(visualEditorRef.current);
        range.collapse(false); // Collapse to end of editor, never to top
      } catch (e) {}
    }

    if (sel && range) {
      try {
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {}
    }

    if (range) {
      range.deleteContents();
      const div = document.createElement('div');
      div.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node, lastNode;
      while ((node = div.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      if (lastNode) {
        try {
          const newRange = document.createRange();
          newRange.setStartAfter(lastNode);
          newRange.collapse(true);
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(newRange);
          }
          lastSelectionRangeRef.current = newRange.cloneRange();
        } catch (e) {}
      }
    }

    handleVisualInput();
  };

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | published | draft

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    is_published: true
  });

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await fetch('/api/posts', { headers });
      const data = await res.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        setError('Không thể lấy danh sách bài viết.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API bài viết.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Synchronize visualEditorRef content ONCE when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        if (visualEditorRef.current) {
          visualEditorRef.current.innerHTML = formData.content || '<p>Nhập nội dung bài viết trực quan tại đây...</p>';
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const fetchProductsList = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProductList(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleOpenProductModal = () => {
    fetchProductsList();
    setIsProductModalOpen(true);
  };

  const handleInsertProductToArticle = (prod) => {
    const priceDisplay = prod.price ? Number(prod.price).toLocaleString('vi-VN') + ' đ' : 'Liên hệ báo giá';
    const productHtml = `<div class="article-product-card" style="display: flex; align-items: center; gap: 20px; background: #FFF7ED; border: 1.5px solid #FFEDD5; border-radius: 14px; padding: 18px; margin: 24px 0; box-shadow: 0 4px 14px rgba(255,107,0,0.08);"><img src="${prod.image_url || '/images/gas-cylinder.png'}" alt="${prod.name}" style="width: 86px; height: 86px; object-fit: contain; background: #FFFFFF; border-radius: 10px; padding: 6px; border: 1px solid #FED7AA; flex-shrink: 0;" /><div style="flex: 1;"><span style="font-size: 11px; font-weight: 800; color: #FF6B00; text-transform: uppercase; letter-spacing: 0.6px; display: block; margin-bottom: 2px;">Sản phẩm chính hãng Ngọc Gas</span><h4 style="margin: 0 0 4px 0; font-size: 17px; font-weight: 700; color: #0F172A;">${prod.name}</h4><div style="font-size: 16px; font-weight: 800; color: #DC2626; margin-bottom: 10px;">${priceDisplay}</div><a href="/san-pham/${prod.slug}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: linear-gradient(135deg, #FF6B00 0%, #E65C00 100%); color: #FFFFFF; font-size: 13px; font-weight: bold; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(255,107,0,0.25);"><span>🛒 Xem chi tiết & Đặt gas ngay</span></a></div></div><p><br/></p>`;

    insertHTMLAtSavedRange(productHtml);
    setIsProductModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setCurrentPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      is_published: true
    });
    setError('');
    setIsModalOpen(true);
    setTimeout(() => {
      if (visualEditorRef.current) {
        visualEditorRef.current.innerHTML = '<p>Nhập nội dung bài viết trực quan tại đây...</p>';
      }
    }, 100);
  };

  const handleOpenEditModal = (post) => {
    setCurrentPost(post);
    const initialContent = post.content || '';
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: initialContent,
      image_url: post.image_url || '',
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      is_published: post.is_published === 1
    });
    setError('');
    setIsModalOpen(true);
    setTimeout(() => {
      if (visualEditorRef.current) {
        visualEditorRef.current.innerHTML = initialContent || '<p>Nhập nội dung bài viết trực quan tại đây...</p>';
      }
    }, 100);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'title' && !currentPost) {
      const slugVal = value
        .toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: slugVal
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

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
      } catch (authErr) {}
    }

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      let res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
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
            res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` },
              body: uploadData
            });
          }
        } catch (retryErr) {}
      }

      const data = await res.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image_url: data.url }));
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

  const handleInsertImageIntoDesc = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    saveVisualRange();
    setUploading(true);
    setError('');

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
      } catch (authErr) {}
    }

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      let res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
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
            res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` },
              body: uploadData
            });
          }
        } catch (retryErr) {}
      }

      const data = await res.json();

      if (data.success && data.url) {
        const altText = formData.title || 'Hình ảnh bài viết Ngọc Gas';
        const figureHtml = `<figure style="margin: 20px auto; text-align: center; max-width: 100%;"><img src="${data.url}" alt="${altText}" title="${altText}" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.08);" /><figcaption style="margin-top: 6px; font-size: 13.5px; color: #64748B; font-style: italic;">📷 ${altText}</figcaption></figure><p><br/></p>`;
        insertHTMLAtSavedRange(figureHtml);
      } else {
        setError(data.message || 'Lỗi khi upload ảnh cho bài viết');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload ảnh.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleVisualInput = () => {
    if (visualEditorRef.current) {
      const html = visualEditorRef.current.innerHTML;
      setFormData(prev => ({ ...prev, content: html }));
    }
  };

  const handleSelectFromMedia = (url) => {
    if (mediaTarget === 'content') {
      const altText = formData.title || 'Hình ảnh bài viết Ngọc Gas';
      const figureHtml = `<figure style="margin: 20px auto; text-align: center; max-width: 100%;"><img src="${url}" alt="${altText}" title="${altText}" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.08);" /><figcaption style="margin-top: 6px; font-size: 13.5px; color: #64748B; font-style: italic;">📷 ${altText}</figcaption></figure><p><br/></p>`;
      insertHTMLAtSavedRange(figureHtml);
    } else {
      setFormData(prev => ({ ...prev, image_url: url }));
    }
    setIsMediaOpen(false);
  };

  const confirmInsertImageWithAlt = () => {
    if (!pendingImageUrl) return;
    const altText = altTextValue.trim() || formData.title || 'Hình ảnh bài viết Ngọc Gas';
    const figureHtml = `<figure style="margin: 20px auto; text-align: center; max-width: 100%;"><img src="${pendingImageUrl}" alt="${altText}" title="${altText}" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.08);" /><figcaption style="margin-top: 6px; font-size: 13.5px; color: #64748B; font-style: italic;">📷 ${altText}</figcaption></figure><p><br/></p>`;

    insertHTMLAtSavedRange(figureHtml);
    setIsAltModalOpen(false);
    setPendingImageUrl('');
  };

  const insertFormat = (tag) => {
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
      restoreVisualRange();
      if (tag === 'b') document.execCommand('bold', false, null);
      else if (tag === 'i') document.execCommand('italic', false, null);
      else if (tag === 'p') document.execCommand('formatBlock', false, '<p>');
      else if (tag === 'h2') document.execCommand('formatBlock', false, '<h2>');
      else if (tag === 'h3') document.execCommand('formatBlock', false, '<h3>');
      else if (tag === 'h4') document.execCommand('formatBlock', false, '<h4>');
      handleVisualInput();
    }
  };

  const insertLink = () => {
    if (!visualEditorRef.current) return;
    visualEditorRef.current.focus();
    restoreVisualRange();

    const sel = window.getSelection();
    let existingAnchor = null;

    if (sel && sel.anchorNode) {
      let curr = sel.anchorNode;
      if (curr.nodeType === 3) curr = curr.parentNode;
      while (curr && curr !== visualEditorRef.current) {
        if (curr.tagName === 'A') {
          existingAnchor = curr;
          break;
        }
        curr = curr.parentNode;
      }
    }

    if (existingAnchor) {
      const currentUrl = existingAnchor.getAttribute('href') || 'https://';
      const action = prompt(
        `🔗 CỤM TỪ NÀY ĐANG ĐƯỢC CHÈN LINK:\n${currentUrl}\n\n• Nhập URL MỚI nếu muốn đổi link.\n• Nhập chữ 'x' (hoặc để trống) rồi bấm OK nếu muốn XÓA LINK (Hủy liên kết):`,
        currentUrl
      );

      if (action === null) return;

      const trimmed = action.trim();
      if (trimmed === '' || trimmed.toLowerCase() === 'x' || trimmed.toLowerCase() === 'xoa') {
        document.execCommand('unlink', false, null);
      } else {
        existingAnchor.setAttribute('href', trimmed);
      }
    } else {
      const url = prompt('🔗 Nhập địa chỉ liên kết (URL) để chèn vào từ được chọn:', 'https://');
      if (!url || !url.trim()) return;

      document.execCommand('createLink', false, url.trim());
    }

    handleVisualInput();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.slug.trim()) {
      setError('Tiêu đề và slug là bắt buộc');
      return;
    }

    const finalContent = visualEditorRef.current ? visualEditorRef.current.innerHTML : formData.content;

    const payload = {
      ...formData,
      content: finalContent
    };

    setUploading(true);
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
      } catch (authErr) {}
    }

    const url = currentPost ? `/api/posts/${currentPost.id}` : '/api/posts';
    const method = currentPost ? 'PUT' : 'POST';

    try {
      let res = await fetch(url, {
        method,
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
            res = await fetch(url, {
              method,
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
        setSuccess(currentPost ? 'Cập nhật bài viết thành công!' : 'Thêm bài viết thành công!');
        setIsModalOpen(false);
        fetchPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lưu bài viết thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi khi lưu bài viết.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    setError('');

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
      } catch (authErr) {}
    }

    try {
      let res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
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
            res = await fetch(`/api/posts/${postId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            });
          }
        } catch (retryErr) {}
      }

      const data = await res.json();

      if (data.success) {
        setSuccess('Đã xóa bài viết thành công!');
        fetchPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Xóa bài viết thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API xóa.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'published') matchesStatus = post.is_published === 1;
    else if (statusFilter === 'draft') matchesStatus = post.is_published === 0;

    return matchesSearch && matchesStatus;
  });

  // SEO Fallbacks
  const seoTitle = formData.meta_title || formData.title || 'Tiêu đề bài viết';
  const seoDesc = formData.meta_description || formData.excerpt || 'Nhập tóm tắt hoặc viết mô tả SEO để hiển thị tại đây trên kết quả tìm kiếm của Google...';

  return (
    <>
      <div className="admin-posts-page">
        {/* Banner header chuyên nghiệp */}
        <div className="admin-header-panel card">
          <div className="header-panel-left">
            <span className="panel-badge">Tin tức & Khuyến mãi</span>
            <h1 className="panel-main-title">Quản lý Bài viết</h1>
            <p className="panel-subtitle">Soạn thảo các hướng dẫn an toàn sử dụng gas, chương trình quà tặng, tin tức khuyến mãi và tối ưu hóa SEO bài viết.</p>
          </div>
          <button onClick={handleOpenAddModal} className="btn btn-primary btn-add-new-prod">
            <Plus size={18} />
            <span>Viết bài mới</span>
          </button>
        </div>

        {success && (
          <div className="admin-success-banner" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Check size={18} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="admin-error-banner" style={{ marginTop: '20px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Toolbar panel */}
        <div className="admin-toolbar-panel card">
          <div className="toolbar-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tiêu đề, slug bài viết..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="toolbar-input"
            />
          </div>

          <div className="status-tabs-row">
            <button 
              type="button" 
              onClick={() => setStatusFilter('all')} 
              className={`status-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            >
              Tất cả ({posts.length})
            </button>
            <button 
              type="button" 
              onClick={() => setStatusFilter('published')} 
              className={`status-tab-btn ${statusFilter === 'published' ? 'active' : ''}`}
            >
              Đã xuất bản ({posts.filter(p => p.is_published === 1).length})
            </button>
            <button 
              type="button" 
              onClick={() => setStatusFilter('draft')} 
              className={`status-tab-btn ${statusFilter === 'draft' ? 'active' : ''}`}
            >
              Bản nháp ({posts.filter(p => p.is_published === 0).length})
            </button>
          </div>
        </div>

        {/* Table list */}
        {loading ? (
          <div className="admin-loading-skeleton card">
            <div className="skeleton-line header-skeleton"></div>
            <div className="skeleton-line row-skeleton"></div>
            <div className="skeleton-line row-skeleton"></div>
          </div>
        ) : (
          <div className="admin-table-container card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '50%' }}>Tiêu đề bài viết</th>
                  <th style={{ width: '20%' }}>Ngày đăng</th>
                  <th style={{ width: '15%', textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <tr key={post.id} className="admin-table-row">
                      <td>
                        <div className="prod-meta-cell">
                          <div className="prod-thumb-container">
                            {post.image_url ? (
                              <img src={post.image_url} alt="" className="prod-table-thumb" style={{ objectFit: 'cover' }} />
                            ) : (
                              <ImageIcon size={20} className="prod-table-placeholder" />
                            )}
                          </div>
                          <div className="prod-title-box">
                            <span className="prod-name-bold">{post.title}</span>
                            <span className="prod-slug-sub">{post.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td>{formatDate(post.created_at)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-pill ${post.is_published === 1 ? 'active' : 'inactive'}`}>
                          {post.is_published === 1 ? 'Đã đăng' : 'Bản nháp'}
                        </span>
                      </td>
                      <td className="actions-cell-new">
                        <button onClick={() => handleOpenEditModal(post)} className="action-btn edit-btn-new" title="Sửa bài viết">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="action-btn delete-btn-new" title="Xóa bài viết">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                      Không tìm thấy bài viết nào khớp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Editor dạng 2 cột hỗ trợ SEO */}
        {isModalOpen && (
          <div className="admin-modal-overlay-new" style={{ zIndex: 1000 }}>
            <div className="admin-modal-content-new card" style={{ maxWidth: '1200px', width: '95vw' }}>
              <div className="modal-header-new">
                <div>
                  <span className="modal-badge-top">{currentPost ? 'Biên tập bài viết' : 'Viết bài mới'}</span>
                  <h2>{currentPost ? 'Chỉnh sửa nội dung & SEO Bài viết' : 'Soạn thảo bài viết mới (WordPress Style)'}</h2>
                </div>
                <button onClick={handleCloseModal} className="modal-close-btn-new">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-body-form-new">
                {error && (
                  <div style={{ padding: '12px 16px', background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>⚠️ {error}</span>
                  </div>
                )}
                {/* TẦNG 1: THÔNG TIN BÀI VIẾT & ẢNH BÌA */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', marginBottom: '24px' }}>
                  {/* Cột trái: Thông tin cơ bản */}
                  <div className="form-section-card" style={{ margin: 0 }}>
                    <h3 className="section-card-title">1. Thông tin bài viết</h3>
                    <div className="form-group">
                      <label htmlFor="title" className="form-label-new">Tiêu đề bài viết *</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control-new"
                        style={{ fontSize: '16px', fontWeight: 'bold' }}
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Nhập tiêu đề hấp dẫn thu hút người đọc..."
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="slug" className="form-label-new">URL Slug *</label>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        className="form-control-new"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="vd: huong-dan-doi-ga-an-toan"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="excerpt" className="form-label-new">Tóm tắt ngắn (Hiển thị ngoài danh mục tin tức)</label>
                      <textarea
                        id="excerpt"
                        name="excerpt"
                        className="form-control-new"
                        rows="2"
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="Tóm tắt ngắn gọn nội dung bài viết từ 1 đến 2 câu..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Cột phải: Ảnh bìa bài viết */}
                  <div className="form-section-card" style={{ margin: 0 }}>
                    <h3 className="section-card-title">2. Ảnh bìa đại diện bài viết</h3>
                    <div className="main-image-upload-zone" style={{ height: '140px' }}>
                      {formData.image_url ? (
                        <div className="uploaded-image-preview-box" style={{ height: '100%' }}>
                          <img src={formData.image_url} alt="" className="preview-img-main" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                          <button type="button" onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))} className="remove-image-overlay-btn" title="Xóa ảnh">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="image-drop-zone-trigger" style={{ padding: '16px' }}>
                          <Upload size={24} className="upload-zone-icon" />
                          <strong style={{ fontSize: '13px' }}>Tải ảnh bìa bài viết</strong>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileUpload} 
                            style={{ display: 'none' }} 
                            disabled={uploading}
                          />
                        </label>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => { setMediaTarget('image_url'); setIsMediaOpen(true); }}
                        className="btn-add-album-new"
                        style={{ width: '100%', justifyContent: 'center', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1E293B', cursor: 'pointer', fontSize: '13px' }}
                      >
                        <ImageIcon size={14} color="#FF6B00" />
                        <span>🖼️ Chọn từ thư viện</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* TẦNG 2: KHUNG SOẠN THẢO BÀI VIẾT (FULL WIDTH 100%) */}
                <div className="form-section-card" style={{ marginBottom: '24px', overflow: 'visible' }}>
                  <div style={{
                    position: 'sticky',
                    top: '72px',
                    zIndex: 200,
                    backgroundColor: '#FFFFFF',
                    paddingTop: '8px',
                    paddingBottom: '12px',
                    marginBottom: '14px',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}>
                    <h3 className="section-card-title" style={{ margin: 0 }}>Nội dung chi tiết bài viết</h3>

                    <div className="editor-toolbar-new" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', background: '#F8FAFC', padding: '8px 14px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
                      <button type="button" onClick={() => insertFormat('b')} className="editor-tool-btn" style={{ minWidth: '38px', height: '38px', padding: '0 10px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: '#0F172A' }} title="Chữ đậm (Bold)"><Bold size={18} strokeWidth={2.5} /></button>
                      <button type="button" onClick={() => insertFormat('i')} className="editor-tool-btn" style={{ minWidth: '38px', height: '38px', padding: '0 10px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: '#0F172A' }} title="Chữ nghiêng (Italic)"><Italic size={18} strokeWidth={2.5} /></button>
                      <button type="button" onClick={() => insertFormat('p')} className="editor-tool-btn" style={{ minWidth: '38px', height: '38px', padding: '0 10px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: '#0F172A' }} title="Đoạn văn (Paragraph)"><Type size={18} strokeWidth={2.5} /></button>
                      <button type="button" onClick={() => insertFormat('h2')} className="editor-tool-btn text-btn" style={{ minWidth: '40px', height: '38px', padding: '0 12px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '15px', color: '#0F172A' }} title="Tiêu đề 2 (H2)">H2</button>
                      <button type="button" onClick={() => insertFormat('h3')} className="editor-tool-btn text-btn" style={{ minWidth: '40px', height: '38px', padding: '0 12px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '15px', color: '#0F172A' }} title="Tiêu đề 3 (H3)">H3</button>
                      <button type="button" onClick={() => insertFormat('h4')} className="editor-tool-btn text-btn" style={{ minWidth: '40px', height: '38px', padding: '0 12px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '15px', color: '#0F172A' }} title="Tiêu đề 4 (H4)">H4</button>
                      <button type="button" onClick={insertLink} className="editor-tool-btn" style={{ minWidth: '38px', height: '38px', padding: '0 10px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A' }} title="Chèn liên kết (Link)"><Link2 size={18} strokeWidth={2.5} /></button>
                      
                      <div className="tool-divider" style={{ height: '24px', width: '1.5px', background: '#CBD5E1', margin: '0 6px' }}></div>
                      
                      {/* Nút chèn sản phẩm vào bài */}
                      <button
                        type="button"
                        onMouseDown={saveVisualRange}
                        onClick={() => { saveVisualRange(); handleOpenProductModal(); }}
                        style={{ height: '38px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0 14px', background: '#0EA5E9', border: 'none', color: '#FFFFFF', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '14px', boxShadow: '0 2px 6px rgba(14,165,233,0.25)' }}
                        title="Chèn Thẻ Sản Phẩm vào bài viết"
                      >
                        <ShoppingBag size={16} />
                        <span>🛍️ Chèn Sản phẩm</span>
                      </button>

                      {/* Nút chèn ảnh từ thư viện */}
                      <button
                        type="button"
                        onMouseDown={saveVisualRange}
                        onClick={() => { saveVisualRange(); setMediaTarget('content'); setIsMediaOpen(true); }}
                        style={{ height: '38px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0 14px', background: '#FF6B00', border: 'none', color: '#FFFFFF', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '14px', boxShadow: '0 2px 6px rgba(255,107,0,0.25)' }}
                        title="Mở Thư viện ảnh để chèn vào bài"
                      >
                        <ImageIcon size={16} />
                        <span>🖼️ Thư viện ảnh</span>
                      </button>

                      {/* Nút chèn ảnh từ máy tính */}
                      <label onMouseDown={saveVisualRange} style={{ height: '38px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0 12px', background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '800', color: '#0F172A' }} title="Tải ảnh mới từ máy tính">
                        <Upload size={16} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleInsertImageIntoDesc} 
                          style={{ display: 'none' }} 
                        />
                      </label>
                    </div>
                  </div>

                  {/* KHUNG SOẠN THẢO TRỰC QUAN 100% (VISUAL WYSIWYG EDITOR) */}
                  <div
                    id="contentVisualEditor"
                    ref={visualEditorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleVisualInput}
                    onBlur={handleVisualInput}
                    onKeyUp={(e) => { saveVisualRange(); handleEditorClick(e); }}
                    onMouseUp={(e) => { saveVisualRange(); handleEditorClick(e); }}
                    onClick={(e) => { saveVisualRange(); handleEditorClick(e); }}
                    onFocus={saveVisualRange}
                    style={{
                      minHeight: '460px',
                      padding: '24px',
                      background: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '8px',
                      fontSize: '16px',
                      lineHeight: '1.75',
                      color: '#0F172A',
                      outline: 'none',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                    }}
                  />
                </div>

                {/* TẦNG 3: CẤU HÌNH SEO GOOGLE & CÀI ĐẶT HIỂN THỊ (FULL WIDTH 100% Ở DƯỚI CÙNG) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
                  <div className="form-section-card" style={{ margin: 0 }}>
                    <h3 className="section-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={18} className="text-primary" />
                      <span>4. Cấu hình SEO Google</span>
                    </h3>

                    {/* Google Search Result Preview */}
                    <div className="google-seo-preview-box" style={{ padding: '16px', backgroundColor: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>
                      <span style={{ fontSize: '11px', color: '#5F6368', display: 'block', marginBottom: '4px' }}>Google Search Preview</span>
                      <div className="google-preview-title" style={{ color: '#1A0DAB', fontSize: '18px', textDecoration: 'none', cursor: 'pointer', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'normal', marginBottom: '2px' }}>
                        {seoTitle}
                      </div>
                      <div className="google-preview-url" style={{ color: '#006621', fontSize: '13px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                        https://daongocgas.com/tin-tuc/{formData.slug || 'slug-bai-viet'}
                      </div>
                      <div className="google-preview-desc" style={{ color: '#545454', fontSize: '13px', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                        {seoDesc}
                      </div>
                    </div>

                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group">
                        <label htmlFor="meta_title" className="form-label-new" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Tiêu đề SEO (Meta Title)</span>
                          <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>{formData.meta_title.length}/60</span>
                        </label>
                        <input
                          type="text"
                          id="meta_title"
                          name="meta_title"
                          className="form-control-new font-sm-input"
                          value={formData.meta_title}
                          onChange={handleChange}
                          maxLength="60"
                          placeholder="Tiêu đề hiển thị trên Google..."
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="meta_keywords" className="form-label-new">Từ khóa SEO (Keywords)</label>
                        <input
                          type="text"
                          id="meta_keywords"
                          name="meta_keywords"
                          className="form-control-new font-sm-input"
                          value={formData.meta_keywords}
                          onChange={handleChange}
                          placeholder="gas ngoc gas, giao gas nhanh, gas binh duong"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="meta_description" className="form-label-new" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Mô tả SEO (Meta Description)</span>
                        <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>{formData.meta_description.length}/160</span>
                      </label>
                      <textarea
                        id="meta_description"
                        name="meta_description"
                        className="form-control-new font-sm-input"
                        rows="2"
                        maxLength="160"
                        value={formData.meta_description}
                        onChange={handleChange}
                        placeholder="Mô tả SEO ngắn gọn giúp tăng nhấp chuột trên Google..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Cài đặt xuất bản */}
                  <div className="form-section-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 className="section-card-title">5. Cài đặt hiển thị</h3>
                      <div className="switch-settings-group">
                        <label className="switch-row-item">
                          <div className="switch-row-left">
                            <strong>Xuất bản hiển thị ngay</strong>
                            <p>Cho phép người đọc thấy bài ngoài web</p>
                          </div>
                          <input
                            type="checkbox"
                            name="is_published"
                            checked={formData.is_published}
                            onChange={handleChange}
                            className="switch-toggle-input"
                          />
                        </label>
                      </div>
                    </div>

                    <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button type="submit" className="btn-primary-new" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                        <Check size={18} />
                        <span>Lưu bài viết</span>
                      </button>
                      <button type="button" onClick={handleCloseModal} className="btn-outline-new" style={{ width: '100%', justifyContent: 'center' }}>Đóng</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* 1. Header Banner Panel */
        .admin-header-panel {
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          color: #FFFFFF;
          padding: 24px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 24px;
        }

        .panel-badge {
          display: inline-block;
          background: rgba(245, 183, 49, 0.15);
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .panel-main-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 26px;
          font-weight: 800;
          margin: 0 0 6px 0;
          color: #FFFFFF;
        }

        .panel-subtitle {
          font-size: 14px;
          color: #94A3B8;
          margin: 0;
          max-width: 700px;
          line-height: 1.5;
        }

        .btn-add-new-prod {
          padding: 12px 24px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(245, 183, 49, 0.3);
        }

        /* 2. Toolbar Panel */
        .admin-toolbar-panel {
          background-color: #FFFFFF;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
          border: 1px solid var(--border);
        }

        @media (max-width: 900px) {
          .admin-toolbar-panel {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }
        }

        .toolbar-search-box {
          position: relative;
          flex-grow: 1;
          max-width: 450px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .toolbar-input {
          width: 100%;
          padding: 10px 14px 10px 42px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 14px;
          background-color: #F8FAFC;
          transition: var(--transition);
        }

        .toolbar-input:focus {
          border-color: var(--primary-dark);
          background-color: #FFFFFF;
          outline: none;
          box-shadow: 0 0 0 3px rgba(245, 183, 49, 0.15);
        }

        .status-tabs-row {
          display: flex;
          background-color: #F1F5F9;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
        }

        .status-tab-btn {
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          transition: var(--transition);
        }

        .status-tab-btn:hover {
          color: var(--text);
        }

        .status-tab-btn.active {
          background-color: #FFFFFF;
          color: var(--primary-dark);
          box-shadow: var(--shadow-sm);
        }

        /* 3. Table UI Styles */
        .prod-meta-cell {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .prod-thumb-container {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: var(--bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .prod-table-thumb {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
        }

        .prod-table-placeholder {
          color: var(--text-secondary);
          opacity: 0.4;
        }

        .prod-title-box {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .prod-name-bold {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
        }

        .prod-slug-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .status-pill {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
        }

        .status-pill.active {
          background-color: #DCFCE7;
          color: #15803D;
        }

        .status-pill.inactive {
          background-color: #F1F5F9;
          color: #64748B;
        }

        .actions-cell-new {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
        }

        .edit-btn-new {
          background-color: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #2563EB;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .edit-btn-new:hover {
          background-color: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.15);
        }

        .delete-btn-new {
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #DC2626;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .delete-btn-new:hover {
          background-color: #DC2626;
          color: #FFFFFF;
          border-color: #DC2626;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.15);
        }

        /* 4. Skeleton Loader */
        .admin-loading-skeleton {
          padding: 30px;
          background-color: #FFFFFF;
          border: 1px solid var(--border);
        }

        .skeleton-line {
          height: 40px;
          background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
          background-size: 200% 100%;
          animation: skeleton-wave 1.5s infinite;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .skeleton-line.header-skeleton {
          height: 50px;
          background-color: #E2E8F0;
        }

        @keyframes skeleton-wave {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* 5. 2-COLUMN MODERN MODAL */
        .admin-modal-overlay-new {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .admin-modal-content-new {
          width: 100%;
          max-height: 90vh;
          background-color: #F8FAFC;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 0;
          border: none;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        #contentVisualEditor a, #productVisualEditor a {
          color: #FF6B00 !important;
          font-weight: 700 !important;
          text-decoration: underline !important;
          background-color: #FFF7ED !important;
          border: 1px solid #FFEDD5 !important;
          padding: 1px 6px !important;
          border-radius: 4px !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
        }

        #contentVisualEditor a:hover, #productVisualEditor a:hover {
          background-color: #FFEDD5 !important;
          color: #C2410C !important;
        }

        .modal-header-new {
          position: sticky;
          top: 0;
          z-index: 300;
          padding: 20px 30px;
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--border);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-badge-top {
          display: inline-block;
          background-color: #EFF6FF;
          color: #2563EB;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 6px;
          border: 1px solid #DBEAFE;
        }

        .modal-header-new h2 {
          font-family: var(--font-inter), sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
        }

        .modal-close-btn-new {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          transition: var(--transition);
        }

        .modal-close-btn-new:hover {
          color: #0F172A;
          transform: rotate(90deg);
        }

        .modal-body-form-new {
          padding: 30px;
          overflow-y: auto;
        }

        .modal-two-columns-layout {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 30px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .modal-two-columns-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .form-section-card {
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }

        .section-card-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 20px 0;
          border-left: 4px solid var(--primary);
          padding-left: 10px;
          line-height: 1;
        }

        .form-label-new {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 8px;
        }

        .form-control-new {
          width: 100%;
          padding: 10px 14px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 14px;
          transition: var(--transition);
          outline: none;
        }

        .form-control-new:focus {
          border-color: var(--primary-dark);
          box-shadow: 0 0 0 3px rgba(245, 183, 49, 0.1);
        }

        .grid-2-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .code-font-textarea {
          font-family: inherit;
          line-height: 1.6;
        }

        /* Editor Toolbar */
        .editor-toolbar-new {
          display: flex;
          gap: 4px;
          background-color: #F8FAFC;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px;
        }

        .editor-tool-btn {
          width: 26px;
          height: 26px;
          background-color: transparent;
          border: none;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .editor-tool-btn:hover {
          background-color: #E2E8F0;
          color: #0F172A;
        }

        .editor-tool-btn.text-btn {
          font-weight: 700;
          font-size: 10px;
        }

        .editor-tool-btn.media-btn {
          color: var(--primary-dark);
        }

        .tool-divider {
          width: 1px;
          height: 16px;
          background-color: var(--border);
          margin: 0 4px;
        }

        /* 6. Right Column media uploads */
        .main-image-upload-zone {
          border: 2px dashed var(--border);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          background-color: #F8FAFC;
          transition: var(--transition);
        }

        .main-image-upload-zone:hover {
          border-color: var(--primary);
          background-color: #FFFDF5;
        }

        .image-drop-zone-trigger {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          gap: 6px;
        }

        .upload-zone-icon {
          color: var(--text-secondary);
          opacity: 0.6;
        }

        .image-drop-zone-trigger strong {
          font-size: 13px;
          color: #334155;
        }

        .image-drop-zone-trigger span {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .uploaded-image-preview-box {
          position: relative;
          width: 100%;
          height: 180px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .preview-img-main {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .remove-image-overlay-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: rgba(239, 68, 68, 0.9);
          color: #FFFFFF;
          border: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .remove-image-overlay-btn:hover {
          background-color: #DC2626;
          transform: scale(1.1);
        }

        .font-sm-input {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Modern Switches for settings */
        .switch-settings-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .switch-row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .switch-row-left strong {
          display: block;
          font-size: 13px;
          color: #0F172A;
        }

        .switch-row-left p {
          font-size: 11px;
          color: var(--text-secondary);
          margin: 2px 0 0 0;
        }

        .switch-toggle-input {
          width: 40px;
          height: 20px;
          appearance: none;
          background-color: #CBD5E1;
          border-radius: 20px;
          position: relative;
          cursor: pointer;
          outline: none;
          transition: background-color 0.3s;
        }

        .switch-toggle-input:checked {
          background-color: #22C55E;
        }

        .switch-toggle-input::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #FFFFFF;
          top: 2px;
          left: 2px;
          transition: transform 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .switch-toggle-input:checked::before {
          transform: translateX(20px);
        }

        /* Modal Footer */
        .modal-footer-new {
          padding: 20px 30px;
          background-color: #FFFFFF;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 15px;
        }

        .btn-outline-new {
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: transparent;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-outline-new:hover {
          background-color: #F1F5F9;
          color: #0F172A;
        }

        .btn-primary-new {
          padding: 10px 24px;
          border-radius: 6px;
          background-color: #2563EB;
          color: #FFFFFF;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          transition: var(--transition);
        }

        .btn-primary-new:hover {
          background-color: #1D4ED8;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
        }
      `}</style>

      <MediaLibraryModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        onSelectImage={handleSelectFromMedia}
      />

      {/* MODAL CHỌN SẢN PHẨM CHÈN VÀO BÀI VIẾT */}
      {isProductModalOpen && (
        <div className="admin-modal-overlay-new" style={{ zIndex: 999999 }}>
          <div className="admin-modal-content-new card" style={{ maxWidth: '640px', width: '90vw', padding: '24px' }}>
            <div className="modal-header-new" style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <span className="modal-badge-top" style={{ background: '#E0F2FE', color: '#0369A1' }}>Chèn Sản Phẩm</span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 'bold' }}>Chọn sản phẩm đưa vào bài viết</h3>
              </div>
              <button type="button" onClick={() => setIsProductModalOpen(false)} className="modal-close-btn-new">
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Tìm theo tên sản phẩm (gas 12kg, bếp gas...)..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="form-control-new"
                  style={{ paddingLeft: '36px', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {loadingProducts ? (
                <div style={{ textTransform: 'uppercase', textAlign: 'center', padding: '30px', color: '#64748B', fontSize: '13px' }}>Đang tải danh sách sản phẩm...</div>
              ) : productList.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase())).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>Không tìm thấy sản phẩm phù hợp.</div>
              ) : (
                productList
                  .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                  .map(prod => (
                    <div 
                      key={prod.id}
                      onClick={() => handleInsertProductToArticle(prod)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '12px 16px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      className="product-select-row-hover"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img 
                          src={prod.image_url || '/images/gas-cylinder.png'} 
                          alt="" 
                          style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '6px', padding: '4px', border: '1px solid #CBD5E1' }} 
                        />
                        <div>
                          <strong style={{ display: 'block', fontSize: '14px', color: '#0F172A' }}>{prod.name}</strong>
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#FF6B00' }}>
                            {prod.price ? Number(prod.price).toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleInsertProductToArticle(prod); }}
                        className="btn-primary-new"
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                      >
                        Chèn vào bài
                      </button>
                    </div>
                  ))
              )}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #E2E8F0', textAlign: 'right' }}>
              <button type="button" onClick={() => setIsProductModalOpen(false)} className="btn-outline-new">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL NHỎ NHẬP ALT TEXT / CHÚ THÍCH ẢNH (SEO GOOGLE) */}
      {isAltModalOpen && (
        <div className="admin-modal-overlay-new" style={{ zIndex: 9999999 }}>
          <div className="admin-modal-content-new card" style={{ maxWidth: '480px', width: '90vw', padding: '24px', borderRadius: '12px' }}>
            <div className="modal-header-new" style={{ paddingBottom: '12px', marginBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <span className="modal-badge-top" style={{ background: '#FFEDD5', color: '#C2410C' }}>SEO Hình Ảnh</span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '17px', fontWeight: 'bold' }}>Nhập Chú thích & Alt Text cho ảnh</h3>
              </div>
              <button type="button" onClick={() => setIsAltModalOpen(false)} className="modal-close-btn-new">
                <X size={20} />
              </button>
            </div>

            {/* Thumbnail xem trước */}
            {pendingImageUrl && (
              <div style={{ textAlign: 'center', marginBottom: '16px', background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <img 
                  src={pendingImageUrl} 
                  alt="Preview" 
                  style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain', borderRadius: '6px', margin: '0 auto', display: 'block' }} 
                />
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label-new" style={{ fontSize: '13px', fontWeight: 'bold' }}>
                Tiêu đề / Alt Text chú thích ảnh (Chuẩn SEO Google)
              </label>
              <input
                type="text"
                className="form-control-new"
                value={altTextValue}
                onChange={(e) => setAltTextValue(e.target.value)}
                placeholder="Ví dụ: Bình gas Luxen 45kg giao nhanh Dĩ An..."
                style={{ fontSize: '14px' }}
                autoFocus
              />
              <span style={{ fontSize: '11.5px', color: '#64748B', display: 'block', marginTop: '6px' }}>
                Alt text giúp Google đọc hiểu hình ảnh và tăng thứ hạng tìm kiếm cho bài viết của bạn.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
              <button 
                type="button" 
                onClick={() => setIsAltModalOpen(false)} 
                className="btn-outline-new"
              >
                Hủy
              </button>
              <button 
                type="button" 
                onClick={confirmInsertImageWithAlt} 
                className="btn-primary-new"
                style={{ padding: '8px 20px' }}
              >
                <Check size={16} />
                <span>Xác nhận & Chèn vào bài</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING LINK TOOLTIP POPOVER (HIỂN THỊ LINK & NÚT XÓA LINK VƯỢT TRỘI) */}
      {linkTooltip.visible && linkTooltip.targetNode && (
        <div
          style={{
            position: 'fixed',
            top: `${linkTooltip.top}px`,
            left: `${linkTooltip.left}px`,
            zIndex: 99999999,
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '6px 12px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            fontFamily: 'sans-serif',
            border: '1px solid #334155'
          }}
          onMouseLeave={() => setLinkTooltip(prev => ({ ...prev, visible: false }))}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38BDF8', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
            <Link2 size={13} />
            <a href={linkTooltip.url} target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
              {linkTooltip.url}
            </a>
          </span>

          <div style={{ height: '14px', width: '1px', backgroundColor: '#334155' }}></div>

          <button
            type="button"
            onClick={() => {
              const newUrl = prompt('🔗 Nhập URL mới:', linkTooltip.url);
              if (newUrl && newUrl.trim()) {
                linkTooltip.targetNode.setAttribute('href', newUrl.trim());
                handleVisualInput();
                setLinkTooltip(prev => ({ ...prev, url: newUrl.trim() }));
              }
            }}
            style={{ background: 'transparent', border: 'none', color: '#CBD5E1', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Chỉnh sửa địa chỉ liên kết"
          >
            <Edit2 size={12} />
            <span>Sửa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (linkTooltip.targetNode) {
                const parent = linkTooltip.targetNode.parentNode;
                while (linkTooltip.targetNode.firstChild) {
                  parent.insertBefore(linkTooltip.targetNode.firstChild, linkTooltip.targetNode);
                }
                parent.removeChild(linkTooltip.targetNode);
                handleVisualInput();
                setLinkTooltip({ visible: false, url: '', targetNode: null, top: 0, left: 0 });
              }
            }}
            style={{ background: '#EF4444', border: 'none', color: '#FFFFFF', padding: '4px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 6px rgba(239,68,68,0.3)' }}
            title="Xóa bỏ liên kết khỏi cụm từ này"
          >
            <Trash2 size={12} />
            <span>Xóa link</span>
          </button>

          <button
            type="button"
            onClick={() => setLinkTooltip({ visible: false, url: '', targetNode: null, top: 0, left: 0 })}
            style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', marginLeft: '2px', padding: 0 }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* FLOATING HEADING TAG SWITCHER POPOVER (H2, H3, H4, P) */}
      {headingTooltip.visible && headingTooltip.targetNode && (
        <div
          style={{
            position: 'fixed',
            top: `${headingTooltip.top}px`,
            left: `${headingTooltip.left}px`,
            zIndex: 99999999,
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '5px 10px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontFamily: 'sans-serif',
            border: '1px solid #334155'
          }}
          onMouseLeave={() => setHeadingTooltip(prev => ({ ...prev, visible: false }))}
        >
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 'bold', paddingRight: '2px' }}>
            🏷️ Đổi thẻ:
          </span>

          <button
            type="button"
            onClick={() => convertHeadingTag('h2')}
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              border: headingTooltip.currentTag === 'h2' ? '1px solid #FF6B00' : '1px solid #334155',
              background: headingTooltip.currentTag === 'h2' ? '#FF6B00' : '#1E293B',
              color: '#FFFFFF',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            H2
          </button>

          <button
            type="button"
            onClick={() => convertHeadingTag('h3')}
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              border: headingTooltip.currentTag === 'h3' ? '1px solid #FF6B00' : '1px solid #334155',
              background: headingTooltip.currentTag === 'h3' ? '#FF6B00' : '#1E293B',
              color: '#FFFFFF',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            H3
          </button>

          <button
            type="button"
            onClick={() => convertHeadingTag('h4')}
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              border: headingTooltip.currentTag === 'h4' ? '1px solid #FF6B00' : '1px solid #334155',
              background: headingTooltip.currentTag === 'h4' ? '#FF6B00' : '#1E293B',
              color: '#FFFFFF',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            H4
          </button>

          <button
            type="button"
            onClick={() => convertHeadingTag('p')}
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              border: headingTooltip.currentTag === 'p' ? '1px solid #38BDF8' : '1px solid #334155',
              background: headingTooltip.currentTag === 'p' ? '#0EA5E9' : '#1E293B',
              color: '#FFFFFF',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '11px'
            }}
            title="Chuyển về đoạn văn thường"
          >
            Thường (P)
          </button>

          <button
            type="button"
            onClick={() => setHeadingTooltip({ visible: false, currentTag: 'p', targetNode: null, top: 0, left: 0 })}
            style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', marginLeft: '2px', padding: 0 }}
          >
            <X size={13} />
          </button>
        </div>
      )}
    </>
  );
}
