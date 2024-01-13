import React from "react";
import OptionLayout from "@/Layouts/OptionLayout";

const Index = ({ options }) => {
    return (
        <OptionLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">Liste des options</h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="w-40 border">Nom</th>
                            <th className="border">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {options.map((option) => (
                            <tr key={option.id}>
                                <td className="border">{option.nom}</td>
                                <td className="border">{option.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </OptionLayout>
    );
};

export default Index;
