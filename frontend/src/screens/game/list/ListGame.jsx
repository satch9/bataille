import { Button } from 'antd';
import { socket } from '../../../context/IoContext';
import { useState } from 'react';
import CardListGame from '../../../components/CardListGame';
import FloatButtonChat from '../../../components/FloatButtonChat'

import './listGame.css'

const ListGame = () => {
    const [listGame, setListGame] = useState([])

    const handleClick = () => {
        socket.emit('list-game-send')
        socket.on('list-game', (data) => {
            console.log(data)
            setListGame(data)

        })
    }

    console.log('listGame', listGame)


    return (
        <div className="list-game">
            <Button onClick={handleClick} type="primary">Liste des jeux</Button>
            {
                listGame && listGame.map((game, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <CardListGame keyIndex={index} id={game.id} numCards={game.numCards} players={game.players} state={game.state} key={index}   />
                ))
            }
            <FloatButtonChat />
        </div>
    )
}

export default ListGame
