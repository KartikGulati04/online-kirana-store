import React from 'react';
import { Truck, ShieldCheck, CreditCard, Sparkles, FileText, ArrowRight } from 'lucide-react';

export default function Banner({ onOpenParchi }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl shadow-xl my-4 mx-4 sm:mx-6 lg:mx-8">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Bahi-Khata & Smart Order System</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Aapka Apna <span className="text-emerald-400 underline decoration-amber-400 decoration-4">Local Kirana</span> Store
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Order fresh daily staples, atta, milk, ghee, and monthly ration with instant 15-min doorstep delivery. Pay via UPI, Cash, or <strong className="text-amber-300 font-bold">Add to Monthly Khata (Udhar)</strong>!
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              onClick={onOpenParchi}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl transition flex items-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer active:scale-98"
            >
              <FileText className="w-4 h-4" />
              <span>Paste "Smart Parchi" Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href="#products-section"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition backdrop-blur-sm"
            >
              Browse Catalog
            </a>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">15-Min Delivery</p>
              <p className="text-[11px] text-slate-300">Fast neighborhood drop</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Digital Khata</p>
              <p className="text-[11px] text-slate-300">Pay later tab enabled</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-300 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Fresh Guarantee</p>
              <p className="text-[11px] text-slate-300">Genuine branded items</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/20 text-purple-300 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Parchi Quick Order</p>
              <p className="text-[11px] text-slate-300">Paste text list directly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
