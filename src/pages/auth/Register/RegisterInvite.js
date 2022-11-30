import { useParams } from 'react-router-dom';
import './Register.scss';

import { RegisterForm } from '../../../components/Billing/RegisterForm/RegisterForm';
import { Footer } from '../../../components/Footer/footer';

export const RegisterInvite = () => {
    const { userId, lastName, firstName, email } = useParams();

    if(localStorage.getItem("session")) return (
        <div className='containerRegister'>
            <p>
                Veuillez vous déconnecter
            </p>
        </div>
    )

    return (
        <>
            <div className="containerRegister">
                <h2>#INVITATION</h2>
                <h1>Vos coordonnées</h1>
                <p>
                    Vous avez été invité.e à rejoindre Newbrands. Pour confirmer votre inscription, veuillez fournir les informations
                    suivantes.
                </p>
                
                <RegisterForm
                hasCompany={false}
                invite={true}
                email={email}
                lName={lastName}
                fName={firstName}
                userId={userId}
                />
            </div>
            <Footer />
        </>
    )
}