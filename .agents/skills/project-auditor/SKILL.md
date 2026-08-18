---
name: project-auditor
description: Comprehensive 7-layer quality assurance and system integrity audit for the Ngoc Gas web platform. Runs database checks, data protection verification, API validation, public pages, admin flows, media assets, and SEO checks.
---

# 🛡️ Ngoc Gas Project Auditor Skill

Use this skill whenever verifying the integrity of the Ngoc Gas platform, before making major releases, commits, or reporting completion of tasks to the user.

## 📌 When to Use This Skill
- Before concluding any major feature development or bug fix.
- When verifying that user database records & JSON files remain intact.
- When validating API endpoint responses and Next.js routing health.
- Before committing or deploying changes to production.

---

## 🚀 How to Execute the Comprehensive Audit

### Command Line Execution
Run the automated 7-tier test suite in terminal:
```bash
npm run audit
```
*(Or directly: `node scripts/audit-project.js`)*

---

## 📋 7-Tier Audit Inspection Matrix

1. **Tier 1: Database & Schema Integrity**
   - MySQL connection & heartbeat.
   - Core tables: `products`, `settings`, `stores`, `posts`, `categories`, `gas_price_history`, `users`, `contacts`.
   - Mandatory schema columns (`gas_type`, `rating_value`, `reviews_json`, `guide_content`).

2. **Tier 2: Data Protection & Fallback Contract**
   - `.gitignore` verification (`data/*.json` ignored, `!data/*.default.json` tracked).
   - 8 seed files exist in `/data/*.default.json`.
   - Helper merge logic prioritizes MySQL over JSON (`productsHelper`, `settingsHelper`, `storesHelper`, `postsHelper`, `categoriesHelper`).

3. **Tier 3: 100% API Endpoints Health**
   - Verify 15+ API routes return HTTP 200 with valid JSON/XML payloads.
   - Check Google Merchant RSS Feed (`/api/feed/google-merchant`).

4. **Tier 4: 100% Public Pages & SEO Structured Data**
   - Routes: `/`, `/san-pham`, `/gia-gas-hom-nay`, `/cua-hang`, `/tin-tuc`, `/gioi-thieu`, `/lien-he`.
   - SEO files: `/robots.txt`, `/sitemap.xml`.
   - Schema JSON-LD validation (`Product`, `LocalBusiness`, `Article`).

5. **Tier 5: Admin Panel & CRUD Operations**
   - Routes: `/admin`, `/admin/san-pham`, `/admin/gia-gas`, `/admin/cai-dat`, `/admin/cua-hang`, `/admin/bai-viet`, `/admin/tai-khoan`, `/admin/lien-he`.
   - Instant Auto-Save Contract compliance.

6. **Tier 6: Media Assets & Broken Link Scanner**
   - Scan all database image URLs against physical `/public/uploads/` and `/public/images/`.
   - Zero missing image files.

7. **Tier 7: Automated Report Generation**
   - Inspect `PROJECT_AUDIT_REPORT.md` and verify `Exit Code 0`.
