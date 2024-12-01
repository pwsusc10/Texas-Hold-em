'use client';
import { BasicButton } from '@/components/Buttons';
import CancelIcon from '@/components/ui/icons/CancelIcon';
import PencilIcon from '@/components/ui/icons/PencilIcon';
import { CircleUserIcon } from '@/components/ui/icons/UserIcon';
import { TextInput } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

export default function Page() {
  const { data } = useSession();
  const [modalState, setModalState] = useState<'close' | 'profile' | 'nickname'>('close');
  const [username, setUsername] = useState<string>(data?.user.name as string);

  if (!data || !data.user)
    return (
      <div className="w-4/5 mx-auto text-center text-2xl">
        <p>로그인 후 이용이 가능합니다.</p>
      </div>
    );

  const modifyHandler = () => {};
  return (
    <ul className="w-4/5 mx-auto">
      <li className="flex items-center border-b h-[5rem] p-4">
        <p className="w-1/5">프로필 사진</p>
        {data.user.image ? <p className="grow">프로필 사진을 변경해보세요.</p> : <p>프로필 사진을 추가해보세요.</p>}
        <div className="h-full hover:scale-110 hover:cursor-pointer" onClick={() => setModalState('profile')}>
          <CircleUserIcon />
        </div>
      </li>
      <li className="flex items-center border-b h-[5rem] p-4">
        <p className="w-1/5">닉네임</p>
        <p className="grow">{data.user.name}</p>
        <div className="h-full p-1 hover:scale-110 hover:cursor-pointer" onClick={() => setModalState('nickname')}>
          <PencilIcon />
        </div>
      </li>
      <li className="flex items-center border-b h-[5rem] p-4">
        <p className="w-1/5">이메일</p>
        <p className="grow">{data.user.email}</p>
      </li>
      {modalState !== 'close' && (
        <Modal size="md">
          <div className="relative w-full h-full flex flex-col justify-between items-center p-4">
            <div className="absolute top-2 right-2" onClick={() => setModalState('close')}>
              <CancelIcon className="hover:cursor-pointer hover:scale-110" size={24} />
            </div>
            <p className="text-center text-2xl font-semibold">
              {modalState === 'profile' && <p>프로필 사진 변경</p>}
              {modalState === 'nickname' && <p>닉네임 변경</p>}
            </p>
            {modalState === 'profile' && <input type="file" accept="image/*" />}
            {modalState === 'nickname' && <TextInput placeholder="닉네임을 입력해주세요." id="0" value={username} onChange={setUsername} className="bg-gray" />}
            <BasicButton className="w-full h-[3rem]" filled={false} onClick={() => modifyHandler()}>
              변경하기
            </BasicButton>
          </div>
        </Modal>
      )}
    </ul>
  );
}
