import fs from 'fs';
import path from 'path';
import db from './db.js';

const POSTS_FILE_PATH = path.join(process.cwd(), 'data', 'posts.json');
const POSTS_DEFAULT_PATH = path.join(process.cwd(), 'data', 'posts.default.json');

let memoryPostsCache = null;

const initialPostsData = [];

function readPostsFromFile() {
  try {
    const dir = path.dirname(POSTS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(POSTS_FILE_PATH)) {
      const content = fs.readFileSync(POSTS_FILE_PATH, 'utf8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    // Fallback: copy from .default.json if main file doesn't exist
    if (fs.existsSync(POSTS_DEFAULT_PATH)) {
      const defaultContent = fs.readFileSync(POSTS_DEFAULT_PATH, 'utf8');
      fs.writeFileSync(POSTS_FILE_PATH, defaultContent, 'utf8');
      const parsed = JSON.parse(defaultContent || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading posts.json:', err.message);
  }
  return initialPostsData;
}

function savePostsToFile(postsArr) {
  try {
    const dir = path.dirname(POSTS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(POSTS_FILE_PATH, JSON.stringify(postsArr, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving posts.json:', err.message);
  }
}

export async function getAllPosts() {
  const filePosts = readPostsFromFile();

  let dbPosts = [];
  try {
    const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    if (Array.isArray(rows) && rows.length > 0) {
      dbPosts = rows;
    }
  } catch (err) {}

  // Merge priority: MySQL (user edits) OVERRIDES JSON (stale defaults)
  if (dbPosts.length > 0) {
    let merged = [...dbPosts];
    // Add any file-only posts that don't exist in DB
    filePosts.forEach(filePost => {
      const existsInDb = merged.some(p => String(p.id) === String(filePost.id) || p.slug === filePost.slug);
      if (!existsInDb) {
        merged.push(filePost);
      }
    });
    const normalizePost = (p) => ({
      ...p,
      category: p.category || 'tin-tuc',
      job_meta: p.job_meta ? (typeof p.job_meta === 'object' ? p.job_meta : (() => { try { return JSON.parse(p.job_meta); } catch (e) { return null; } })()) : null
    });

    const normalized = merged.map(normalizePost);
    memoryPostsCache = normalized;
    return normalized;
  }

  // If DB is empty/unavailable, fall back to file posts
  const normalizedFilePosts = filePosts.map(p => ({
    ...p,
    category: p.category || 'tin-tuc',
    job_meta: p.job_meta ? (typeof p.job_meta === 'object' ? p.job_meta : (() => { try { return JSON.parse(p.job_meta); } catch (e) { return null; } })()) : null
  }));
  memoryPostsCache = normalizedFilePosts;
  return normalizedFilePosts;
}

export async function getPostByIdOrSlug(idOrSlug) {
  const all = await getAllPosts();
  const found = all.find(p => String(p.id) === String(idOrSlug) || p.slug === String(idOrSlug));
  return found || null;
}

export async function createPostData(postFields) {
  let all = readPostsFromFile();
  const maxId = all.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);
  const newId = maxId + 1;

  const jobMeta = postFields.job_meta ? (typeof postFields.job_meta === 'object' ? postFields.job_meta : (() => { try { return JSON.parse(postFields.job_meta); } catch (e) { return null; } })()) : null;

  const newPost = {
    id: newId,
    title: postFields.title,
    slug: postFields.slug,
    category: postFields.category || 'tin-tuc',
    job_meta: jobMeta,
    excerpt: postFields.excerpt || postFields.summary || '',
    content: postFields.content || '',
    image_url: postFields.image_url || '/images/sopet-xam.png',
    meta_title: postFields.meta_title || postFields.title,
    meta_description: postFields.meta_description || postFields.excerpt || '',
    meta_keywords: postFields.meta_keywords || '',
    is_published: postFields.is_published !== undefined ? (postFields.is_published ? 1 : 0) : 1,
    created_at: new Date().toISOString()
  };

  all.unshift(newPost);
  memoryPostsCache = all;
  savePostsToFile(all);

  const jobMetaSql = jobMeta ? JSON.stringify(jobMeta) : null;

  try {
    const [res] = await db.query(
      `INSERT INTO posts (title, slug, category, job_meta, excerpt, content, image_url, meta_title, meta_description, meta_keywords, is_published) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         category = VALUES(category),
         job_meta = VALUES(job_meta),
         excerpt = VALUES(excerpt), 
         content = VALUES(content), 
         image_url = VALUES(image_url), 
         meta_title = VALUES(meta_title), 
         meta_description = VALUES(meta_description), 
         meta_keywords = VALUES(meta_keywords), 
         is_published = VALUES(is_published)`,
      [
        newPost.title,
        newPost.slug,
        newPost.category,
        jobMetaSql,
        newPost.excerpt,
        newPost.content,
        newPost.image_url,
        newPost.meta_title,
        newPost.meta_description,
        newPost.meta_keywords,
        newPost.is_published
      ]
    );
    if (res && res.insertId) {
      newPost.id = res.insertId;
    }
  } catch (err) {
    console.error('Error in createPostData MySQL:', err.message);
  }

  return newPost;
}

export async function updatePostData(id, updateFields) {
  let all = readPostsFromFile();
  const index = all.findIndex(p => String(p.id) === String(id));

  let updatedPost = null;
  const jobMeta = updateFields.job_meta !== undefined 
    ? (typeof updateFields.job_meta === 'object' ? updateFields.job_meta : (() => { try { return JSON.parse(updateFields.job_meta); } catch (e) { return null; } })()) 
    : (index !== -1 ? all[index].job_meta : null);

  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...updateFields,
      category: updateFields.category !== undefined ? updateFields.category : (all[index].category || 'tin-tuc'),
      job_meta: jobMeta
    };
    updatedPost = all[index];
  } else {
    const newId = Number(id) || Date.now();
    updatedPost = {
      id: newId,
      title: updateFields.title || 'Bài viết mới',
      slug: updateFields.slug || `bai-viet-${newId}`,
      category: updateFields.category || 'tin-tuc',
      job_meta: jobMeta,
      excerpt: updateFields.excerpt || '',
      content: updateFields.content || '',
      image_url: updateFields.image_url || '/images/sopet-xam.png',
      meta_title: updateFields.meta_title || updateFields.title,
      meta_description: updateFields.meta_description || updateFields.excerpt || '',
      meta_keywords: updateFields.meta_keywords || '',
      is_published: updateFields.is_published !== undefined ? (updateFields.is_published ? 1 : 0) : 1,
      created_at: new Date().toISOString()
    };
    all.unshift(updatedPost);
  }

  memoryPostsCache = all;
  savePostsToFile(all);

  const postCategory = updatedPost.category || updateFields.category || 'tin-tuc';
  const jobMetaSql = jobMeta ? JSON.stringify(jobMeta) : null;

  try {
    const [updateResult] = await db.query(
      `UPDATE posts 
       SET title = ?, slug = ?, category = ?, job_meta = ?, excerpt = ?, content = ?, image_url = ?, meta_title = ?, meta_description = ?, meta_keywords = ?, is_published = ? 
       WHERE id = ?`,
      [
        updateFields.title,
        updateFields.slug,
        postCategory,
        jobMetaSql,
        updateFields.excerpt || '',
        updateFields.content || '',
        updateFields.image_url || '',
        updateFields.meta_title || updateFields.title,
        updateFields.meta_description || updateFields.excerpt || '',
        updateFields.meta_keywords || '',
        updateFields.is_published ? 1 : 0,
        id
      ]
    );

    if (updateResult && updateResult.affectedRows === 0) {
      await db.query(
        `INSERT INTO posts (title, slug, category, job_meta, excerpt, content, image_url, meta_title, meta_description, meta_keywords, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           title = VALUES(title), 
           category = VALUES(category),
           job_meta = VALUES(job_meta),
           excerpt = VALUES(excerpt), 
           content = VALUES(content), 
           image_url = VALUES(image_url), 
           meta_title = VALUES(meta_title), 
           meta_description = VALUES(meta_description), 
           meta_keywords = VALUES(meta_keywords), 
           is_published = VALUES(is_published)`,
        [
          updateFields.title,
          updateFields.slug,
          postCategory,
          jobMetaSql,
          updateFields.excerpt || '',
          updateFields.content || '',
          updateFields.image_url || '',
          updateFields.meta_title || updateFields.title,
          updateFields.meta_description || updateFields.excerpt || '',
          updateFields.meta_keywords || '',
          updateFields.is_published ? 1 : 0
        ]
      );
    }
  } catch (err) {
    console.error('Error in updatePostData MySQL:', err.message);
  }

  return updatedPost;
}

export async function deletePostData(id) {
  let all = readPostsFromFile();
  all = all.filter(p => String(p.id) !== String(id));

  memoryPostsCache = all;
  savePostsToFile(all);

  try {
    await db.query('DELETE FROM posts WHERE id = ?', [id]);
  } catch (err) {}

  return true;
}
