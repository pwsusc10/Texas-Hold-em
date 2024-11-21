import { VscChromeClose } from 'react-icons/vsc';

type Props = {
  className?: string;
  size?: number;
};

export default function CancelIcon({ className = '', size = 16 }: Props) {
  return <VscChromeClose className={`${className}`} size={size} />;
}
