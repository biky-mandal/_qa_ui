import '../../styles/session/practice.css';
import QuestionAnswer from './Question';

export interface IPracticeSession {
}

function PracticeSession({ }: IPracticeSession) {

  return (
    <div className='session-main'>

      <div className='left-session'>
        <QuestionAnswer />
        <QuestionAnswer />
        <QuestionAnswer />
        <QuestionAnswer />
      </div>


      <div className='right-session'>

      </div>
    </div >
  );
}

export default PracticeSession;