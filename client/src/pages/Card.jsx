import React from "react";

function Card(type){
    type=type.argument
    
    return(
    <div className="card">
        <h3 className="card_title">{type.type}</h3>
        <h4>Stats</h4>
        <ul className="simple_list">
            <li >Pourcentage de Présence:<span className="percentage">{type["pourcentage de présence"]}%</span></li>
            <li >Certitue:<span className="percentage">{type["certitude"]}%</span></li>   
            <li >Taux de Recyclage:<span className="percentage">{type["taux de recyclage"]}%</span></li>
        </ul>
        <h4>Description</h4>
        <p>{type.description}</p>
        <h4>Conseils de Recyclage</h4>
        <p>{type["conseils de recyclage"]}</p>
    </div>
    )
}

export default Card