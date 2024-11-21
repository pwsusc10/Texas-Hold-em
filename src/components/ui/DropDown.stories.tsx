import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DropDown, DropDownProps } from './DropDown';
import { timeList } from '@/lib/room';

export default {
  title: 'DropDown',
  tags: ['autodocs'],
  component: DropDown
} as Meta;

const Template: StoryFn<DropDownProps<number>> = args => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <DropDown
      {...args}
      selectedOption={selected}
      setSelectedOption={value => {
        setSelected(value);
        args.setSelectedOption(value);
      }}
      renderOption={option => <span>{option}</span>}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '시간을 선택해주세요',
  options: timeList,
  border: true,
  className: ''
};

export const WithoutBorder = Template.bind({});
WithoutBorder.args = {
  ...Default.args,
  border: false
};
