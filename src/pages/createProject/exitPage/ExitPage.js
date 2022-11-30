import { useContext, useEffect, useState } from 'react';

import { validateProject } from '../../../store/service';

import { StoreContext } from '../../../store/store';

import { NavLink } from 'react-router-dom';

import SyncLoader from 'react-spinners/SyncLoader';

import './index.scss';

const ExitPage = (props) => {

    const { projectId } = props;

    const [projectValid, setProjectValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { state, dispatch } = useContext(StoreContext);

    useEffect(() => {
        setLoading(true);
        validateProject(projectId).then(res => {
            if (res.status === 200) {
                dispatch({ type: 'resetStore' });
                setProjectValid(true);
            }
        }).finally(() => setLoading(false));
    }, []);

    return (
        <div className="exitPageContainer">
            {
                projectValid && !loading ?
                <>
                    <p>Votre projet a bien été crée</p>

                    <NavLink to='/dashboard'>
                        <button className="btn lightBlueBtn">Revenir au dashboard</button>
                    </NavLink>
                </>
                :
                <>
                    <p>Votre projet est en cours de validation</p>

                    <SyncLoader color={'#00798CB3'} loading={loading} size={20} margin={2} />
                </>
            }
        </div>
    );
}

export default ExitPage;