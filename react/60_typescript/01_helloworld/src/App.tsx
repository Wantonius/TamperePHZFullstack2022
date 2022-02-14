import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';

function App() {
  return (
    <div className="App">
      <header className="App-header">
			<HelloWorld/>
			<HelloWorld name="Erno"/>
      </header>
    </div>
  );
}

export default App;
