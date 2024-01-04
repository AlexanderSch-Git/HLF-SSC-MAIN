import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import CoursLayout from "@/Layouts/CoursLayout";

const Index = ({ cours }) => {

    return (
        <CoursLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">Liste des cours</h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Nom</th>
                            <th className="border px-4 py-2">UE</th>
                            <th className="border px-4 py-2">Professeur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cours.map((cour) => (
                            <tr key={cour.id}>
                                <td className="border px-4 py-2">
                                    {cour.nom}
                                </td>
                                <td className="border px-4 py-2">
                                    {cour.ue}
                                </td>
                                <td className="border px-4 py-2">
                                    {cour.prof}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CoursLayout>
    );
};

export default Index;
