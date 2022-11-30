import { Route } from "react-router-dom";

function NavigationBtn(props) {
    return (
    <div className="btnDiv">
        <Route
            render={({ history }) => (
                <button className="backBtn" onClick={() => history.goBack()}>
                    Retour
                </button>
            )}
        />
        <Route
            render={({ history }) => (
                <button className={`${"btn"} ${props.next && "disabled"}`} onClick={() => history.push(props.link)}>
                    Continuer
                </button>
            )}
        />
    </div>)
}

export default NavigationBtn