import CONST from '../game_variables';

import { useState, useEffect } from 'react';

import CookiePicture from '../cookie.webp'

export const Events = Object.freeze({
  DESTROYED: 1,
  CLICKED: 2,
})

export function Cookie({ scaling, multiplier, eventHandle }) {
  const [clicks, setClicks] = useState(0)
  const [maxClicks, setMaxClicks] = useState(CONST.STARTING_CLICKS)
  const [scale, setScale] = useState(1);
  const [cookiesDestroyed, setCookiesDestroyed] = useState(0);


  function transformImage() {
    const image = document.querySelector(".cookie")
    image.style.transform = `scale(${scale}, ${scale})`
  }

  function reset() {
    if (maxClicks - clicks <= 0) {
      eventHandle(Events.DESTROYED, clicks, maxClicks)
      setClicks(0)

      setMaxClicks(Math.floor(scaling(maxClicks)))
      setCookiesDestroyed(cookiesDestroyed + 1)

      setScale(1 + cookiesDestroyed * 0.05)
    }
  }

  useEffect(transformImage, [scale])
  useEffect(reset, [clicks])

  function onClick() {
    setClicks(clicks + multiplier(clicks))
    eventHandle(Events.CLICKED, clicks, maxClicks)

    setScale(scale - 0.6 / maxClicks)

  }


  return (
    <div className="main-cookie">
      <img src={CookiePicture} onClick={onClick} className="cookie" />
      <p className="clicks-remaining">{maxClicks - clicks}</p>
    </div>
  )
}
