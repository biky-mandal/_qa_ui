import './FeatureCard.css';

const FeatureCard = () => {
    return (
        <div className="quote-card">
            <img className="q-card-image" src="data.img" alt="data.title" />

            <span className="card-title text"></span>
            <label className="card-desc text"></label>
        </div>
    )
}

export default FeatureCard;