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
- Search Blogs
- Comments on the Blogs
- Likes Blogs

### 📝 Blog Management
- Create Blog Posts
- Edit Existing Blogs
- Delete Blogs
- View Blog Details
- Upload Cover Images
- Like
- Write your Feedbacks

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
- Bootstrap
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
| GET | /blog/create | Add Blog |
| POST | /blog | Create Blog |
| GET | /blog/:id | Blog Details |
| POST | /blog/edit/:id | Update Blog |
| POST | /blog/delete/:id | Delete Blog |
| GET | /blog/:id/Comment | Get All Comments |
| POST | /blog/:id/Comment | Create Comment |
| POST | /blog/:id/Like | Add Likes |

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
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e456f3ef-2723-4547-81c2-93664ed772f8" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2d59744f-d618-4618-9293-e0b1c05090b9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0dfd76df-f72e-4498-8efe-0cdf6be4876b" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7c448df9-aa28-4486-bc2b-644176cc9d13" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b36c5009-95b5-4932-b616-31a170cb8c85" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ec1826bf-6bdf-465f-a8ad-03ef68a63e23" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/84f8802a-5833-4cfa-9d7b-19716a52f491" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/723ab2fa-336a-4737-a595-127fd42f7dc1" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/73796ff1-f082-4110-8cc1-823c1749ec46" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6826cce3-cbec-4bf5-8238-8c9b6a8ee0ed" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6c0b32ad-a01d-46e9-acae-354cce80aceb" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/128cc434-26fe-4e30-9fed-d8b20584008b" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0d2da6f4-81b9-418f-904d-39a14ce26a6f" />

























## 👨‍💻 Author

**Priti Maurya**

If you found this project useful, consider giving it a ⭐ on GitHub.
