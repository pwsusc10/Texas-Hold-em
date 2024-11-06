import { LuLogOut } from 'react-icons/lu';

type Props = {
  className?: string;
};

export default function RoomOutIcon({ className = '' }: Props) {
  return <LuLogOut className={`${className} w-full h-full`} />;
}
