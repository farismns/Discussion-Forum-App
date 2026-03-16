📘 PRD — Deployment & CI/CD Pipeline

Project: Aplikasi Forum Diskusi (React + Dicoding Forum API)
Deployment Platform: Vercel
CI Platform: GitHub Actions
Repository: GitHub
Branch Strategy: Protected main/master

1. 🎯 Tujuan

PRD ini mendefinisikan implementasi Continuous Integration (CI) dan Continuous Deployment (CD) untuk memastikan:

kualitas kode terjaga melalui automation testing

deployment otomatis setelah perubahan kode

proteksi branch utama dari perubahan langsung

Pipeline menggunakan:

Layer	Tools
CI	GitHub Actions
CD	Vercel
Hosting	Vercel
Testing	Vitest / Jest
Repository	GitHub
2. 🏗️ Arsitektur CI/CD

Flow pipeline:

Developer Push / Pull Request
        │
        ▼
GitHub Actions (CI)
 - install dependencies
 - run test
        │
        ├── test gagal → CI FAIL
        │
        └── test berhasil → merge allowed
                        │
                        ▼
                    Vercel
                 Auto Deploy
                        │
                        ▼
                 Production URL
3. ⚙️ Continuous Integration (GitHub Actions)

CI digunakan untuk menjalankan automation testing secara otomatis setiap push dan pull request.

Lokasi File
.github/workflows/ci.yml
CI Workflow Configuration
name: CI Pipeline

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run unit tests
        run: npm test
CI Behavior
Event	Action
push	menjalankan testing
pull request	menjalankan testing
test gagal	CI status failed
test berhasil	CI status passed
4. 🚀 Continuous Deployment (Vercel)

Deployment dilakukan menggunakan Vercel Git Integration.

Deployment Strategy
Branch	Environment
main/master	Production
feature branch	Preview
Deployment Flow
Push ke GitHub
      │
      ▼
Vercel mendeteksi perubahan
      │
      ▼
Build Project
      │
      ▼
Deploy ke Production
Output Deployment

Aplikasi dapat diakses melalui:

https://forum-app.vercel.app

(URL ini harus dilampirkan pada submission)

5. 🔒 Branch Protection

Branch utama (main/master) diproteksi untuk mencegah perubahan langsung tanpa review.

Rules yang diterapkan
Rule	Status
Require Pull Request	Enabled
Require CI checks to pass	Enabled
Restrict direct push	Enabled
Protection Configuration

Pengaturan dilakukan di:

GitHub Repository
→ Settings
→ Branches
→ Branch Protection Rules

Rule:

Require pull request before merging

Require status checks to pass before merging

Include administrators (optional)

6. 📸 Screenshot Evidence

Submission harus melampirkan tiga screenshot berikut.

1️⃣ CI Check Error

Menunjukkan pipeline gagal karena test gagal.

Contoh kondisi:

test sengaja dibuat fail

GitHub Actions menunjukkan ❌ failed

File:

screenshots/1_ci_check_error.png
2️⃣ CI Check Pass

Menunjukkan pipeline berhasil.

Contoh kondisi:

semua test lulus

GitHub Actions menunjukkan ✔ success

File:

screenshots/2_ci_check_pass.png

7. ✅ Acceptance Criteria

Submission dianggap memenuhi kriteria jika:

CI pipeline berjalan pada GitHub Actions

automation testing dijalankan pada CI

deployment dilakukan melalui Vercel

branch utama diproteksi

screenshot bukti konfigurasi dilampirkan

URL aplikasi Vercel tersedia