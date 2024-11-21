import { Meta, StoryFn } from '@storybook/react';
import GameUser from './GameUser';
import { UserData } from '../../../public/data';

export default {
  title: 'GameUser',
  component: GameUser
} as Meta<typeof GameUser>;

const Template: StoryFn<typeof GameUser> = () => <GameUser user={UserData[0]} />;

export const BasicGameUser = Template.bind({});
