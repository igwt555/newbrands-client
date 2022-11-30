import './fileslist.scss'
import PS from '../../../assets/img/ps.png';
import PDF from '../../../assets/img/pdf.png';
import { API } from '../../../config';

import { Link } from 'react-router-dom';

function FilesList(props) {

    const { files, idProject, productName } = props;

    return (
        <div className="containerFileList">
            {
                productName
                ?
                <h4>Pièces jointes de {productName}</h4>
                :
                <h2>Ressources jointes</h2>
            }
            <ul className="fileList">
                {
                    files && files.map((f, i) => {
                        console.log(f.path + f.fileName);
                        return <a href={`${API}/upload/${productName ? 'product' : 'project'}/${idProject}/${f.fileName}`} target="_blank" download >
                            <li key={i} className="file">
                                <img src={PDF} alt="Télécharger" loading="lazy" />
                                <div>
                                    <span>{f.originalFileName}{i}</span>
                                    <p>Télécharger</p>
                                </div>
                            </li>
                        </a>
                    })
                }
            </ul>
        </div>
    )
}
export default FilesList;