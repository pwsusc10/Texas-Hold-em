'use client';

import { ColorButton } from '@/components/Buttons';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col justify-center items-center gap-6">
      <h1 className="xl:text-5xl text-3xl font-semibold">
        <strong className="text-title">404</strong> ERROR
      </h1>
      <h2 className="xl:text-3xl text-xl font-semibold">페이지를 찾을 수 없습니다.</h2>
      <p className="text-center">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>
      <div className="flex gap-2">
        <ColorButton className="w-36 py-1" filled={false} onClick={() => router.back()}>
          이전 페이지
        </ColorButton>
        <ColorButton className="w-36 py-1" filled={true} onClick={() => router.replace('/home')}>
          홈 페이지
        </ColorButton>
      </div>
    </div>
  );
}
