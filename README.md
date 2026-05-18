# 💼 Job Board — Frontend

A full-stack job board platform where employers can post jobs and job seekers can browse, search, and apply — with separate dashboards for each role.

🔗 **Backend Repo:** [Job_Board_backend](https://github.com/aaquib-anzar/Job_Board_backend)
🌐 **Live Demo:** [Job_Board_frontend](https://job-board-frontend-flame.vercel.app/)

---

## 🚀 Features

### For Job Seekers
- Browse and search all job listings
- Filter by title, location and job type
- Apply to jobs with resume upload
- View applied jobs and application status
- Separate dashboard and profile

### For Employers
- Post and manage job listings
- View all applications for each job
- Update application status (accepted/rejected)
- Separate dashboard and profile

### General
- JWT based authentication via cookies
- Google OAuth login support
- Forgot/reset password flow
- Fully responsive dark UI
- Pagination for job listings
- Toast notifications

---

## 🛠️ Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Auth:** JWT Cookies + Google OAuth (`@react-oauth/google`)
- **Notifications:** React Hot Toast
- **Routing:** React Router DOM
- **Deployment:** Vercel

---

## 📁 Project Structure
├── components/       # Reusable UI components
├── pages/            # Page level components
├── context/          # Auth context
├── api/              # Axios instance and API config
└── main.jsx          # Entry point with providers

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aaquib-anzar/Job_Board_frontend.git
cd Job_Board_frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file

VITE_API_BASE_URL=your_backend_url/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id

### 4. Start the development server
```bash
npm run dev
```

---

## 🖼️ Screenshots

> Coming soon

---

## 👨‍💻 Author

**Aaquib Anzar**
- Portfolio: [aaquib.vercel.app](https://aaquib.vercel.app)
- GitHub: [@aaquib-anzar](https://github.com/aaquib-anzar)
- LinkedIn: [aaquib-anzar](https://linkedin.com/in/aaquib-anzar-519771170)
