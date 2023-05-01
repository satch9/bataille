import FloatButtonChat from '../../components/FloatButtonChat'
import ScoreBoard from '../../components/ScoreBoard'
import './home.css'

const Home = () => {
    return (
        <div className="home">
            <ScoreBoard />
            <FloatButtonChat />
        </div>
    )
}

export default Home
