export const checkIfEmailIsValid = (email) => {
    let msg = '';
    
    if (!email || !email.length > 0)
        msg = 'Le champ email doit être rempli';
    else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)))
        msg = "L'adresse mail renseignée n'est pas valide";
    return msg;
}

export const checkIfPhoneIsValid = (phone) => {
    let msg = '';

    if (!phone || !phone.length > 0)
        msg = 'Le champ téléphone doit être rempli';
    else if (phone.length < 6)
        msg = 'Le numéro de téléphone doit être plus long';

    console.log(msg);

    return msg;
}