import { useState, useEffect } from 'react';
import { getProjectDetails } from '../../store/service';
import ProgressBar from '../../components/Project/ProgressBar/progressBar'
import ProductList from '../../components/Project/ProductList/productsList'
import SidePricing from '../../components/Project/SidePricing/sidePricing'
import FilesComponent from '../../components/Project/FilesList/filesList'
import { Footer } from '../../components/Footer/footer'
import { ModalManufacturer } from '../../components/Project/ModalManufacturer/ModalManufacturer';
import { sendGetUrlPaiement } from '../../store/service';
import ClipLoader from 'react-spinners/ClipLoader';
import './index.scss';

function ProjectPage(props) {
    const [projectDetails, setProjectDetails] = useState({});
    const [priceDetails, setPriceDetails] = useState({});
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getProjectDetails({ id: props.match.params.id }).then(res => {
            console.log('res',res)
            if (res.status === 200) {
                setProjectDetails(res.data.project[0]);
                setPriceDetails({ priceHt: res.data.project[0].priceHT, tva: res.data.project[0].priceTVA, priceTtc: res.data.project[0].priceTTC });
            }
        }).then(() => setLoading(false));
    }, []);

    return (
            <>
                <div>
                    <ProgressBar
                        title={projectDetails.title}
                        reference={projectDetails.ref}
                        step={projectDetails.step}
                        setActive={() => setActive(!active)}
                    />
                    {
                        loading
                        ?
                        <ClipLoader color={'#00798C'} loading={loading} size={20} />
                        :
                        <SidePricing step={projectDetails.step} price={priceDetails ? priceDetails : undefined } projectId={props.match.params.id} />
                    }
                    <ProductList products={projectDetails.product}
                        content={projectDetails.content} types={projectDetails.type} />
                    {projectDetails.document && projectDetails.document.length > 0 && <FilesComponent files={projectDetails.document} idProject={projectDetails.id} />}
                    {
                        projectDetails.product && projectDetails.product.map(p => {
                            if (p.name !== 'Frais de service' && p.document && p.document.length > 0)
                                return <div>
                                    <FilesComponent files={p.document} idProject={p.id} productName={p.name} />
                                </div>
                        })
                    }
                    <Footer />
                </div>
                <ModalManufacturer active={active} setActive={() => setActive(!active)}/>
            </>
    );
}

export default ProjectPage;
