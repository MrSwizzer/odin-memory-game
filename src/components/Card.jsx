export default function Card({ imageUrl, onClick, altText }) {
	return (
		<div className="cardContainer">
			<img className="cardImage" src={imageUrl} alt={altText} onClick={onClick} />
		</div>
	);
}
