import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'db.json');

// Initial Kirana Seed Data
const initialData = {
  products: [
    {
      id: "prod-1",
      name: "Aashirvaad Shuddh Chakki Atta",
      category: "Atta, Rice & Pulses",
      costPrice: 280,
      sellingPrice: 340,
      stockQuantity: 45,
      unit: "5 kg",
      image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 10,
      badge: "Best Seller"
    },
    {
      id: "prod-2",
      name: "Fortune Sunlite Refined Sunflower Oil",
      category: "Oils & Ghee",
      costPrice: 125,
      sellingPrice: 155,
      stockQuantity: 30,
      unit: "1 L",
      image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 8,
      badge: "Essential"
    },
    {
      id: "prod-3",
      name: "Tata Salt Vacuum Evaporated Iodised",
      category: "Spices & Staples",
      costPrice: 20,
      sellingPrice: 28,
      stockQuantity: 120,
      unit: "1 kg",
      image: "https://images.unsplash.com/photo-1518110165389-13e61405e3a8?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 20,
      badge: ""
    },
    {
      id: "prod-4",
      name: "Amul Taaza Toned Fresh Milk",
      category: "Dairy & Bakery",
      costPrice: 26,
      sellingPrice: 30,
      stockQuantity: 5, // Low stock alert!
      unit: "500 ml",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 10,
      badge: "Low Stock"
    },
    {
      id: "prod-5",
      name: "Amul Butter Pasteurised",
      category: "Dairy & Bakery",
      costPrice: 48,
      sellingPrice: 58,
      stockQuantity: 25,
      unit: "100 g",
      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 5,
      badge: ""
    },
    {
      id: "prod-6",
      name: "India Gate Basmati Rice Feast Rozzana",
      category: "Atta, Rice & Pulses",
      costPrice: 320,
      sellingPrice: 415,
      stockQuantity: 18,
      unit: "5 kg",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 5,
      badge: "Popular"
    },
    {
      id: "prod-7",
      name: "Red Label Strong Tea Powder",
      category: "Snacks & Beverages",
      costPrice: 110,
      sellingPrice: 140,
      stockQuantity: 40,
      unit: "250 g",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 10,
      badge: ""
    },
    {
      id: "prod-8",
      name: "Maggi 2-Minute Masala Noodles Pack",
      category: "Snacks & Beverages",
      costPrice: 50,
      sellingPrice: 60,
      stockQuantity: 80,
      unit: "4 x 70 g",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 15,
      badge: "Top Seller"
    },
    {
      id: "prod-9",
      name: "Surf Excel Easy Wash Detergent Powder",
      category: "Personal & Home Care",
      costPrice: 115,
      sellingPrice: 145,
      stockQuantity: 22,
      unit: "1 kg",
      image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 6,
      badge: ""
    },
    {
      id: "prod-10",
      name: "Dettol Antiseptic Soap Bar 3+1 Pack",
      category: "Personal & Home Care",
      costPrice: 130,
      sellingPrice: 160,
      stockQuantity: 35,
      unit: "4 x 125 g",
      image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=400&q=80",
      lowStockThreshold: 8,
      badge: ""
    }
  ],
  orders: [
    {
      id: "ORD-1001",
      customerName: "Ramesh Kumar Sharma",
      phone: "+91 98765 43210",
      address: "House #42, Sector 14, Near Main Market",
      items: [
        { id: "prod-1", name: "Aashirvaad Shuddh Chakki Atta", unit: "5 kg", sellingPrice: 340, costPrice: 280, quantity: 1 },
        { id: "prod-3", name: "Tata Salt Vacuum Evaporated Iodised", unit: "1 kg", sellingPrice: 28, costPrice: 20, quantity: 2 }
      ],
      totalAmount: 396,
      profitAmount: 76,
      paymentMethod: "upi",
      status: "Delivered",
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "ORD-1002",
      customerName: "Sunita Verma",
      phone: "+91 99887 76655",
      address: "Flat 203, Green Valley Apartments",
      items: [
        { id: "prod-2", name: "Fortune Sunlite Refined Sunflower Oil", unit: "1 L", sellingPrice: 155, costPrice: 125, quantity: 2 },
        { id: "prod-5", name: "Amul Butter Pasteurised", unit: "100 g", sellingPrice: 58, costPrice: 48, quantity: 1 }
      ],
      totalAmount: 368,
      profitAmount: 70,
      paymentMethod: "khata",
      status: "Pending",
      date: new Date().toISOString()
    }
  ],
  khata: [
    {
      id: "khata-1",
      customerName: "Sunita Verma",
      phone: "+91 99887 76655",
      address: "Flat 203, Green Valley Apartments",
      totalBalance: 1450,
      creditLimit: 5000,
      history: [
        { id: "tx-1", type: "debit", amount: 368, description: "Order #ORD-1002 (Oil & Butter)", date: new Date().toISOString() },
        { id: "tx-2", type: "debit", amount: 1082, description: "Monthly Groceries Tab (Sept)", date: new Date(Date.now() - 1000000000).toISOString() }
      ]
    },
    {
      id: "khata-2",
      customerName: "Vikram Malhotra",
      phone: "+91 91234 56789",
      address: "Shop 12, Main Road",
      totalBalance: 820,
      creditLimit: 3000,
      history: [
        { id: "tx-3", type: "debit", amount: 1320, description: "Bulk Rice & Spices Purchase", date: new Date(Date.now() - 500000000).toISOString() },
        { id: "tx-4", type: "credit", amount: 500, description: "Partial Payment via UPI", date: new Date(Date.now() - 200000000).toISOString() }
      ]
    }
  ]
};

// Initialize DB file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return initialData;
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Routes

// 1. Products
app.get('/api/products', (req, res) => {
  const db = readData();
  res.json(db.products);
});

app.post('/api/products', (req, res) => {
  const db = readData();
  const newProd = {
    id: `prod-${Date.now()}`,
    name: req.body.name,
    category: req.body.category || 'General',
    costPrice: Number(req.body.costPrice) || 0,
    sellingPrice: Number(req.body.sellingPrice) || 0,
    stockQuantity: Number(req.body.stockQuantity) || 0,
    unit: req.body.unit || '1 unit',
    image: req.body.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    lowStockThreshold: Number(req.body.lowStockThreshold) || 5,
    badge: req.body.badge || ''
  };
  db.products.unshift(newProd);
  writeData(db);
  res.status(201).json(newProd);
});

app.put('/api/products/:id', (req, res) => {
  const db = readData();
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx !== -1) {
    db.products[idx] = { ...db.products[idx], ...req.body };
    writeData(db);
    res.json(db.products[idx]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const db = readData();
  db.products = db.products.filter(p => p.id !== req.params.id);
  writeData(db);
  res.json({ success: true, id: req.params.id });
});

// 2. Orders
app.get('/api/orders', (req, res) => {
  const db = readData();
  res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
  const db = readData();
  const { customerName, phone, address, items, paymentMethod } = req.body;

  let totalAmount = 0;
  let profitAmount = 0;

  // Deduct inventory stock & calculate profit
  items.forEach(cartItem => {
    const p = db.products.find(prod => prod.id === cartItem.id);
    if (p) {
      const qty = cartItem.quantity;
      p.stockQuantity = Math.max(0, p.stockQuantity - qty);
      totalAmount += p.sellingPrice * qty;
      profitAmount += (p.sellingPrice - p.costPrice) * qty;
    }
  });

  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    phone,
    address,
    items,
    totalAmount,
    profitAmount,
    paymentMethod,
    status: 'Pending',
    date: new Date().toISOString()
  };

  db.orders.unshift(newOrder);

  // If Khata (Udhar) payment, record in Khata Ledger
  if (paymentMethod === 'khata') {
    let customerKhata = db.khata.find(k => k.phone === phone || k.customerName.toLowerCase() === customerName.toLowerCase());
    if (!customerKhata) {
      customerKhata = {
        id: `khata-${Date.now()}`,
        customerName,
        phone,
        address,
        totalBalance: 0,
        creditLimit: 5000,
        history: []
      };
      db.khata.unshift(customerKhata);
    }
    customerKhata.totalBalance += totalAmount;
    customerKhata.history.unshift({
      id: `tx-${Date.now()}`,
      type: 'debit',
      amount: totalAmount,
      description: `Order #${newOrder.id}`,
      date: new Date().toISOString()
    });
  }

  writeData(db);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/status', (req, res) => {
  const db = readData();
  const order = db.orders.find(o => o.id === req.params.id);
  if (order) {
    order.status = req.body.status;
    writeData(db);
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// 3. Khata Ledger
app.get('/api/khata', (req, res) => {
  const db = readData();
  res.json(db.khata);
});

app.post('/api/khata/transaction', (req, res) => {
  const { customerId, type, amount, description } = req.body;
  const db = readData();
  const customer = db.khata.find(k => k.id === customerId);
  if (customer) {
    const numAmount = Number(amount);
    if (type === 'credit') { // Payment received from customer
      customer.totalBalance = Math.max(0, customer.totalBalance - numAmount);
    } else { // Debit (more credit given)
      customer.totalBalance += numAmount;
    }
    customer.history.unshift({
      id: `tx-${Date.now()}`,
      type,
      amount: numAmount,
      description: description || (type === 'credit' ? 'Payment Received' : 'Udhar / Credit Entry'),
      date: new Date().toISOString()
    });
    writeData(db);
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer Khata not found' });
  }
});

// 4. Owner Analytics Summary
app.get('/api/analytics', (req, res) => {
  const db = readData();

  const totalSales = db.orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalNetProfit = db.orders.reduce((sum, o) => sum + (o.profitAmount || 0), 0);
  const totalProducts = db.products.length;
  const totalStockQuantity = db.products.reduce((sum, p) => sum + p.stockQuantity, 0);
  const lowStockCount = db.products.filter(p => p.stockQuantity <= p.lowStockThreshold).length;
  const totalKhataOutstanding = db.khata.reduce((sum, k) => sum + k.totalBalance, 0);

  res.json({
    totalSales,
    totalNetProfit,
    totalProducts,
    totalStockQuantity,
    lowStockCount,
    totalKhataOutstanding,
    recentOrdersCount: db.orders.length
  });
});

// 5. Smart "Parchi" Quick List Parser API
app.post('/api/parchi/parse', (req, res) => {
  const { parchiText } = req.body;
  if (!parchiText) {
    return res.json({ matches: [] });
  }

  const db = readData();
  const lines = parchiText.split(/\n|,|;/).filter(l => l.trim().length > 0);
  const results = [];

  lines.forEach(line => {
    const cleanLine = line.trim().toLowerCase();
    
    // Extract quantity pattern e.g. "2 kg", "1 pkt", "500g", "3"
    let requestedQty = 1;
    const qtyMatch = cleanLine.match(/(\d+)\s*(kg|g|litre|l|pkt|packet|pc|pcs)?/i);
    if (qtyMatch) {
      requestedQty = parseInt(qtyMatch[1]) || 1;
    }

    // Try matching product name against inventory
    const matchedProduct = db.products.find(p => {
      const name = p.name.toLowerCase();
      const cat = p.category.toLowerCase();
      // Match keywords e.g. "atta", "salt", "oil", "milk", "butter", "tea", "maggi", "soap", "rice"
      const words = cleanLine.split(' ');
      return words.some(w => w.length > 2 && (name.includes(w) || cat.includes(w)));
    });

    if (matchedProduct) {
      results.push({
        matched: true,
        originalLine: line.trim(),
        product: matchedProduct,
        quantity: requestedQty
      });
    } else {
      results.push({
        matched: false,
        originalLine: line.trim(),
        quantity: requestedQty
      });
    }
  });

  res.json({ parsed: results });
});

app.listen(PORT, () => {
  console.log(`Kirana Store Server running on http://localhost:${PORT}`);
});
