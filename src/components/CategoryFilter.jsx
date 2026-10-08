import React from 'react';
import { LayoutGrid, Wheat, Droplets, Milk, UtensilsCrossed, Sparkles, HeartPulse } from 'lucide-react';

const categories = [
  { id: 'All', name: 'All Categories', icon: LayoutGrid },
  { id: 'Atta, Rice & Pulses', name: 'Atta, Rice & Pulses', icon: Wheat },
  { id: 'Oils & Ghee', name: 'Oils & Ghee', icon: Droplets },
  { id: 'Dairy & Bakery', name: 'Dairy & Bakery', icon: Milk },
  { id: 'Snacks & Beverages', name: 'Snacks & Tea', icon: UtensilsCrossed },
  { id: 'Spices & Staples', name: 'Spices & Salt', icon: Sparkles },
  { id: 'Personal & Home Care', name: 'Soaps & Hygiene', icon: HeartPulse },
];

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <span>Categories</span>
          <span className="text-xs text-slate-400 font-normal">({categories.length - 1} sections)</span>
        </h3>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200 scale-102'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
