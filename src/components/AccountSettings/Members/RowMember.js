import { useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';

export const RowMember = (props) => {
    const {
        user, roles, images, userRole, userId,
        resendInvite, handleActivationMember, deleteMember, editRoleMember, updateListMembers
    } = props;
    const { iconEdit, iconLock, iconUnlock, iconDelete, iconResend } = images;
    
    const [openMenu, setOpenMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editRole, setEditRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState(1);

    const handleStatus = () => {
        setLoading(true);

        handleActivationMember(user.id).finally(() => {
            updateListMembers().finally(() => setLoading(false));
        });
    }

    const handleResend = () => {
        setLoading(true);

        resendInvite(user.id).finally(() => setLoading(false));
    }

    const handleRole = () => {
        setEditRole(false);
        setLoading(true);

        editRoleMember(user.id, { newLevelUser: selectedRole }).finally(() => {
            updateListMembers().finally(() => setLoading(false));
        });
    }

    const handleDelete = () => {
        setLoading(true);

        deleteMember(user.id).finally(() => {
            updateListMembers();
        });
    }

    return (
        <div className="rowMember">
            <div className="user">
                <span>{user.firstName} {user.lastName} {userId === user.id && <span className="vous">(vous)</span>}</span>
                <small>{user.email}</small>
            </div>

            <div className="status">
                <span
                className={`tag ${
                    user.invitationStatus ? "sent"
                    : user.memberStatus === 1 ? "active"
                    : user.memberStatus === 0 ? "deactivated"
                    : ""
                }`}>
                    { user.invitationStatus ? "Envoyé"
                    : user.memberStatus === 1 ? "Actif"
                    : user.memberStatus === 0 ? "Désactivé"
                    : "" }
                </span>
                <small>Dernière connexion : {user.lastConnexion ? new Date(user.lastConnexion).toLocaleDateString() : "x"}</small>
            </div>

            <div className="role">
                { editRole ?
                <select className="selectRole" value={selectedRole} onChange={(e) => setSelectedRole(parseInt(e.target.value))}>
                    {Object.values(roles).filter(r => r.value !== 2).map(r =>
                        <option key={`role-${r.value}`} value={r.value}>{r.label}</option>    
                    )}
                </select>
                :
                <>
                <span className="uppercase">
                    {roles[Object.keys(roles)[Object.values(roles).map(r => r.value).indexOf(user.userLevel)]] &&
                        roles[Object.keys(roles)[Object.values(roles).map(r => r.value).indexOf(user.userLevel)]].label
                    }
                </span>
                <small>Autorisation</small>
                </> }
                
            </div>

            { userRole !== 1 &&
            <div className={`actions ${userId === user.id || user.userLevel === 2 ? "hidden": ""}`}>
                <ClipLoader color={'#00798C'} loading={loading} size={12} />
                { !loading && !editRole &&
                <small onClick={() => setOpenMenu(!openMenu)}>
                    Action <span className={`chevron ${openMenu ? "open" : ""}`}>&lt;</span>
                </small>
                }
                { editRole &&
                <div className="roleAction">
                    <span className="cancel" onClick={() => setEditRole(false)}>&times;</span>
                    <span className="validate" onClick={() => handleRole()}>&#10003;</span>
                </div>
                }

                <div className={`menuActions ${!openMenu ? "hidden" : ""}`} onClick={() => setOpenMenu(false)}>
                    {user.invitationStatus ?
                    <span className="action" onClick={() => handleResend()}>
                        <img className="icon" src={iconResend} alt="" />
                        Renvoyer l'invitation
                    </span>
                    :
                    <span className="action" onClick={() => handleStatus()}>
                        {user.memberStatus === 1 ?
                        <>
                        <img className="icon" src={iconLock} alt="" />
                        Désactiver l'utilisateur
                        </> :
                        <>
                        <img className="icon" src={iconUnlock} alt="" />
                        Activer l'utilisateur
                        </>}
                    </span>
                    }
                    <span className="action" onClick={() => setEditRole(true)}>
                        <img className="icon" src={iconEdit} alt="" />
                        Modifier le rôle
                    </span>
                    <span className="action" onClick={() => handleDelete()}>
                        <img className="icon" src={iconDelete} alt="" />
                        Supprimer l'utilisateur
                    </span>
                </div>

            </div>
            }
        </div>
    )
}