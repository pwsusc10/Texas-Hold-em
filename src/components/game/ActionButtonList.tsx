import { ActionType, GamePlayerType, GamePlayType, PlayerNodeType } from '@/model';
import React, { useRef, useState } from 'react';
import { CustomButton } from '../Buttons';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
  game: GamePlayType;
  prevBet: PlayerNodeType;
  user: GamePlayerType;
};

type ActionOption = {
  label: string;
  action: ActionType;
  tone: string;
};

const TONE = {
  fold: 'border-title text-title bg-quaternary',
  passive: 'border-yellow text-yellow bg-quaternary',
  raise: 'border-lightGreen text-lightGreen bg-quaternary'
};

const RAISE_MULTIPLIERS = [2, 2.5, 3, 3.5];

const POT_BETS = [
  { label: '1/4 Pot', numerator: 1, denominator: 4, atLeastBlind: true },
  { label: '1/2 Pot', numerator: 1, denominator: 2 },
  { label: '3/4 Pot', numerator: 3, denominator: 4 },
  { label: '1x Pot', numerator: 1, denominator: 1 },
  { label: '5/4 Pot', numerator: 5, denominator: 4 }
];

/** Buttons offered when an earlier player has already put chips in this street. */
const facingBetOptions = (toCall: number, user: GamePlayerType): ActionOption[] => {
  const chips = user.gameChips;
  const passive = user.action.type === 'bb' ? 'check' : 'call';
  const options: ActionOption[] = [{ label: 'FOLD', action: { amount: 0, type: 'fold' }, tone: TONE.fold }];

  if (toCall < chips) {
    options.push({ label: passive.toUpperCase(), action: { amount: toCall, type: passive }, tone: TONE.passive });
  }
  for (const multiplier of RAISE_MULTIPLIERS) {
    const amount = Math.floor(toCall * multiplier);
    if (toCall * multiplier < chips) {
      options.push({ label: `${multiplier}x Raise`, action: { amount, type: 'raise' }, tone: TONE.raise });
    }
  }
  if (chips > 0 && chips < toCall * 3) {
    options.push({ label: 'ALL-IN', action: { amount: chips, type: 'all-in' }, tone: TONE.raise });
  }
  return options;
};

/** Buttons offered when nobody has bet yet this street. */
const openingOptions = (game: GamePlayType, user: GamePlayerType): ActionOption[] => {
  const pot = game.pot.main.total;
  const chips = user.gameChips;
  const options: ActionOption[] = [{ label: 'CHECK', action: { amount: 0, type: 'check' }, tone: TONE.passive }];

  for (const { label, numerator, denominator, atLeastBlind } of POT_BETS) {
    const amount = Math.floor((numerator * pot) / denominator);
    if (amount < chips && !(atLeastBlind && amount < game.blind)) {
      options.push({ label, action: { amount, type: 'bet' }, tone: TONE.passive });
    }
  }
  if ((3 * pot) / 2 >= chips) {
    options.push({ label: 'ALL-IN', action: { amount: chips, type: 'bet' }, tone: TONE.fold });
  }
  return options;
};

export default function ActionButtonList({ socket, game, prevBet, user }: Props) {
  const toCall = prevBet.player.action.amount;
  const options = toCall > 0 ? facingBetOptions(toCall, user) : openingOptions(game, user);

  // One bet per game state: a new `game` from the server unlocks the buttons again (e.g. after an error).
  const sentFor = useRef<GamePlayType | null>(null);
  const [lockedFor, setLockedFor] = useState<GamePlayType | null>(null);
  const locked = lockedFor === game;

  const emitAction = (action: ActionType) => {
    if (sentFor.current === game) return;
    sentFor.current = game;
    setLockedFor(game);
    const isReRaise = action.type === 'raise' && (prevBet.player.action.type === 'raise' || prevBet.player.action.type === 're-raise');
    socket.emit('bet', { roomId: game.roomId, user, action: isReRaise ? { amount: action.amount, type: 're-raise' } : action });
  };

  return (
    <div className="flex gap-1">
      {options.map(({ label, action, tone }) => (
        <CustomButton key={label} onClick={() => emitAction(action)} disabled={locked} className={tone}>
          {label}
        </CustomButton>
      ))}
    </div>
  );
}
