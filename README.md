# Web Stories — CMS + Player

**Mini full-stack Web Stories CMS + Player**  
A small CMS to create/manage Web Stories (multi-slide image/video stories) and a frontend player to view them (Instagram/Google Web Stories style).

---

## ✅ Deliverables in this repo
1. **CMS Dashboard** — React frontend (admin) to create/edit/delete stories.  
2. **Story Player** — React frontend to view stories with autoplay, tap-to-skip, and progress bars.  
3. **Backend APIs** — Node.js + Express + MongoDB (Mongoose) + Cloudinary for media storage.  

---

## 🧰 Tech Stack
- Frontend: React (Vite), React Router, Tailwind CSS (optional)
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- File storage: Cloudinary (images & videos)
- Auth: JWT (admin login)
- Dev tools: nodemon

---

## 🔧 Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB connection string (Atlas or local)
- Cloudinary account (cloud name, api key, api secret)

---

# Admin login
- Email: admin@gmail.com
- Password: Admin

---

## ▶️ Setup & Run (local)

###  Frontend
1. Open `/frontend` folder
2. Create `.env` (see variables below)
3. Install & run:
```bash
cd frontend
npm install
npm run dev

## ▶️ Setup & Run (local)

###  Backend
1. Open `/backend` folder
2. Create `.env` (see variables below)
3. Install & run:
```bash
cd backend
npm install
npm run dev

PORT=5000
MONGO_URI=<your_mongo_uri>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
JWT_SECRET=<jwt_secret_for_admin>
MASTER_RESET_CODE=<master_reset_code> 
FRONTEND_URL=http://localhost:5173




