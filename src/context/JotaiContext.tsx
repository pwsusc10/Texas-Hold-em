'use client';

import { Provider } from 'jotai';
import React, { PropsWithChildren } from 'react';

export default function JotaiContext({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
