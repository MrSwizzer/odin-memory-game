//{}[]
import { useEffect, useState } from 'react';

export default function Card() {
	const [dogImageUrl, setDogImageUrl] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getDogImage = async () => {
			try {
				const res = await fetch('https://api.thedogapi.com/v1/images/search', {
					headers: {
						'x-api-key': import.meta.env.VITE_DOG_API_KEY,
					},
				});
				const data = await res.json();

				if (data.length > 0) {
					setDogImageUrl(data[0].url);
					setLoading(false);
				} else {
					console.error('No image found from API');
				}
			} catch (error) {
				console.error('Error fetching dog image:', error);
				setLoading(false);
			}
		};

		getDogImage();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="cardContainer">
			<img className="cardImage" src={dogImageUrl} alt="Random Dog" height="400px" width="300px" />
		</div>
	);
}
