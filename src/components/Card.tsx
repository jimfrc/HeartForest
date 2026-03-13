import { motion } from 'motion/react';
import { Card as CardType } from '../types';
import { Heart, MessageCircle, Sparkles, Quote, HelpCircle } from 'lucide-react';

// 导入动物卡牌图片
const animalCardImages = [
  '../source/兔子卡牌.png',
  '../source/牛卡牌.png',
  '../source/狐狸卡牌.png',
  '../source/狗卡牌.png',
  '../source/狮子卡牌.png',
  '../source/猫卡牌.png',
  '../source/猴子卡牌.png',
  '../source/羊卡牌.png',
  '../source/老虎卡牌.png',
  '../source/老鼠卡牌.png',
  '../source/蛇卡牌.png',
  '../source/野猪卡牌.png',
  '../source/马卡牌.png',
  '../source/鸡卡牌.png',
  '../source/龙卡牌.png'
];

// 生成随机图片索引
const getRandomImageIndex = (cardId: string) => {
  // 使用cardId作为种子生成一致的随机索引
  let hash = 0;
  for (let i = 0; i < cardId.length; i++) {
    hash = cardId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % animalCardImages.length;
};

interface CardProps {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
}

const AnimalIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Koala': return <Heart className={className} />;
    case 'Rabbit': return <Sparkles className={className} />;
    case 'Fox': return <MessageCircle className={className} />;
    case 'Lion': return <Sparkles className={className} />;
    case 'Owl': return <Quote className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

export const Card = ({ card, isFlipped, onClick }: CardProps) => {
  const randomImage = animalCardImages[getRandomImageIndex(card.id)];
  
  return (
    <div className="relative w-72 h-96 cursor-pointer perspective-1000" onClick={onClick}>
      <motion.div
        className="w-full h-full relative transition-all duration-500 preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front of Card (Back of the deck) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-4 border-white flex flex-col items-center justify-end p-6 card-shadow relative overflow-hidden">
          {/* Animal card background image */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${randomImage})` }} />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent" />
          {/* Text content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center mb-8">
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 drop-shadow-lg font-bold">心语森林</h3>
            <p className="text-white/90 text-sm md:text-base max-w-xs drop-shadow-md">点击开启一段奇妙的对话</p>
          </div>
        </div>

        {/* Back of Card (The content) */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl border-4 border-white flex flex-col p-8 card-shadow rotate-y-180 ${card.color}`}
        >
          <div className="flex justify-between items-start mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
              card.category === 'deep-talk' ? 'bg-emerald-100 text-emerald-700' : 
              card.category === 'challenge' ? 'bg-rose-100 text-rose-700' : 
              'bg-indigo-100 text-indigo-700'
            }`}>
              {card.title}
            </span>
            <AnimalIcon name={card.animal} className="w-6 h-6 text-[#8B735B]" />
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            <p className="text-xl leading-relaxed text-[#4A4A4A] text-center font-medium">
              {card.content}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
             <div className="w-8 h-1 bg-[#8B735B]/20 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
