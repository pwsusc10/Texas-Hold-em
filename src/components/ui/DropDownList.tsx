import React from 'react';

interface Props<T> {
  options: T[];
  handleSelect: (value: T) => void;
  renderOption: (option: T) => React.ReactNode;
  border: boolean;
  className?: string;
}

export const DropDownList = <T,>({ options, handleSelect, renderOption, border, className = '' }: Props<T>) => {
  return (
    <ul
      className={
        className +
        ' absolute left-0 top-7 sm:top-8 z-50 bg-secondary max-h-[15rem] w-full overflow-y-auto rounded-md md:text-base text-xs whitespace-pre' +
        (border && ' border border-gray rounded-b-md')
      }
    >
      {options.length === 0 ? (
        <li>목록이 없습니다.</li>
      ) : (
        options.map((option, index) => (
          <li key={index} className={'py-1 px-3 hover:bg-gray'} onClick={() => handleSelect(option)}>
            {renderOption(option)}
          </li>
        ))
      )}
    </ul>
  );
};
