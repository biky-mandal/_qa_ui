import { useState } from 'react';
import '../../styles/session/question.css';

export interface IQuestionAns {
}

function QuestionAnswer({ }: IQuestionAns) {

    const [show, setShow] = useState<boolean>(false);

    return (

        <div className='left-session-q'>
            <div className='session-question'>Which state is the host of ‘Pitra Paksha Mela’ event?</div>

            <div className='options-div'>
                <div className='options'>
                    <span className="optionkey">A</span>
                    <span className="optiontext">Uttar Pradesh
                    </span>
                </div>
                <div className='options'>
                    <span className="optionkey">B</span>
                    <span className="optiontext">Bihar</span>
                </div>
                <div className='options'>
                    <span className="optionkey">C</span>
                    <span className="optiontext">Gujarat</span>
                </div>
                <div className='options'>
                    <span className="optionkey">D</span>
                    <span className="optiontext">Assam</span>
                </div>
            </div>

            <div className='ans-div'>
                <div>
                    <button className='show-btn' onClick={() => setShow((prev) => !prev)}>{show ? 'Hide Answer' : 'Show Answer'}</button>
                </div>

                {
                    show && <div className='description-text'>
                        <p>In Bihar, the world-famous Pitra Paksha Mela began in Gaya, Bihar. The main function was organized at Vishnupad Temple. Lakhs of people from across the country and abroad reach here to offer prayers for departed souls on the banks of Falgu River.</p>
                    </div>
                }
            </div>
        </div>

    );
}

export default QuestionAnswer;