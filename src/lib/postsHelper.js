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
    memoryPostsCache = merged;
    return merged;
  }

  // If DB is empty/unavailable, fall back to file posts
  memoryPostsCache = filePosts;
  return filePosts;
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

  const newPost = {
    id: newId,
    title: postFields.title,
    slug: postFields.slug,
    excerpt: postFields.excerpt || '',
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

  try {
    await db.query(
      `INSERT INTO posts (title, slug, excerpt, content, image_url, meta_title, meta_description, meta_keywords, is_published) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newPost.title,
        newPost.slug,
        newPost.excerpt,
        newPost.content,
        newPost.image_url,
        newPost.meta_title,
        newPost.meta_description,
        newPost.meta_keywords,
        newPost.is_published
      ]
    );
  } catch (err) {}

  return newPost;
}

export async function updatePostData(id, updateFields) {
  let all = readPostsFromFile();
  const index = all.findIndex(p => String(p.id) === String(id));

  let updatedPost = null;
  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...updateFields
    };
    updatedPost = all[index];
  } else {
    const newId = Number(id) || Date.now();
    updatedPost = {
      id: newId,
      title: updateFields.title || 'Bài viết mới',
      slug: updateFields.slug || `bai-viet-${newId}`,
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

  try {
    await db.query(
      `UPDATE posts 
       SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, meta_title = ?, meta_description = ?, meta_keywords = ?, is_published = ? 
       WHERE id = ?`,
      [
        updateFields.title,
        updateFields.slug,
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
  } catch (err) {}

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
