// import React from 'react';
import '../css/spin-info.css';

const SpinComponent = () => {
    const cardData = [
        {
            "name": "GPT-ACTGAN",
            "description": "Model voor het genereren van hoogdimensionale, voornamelijk numerieke, tabulaire gegevens"
        },
        {
            "name": "GPT-CTGAN",
            "description": "Model voor het genereren van synthetische data van hoge kwaliteit voor onevenwichtige datasets"
        },
        {
            "name": "GPT-TabGAN",
            "description": "Model voor het genereren van synthetische tabulaire data met behulp van GANs"
        },
        {
            "name": "GPT-TABRE",
            "description": "Model voor tafelreconstructie en datageneratie"
        },
        {
            "name": "GPT-SYNTH",
            "description": "Algemeen model voor het genereren van synthetische data"
        },
        {
            "name": "GPT-COPY",
            "description": "Model voor het kopiëren en aanpassen van tabulaire data"
        }
    ];

    return (
        <div className='container-spin-info'>
        <h1>Onze modellen</h1>
            <div className="void" id="void">
                <div className="crop">
                    <ul id="card-list" style={{ '--count': 6 }}>
                        {cardData.map((card, index) => (
                            <li key={index}>
                                <div className="card">
                                    <a href="">
                                        <span className="model-name">{card.name}</span>
                                        <span>{card.description}</span>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="last-circle"></div>
                    <div className="second-circle"></div>
                </div>
                <div className="mask"></div>
                <div className="center-circle"></div>
            </div>
        </div>
    );
};

export default SpinComponent;
