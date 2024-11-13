import { FaUser } from 'react-icons/fa6';

type Props = {
  className?: string;
};

export function UserIcon({ className = '' }: Props) {
  return <FaUser className={`${className} w-full h-full`} />;
}

export function CircleUserIcon({ className = '' }: Props) {
  return (
    <div className={`${className} w-full h-full bg-tertiary rounded-full`}>
      <UserIcon className="p-3 text-gray-300" />
    </div>
  );
}
