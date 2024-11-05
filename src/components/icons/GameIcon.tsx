import { FaFantasyFlightGames } from 'react-icons/fa';

type Props = {
  className?: string;
};

export default function GameIcon({ className = '' }: Props) {
  return <FaFantasyFlightGames className={` ${className} w-full h-full`} />;
}
