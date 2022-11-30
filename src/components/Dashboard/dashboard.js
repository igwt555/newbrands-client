import React, { useEffect, useState } from 'react';
import "./dashboard.scss";
import { Route, Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs"
import { getStudiedProjects, getPastCommands, getCurrentCommands, getProfileInformation } from '../../store/service';
import { steps } from '../../constants/projectSteps';

import { ButtonLink } from '../UI/Button/ButtonLink';

function Dashboard(props) {

    const [studiedProjects, setStudiedProjects] = useState([]);
    const [pastCommands, setPastCommands] = useState([]);
    const [currentCommands, setCurrentCommands] = useState([]);
    const [isUserSubscribed, setIsUserSubscribed] = useState();
    const [userLevel, setUserLevel] = useState();
    const [commandsLoaded, setCommandsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getStudiedProjects().then(res => {
                if(res.status === 200)
                    setStudiedProjects(res.data.project !== null ? res.data.project : []);
            }),
    
            getPastCommands().then(res => {
                if(res.status === 200)
                    setPastCommands(res.data.project !== null ? res.data.project : []);
            }),
    
            getCurrentCommands().then(res => {
                if(res.status === 200)
                    setCurrentCommands(res.data.project !== null ? res.data.project : []);
            })

        ]).then(() => {
            setCommandsLoaded(true);
        });

        getProfileInformation().then(res => {
            if(res.status === 200) {
                setUserLevel(res.data[0].userLevel);
                setIsUserSubscribed(res.data[0] !== null ? res.data[0].abonnement["abonné"] : false);
                localStorage.setItem("user", JSON.stringify(res.data[0]));
            }
        });
    }, []);

    useEffect(() => {
        // if(commandsLoaded)
        //     localStorage.setItem('allowedProject', studiedProjects.length === 0 && pastCommands.length === 0 && currentCommands.length === 0);
        if(commandsLoaded)
            localStorage.setItem('allowedProject', true);
        else
            localStorage.removeItem("allowedProject");

    }, [commandsLoaded]);

    const createProjectsAndCommandsList = () => {
        let list = [];

        if (props.activated !== true && props.panel === "projects")
            list = studiedProjects;
        else if (props.activated !== true && props.panel === "completed-commands")
            list = pastCommands;
        else if (props.activated !== true && props.panel === "commands")
            list = currentCommands;

        return list.length > 0 ?
        <ul className="projectCardsContainer">

            {/* { isUserSubscribed === false &&
            <div className="blueDiv">
                <span>
                    { userLevel !== undefined && userLevel === 2 ?
                    "Vous devez d'abord vous abonner pour pouvoir créer un projet"
                    :
                    "Un responsable doit renouveler votre abonnenement avant que vous puissiez créer un projet"
                    }
                </span>
                { userLevel !== undefined && userLevel === 2 &&
                <Route render={({ history }) => (
                    <BsArrowRight className="arrow" onClick={() => history.push("/billing")} />
                )} />
                }
            </div>
            } */}

            <div className="blueDiv">
                <span>Pour finaliser votre compte, nous avons besoin de quelques informations vous concernant.</span>
                <Route render={({ history }) => (
                    <BsArrowRight className="arrow" onClick={() => history.push("/account/informations")} />
                )} />
            </div>

            { list.map((item, i) => {
                return <li key={i} className="projectCard">
                    <div className="leftCol">
                        {/* <h2>Projet créé le {moment(value[0]).format('D MMM YYYY').toLowerCase()}</h2> */}
                        <h2>{ item.title }</h2>
                        <ul className="tags">
                            <li className={`${"tag"} ${item.type.some(i => i.name === 'Stylisme')  ? "selectedTag" : ''}`}>
                                <span>Stylisme</span>
                            </li>
                            <li className={`${"tag"} ${item.type.some(i => i.name === 'Modelisme')  ? "selectedTag" : ''}`}>
                                <span>Modélisme</span>
                            </li>
                            <li className={`${"tag"} ${item.type.some(i => i.name === 'Confection')  ? "selectedTag" : ''}`}>
                                <span>Confection</span>
                            </li>
                            <li className={`${"tag"} ${item.type.some(i => i.name === 'Sourcing')  ? "selectedTag" : ''}`}>
                                <span>Sourcing</span>
                            </li>
                        </ul>
                        {/* <h3>{typeof item.product.length !== 'undefined' ? (item.product.length - 1) : "0"} produit{ (item.product.length - 1) > 1 ? 's' : ''}</h3> */}
                        <h3>{typeof item.product.length !== 'undefined' ? item.product.length : "0"} produit{item.product.length > 1 ? 's' : ''}</h3>
                    </div>
                    <div className="rightCol">
                        <h1>Total H.T { item.price !== null ? item.price : 0 } €</h1>
                        <span>{ steps[item.step].stepName }</span>
                        <ButtonLink href={`/project/${item.id}`} value="Voir ma commande" color="white" />
                    </div>
                </li>
            })}
        </ul>
        :
        <div className="emptyProjectsAndCommandsListContainer">

            {/* { isUserSubscribed === false &&
            <div className="blueDiv">
                <span>
                    { userLevel !== undefined && userLevel === 2 ?
                    "Vous devez d'abord vous abonner pour pouvoir créer un projet"
                    :
                    "Un responsable doit renouveller votre abonnenement avant que vous puissiez créer un projet"
                    }
                </span>
                { userLevel !== undefined && userLevel === 2 &&
                <Route render={({ history }) => (
                    <BsArrowRight className="arrow" onClick={() => history.push("/billing")} />
                )} />
                }
            </div>} */}

            <div className="blueDiv">
                <span>Pour finaliser votre compte, nous avons besoin de quelques informations vous concernant.</span>
                <Route render={({ history }) => (
                    <BsArrowRight className="arrow" onClick={() => history.push("/account/informations")} />
                )} />
            </div>

            <div className="lazyContainer">
                <div className="leftCol">
                    <div className="lazyInput"></div>
                    <div className="row">
                        <div className="lazyBtn"></div>
                        <div className="lazyBtn"></div>
                        <div className="lazyBtn"></div>
                        <div className="lazyBtn"></div>
                    </div>
                    <div className="lazyInput"></div>
                </div>
                <div className="rightCol">
                    <div className="lazyInput"></div>
                    <div className="lazyInput"></div>
                    <button className="whiteBtn">N/A</button>
                </div>
            </div>
            <br />
            <span className="example">Visuel d'exemple</span>
        </div>
    }

    return (
        <div className="containerDashboard">
            {/* { (isUserSubscribed ||
            (commandsLoaded && studiedProjects.length === 0 && pastCommands.length === 0 && currentCommands.length === 0))
            &&
                <ButtonLink href="/createProject" value="Créer un nouveau projet" linkState={{ allowed: true }} />
            } */}
            <ButtonLink href="/createProject" value="Créer un nouveau projet" linkState={{ allowed: true }} />
            <ul className="panelTitleContainer">
                <Link to="commands"><li className={`${"panelTitle"} ${props.panel === "commands" ? "active" : ""}`}>Commandes en cours</li></Link>
                <Link to="projects"><li className={`${"panelTitle"} ${props.panel === "projects" ? "active" : ""}`}>Projets à l’étude</li></Link>
                <Link to="completed-commands"><li className={`${"panelTitle"} ${props.panel === "completed-commands" ? "active" : ""}`}>Commandes passées</li></Link>
            </ul>
            <div className="projectsAndCommandsListContainer">
                {
                    createProjectsAndCommandsList()
                }
                {/* <div className="advertisementContainer">
                    <div>
                        <p>à venir</p>
                    </div>
                    <div>
                        <p>à venir</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard;