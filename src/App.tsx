/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Deck } from './components/Deck';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('../source/卡牌背景全图.png')` }}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"></div>

      <header className="text-center z-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <Heart className="text-rose-400 fill-rose-400" size={24} />
          <h1 className="font-serif text-4xl md:text-5xl text-[#5D4037] tracking-tight">
            心语森林
          </h1>
          <Heart className="text-rose-400 fill-rose-400" size={24} />
        </motion.div>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[#4d4640] text-lg font-medium"
        >
          情侣深度互动卡牌 · 治愈系情感连接
        </motion.p>
      </header>

      <main className="flex-grow flex items-center justify-center w-full z-10 py-8">
        <Deck />
      </main>

      <footer className="text-center z-10 max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-2xl p-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-[#8B735B]">
            <Sparkles size={16} />
            <span className="text-sm font-bold uppercase tracking-widest">游戏指南</span>
            <Sparkles size={16} />
          </div>
          <p className="text-sm text-[#5D4037]/80 leading-relaxed">
            轮流点击卡牌开启对话或挑战。这不仅仅是一个游戏，更是一个让彼此慢下来、深入交流的机会。请在安静、舒适的环境中开始你们的森林之旅。
          </p>
        </motion.div>
        
        <p className="mt-8 text-xs text-[#8B735B]/50">
          © 2026 心语森林 · 愿每一份爱都被温柔对待
        </p>
      </footer>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-200/40"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
