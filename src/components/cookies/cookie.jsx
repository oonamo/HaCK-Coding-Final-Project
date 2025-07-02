import { useState } from 'react';

import GenericCookie from './generic_cookie';

function Cookie(props) {
  return (
    <GenericCookie onClick={props.onClick} className="regular-cookie" maxClicks={props.maxClicks} onDestroy={props.onDestroy}/>
  )
}

export default Cookie;
