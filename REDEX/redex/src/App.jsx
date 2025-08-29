import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner.jsx';

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Cocktails from './components/Cocktails.jsx'
import CocktailGallery from './components/CocktailGallery.jsx'
import About from './components/About.jsx'
import Art from './components/Art.jsx'
import Menu from './components/Menu.jsx'
import ReservationSystem from './components/ReservationSystem.jsx'
import Newsletter from './components/Newsletter.jsx'
import Contact from './components/Contact.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import FavoritesView from './components/FavoritesView.jsx'
import CustomCursor from './components/CustomCursor.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate loading time (e.g., fetch, images, etc.)
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{loading && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					background: 'rgba(20,20,20,0.95)',
					zIndex: 9999,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transition: 'opacity 0.5s',
				}}>
					<LoadingSpinner size="large" color="amber" />
				</div>
			)}
			<CustomCursor />
			<ScrollProgress />
			<FavoritesView />
			<main style={{ filter: loading ? 'blur(2px)' : 'none', pointerEvents: loading ? 'none' : 'auto' }}>
				<Navbar />
				<Hero />
				<Cocktails />
				<CocktailGallery />
				<About />
				<Art />
				<Menu />
				<ReservationSystem />
				<Newsletter />
				<Contact />
			</main>
		</>
	);
}

export default App
