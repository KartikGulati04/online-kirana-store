import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  UserPlus, 
  FileText, 
  Search, 
  Send,
  PieChart,
  ShieldCheck,
  RefreshCcw,
  BookOpen
} from 'lucide-react';

export default function OwnerDashboard({ 
  products, 
  orders, 
  khata, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onUpdateOrderStatus,
  onAddKhataTransaction
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'profit' | 'khata' | 'orders'
  
  // Product Form Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Atta, Rice & Pulses',
    sellingPrice: '',
    costPrice: '',
    stockQuantity: '',
    unit: '1 kg',
    lowStockThreshold: '5',
    image: '',
    badge: ''
  });

  // Khata Transaction Modal State
  const [isKhataModalOpen, setIsKhataModalOpen] = useState(false);
  const [selectedKhataCustomer, setSelectedKhataCustomer] = useState(null);
  const [txType, setTxType] = useState('credit'); // 'credit' (payment received) | 'debit' (more udhar)
  const [txAmount, setTxAmount] = useState('');
  const [txDesc, setTxDesc] = useState('');

  // Analytics Calculations
  const totalNetSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalNetProfit = orders.reduce((sum, o) => sum + (o.profitAmount || 0), 0);
  const totalInventoryCount = products.length;
  const totalStockQuantitySum = products.reduce((sum, p) => sum + Number(p.stockQuantity || 0), 0);
  const lowStockCount = products.filter(p => Number(p.stockQuantity) <= Number(p.lowStockThreshold)).length;
  const totalKhataBalance = khata.reduce((sum, k) => sum + Number(k.totalBalance || 0), 0);

  // Handlers for Products
  const handleOpenAddModal = (productToEdit = null) => {
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        sellingPrice: productToEdit.sellingPrice,
        costPrice: productToEdit.costPrice,
        stockQuantity: productToEdit.stockQuantity,
        unit: productToEdit.unit,
        lowStockThreshold: productToEdit.lowStockThreshold || 5,
        image: productToEdit.image || '',
        badge: productToEdit.badge || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Atta, Rice & Pulses',
        sellingPrice: '',
        costPrice: '',
        stockQuantity: '20',
        unit: '1 kg',
        lowStockThreshold: '5',
        image: '',
        badge: ''
      });
    }
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const productPayload = {
      name: formData.name,
      category: formData.category,
      sellingPrice: Number(formData.sellingPrice),
      costPrice: Number(formData.costPrice),
      stockQuantity: Number(formData.stockQuantity),
      unit: formData.unit,
      lowStockThreshold: Number(formData.lowStockThreshold),
      image: formData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      badge: formData.badge
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productPayload);
    } else {
      onAddProduct(productPayload);
    }
    setIsAddModalOpen(false);
  };

  // Handlers for Khata Payment Transaction
  const handleKhataSubmit = (e) => {
    e.preventDefault();
    if (!selectedKhataCustomer || !txAmount) return;

    onAddKhataTransaction(selectedKhataCustomer.id, {
      type: txType,
      amount: Number(txAmount),
      description: txDesc || (txType === 'credit' ? 'Cash/UPI Repayment' : 'Udhar Grocery Bill')
    });

    setIsKhataModalOpen(false);
    setTxAmount('');
    setTxDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Store Manager Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">Live Sync</span>
          </div>
          <h2 className="text-2xl font-black mt-1">Sharma Kirana Dashboard & POS Analytics</h2>
          <p className="text-xs text-slate-400">Track total inventory quantity, net sales, profit margin, and customer khata ledger.</p>
        </div>

        <button
          onClick={() => handleOpenAddModal()}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product Item</span>
        </button>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Net Sales */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Net Sales</span>
            <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">₹{totalNetSales}</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Total Completed Orders</p>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Net Profit</span>
            <div className="p-1.5 bg-teal-100 text-teal-700 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-black text-teal-700">₹{totalNetProfit}</div>
          <p className="text-[11px] text-teal-600 font-bold mt-1">Calculated Net Margin</p>
        </div>

        {/* Total Stock Quantity */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Stock Quantity</span>
            <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">{totalStockQuantitySum} <span className="text-xs font-normal text-slate-500">units</span></div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Across {totalInventoryCount} products</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Low Stock Alerts</span>
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-black text-amber-700">{lowStockCount}</div>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Needs Restock</p>
        </div>

        {/* Outstanding Khata */}
        <div className="col-span-2 md:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Khata Udhar Due</span>
            <div className="p-1.5 bg-purple-100 text-purple-700 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-black text-purple-900">₹{totalKhataBalance}</div>
          <p className="text-[11px] text-purple-600 font-bold mt-1">Customer Credits</p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Inventory Stock & Price Manager ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'profit'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Net Profit & P&L Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab('khata')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'khata'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Digital Bahi-Khata Ledger ({khata.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Customer Live Orders ({orders.length})</span>
        </button>
      </div>

      {/* Tab 1: Inventory Stock & Price Manager */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm">Product Inventory List</h3>
            <span className="text-xs text-slate-500">Edit prices, update stock levels, or remove items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 font-extrabold text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Cost Price (₹)</th>
                  <th className="p-3.5">Selling Price (₹)</th>
                  <th className="p-3.5">Unit Margin</th>
                  <th className="p-3.5">Stock Quantity</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {products.map((p) => {
                  const margin = p.sellingPrice - p.costPrice;
                  const isLow = p.stockQuantity <= p.lowStockThreshold;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-9 h-9 object-contain rounded-lg bg-slate-50 p-1 border border-slate-200" />
                          <div>
                            <p className="font-bold text-slate-900">{p.name}</p>
                            <p className="text-[11px] text-slate-400">{p.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600">{p.category}</td>
                      <td className="p-3.5 font-mono text-slate-600">₹{p.costPrice}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">₹{p.sellingPrice}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600">+₹{margin}</td>
                      
                      {/* Stock Adjust Control */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-black text-sm ${isLow ? 'text-amber-600' : 'text-slate-900'}`}>
                            {p.stockQuantity}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onUpdateProduct(p.id, { stockQuantity: Math.max(0, p.stockQuantity - 5) })}
                              className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-bold text-slate-700"
                              title="Decrease by 5"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => onUpdateProduct(p.id, { stockQuantity: p.stockQuantity + 10 })}
                              className="px-1.5 py-0.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded text-[10px] font-bold"
                              title="Add 10 stock"
                            >
                              +10
                            </button>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        {p.stockQuantity === 0 ? (
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Out of Stock</span>
                        ) : isLow ? (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Low Stock</span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Healthy</span>
                        )}
                      </td>

                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenAddModal(p)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Net Profit & P&L Analysis */}
      {activeTab === 'profit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-900 text-white p-6 rounded-3xl space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Gross Revenue (Net Sales)</span>
              <div className="text-3xl font-black">₹{totalNetSales}</div>
              <p className="text-xs text-emerald-200">Total payments collected across all orders</p>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cost of Goods Sold (COGS)</span>
              <div className="text-3xl font-black text-slate-200">₹{totalNetSales - totalNetProfit}</div>
              <p className="text-xs text-slate-400">Total cost price paid for inventory sold</p>
            </div>

            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 rounded-3xl space-y-2 shadow-lg">
              <span className="text-xs font-bold text-teal-100 uppercase tracking-wider">Clean Net Profit</span>
              <div className="text-3xl font-black">₹{totalNetProfit}</div>
              <p className="text-xs text-teal-100">
                Overall profit margin: <strong className="text-white font-bold">{totalNetSales > 0 ? ((totalNetProfit / totalNetSales) * 100).toFixed(1) : 0}%</strong>
              </p>
            </div>
          </div>

          {/* Item Margin Analysis Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-800 text-sm">Product Profit Margin Matrix</h3>
            </div>
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 font-extrabold text-slate-600 uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Cost Price</th>
                  <th className="p-3.5">Selling Price</th>
                  <th className="p-3.5">Profit / Unit</th>
                  <th className="p-3.5">Margin %</th>
                  <th className="p-3.5">Potential Stock Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {products.map(p => {
                  const unitProfit = p.sellingPrice - p.costPrice;
                  const marginPct = p.sellingPrice > 0 ? ((unitProfit / p.sellingPrice) * 100).toFixed(1) : 0;
                  const totalPotentialProfit = unitProfit * p.stockQuantity;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{p.name} ({p.unit})</td>
                      <td className="p-3.5 font-mono">₹{p.costPrice}</td>
                      <td className="p-3.5 font-mono font-bold">₹{p.sellingPrice}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600">+₹{unitProfit}</td>
                      <td className="p-3.5 font-bold text-slate-800">{marginPct}%</td>
                      <td className="p-3.5 font-mono font-black text-emerald-700">₹{totalPotentialProfit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Digital Khata Ledger */}
      {activeTab === 'khata' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-base">Customer Monthly Khata Accounts</h3>
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Total Credit Outstanding: ₹{totalKhataBalance}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {khata.map((customer) => (
              <div key={customer.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-black text-slate-900 text-base">{customer.customerName}</h4>
                    <p className="text-xs text-slate-500 font-medium">{customer.phone}</p>
                    <p className="text-[11px] text-slate-400">{customer.address}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500">Khata Tab Due</span>
                    <div className="text-2xl font-black text-purple-900">₹{customer.totalBalance}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                  <button
                    onClick={() => {
                      setSelectedKhataCustomer(customer);
                      setTxType('credit');
                      setIsKhataModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    + Record Payment Received
                  </button>

                  <a
                    href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Namaste ${customer.customerName} ji! Your total pending Kirana Udhar balance is ₹${customer.totalBalance}. Please clear it at your earliest convenience via GPay/Cash. Thank you!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-700" /> Remind WhatsApp
                  </a>
                </div>

                {/* History */}
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transaction Ledger</span>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {customer.history.map((tx) => (
                      <div key={tx.id} className="flex justify-between text-xs py-1 border-b border-slate-50">
                        <div>
                          <span className="font-bold text-slate-800">{tx.description}</span>
                          <span className="text-[10px] text-slate-400 block">{new Date(tx.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`font-mono font-bold ${tx.type === 'debit' ? 'text-red-600' : 'text-emerald-600'}`}>
                          {tx.type === 'debit' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Customer Live Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-800 text-sm">Recent Customer Orders</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 font-extrabold text-slate-600 uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer Details</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Order Profit</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold font-mono text-slate-900">#{o.id}</td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900">{o.customerName}</p>
                      <p className="text-[11px] text-slate-400">{o.phone}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="text-slate-800 font-semibold">{o.items.length} items</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{o.items.map(i => i.name).join(', ')}</p>
                    </td>
                    <td className="p-3.5 font-mono font-black text-slate-900 text-sm">₹{o.totalAmount}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-600">+₹{o.profitAmount}</td>
                    <td className="p-3.5 uppercase font-bold text-slate-600">{o.paymentMethod}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {o.status !== 'Delivered' ? (
                        <button
                          onClick={() => onUpdateOrderStatus(o.id, 'Delivered')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Mark Delivered
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs font-semibold">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {editingProduct ? 'Edit Product Item' : 'Add New Kirana Product'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Amul Gold Full Cream Milk"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  >
                    <option>Atta, Rice & Pulses</option>
                    <option>Oils & Ghee</option>
                    <option>Dairy & Bakery</option>
                    <option>Snacks & Beverages</option>
                    <option>Spices & Staples</option>
                    <option>Personal & Home Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit / Weight</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g. 500 ml, 1 kg"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cost Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.costPrice}
                    onChange={e => setFormData({ ...formData, costPrice: e.target.value })}
                    placeholder="25"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.sellingPrice}
                    onChange={e => setFormData({ ...formData, sellingPrice: e.target.value })}
                    placeholder="30"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.stockQuantity}
                    onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="50"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Low Stock Limit Alert</label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={e => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                    placeholder="5"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (Optional)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs transition cursor-pointer"
              >
                {editingProduct ? 'Update Product' : 'Save & Add Product to App'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Record Khata Transaction Modal */}
      {isKhataModalOpen && selectedKhataCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Record Khata Transaction</h3>
              <button onClick={() => setIsKhataModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleKhataSubmit} className="space-y-3">
              <p className="text-xs text-slate-600">
                Customer: <strong className="text-slate-900">{selectedKhataCustomer.customerName}</strong> (Current Balance: ₹{selectedKhataCustomer.totalBalance})
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Type</label>
                <select
                  value={txType}
                  onChange={e => setTxType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
                >
                  <option value="credit">Payment Received from Customer (- Credit Due)</option>
                  <option value="debit">Add New Udhar Bill (+ Credit Due)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={txAmount}
                  onChange={e => setTxAmount(e.target.value)}
                  placeholder="500"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Note / Description</label>
                <input
                  type="text"
                  value={txDesc}
                  onChange={e => setTxDesc(e.target.value)}
                  placeholder="e.g. Cash payment received"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Log Transaction
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
