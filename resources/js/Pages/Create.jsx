import AuthenticatedLayout from "@/Components/Layouts/AuthenticatedLayout";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import React from "react";

export default function Create({ auth }) {
    const [activeForm, setActiveForm] = useState("human");

    return (
        <AuthenticatedLayout>
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
