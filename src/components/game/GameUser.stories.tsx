import { Meta, StoryFn } from '@storybook/react';
import GameUser from './GameUser';
import { UserData } from '../../../public/data';
import { initialGamePlayValue, initialPlayer } from '@/lib/initialValue';

export default {
  title: 'GameUser',
  component: GameUser
} as Meta<typeof GameUser>;

const Template: StoryFn<typeof GameUser> = () => <GameUser game={initialGamePlayValue} positionIndex={1} seat={4} user={UserData[0]} player={initialPlayer} />;

export const BasicGameUser = Template.bind({});
