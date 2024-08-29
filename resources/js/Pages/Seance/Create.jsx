import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SeanceLayout from "@/Layouts/SeanceLayout";
import { router } from "@inertiajs/react";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import Select from "react-select";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
export default function Create({ Cours, Profs, Gcs }) {
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
        jours: [],
    });

    function isNumeric(n, type) {
        if (type == "Semaine") {
            //si c'est un entier entre 1 et 52
            return !isNaN(parseFloat(n)) && isFinite(n) && n > 0 && n < 53;
        } else if (type == "Jour") {
            //si c'est un entier entre 1 et 365
            return !isNaN(parseFloat(n)) && isFinite(n) && n > 0 && n < 366;
        }
        return false;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //vérifier les règles
        // test si les champs obligatoires sont remplis
        if (
            values.prof == "" ||
            values.cour == "" ||
            values.dateDeDebut == "" ||
            values.heureDeDebut == "" ||
            values.heureDeFin == "" ||
            values.mode == "" ||
            values.groupeClass == ""
        ) {
            alert("Veuillez remplir les champs obligatoires");
            return;
        }
        if (values.periodicite == "1") {
            if (values.dateDeFin == "") {
                alert("Veuillez remplir les champs obligatoires");
                return;
            }

            if (values.jours.length == 0 || values.jours.length > 7) {
                alert("Veuillez choisir entre 1 et 7 jours");
                return;
            }
            if (values.dateDeFin != "") {
                // convertir les dates en objet date pour pouvoir les comparer
                const dateDeDebut = new Date(values.dateDeDebut);
                const dateDeFin = new Date(values.dateDeFin);
                // date de fin doit etre max 54 semaine plus tard
                const dateMax = new Date(dateDeDebut);
                dateMax.setDate(dateMax.getDate() + 54 * 7);
                // comparer les dates
                if (dateDeFin > dateMax) {
                    alert("Votre date de fin est trop loin");
                    return;
                } else if (dateDeFin < dateDeDebut) {
                    alert("Votre date de fin est avant la date de début");
                    return;
                }
            }
            const correctedDateDeFin = new Date(
                values.dateDeFin
            ).toLocaleString("fr-FR", {
                timeZone: "Europe/Paris",
            });
            setValues((values) => ({
                ...values,
                dateDeFin: correctedDateDeFin,
            }));
        }
        //post les données
        //transformer dateDeDebut en timezone paris
        const correctedDateDeDebut = new Date(
            values.dateDeDebut
        ).toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
        });
        setValues((values) => ({
            ...values,
            dateDeDebut: correctedDateDeDebut,
        }));
        router.post("/seance", values);
    };

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
        /*/ calculer le nombre de répétition en fonction des jours sélectionnés et de date de fin et de début
        // 1 vérifier si date de fin de début et les jours sont remplis
        if (
            values.dateDeDebut == "" ||
            values.dateDeFin == "" ||
            values.jours == []
        ) {
            return;
        }
        // 2 convertir les dates en objet date pour pouvoir les comparer
        const dateDeDebut = new Date(values.dateDeDebut);
        const dateDeFin = new Date(values.dateDeFin);
        // 3 calculer le nombre de répétition de la séance (càd le nombre de jours qui sont dans la listre jours entre date de début et date de fin)
        let count = 0;
        for (let i = dateDeDebut; i <= dateDeFin; i.setDate(i.getDate() + 1)) {
            let getDayName = i.toLocaleDateString("fr-FR", {
                weekday: "long",
            });
            //passer 1 char en majuscule pour matcher les jours
            getDayName =
                getDayName.charAt(0).toUpperCase() + getDayName.slice(1);
            if (values.jours.includes(getDayName)) {
                console.log(getDayName);
                count++;
            }
        }
        // 4 stocker le nombre de répétition
        setValues((values) => ({
            ...values,
            nombreDeRepetition: count,
        }));
        console.log(values.nombreDeRepetition);*/
    };

    // fonction pour gérer le changement d'heure de début
    const handleChangeHeureDeDebut = (newValue) => {
        const corrected = new Date(newValue.toString()).toLocaleString(
            "fr-FR",
            {
                timeZone: "Europe/Paris",
            }
        );
        const newVal = [
            corrected.split(" ")[1].split(":")[0],
            corrected.split(" ")[1].split(":")[1],
        ];
        setValues((values) => ({
            ...values,
            heureDeDebut: newVal,
        }));
    };

    // fonction pour gérer le changement d'heure de fin
    const handleChangeHeureDeFin = (newValue) => {
        const corrected = new Date(newValue.toString()).toLocaleString(
            "fr-FR",
            {
                timeZone: "Europe/Paris",
            }
        );
        const newVal = [
            corrected.split(" ")[1].split(":")[0],
            corrected.split(" ")[1].split(":")[1],
        ];

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

    //transformer les groupes en tableau de value label pour le select
    const newGcs = [];
    Gcs.map((gc) => {
        newGcs.push({
            value: gc.id,
            label:
                gc.numero_groupe +
                "gp |" +
                gc.nom_option +
                " " +
                gc.type_option +
                " " +
                gc.annee,
        });
    });

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

    dayjs.locale("fr");

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
                                    adapterLocale={"fr"}
                                >
                                    <DatePicker
                                        defaultValue={dayjs()}
                                        disablePast
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
                                        adapterLocale={"fr"}
                                    >
                                        <TimePicker
                                            onChange={handleChangeHeureDeDebut}
                                            ampm={false}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="w-1/2 flex flex-col space-y-2">
                                    <InputLabel value="Heure de fin" />
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale={"fr"}
                                    >
                                        <TimePicker
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
                                            value: "présentiel",
                                            label: "Présentiel",
                                        },
                                        { value: "comodal", label: "Comodal" },
                                        {
                                            value: "distanciel",
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
                                    options={newGcs}
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
                                            adapterLocale={"fr"}
                                        >
                                            <DatePicker
                                                value={values.dateDeFin}
                                                disablePast
                                                maxDate={dayjs().add(2, "year")}
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
                                </div>

                                <div className="flex flex w-full space-x-4"></div>
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
                                      /*
                                    values.nombreDeRepetition +
                                    " " +
                                    "fois,"+*/ " " +
                                      " à partir du" +
                                      " " +
                                      values.dateDeDebut +
                                      " " +
                                      "jusqu'au" +
                                      " " +
                                      values.dateDeFin +
                                      " " +
                                      "les" +
                                      " " +
                                      values.jours +
                                      " " +
                                      "entre" +
                                      " " +
                                      values.heureDeDebut +
                                      " " +
                                      "et" +
                                      " " +
                                      values.heureDeFin
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
