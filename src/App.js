import './App.css';

import Cookie from './components/cookies/cookie';

function App() {
  return (
    <div className="App">
      <div className="game-canvas">
        <div className="upgrade-bar">
          { /* TODO: add upgrade bar */}
        </div>
        <div className="cookie-area">
          <Cookie maxClicks={10} />
        </div>
      </div>
    </div>
  )
}

export default App;
