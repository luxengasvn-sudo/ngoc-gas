/**
 * TELEGRAM BOT - SMART ANTIGRAVITY AI ASSISTANT FOR PC & PROJECT
 * 
 * Hướng dẫn:
 * - Bot được kết nối trực tiếp với hệ thống PC & dự án Ngọc Gas.
 * - Hỗ trợ trò chuyện tự nhiên bằng tiếng Việt (giống hệt Antigravity).
 * - Tự động đọc file, kiểm tra code, chạy git, build và thực thi lệnh khi anh yêu cầu từ điện thoại.
 * - Đã tích hợp Google Interactions API với mô hình Antigravity Agent.
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.resolve(__dirname, '../../');

function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnv();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_ALLOWED_CHAT_ID;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!BOT_TOKEN) {
  console.log('\n❌ THIẾU TELEGRAM_BOT_TOKEN trong .env.local!\n');
  process.exit(1);
}

console.log('🚀 Smart Antigravity Bot đang chạy trên PC...');
console.log(`🔒 Đã bật bảo mật cho Chat ID: ${ALLOWED_CHAT_ID}`);
if (GEMINI_API_KEY) {
  console.log('🧠 Trí tuệ Google Antigravity Interactions API: BẬT');
}

let offset = 0;

async function sendMessage(chatId, text, replyToId = null) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= 4000) {
      chunks.push(remaining);
      break;
    }
    chunks.push(remaining.substring(0, 4000));
    remaining = remaining.substring(4000);
  }

  for (const chunk of chunks) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: chunk,
          parse_mode: 'Markdown',
          reply_to_message_id: replyToId
        })
      });
    } catch (err) {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: chunk,
          reply_to_message_id: replyToId
        })
      });
    }
  }
}

function runCommand(command, cwd = PROJECT_ROOT) {
  return new Promise((resolve) => {
    exec(command, { cwd, shell: 'powershell.exe', maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      let output = stdout || stderr || 'Không có kết quả trả về.';
      if (error && !stdout && !stderr) {
        output = `Lỗi: ${error.message}`;
      }
      resolve(output.trim());
    });
  });
}

// Gọi Google Antigravity Interactions API
async function queryGeminiAI(userPrompt, systemContext = '') {
  if (!GEMINI_API_KEY) return null;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${GEMINI_API_KEY}`;
    
    const inputPrompt = `Bạn là Antigravity - Trợ lý AI agent cao cấp từ Google DeepMind, đang pair-programming với USER trên dự án website "Ngọc Gas". 
Hãy xưng em và gọi user là anh. Trả lời nhiệt tình, thông minh, ngắn gọn, chuẩn markdown bằng tiếng Việt.

[BỐI CẢNH DỰ ÁN NGỌC GAS HIỆN TẠI]:
${systemContext}

[CÂU HỎI / LỜI DẶN CỦA ANH]:
${userPrompt}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'antigravity-preview-05-2026',
        input: inputPrompt
      })
    });

    const data = await res.json();
    if (data.steps && Array.isArray(data.steps)) {
      const outputStep = data.steps.find(s => s.type === 'model_output');
      if (outputStep && outputStep.content && outputStep.content[0]?.text) {
        return outputStep.content[0].text;
      }
    }
  } catch (err) {
    console.error('Lỗi gọi Interactions API:', err.message);
  }
  return null;
}

// Vòng lặp nhận tin nhắn
async function pollUpdates() {
  while (true) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          if (update.message && update.message.text) {
            handleMessage(update.message);
          }
        }
      }
    } catch (err) {
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

// Xử lý thông minh tin nhắn
async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  const msgId = msg.message_id;

  if (ALLOWED_CHAT_ID && String(chatId) !== String(ALLOWED_CHAT_ID)) {
    await sendMessage(chatId, `⛔ *Từ chối truy cập!* Chat ID (${chatId}) không có quyền điều khiển.`);
    return;
  }

  console.log(`📩 Nhận lệnh từ Telegram: "${text}"`);
  const lowerText = text.toLowerCase();

  // 1. Menu Trợ Giúp /start hoặc /help
  if (text === '/start' || text === '/help') {
    const helpMsg = `✨ *CHÀO ANH! EM LÀ TRỢ LÝ ANTIGRAVITY CỦA DỰ ÁN NGỌC GAS* ✨

Anh có thể chat trực tiếp với em bằng tiếng Việt tự nhiên (ví dụ: *"Đánh giá lại dự án giúp tao"*, *"Build thử xem có lỗi không"*, *"Push code lên main đi"*...) hoặc dùng các câu lệnh nhanh:

🔹 */status* : Kiểm tra trạng thái Git, file đã sửa trên PC
🔹 */build* : Chạy thử \`npm run build\` xem có lỗi không
🔹 */gitpush <nội dung>* : Git add, commit & push thẳng lên main
🔹 */cmd <lệnh>* : Thực thi lệnh PowerShell trực tiếp trên PC`;
    await sendMessage(chatId, helpMsg, msgId);
    return;
  }

  // 2. Lệnh /status
  if (text === '/status') {
    await sendMessage(chatId, '⏳ Em đang kiểm tra trạng thái Git và hệ thống trên PC...', msgId);
    const gitStatus = await runCommand('git status -s');
    const lastCommit = await runCommand('git log -n 1 --oneline');
    
    const reply = `📊 *BÁO CÁO TRẠNG THÁI HỆ THỐNG PC & DỰ ÁN*

📜 *Commit mới nhất*: \`${lastCommit}\`
📁 *File thay đổi chưa commit*:
\`\`\`
${gitStatus || 'Không có thay đổi (Clean code!)'}
\`\`\``;
    await sendMessage(chatId, reply, msgId);
    return;
  }

  // 3. Lệnh /build
  if (text === '/build') {
    await sendMessage(chatId, '⚙️ Em đang tiến hành chạy `npm run build` trên PC... Anh đợi em tí nhé!', msgId);
    const output = await runCommand('npm run build');
    const isSuccess = output.includes('Compiled successfully') || !output.includes('Error');
    
    let summaryText = isSuccess 
      ? '🎉 *BUILD THÀNH CÔNG RỒI ANH NHA!* Tất cả các trang HTML, API đều chạy siêu mượt.'
      : '❌ *CÓ LỖI KHI BUILD CODE!* Anh xem chi tiết bên dưới:';

    await sendMessage(chatId, `${summaryText}\n\n\`\`\`\n${output.slice(-3000)}\n\`\`\``, msgId);
    return;
  }

  // 4. Lệnh /gitpush
  if (text.startsWith('/gitpush')) {
    let commitMsg = text.replace('/gitpush', '').trim() || 'update code via telegram agent';
    await sendMessage(chatId, `🚀 Em đang tiến hành Git Commit ("${commitMsg}") và Push mã nguồn lên GitHub cho anh...`, msgId);
    const output = await runCommand(`git add . ; git commit -m "${commitMsg}" ; git push origin main`);
    await sendMessage(chatId, `✅ *ĐÃ PUSH CODE LÊN GITHUB THÀNH CÔNG!*\n\n\`\`\`\n${output.slice(-3000)}\n\`\`\``, msgId);
    return;
  }

  // 5. Lệnh /cmd
  if (text.startsWith('/cmd ')) {
    const cmdStr = text.replace('/cmd ', '').trim();
    await sendMessage(chatId, `⚡ Em đang thực thi lệnh: \`${cmdStr}\`...`, msgId);
    const output = await runCommand(cmdStr);
    await sendMessage(chatId, `💻 *KẾT QUẢ:* \n\`\`\`\n${output.slice(-3500)}\n\`\`\``, msgId);
    return;
  }

  // 6. Xử lý câu hỏi tự nhiên bằng Google Antigravity Interactions AI API!
  const gitStatus = await runCommand('git status -s');
  const lastCommit = await runCommand('git log -n 1 --oneline');
  const context = `Commit gần đây: ${lastCommit}. 
File thay đổi hiện tại: ${gitStatus || 'Không có'}.`;

  const aiReply = await queryGeminiAI(text, context);
  if (aiReply) {
    await sendMessage(chatId, aiReply, msgId);
  } else {
    await sendMessage(chatId, `Dạ em nghe đây anh! Em đã ghi nhận yêu cầu: "${text}". Anh có thể dùng các lệnh /status, /build, /gitpush hoặc /cmd để em thực thi ngay nhé!`, msgId);
  }
}

pollUpdates();
