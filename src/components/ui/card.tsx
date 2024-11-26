import { CardType } from '@/model';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  card: CardType;
  isOpen: boolean;
  phase: 'preFlop' | 'flop' | 'turn' | 'river' | 'showdown';
};

export default function Card({ card, isOpen, phase }: Props) {
  const shouldOpen = phase === 'showdown' ? true : isOpen;

  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: shouldOpen ? 0 : 180, scale: phase === 'showdown' ? 1.1 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ perspective: 1000 }}
      className={`relative w-full`}
    >
      <motion.div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', rotateY: 180 }} animate={{ rotateY: shouldOpen ? 0 : 180 }}>
        <Image src={`/images/cards/${card}.svg`} alt={card} width={50} height={75} />
      </motion.div>
      <motion.div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }} animate={{ rotateY: shouldOpen ? 180 : 0 }}>
        <Image src={`/images/cards/blue_back.svg`} alt="Card Back" width={50} height={75} />
      </motion.div>
    </motion.div>
  );
}
