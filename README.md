# 🛒 বাজার দর | BazarDor

### দৈনন্দিন প্রয়োজনীয় পণ্যের বাজারদর এক নজরে

**বাজার দর (BazarDor)** is a Bangla-based market price tracking web application that helps users explore the latest prices of essential daily products in Bangladesh. Users can compare product prices, track price increases and decreases, browse products by category, and view market-specific price information through a clean and responsive interface.

---

## ✨ Key Features

- **📊 Daily Market Prices:** Explore the latest prices of essential products with prices displayed in Bangla numerals and Bangladeshi Taka (৳).
- **📈 Price Change Tracking:** Quickly identify products whose prices have increased or decreased.
- **🛍️ Product & Category Browsing:** Browse products by category, explore product details, and sort products by price.
- **🔐 Secure Authentication:** Sign up and sign in using Better Auth, with support for email/password and Google/GitHub authentication.
- **👤 User Profile Management:** View profile information and update your name.
- **🏪 Market-wise Price Comparison:** Explore product price summaries and compare prices across different markets.
- **📱 Fully Responsive Design:** Enjoy a user-friendly experience across mobile, tablet, and desktop devices.
- **⚡ Loading States & Notifications:** Get loading indicators and helpful notifications during important actions.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Building interactive user interfaces |
| TypeScript | Type-safe development |
| Tailwind CSS | Responsive styling and UI design |
| Better Auth | Authentication and user management |
| MongoDB | Database integration |
| React Hot Toast / Toast Library | User notifications |
| Lucide React | Icons and interface elements |
| Vercel | De osting |

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/imrulhassanemon/bazar-dor
```

### 2. Navigate to the project directory

```bash
cd bazar-dor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by your Better Auth and MongoDB configuration.

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

If you enable Google or GitHub authentication, configure the corresponding OAuth client credentials as required by your project.

**Important:** Use your actual environment variable names from the project configuration. Never commit secrets, database credentials, or OAuth client secrets to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
```

---

## 🌐 Live Demo

**Live Website:** https://bazer-dor-14.vercel.app/

**GitHub Repository:** https://github.com/imrulhassanemon/bazar-dor

---

## 🎯 Project Goal

The goal of BazarDor is to make essential commodity prices easier to explore and compare for people in Bangladesh. By presenting market information in Bangla with a simple, accessible interface, the platform helps users understand daily price changes more conveniently.

---

## 📄 License

This project was developed for educational and portfolio purposes.

---

**Built with ❤️ in Bangladesh | বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**