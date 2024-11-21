import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import NavBar from '@/components/layout/NavBar';
import RoomsContainer from '@/components/room/RoomsContainer';
import MiniProfile from '@/components/user/MiniProfile';
import React from 'react';

export default function RoomPage() {
  return (
    <>
      <Header />
      <Main>
        <div className="flex flex-col gap-4 h-full w-full">
          <NavBar currentPage="game" />
          <div className="flex gap-2">
            <RoomsContainer />
            <MiniProfile />
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
