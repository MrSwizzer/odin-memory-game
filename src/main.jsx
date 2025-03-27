import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import Gameboard from './components/Gameboard';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Gameboard />
	</StrictMode>
);
