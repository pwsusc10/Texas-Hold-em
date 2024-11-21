import React, { useState } from 'react';
import { DropDownList } from './DropDownList';
import DownIcon from './icons/DownIcon';
import useOutSideRef from '@/hooks';

export interface DropDownProps<T> {
  placeholder: string;
  options: T[];
  initialOption?: T; // placeholder를 보여주기 위함.
  selectedOption: T;
  setSelectedOption: (value: T) => void;
  renderOption: (option: T) => React.ReactNode;
  border?: boolean;
  className?: string;
}

export const DropDown = <T,>({
  placeholder,
  options,
  initialOption,
  selectedOption,
  setSelectedOption,
  renderOption,
  border = true,
  className = ''
}: DropDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const outsideRef = useOutSideRef<HTMLButtonElement>(() => setIsOpen(false));

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: T) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <button
      className={
        className +
        (border && ' border border-gray') +
        ' relative min-w-24 md:min-w-32 w-max min-h-6 md:min-h-8 px-1 flex justify-between gap-1 items-center rounded-md cursor-pointer md:text-base sm:text-sm text-xs'
      }
      onClick={clickHandler}
      ref={outsideRef}
    >
      <span className="grow text-center">{selectedOption === initialOption ? placeholder : renderOption(selectedOption)}</span>
      <span className="flex justify-center items-center">
        <DownIcon />
      </span>
      {isOpen && <DropDownList options={options} handleSelect={handleSelect} renderOption={renderOption} border={border} className={className} />}
    </button>
  );
};
