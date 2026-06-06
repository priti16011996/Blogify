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
## Project Link : http://blogify-env.eba-maxykcaw.ap-south-1.elasticbeanstalk.com/blog/6a21975a3f4b43df2629f9b1
-----
## Project Images
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6eed6680-d4f9-45bd-a6c5-6de69eae01b3" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/12025dd2-6813-4cf6-b417-c7a03853aaa0" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bb57d74d-4129-48f3-b168-a137c6c5cded" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7d4f9c47-6b04-4428-b966-ce4874688e33" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7184ee69-048a-40ca-bc85-efaf67f44f72" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5196f09c-f598-4cb0-8d42-c0114978ecbe" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ca25283b-60ad-4068-904e-e2a54b8c2290" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9d5f4e80-7124-4978-b59e-3c234fdcccdb" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0d732f32-55e8-451a-adf6-57bb25cfd4a5" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e4206164-b907-4675-8fe3-24050920a18c" />












## 👨‍💻 Author

**Priti Maurya**

If you found this project useful, consider giving it a ⭐ on GitHub.
