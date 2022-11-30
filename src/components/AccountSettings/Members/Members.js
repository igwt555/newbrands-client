import { useState, useEffect } from "react";
import './Members.scss';
import ClipLoader from 'react-spinners/ClipLoader';

import {
    getListMembers, sendInvite, resendInvite, handleActivationMember, deleteMember, editRoleMember, getNbLicenses
} from "../../../store/service";
import { ROLES } from '../../../constants/roles';

import { Button } from '../../UI/Button/Button';
import { ButtonLink } from '../../UI/Button/ButtonLink';
import { RowMember } from "./RowMember";

import iconEdit from '../../../assets/img/icons8-edit.svg';
import iconLock from '../../../assets/img/icons8-lock.svg';
import iconUnlock from '../../../assets/img/icons8-padlock.svg';
import iconDelete from '../../../assets/img/icons8-trash-can.svg';
import iconResend from '../../../assets/img/icons8-refresh.svg';

export const Members = () => {
    
    const [listMembers, setListMembers] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(false);
    const [role, setRole] = useState(ROLES.INVITE.value);
    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [nbMembersMax, setNbMembersMax] = useState();
    const [nbMembersLeft, setNbMembersLeft] = useState();

    const companyId = JSON.parse(localStorage.getItem('user')).company.id;
    const userRole = JSON.parse(localStorage.getItem('user')).userLevel;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const isAbo = JSON.parse(localStorage.getItem('user')).abonnement["abonné"];

    useEffect(() => {
        getListMembers(companyId).then(res => {
            res.data.listClients && setListMembers(res.data.listClients);
        }).finally(() => setListLoading(false));

        getNbLicenses(companyId).then(res => {
            setNbMembersLeft(res.data.nombresLicencesRestantes);
            setNbMembersMax(res.data.nombresLicencesMax);
        });
    }, []);

    const updateListMembers = async () => {
        await getListMembers(companyId).then(res => {
            res.data.listClients && setListMembers(res.data.listClients);
        }).finally(() => getNbLicenses(companyId).then(res => {
            setNbMembersLeft(res.data.nombresLicencesRestantes);
            setNbMembersMax(res.data.nombresLicencesMax);
        }));
    }

    const handleSendInvite = () => {
        setSending(true);
        setError(false);

        sendInvite({
            email,
            firstName,
            lastName,
            leveluser: role
        }).then((res) => {
            if (res.data.code === 900) {
                setError(true);
                setSending(false);
            } else {
                updateListMembers().finally(() => {
                    setSending(false);
                });
            }
        }).catch(() => {
            setError(true);
            setSending(false);
        });
    }

    return (
        <div className="containerMembers">
            <div className="mainContent">
                <h2>Liste des membres</h2>
                <span>Liste des membres liés à votre entreprise</span>

                <div className="listMembers">

                    <ClipLoader color={'#00798C'} loading={listLoading} size={20} />
                    { !listLoading && listMembers.length === 0 ?
                        <p>Aucun utilisateur n'est associé à votre entreprise</p>
                    : listMembers.map(member =>
                        <RowMember
                        user={member}
                        roles={ROLES}
                        key={member.id}
                        resendInvite={resendInvite}
                        handleActivationMember={handleActivationMember}
                        deleteMember={deleteMember}
                        editRoleMember={editRoleMember}
                        updateListMembers={updateListMembers}
                        images={{ iconEdit, iconLock, iconUnlock, iconDelete, iconResend }}
                        userRole={userRole}
                        userId={userId}
                        />
                    )}

                </div>
                
                <h2>Ajouter un utilisateur</h2>

                <div className="addUser">
                    <div>
                        <div className="inputDiv">
                            <input type="text"
                                value={firstName}
                                name="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                            />
                            <label>Prénom</label>
                        </div>
                        <div className="inputDiv">
                            <input type="text"
                                value={lastName}
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                            />
                            <label>Nom</label>
                        </div>
                    </div>

                    <div>
                        <div className="inputDiv">
                            <select className="selectInput" value={role} onChange={(e) => setRole(parseInt(e.target.value))}>
                                { userRole !== 0 && userRole !== 2 ?
                                Object.values(ROLES).filter(r => r.value !== 2 && r.value !== 0).map(r =>
                                    <option key={`role-${r.value}`} value={r.value}>{r.label}</option>    
                                )
                                :
                                Object.values(ROLES).filter(r => r.value !== 2).map(r =>
                                    <option key={`role-${r.value}`} value={r.value}>{r.label}</option>    
                                )}
                            </select>
                            <label>Niveau d'autorisation</label>
                        </div>
                        <div className="inputDiv">
                            <input type="email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@newbrands.fr"
                            />
                            <label>Adresse e-mail</label>
                        </div>
                    </div>

                    {(typeof nbMembersLeft !== undefined && typeof nbMembersMax !== undefined && nbMembersMax !== 0) ?
                    <div>
                        <span className="message">
                        Vous utilisez actuellement
                        <b> {nbMembersMax - nbMembersLeft} licence{nbMembersMax - nbMembersLeft > 1 ? "s" : ""} sur {nbMembersMax} </b>
                        liées à votre offre actuelle.
                        {nbMembersLeft === 0 && " Pour ajouter un nouveau membre, vous devez mettre à jour votre abonnement."}
                        {/* En ajoutant un nouvel utilisateur,
                        votre abonnement sera mis à jour et vous paierez désormais <b>000,00€ H.T / mois permettant jusqu’à 10
                        utilisateurs</b>. */}
                        <br/>
                        { error && <span className="msgError">Une erreur est survenue</span> }
                        </span>
                        { nbMembersLeft === 0 && userRole === 2 ?
                        <ButtonLink value="&Agrave; venir" href="" />
                        : nbMembersLeft > 0 &&
                        <Button value={sending ? "Envoi" : "Envoyer"} handleClick={() => handleSendInvite()} loading={sending} />
                        }
                    </div>
                    : null }
                    { !isAbo &&
                    <div>
                        <span className="message">Pour ajouter un nouveau membre, vous devez prendre un abonnement.</span>
                        <ButtonLink value="S'abonner" href="/billing" />
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}