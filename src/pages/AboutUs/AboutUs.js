import './AboutUs.scss';

import { AboutUsIntro } from '../../components/AboutUs/AboutUsIntro/AboutUsIntro';
import { AboutUsImagesSection } from '../../components/AboutUs/AboutUsImagesSection/AboutUsImagesSection';
import { AboutUsOurValues } from '../../components/AboutUs/AboutUsOurValues/AboutUsOurValues';
import { AboutUsNumbers } from '../../components/AboutUs/AboutUsNumbers/AboutUsNumbers';
// import { AboutUsOurTeam } from '../../components/AboutUs/AboutUsOurTeam/AboutUsOurTeam';
// import { AboutUsLabels } from '../../components/AboutUs/AboutUsLabels';
// import { AboutUsWhatTheySay } from '../../components/AboutUs/AboutUsWhatTheySay';
import { Newsletter } from '../../components/Home/Newsletter/Newsletter';
import { LogoList } from '../../components/Home/LogoList/LogoList';

export const AboutUs = () => {

    return (
        <div>
            <div className="aboutUsContainer">
                <AboutUsIntro />

                <AboutUsImagesSection />

                <AboutUsOurValues />

                <AboutUsNumbers />

                {/* <AboutUsOurTeam /> */}

                {/* <AboutUsLabels /> */}

                {/* <AboutUsWhatTheySay /> */}
            </div>

            <Newsletter />
            <LogoList />
        </div>
    );
}