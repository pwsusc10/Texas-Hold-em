import { PiPokerChipLight } from 'react-icons/pi';

type Props = {
  className?: string;
};

export default function CoinIcon({ className = '' }: Props) {
  return <PiPokerChipLight className={` ${className} w-full h-full`} />;
}
