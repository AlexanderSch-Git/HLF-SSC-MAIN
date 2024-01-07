import CoursLayout from "@/Layouts/CoursLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const SearchResult = ({ cours }) => {
    console.log(cours);
    return (
        <CoursLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">Résultat de la recherche</h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="w-40 border">Nom</th>
                            <th className="border">Ue</th>
                            <th className="border">Professeur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cours.map((cour) => (
                            <tr key={cour.id}>
                                <td className="border">
                                    <Link href={"/cour/" + cour.id}>
                                        {cour.nom}
                                    </Link>
                                </td>
                                <td className="border">{cour.ue}</td>
                                <td className="border">{cour.prof}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CoursLayout>
    );
};

export default SearchResult;
