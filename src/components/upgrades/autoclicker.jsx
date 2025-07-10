import ShopItem from '../shop_component';
import { useState } from 'react';

const COST = 150;
const GAIN = 1;
const SCALING_COST = 0.75;

export default function autoClicker({ money, onPurchase }) {
  const [amount, setAmount] = useState(0);
  const [cost, setCost] = useState(COST);

  function onClick() {
    if (money > COST) {
      setAmount(amount + 1);
      onPurchase(COST, GAIN);

      setCost(Math.floor(cost * (1 + SCALING_COST)))
    }
  }

  return (
    <ShopItem
      name="autoclicker"
      cost={cost}
      description="clicks for you every second, can stack"
      bought={amount}
      attemptPurchase={onClick}
    />
  )
}
