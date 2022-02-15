import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildrenCard from './components/NamedChildren';
function App() {
  return (
    <div className="App">
		<ContactCard>
			Simple Contact Card
		</ContactCard>
		<NamedChildrenCard 
			header={<h2>Named Card</h2>}
			media={<p>Media Area</p>}
			content={<p>Content Area</p>}
		/>
		<NamedChildrenCard
			header={<h2>No media</h2>}
			content={<p>Content Area</p>}
		/>
    </div>
  );
}

export default App;
