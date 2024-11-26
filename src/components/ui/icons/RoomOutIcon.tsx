import { useSocket } from '@/context/SocketContext';
import { gamePlayAtom, userAtom } from '@/lib/atom';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LuLogOut } from 'react-icons/lu';

type Props = {
  className?: string;
  roomId: string;
};

export default function RoomOutIcon({ className = '', roomId }: Props) {
  const socket = useSocket();
  const user = useAtomValue(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;
    socket.on('leaveRoom', () => {
      router.push('/game');
    });
    return () => {
      socket.off('leaveRoom');
    };
  }, [socket]);

  if (!socket) return null;

  const roomOutHandler = () => {
    const result = confirm('Are you sure you want to leave the room?');
    if (result) {
      socket.emit('leaveRoom', { user, roomId });
    }
  };
  return <LuLogOut className={`${className} w-full h-full`} onClick={() => roomOutHandler()} />;
}
