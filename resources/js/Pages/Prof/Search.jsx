import React from "react";
import { router } from "@inertiajs/react";
import ProfLayout from "@/Layouts/ProfLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search({ children }) {
    const [values, setValues] = React.useState({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
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
                router.get("/prof/searchbyname", values);
                break;
            case "prenom":
                console.log("prenom");
                break;
            case "telephone":
                console.log("telephone");
                break;
            case "email":
                console.log("email");
                break;
            default:
                console.log("default");
        }
    };

    return (
        <ProfLayout>
            <h1 className="text-2xl font-bold mb-4">Chercher un prof</h1>
            <div className="flex flex-row w-full h-full space-x-4">
                <div className="flex flex-col w-1/2 space-y-4">
                    <form
                        className="flex flex-col space-y-2 text-gray-900"
                        onSubmit={handleSubmit("nom")}
                    >
                        <InputLabel value="ex: Dupont" />
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
                            <p>par nom</p>
                        </button>
                    </form>

                    <form
                        className="flex flex-col space-y-2 text-gray-900"
                        onSubmit={handleSubmit("prenom")}
                    >
                        <InputLabel value="ex: Jean" />
                        <TextInput
                            name="prenom"
                            id="prenom"
                            value={values.prenom}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center align-middle space-x-1"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <p>par prenom</p>
                        </button>
                    </form>
                </div>
                <div className="flex flex-col w-1/2 space-y-4">
                    <form
                        className="flex flex-col space-y-2 text-gray-900"
                        onSubmit={handleSubmit("telephone")}
                    >
                        <InputLabel value="ex: 0606060606" />
                        <TextInput
                            name="telephone"
                            id="telephone"
                            value={values.telephone}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center align-middle space-x-1"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <p>par telephone</p>
                        </button>
                    </form>
                    <form
                        className="flex flex-col space-y-2 text-gray-900"
                        onSubmit={handleSubmit("email")}
                    >
                        <InputLabel value="ex: jean.dupont" />
                        <TextInput
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center align-middle space-x-1"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <p>par email</p>
                        </button>
                    </form>
                </div>
            </div>
        </ProfLayout>
    );
}
