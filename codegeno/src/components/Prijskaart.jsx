import '../css/Prijskaart.css'

const PricingComponent = () => {
    return (
        <div className="backgroundprijs">
            <div className="containerprijs">
                <div className="panel pricing-table">
                    <div className="pricing-plan">
                        <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" className="pricing-img" />
                        <h2 className="pricing-header">Personal</h2>
                        <ul className="pricing-features">
                            <li className="pricing-features-item">Free starter tier</li>
                            <li className="pricing-features-item">30 minutes of free lessons.</li>
                        </ul>
                        <span className="pricing-price">Free</span>
                        <a href="#/" className="pricing-button">Sign up</a>
                    </div>

                    <div className="pricing-plan">
                        <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" className="pricing-img" />
                        <h2 className="pricing-header">Small team</h2>
                        <ul className="pricing-features">
                            <li className="pricing-features-item">Subsciption for a small team</li>
                            <li className="pricing-features-item">learn,code and share your work.</li>
                        </ul>
                        <span className="pricing-price">$150</span>
                        <a href="#/" className="pricing-button is-featured">Free trial</a>
                    </div>

                    <div className="pricing-plan">
                        <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" className="pricing-img" />
                        <h2 className="pricing-header">Enterprise</h2>
                        <ul className="pricing-features">
                            <li className="pricing-features-item">Dedicated Codegeno experience</li>
                            <li className="pricing-features-item">Everything the other tier has + extra benefits.</li>
                        </ul>
                        <span className="pricing-price">$400</span>
                        <a href="#/" className="pricing-button">Free trial</a>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default PricingComponent;
