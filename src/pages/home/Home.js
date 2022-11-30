import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './Home.scss';

import { FirstSection } from '../../components/Home/FirstSection/FirstSection';
import { Services } from '../../components/Home/Services/Services';
import { Simplify } from '../../components/Home/Simplify/Simplify';
// import Prices from '../../components/Home/Price/fourthSection';
import { FAQ } from '../../components/Home/FAQ/FAQ';
import { Newsletter } from '../../components/Home/Newsletter/Newsletter';
import { LogoList } from '../../components/Home/LogoList/LogoList';
import { Partners } from '../../components/Home/Partners/partners';
import { Manifesto } from '../../components/Home/Manifesto/Manifesto';
import { AlternativeMaterials } from '../../components/Home/AlternativeMaterials/AlternativeMaterials';
// import Newsroom from '../../components/Home/Newsroom/Newsroom';

export const Home = () => {

  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);

  return (
    <div className="homePageContainer">
      <div className="homePageContent">
        <FirstSection />
        <Partners />
        <Services />
        <Simplify />
        <Manifesto />
        <AlternativeMaterials />
        {/* <Newsroom /> */}
        <FAQ page="Home" />
        <Newsletter />
        <LogoList />
        {/* <Footer footer="full" /> */}
      </div>
    </div>
  );
}