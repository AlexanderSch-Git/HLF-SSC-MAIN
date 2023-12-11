import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
    const [activeForm, setActiveForm] = useState("human");
    // Supposons que vous ayez un état pour gérer les erreurs et les données
    const errors = {};
    const data = {};

    return (
        <AuthenticatedLayout>
            <div className="flex flex-row space-x-4 mb-4 w-full justify-end">
                <button
                    className=" border-1 rounded-xl p-2 w-20"
                    style={{
                        backgroundColor:
                            activeForm === "human" ? "#E6596E" : "#FFFFFF",
                        color: activeForm === "human" ? "#FFFFFF" : "#000",
                    }}
                    onClick={() => setActiveForm("human")}
                >
                    Humain
                </button>
                <button
                    className=" border-1 rounded-xl p-2 w-20"
                    style={{
                        backgroundColor:
                            activeForm === "prof" ? "#E6596E" : "#FFFFFF",
                        color: activeForm === "prof" ? "#FFFFFF" : "#000",
                    }}
                    onClick={() => setActiveForm("prof")}
                >
                    Prof
                </button>
                <button
                    className=" border-1 rounded-xl p-2 w-20"
                    style={{
                        backgroundColor:
                            activeForm === "course" ? "#E6596E" : "#FFFFFF",
                        color: activeForm === "course" ? "#FFFFFF" : "#000",
                    }}
                    onClick={() => setActiveForm("course")}
                >
                    Cours
                </button>
                <button
                    className=" border-1 rounded-xl p-2 w-20"
                    style={{
                        backgroundColor:
                            activeForm === "session" ? "#E6596E" : "#FFFFFF",
                        color: activeForm === "session" ? "#FFFFFF" : "#000",
                    }}
                    onClick={() => setActiveForm("session")}
                >
                    Séance
                </button>
            </div>

            {activeForm === "human" && (
                <div className="bg-white p-4">
                    {/* Formulaire pour créer un humain */}
                    <form className="flex flex-col space-y-4 text-gray-900">
                        <h1 className="text-2xl font-bold">Créer un humain</h1>
                        <div className="flex flec-row space-x-4">
                            <div>
                                <InputLabel value="Prénom 1" />
                                <TextInput placeholder="Prénom 1" />
                                <InputError message={errors.firstName1} />
                            </div>
                            <div>
                                <InputLabel value="Prénom 2" />
                                <TextInput placeholder="Prénom 2" />
                                <InputError message={errors.firstName2} />
                            </div>
                            <div>
                                <InputLabel value="Prénom 3" />
                                <TextInput placeholder="Prénom 3" />
                                <InputError message={errors.firstName3} />
                            </div>
                        </div>

                        <div className="flex flec-row space-x-4">
                            <div>
                                <InputLabel value="Nom 1" />
                                <TextInput placeholder="Nom 1" />
                                <InputError message={errors.lastName1} />
                            </div>
                            <div>
                                <InputLabel value="Nom 2" />
                                <TextInput placeholder="Nom 2" />
                                <InputError message={errors.lastName2} />
                            </div>
                        </div>
                        {/* Ajoutez ici le sélecteur de date et de pays */}
                    </form>
                </div>
            )}

            {activeForm === "prof" && (
                <div className="bg-white p-4">
                    <h1 className="text-2xl font-bold">Créer un prof</h1>
                    <p>To do: Créer un prof</p>
                    // liste des humain non prof et bouton pour en faire un prof
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Prénom</th>
                                <th className="px-4 py-2">Promote</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Doe</td>
                                <td className="border px-4 py-2">John</td>
                                <td className="border px-4 py-2">
                                    <button>+</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {activeForm === "course" && (
                <div className="bg-white p-4">
                    <h1 className="text-2xl font-bold">Créer un cours</h1>
                    <form className="flex flex-col space-y-4">
                        <InputLabel value="Nom usuel" />
                        <TextInput placeholder="Nom usuel" />
                        <InputError message={errors.courseName} />

                        <InputLabel value="Num UE" />
                        <TextInput placeholder="Num UE" />
                        <InputError message={errors.courseNumber} />

                        {/* Liste déroulante pour sélectionner un prof */}
                    </form>
                </div>
            )}

            {activeForm === "session" && (
                <div className="bg-white p-4">
                    <h1 className="text-2xl font-bold">
                        Créer une session de cours
                    </h1>
                    <form className="flex flex-col space-y-4">
                        <p>
                            // TO DO : Ajouter les sélecteurs pour les cours et
                            les profs
                        </p>
                        <div>
                            <InputLabel value="Mode" />
                            <div className=" flex flex-row space-x-4 align-middle items-center text-center">
                                <div className="flex flex-row space-x-2 align-middle items-center text-center">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="Présentiel"
                                    />{" "}
                                    <p>Présentiel</p>
                                </div>
                                <div className="flex flex-row space-x-2 align-middle items-center text-center">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="Comodal"
                                    />{" "}
                                    <p>Comodal</p>
                                </div>
                                <div className="flex flex-row space-x-2 align-middle items-center text-center">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="Distanciel"
                                    />{" "}
                                    <p>Distanciel</p>
                                </div>
                            </div>
                            <InputError message={errors.mode} />
                        </div>
                        <div>
                            <InputLabel value="Local" />
                            <TextInput placeholder="Local" />
                            <InputError message={errors.local} />
                        </div>
                        <div>
                            <InputLabel value="Visio" />
                            <TextInput placeholder="Visio" />
                            <InputError message={errors.visio} />
                        </div>
                        {/* Sélecteurs pour heure début et fin */}
                    </form>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
