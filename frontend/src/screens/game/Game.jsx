import { useEffect } from "react"
import { socket } from "../../context/IoContext"


import BoardOpponent from "../../components/BoardOpponent"
import CenterBoard from "../../components/CenterBoard"
import MyBoard from "../../components/MyBoard"

import './game.css'


const Game = () => {
    
    useEffect(() => {
        socket.on('list-game', (data) => {
            console.log(data)
        })
    }, [])

    return (
        <div className="board">
            <BoardOpponent />
            <CenterBoard />
            <MyBoard />
        </div>
    )
}

export default Game
