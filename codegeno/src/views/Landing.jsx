// import React from 'react';
import '../css/Landing.css';
import ThreePictures from "../components/3-pictures";

const Landing = () => {
    return (
        <div className="whole-container">
            <div className='slogan'>
                <h3>your new coding community</h3>
                <h1>Discover the power of code</h1>
                <p className='punch'>Learn, Code, Share together as a community.</p>
            </div>
            <div className='images'>
                <ThreePictures />
            </div>
        </div>
    );
};

export default Landing;
