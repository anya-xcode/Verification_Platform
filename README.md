# VShield - Background Verification Platform

VShield is a full-stack, enterprise-grade background verification platform. It allows administrators to add candidates, perform background checks (mocked Aadhaar and PAN verification APIs), and generate professional PDF verification reports. 

## Features
- **Secure Authentication:** JWT-based login with bcrypt password hashing.
- **Candidate Management:** Full CRUD operations for candidate profiles.
- **Automated Verification Workflow:** Integrates with mock APIs to verify Aadhaar and PAN details.
- **Dynamic Report Generation:** Automatically generates a professional PDF report on verification completion and stores it securely via Cloudinary.
- **Professional UI/UX:** Responsive, modern dashboard built with React, Vite, TailwindCSS, and Zustand.
- **Robust Backend:** Express.js REST API with rate-limiting, Helmet security, and Zod input validation.
- **Database:** PostgreSQL managed via Prisma ORM.

## Tech Stack
**Frontend:**
- React 18 + Vite
- TailwindCSS
- Zustand (State Management)
- React Hook Form + Zod (Validation)
- Axios

**Backend:**
- Node.js + Express (ES Modules)
- Prisma (PostgreSQL ORM)
- PDFKit (PDF Generation)
- Cloudinary (Cloud Storage)
- JWT & bcryptjs (Security)

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (running locally or remotely)
- Cloudinary Account (for PDF report storage)

### 1. Database Setup
Ensure PostgreSQL is running. Open `backend/.env` and configure your `DATABASE_URL`.
```bash
cd backend
npm install
# Push schema to database
npm run db:push
# Seed the database with admin user and sample candidates
npm run db:seed
```

### 2. Environment Variables
Create a `.env` file in the `backend/` directory based on `.env.example`:
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vshield?schema=public"

# Security
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="1d"

# Cloudinary (Required for PDF Reports)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Create a `.env` file in the `frontend/` directory (if your backend runs on a different port/host):
```env
VITE_API_URL="http://localhost:5000/api"
```

### 3. Run the Application
You need to run both the frontend and backend servers.

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/auth/me` - Get current user profile

### Candidates
- `GET /api/candidates` - List all candidates (supports pagination & search)
- `POST /api/candidates` - Create a new candidate
- `GET /api/candidates/:id` - Get candidate details
- `PUT /api/candidates/:id` - Update candidate details
- `DELETE /api/candidates/:id` - Delete a candidate
- `GET /api/candidates/stats/summary` - Get dashboard statistics

### Verification
- `POST /api/verification/aadhaar/:candidateId` - Run Aadhaar verification
- `POST /api/verification/pan/:candidateId` - Run PAN verification
- `GET /api/verification/:candidateId/status` - Get verification timeline/status

### Reports
- `GET /api/reports/:candidateId` - Download the generated PDF report

## Screenshots / Verification Reports
When a candidate passes or fails verification, the system uses `PDFKit` to dynamically generate a branded report containing their demographics, masked ID numbers, and API validation timestamps. The report is uploaded to Cloudinary, and the secure URL is saved to the candidate's profile for instant downloading via the dashboard.
