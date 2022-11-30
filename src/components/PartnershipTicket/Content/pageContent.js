import InputWithSideButton from '../../UI/Inputs/InputWithSideButton/InputWithSideButton';
import SocialNetworkLinkBox from '../../UI/SocialNetworkLinkBox/SocialNetworkLinkBox';

import TwitterBlackLogo from '../../../assets/img/black-twitter-logo.svg';
import TinaNewbrands from '../../../assets/img/tina-ft-newbrands.PNG';
import CommentAuthorProfilePic from '../../../assets/img/emil-kristensen-profile-pic.svg';

import './pageContent.scss';

function pageContent() {
    return (
        <div className="partnershipTicketContentContainer">
            {/* <InputWithSideButton placeholder={'Enter your mail'} buttonText={'Subscribe'} />
            <SocialNetworkLinkBox logo={TwitterBlackLogo} socialNetworkName={'Twitter'} linkToSocialNetwork={'https://google.com'} /> */}
            <div className="partnershipTicketIntro">
                <img className="coverImage" src={TinaNewbrands} />
                <div className="partnershipTicketIntroContent">
                    <div className="categoriesContainer">
                        <p>PARTNERS</p>
                        <p>UPDATES</p>
                    </div>
                    <h1>Keep on Top of your To-Do List With Phantom’s Slick New Comment Features</h1>
                    <p>Our commenting feature is a firm favorite among our customers, eliminating the need for endless email threads and multiple messaging apps, and ensuring that teams, collaborators and clients…</p>
                    <div className="commentBox">
                        <img className="commentAuthorProfilePic" src={CommentAuthorProfilePic} />
                        <div className="commentInfo">
                            <p className="commentAuthor">EMIL KRISTENSEN</p>
                            <p className="commentDate">MARCH 9, 2021</p>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default pageContent;