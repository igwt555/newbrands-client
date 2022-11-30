import { Redirect, Route } from "react-router"

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
    <Route {...rest}
        render={props => localStorage.getItem("session") ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/sign-in", state: { from: props.location, error: "You must be logged in to see this page" } }} />
    )}
    />)
}