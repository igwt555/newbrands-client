import './legals.scss';
import SideMenu from './sideMenuLegals';

function LegalsContainer(props) {
    const Component = props.page;
    return (
        <div className="containerLegals">
            <SideMenu page={props.page.name} />
            <Component />
        </div>
    );
}

export default LegalsContainer;