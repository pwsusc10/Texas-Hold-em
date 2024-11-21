import RoomContainer from '@/components/game/RoomContainer';

type Props = {
  params: { roomId: string };
};

export default async function GamePlayPage({ params }: Props) {
  const { roomId } = params;

  return <RoomContainer roomId={roomId} />;
}
