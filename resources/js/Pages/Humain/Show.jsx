import React from "react";

const Show = ({ humain }) => {
    return (
        <div>
            <h1>Informations sur l'Humain</h1>
            <p>Nom1: {humain.nom1}</p>
            <p>Nom2: {humain.nom2}</p>
            <p>Prenom1: {humain.prenom1}</p>
            <p>Prenom2: {humain.prenom2}</p>
            <p>Date de Naissance: {humain.date_de_naissance}</p>
            <p>Telephone: {humain.telephone}</p>
            <p>Email: {humain.email}</p>
            {/* Ajoutez d'autres champs si nécessaire */}
        </div>
    );
};

export default Show;
