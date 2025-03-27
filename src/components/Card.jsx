export default function Card({ imageUrl }) {
	return (
		<div className="cardContainer">
			<img className="cardImage" src={imageUrl} alt="Random Dog" />
		</div>
	);
}
