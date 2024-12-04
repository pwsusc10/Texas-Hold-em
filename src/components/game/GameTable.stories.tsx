import { Meta, StoryFn } from '@storybook/react';
import { RoomListData, UserData } from '../../../public/data';
import GameTable from './GameTable';
import { io, Socket } from 'socket.io-client';
import { GamePlayType } from '@/model';
import { initialUser } from '@/lib/initialValue';

export default {
  title: 'GameTable',
  component: GameTable
} as Meta<typeof GameTable>;

const socket: Socket = io();

const Template: StoryFn<typeof GameTable> = () => (
  <GameTable socket={socket} user={initialUser} roomId="1" room={RoomListData[0]} seat={0} setSeat={(seat: number) => {}} />
);

export const BasicGameUser = Template.bind({});
