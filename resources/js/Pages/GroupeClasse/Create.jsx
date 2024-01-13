//page to create a new groupe classe
import GCLayout from "@/Layouts/GroupesClassesLayout";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Select from "react-select";
import { router } from "@inertiajs/react";

export default function Create({ options }) {
    const [values, setValues] = useState({
        niveau: "",
        numero: "",
        option: "",
    });

    //handle change to update the state to the new value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    //handle change for the select
    const handleOptionChange = (e) => {
        console.log(e.value);
        setValues((values) => ({
            ...values,
            option: e.value,
        }));
    };

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        //temporary data template for fillable : ['option_id', 'annee', 'numero_groupe']
        const val = {
            option_id: values.option,
            annee: values.niveau,
            numero_groupe: values.numero,
        };
        router.post("/gc", val);
    };

    //transform options to an array of options [{value: option.id,label: "option.nom"}
    const optionsArray = options.map((option) => ({
        value: option.id,
        label: option.nom,
    }));
    return (
        <GCLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Ajouter un groupe classe
                </h1>
                <form
                    className="flex flex-col space-y-2 text-gray-900"
                    onSubmit={handleSubmit}
                >
                    <InputLabel value="Numéro de groupe" />
                    <TextInput
                        name="numero"
                        id="numero"
                        value={values.numero}
                        onChange={handleChange}
                    />
                    <InputLabel value="Niveau" />
                    <TextInput
                        name="niveau"
                        id="niveau"
                        value={values.niveau}
                        onChange={handleChange}
                    />
                    <InputLabel value="Option" />
                    <Select
                        name="option"
                        id="option"
                        options={optionsArray}
                        onChange={handleOptionChange}
                    ></Select>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </GCLayout>
    );
}
