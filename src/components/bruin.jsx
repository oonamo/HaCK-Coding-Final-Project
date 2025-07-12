import CONST from '../game_variables';

import { useState, useEffect } from 'react';

import BruinPicture from '../bruin.png'

import EventHandler from '../events';
import Proc from '../proccer';

export function Bruin({ scaling }) {
  const [clicks, setClicks] = useState(0)
  const [maxClicks, setMaxClicks] = useState(CONST.STARTING_CLICKS)
  const [scale, setScale] = useState(1);
  const [bruinsDestroyed, setBruinsDestroyed] = useState(0);

  const [averageGain, setAverageGain] = useState(0);
  const [totalGain, setTotalGain] = useState(0);
  const [timesClicked, setTimesClicked] = useState(0);

  function calcAverageGain(gain) {
    setTotalGain(totalGain + gain)
    setTimesClicked(timesClicked + 1)

    setAverageGain(totalGain / timesClicked)
  }


  useEffect(() => {
    EventHandler.emit("message", "bruin-stats", {
      message: averageGain,
    })
  }, [averageGain])

  function transformImage() {
    const image = document.querySelector(".bruin")
    image.style.transform = `scale(${scale}, ${scale})`
  }

  function reset() {
    if (maxClicks - clicks <= 0) {
      EventHandler.emit("destroy", "bruin-destroy", clicks, maxClicks)
      setClicks(0)

      setMaxClicks(Math.floor(scaling(maxClicks)))
      setBruinsDestroyed(bruinsDestroyed + 1)

      setScale(1 + bruinsDestroyed * 0.05)
    }
  }

  useEffect(transformImage, [scale])
  useEffect(() => {
    reset()
    console.log("clicks change")
    EventHandler.subscribe("click", "bruin-click", (event, emitter, gain) => {
      let totalGain = Proc.proc() + gain;
      calcAverageGain(totalGain)
      setClicks(clicks + totalGain)

      EventHandler.emit("message", "bruin", {
        message: `Did ${totalGain} damage.`,
        color: "red"
      })
      setScale(scale - (0.6 * totalGain) / maxClicks);
    })
  }, [clicks])

  function onClick() {
    EventHandler.emit("click", "bruin", 1)
  }



  return (
    <div className="main-bruin">
      <img src={BruinPicture} onClick={onClick} className="bruin" />
      <p className="clicks-remaining">{"Clicks Remaining: " + (maxClicks - clicks)}</p>
    </div>
  )
}
