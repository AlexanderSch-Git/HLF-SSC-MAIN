import CoursLayout from "@/Layouts/CoursLayout";
import React from "react";
import { router } from "@inertiajs/react";

const Show = ({ cour}) => {
    return (
        <CoursLayout>
            <div>
                <h1 className="text-2xl font-bold mb-4"> Informations sur le cours</h1>
                <p>Id: {cour.cid}</p>
                <p>Nom: {cour.nom_user}</p>
                <p>UE: {cour.nom_ue}</p>
                <h1 className="text-2xl font-bold mb-4"> Information sur le prof</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.get(`/prof/${cour.pid}`)}>
                    <p>ID : {cour.pid}</p>
                </button>
                <p>Nom: {cour.nom1}</p>
                <p>Prenom: {cour.prenom1}</p>
            </div>
        </CoursLayout>
    );
};

export default Show;
