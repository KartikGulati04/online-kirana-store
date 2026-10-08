# 🛒 ApnaKirana – Smart Kirana Store & Digital Bahi-Khata Web App

A modern, fast, and feature-packed web application designed specifically for local Indian Kirana (grocery) stores. It combines a user-friendly **Customer Storefront** with a powerful **Store Owner Management Dashboard** featuring real-time stock tracking, net profit analytics, and a digital Bahi-Khata (Udhar ledger).

---

## ✨ Unique Features

- 📝 **Smart "Parchi" Quick List Parser:** Paste plain-text shopping lists (e.g. `2kg Aashirvaad Atta, 1 pkt Tata Salt`) to auto-match inventory items & add to cart instantly.
- 📒 **Digital Bahi-Khata (Monthly Udhar Tab):** Customers can choose "Pay via Khata" at checkout. Store owners can log credit balances, record cash repayments, and send 1-click WhatsApp payment reminders.
- 📊 **Net Profit & Sales Analytics:** Automatic calculation of Gross Revenue, Cost of Goods Sold (COGS), and Net Profit margins per product line.
- 📦 **Inventory & Low Stock Alerts:** Track total store stock quantity, set low-stock alert thresholds, and quick-adjust stock counts (`+10`, `-5`).
- 📲 **UPI QR Code & WhatsApp Receipts:** Generates dynamic GPay/PhonePe UPI QR codes and pre-formatted WhatsApp bill summaries.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Tailwind CSS v4, Lucide React Icons, Vite
- **Backend:** Node.js, Express.js, CORS
- **Storage:** Persistent JSON DB / LocalStorage

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Express Backend Server
```bash
node server/server.js
```
The server will run on `http://localhost:5000`.

### 3. Run React Frontend Web App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Mode Switching
Use the toggle in the top-right navbar to switch between:
1. **Customer View:** Browse items, search products, paste Parchi list, checkout via UPI / COD / Monthly Khata.
2. **Store Owner View:** Manage product prices, add new items, view P&L analytics, and record Khata payments.
