import React, { useEffect } from 'react';
import './productslist.scss'

const ProductsList = (props) => {

    const steps = {
        "0": "waiting",
        "1": "current",
        "2": "late",
        "3": "stopped",
        "4": "finished"
    }

    const stepsName = {
        "0": "En attente",
        "1": "En cours",
        "2": "En retard",
        "3": "Arrêté",
        "4": "Terminé"
    }

    const getTypes = (types) => {
        const typesNames = [];

        types && types.map((t) => typesNames.push(t.name));
        return typesNames;
    }

    return (
        <div className="containerProductList">
            <h2>{getTypes(props.types).join(', ')} de {props.products !== undefined ? props.products.length - 1 : '---'} produit{props.products && props.products.length - 1 > 1 ? 's' : ''}</h2>
            <p>{props.content !== undefined ? props.content : ''}</p>
            <h2>Les produits</h2>
            <div className="tableContainer">
                <table className="productTable">
                    <thead>
                        <tr>
                            <th title="index">#</th>
                            <th title="produit">Produit</th>
                            <th title="catégorie">Catégorie</th>
                            <th title="quantité">Quantité</th>
                            <th title="size">Taille</th>
                            <th title="étape">Étape</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.products !== undefined && props.products.map((item, index) => {
                                if (item.name !== 'Frais de service')
                                    return <tr className="product" key={index}>
                                        <td title={index} className="indexProduct">#{index}</td>
                                        <td title={item.name} className="productName">{item.name}</td>
                                        <td title={"TEEEST"} className="productType">{item.category && item.category[0].name}</td>
                                        <td title={item.quantity} className="productQuantity">{item.quantity}</td>
                                        <td title={item.size} className="productSize">{item.size}</td>
                                        <td title={"TEEEST"} className="productStep"><div className={`${"status"} ${[steps[item.step]]}`}></div>{ stepsName[item.step] }</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductsList