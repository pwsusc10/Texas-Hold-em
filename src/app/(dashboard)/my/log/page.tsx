'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function page() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-3/5 mx-auto">
      <Tabs value={value} onChange={handleChange} centered textColor="inherit" variant="fullWidth">
        <Tab label="pre-flop" />
        <Tab label="flop" />
        <Tab label="turn" />
        <Tab label="river" />
      </Tabs>
      <p className="text-center font-semibold text-2xl pt-[4rem]">진행한 경기가 없습니다.</p>
    </div>
  );
}
