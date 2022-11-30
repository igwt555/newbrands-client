import { Route, Switch, Redirect } from "react-router-dom";

import DashboardComponent from '../../components/Dashboard/dashboard';
import { Footer } from '../../components/Footer/footer';

function Dashboard() {
    return (
        <>
            <Switch>
                <Route exact path='/dashboard/commands/token'>
                    <DashboardComponent activated={true} panel="commands" />
                </Route>
                <Route exact path='/dashboard/commands'>
                    <DashboardComponent activated={false} panel="commands" />
                </Route>
                <Route exact path='/dashboard/projects'>
                    <DashboardComponent activated={false} panel="projects" />
                </Route>
                <Route exact path='/dashboard/completed-commands'>
                    <DashboardComponent activated={false} panel="completed-commands" />
                </Route>
                <Route exact path='/dashboard/marketplace'>
                    <DashboardComponent activated={false} panel="marketplace" />
                </Route>
                <Route path='/dashboard/'>
                    <Redirect to="/dashboard/commands" />
                </Route>
            </Switch>
            <Footer />
        </>
    );
}

export default Dashboard;
