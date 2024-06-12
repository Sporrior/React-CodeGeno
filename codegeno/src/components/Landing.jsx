// import React from 'react';
import '../css/Landing.css';

const Landing = () => {
    return (
        <div className="whole-container">
            <div className="container-landing-left">
                <div className="title">
                    <h1>Unlock the Power of Code:<br />Learn, Create, Share!</h1>
                </div>
                <div className='blurb-left'>
                    <img src="../assets/flash.png" alt="" />
                    <h3>Creative</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique inventore ut expedita quia velit. Voluptatum magnam totam ad earum veritatis aspernatur dignissimos molestiae molestias! Minus culpa eveniet vitae ipsa a!</p>
                </div>
                <div className='blurb-right'>
                    <img src="../assets/flash.png" alt="" />
                    <h3>Code</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nihil dolorem voluptate eaque cum. Blanditiis, pariatur, sed sapiente quod, harum molestiae non a perspiciatis aut esse ipsum rerum ducimus corrupti.</p>
                </div>
            </div>
            <div className="container-landing-right">
                This is the place where stuff for the right side comes
            </div>
        </div>
    );
};

export default Landing;
