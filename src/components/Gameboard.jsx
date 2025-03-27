//{}[]
import { useEffect, useState } from 'react';
import Card from './Card';

export default function Gameboard() {
	const [dogImages, setDogImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const APIKEY = import.meta.env.VITE_DOG_API_KEY;

	useEffect(() => {
		const fetchDogImages = async () => {
			try {
				const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=dogs&limit=10`);
				const data = await res.json();
				console.log(data);

				if (data.data.length > 0) {
					setDogImages(data.data.map((dog) => dog.images.fixed_height.url));
					console.log(data.data.map((dog) => dog.images.fixed_height.url));
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
	}, [APIKEY]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="cardsContainer">
			{dogImages.map((url, index) => (
				<Card key={index} imageUrl={url} />
			))}
		</div>
	);
}
