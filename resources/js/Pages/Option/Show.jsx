import React from "react";
import OptionLayout from "@/Layouts/OptionLayout";

const Show = ({ option }) => {
    console.log("option");
    return (
        <OptionLayout>
            <div>
                <h1>Informations sur l'option</h1>
                <p>Id: {option.id}</p>
                <p>Nom: {option.nom}</p>
                <p>Type: {option.type}</p>
            </div>
        </OptionLayout>
    );
};

export default Show;
