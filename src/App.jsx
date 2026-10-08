import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import SmartParchiModal from './components/SmartParchiModal';
import CheckoutModal from './components/CheckoutModal';
import OwnerDashboard from './components/OwnerDashboard';
import { Sparkles, ShoppingBag, Store, ShieldCheck, Heart } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

// Initial Fallback Seed Products in case API server is starting
const fallbackProducts = [
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
    stockQuantity: 5,
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
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState('customer'); // 'customer' | 'owner'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [products, setProducts] = useState(fallbackProducts);
  const [orders, setOrders] = useState([]);
  const [khata, setKhata] = useState([]);
  const [cart, setCart] = useState([]);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isParchiOpen, setIsParchiOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Fetch initial data from server
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.log('Using local products data');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.log('Using local orders data');
    }
  };

  const fetchKhata = async () => {
    try {
      const res = await fetch(`${API_BASE}/khata`);
      if (res.ok) {
        const data = await res.json();
        setKhata(data);
      }
    } catch (e) {
      console.log('Using local khata data');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchKhata();
  }, []);

  // Cart Operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleAddParsedToCart = (itemsList) => {
    setCart((prev) => {
      let updated = [...prev];
      itemsList.forEach(({ product, quantity }) => {
        const existingIdx = updated.findIndex((i) => i.id === product.id);
        if (existingIdx !== -1) {
          updated[existingIdx].quantity += quantity;
        } else {
          updated.push({ ...product, quantity });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  // Order Placement
  const handlePlaceOrder = async (orderData, callback) => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const newOrder = await res.json();
        setOrders((prev) => [newOrder, ...prev]);
        setCart([]);
        fetchProducts();
        fetchKhata();
        callback(newOrder);
        return;
      }
    } catch (e) {
      console.log('Server offline, completing local order');
    }

    // Local Fallback
    const localOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...orderData,
      profitAmount: orderData.items.reduce((s, i) => s + ((i.sellingPrice - i.costPrice) * i.quantity), 0),
      status: 'Pending',
      date: new Date().toISOString()
    };
    setOrders((prev) => [localOrder, ...prev]);
    
    // Local stock deduction
    setProducts((prev) =>
      prev.map((p) => {
        const itemInOrder = orderData.items.find((i) => i.id === p.id);
        if (itemInOrder) {
          return { ...p, stockQuantity: Math.max(0, p.stockQuantity - itemInOrder.quantity) };
        }
        return p;
      })
    );
    setCart([]);
    callback(localOrder);
  };

  // Owner Handlers (Add, Update, Delete Products)
  const handleAddProduct = async (productData) => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        fetchProducts();
        return;
      }
    } catch (e) {}

    // Fallback
    const newP = { id: `prod-${Date.now()}`, ...productData };
    setProducts((prev) => [newP, ...prev]);
  };

  const handleUpdateProduct = async (id, updateFields) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateFields)
      });
      if (res.ok) {
        fetchProducts();
        return;
      }
    } catch (e) {}

    // Fallback
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updateFields } : p))
    );
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
        return;
      }
    } catch (e) {}

    // Fallback
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders();
        return;
      }
    } catch (e) {}

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleAddKhataTransaction = async (customerId, txData) => {
    try {
      const res = await fetch(`${API_BASE}/khata/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, ...txData })
      });
      if (res.ok) {
        fetchKhata();
        return;
      }
    } catch (e) {}

    // Local Fallback
    setKhata((prev) =>
      prev.map((k) => {
        if (k.id === customerId) {
          const newBal = txData.type === 'credit'
            ? Math.max(0, k.totalBalance - txData.amount)
            : k.totalBalance + txData.amount;

          return {
            ...k,
            totalBalance: newBal,
            history: [
              {
                id: `tx-${Date.now()}`,
                type: txData.type,
                amount: txData.amount,
                description: txData.description,
                date: new Date().toISOString()
              },
              ...k.history
            ]
          };
        }
        return k;
      })
    );
  };

  // Filter products by search and active category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCountSum = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      <div>
        {/* Navigation */}
        <Navbar
          viewMode={viewMode}
          setViewMode={setViewMode}
          cartCount={cartCountSum}
          setIsCartOpen={setIsCartOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsParchiOpen={setIsParchiOpen}
        />

        {viewMode === 'customer' ? (
          <main>
            {/* Hero Banner */}
            <Banner onOpenParchi={() => setIsParchiOpen(true)} />

            {/* Category Filter */}
            <CategoryFilter
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {/* Product Grid */}
            <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                    {activeCategory === 'All' ? 'All Kirana Items' : activeCategory}
                  </h3>
                  <p className="text-xs text-slate-500">Showing {filteredProducts.length} items available in store</p>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6 space-y-3">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">No matching products found</h4>
                  <p className="text-xs text-slate-500">Try searching for another keyword or change the category filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredProducts.map((product) => {
                    const cartItem = cart.find((i) => i.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                        cartItem={cartItem}
                        onAddToCart={handleAddToCart}
                        onUpdateQty={handleUpdateCartQty}
                        onEditProduct={() => {}}
                        onDeleteProduct={() => {}}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        ) : (
          /* Store Owner Mode */
          <main>
            <OwnerDashboard
              products={products}
              orders={orders}
              khata={khata}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onAddKhataTransaction={handleAddKhataTransaction}
            />
          </main>
        )}
      </div>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <SmartParchiModal
        isOpen={isParchiOpen}
        onClose={() => setIsParchiOpen(false)}
        products={products}
        onAddParsedToCart={handleAddParsedToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <span className="font-extrabold text-slate-800 text-sm">Apna Kirana Store</span>
            <span>• Powered by Digital Bahi-Khata</span>
          </div>

          <p className="text-slate-400">
            © 2026 Sharma Super Kirana Store. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
