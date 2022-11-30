import './index.scss';

const SocialNetworkLinkBox = (props) => {

    const { logo, socialNetworkName, linkToSocialNetwork } = props;

    return (
        <a href={linkToSocialNetwork}>
            <div className="socialNetworkLinkBoxContainer">
                <img src={logo} />
                <p>{socialNetworkName}</p>
            </div>
        </a>
    );
}

export default SocialNetworkLinkBox;