import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CustomDayViewPlugin from "@/Components/CustomDayView";

import Base from "@/Layouts/BaseLayout";
import { useState } from "react";

export default function Welcome(props) {
    // ALPHA AFFICHER LE DISCDLAIMER
    return (
        <>
            <div className="w-screen h-screen p-10 bg">
                <div className="h-full bg-gray-400 p-4 bg-opacity-50 rounded-2xl flex flex-col space-y-5">
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-4xl text-center">
                            Bienvenue sur l'alpha du projet Smart School
                            Calendar
                        </h1>
                        <h2 className="text-2xl text-center">
                            Version alpha : proof of concept
                        </h2>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h2
                            className="text-3xl w-full
                "
                        >
                            Note aux alpha testeurs
                        </h2>
                        <p>
                            Merci de votre participation à l'alpha test du
                            projet
                        </p>
                        <p>
                            Conformément à votre brief, vous avez accès à toutes
                            les fonctionnalités du projet.
                        </p>
                        <p>
                            Vous êtes donc à la fois un étudiant et un
                            professeur mais aussi un membre du Personnel
                            Administratif.
                            <br />
                            Ne vous embêtez pas à créer plusieurs comptes pour
                            tester les différentes fonctionnalités.
                            <br />
                            Vous pouvez utiliser le même compte pour tester
                            toutes les fonctionnalités.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-3xl w-full">Note aux autres</h2>
                        <p>
                            Vous êtes Bienvenue sur l'alpha du projet, même si
                            vous n'avez pas recu de breef de ma part.
                        </p>
                        <p>
                            Vous pouvez vous inscrire et créer un compte pour
                            tester l'application.
                        </p>
                        <p>
                            Pour votre information les données seront supprimées
                            à la fin de la phase alpha.
                        </p>
                        <p>
                            Les données peuvent changer à tout moment, et être
                            supprimées à tout moment.
                        </p>
                        <p>
                            Vous n'avez pas accès à la plateforme de ticket pour
                            signaler les bugs. <br />
                            Vous devez passer par la personne qui vous a donné
                            le lien.
                        </p>
                    </div>
                    <h3 className="text-xl text-center">
                        {" "}
                        Bon test ! <br />
                        Alexander Schwandes <br />
                        Alexander.schwandes+ssc@hainaut-promsoc.be
                    </h3>
                </div>
            </div>
        </>
    );
}
