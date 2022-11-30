import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/scss/style.scss';

import { StoreContainer } from './store/store';
import { UserStoreContainer } from './store/userStore';
import store from './redux/store';

import { Home } from './pages/home/Home';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Fare } from './pages/Fare/Fare';
import { Contact } from './pages/Contact/Contact';
import MentionsLegales from './pages/mentionsLegales/MentionsLegales';
import Dashboard from './pages/dashboard/Dashboard';
// import ValidatingAccount from './pages/auth/ValidatingAccount';
// import { Error } from './pages/Error/Error';
import { SignIn } from './pages/auth/SignIn/SignIn';
import ProjectPage from './pages/dashboard/ProjectPage';
import CreateProject from "./pages/createProject/CreateProject";
import { AccountSettings } from "./pages/Account/AccountSettings";
import { Register } from "./pages/auth/Register/Register";
import { RegisterInvite } from "./pages/auth/Register/RegisterInvite";
import { Billing } from "./pages/Billing/Billing";
import { PaymentComplete } from './components/Billing/PayementComplete/PaymentComplete';
import { ErrorPayment } from './components/Billing/ErrorPayment/ErrorPayment';
import DeferredPayment from './pages/DeferredPayment/DeferredPayment';
import PartnershipTicket from './pages/partnershipTicket/PartnershipTicket';
import { MdpOublie } from "./pages/auth/mdpOublie/MdpOublie";
import { MdpReset } from "./pages/auth/mdpOublie/MdpReset";
import { MarketPlacePage } from "./pages/marketplace";

import { Header } from './components/Header/header';
import Legals from './components/Legal/legals';
import Use from './components/Legal/useContainer';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ScrollToTop } from './components/ScrollTop/ScrollToTop';
import { DefaultLayout } from './layout/default-layout';

const App = () => {
    return (
        <Provider store={store}>
            <StoreContainer>
                <UserStoreContainer>
                    <BrowserRouter>
                        <ScrollToTop />
                        {/* <Header /> */}
                        <DefaultLayout />
                    </BrowserRouter>
                </UserStoreContainer>
            </StoreContainer>
        </Provider>
    )
}

export default App;