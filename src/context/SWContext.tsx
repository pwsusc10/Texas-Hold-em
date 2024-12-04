'use client';

import React, { PropsWithChildren, useEffect } from 'react';

export default function SWContext({ children }: PropsWithChildren) {
  useEffect(() => {
    // 브라우저 환경에서만 서비스 워커 등록
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }, []);
  return <>{children}</>;
}
