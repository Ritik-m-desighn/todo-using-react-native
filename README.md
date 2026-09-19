🚀 Full-Stack MERN & React Native Todo App
A secure, cross-platform mobile application built with React Native on the frontend and a Node.js/Express & MongoDB backend. It features complete JWT-based user authentication (login/signup), token persistence using AsyncStorage, and full CRUD task management with real-time status badges.

✨ Features
User Authentication: Secure signup and login powered by JSON Web Tokens (JWT) and bcryptjs password hashing.

Persistent Sessions: Automatic authentication check on app startup via AsyncStorage so logged-in users bypass the login screen seamlessly.

Task Management (CRUD):

Add new tasks.

View a list of tasks with live status badges (Pending vs. Completed).

Toggle task completion status (with automatic visual strikethroughs).

Edit existing task titles inline.

Delete tasks.

Protected API Routes: All todo routes are guarded by Express authentication middleware verifying the user's Bearer token.

🛠️ Tech Stack
Frontend
React Native / Expo

React Navigation (Native Stack)

Axios (API requests)

AsyncStorage (Token storage)

Backend
Node.js & Express.js

MongoDB & Mongoose (Database & ODM)

JWT (JSON Web Tokens) & bcryptjs (Security & Auth)


├── backend/
│   ├── controllers/       # Auth and Todo business logic
│   ├── models/            # Mongoose schemas (User, Todo)
│   ├── routes/            # Express route handlers
│   └── middleware/        # JWT authentication verification
│
└── frontend/ (React Native)
    ├── screens/           # LoginScreen, RegisterScreen, TodoScreen
    └── App.tsx            # Root navigator & persistent auth check



⚙️ Getting Started & Installation
1. Clone the Repository
Bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Backend Setup
Navigate to your backend folder:

Bash
cd backend
Install dependencies:

Bash
npm install
Create a .env file in the root of your backend directory and add your environment variables:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
Start the backend server:

Bash
npm run dev
# or
node server.js
3. Frontend Setup
Navigate to your React Native frontend folder:

Bash
cd frontend
Install dependencies:

Bash
npm install
Run the application (for Android Emulator / Emulator environment using 10.0.2.2):

Bash
npx expo start
# or
npx react-native run-android

📱 App WorkflowNew User: Opens the app $\rightarrow$ Lands on LoginScreen $\rightarrow$ Clicks Register $\rightarrow$ Fills out Name, Email, and Password Instantly receives a JWT token and gets redirected to TodoScreen.

Returning User: Opens the app  AsyncStorage detects the saved token on Automatically skips login and loads TodoScreen.

Task Interaction: Tap a task to toggle its completed state, click Edit to modify the title, or click Delete to remove it.

