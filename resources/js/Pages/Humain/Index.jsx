import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import HumainLayout from "@/Layouts/HumainLayout";
import { Link } from "@inertiajs/react";

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
        <HumainLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">Liste des humains</h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="w-40 border">Nom</th>
                            <th className="border">Prenom</th>
                            <th className="border0">Naissance</th>
                            <th className="border">Telephone</th>
                            <th className="border">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Nhumains.map((humain) => (
                            <tr key={humain.id}>
                                <td className="border hover:text-purple-300">
                                    <Link href={"/humain/" + humain.id}>
                                        {humain.noms}
                                    </Link>
                                </td>
                                <td className="border hover:text-purple-300">
                                    <Link href={"/humain/" + humain.id}>
                                        {humain.prenoms}
                                    </Link>
                                </td>
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
        </HumainLayout>
    );
};

export default Index;
