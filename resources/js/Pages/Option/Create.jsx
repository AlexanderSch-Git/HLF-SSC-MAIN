import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import OptionLayout from "@/Layouts/OptionLayout";
import { router } from "@inertiajs/react";
import React from "react";
export default function Create() {
    const [values, setValues] = React.useState({
        nom: "",
        type: "",
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/option", values);
    };

    return (
        <OptionLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold mb-4">Ajouter un cours</h1>
                <form
                    className="flex flex-col space-y-2 text-gray-900"
                    onSubmit={handleSubmit}
                >
                    <InputLabel value="Nom de l'option" />
                    <TextInput
                        name="nom"
                        id="nom"
                        value={values.nom}
                        onChange={handleChange}
                    />
                    <InputLabel value="Type" />
                    <TextInput
                        name="type"
                        id="type"
                        value={values.type}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </OptionLayout>
    );
}
