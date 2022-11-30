import React, { useEffect } from 'react';
import './progressbar.scss'
import { IoIosCheckmark } from 'react-icons/io'
import { BsChevronBarLeft } from 'react-icons/bs'
import { Route } from 'react-router-dom'


function ProgressBar(props) {
    console.log(props)
    const steps = {
        "0": "En création",
        "1": "En cours d'étude",
        "2": "Étude validée",
        "3": "Proposition effectuée",
        "4": "En attente de paiement",
        "5": "En cours",
        "6": "Terminé"
    }

    const createStepDisplayer = () => {
        let stepDisplayer = [];

        if (props.step !== undefined) {
            for (let i = 0; i < parseInt(props.step); i++) {
                stepDisplayer.push(
                    <div className="step" style={{ width: "20%" }}>
                        <IoIosCheckmark className="checkmark" style={{animationDelay: i*2+"s"}}/>
                        <span className="stepName">{ steps[i.toString()] }</span>
                        <span className="validatedStep" style={{animationDelay: i*2+"s"}}></span>
                    </div>
                );
            }
        }

        stepDisplayer.push(
            props.step !== "6"
            ?
            <div className="step" style={{ width: "60%" }}>
                <div className="currentStep" onClick={() => props.setActive()}></div>
                <span className="stepName">{ steps[props.step] }</span>
            </div>
            :
            <div className="step" style={{ width: "20%" }}>
                <IoIosCheckmark className="checkmark" style={{animationDelay: stepDisplayer.length*2+"s"}}/>
                <span className="stepName">{ steps["6"] }</span>
                <span className="validatedStep" style={{animationDelay: stepDisplayer.length*2+"s"}}></span>
            </div>
        );

        return stepDisplayer;
    }

    return (
        <div className="containerProgressBar">
            <Route  render={({ history }) => (
                <span className="backBtn" onClick={()=> history.goBack()}><BsChevronBarLeft />Mes projets</span>
            )} />
            <h1>
                { props.title !== undefined ? props.title : '---' } <span className="reference">#{ props.reference !== undefined ? props.reference : '---' }</span>
            </h1>
            <div className="background">
                {createStepDisplayer()}
            </div>
        </div>
    )
}

export default ProgressBar;