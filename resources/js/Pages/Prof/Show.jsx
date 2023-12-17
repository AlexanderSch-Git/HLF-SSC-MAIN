import ProfLayout from "@/Layouts/ProfLayout";
import { router } from "@inertiajs/react";
import React from "react";

const Show = ({ prof }) => {
    //fonction pour demote comme humain
    const demote = () => {
        //prevent default
        //
        console.log("demote");
        //route prof.demote avec id = prof.idl
        router.post("/prof/demote", prof);
    };

    return (
        <ProfLayout>
            <div>
                <h1>Informations sur le Prof</h1>
                <p>Id: {prof.id}</p>
                <p>Trigramme: {prof.trigramme}</p>
                <p>Nom1: {prof.nom1}</p>
                <p>Nom2: {prof.nom2}</p>
                <p>Nom3: {prof.nom3}</p>
                <p>Prenom1: {prof.prenom1}</p>
                <p>Prenom2: {prof.prenom2}</p>
                <p>Prenom3: {prof.prenom3}</p>
                <p>Date de Naissance: {prof.date_de_naissance}</p>
                <p>Telephone: {prof.telephone}</p>
                <p>Email: {prof.email}</p>
                <button
                    className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded"
                    onClick={demote}
                >
                    Demote
                </button>
            </div>
        </ProfLayout>
    );
};

export default Show;
