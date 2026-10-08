import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQty, 
  onRemoveItem, 
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  const totalSavings = cart.reduce((sum, item) => {
    const originalEst = Math.round(item.sellingPrice * 1.15);
    return sum + (originalEst - item.sellingPrice) * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Your Shopping Cart</h3>
                <p className="text-xs text-slate-500 font-medium">{cart.length} unique items</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-lg">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Add items from the store or paste your handwritten list using the <strong className="text-amber-600">Smart Parchi</strong> feature!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain bg-white p-1 rounded-xl border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-800 text-xs line-clamp-1">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">{item.unit}</p>
                    <div className="mt-1 font-black text-slate-900 text-sm">
                      ₹{item.sellingPrice} <span className="text-[10px] text-slate-400 font-normal">/ unit</span>
                    </div>
                  </div>

                  {/* Qty Controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-extrabold text-xs px-2 text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[11px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              {totalSavings > 0 && (
                <div className="p-2.5 bg-emerald-100/80 text-emerald-800 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Yay! You save ₹{totalSavings} on this order!</span>
                </div>
              )}

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-slate-800">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Express Delivery Fee</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-emerald-700">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
