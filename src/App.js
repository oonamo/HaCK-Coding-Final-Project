import './App.css';

import { useState, } from 'react';
import { Events, Cookie } from './components/cookie';

import Pointer from './components/upgrades/pointer';

function App() {
  const [money, setMoney] = useState(0)
  const [itemMultiplier, setItemMultiplier] = useState(1);

  // Scaling for the amount of clicks needed to destroy a cookie
  function clickScaleFunc(maxClicks) {
    return maxClicks * (1 + 0.1)
  }

  // Function for changing the amount a 'click' counts towards progress
  // TODO: This function should be changed with upgrades
  function clickMultiplier(clicks) {
    const clickGain = itemMultiplier

    console.log("itemMultiplier", itemMultiplier, "clicks", clicks);

    return clickGain
  }

  function moneyMultiplier(maxClicks) {
    return Math.ceil(money + (maxClicks * 0.5))
  }

  function cookieEventHandle(event, clicks, maxClicks) {
    switch (event) {
      case Events.CLICKED: {
        break
      }
      case Events.DESTROYED: {
        setMoney(moneyMultiplier(maxClicks))
        break
      }
    }
  }

  function onItemPurchase(itemCost, multiplierGain) {
    setMoney(money - itemCost);
    setItemMultiplier(itemMultiplier + multiplierGain);
  }

  return (
    <div className="App">
      <div className="game-canvas">
        <div className="info-area">
          <p className="money">{"Money: $" + money}</p>
          <div className="upgrade-bar">
            <Pointer money={money} onPurchase={onItemPurchase} />
            { /* TODO: add upgrade bar */}
          </div>
        </div>
        <div className="cookie-area">
          <Cookie
            scaling={clickScaleFunc}
            multiplier={clickMultiplier}
            eventHandle={cookieEventHandle} />
        </div>
      </div>
    </div>
  )
}

export default App;
