/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Copy, RefreshCw, Type, AlignLeft, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateWords, generateSentences, generateParagraphs } from './lib/lorem';

type GenType = 'words' | 'sentences' | 'paragraphs';

export default function App() {
  const [type, setType] = useState<GenType>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    let text = '';
    const safeCount = Math.max(1, Math.min(count, 500)); // Limit to prevent browser hang
    
    switch (type) {
      case 'words':
        text = generateWords(safeCount);
        break;
      case 'sentences':
        text = generateSentences(safeCount);
        break;
      case 'paragraphs':
        text = generateParagraphs(safeCount);
        break;
    }
    setGeneratedText(text);
    setCopied(false);
  }, [type, count]);

  const handleCopy = async () => {
    if (!generatedText) return;
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans p-4 md:p-8 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">Lorem Ipsum</h1>
          <p className="text-muted-foreground font-light italic">Generate placeholder text instantly</p>
        </header>

        <div className="bg-white rounded-[24px] shadow-sm border border-black/5 p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Type Selector */}
            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block">
                Generate By
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'words', label: 'Words', icon: Type },
                  { id: 'sentences', label: 'Sentences', icon: AlignLeft },
                  { id: 'paragraphs', label: 'Paragraphs', icon: FileText },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setType(item.id as GenType)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                      type === item.id 
                        ? 'bg-[#1a1a1a] text-white shadow-md' 
                        : 'bg-[#f0f0f0] hover:bg-[#e5e5e5] text-[#4a4a4a]'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Count Input */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block">
                Quantity
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                  className="flex-1 bg-[#f0f0f0] border-none rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-black/5 outline-none transition-all"
                />
                <button
                  onClick={handleGenerate}
                  className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl hover:bg-black/90 transition-all flex items-center gap-2 shadow-md active:scale-95"
                >
                  <RefreshCw size={18} className={generatedText ? '' : 'animate-spin-slow'} />
                  Generate
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground italic">Max 500 units per generation</p>
            </div>
          </div>

          {/* Output Area */}
          <AnimatePresence mode="wait">
            {generatedText && (
              <motion.div
                key="output"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative group"
              >
                <div className="bg-[#fafafa] rounded-2xl p-6 border border-black/5 min-h-[200px] max-h-[500px] overflow-y-auto scrollbar-thin">
                  <div className="whitespace-pre-wrap leading-relaxed text-[#333] font-light">
                    {generatedText}
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleCopy}
                    className={`p-3 rounded-full transition-all duration-300 shadow-sm ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-[#1a1a1a] hover:bg-[#f0f0f0] border border-black/5'
                    }`}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="text-center text-[11px] text-muted-foreground uppercase tracking-widest opacity-60 flex flex-col gap-2">
          <span>Built for speed & utility</span>
          <span className="normal-case tracking-normal">
            © {new Date().getFullYear()} <a href="https://sanguilmu.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline underline-offset-2">Sangu Ilmu</a>. All rights reserved.
          </span>
        </footer>
      </motion.div>

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #d1d1d1;
        }
      `}</style>
    </div>
  );
}
