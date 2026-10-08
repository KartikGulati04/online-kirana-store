import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode, CheckCircle2, Phone, MapPin, User, Send, ShieldAlert } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, onPlaceOrder }) {
  const [customerName, setCustomerName] = useState('Ramesh Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('House #42, Main Market Road, Sector 4');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'cod' | 'khata'
  const [isPlaced, setIsPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;

    const orderData = {
      customerName,
      phone,
      address,
      items: cart.map(c => ({
        id: c.id,
        name: c.name,
        unit: c.unit,
        sellingPrice: c.sellingPrice,
        costPrice: c.costPrice || 0,
        quantity: c.quantity
      })),
      paymentMethod,
      totalAmount
    };

    onPlaceOrder(orderData, (newOrder) => {
      setPlacedOrderDetails(newOrder);
      setIsPlaced(true);
    });
  };

  const generateWhatsAppLink = () => {
    if (!placedOrderDetails) return '#';
    const text = `*New Order #${placedOrderDetails.id}*\n` +
      `*Customer:* ${placedOrderDetails.customerName}\n` +
      `*Phone:* ${placedOrderDetails.phone}\n` +
      `*Address:* ${placedOrderDetails.address}\n\n` +
      `*Items Ordered:*\n` +
      cart.map(i => `• ${i.name} (${i.unit}) × ${i.quantity} = ₹${i.sellingPrice * i.quantity}`).join('\n') +
      `\n\n*Total Amount:* ₹${totalAmount}\n` +
      `*Payment Method:* ${paymentMethod.toUpperCase()}`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">Checkout & Order Confirmation</h3>
            <p className="text-xs text-emerald-100">Sharma Kirana Superstore • Fast Express Delivery</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isPlaced ? (
          /* Order Placed Success Screen */
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                Order Confirmed #{placedOrderDetails?.id}
              </span>
              <h4 className="text-xl font-extrabold text-slate-800 mt-2">Thank you, {customerName}!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Your Kirana order will arrive at your address within <strong className="text-slate-800">15-20 minutes</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between font-medium text-slate-600">
                <span>Payment Mode:</span>
                <span className="font-bold text-slate-900 uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>Total Amount:</span>
                <span className="font-bold text-emerald-700 text-sm">₹{totalAmount}</span>
              </div>
              {paymentMethod === 'khata' && (
                <p className="text-[11px] text-amber-700 font-bold bg-amber-50 p-2 rounded-xl border border-amber-200 mt-2">
                  ℹ️ Added to your Monthly Khata ledger. You can settle the tab at month end!
                </p>
              )}
            </div>

            <div className="space-y-2">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Bill Summary to Store WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsPlaced(false);
                  onClose();
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-600" /> Customer Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Payment Method:</label>
              <div className="grid grid-cols-3 gap-2">
                
                {/* UPI QR Code */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs">UPI QR Code</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs">Pay on Delivery</span>
                </button>

                {/* Khata / Udhar Credit */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('khata')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    paymentMethod === 'khata'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200 text-amber-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  <span className="text-xs">Monthly Khata</span>
                </button>
              </div>
            </div>

            {/* If UPI option selected, display dynamic QR code mockup */}
            {paymentMethod === 'upi' && (
              <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-2">
                <p className="text-xs text-slate-300 font-medium">Scan & Pay via GPay / PhonePe / Paytm / BHIM</p>
                <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-inner">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9876543210@upi%26pn=SharmaKirana%26am=${totalAmount}`}
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-black text-amber-300">Amount to Pay: ₹{totalAmount}</p>
              </div>
            )}

            {/* If Khata option selected */}
            {paymentMethod === 'khata' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Monthly Udhar Credit:</strong> Order amount ₹{totalAmount} will be billed to your registered customer phone tab ({phone}).
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer active:scale-98"
            >
              <span>Confirm & Place Order (₹{totalAmount})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
