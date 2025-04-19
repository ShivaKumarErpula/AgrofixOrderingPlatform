

---

```
# 🌽 Agrofix Ordering Platform

A full-stack web application for placing and managing bulk vegetable/fruit orders. It allows buyers to browse available products, place orders, and track them. Admins can manage products and order statuses efficiently.

---

## 🚀 Features

- 🥕 **Product Catalog**: Buyers can view the available vegetables/fruits and their prices.
- 🧾 **Order Form**: Buyers can select products, specify quantities, and fill out delivery information to place bulk orders.
- 📦 **Order Tracking**: Buyers can track the status of their orders using the Order ID.
- 🛠 **Admin Dashboard**: Admins can view all orders, update order statuses, and manage the product catalog.
- 🌐 **RESTful API**: Built with Next.js API routes.
- 💅 **Tailwind CSS**: Used for responsive and modern UI design.
- 📊 **PostgreSQL**: Database for storing product and order data.
- 🔒 **Prisma ORM**: Simplifies database interactions and schema management.

---

## 🧰 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | Next.js + Tailwind CSS  |
| Backend     | API Routes (Next.js)    |
| Database    | PostgreSQL              |
| ORM         | Prisma ORM              |
| Deployment  | Vercel                  |

---

## 🛠 How to Run Locally

Follow the steps below to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/ShivaKumarErpula/AgrofixOrderingPlatform.git
cd AgrofixOrderingPlatform
```

### 2. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the necessary packages:

```bash
npm install
```

### 3. Set Up the Database

#### (a) Create a `.env` File

Create a `.env` file in the root folder and add your PostgreSQL connection string. If you're using [Neon.tech](https://neon.tech), copy the connection string from your Neon dashboard.

```env
DATABASE_URL=postgresql://yourusername:yourpassword@yourhost:5432/yourdatabasename
```

#### (b) Generate Prisma Client

Once the database is set up, generate the Prisma Client:

```bash
npx prisma generate
```

#### (c) Set Up the Database Schema

- If your database is already created, pull the schema:

```bash
npx prisma db pull
```

- If you're creating tables from Prisma, push the schema:

```bash
npx prisma db push
```

---

### 4. Run the Development Server

After setting up, you can run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

---

## 📦 Deployment on Vercel

You can deploy the application easily using [Vercel](https://vercel.com):

1. Create an account on [Vercel](https://vercel.com).
2. Import your GitHub repository to Vercel.
3. Add your environment variables (such as `DATABASE_URL`) in the Vercel dashboard.
4. Deploy the project.

---

## 📝 Notes

- Ensure to **ignore the `.env` file** by keeping it in `.gitignore`. This file should not be committed to version control.
- You can provide a `.env.example` file for others to understand which variables they need to set.
- For testing purposes, consider using mock data for the database if you don't have a real PostgreSQL setup.

---

## 📬 Contact

Made with ❤️ by Shiva Kumar Erpula  
GitHub: [@ShivaKumarErpula](https://github.com/ShivaKumarErpula)

---

```

---
