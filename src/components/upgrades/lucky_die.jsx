import ShopItem from '../shop_component';
import { useState } from 'react';
import Proc from '../../proccer';
import EventHandler from '../../events'

import LuckyDieImage from '../../luckydie_picture.png'

const STARTING_COST = 250;
const GAIN = 0;
const SCALING_COST = 4.5;


// returns a random number from 1-6
function rollDie(_) {
  const roll = Math.floor(Math.random() * 6) + 1
  EventHandler.emit("message", "item", {
    message: `Lucky Die rolled a ${roll}`,
    color: "blue"
  })

  return roll
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
      name="luckydie"
      cost={cost}
      description="Test your luck, number rolled is added onto your clicks"
      bought={amount}
      attemptPurchase={onClick}
      image={LuckyDieImage}
    />
  )
}
