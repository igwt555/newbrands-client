import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import "./Contact.scss";

import { sendEmailContact } from "../../store/service";

import { Newsletter } from '../../components/Home/Newsletter/Newsletter';
import { LogoList } from '../../components/Home/LogoList/LogoList';

import FacebookLogo from '../../assets/img/facebook-icon-black.svg';
import LinkedinLogo from '../../assets/img/black-linkedin-logo.svg';
import InstagramLogo from '../../assets/img/black-instagram-logo.svg';
// import attachment from "../../assets/img/attachment.svg";

export const Contact = () => {
  const { t } = useTranslation("common");

  const [msgSent, setMsgSent] = useState();
  const [submitBtn, setSubmitBtn] = useState(`${t("contact.sendBtn")}`);
  const [data, setData] = useState({ name: "", mail: "", message: ""});

  useEffect(() => {
      Aos.init({ duration: 2000, once: true });
  }, []);

  const handleSubmit = (e) => {
      e.preventDefault();
      
      setSubmitBtn("ENVOI...");

      sendEmailContact({
        from_email: data.mail,
        text: data.message,
        subject: `Contact - ${data.name}`,
        fullname: data.name
      })
      .then((res) => {
        setMsgSent(true);
      })
      .catch(err => {
        setMsgSent(false);
      });
      
      setSubmitBtn(`${t("contact.sendBtn")}`);
  };

  const handleChange = (event) => setData({ ...data, [event.target.id]: event.target.value });

  return (
    <div>
      <div id="contact" className="rowAlign contentContainer">
          <div className="leftColumnContact" data-aos="fade-right">
              <h1>{t("contact.title")}</h1>
              <p className="contactFormIntroText">{t("contact.subtitle")}</p>

              <form onSubmit={handleSubmit}>

                <label htmlFor="name">{t("contact.nameInputLabel")}</label>
                <input
                    className="input"
                    type="text"
                    placeholder="John Doe"
                    id="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="mail">{t("contact.mailInputLabel")}</label>
                <input
                    className="input"
                    type="mail"
                    placeholder="johndoe@gmail.com"
                    id="mail"
                    onChange={handleChange}
                    value={data.mail}
                    required
                />

                <label htmlFor="message">{t("contact.messageInputLabel")}</label>
                <textarea
                    className="textarea"
                    placeholder={t("contact.messageInput")}
                    id="message"
                    value={data.message}
                    onChange={handleChange}
                    required
                />

                <div className={`validationMsg ${msgSent ? "valid" : "error"}`}>
                    <span>
                        {msgSent === true
                        ? "Message envoyé"
                        : msgSent === false
                        ? "Une erreur s'est produite, veuillez réessayer."
                        : null}
                    </span>
                </div>

                <div className="sendContainer">
                    <button className="btn blueBtn rounded">{submitBtn}</button>
                    <label>{t("contact.policy")} <a href="#policy">{t("contact.policyLink")}</a>
                    </label>
                </div>

              </form>
          </div>

          <div className="sideInfo" data-aos="fade-left">
              <h4 className="uppercase">Nous vous répondons sur les réseaux également</h4>
              <a href="https://www.facebook.com/ClothingReboot">
                  <div className="socialNetworkLinkBox">
                      <img src={FacebookLogo} />
                      <p>Facebook</p>
                  </div>
              </a>
              <a href="https://www.instagram.com/NewBrandsfr">
                  <div className="socialNetworkLinkBox">
                      <img src={InstagramLogo} />
                      <p>Instagram</p>
                  </div>
              </a>
              <a href="https://www.linkedin.com/company/12647016">
                  <div className="socialNetworkLinkBox">
                      <img src={LinkedinLogo} />
                      <p>Linkedin</p>
                  </div>
              </a>
              <div className="contactDetails">
                  <h2>Nos coordonnées</h2>
                  <p>10 Place Vendôme, 75001 Paris, France</p>
                  <p>+33 01 76 40 14 43 (gratuit)</p>
                  <p>sales@newbrands.fr</p>
              </div>
          </div>
      </div>

      <Newsletter />
      <LogoList />
    </div>
  );
}