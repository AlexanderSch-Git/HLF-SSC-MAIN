import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ humains }) => {
    // parcours la liste des humains et les stockes dans une variable en ayant transformer la date en format string fr and concat les noms et prenoms si ils sont pas vide grace une ternaire
    const Nhumains = humains.map((humain) => {
        return {
            ...humain,
            date_de_naissance: new Date(
                humain.date_de_naissance
            ).toLocaleDateString("fr-FR"),
            noms:
                humain.nom1 +
                (humain.nom2 ? " " + humain.nom2 : "") +
                (humain.nom3 ? " " + humain.nom3 : ""),
            prenoms:
                humain.prenom1 +
                (humain.prenom2 ? " " + humain.prenom2 : "") +
                (humain.prenom3 ? " " + humain.prenom3 : ""),
        };
    });

    return (
        <AuthenticatedLayout>
            <div className="bg-white p-4">
                <h1 className="">Liste des Humains</h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="w-40 border">Nom</th>
                            <th className="border">Prenom</th>
                            <th className="border">Naissance</th>
                            <th className="border">Telephone</th>
                            <th className="border">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Nhumains.map((humain) => (
                            <tr key={humain.id}>
                                <td className="border">{humain.noms}</td>
                                <td className="border">{humain.prenoms}</td>
                                <td className="border">
                                    {humain.date_de_naissance}
                                </td>
                                <td className="border">{humain.telephone}</td>
                                <td className="border">{humain.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
