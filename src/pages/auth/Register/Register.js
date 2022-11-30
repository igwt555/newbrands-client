import { useState } from 'react';
import './Register.scss';

import { RegisterForm } from '../../../components/Billing/RegisterForm/RegisterForm';
import { Button } from '../../../components/UI/Button/Button';
import { Footer } from '../../../components/Footer/footer';

export const Register = () => {
    const [hasCompany, setHasCompany] = useState();

    return (
        <>
            <div className="containerRegister">
                <h2>#ONBOARDING</h2>
                <h1>Vos coordonnées</h1>
                <p>
                    Durant cet OnBoarding, plusieurs questions vont vous êtres posées afin de comprendre au mieux votre activité afin d’établir une offre correspondant à vos besoins, adaptée à votre projet.
                </p>
                
                {hasCompany === undefined ?
                <div className="hasCompany">
                    <p>Etes-vous le représentant d'une entreprise existante ?</p>
                    <div className="hasCompanyChoice">
                        <Button value="Oui, j'ai une entreprise" handleClick={() => setHasCompany(true)} />
                        <Button value="Non, pas encore" handleClick={() => setHasCompany(false)} color="light" />
                    </div>
                </div>    
                :
                <RegisterForm hasCompany={hasCompany} handleBack={() => setHasCompany(undefined)} />
                }
            </div>
            <Footer />
        </>
    )
}