import { ActionType, GamePlayerType, GamePlayType, PlayerNodeType } from '@/model';
import React, { useRef } from 'react';
import { ColorButton, CustomButton } from '../Buttons';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
  game: GamePlayType;
  prevBet: PlayerNodeType;
  user: GamePlayerType;
};

export default function ActionButtonList({ socket, game, prevBet, user }: Props) {
  const hasClicked = useRef(false);
  const actionHandler = ({ action }: { action: ActionType }) => {
    console.log('action button clicked : ', action.type, action.amount);
    if ((prevBet.player.action.type === 'raise' || prevBet.player.action.type === 're-raise') && action.type === 'raise') {
      socket.emit('bet', { roomId: game.roomId, user, action: { amount: action.amount, type: 're-raise' } });
    } else {
      socket.emit('bet', { roomId: game.roomId, user, action });
    }
  };

  return (
    <div className="flex gap-1">
      {prevBet.player.action.amount > 0 ? (
        <>
          <CustomButton
            onClick={() => {
              actionHandler({ action: { amount: 0, type: 'fold' } });
            }}
            disabled={hasClicked.current}
            className="border-title text-title bg-quaternary"
          >
            FOLD
          </CustomButton>
          {prevBet.player.action.amount < user.gameChips && (
            <CustomButton
              onClick={() => {
                {
                  user.action.type === 'bb'
                    ? actionHandler({ action: { amount: prevBet.player.action.amount, type: 'check' } })
                    : actionHandler({ action: { amount: prevBet.player.action.amount, type: 'call' } });
                }
              }}
              disabled={hasClicked.current}
              className="border-yellow text-yellow bg-quaternary"
            >
              {user.action.type === 'bb' ? 'CHECK' : 'CALL'}
            </CustomButton>
          )}
          {prevBet.player.action.amount * 2 < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: prevBet.player.action.amount * 2, type: 'raise' } });
              }}
              disabled={hasClicked.current}
              className="border-lightGreen text-lightGreen bg-quaternary"
            >
              2x Raise
            </CustomButton>
          )}
          {prevBet.player.action.amount * 2.5 < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: Math.floor(prevBet.player.action.amount * 2.5), type: 'raise' } });
              }}
              disabled={hasClicked.current}
              className="border-lightGreen text-lightGreen bg-quaternary"
            >
              2.5x Raise
            </CustomButton>
          )}
          {prevBet.player.action.amount * 3 < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: prevBet.player.action.amount * 3, type: 'raise' } });
              }}
              disabled={hasClicked.current}
              className="border-lightGreen text-lightGreen bg-quaternary"
            >
              3x Raise
            </CustomButton>
          )}
          {prevBet.player.action.amount * 3.5 < user.gameChips && (
            <CustomButton
              onClick={() => actionHandler({ action: { amount: Math.floor(prevBet.player.action.amount * 3.5), type: 'raise' } })}
              disabled={hasClicked.current}
              className="border-lightGreen text-lightGreen bg-quaternary"
            >
              3.5x Raise
            </CustomButton>
          )}
          {user.gameChips > 0 && user.gameChips < prevBet.player.action.amount * 3 && (
            <CustomButton
              onClick={() => actionHandler({ action: { amount: user.gameChips, type: 'all-in' } })}
              className="border-lightGreen text-lightGreen bg-quaternary"
              disabled={hasClicked.current}
            >
              ALL-IN
            </CustomButton>
          )}
        </>
      ) : (
        <>
          <CustomButton
            onClick={() => {
              actionHandler({ action: { amount: 0, type: 'check' } });
            }}
            disabled={hasClicked.current}
            className="border-yellow text-yellow bg-quaternary"
          >
            CHECK
          </CustomButton>
          {Math.floor(game.pot.main.total / 4) >= game.blind && Math.floor(game.pot.main.total / 4) < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: Math.floor(game.pot.main.total / 4), type: 'bet' } });
              }}
              disabled={hasClicked.current}
              className="border-yellow text-yellow bg-quaternary"
            >
              1/4 Pot
            </CustomButton>
          )}
          {Math.floor(game.pot.main.total / 2) < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: Math.floor(game.pot.main.total / 2), type: 'bet' } });
              }}
              disabled={hasClicked.current}
              className="border-yellow text-yellow bg-quaternary"
            >
              1/2 Pot
            </CustomButton>
          )}
          {(3 * game.pot.main.total) / 4 < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: Math.floor((3 * game.pot.main.total) / 4), type: 'bet' } });
              }}
              className="border-yellow text-yellow bg-quaternary"
            >
              3/4 Pot
            </CustomButton>
          )}
          {game.pot.main.total < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: game.pot.main.total, type: 'bet' } });
              }}
              className="border-yellow text-yellow bg-quaternary"
            >
              1x Pot
            </CustomButton>
          )}
          {(5 * game.pot.main.total) / 4 < user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: Math.floor((5 * game.pot.main.total) / 4), type: 'bet' } });
              }}
              className="border-yellow text-yellow bg-quaternary"
            >
              5/4 Pot
            </CustomButton>
          )}
          {(3 * game.pot.main.total) / 2 >= user.gameChips && (
            <CustomButton
              onClick={() => {
                actionHandler({ action: { amount: user.gameChips, type: 'bet' } });
              }}
              className="border-title text-title bg-quaternary"
            >
              ALL-IN
            </CustomButton>
          )}
        </>
      )}
    </div>
  );
}
