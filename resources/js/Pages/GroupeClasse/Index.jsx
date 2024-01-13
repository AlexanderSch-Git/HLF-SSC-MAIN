import GCLayout from "@/Layouts/GroupesClassesLayout";
import React from "react";

const Index = ({ gcs }) => {
    console.log(gcs);
    return (
        <GCLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">
                    Liste des groupes classes
                </h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="w-40 border">Option</th>
                            <th className="border">Annee</th>
                            <th className="border">Numéro de groupe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gcs.map((gc) => (
                            <tr key={gc.id}>
                                <td className="border">{gc.nom_option}</td>
                                <td className="border">{gc.annee}</td>
                                <td className="border">{gc.numero_groupe}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GCLayout>
    );
};

export default Index;
