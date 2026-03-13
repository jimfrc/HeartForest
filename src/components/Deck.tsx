import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card as CardComponent } from './Card';
import { Card as CardType } from '../types';
import { INITIAL_CARDS } from '../constants';
import { RefreshCcw, ChevronRight, ChevronLeft, Wand2, Loader2 } from 'lucide-react';
import { generateNewCard } from '../services/deepseekService';

export const Deck = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const shuffled = [...INITIAL_CARDS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const newCard = await generateNewCard(topic || '随机温馨话题');
      setDeck((prev) => [newCard, ...prev]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setTopic('');
    } catch (error) {
      console.error('Failed to generate card:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (deck.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <div className="relative mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={deck[currentIndex]?.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardComponent 
              card={deck[currentIndex]} 
              isFlipped={isFlipped} 
              onClick={() => setIsFlipped(!isFlipped)} 
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-[#000000]/60 font-medium">
          {currentIndex + 1} / {deck.length}
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full items-center">
        <div className="flex items-center gap-6">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full bg-white border border-[#E6D5C3] text-[#8B735B] hover:bg-[#FDFBF7] transition-colors shadow-sm"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleShuffle}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#443525] text-white hover:bg-[#7A624A] transition-colors shadow-md font-medium"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>重新洗牌</span>
          </button>

          <button 
            onClick={handleNext}
            className="p-3 rounded-full bg-white border border-[#E6D5C3] text-[#8B735B] hover:bg-[#FDFBF7] transition-colors shadow-sm"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="w-full max-w-sm bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/80 shadow-inner">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="输入话题（如：童年、未来、默契...）"
              className="flex-grow bg-white/80 border border-[#E6D5C3] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>灵感生成</span>
            </button>
          </div>
          <p className="text-[10px] text-[#8B735B]/60 mt-2 text-center">
            由 DeepSeek 提供 AI 灵感支持
          </p>
        </div>
      </div>
    </div>
  );
};
