import ShopItem from '../shop_component';
import { useState } from 'react';

const STARTING_COST = 250;
const GAIN = 0;
const SCALING_COST = 4.5;

import Proc from '../../proccer';

// returns a random number from 1-6
function rollDie(_) {
  return Math.floor(Math.random() * 6) + 1
}

export default function Pointer({ money, onPurchase }) {
  const [amount, setAmount] = useState(0);
  const [cost, setCost] = useState(STARTING_COST);

  function onClick() {
    if (money > cost) {
      setAmount(amount + 1);
      onPurchase(cost, GAIN, rollDie);
      setCost(Math.floor(cost * (1 + SCALING_COST)))
      Proc.addEffect(rollDie)
    }
  }

  return (
    <ShopItem
      name="pointer"
      cost={cost}
      description="counts as an extra click"
      bought={amount}
      attemptPurchase={onClick}
    />
  )
}
