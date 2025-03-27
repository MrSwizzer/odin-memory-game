export default function Card({ imageUrl, onClick, clicked }) {
	return (
		<div className="cardContainer">
			{clicked && <span>Clicked</span>}
			<img className="cardImage" src={imageUrl} alt="Random Dog" onClick={onClick} />
		</div>
	);
}
