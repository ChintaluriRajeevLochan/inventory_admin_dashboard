📦 Inventory Admin Dashboard (Server-Rendered)

🌐 Live Website:
👉 https://inventory-admin-dashboard-ebon.vercel.app/

📖 Project Overview

The Inventory Admin Dashboard is a server-rendered full-stack web application designed to manage products in an e-commerce or inventory system.
It provides a secure admin-only interface to manage products, upload images to the cloud, and visualize inventory insights using interactive charts.

The application uses Next.js (App Router) with server-side rendering (SSR) to ensure fast performance, SEO friendliness, and secure backend operations.

✨ Key Features

🔐 Admin Authentication & Authorization

Secure login using bcrypt-hashed passwords

Admin-only dashboard access

Secure admin onboarding (visible only to admins)

Logout functionality

📦 Product Management (CRUD)

Create, Read, Update, Delete products

Fields: product name, category, units, price (MRP), image

Automatic inventory value calculation

🖼 Secure Image Upload

Product images uploaded to Cloudinary

Images stored securely and accessed via URLs

📊 Interactive Analytics Dashboard

Category-wise inventory value (Pie Chart)

Product-wise units and inventory value (Bar Chart)

Product contribution to total inventory value (Pie Chart)

⚡ Server-Side Rendering (SSR)

Faster initial load times

Improved SEO

Secure server-side data fetching

🎨 Modern UI/UX

Styled with Tailwind CSS

Green & white login page (MongoDB-inspired)

Soft pink dashboard theme

🛠 Tech Stack
Frontend & Backend

Next.js 14 (App Router)

React

TypeScript

Styling

Tailwind CSS

PostCSS

Database

MongoDB Atlas

Mongoose ODM

Authentication & Security

bcryptjs

Server Actions (Next.js)

Image Storage

Cloudinary

Data Visualization

Recharts

Deployment

Vercel

⚙️ Local Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/inventory_admin_dashboard.git
cd inventory_admin_dashboard

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a file named .env.local in the root directory:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/inventory

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


⚠️ Do not commit .env.local to GitHub.

4️⃣ MongoDB Atlas Configuration

Create a MongoDB Atlas cluster

In Network Access, allow 0.0.0.0/0

Create a database named inventory

Insert a base admin document into the admins collection:

{
  "email": "admin@inventory.com",
  "password": "$2b$10$FCHWGFHwmCnbrZf6JMjo6.GSvoc9a7.mzcl5q8yp9cxzaC6sbpHm."
}


(Default password: admin123)

5️⃣ Run Locally
npm run dev


Open:

http://localhost:3000

🔐 Dummy Admin Credentials
Email: admin@inventory.com
Password: admin123

🌍 Live Deployment

The application is deployed on Vercel:

👉 Live URL:
https://inventory-admin-dashboard-ebon.vercel.app/

Environment variables are securely configured via the Vercel dashboard.
MongoDB Atlas is used for database storage and Cloudinary for image hosting.

📂 Project Structure
app/
 ├─ api/
 ├─ dashboard/
 ├─ models/
 └─ page.tsx
components/
lib/

🎥 Demo Video

https://youtu.be/SQ4mv1I2nHY?si=IGdVBM_Inswt71cZ

