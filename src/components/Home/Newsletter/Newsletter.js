import "./Newsletter.scss";
// import { useTranslation } from "react-i18next";

export const Newsletter = () => {
  // const { t } = useTranslation("common");

  return (
    <section className="containerMaker">
      <div className="card">
        <div className="row">

          <div className="textContainer">
            <p className="uppercase">Tendance marché</p>
            <h2>Le regard des experts la mode et sa transformation</h2>
            {/* <p>Subscribe to the Uscreen newsletter to receive the latest video business insights strategies and promotions straight to your inbox.</p> */}
          </div>

          <div className="inputContainer">
            <div className="customSearch">
              <input type="text" className="customSearchInput" placeholder="Adresse e-mail" />
              <button className="btn blueBtn">Inscription</button>
            </div>

            <div className="footNote">
              <div className="customRadio">
              </div>
              <p>2 e-mails par mois, promis !</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}