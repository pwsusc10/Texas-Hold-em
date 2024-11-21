import { Meta, StoryFn } from '@storybook/react';
import { RoomListData, UserData } from '../../../public/data';
import GameTable from './GameTable';
import { io, Socket } from 'socket.io-client';
import { GamePlayType } from '@/model';

export default {
  title: 'GameTable',
  component: GameTable
} as Meta<typeof GameTable>;

const socket: Socket = io();

const Template: StoryFn<typeof GameTable> = () => <GameTable socket={socket} roomId="1" room={RoomListData[0]} setRoom={(room: GamePlayType) => {}} />;

export const BasicGameUser = Template.bind({});
