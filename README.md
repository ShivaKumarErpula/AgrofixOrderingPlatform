---

```
# 🌽 Agrofix Ordering Platform

A full-stack web application for placing and managing bulk vegetable/fruit orders. It allows buyers to browse available products, place orders, and track them. Admins can manage products and order statuses efficiently.

---

## 🚀 Features

- 🥕 Product catalog for buyers
- 🧾 Order form for bulk purchases
- 📦 Order tracking using Order ID
- 🛠 Admin dashboard for managing products and orders
- 🌐 RESTful API with Next.js
- 💅 Tailwind CSS for styling
- 📊 PostgreSQL with Prisma ORM

---

## 🧰 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | Next.js + Tailwind CSS  |
| Backend     | API Routes (Next.js)    |
| Database    | PostgreSQL (Neon.tech)  |
| ORM         | Prisma                  |
| Deployment  | Vercel                  |

---

## 🛠 How to Run Locally

Follow the steps below to set up the project on your machine:

### 1. Clone the Repository

```bash
git clone https://github.com/ShivaKumarErpula/AgrofixOrderingPlatform.git
cd AgrofixOrderingPlatform
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

### 3. Create a `.env` File

Create a file called `.env` in the root folder and add your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://yourusername:yourpassword@yourhost:5432/yourdatabasename
```

If you're using [Neon.tech](https://neon.tech), copy the connection string from your Neon dashboard.

---

### 4. Set Up the Database

#### (a) Pull the schema if database is already created:

```bash
npx prisma db pull
```

#### (b) Or push the schema (if you're creating tables from Prisma):

```bash
npx prisma db push
```

#### (c) Generate Prisma Client:

```bash
npx prisma generate
```

---

### 5. Start the Development Server

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Agrofix site running!

---

## 📦 Production Deployment

You can deploy the app easily using [Vercel](https://vercel.com/):

1. Import your GitHub repo to Vercel.
2. Set the environment variable `DATABASE_URL` in the Vercel dashboard.
3. Deploy.

---

## 📝 Notes

- Don’t forget to **ignore the `.env` file**. It's already in `.gitignore`.
- Provide a `.env.example` file for others to know which variables they need to add.

---

## 📬 Contact

Made with ❤️ by Shiva Kumar Erpula  
GitHub: [@ShivaKumarErpula](https://github.com/ShivaKumarErpula)
```

---
