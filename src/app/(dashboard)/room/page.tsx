import RoomContent from '@/components/room/RoomContent';
import MiniProfile from '@/components/user/MiniProfile';
import React from 'react';

export default function RoomPage() {
  return (
    <div className="flex gap-2">
      <RoomContent />
      <MiniProfile />
    </div>
  );
}
