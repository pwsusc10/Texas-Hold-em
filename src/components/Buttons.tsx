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
      className={`${className} font-semibold border-2 border-yellow rounded-md ${filled ? `bg-yellow text-white` : 'bg-white text-yellow hover:bg-slate-200'} ${disabled ? 'cursor-default' : 'cursor-pointer'} transition-all px-3 py-0.5`}
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
