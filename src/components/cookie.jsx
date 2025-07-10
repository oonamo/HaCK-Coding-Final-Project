import CONST from '../game_variables';

import { useState, useEffect } from 'react';

import CookiePicture from '../cookie.webp'

import EventHandler from '../events';
import Proc from '../proccer';

export function Cookie({ scaling }) {
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
      EventHandler.emit("destroy", "cookie-destroy", clicks, maxClicks)
      setClicks(0)

      setMaxClicks(Math.floor(scaling(maxClicks)))
      setCookiesDestroyed(cookiesDestroyed + 1)

      setScale(1 + cookiesDestroyed * 0.05)
    }
  }

  useEffect(transformImage, [scale])
  useEffect(() => {
    reset()
    console.log("clicks change")
    EventHandler.subscribe("click", "cookie-click", (event, emitter, gain) => {
      let procGain = Proc.proc()
      setClicks(clicks + gain + procGain)
      setScale(scale - 0.6 / maxClicks)
    })
  }, [clicks])

  function onClick() {
    EventHandler.emit("click", "cookie", 1)
  }



  return (
    <div className="main-cookie">
      <img src={CookiePicture} onClick={onClick} className="cookie" />
      <p className="clicks-remaining">{maxClicks - clicks}</p>
    </div>
  )
}
