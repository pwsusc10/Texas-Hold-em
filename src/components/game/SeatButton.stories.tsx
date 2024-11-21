import { Meta, StoryFn } from '@storybook/react';
import SeatButton, { Props } from './SeatButton';

export default {
  title: 'SeatButton',
  component: SeatButton
} as Meta<typeof SeatButton>;

const Template: StoryFn<typeof SeatButton> = (args: Props) => <SeatButton {...args} />;

export const BasicButton = Template.bind({});

BasicButton.args = {
  onClick: () => console.log('Filled Button Clicked')
};
