import './App.css';

import { useState, useEffect } from 'react';
import { Events, Cookie } from './components/cookie';

import Pointer from './components/upgrades/pointer';

import EventHandler from './events';

function App() {
  const [money, setMoney] = useState(0)
  const [itemMultiplier, setItemMultiplier] = useState(1)
  const [itemEffects, setItemEffects] = useState([])


  // Scaling for the amount of clicks needed to destroy a cookie
  function clickScaleFunc(maxClicks) {
    return maxClicks * (1 + 0.1)
  }

  // Function for changing the amount a 'click' counts towards progress
  // TODO: This function should be changed with upgrades
  function clickMultiplier(clicks) {
    // let clickGain = itemMultiplier
    //
    // for (const itemEffect of itemEffects) {
    //   clickGain += itemEffect()
    // }
    //
    // return clickGain
  }

  function moneyMultiplier(maxClicks) {
    return Math.ceil(money + (maxClicks * 0.5))
  }

  function onItemPurchase(itemCost, multiplierGain, itemEffect) {
    setMoney(money - itemCost);
    // setItemMultiplier(itemMultiplier + multiplierGain);
    //
    // if (typeof itemEffect == "function") {
    //   setItemEffects([...itemEffects, itemEffect])
    // }
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
            multiplier={clickMultiplier} />
        </div>
      </div>
    </div>
  )
}

export default App;
