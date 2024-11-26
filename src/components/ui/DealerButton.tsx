import React from 'react';

type Props = {
  className?: string;
  positionIndex: number;
};
export default function DealerButton({ className = '', positionIndex }: Props) {
  const dealerButtonPosition: string[] = [
    '-top-1/2 left-3/4',
    'top-3/4 left-full',
    'top-full left-full',
    'top-full left-full',
    '-bottom-3/4 left-2/3',
    '-bottom-3/4 right-2/3',
    'top-full right-full',
    'top-full right-full',
    'top-3/4 right-full'
  ];

  return (
    <div
      className={`${dealerButtonPosition[positionIndex]} absolute z-0 w-[2rem] aspect-[9/8] rounded-full bg-white shadow-md shadow-black flex justify-center items-center`}
    >
      <p className="text-black font-bold">D</p>
    </div>
  );
}
