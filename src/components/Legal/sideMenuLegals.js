import "./legals.scss";
import { Route } from "react-router-dom";
import { useLocation } from "react-router";

function LegalsContainer(props) {
  const location = useLocation(); 
  return (
    <div className="sideMenu">
      <h2>Ressources légales</h2>
      <ul>
        <Route
          render={({ history }) => (
            <li
              className={location.pathname === "/legals" ? "active" : null}
              onClick={() => history.push("/legals")}
            >
              Mentions légales
            </li>
          )}
        />
        <Route
          render={({ history }) => (
            <li
              className={location.pathname === "/use" ? "active" : null}
              onClick={() => history.push("/use")}
            >
              Conditions Générales d’Utilisation
            </li>
          )}
        />
        {/* <Route
          render={({ history }) => (
            <li
              className={props.page === "Politics" ? classes.active : null}
              onClick={() => history.push("/politics")}
            >
              Politique de Confidentialité et RGPD
            </li>
          )}
        />
        <Route
          render={({ history }) => (
            <li
              className={props.page === "Service" ? classes.active : null}
              onClick={() => history.push("/service")}
            >
              Conditions Particulières et Générales de Service
            </li>
          )}
        />
        <Route
          render={({ history }) => (
            <li
              className={props.page === "Cookies" ? classes.active : null}
              onClick={() => history.push("/cookies")}
            >
              Chartes Cookies
            </li>
          )}
        /> */}
      </ul>
      <span className="footer">
        © Copyright 2017-{new Date().getFullYear()}, NewBrands, SAS et ses partenaires
      </span>
    </div>
  );
}

export default LegalsContainer;
