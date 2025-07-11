import { useState, useEffect } from 'react';
import { Events, Cookie } from './components/cookie';

import LuckyDie from './components/upgrades/lucky_die';
import Pointer from './components/upgrades/pointer';
import AutoClicker from './components/upgrades/autoclicker';

import Message from './components/message';
import EventHandler from './events';

import './App.css';

function App() {
  const [money, setMoney] = useState(0)


  // Scaling for the amount of clicks needed to destroy a cookie
  function clickScaleFunc(maxClicks) {
    return maxClicks * (1 + 0.1)
  }

  function moneyMultiplier(maxClicks) {
    return Math.ceil(money + (maxClicks * 0.5))
  }

  function onItemPurchase(itemCost) {
    setMoney(money - itemCost);
  }

  // Update destroy handle when money changes
  useEffect(() => {
    EventHandler.subscribe("destroy", "money-handler", (event, emitter, clicks, maxClicks) => {
      const mny = moneyMultiplier(maxClicks)
      setMoney(mny)
    })
  }, [money])

  return (
    <div className="App">
      <h1 className="main-title"> Bruin Basher</h1>
      <div className="game-canvas">
        <div className="info-area">
          <p className="money">{"Money: $" + money}</p>
          <Message className="item-box" track="item" key={"item"} />
          <Message className="gain-box" track="cookie" key={"cookie"} />
          <div className="upgrade-bar">
            <Pointer money={money} onPurchase={onItemPurchase} />
            <AutoClicker money={money} onPurchase={onItemPurchase} />
            <LuckyDie money={money} onPurchase={onItemPurchase} />
            { /* TODO: add upgrade bar */}
          </div>
        </div>
        <div className="cookie-area">
          <Cookie
            scaling={clickScaleFunc} />
        </div>
      </div>
    </div>
  )
}

export default App;
