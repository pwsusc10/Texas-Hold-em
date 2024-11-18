'use client';
import React, { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

export default function SWRContext({ children }: PropsWithChildren) {
  const fetcher = async (url: string): Promise<any> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Error fetching data');
    }
    return res.json();
  };
  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 60000, // 데이터 자동 갱신 간격 (1분)
        revalidateOnFocus: true, // 포커스 시 자동으로 데이터 리페치
        revalidateOnReconnect: true, // 네트워크 재연결 시 리페치
        dedupingInterval: 2000 // 중복 요청 방지 간격 (2초)
      }}
    >
      {children}
    </SWRConfig>
  );
}
