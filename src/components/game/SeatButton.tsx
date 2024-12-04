import React from 'react';

export type Props = {
  className?: string;
  onClick: () => void;
};

export default function SeatButton({ className = '', onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`${className} flex justify-center items-center text-white border-2 border-white bg-black rounded-full text-xs sm:text-sm md:text-base w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] md:w-[6rem] md:h-[6rem]`}
    >
      Seat
    </div>
  );
}
