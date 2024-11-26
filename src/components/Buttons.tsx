export type Props = {
  children: React.ReactNode;
  onClick: () => void;
  filled: boolean;
  className?: string;
  disabled?: boolean;
};

export function ColorButton({ children, onClick, filled, className = '', disabled = false }: Props) {
  return (
    <button
      className={`${className} font-semibold border-2 rounded-md ${filled ? `border-white bg-yellow text-white` : 'border-yellow bg-white text-yellow hover:bg-slate-200'} ${disabled ? 'cursor-default' : 'cursor-pointer'} transition-all px-3 py-0.5`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BasicButton({ children, onClick, className = '', disabled = false }: Props) {
  return (
    <button
      className={`${className} font-semibold border-2 border-yellow rounded-md bg-primary text-yellow hover:bg-quaternary transition-all px-3 py-0.5`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

type CustomButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export const CustomButton = ({ children, onClick, className = '', disabled = false }: CustomButtonProps) => {
  return (
    <button
      className={`w-[5rem] text-center text-sm py-2.5 font-semibold border rounded-md hover:bg-tertiary hover:scale-105 transition-all ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
