import { Route, Switch, useLocation } from "react-router-dom"
import { ErrorPayment } from "../../components/Billing/ErrorPayment/ErrorPayment"
import { PaymentComplete } from "../../components/Billing/PayementComplete/PaymentComplete"
import Dashboard from "../../components/Dashboard/dashboard"
import Legals from "../../components/Legal/legals"
import Use from "../../components/Legal/useContainer"
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute"
import { AboutUs } from "../../pages/AboutUs/AboutUs"
import { AccountSettings } from "../../pages/Account/AccountSettings"
import { MdpOublie } from "../../pages/auth/mdpOublie/MdpOublie"
import { MdpReset } from "../../pages/auth/mdpOublie/MdpReset"
import { Register } from "../../pages/auth/Register/Register"
import { RegisterInvite } from "../../pages/auth/Register/RegisterInvite"
import { SignIn } from "../../pages/auth/SignIn/SignIn"
import { Billing } from "../../pages/Billing/Billing"
import { Contact } from "../../pages/Contact/Contact"
import CreateProject from "../../pages/createProject/CreateProject"
import ProjectPage from "../../pages/dashboard/ProjectPage"
import DeferredPayment from "../../pages/DeferredPayment/DeferredPayment"
import { DeliveryPlacePage } from "../../pages/deliveryplace"
import { Fare } from "../../pages/Fare/Fare"
import { Home } from "../../pages/home/Home"
import { MarketCart1, MarketCart1Page } from "../../pages/marketcart1"
import { MarketPlacePage } from "../../pages/marketplace"
import { MarketProductPage } from "../../pages/marketproduct"
import { MaterialSourcePage } from "../../pages/materialsource"
import MentionsLegales from "../../pages/mentionsLegales/MentionsLegales"
import PartnershipTicket from "../../pages/partnershipTicket/PartnershipTicket"
import { SideBar } from "./side-bar"
import './style.scss'

export const DefaultLayout = () => {
    const router = useLocation()
    console.log({ router })

    return <div className='default-layout'>
        <SideBar />
        <div className='main-content'>
            <Switch>
                {/* General pages */}
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/about">
                    <AboutUs />
                </Route>

                <Route exact path="/fare">
                    <Fare />
                </Route>

                <Route exact path="/partnership-ticket">
                    <PartnershipTicket />
                </Route>

                <Route exact path="/contact">
                    <Contact />
                </Route>

                <Route exact path="/marketplace">
                    <MarketPlacePage />
                </Route>

                <Route exact path="/marketproduct">
                    <MarketProductPage />
                </Route>

                <Route exact path="/materialsource">
                    <MaterialSourcePage />
                </Route>

                <Route exact path="/marketcart1">
                    <MarketCart1Page />
                </Route>

                <Route exact path="/deliveryplace">
                    <DeliveryPlacePage />
                </Route>

                <Route exact path="/legals">
                    <MentionsLegales page={Legals} />
                </Route>

                <Route exact path="/use">
                    <MentionsLegales page={Use} />
                </Route>

                {/* Auth */}

                <Route exact path="/sign-in">
                    <SignIn />
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>

                <Route exact path="/register/:userId/:lastName/:firstName/:email">
                    <RegisterInvite />
                </Route>

                <Route exact path="/forgot-password">
                    <MdpOublie />
                </Route>

                <Route exact path="/reset-password/:token">
                    <MdpReset />
                </Route>

                {/* Billing */}

                <Route exact path="/billing">
                    <Billing />
                </Route>

                <Route exact path="/instant-quote/command-success">
                    <PaymentComplete />
                </Route>

                <Route exact path="/instant-quote/payment-error">
                    <ErrorPayment />
                </Route>

                {/* Logged in pages */}

                <PrivateRoute path="/dashboard" component={Dashboard} />

                <PrivateRoute path="/project/:id" component={ProjectPage} />

                <PrivateRoute path="/account" component={AccountSettings} />

                <PrivateRoute path="/createProject" component={CreateProject} />

                <PrivateRoute path="/deferred-payment/:id" component={DeferredPayment} />

                {/* <Route exact path="/validation-account" children={<ValidatingAccount />}>
    </Route> */}

                {/*<Route>
    <Error />
    </Route>*/}

            </Switch>
        </div>
    </div>
}