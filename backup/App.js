import reactlogo from './reactlogo.png';
import djangologo from './djangologo.png';
import './App.css';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={djangologo} className='django-logo' alt='django' />
				<img src={reactlogo} className='App-logo' alt='react' />
			</header>
		</div>
	);
}

export default App;
