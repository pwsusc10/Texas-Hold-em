import { ActionType } from '@/model';
import React from 'react';

type Props = {
  action: ActionType;
  isWin: boolean;
};

export default function ActionPreview({ action, isWin }: Props) {
  const getColor = (action: ActionType) => {
    if (isWin) {
      return 'border-gold text-gold';
    }
    switch (action.type) {
      case 'bet':
        return 'border-white text-white';
      case 'all-in':
        return 'border-[#B5DAB9] text-[#B5DAB9]';
      case 'fold':
        return 'border-[#E9332F] text-[#E9332F]';
      case 'check':
      case 'call':
        return 'border-yellow text-yellow';
      case 'raise':
        return 'border-[#89A68C] text-[#89A68C]';
      case 're-raise':
        return 'border-[#8FDF98] text-[#8FDF98]';
      default:
        return 'border-white text-white';
    }
  };
  return (
    <div className={`w-full py-0.5 text-center bg-primary opacity-90 border rounded-md text-xs ${getColor(action)}`}>
      {isWin ? 'WIN' : action.type.toUpperCase()}
    </div>
  );
}
