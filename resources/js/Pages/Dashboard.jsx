import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CustomDayViewPlugin from "@/Components/CustomDayView";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";

export default function Dashboard({
    auth,
    events,
    seances,
    cours,
    inscriptions,
}) {
    const [hidden, setHidden] = useState({});
    const [eventslist, setEventslist] = useState(events);
    const [calendarState, setCalendarState] = useState("month");
    const [coursSelector, setCoursSelector] = useState("");
    const getCalender = () => {
        switch (calendarState) {
            case "month":
                return "Month View";
            case "week":
                return "Week View";
            case "day":
                return "Day View";
            default:
                return "Calendar";
        }
    };
    const myCourses = inscriptions.map((cours) => {
        return {
            value: cours.id,
            label: cours.nom,
        };
    });

    const coursremapped = cours.map((cours) => {
        return {
            value: cours.id,
            label: cours.nom,
        };
    });
    //usestate afficher calendrier ou liste des cour
    const [showCalendar, setShowCalendar] = useState(true);

    //handlesubmitpour s'inscrire à un cours
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/inscription", {
            cours_id: coursSelector,
            user_id: auth.user.id,
        });
    };

    //handelDelete pour se désinscrire d'un cours
    const handleDelete = (e) => {
        router.post("/desinscription", {
            cours_id: e.id,
        });
    };

    return (
        <AuthenticatedLayout
            cours={inscriptions}
            showCalendarState={showCalendar}
            modifyCalendarState={setShowCalendar}
        >
            <Head title="Dashboard" />

            <div className="flex flex-col overflow-hidden h-full w-full">
                {showCalendar ? (
                    <>
                        <div className="flex flex-col h-full w-full bg-white rounded-3xl p-5 overflow-hidden ">
                            <FullCalendar
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    CustomDayViewPlugin,
                                ]}
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,timeGridWeek,day",
                                }}
                                initialView="dayGridMonth"
                                timeZone="UTC+1"
                                height="100%"
                                //start monday
                                firstDay={1}
                                //changer le noms des jours en français
                                locale="fr"
                                //changer le noms des boutons en français
                                buttonText={{
                                    today: "Aujourd'hui",
                                    month: "Mois",
                                    week: "Semaine",
                                    day: "Jour",
                                }}
                                //load les events
                                events={eventslist}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white p-4 flex flex-col space-y-10">
                            <div>
                                <h1 className="text-18px font-bold text-#575962">
                                    Mes cours
                                </h1>
                                <div className="flex flex-col space-y-4 m-4">
                                    <ul>
                                        {inscriptions.map((cours) => (
                                            <li
                                                key={cours.id}
                                                className="flex flex-row space-x-4"
                                            >
                                                <div
                                                    className="w-8 h-8 bg-primRed text-white rounded-full flex align-middle items-center justify-center"
                                                    style={{
                                                        backgroundColor:
                                                            "#A81C7D",
                                                    }}
                                                >
                                                    {cours.ue[0]}
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex space-x-2">
                                                        <h1 className="text-18px font-bold text-#575962">
                                                            {cours.nom}
                                                        </h1>
                                                        <h1 className="text-14px font-medium text-#575962">
                                                            - ({cours.prof})
                                                        </h1>
                                                    </div>
                                                    <h1 className="text-14px font-thin italic text-#575962">
                                                        {cours.ue}
                                                    </h1>
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <button
                                                        className="px-8 h-8 bg-primBlue text-primRed rounded-full font-bold"
                                                        onClick={() => {
                                                            handleDelete(cours);
                                                        }}
                                                    >
                                                        Se désinscrire
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-4"
                            >
                                <h1 className="text-18px font-bold text-#575962">
                                    S'inscrire à un cours
                                </h1>
                                <InputLabel value="Entrer le nom d'un cours" />
                                <Select
                                    name="coursSelector"
                                    id="coursSelector"
                                    options={coursremapped}
                                    onChange={(e) => {
                                        setCoursSelector(e.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded"
                                >
                                    Valider l'inscription'
                                </button>
                            </form>
                            <h1 className="text-18px font-bold text-#575962">
                                Retourner au calendrier
                            </h1>
                            <button
                                className="w-72 h-10 bg-primRed rounded-lg text-white text-18px font-bold"
                                onClick={() => {
                                    router.get("/dashboard");
                                }}
                            >
                                Afficher le calendrier
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
