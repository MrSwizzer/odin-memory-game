//{}[]
import { useEffect, useState } from 'react';
import Card from './Card';

export default function Gameboard() {
	const [dogImages, setDogImages] = useState([{ id: '', imageUrl: '', clicked: false, altText: '' }]);
	const [loading, setLoading] = useState(true);
	const [score, setScore] = useState(0);
	const [highScore, setHighscore] = useState(0);

	useEffect(() => {
		const fetchDogImages = async () => {
			const offset = Math.floor(Math.random() * 100);
			const APIKEY = import.meta.env.VITE_GIPHY_API_KEY;
			try {
				const res = await fetch(
					`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=dogs&limit=10&offset=${offset}`
				);
				const data = await res.json();
				console.log(data);

				if (data.data.length > 0) {
					setDogImages(
						data.data.map((img) => ({
							id: img.id,
							imageUrl: img.images.fixed_height.url,
							clicked: false,
							altText: img.title,
						}))
					);

					setLoading(false);
				} else {
					console.error('No images found from API');
					setLoading(false);
				}
			} catch (error) {
				console.error('Error fetching dog images:', error);
				setLoading(false);
			}
		};

		fetchDogImages();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	function handleClick(itemId) {
		const currentImage = dogImages.find((entry) => entry.id === itemId);

		if (currentImage.clicked) {
			setDogImages((prev) => prev.map((entry) => ({ ...entry, clicked: false })));

			setScore(0);
		} else {
			setDogImages((prev) => prev.map((entry) => (entry.id === itemId ? { ...entry, clicked: true } : entry)));
			setScore((prevState) => {
				const newScore = prevState + 1;
				if (newScore > highScore) {
					setHighscore(newScore);
				}
				return newScore;
			});
		}
	}

	function shuffleArray(array) {
		const shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}
		return shuffledArray;
	}

	return (
		<>
			<div className="scores">
				<div className="score">Score: {score}</div>
				<h1>
					<span>M</span>
					<span> e</span>
					<span> m</span>
					<span> o</span>
					<span> r</span>
					<span> y</span>
					<span>{'\u00A0'}</span>
					<span> G</span>
					<span> a</span>
					<span> m</span>
					<span> e</span>
				</h1>
				<div className="highscore">Highscore: {highScore}</div>
			</div>
			<div className="cardsContainer">
				{shuffleArray(dogImages).map((item) => (
					<Card key={item.id} imageUrl={item.imageUrl} onClick={() => handleClick(item.id)} altText={item.altText} />
				))}
			</div>
		</>
	);
}
