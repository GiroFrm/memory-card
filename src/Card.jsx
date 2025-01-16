export default function Card({cardInfo, clickHandler}) {
    return (
        <div className="card" onClick={clickHandler}>
            <img src={cardInfo.art} alt={cardInfo.name} />
            <h2>{cardInfo.name}</h2>
        </div>
    );
}