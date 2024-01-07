import React from "react";
import SeanceLayout from "@/Layouts/SeanceLayout";
import { Link } from "@inertiajs/react";

const Index = ({ cours, seances }) => {
    //state pour stocker le cours selectionné
    const [selectedCours, setSelectedCours] = React.useState(null);

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
                        <h1 className="text-2xl font-bold">
                            {selectedCours && selectedCours.nom
                                ? selectedCours.nom
                                : "Aucun cours selectionné"}
                        </h1>
                        <p>
                            {selectedCours && selectedCours.ue
                                ? selectedCours.ue
                                : "UE: n/a"}
                        </p>
                        <p>
                            {selectedCours &&
                            selectedCours.prof &&
                            selectedCours.pid ? (
                                // ici insérer un bouton qui permet de naviguer vers la page du prof
                                <button>
                                    // va vers prof avec id du prof
                                    <Link href={"/prof/" + selectedCours.pid}>
                                        {selectedCours.prof}
                                    </Link>
                                </button>
                            ) : (
                                "Prof: n/a"
                            )}
                        </p>
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col w-1/4 border-2">
                            <h1 className="text-2xl font-bold">
                                Liste des cours
                            </h1>
                        </div>
                        <div className="flex flex-col w-3/4 border-2">
                            <h1 className="text-2xl font-bold">
                                Séances disponibles
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </SeanceLayout>
    );
};

export default Index;
