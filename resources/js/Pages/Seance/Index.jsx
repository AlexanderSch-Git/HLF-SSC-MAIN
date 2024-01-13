import React from "react";
import SeanceLayout from "@/Layouts/SeanceLayout";
import { Link } from "@inertiajs/react";

const Index = ({ Seances, Cours }) => {
    //state pour stocker le cours selectionné
    const [selectedCours, setSelectedCours] = React.useState(null);
    console.log("selectedCours", selectedCours);

    // create a dictionary of seances by cours_id
    const seancesByCours = {};
    Cours.forEach((cours) => {
        seancesByCours[cours.id] = [];
    });
    Seances.forEach((seance) => {
        seancesByCours[seance.cours_id].push(seance);
    });
    console.log("seancesByCours", seancesByCours);

    function convToLocal(date) {
        console.log("date", date);
    }
    return (
        <SeanceLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">Liste des seances</h1>
                /* Todo : Créer une liste infinie des Cours a gauche Créer une
                liste infinie des Seances a droite en fonction du cours
                selectionné Créer une entete qui affiche les infos du cours
                selectionné */
                <div className="flex flex-col">
                    <div>
                        {selectedCours ? (
                            <>
                                <h1 className="text-2xl font-bold">
                                    {selectedCours.nom_user}
                                </h1>
                                <p>UE: {selectedCours.nom_ue}</p>
                                <button className="bg-blue-500 text-white p-2 rounded-md">
                                    <Link
                                        href={`/prof/${selectedCours.prof_id}`}
                                    >
                                        {selectedCours.prof_id}
                                    </Link>
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold">
                                    Aucun cours selectionné
                                </h1>
                            </>
                        )}
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col w-1/4 border-2">
                            <h1 className="text-2xl font-bold">
                                Liste des cours
                            </h1>
                            <ul>
                                {Cours.map((cours) => (
                                    <li key={cours.id}>
                                        <button
                                            onClick={() =>
                                                setSelectedCours(cours)
                                            }
                                        >
                                            {cours.nom_user}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col w-3/4 border-2">
                            <h1 className="text-2xl font-bold">
                                Liste des seances
                            </h1>
                            {selectedCours ? (
                                <>
                                    <ul>
                                        {seancesByCours[selectedCours.id].map(
                                            (seance) => (
                                                <li key={seance.id}>
                                                    <Link
                                                        href={`/seance/${seance.id}`}
                                                    >
                                                        {seance.date +
                                                            " " +
                                                            seance.heure_debut +
                                                            " " +
                                                            seance.heure_fin}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </SeanceLayout>
    );
};

export default Index;
