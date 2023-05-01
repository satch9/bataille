import PlaceCardPlayedOpponent from "./PlaceCardPlayedOpponent"
import PlaceMyCardPlayed from "./PlaceMyCardPlayed"
import './centerBoard.css'

const CenterBoard = () => {
    return (
        <div className="centerBoard">
            <h1>Jeu de carte : la bataille</h1>
            <div className="opponent">
                <PlaceCardPlayedOpponent />
                <p>Adversaire</p>
            </div>
            <div className="myCard">
                <PlaceMyCardPlayed />
                <p>Vous</p>
            </div>
        </div>
    )
}

export default CenterBoard
