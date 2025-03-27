//{}[]
import { useEffect, useState } from 'react';
import Card from './Card';

export default function Gameboard() {
	const [dogImages, setDogImages] = useState([{ id: '', imageUrl: '', clicked: false }]);
	const [loading, setLoading] = useState(true);
	const APIKEY = import.meta.env.VITE_DOG_API_KEY;

	useEffect(() => {
		const fetchDogImages = async () => {
			try {
				const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=dogs&limit=10`);
				const data = await res.json();
				console.log(data);

				if (data.data.length > 0) {
					setDogImages(data.data.map((img) => ({ id: img.id, imageUrl: img.images.fixed_height.url, clicked: false })));

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
		setDogImages((prev) => prev.map((entry) => (entry.id === itemId ? { ...entry, clicked: true } : entry)));
	}

	function shuffleArray(array) {
		const shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}
		return shuffledArray;
	}

	const shuffledImages = shuffleArray(dogImages);

	return (
		<div className="cardsContainer">
			{shuffledImages.map((item) => (
				<>
					<Card key={item.id} imageUrl={item.imageUrl} onClick={() => handleClick(item.id)} clicked={item.clicked} />
				</>
			))}
		</div>
	);
}
