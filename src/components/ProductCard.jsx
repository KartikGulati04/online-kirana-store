import React from 'react';
import { Plus, Minus, AlertTriangle, TrendingUp, Tag } from 'lucide-react';

export default function ProductCard({ 
  product, 
  viewMode, 
  cartItem, 
  onAddToCart, 
  onUpdateQty,
  onEditProduct,
  onDeleteProduct 
}) {
  const isLowStock = product.stockQuantity <= product.lowStockThreshold;
  const isOutOfStock = product.stockQuantity === 0;
  const profitMargin = product.sellingPrice - product.costPrice;
  const profitPercentage = product.sellingPrice > 0 ? ((profitMargin / product.sellingPrice) * 100).toFixed(1) : 0;

  return (
    <div className={`group relative bg-white rounded-2xl border transition duration-200 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
      isOutOfStock ? 'border-red-200 bg-slate-50/60 opacity-85' : isLowStock ? 'border-amber-200' : 'border-slate-200 hover:border-emerald-300'
    }`}>
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </span>
        ) : <span />}

        {isOutOfStock ? (
          <span className="bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <AlertTriangle className="w-3 h-3 text-slate-950" />
            <span>Only {product.stockQuantity} Left</span>
          </span>
        ) : null}
      </div>

      <div>
        {/* Product Image */}
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
            }}
          />
        </div>

        {/* Details Content */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>{product.category}</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-semibold">{product.unit}</span>
          </div>

          <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h4>

          {/* Pricing Info */}
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-xl font-black text-slate-900">₹{product.sellingPrice}</span>
              {product.costPrice && product.costPrice > 0 && product.sellingPrice > product.costPrice && (
                <span className="ml-1.5 text-xs text-slate-400 line-through">
                  ₹{Math.round(product.sellingPrice * 1.15)}
                </span>
              )}
            </div>

            {/* In Stock Count tag */}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              isOutOfStock ? 'bg-red-100 text-red-700' : isLowStock ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700'
            }`}>
              Stock: {product.stockQuantity}
            </span>
          </div>

          {/* Store Owner Analytics overlay card when in Owner mode */}
          {viewMode === 'owner' && (
            <div className="mt-3 p-2.5 bg-slate-900 text-white rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="text-slate-400">Cost Price:</span>
                <span className="font-bold text-slate-200">₹{product.costPrice}</span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-slate-400">Net Profit/Unit:</span>
                <span className="font-bold text-emerald-400">₹{profitMargin} ({profitPercentage}%)</span>
              </div>
              <div className="flex items-center justify-between font-mono border-t border-slate-800 pt-1 mt-1">
                <span className="text-slate-400">Stock Inventory Value:</span>
                <span className="font-bold text-amber-300">₹{product.stockQuantity * product.sellingPrice}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 pt-0">
        {viewMode === 'customer' ? (
          isOutOfStock ? (
            <button disabled className="w-full py-2.5 bg-slate-200 text-slate-400 rounded-xl font-bold text-xs cursor-not-allowed">
              Out of Stock
            </button>
          ) : cartItem ? (
            <div className="flex items-center justify-between bg-emerald-600 text-white rounded-xl p-1 shadow-md">
              <button
                onClick={() => onUpdateQty(product.id, cartItem.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-emerald-700 rounded-lg transition active:scale-95 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-extrabold text-sm px-2">{cartItem.quantity}</span>
              <button
                onClick={() => onUpdateQty(product.id, cartItem.quantity + 1)}
                disabled={cartItem.quantity >= product.stockQuantity}
                className="w-8 h-8 flex items-center justify-center hover:bg-emerald-700 rounded-lg transition active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm hover:shadow-emerald-200 cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          )
        ) : (
          /* Owner Actions */
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditProduct(product)}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition cursor-pointer"
            >
              Edit Item
            </button>
            <button
              onClick={() => onDeleteProduct(product.id)}
              className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
