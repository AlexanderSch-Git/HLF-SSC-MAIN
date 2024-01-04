import React from "react";
import CoursLayout from "@/Layouts/CoursLayout";
import Select from "react-select";
import { router } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function Create({ profs}) {
    const [values, setValues] = React.useState({
        nom: "",
        ue: "",
        prof: "",
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
        console.log(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        router.post("/cour", values);
    };

    const handleChangeProf = (e) => {
        console.log(e.value);
        setValues((values) => ({
            ...values,
            prof: e.value,
        }));
    };

    const [errors, setErrors] = useState({});

    console.log(profs);
       
    return (
        <CoursLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold mb-4">Ajouter un cours</h1>
                <form
                    className="flex flex-col space-y-2 text-gray-900"
                    onSubmit={handleSubmit}
                >
                    <InputLabel value="Nom du cours" />
                    <TextInput
                        name="nom"
                        id="nom"
                        value={values.nom}
                        onChange={handleChange}
                    />
                    <InputError error={errors.nom} />
                    <InputLabel value="UE" />
                    <TextInput
                        name="ue"
                        id="ue"
                        value={values.ue}
                        onChange={handleChange}
                    />
                    <InputError error={errors.ue} />
                    <InputLabel value="Professeur" />
                    <Select
                        name="prof"
                        id="prof"
                        options={profs}
                        onChange={(e) => {handleChangeProf(e)}}
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </CoursLayout>
    );
}