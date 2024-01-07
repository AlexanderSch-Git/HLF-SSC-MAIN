import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SeanceLayout from "@/Layouts/SeanceLayout";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import Select from "react-select";

export default function Create({ Cours, Profs }) {
    /*
    Les données a récupérer sont :
    - Prof
    - Cour
    - DateDeDebut
    - HeureDeDebut
    - HeureDeFin
    - Mode {Presentiel, Comodal, Distanciel}
    - GroupeClass
    - Lieu
    - Visio
    - Periodicite ou :
        - 0 : Pas de periodicité donc une seule séance
        - 1 : custom :
            - Date de fin
            - Nombre de répétition
            - Répétition : entier
            - Unité : {Jour, Semaine}
            - Jours : {Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche}


    Règles de validation :
    - Prof : Obligatoire
    - Cour : Obligatoire
    - DateDeDebut : Obligatoire
    - HeureDeDebut : Obligatoire
    - HeureDeFin : Obligatoire
    - Mode : Obligatoire
    - GroupeClass : Obligatoire

    Si Mode = Presentiel ou Comodal : Lieu obligatoire
    Si Mode = Distanciel ou Comodal : Visio possible (on ne sait pas forcément la plateforme 6 mois à l'avance)
    Si Mode = Distanciel : Lieu impossible
    Si Mode = Presentiel : Visio impossible

    Si Periodicite = 0 : créer une seule séance
    Si Periodicite = 1 : créer plusieurs séances
    Si Periodicite = 1 :
        - Date de fin  ou Nombre de répétition obligatoire
        - Répétition : entier obligatoire
        - Unité : {Jour, Semaine} obligatoire
        - Jours : {Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche} obligatoire 1..n

    Jour de fin max 1 an après la date de début + 14 jours
        (pour les semaines avec le décalage jours/an , jours féries et anne bissextile etc)
    */
    // 1 créer un useState pour stocker les données

    const [values, setValues] = React.useState({
        prof: "",
        cour: "",
        dateDeDebut: "",
        heureDeDebut: "",
        heureDeFin: "",
        mode: "",
        groupeClass: "",
        lieu: "",
        visio: "",
        periodicite: "",
        dateDeFin: "",
        nombreDeRepetition: "",
        repetition: "",
        unite: "",
        jours: [],
    });

    const handleChangeDateDeDebut = (newValue) => {
        setValues((values) => ({
            ...values,
            dateDeDebut: newValue.toString(),
        }));
    };

    const handleChange = (e) => {
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
        // to do
    };

    // trois fonctions pour gérer les changements de valeurs des selects (prof, cour, groupeClass)
    const handleChangeProf = (e) => {
        setValues((values) => ({
            ...values,
            prof: e.value,
        }));
    };

    const handleChangeCour = (e) => {
        setValues((values) => ({
            ...values,
            cour: e.value,
        }));
    };

    const handleChangeGroupeClass = (e) => {
        setValues((values) => ({
            ...values,
            groupeClass: e.value,
        }));
    };

    // une fonction pour stocker les jours sélectionnés
    const handleChangeJours = (e) => {
        //empty temporary array
        const newJours = [];
        e.map((jour) => {
            newJours.push(jour.value);
        });
        setValues((values) => ({
            ...values,
            jours: newJours,
        }));
    };

    // fonction pour gérer le changement d'heure de début
    const handleChangeHeureDeDebut = (newValue) => {
        //récuperer la valeur de l'heure et de la minute et les stocker dans un tableau [heure, minute]
        // 1 get as string 2 split 3 get id 4 element
        const nheureDeDebut = newValue.toString().split(" ")[4].split(":");
        const newVal = [nheureDeDebut[0], nheureDeDebut[1]];
        setValues((values) => ({
            ...values,
            heureDeDebut: newVal,
        }));
    };

    // fonction pour gérer le changement d'heure de fin
    const handleChangeHeureDeFin = (newValue) => {
        //récuperer la valeur de l'heure et de la minute et les stocker dans un tableau [heure, minute]
        // 1 get as string 2 split 3 get id 4 element
        const nheureDeFin = newValue.toString().split(" ")[4].split(":");
        const newVal = [nheureDeFin[0], nheureDeFin[1]];
        setValues((values) => ({
            ...values,
            heureDeFin: newVal,
        }));
    };

    const handleChangeMode = (newValue) => {
        setValues((values) => ({
            ...values,
            mode: newValue.value,
        }));
        console.log(values);
    };

    const jours = [
        { value: "Lundi", label: "Lundi" },
        { value: "Mardi", label: "Mardi" },
        { value: "Mercredi", label: "Mercredi" },
        { value: "Jeudi", label: "Jeudi" },
        { value: "Vendredi", label: "Vendredi" },
        { value: "Samedi", label: "Samedi" },
        { value: "Dimanche", label: "Dimanche" },
    ];

    // transformer les profs en tableau de value label pour le select
    const newProfs = [];
    Profs.map((prof) => {
        newProfs.push({
            value: prof.id,
            label: prof.prenom1 + " " + prof.nom1,
        });
    });

    // transformer les cours en tableau de value label pour le select
    const newCours = [];
    Cours.map((cour) => {
        newCours.push({ value: cour.id, label: cour.nom });
    });

    //const temporary group class list
    const groupClass = [
        { value: "L1", label: "L1" },
        { value: "L2", label: "L2" },
        { value: "L3", label: "L3" },
        { value: "M1", label: "M1" },
        { value: "M2", label: "M2" },
    ];

    //use state pour afficher cacher les champs de periodicite
    const [periodicite, setPeriodicite] = React.useState(false);

    //use state pour afficher les jours si semaine est sélectionné
    const [semaineRepState, setSemaineRepState] = React.useState(false);

    //fonction pour acceuillier le changement de la valeur de la répétition (semaine ou jour)
    const handleChangeRep = (e) => {
        if (e.value == "Semaine") {
            setSemaineRepState(true);
            //set les Unités à Semaine
            setValues((values) => ({
                ...values,
                unite: "Semaine",
            }));
        } else {
            setSemaineRepState(false);
        }
    };

    return (
        <SeanceLayout>
            <div className="w-fullflex flex-col space-y-4">
                <h1 className="text-2xl font-bold">Créer une séance</h1>
                <form
                    className="flex flex-col space-y-2 text-gray-900 w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="flex flex w-full space-x-4">
                            <div className="w-1/2 flex flex-col space-y-2">
                                <InputLabel value="Professeur" />
                                <Select
                                    name="prof"
                                    id="prof"
                                    options={newProfs}
                                    onChange={handleChangeProf}
                                />
                            </div>
                            <div className="w-1/2 flex flex-col space-y-2">
                                <InputLabel value="Cours" />
                                <Select
                                    name="cour"
                                    id="cour"
                                    options={newCours}
                                    onChange={handleChangeCour}
                                />
                            </div>
                        </div>
                        <div className="flex flex w-full space-x-4">
                            <div className="w-1/2 flex flex-col space-y-2">
                                <InputLabel value="Date de début" />
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        value={values.dateDeDebut}
                                        onChange={handleChangeDateDeDebut}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="w-1/2 flex space-x-2">
                                <div className="w-1/2 flex flex-col space-y-2">
                                    <InputLabel value="Heure de début" />
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <TimePicker
                                            value={values.heureDeDebut}
                                            onChange={handleChangeHeureDeDebut}
                                            ampm={false}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="w-1/2 flex flex-col space-y-2">
                                    <InputLabel value="Heure de fin" />
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <TimePicker
                                            value={values.heureDeFin}
                                            onChange={handleChangeHeureDeFin}
                                            ampm={false}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex w-full space-x-4">
                            <div className="w-1/2 flex flex-col space-y-2">
                                <InputLabel value="Mode" />
                                <Select
                                    name="mode"
                                    id="mode"
                                    options={[
                                        {
                                            value: "Presentiel",
                                            label: "Présentiel",
                                        },
                                        { value: "Comodal", label: "Comodal" },
                                        {
                                            value: "Distanciel",
                                            label: "Distanciel",
                                        },
                                    ]}
                                    onChange={handleChangeMode}
                                />
                            </div>
                            <div className="w-1/2 flex flex-col space-y-2">
                                <InputLabel value="Groupe" />
                                <Select
                                    name="groupeClass"
                                    id="groupeClass"
                                    options={groupClass}
                                    onChange={handleChangeGroupeClass}
                                />
                            </div>
                        </div>
                        <div className="flex flex w-full space-x-4">
                            <div className="w-1/2 flex flex-col space-y-2">
                                <InputLabel value="Lieu" />
                                <TextInput
                                    placeholder="Lieu"
                                    value={values.lieu}
                                    onChange={(e) =>
                                        setValues((values) => ({
                                            ...values,
                                            lieu: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="w-1/2 flex flex-col space-y-2">
                                <InputLabel value="Visio" />
                                <TextInput
                                    placeholder="Visio"
                                    value={values.visio}
                                    onChange={(e) =>
                                        setValues((values) => ({
                                            ...values,
                                            visio: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        {periodicite ? (
                            <>
                                <div className="flex flex w-full space-x-4">
                                    <div className="w-1/2 flex flex-col space-y-2">
                                        <InputLabel value="Date de fin" />
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DatePicker
                                                value={values.dateDeFin}
                                                onChange={(newValue) => {
                                                    setValues((values) => ({
                                                        ...values,
                                                        dateDeFin:
                                                            newValue.toString(),
                                                    }));
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="w-1/2 flex flex-col space-y-2">
                                        <InputLabel value="Nombre de répétition" />
                                        <TextInput
                                            placeholder="Nombre de répétition"
                                            value={values.nombreDeRepetition}
                                            onChange={(e) =>
                                                setValues((values) => ({
                                                    ...values,
                                                    nombreDeRepetition:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex flex w-full space-x-4">
                                    <div className="w-1/2 flex flex-col space-y-2">
                                        <InputLabel value="Répétition" />
                                        <Select
                                            name="repetition"
                                            id="repetition"
                                            defaultValue={{
                                                value: "Jour",
                                                label: "Jour",
                                            }}
                                            options={[
                                                {
                                                    value: "Jour",
                                                    label: "Jour",
                                                },
                                                {
                                                    value: "Semaine",
                                                    label: "Semaine",
                                                },
                                            ]}
                                            onChange={handleChangeRep}
                                        />
                                    </div>
                                    {semaineRepState ? (
                                        <>
                                            <div className="w-1/2 flex flex-col space-y-2">
                                                <InputLabel value="Jours" />
                                                <Select
                                                    name="jours"
                                                    id="jours"
                                                    options={jours}
                                                    isMulti
                                                    onChange={(e) =>
                                                        handleChangeJours(e)
                                                    }
                                                />
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </>
                        ) : null}
                        <div className="flex flex w-full space-x-4">
                            <div className="w-1/2 flex flex-col space-y-2 ">
                                <InputLabel value="Périodicité" />
                                <Select
                                    name="periodicite"
                                    id="periodicite"
                                    options={[
                                        {
                                            value: 0,
                                            label: "Non",
                                        },
                                        {
                                            value: 1,
                                            label: "Oui",
                                        },
                                    ]}
                                    onChange={(e) => {
                                        if (e.value == "1") {
                                            setValues((values) => ({
                                                ...values,
                                                periodicite: e.value,
                                            }));
                                            setPeriodicite(true);
                                        } else {
                                            setValues((values) => ({
                                                ...values,
                                                periodicite: e.value,
                                            }));
                                            setPeriodicite(false);
                                        }
                                    }}
                                />
                            </div>
                            <div className="w-1/2 flex flex-col space-y-2 ">
                                <button
                                    type="submit"
                                    className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded"
                                >
                                    Valider la création
                                </button>
                            </div>
                        </div>

                        <div className="flex flex w-full space-x-4">
                            <p>
                                {periodicite
                                    ? "La séance sera répétée" +
                                      " " +
                                      values.nombreDeRepetition +
                                      " " +
                                      values.unite +
                                      " " +
                                      "à partir du" +
                                      " " +
                                      values.dateDeDebut +
                                      " " +
                                      "jusqu'au" +
                                      " " +
                                      values.dateDeFin +
                                      " " +
                                      "les" +
                                      " " +
                                      values.jours
                                    : "La séance sera unique le" +
                                      " " +
                                      values.dateDeDebut +
                                      " " +
                                      "de" +
                                      " " +
                                      values.heureDeDebut +
                                      " " +
                                      "à" +
                                      " " +
                                      values.heureDeFin}
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </SeanceLayout>
    );
}
