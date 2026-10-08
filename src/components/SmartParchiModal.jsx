import React, { useState } from 'react';
import { X, FileText, CheckCircle2, AlertCircle, ShoppingBag, Sparkles, RefreshCw } from 'lucide-react';

export default function SmartParchiModal({ isOpen, onClose, products, onAddParsedToCart }) {
  const [parchiText, setParchiText] = useState(`2 kg Aashirvaad Atta
1 pkt Tata Salt
500g Amul Butter
2 pkt Maggi Noodles
1L Fortune Oil`);

  const [parsedResults, setParsedResults] = useState(null);

  if (!isOpen) return null;

  const handleParse = () => {
    if (!parchiText.trim()) return;

    const lines = parchiText.split(/\n|,|;/).filter(l => l.trim().length > 0);
    const results = [];

    lines.forEach(line => {
      const cleanLine = line.trim().toLowerCase();
      
      // Extract quantity e.g. "2", "500", "1"
      let qty = 1;
      const numMatch = cleanLine.match(/(\d+)/);
      if (numMatch) {
        qty = parseInt(numMatch[1], 10) || 1;
      }

      // Keyword match against products catalog
      const words = cleanLine.split(/\s+/).filter(w => w.length > 2 && !['pkt', 'packet', 'kg', 'ltr', 'litre', 'unit', 'g'].includes(w));
      
      let bestMatch = null;
      let highestScore = 0;

      products.forEach(prod => {
        const prodName = prod.name.toLowerCase();
        const prodCat = prod.category.toLowerCase();
        
        let score = 0;
        words.forEach(word => {
          if (prodName.includes(word)) score += 3;
          if (prodCat.includes(word)) score += 1;
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = prod;
        }
      });

      if (bestMatch && highestScore > 0) {
        results.push({
          line: line.trim(),
          matched: true,
          product: bestMatch,
          quantity: qty,
          estimatedCost: bestMatch.sellingPrice * qty
        });
      } else {
        results.push({
          line: line.trim(),
          matched: false,
          quantity: qty,
          estimatedCost: 0
        });
      }
    });

    setParsedResults(results);
  };

  const handleConfirmAddToCart = () => {
    if (!parsedResults) return;

    const matchedItems = parsedResults
      .filter(item => item.matched && item.product)
      .map(item => ({
        product: item.product,
        quantity: item.quantity
      }));

    if (matchedItems.length > 0) {
      onAddParsedToCart(matchedItems);
      onClose();
    }
  };

  const sampleLists = [
    { label: "Daily Breakfast List", text: "2 pkt Amul Milk\n1 pkt Amul Butter\n1 pkt Red Label Tea" },
    { label: "Monthly Staples Tab", text: "5kg Aashirvaad Atta\n5kg Basmati Rice\n1kg Tata Salt\n1L Fortune Oil" },
    { label: "Evening Snacks", text: "4 pkt Maggi Noodles\n1 pkt Dettol Soap" }
  ];

  const matchedCount = parsedResults ? parsedResults.filter(r => r.matched).length : 0;
  const totalEstimatedCost = parsedResults ? parsedResults.reduce((sum, r) => sum + r.estimatedCost, 0) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg">Smart Parchi List Parser</h3>
                <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Exclusive</span>
              </div>
              <p className="text-xs text-amber-100 font-medium">Type or paste your handwritten shopping list to auto-add to cart!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Quick Sample Lists</label>
            <div className="flex flex-wrap gap-2">
              {sampleLists.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setParchiText(sample.text);
                    setParsedResults(null);
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-amber-50 hover:border-amber-300 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition cursor-pointer"
                >
                  ⚡ {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Paste your shopping list (English / Hinglish):</label>
              {parsedResults && (
                <button
                  onClick={() => setParsedResults(null)}
                  className="text-xs text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Edit List
                </button>
              )}
            </div>
            <textarea
              rows={4}
              value={parchiText}
              onChange={(e) => {
                setParchiText(e.target.value);
                setParsedResults(null);
              }}
              placeholder="Example:&#10;2kg Aashirvaad Atta&#10;1 pkt Tata Salt&#10;500g Amul Butter&#10;2 pkt Maggi"
              className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-2xl text-sm font-mono text-slate-800 outline-none transition"
            />
          </div>

          {/* Parse Button */}
          {!parsedResults && (
            <button
              onClick={handleParse}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Parse & Match Inventory Items</span>
            </button>
          )}

          {/* Parsed Match Results */}
          {parsedResults && (
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <span>Detected Products</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
                    {matchedCount} / {parsedResults.length} Matched
                  </span>
                </h4>
                {totalEstimatedCost > 0 && (
                  <span className="text-sm font-black text-slate-900">
                    Est. Total: <span className="text-emerald-600">₹{totalEstimatedCost}</span>
                  </span>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {parsedResults.map((res, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition ${
                      res.matched
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                        : 'bg-red-50/50 border-red-200 text-red-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {res.matched ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-800">"{res.line}"</p>
                        {res.matched ? (
                          <p className="text-[11px] text-emerald-700 font-medium">
                            ➔ Matched: <strong className="font-bold">{res.product.name}</strong> ({res.product.unit}) × {res.quantity}
                          </p>
                        ) : (
                          <p className="text-[11px] text-red-600">
                            ➔ Item not recognized in stock. Check spelling or category.
                          </p>
                        )}
                      </div>
                    </div>

                    {res.matched && (
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm">₹{res.estimatedCost}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Confirm Add to Cart Button */}
              {matchedCount > 0 ? (
                <button
                  onClick={handleConfirmAddToCart}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {matchedCount} Matched Items to Cart (₹{totalEstimatedCost})</span>
                </button>
              ) : (
                <p className="text-center text-xs text-red-500 font-semibold py-2">
                  No products matched from your text list. Try editing the list above.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
