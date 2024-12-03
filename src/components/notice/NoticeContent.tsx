import React from 'react';

export default function NoticeContent() {
  return (
    <div className="w-2/3 min-h-[50vh] sm:min-h-[65vh] md:min-h-[75vh] border-4 border-deepdark bg-secondary rounded-md">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[70%] h-[50%] bg-black rounded-md flex justify-center items-center text-xl sm:text-2xl md:text-3xl text-pretty">
          공지사항 없습니다.
        </div>
      </div>
    </div>
  );
}
