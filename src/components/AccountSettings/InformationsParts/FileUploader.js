import React, { useState, useEffect } from 'react';
import '../Account/account.scss';
import { uploadFile } from '../../../store/service';

export const FileUploader = (props) => {

    const [file, setFile] = useState();

    const { mode } = props;

    const onChange = (e) => {
        const formData = new FormData();

        console.log(e.target.files[0]);
        formData.append('files', e.target.files[0]);

        setFile(e.target.files[0]);

        for (let value of formData.values()) {
            console.log(value);
        }

        console.log(formData);

        uploadFile(formData, mode).then(res => {
            console.log(res);
        });
    }

    return (
        <div>
            <div className="uploadFile">
                <h5>{file !== undefined ? file.name : 'Add file'}</h5>
                <span>{file !== undefined ? 'insérer ou glisser un fichier' : 'or drop files here'}</span>
                <input type="file" onChange={onChange} />
            </div>
        </div>
    );
}