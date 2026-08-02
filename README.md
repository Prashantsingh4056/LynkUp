# LynkUp

LynkUp is a modern **Link-in-Bio platform** that helps creators, developers, students, and professionals build a personalized profile page with custom themes, profile images, and social links. Users can create a public page, customize its appearance, and share a single link across Instagram, LinkedIn, X, GitHub, and other platforms.

Built with the **MERN stack**, LynkUp includes secure authentication, email verification, password recovery, image management with ImageKit, and a responsive mobile-first interface.

---

## Live demo

**Live URL:** https://lynk-up-psi.vercel.app/

---

## Features

### Authentication

* Secure JWT authentication
* Email verification
* Forgot password and OTP-based password reset
* Protected dashboard routes

### Profile customization

* Unique public username
* Display name and bio
* Profile image upload
* Replace existing profile image
* Remove profile image
* Persistent profile settings

### Theme system

* Multiple professionally designed themes
* Live preview while editing
* Theme persistence across sessions
* Mobile-optimized profile layouts

### Link management

* Add unlimited links
* Edit and delete links
* Automatic URL formatting
* Clean public profile presentation

### Public profile

* Shareable profile URL
* Responsive mobile-first design
* Theme-aware rendering
* Fast loading and clean UI

---

## Screenshots

### Dashboard

Add your dashboard screenshot here.

### Theme customization

Add your theme customization screenshot here.

### Public profile

Add your public profile screenshot here.

---

## Tech stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer

### Services

* MongoDB Atlas
* ImageKit
* Email SMTP

---

## Project structure

```text
LynkUp/
├── Client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Server/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Getting started

### Clone the repository

```bash
git clone https://github.com/Prashantsingh4056/LynkUp.git
cd lynkup
```

### Backend setup

```bash
cd Server
npm install
```

Create a `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET_KEY=your_secret_key
CLIENT_URL=http://localhost:5173

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start the backend:

```bash
npm run dev
```

### Frontend setup

```bash
cd Client
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

---

## Environment variables

### Backend

| Variable                | Description               |
| ----------------------- | ------------------------- |
| `PORT`                  | Backend server port       |
| `MONGODB_URI`           | MongoDB connection string |
| `JWT_SECRET_KEY`        | JWT signing secret        |
| `CLIENT_URL`            | Frontend application URL  |
| `IMAGEKIT_PUBLIC_KEY`   | ImageKit public key       |
| `IMAGEKIT_PRIVATE_KEY`  | ImageKit private key      |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint     |
| `EMAIL_USER`            | SMTP email address        |
| `EMAIL_PASS`            | SMTP email password       |

### Frontend

| Variable       | Description     |
| -------------- | --------------- |
| `VITE_API_URL` | Backend API URL |

---

## Deployment

The application is designed for a production deployment using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **Image storage:** ImageKit

---

## Security features

* Password hashing with bcrypt
* JWT-based authentication
* Email verification before account activation
* Secure password reset flow
* Protected API routes
* Input validation
* CORS configuration

---

## Performance considerations

* Optimized React rendering
* Responsive mobile-first layout
* Efficient MongoDB queries
* CDN-based image delivery through ImageKit
* Single active profile image per user

---

## Roadmap

* Drag-and-drop link reordering
* Link analytics and click tracking
* Custom background patterns
* Additional premium themes
* Social icon customization
* QR code generation
* Custom domains

---

## Author

**Prashant Singh**

GitHub: https://github.com/Prashantsingh4056

LinkedIn: linkedin.com/in/prashant-singh-636982324

---

## License

This project is licensed under the MIT License.
