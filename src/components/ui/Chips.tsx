import { calculateChips } from '@/lib/util';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  amount: number;
};
export default function Chips({ amount }: Props) {
  const [chipCounts, setChipCounts] = useState<number[]>([]);

  useEffect(() => {
    const newChips = calculateChips(amount);
    setChipCounts(newChips);
  }, [amount]);

  const groupedChips = chipCounts.reduce(
    (acc, chipValue) => {
      if (!acc[chipValue]) {
        acc[chipValue] = [];
      }
      acc[chipValue].push(chipValue);
      return acc;
    },
    {} as Record<number, number[]>
  );

  return (
    <div className="flex gap-0">
      {Object.entries(groupedChips).map(([chipValue, chips], colIndex) => (
        <div key={colIndex} className="relative w-3">
          {chips.map((chip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ y: -index * 2, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="absolute top-0"
            >
              <Image src={`/images/chips/chip-${chip}.png`} width={16} height={16} alt="chip" />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
