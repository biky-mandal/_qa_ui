import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import '../../../styles/Practice/practiceSessionDashboard.css'
import coin from '../../../assets/coin-48.png';

interface IPracticeSessionDashboardProps {
}

const PracticeSessionDashboard = ({ }: IPracticeSessionDashboardProps) => {
    const navigate = useNavigate();

    function practiceHandler() {
        return navigate('/session/practice');
    }

    function liveHandler() {
        return navigate('/session/live');
    }

    return (
        <div className="practice-session">
            <div className='session-div'>
                <div className="session-card">
                    <div className='session-card-left'>
                        <span className='user-coin'><img src={coin} alt='user coin' /> 0 </span>

                        <div className='card-mid'>
                            <h3 className='card-title'>Practice</h3>
                            <p className='card-p'>You can practice question answer with 0 coins</p>
                        </div>
                    </div>

                    <div className='card-right'>
                        <Button title='Practice' type='primary' clickHandler={practiceHandler} />
                    </div>
                </div>
                <div className="session-card">
                    <div className='session-card-left'>
                        <span className='user-coin'><img src={coin} alt='user coin' /> 5 </span>

                        <div className='card-mid'>
                            <h3 className='card-title'>Live Session</h3>
                            <p className='card-p'>You will be charged 5 coins per mock</p>
                        </div>
                    </div>

                    <div className='card-right'>
                        <Button title='Start Live' type='secondary' clickHandler={liveHandler} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeSessionDashboard;
