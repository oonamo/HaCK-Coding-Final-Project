import ShopItem from '../shop_component';
import { useState, useEffect } from 'react';

import Proc from '../../proccer';

const COST = 5;
const GAIN = 1;
const SCALING_COST = 0.8;

export default function Pointer({ money, onPurchase }) {
  const [amount, setAmount] = useState(0);
  const [cost, setCost] = useState(COST);

  function onClick() {
    if (money >= COST) {
      setAmount(amount + 1);
      onPurchase(COST);
      setCost(Math.floor(cost * (1 + SCALING_COST)))

      // Add `GAIN` to the proc-chain
      Proc.addEffect(() =>  GAIN)
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
