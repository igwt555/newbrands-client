import { useState, useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, useHistory, NavLink, useLocation, Link } from "react-router-dom";
import "./header.scss";
import { HamburgerSqueeze } from 'react-animated-burgers';
import { AiFillCaretDown } from 'react-icons/ai';
import axios from "axios";
import { API } from "../../config";
import jsonwebtoken from 'jsonwebtoken';

import { UserStoreContext } from '../../store/userStore';
// import { getProfileInformation } from "../../store/service";

import { ButtonLink } from '../../components/UI/Button/ButtonLink';

import logo from "../../assets/img/logo-newbrands.svg";
import User from "../../assets/img/user.svg";
import Lock from "../../assets/img/lock.svg";
// import Bell from "../../assets/img/bell.svg";
import Chart from "../../assets/img/chart.svg";
import Picture from '../../assets/img/default-avatar.png';
// import Banner from '../../assets/img/Banner.svg';

axios.defaults.headers.common['Authorization'] = localStorage.getItem("session")

export const Header = () => {
    const loggedIn = window.localStorage.getItem('session') ? window.localStorage.getItem('session') : "";
    const { t } = useTranslation("common");
    
    const { state, dispatch } = useContext(UserStoreContext);

    const [isActive, setIsActive] = useState(false);
    const [openMenuProfile, setOpenMenuProfile] = useState(false);
    const [user, setUser] = useState(state.user);
    const [profilePic, setProfilePic] = useState(Picture);

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('session');
        localStorage.removeItem('idUserNewBrands');
        localStorage.removeItem('idCompanyUserNewBrands');
        dispatch({ type: 'resetStore' });
        setUser();
        setProfilePic(Picture);
        setOpenMenuProfile(false);
        setIsActive(false);
    }

    useEffect(() => {
        async function FetchData() {
            const userInLocalStorage = JSON.parse(localStorage.getItem('user'));

            if (loggedIn.length > 0) {
                const decodeJWT = jsonwebtoken.decode(loggedIn);

                if (decodeJWT.exp < Date.now() / 1000) {
                    logout();
                    history.push('/sign-in');
                }
            }

            if (loggedIn.length > 0 && !state.user && userInLocalStorage) {
                dispatch({ type: 'setUser', user: userInLocalStorage });
            }

            if (loggedIn.length > 0 && !state.picture && userInLocalStorage && userInLocalStorage.id && userInLocalStorage.picture) {
                dispatch({ type: 'setProfilePic', picture: `${API}/upload/user/${userInLocalStorage.id}/${userInLocalStorage.picture}` });
            }
        }
        FetchData()
    }, []);

    useEffect(() => {
        if(state.user) setUser(state.user);
    }, [JSON.stringify(state.user)]);

    useEffect(() => {
        if(state.picture) setProfilePic(state.picture);
    }, [state.picture]);

    const handleBlur = (event) => {
        if(!event.currentTarget.contains(event.relatedTarget)) {
            setOpenMenuProfile(false);
        }
    }

    const toggleButton = useCallback(
        () => setIsActive((prevState) => !prevState),
        []
    );

    return (
        <header className="header" style={useLocation().pathname.startsWith('/createProject') ? {display: "none"} : {}}>
            {/* <div className="headerBanner">
                <img src={Banner} />
            </div> */}
            <div className="container">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="burgerMenu">
                    <HamburgerSqueeze
                    buttonColor="transparent"
                    barColor="#333333"
                    buttonWidth={20}
                    {...{ isActive, toggleButton }}
                    />
                </div>

                <ul className={`${isActive === true ? "openMobile" : null} ${"bigMenu"}`}>
                    {
                        loggedIn.length > 0 ?
                        <>
                            {(() => {
                                switch (window.location.pathname.replace(/\\/g, '')) {
                                    case '/dashboard/commands':
                                        return <li className="menuElement">
                                            <NavLink to='/dashboard/commands' exact>Dashboard</NavLink>
                                        </li>
                                    case '/dashboard/projects':
                                        return <li className="menuElement">
                                            <NavLink to='/dashboard/projects' exact>Dashboard</NavLink>
                                        </li>
                                    case '/dashboard/completed-commands':
                                        return <li className="menuElement">
                                            <NavLink to='/dashboard/completed-commands' exact>Dashboard</NavLink>
                                        </li>
                                    default:
                                        return <li className="menuElement">
                                            <NavLink to='/dashboard/commands' exact>Dashboard</NavLink>
                                        </li>
                                }
                            })()}
                        </>
                        :
                        <>
                            <li className="menuElement">
                                <NavLink to='/' exact>Accueil</NavLink>
                            </li>
                            <li className="menuElement">
                                <NavLink to='/about' exact>À propos</NavLink>
                            </li>
                            <li className="menuElement">
                                <NavLink to='/fare' exact>Tarifs</NavLink>
                            </li>
                        </>
                    }
                    <li className="menuElement">
                        <NavLink to='/marketplace' exact>Marketplace</NavLink>
                    </li>
                    <li className="menuElement">
                        <NavLink to='/contact' exact>Contact</NavLink>
                    </li>

                    {loggedIn.length > 0 ?
                        <div className="profileMenuContainer" onClick={() => setOpenMenuProfile(!openMenuProfile)} tabIndex="0" onBlur={(e) => handleBlur(e)}>
                            <div className="profileDiv" >
                                <img className="profilePicture" src={profilePic} alt="profile" />

                                <span>{`${user ? user.firstName : ''} ${user ? user.lastName : ''}`}</span>

                                <span><AiFillCaretDown className="dropDown" size=".5rem" /></span>
                            </div>
                            <div className="pMenuContainer">
                                {openMenuProfile && <ul className="profileMenu">
                                    <li>
                                        <NavLink to="/dashboard">
                                            <img src={User} alt="Dashboard" /><span>Dashboard</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/account/informations">
                                            <img src={User} alt="My account" /><span>Mon compte</span>
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to="/account/notifications">
                                            <img src={Bell} alt="Notification" /><span>Notification</span>
                                        </NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink to="/account/subscription">
                                            <img src={Chart} alt="Subscription" /><span>Abonnement</span>
                                        </NavLink>
                                    </li>
                                    <li onClick={() => logout()}>
                                        <NavLink to="/">
                                            <img src={Lock} alt="Sign out" /><span>Déconnexion</span>
                                        </NavLink>
                                    </li>

                                </ul>}
                            </div>
                        </div>
                    :
                        <div className="unloggedMenu">

                            <li>
                                <NavLink to="/sign-in">{t("header.connect")}</NavLink>
                            </li>

                            <li>
                                <NavLink to="/register">Inscription</NavLink>
                            </li>

                            <li className="btnLink">
                                <ButtonLink
                                href="/register"
                                color="light"
                                value={t("header.createProject")}
                                />
                            </li>

                        </div>
                    }
                </ul>
            </div>
        </header>
    );
}