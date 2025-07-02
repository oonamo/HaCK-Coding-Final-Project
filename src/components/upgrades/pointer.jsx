import ShopItem from '../shop_component';
import { useState } from 'react';

const COST = 100;
const GAIN = 1;

export default function Pointer({ money, onPurchase }) {
  const [amount, setAmount] = useState(0);
  function onClick() {
    if (money > COST) {
      setAmount(amount + 1);
      onPurchase(COST, GAIN);
    }
  }

  return (
    <ShopItem
      name="pointer"
      cost={COST}
      description="counts as an extra click"
      bought={amount}
      attemptPurchase={onClick}
    />
  )
}
