import ShopItem from '../shop_component';
import { useState, useEffect } from 'react';
import EventHandler from '../../events';
import AutoClickerImage from '../../autoclicker_pic.png'

const STARTING_COST = 10;
const GAIN = 1;
const SCALING_COST = 0.75;

const STARTING_INTERVAL = 1000;


export default function AutoClicker({ money, onPurchase }) {
  const [amount, setAmount] = useState(0);
  const [cost, setCost] = useState(STARTING_COST);
  const [lastID, setLastID] = useState(null);
  const [interval, setIntervalTime] = useState(STARTING_INTERVAL)

  function onClick() {
    if (money >= cost) {
      setAmount(amount + 1);
      onPurchase(cost, GAIN);
      setCost(Math.floor(cost * (1 + SCALING_COST)))

      // Cuts the speed of interval to 3/4 previous
      setIntervalTime(prev => Math.floor(prev*0.75))
    }
  }

  function doAutoClick() {
    // Emits the 'click' event
    // see cookie.jsx
    // TODO: Should the amount of clicks increase?
    // I think decreasing the interval alone will be good
    EventHandler.emit("click", "auto-clicker", GAIN)
  }

  useEffect(() => {
    // Only do this if the interval time will change
    if (amount > 0) {
      if (lastID) {
        clearInterval(lastID)
      }

      let intervalID = setInterval(doAutoClick, interval)
      setLastID(intervalID)
      //Clearing interval before speeding it up)
      return () => clearInterval(intervalID);
    }
  }, [amount, interval])

  return (
    <ShopItem
      name="autoclicker"
      cost={cost}
      description="clicks for you every second, can stack"
      bought={amount}
      attemptPurchase={onClick}
      image={AutoClickerImage}
    />
  )
}
