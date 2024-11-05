import NoticeContent from '@/components/notice/NoticeContent';
import MiniProfile from '@/components/user/MiniProfile';
import React from 'react';

export default function NoticePage() {
  return (
    <div className="flex gap-2">
      <NoticeContent />
      <MiniProfile />
    </div>
  );
}
