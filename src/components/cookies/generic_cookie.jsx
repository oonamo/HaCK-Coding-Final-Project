import { useEffect, useState } from 'react';

function GenericCookie(props) {
  const [clicks, setClicks] = useState(0)
  const [shouldRender, setRender] = useState(true)

  const { className, onClick, maxClicks, onDestroy } = props

  useEffect(() => {
    if (onClick) {
      onClick(clicks)
    }

    setRender(maxClicks - clicks > 0)

    if (shouldRender) {
      console.log("destoying cookie")

      if (onDestroy) {
        onDestroy(clicks)
      }
    }
  }, [clicks]);

  function onClickWrapper() {
    setClicks(clicks + 1)
    console.log("clicks", clicks)
  }


  return (
    <div>
      {shouldRender && (
        <>
          <button className={className} onClick={onClickWrapper}>Cookie</button>
          <p>{maxClicks - clicks}</p>
        </>
      )}
    </div>
  )
}

export default GenericCookie;
