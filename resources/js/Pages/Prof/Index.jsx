import React from "react";
import ProfLayout from "@/Layouts/ProfLayout";
const Index = ({ profs }) => {
    const NProf = profs.map((prof) => {
        return {
            ...prof,
            date_de_naissance: new Date(
                prof.date_de_naissance
            ).toLocaleDateString("fr-FR"),
            noms:
                prof.nom1 +
                (prof.nom2 ? " " + prof.nom2 : "") +
                (prof.nom3 ? " " + prof.nom3 : ""),
            prenoms:
                prof.prenom1 +
                (prof.prenom2 ? " " + prof.prenom2 : "") +
                (prof.prenom3 ? " " + prof.prenom3 : ""),
        };
    });

    return (
        <ProfLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">Liste des profs</h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="w-40 border">Trigramme</th>
                            <th className="w-40 border">Nom</th>
                            <th className="border">Prenom</th>
                            <th className="border0">Naissance</th>
                            <th className="border">Telephone</th>
                            <th className="border">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NProf.map((prof) => (
                            <tr key={prof.id}>
                                <td className="border">{prof.trigramme}</td>
                                <td className="border">{prof.noms}</td>
                                <td className="border">{prof.prenoms}</td>
                                <td className="border">
                                    {prof.date_de_naissance}
                                </td>
                                <td className="border">{prof.telephone}</td>
                                <td className="border">{prof.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ProfLayout>
    );
};

export default Index;
