'use client';

import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function LogPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="mx-auto text-xs sm:text-sm md:text-base">
      <Tabs value={value} onChange={handleChange} centered textColor="inherit" aria-label="wrapped">
        <Tab label="pre-flop" wrapped />
        <Tab label="flop" />
        <Tab label="turn" />
        <Tab label="river" />
      </Tabs>
      <p className="text-center font-semibold text-xl sm:text-2xl pt-[4rem]">진행한 경기가 없습니다.</p>
    </div>
  );
}
