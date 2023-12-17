import React from "react";
import HumainLayout from "@/Layouts/HumainLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Select from "react-select";
import { router } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
export default function Create({ auth }) {
    // variable pour stocker la date de naissance de l'humain
    const [birthDate, setBirthDate] = useState(null);

    //get la date d'aujourd'hui pour label de date picker sour format DD/MM/YYYY type string
    const today = new Date().toLocaleDateString("fr-FR");
    // Supposons que vous ayez un état pour gérer les erreurs et les données
    const errors = {};
    const data = {}; // Fonction pour charger et formater les codes téléphoniques depuis le fichier JSON

    // etat et variable pour stocker les codes téléphoniques
    // les codes sont lisibles depuis le fichier JSON ./phone-codes.json sous format : { "FR": 33, "BE": 32, ... }
    const [phoneCodes, setPhoneCodes] = useState({});
    const [phoneCode, setPhoneCode] = useState(""); // code téléphonique sélectionné
    const [isPhoneCodesLoaded, setIsPhoneCodesLoaded] = useState(false);
    // Fonction pour charger et formater les codes téléphoniques depuis le fichier JSON
    const loadPhoneCodes = () => {
        // charger le json dans une variable grace a fetch
        fetch("/phone-codes.json")
            // convertir le json en objet
            .then((res) => res.json())
            // stocker les codes téléphoniques dans une variable
            .then((data) => {
                setPhoneCodes(data);
                setIsPhoneCodesLoaded(true);
            })
            // afficher une erreur si le chargement échoue
            .catch((err) => {
                console.log(err);
            });
    };

    //charge les codes téléphoniques au chargement de la page
    React.useEffect(() => {
        loadPhoneCodes();
    }, []);

    // fonction pour gérer le changement de date de naissance
    const handleDateChange = (newValue) => {
        setBirthDate(newValue);
    };

    // fonction pour gérer le changement de code pays
    const handleCountryCodeChange = (e) => {
        //set phone code and then wait to console log
        setPhoneCode(e.value);
    };

    const [formData, setFormData] = useState({
        p1: "",
        p2: "",
        p3: "",
        n1: "",
        n2: "",
        n3: "",
        date: null,
        code: "32",
        tel: "",
    });
    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire (rechargement de la page)
        console.log("enters handleSubmit");
        // stocker les erreurs
        const errors = {};
        // retire les noms et prénoms vides et vérifie leurs regex
        try {
            //créer deux array tableP et tableN avec les prénoms et noms de formData
            const $tableP = [formData.p1, formData.p2, formData.p3];
            const $tableN = [formData.n1, formData.n2, formData.n3];

            //map sur les tableaux pour vérifier si les prénoms et noms sont renseignés$
            $tableP.map((p, i) => {
                if (p == "") {
                    //si le prénom est vide on le supprime
                    $tableP.splice(i, 1);
                } else if (!p.match(/^[A-Za-zÀ-ÿ'-]{1,16}$/)) {
                    // throw new Error("Prénom invalide");
                    throw new Error("Prénom invalide :" + p);
                }
            });
            $tableN.map((n, i) => {
                if (n == "") {
                    //si le nom est vide on le supprime
                    $tableN.splice(i, 1);
                } else if (!n.match(/^[A-Za-zÀ-ÿ'-]{1,16}$/)) {
                    // throw new Error("Nom invalide");
                    throw new Error("Nom invalide :" + n);
                }
            });
            //vérifie si tableP ou tableN sont vide
            if (($tableP.length == 0) | ($tableN[0] == "")) {
                throw new Error("Prénom manquant");
            }
            if (($tableN.length == 0) | ($tableN[0] == "")) {
                throw new Error("Nom manquant");
            }
            //parcours les tableaux pour mettre a jour les prénoms et noms dans formData
            formData.p1 = "";
            formData.p2 = "";
            formData.p3 = "";
            formData.n1 = "";
            formData.n2 = "";
            formData.n3 = "";
            $tableP.map((p, i) => {
                if (i == 0) {
                    formData.p1 = p;
                } else if (i == 1) {
                    formData.p2 = p;
                } else if (i == 2) {
                    formData.p3 = p;
                }
            });
            $tableN.map((n, i) => {
                if (i == 0) {
                    formData.n1 = n;
                } else if (i == 1) {
                    formData.n2 = n;
                } else if (i == 2) {
                    formData.n3 = n;
                }
            });

            if (!birthDate) {
                throw new Error("Date de naissance manquante");
            }
            formData.date = birthDate;
            if (phoneCode) {
                formData.code = phoneCode;
            }
            if (!formData.tel) {
                throw new Error("Numéro de téléphone manquant");
            }
            if (!formData.tel.match(/^[0-9]{9}$/)) {
                throw new Error("Numéro de téléphone invalide");
            }

            let tel = formData.tel;
            // store tel in tel xxx xxx xxx with space every 3 numbers
            tel = tel.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");

            const date = new Date(birthDate);
            const humainData = {
                prenom1: formData.p1,
                prenom2: formData.p2,
                prenom3: formData.p3,
                nom1: formData.n1,
                nom2: formData.n2,
                nom3: formData.n3,
                date_de_naissance: date,
                telephone: "+(" + formData.code + ") " + tel,
            };
            router.post("/humain", humainData);
        } catch (error) {
            console.log(error);
            //affiche l'erreur a l'utilisateur
            alert(error);
        }
    };
    return (
        <HumainLayout>
            {/* Formulaire pour créer un humain */}
            <form
                className="flex flex-col space-y-4 text-gray-900"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold">Créer un humain</h1>
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col space-y-2">
                        <InputLabel value="Prénom 1" />
                        <TextInput
                            placeholder="Prénom 1"
                            value={formData.p1}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    p1: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.firstName1} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <InputLabel value="Prénom 2" />
                        <TextInput
                            placeholder="Prénom 2"
                            value={formData.p2}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    p2: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.firstName2} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <InputLabel value="Prénom 3" />
                        <TextInput
                            placeholder="Prénom 3"
                            value={formData.p3}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    p3: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.firstName3} />
                    </div>
                </div>

                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col space-y-2">
                        <InputLabel value="Nom 1" />
                        <TextInput
                            placeholder="Nom 1"
                            value={formData.n1}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    n1: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.lastName1} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <InputLabel value="Nom 2" />
                        <TextInput
                            placeholder="Nom 2"
                            value={formData.n2}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    n2: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.lastName2} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <InputLabel value="Nom 3" />
                        <TextInput
                            placeholder="Nom 3"
                            value={formData.n3}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    n3: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.lastName3} />
                    </div>
                </div>
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col space-y-2">
                        <InputLabel value="Date de naissance" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={birthDate}
                                onChange={handleDateChange}
                                renderInput={(props) => (
                                    <TextInput
                                        {...props}
                                        placeholder="Date de naissance"
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div>
                            <InputLabel value="Code pays" />
                            {isPhoneCodesLoaded && (
                                <Select
                                    className="w-18"
                                    //defaultValue={phoneCodes for Belgium}
                                    defaultValue={{
                                        value: phoneCodes["BE"],
                                        label: "BE",
                                    }}
                                    options={Object.keys(phoneCodes).map(
                                        (key) => ({
                                            value: phoneCodes[key],
                                            label: key,
                                        })
                                    )}
                                    onChange={(e) => handleCountryCodeChange(e)}
                                />
                            )}
                        </div>
                        <div>
                            <InputLabel value="Numéro de téléphone" />
                            <TextInput
                                placeholder="Numéro de téléphone"
                                value={formData.tel}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tel: e.target.value,
                                    })
                                }
                            />
                            <InputError message={errors.phoneNumber} />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </HumainLayout>
    );
}
