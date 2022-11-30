import { Redirect, Route, Switch } from "react-router-dom";

import Account from '../../components/AccountSettings/Account/account';
import Notifications from '../../components/AccountSettings/Notification/notifications';
import Subscription from '../../components/AccountSettings/Subscription/subscription';
import { Members } from '../../components/AccountSettings/Members/Members';
import Transactions from '../../components/AccountSettings/Transaction/transactions';
import Menu from '../../components/AccountSettings/SideMenu/sideMenu';

export const AccountSettings = () => {
    return (
        <Switch>
            <Route exact path='/account/informations'>
                <Menu panel="informations" />
                <Account />
            </Route>
            <Route exact path='/account/notifications'>
                <Menu panel="notifications" />
                <Notifications />
            </Route>
            <Route exact path='/account/subscription'>
                <Menu panel="subscription" />
                <Subscription />
            </Route>
            <Route exact path='/account/members'>
                <Menu panel="members" />
                <Members />
            </Route>
            <Route exact path='/account/transactions'>
                <Menu panel="transactions" />
                <Transactions />
            </Route>
            <Route path='/account/'>
                <Redirect to="/account/informations" />
            </Route>
        </Switch>
    );
}