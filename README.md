# 🚀 Blogify

A modern full-stack blogging platform built with **Node.js, Express.js, MongoDB, and EJS**. Blogify allows users to create, manage, and share blogs with authentication, image uploads, comments, and role-based access control.

---

## 📖 Overview

Blogify is designed to provide a clean and scalable blogging experience. Users can register, authenticate securely, write articles, upload cover images, interact through comments, and manage their content through an intuitive interface.

---

## ✨ Features

### 👤 Authentication & Authorization
- User Registration & Login
- Password Hashing with bcrypt
- JWT / Cookie-Based Authentication
- Protected Routes
- Role-Based Access Control (RBAC)

### 📝 Blog Management
- Create Blog Posts
- Edit Existing Blogs
- Delete Blogs
- View Blog Details
- Upload Cover Images

### 💬 Community Features
- Comment on Blogs
- User Profiles
- Author Information Display

### 🛡️ Security
- Authentication Middleware
- Authorization Checks
- Input Validation
- Secure Environment Variables

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose ODM

### Other Tools
- Multer (File Uploads)
- JWT
- Cookie Parser
- Express Session
- Connect Flash

---

## 📂 Project Structure

```text
Blogify/
│
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
│
├── views/
│   ├── partials/
│   ├── user/
│   └── blog/
│
├── routes/
├── controllers/
├── models/
├── middlewares/
├── services/
├── config/
│
├── app.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd Blogify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Start Production Server

```bash
npm start
```

---

## 🌐 API Routes

### Authentication

| Method | Route | Description |
|---------|---------|-------------|
| GET | /user/signup | Signup Page |
| POST | /user/signup | Create Account |
| GET | /user/login | Login Page |
| POST | /user/login | Authenticate User |
| GET | /user/logout | Logout User |

### Blogs

| Method | Route | Description |
|---------|---------|-------------|
| GET | / | View All Blogs |
| GET | /blog/add-new | Add Blog |
| POST | /blog | Create Blog |
| GET | /blog/:id | Blog Details |
| POST | /blog/edit/:id | Update Blog |
| POST | /blog/delete/:id | Delete Blog |

---

## 🗄️ Database Models

### User

```javascript
{
  fullName: String,
  email: String,
  password: String,
  role: String,
  profileImageURL: String
}
```

### Blog

```javascript
{
  title: String,
  body: String,
  coverImageURL: String,
  createdBy: ObjectId,
  createdAt: Date
}
```

### Comment

```javascript
{
  content: String,
  blogId: ObjectId,
  createdBy: ObjectId
}
```

---

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t blogify .
```

### Run Container

```bash
docker run -p 8000:8000 blogify
```

---

## ☁️ AWS Elastic Beanstalk Deployment

```bash
eb init
eb create
eb deploy
```

---

## 📈 Future Enhancements

- Rich Text Editor
- Blog Categories & Tags
- Search & Filtering
- Likes & Bookmarks
- Email Verification
- Notifications
- Analytics Dashboard
- REST API Versioning
- Docker Compose Setup
- CI/CD with GitHub Actions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Priti Maurya**

If you found this project useful, consider giving it a ⭐ on GitHub.
