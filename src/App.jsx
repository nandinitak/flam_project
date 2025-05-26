import React from 'react';
import BottomSheet from './components/bottomsheet';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="flam-welcome-text">Welcome Flam 👋</h1>
      <p className="flam-subtitle">Thanks for visiting! This is my custom interactive UI playground.</p>
      <BottomSheet />
    </div>
  );
}

export default App;
