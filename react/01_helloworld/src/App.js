import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';
import HelloFunction from './HelloFunction';

function App() {
  return (
    <div className="App">
		<HelloWorld/>
		<HelloWorld name="Erno"/>
		<HelloFunction/>
		<HelloFunction name="Erno"/>
	</div>
  );
}

export default App;
