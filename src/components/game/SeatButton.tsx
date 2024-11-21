import React from 'react';

export type Props = {
  className?: string;
  onClick: () => void;
};

export default function SeatButton({ className = '', onClick }: Props) {
  return (
    <div onClick={onClick} className={`${className} w-[6rem] h-[6rem] flex justify-center items-center text-white border-2 border-white bg-black rounded-full`}>
      Seat
    </div>
  );
}
