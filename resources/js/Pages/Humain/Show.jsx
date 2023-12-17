import HumainLayout from "@/Layouts/HumainLayout";
import React from "react";
import { router } from "@inertiajs/react";

const Show = ({ humain }) => {
    //fonction pour promouvoir comme prof
    const promote = () => {
        //route humain.promote avec les valeurs
        //route vers /prof/create
        console.log("promote");
        router.post("/prof/promote", humain);
    };
    //fonction pour supprimer
    return (
        <HumainLayout>
            <div>
                <h1>Informations sur l'Humain</h1>
                <p>Nom1: {humain.nom1}</p>
                <p>Nom2: {humain.nom2}</p>
                <p>Prenom1: {humain.prenom1}</p>
                <p>Prenom2: {humain.prenom2}</p>
                <p>Date de Naissance: {humain.date_de_naissance}</p>
                <p>Telephone: {humain.telephone}</p>
                <p>Email: {humain.email}</p>
                <button
                    className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded"
                    onClick={promote}
                >
                    Promote
                </button>
            </div>
        </HumainLayout>
    );
};

export default Show;
