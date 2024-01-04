import React from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";
import CoursLayout from "@/Layouts/CoursLayout";

export default function Search({ children }) {
    const [values, setValues] = React.useState({
        nom: "",
        ue: "",
        prof: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    //handle submit with 1 argument to choose which field to search
    const handleSubmit = (field) => (e) => {
        e.preventDefault();
        console.log(values);
        switch (field) {
            case "nom":
                console.log("nom");
                break;
            case "ue":
                console.log("prenom");
                break;
            case "prof":
                console.log("telephone");
                break;
            default:
                throw new Error("You shounldn't be here");
        }
    };

    return (
        <CoursLayout>
            <h1 className="text-2xl font-bold mb-4">Chercher un cours</h1>
            <div className="flex flex-row w-full h-full space-x-4">
                <div className="flex flex-row space-x-4 w-full">
                    <form
                        className="flex flex-col space-y-2 text-gray-900 w-1/3"
                        onSubmit={handleSubmit("nom")}
                    >
                        <InputLabel value="ex: Math" />
                        <TextInput
                            name="nom"
                            id="nom"
                            value={values.nom}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center align-middle space-x-1"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <p>par nom de cours</p>
                        </button>
                    </form>
                    <form
                        className="flex flex-col space-y-2 text-gray-900 w-1/3"
                        onSubmit={handleSubmit("prenom")}
                    >
                        <InputLabel value="ex: UE123.4" />
                        <TextInput
                            name="ue"
                            id="ue"
                            value={values.ue}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center align-middle space-x-1"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <p>par ue</p>
                        </button>
                    </form>
                    <form
                        className="flex flex-col space-y-2 text-gray-900 w-1/3"
                        onSubmit={handleSubmit("prof")}
                    >
                        <InputLabel value="ex: Dupont Marc" />
                        <TextInput
                            name="prof"
                            id="prof"
                            value={values.prof}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center align-middle space-x-1"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <p>par professeur</p>
                        </button>
                    </form>
                </div>
                
            </div>
        </CoursLayout>
    );
}
