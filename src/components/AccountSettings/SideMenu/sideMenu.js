import { useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import './sideMenu.scss';
import { HamburgerSqueeze } from 'react-animated-burgers';

function SideMenu(props) {
    const { panel } = props;
    
    const [isActive, setIsActive] = useState(false);

    const toggleButton = useCallback(
        () => setIsActive((prevState) => !prevState),
        []
    );

    return (
        <div className={`containerSideMenu ${!isActive ? "closed" : ""}`}>
            <div className="sideMenu">
                <h2>Mon compte</h2>
                <ul>
                    <Link to="informations">
                        <li className={panel === "informations" ? "active" : ""}>Informations</li>
                    </Link>
                    {/*<Link to="notifications">
                        <li className={panel === "notifications" ? "active" : ""}>Notifications</li>
                    </Link>*/}
                    <Link to="subscription">
                        <li className={panel === "subscription" ? "active" : ""}>Abonnement</li>
                    </Link>
                    <Link to="members">
                        <li className={panel === "members" ? "active" : ""}>Membres</li>
                    </Link>
                    <Link to="transactions">
                        <li className={panel === "transactions" ? "active" : ""}>Transactions</li>
                    </Link>
                </ul>
            </div>
            <span className="sideFooter">© Copyright 2017-2021, NewBrands, SAS et ses partenaires </span>
            <div className="sideBurger">
                <HamburgerSqueeze
                buttonColor="transparent"
                barColor="#00798c"
                buttonWidth={20}
                {...{ isActive, toggleButton }}
                />
            </div>
        </div>
    )
}

export default SideMenu;