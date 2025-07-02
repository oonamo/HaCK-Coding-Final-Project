import CONST from '../game_variables';

import { useState } from 'react';

import CookiePicture from '../cookie.webp'

export const Events = Object.freeze({
  DESTROYED: 1,
  CLICKED: 2,
})

export function Cookie({ scaling, multiplier, eventHandle }) {
  const [clicks, setClicks] = useState(0)
  const [maxClicks, setMaxClicks] = useState(CONST.STARTING_CLICKS)

  function onClick() {
    setClicks(1 + multiplier(clicks))
    eventHandle(Events.CLICKED, clicks, maxClicks)

    if (maxClicks - clicks <= 1) {
      eventHandle(Events.DESTROYED, clicks, maxClicks)
      setClicks(0);
      setMaxClicks(Math.floor(scaling(maxClicks)));
    }
  }


  return (
    <div className="main-cookie">
      {/* Should be an image */}
      <img src={CookiePicture} onClick={onClick} className="cookie" />
      {/* <button onClick={onClick} className="cookie-btn">Cookie</button> */}
      <p className="clicks-remaining">{maxClicks - clicks}</p>
    </div>
  )
}
