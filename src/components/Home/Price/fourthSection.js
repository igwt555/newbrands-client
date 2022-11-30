import "./fourthSection.scss";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Route } from "react-router-dom";

function FourthSection() {
  const { t } = useTranslation("common");
  return (
    <section className="containerPrice">
      <div className="cardContainer">
        <div className="introduction">
          <h2 className="h2">{t("home.fourthSection.title")}</h2>
          <p className="p">{t("home.fourthSection.subtitle")}</p>
        </div>
        <div className="column">
          <div className="firstCard">
            <div className="row">
              <div className="firstColumn">
                <h6>{t("home.fourthSection.startingFrom")}</h6>
                <h3>{t("home.fourthSection.99perMonth")}</h3>
                <span>{t("home.fourthSection.99description")}</span>
              </div>
              <div className="listColumn">
                <div className="item">
                  <FaCheckCircle color="#01798c" size="24px" />
                  <span>{t("home.fourthSection.sample")}</span>
                </div>
                <div className="item">
                  <FaCheckCircle color="#01798c" size="24px" />
                  <span>{t("home.fourthSection.commands")}</span>
                </div>
                <div className="item">
                  <FaCheckCircle color="#01798c" size="24px" />
                  <span>{t("home.fourthSection.monitoring")}</span>
                </div>
              </div>
              <div className="listColumn">
                <div className="item">
                  <FaCheckCircle color="#01798c" size="24px" />
                  <span>{t("home.fourthSection.strategy")}</span>
                </div>
                <div className="item">
                  <FaCheckCircle color="#01798c" size="24px" />
                  <span>{t("home.fourthSection.projectManage")}</span>
                </div>
                <div className="item">
                  <FaCheckCircle color="#01798c" size="24px" />
                  <span>{t("home.fourthSection.dedicatedProduction")}</span>
                </div>
              </div>
              <Route
                render={({ history }) => (
                  <button className="btn" onClick={() => history.push("/register")}>
                    {t("home.fourthSection.select")}
                  </button>
                )}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="lastRow">
              <div className="firstColumn">
                <h6>{t("home.fourthSection.specialPricing")}</h6>
                <h3>{t("home.fourthSection.incubated")}</h3>
              </div>
              <div className="listColumn">
                <span>{t("home.fourthSection.incubatedText")}</span>
              </div>
              <button className="btn disabledBtn">
                {t("home.secondSection.soonAvailable")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FourthSection;
