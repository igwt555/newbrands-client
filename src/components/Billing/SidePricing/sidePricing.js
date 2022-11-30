import './sidepricing.scss'

function SidePricing(props) {
    //console.log(props)
    return (
        <div className="containerSidePricing">
            <h4>Proposition</h4>
            <div className="grid">
                <div className="firstCol">
                    <span>Total H.T</span>
                    <div className="totals">
                        <span>TVA (20%) </span>
                        <span>Total TTC</span>
                    </div>
                </div>
                <div className="secondCol">
                    <span>{props.data.priceHt ?? '0.00'}€</span>
                    <div className="totals">
                        <span>{props.data.tva ?? '0.00'}€</span>
                        <span>{(props.data.priceTtc || props.data.priceTTC) ? props.data.priceTtc || props.data.priceTTC : '0.00'}€</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePricing;