import React from "react";
import '../styles/home.css';
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const redirectToDashboard = () => {
        return navigate('/dashboard');
    }

    return (
        <div className="home">
            <div className="landing-div">
                <label className="text1 text">Unlock the World, Stay Ahead!</label>
                <label className="text2 text">Empowering Every Student, Anytime, Anywhere</label>

                <div className="landing-btn">
                    <Button title="Dashboard" type="primary" clickHandler={redirectToDashboard} />
                </div>
            </div>
        </div >
    )
}

export default Home;