type Props = {
  id: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange: (s: string) => void;
  required?: boolean;
  onFocus?: () => void;
  disable?: boolean;
  autocomplete?: boolean;
};

export function TextInput({ id, placeholder, className, onChange, value, onFocus, required = false, disable = false, autocomplete = true }: Props) {
  return (
    <input
      className={`font-normal px-2 py-1 md:text-base text-sm bg-input outline-none rounded-[4px] ${className}`}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      required={required}
      disabled={disable}
      autoComplete={autocomplete ? 'on' : 'off'}
    />
  );
}

export function TextArea({ id, placeholder, className, onChange, value, disable = false }: Props) {
  return (
    <textarea
      className={`${className} font-normal px-2 py-1 md:text-base text-sm bg-input outline-none resize-none rounded-[4px]`}
      id={id}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      value={value}
      disabled={disable}
    />
  );
}
