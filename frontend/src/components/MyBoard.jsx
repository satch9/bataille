import backCard from '../assets/back.png';
import './boardOpponent.css';
import { Image } from 'antd';

const MyBoard = () => {
    let hands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    return (
        <div className="boardOpponent">
            {
                hands.map((hand, index) =>
                    <Image src={backCard} alt="card" key={index} className="hand" height={80} preview={false}/>

                )
            }
        </div>
    )
}

export default MyBoard
