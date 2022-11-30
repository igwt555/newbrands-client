import Footer from '../../components/Footer/footer';

export const Error = () => {
    return (
        <>
            <div className="containerError">
                <h1>#Erreur404</h1>
                <p>Oops, this page can't be found !</p>
                <span>This link might be corrupted, or the page have been removed.</span>
            </div>
            <Footer footer="full" />
        </>
    )
}