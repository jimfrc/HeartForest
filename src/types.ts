export type CardCategory = 'deep-talk' | 'challenge' | 'wisdom';

export interface Card {
  id: string;
  category: CardCategory;
  title: string;
  content: string;
  animal: string; // Icon name or character name
  color: string;
  imageUrl?: string;
}

export interface GameState {
  currentCard: Card | null;
  history: Card[];
  deck: Card[];
}
