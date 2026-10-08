import React from 'react';
import { ShoppingBag, Store, FileText, Search, UserCheck, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  cartCount, 
  setIsCartOpen, 
  searchQuery, 
  setSearchQuery,
  setIsParchiOpen 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white text-xs py-1.5 px-4 font-medium flex justify-between items-center">
        <div className="flex items-center gap-2 container mx-auto">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">⚡ 15-Min Express</span>
          <span>Sharma Super Kirana Store • Free Home Delivery on orders above ₹299</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-emerald-100">
          <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3" /> Helpline: +91 98765 43210</span>
          <span>•</span>
          <span className="text-emerald-200 font-semibold">📍 Model Town, Sector 4</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Store Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-200 font-bold text-xl ring-2 ring-emerald-400/30">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl text-slate-800 tracking-tight flex items-center gap-1">
                Apna<span className="text-emerald-600">Kirana</span>
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Bachat Bhi, Trust Bhi • Direct Local Store</p>
          </div>
        </div>

        {/* Search Bar - Customer View */}
        {viewMode === 'customer' && (
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Atta, Milk, Oil, Maggi, Soaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-xl transition outline-none font-medium placeholder-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Smart Parchi Button (Customer Mode) */}
          {viewMode === 'customer' && (
            <button
              onClick={() => setIsParchiOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold transition shadow-2xs hover:scale-102"
              title="Paste your handwritten list to auto-add items"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">Paste List</span>
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">Parchi</span>
            </button>
          )}

          {/* Cart Button (Customer Mode) */}
          {viewMode === 'customer' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition shadow-sm hover:shadow-emerald-200"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-slate-900 font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Mode Switcher Toggle: Customer vs Store Owner */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'customer'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => setViewMode('owner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'owner'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Store Owner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search input */}
      {viewMode === 'customer' && (
        <div className="px-4 pb-3 sm:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Atta, Milk, Oil, Maggi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 text-sm border border-slate-200 focus:border-emerald-500 rounded-xl transition outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
}
