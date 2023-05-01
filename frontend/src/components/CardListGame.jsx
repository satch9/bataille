import { Card, Table, Button } from 'antd'
import { socket } from '../context/IoContext';
import { useNavigate } from 'react-router-dom';

import './cardListGame.css'


// eslint-disable-next-line react/prop-types
const CardListGame = ({ keyIndex, id, numCards, players, state, }) => {

    const navigate = useNavigate();

    const handleJoinClick = () => {
        socket.emit('join-game', { gameId: id })
        socket.on('game-joined', (data) => {
            console.log('game-joined', data)
            navigate('/game/' + data.gameId)
        })

    }

    const columns = [
        {
            title: 'Cartes',
            dataIndex: 'numCards',
            key: 'numCards',
        },
        {
            title: 'Joueurs',
            dataIndex: 'players',
            key: 'players',

        },
        {
            title: 'Etat partie',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                // eslint-disable-next-line react/prop-types
                players.length < 2 ?
                    <Button onClick={handleJoinClick}>Rejoindre</Button>
                    : <Button disabled>Rejoindre</Button>
            ),
        },
    ];



    let data = [
        {
            key: keyIndex,
            numCards: numCards,
            // eslint-disable-next-line react/prop-types
            players: players.map(user => user.username).join(', '),
            state: state,
        }
    ]

    console.log("data", data)

    return (
        <div className='cardlistgame'>
            <Card
                size="small"
                title={`Partie n°${keyIndex + 1}`}
                style={{
                    width: 'auto',
                }}
                key={keyIndex}
            >
                <Table key={keyIndex} dataSource={data} columns={columns} pagination={false} />

            </Card>
        </div>
    )
}

export default CardListGame
