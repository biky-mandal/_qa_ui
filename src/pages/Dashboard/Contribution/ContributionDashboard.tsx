import QaTable from "../../../components/QATable";
import '../../../styles/contributionDashboard.css';
import coin from '../../../assets/coin-48.png'
import { useState } from "react";
import QuestionModel from "../../Admin/Models/QuestionModel";

interface IContributionDashboardProps {
}

const ContributionDashboard = ({ }: IContributionDashboardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addQuestionHandler = () => {
        setIsModalOpen(true);
    }

    return (
        <div className="contribution-div">
            <QuestionModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div className="contribute-q">
                <button className="contribute-btn" onClick={addQuestionHandler}>
                    <img className="coin" src={coin} alt="coin" />Contribute to get Coins
                </button>
            </div>
            <QaTable />
        </div>
    );
};

export default ContributionDashboard;
