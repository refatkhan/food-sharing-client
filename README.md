# 🍛 Food Sharing Platform — Frontend

This is the **frontend** for a full-stack Food Sharing web application, where users can donate and request leftover food, helping reduce food waste and assist those in need. The frontend is built with **React**, styled with **Tailwind CSS**, and hosted using **Firebase**.

---

## 🚀 Features

- 🔐 User Authentication with Firebase
- 🧾 Add, View, and Manage Donated Food
- 🍛 Request food via a modal popup
- ✅ Real-time "My Requests" status updates
- 🌟 View Featured Foods (Top 6 by quantity)
- 🌙 Light/Dark mode toggle
- 🌐 Responsive UI and client-side routing
- 🔄 Secure API communication with access tokens
- ⚡ Firebase-hosted

---

## 🛠 Tech Stack

| Category       | Tech                          |
|----------------|-------------------------------|
| Frontend       | React, Vite                   |
| UI Framework   | Tailwind CSS                  |
| Routing        | React Router DOM              |
| HTTP Client    | Axios                         |
| Auth           | Firebase Authentication       |
| Hosting        | Firebase Hosting              |
| State          | React Hooks + Context API     |

---

## 📁 Project Structure

\`\`\`
src/
├── components/              # Reusable UI components
│   ├── FoodCard.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── RequestModal.jsx
│   └── ...
├── pages/                   # Page-level components
│   ├── Home.jsx
│   ├── AddFood.jsx
│   ├── FoodDetails.jsx
│   ├── AvailableFoods.jsx
│   ├── ManageMyFoods.jsx
│   ├── MyFoodRequests.jsx
│   └── ...
├── provider/
│   └── AuthProvider.jsx     # Firebase Auth Context
├── routes/
│   └── Routes.jsx           # All route definitions
├── firebase/                # Firebase config
│   └── firebase.config.js
├── App.jsx
├── main.jsx
└── index.css
\`\`\`

---

## 🔐 Firebase Setup

- Firebase Auth is used for login/signup.
- User tokens are passed to backend for secured routes.

---

## 🔧 API Endpoints (Frontend Integration)

All backend endpoints are called using Axios, e.g.:

\`\`\`js
axios.post("http://localhost:3000/add-food", foodData)
\`\`\`

Sample endpoints:
| Method | Route                              | Description                     |
|--------|------------------------------------|---------------------------------|
| GET    | \`/all-foods\`                       | Get all available foods         |
| GET    | \`/food-featured\`                   | Get top 6 featured foods        |
| POST   | \`/add-food\`                        | Add food to the database        |
| POST   | \`/request-food\`                    | Request a food                  |
| GET    | \`/requested-foods\`                 | Get user's requested foods      |

---

## 🌐 Environment Variables

In \`.env\`:
\`\`\`env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_API_BASE=https://your-api-domain.com
\`\`\`

---

## ⚙️ Run Locally

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Open in browser
http://localhost:5173
\`\`\`

---

## 🚀 Deploy to Firebase Hosting

### 1. Build the Project
\`\`\`bash
npm run build
\`\`\`

### 2. Set up Firebase (if not already)
\`\`\`bash
firebase init
# Choose: Hosting, existing project
# Set public directory: dist
\`\`\`

### 3. Deploy
\`\`\`bash
firebase deploy
\`\`\`

---

## 🙋 Author

**Refat Khan**  
Frontend Developer – Assignment 11, Food Sharing Platform  
Email: _your-email@example.com_ (if desired)

---

## 📄 License

MIT
