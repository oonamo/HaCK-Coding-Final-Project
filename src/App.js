import './App.css';

import { useState, } from 'react';
import { Events, Cookie } from './components/cookie';


function App() {
  const [money, setMoney] = useState(0)

  // Scaling for the amount of clicks needed to destroy a cookie
  function clickScaleFunc(maxClicks) {
    return maxClicks * (1 + 0.1)
  }

  // Function for changing the amount a 'click' counts towards progress
  // TODO: This function should be changed with upgrades
  function clickMultiplier(clicks) {
    return clicks * 1;
  }

  function moneyMultiplier(maxClicks) {
    return Math.ceil(money + (maxClicks * 0.5))
  }

  function cookieEventHandle(event, clicks, maxClicks) {
    switch (event) {
      case Events.CLICKED: {
        console.log("clicked")
        break
      }
      case Events.DESTROYED: {
        setMoney(moneyMultiplier(maxClicks))
        break
      }
    }
  }

  return (
    <div className="App">
      <div className="game-canvas">
        <div className="info-area">
          <p className="money">{"Money: $" + money}</p>
          <div className="upgrade-bar">
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
