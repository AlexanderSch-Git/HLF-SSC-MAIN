import { Head, Link } from "@inertiajs/react";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Welcome(props) {
    //definir une notif toastify pour les erreurs
    const notify = () => {
        //afficher deux error : une pour le message et une pour dire qu'on est reconnaisant
        toast.error("Désolé cette fonctionnalité n'est pas encore disponible");
        //pause de 1 secondes
        setTimeout(() => {
            toast.success(
                "Merci de votre compréhension et de votre aide pour améliorer le projet"
            );
        }, 1000);
    };
    // ALPHA AFFICHER LE DISCDLAIMER
    return (
        <>
            <div className="relative w-screen h-screen p-8 bg-primGrey">
                <Head title="Welcome" />
                <div className="absolute top-4 right-4">
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
                <div className="relative flex w-full h-full z-10">
                    <div className="w-2/5 flex flex-col space-y-4 flex-nowrap">
                        <div className="flex flex-col space-y-3">
                            <h1 className="text-4xl font-bold text-primTextBlue">
                                SSC
                            </h1>
                            <h1 className="text-3xl font-bold text-primTextBlue">
                                Smart School Calendar
                            </h1>
                        </div>
                        <div className="flex flex-col space-y-3 overflow-hidden ">
                            <p>
                                Le projet Smart School Calendar est une
                                application web de gestion de calendrier
                                étudiant spécialement conçue pour répondre aux
                                besoins particuliers des étudiants au sein de
                                l'établissement de promotion sociale, Henri La
                                Fontaine.
                            </p>
                            <div className="flex flex-row space-x-2">
                                <h2 className="text-2xl  font-bold text-primTextBlue">
                                    Statut:
                                </h2>
                                <h2 className="text-2xl  font-bold text-primPink">
                                    Alpha, v2_0_0 | Make it work
                                </h2>
                            </div>
                            <h2 className="text-xl italic font-bold text-primTextBlue">
                                Note aux alpha testeurs
                            </h2>
                            <p>
                                Merci de votre participation à l'alpha test du
                                projet!
                            </p>
                            <p>
                                Merci de participer à l'alpha test du projet !
                                Conformément à votre brief v2, votre compte ne
                                donne accès qu’aux fonctionnalités correspondant
                                à votre rôle spécifique. Vous serez informé de
                                la création des cours au fur et à mesure.
                            </p>
                            <Link
                                href="https://www.smartschoolcalendar.tech/bugreport/"
                                className="font-bold text-l text-primGrey bg-primPink py-1 items-center w-fit rounded-full px-4 tracking-wider hover:bg-primTextBlue "
                            >
                                Signalez vos bugs et problèmes ici
                            </Link>
                            <h2 className="text-xl italic font-bold text-primTextBlue">
                                Curieux? Rejoindre l’alpha c’est possible et
                                facile!
                            </h2>
                            <p>
                                Vous êtes bienvenue sur l'alpha du projet même
                                si vous n'avez pas reçu de breef de ma part.
                                Vous pouvez vous inscrire et tester
                                l'application.
                            </p>
                            <p>
                                Pour votre information les données seront
                                supprimées à la fin de la phase alpha. Les
                                données peuvent changer à tout moment, et être
                                supprimées à tout moment.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <h2 className="text-2xl  font-bold text-primTextBlue">
                                Bon test & Merci!
                            </h2>
                            <h2 className="text-xl italic font-bold text-primTextBlue">
                                Une question? Un problème? Vous êtes membre du
                                PA / PE? Contactez-moi!
                                <br />
                                Alexander.schwandes@hainaut-promsoc.be
                            </h2>
                        </div>
                    </div>
                    <div className="w-3/5 flex flex-col">
                        <div className="w-full flex flex-row justify-end px-4">
                            <div className="flex w-5/6 flex-row  justify-between">
                                <Link
                                    href="/dashboard"
                                    className="font-bold text-xl text-primTextBlue py-1 items-center hover:text-primPink"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/humains"
                                    className="font-bold text-xl text-primTextBlue py-1 items-center hover:text-primPink"
                                >
                                    Administration
                                </Link>
                                <a
                                    href="https://docs.smartschoolcalendar.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-xl text-primTextBlue py-1 items-center hover:text-primPink"
                                >
                                    Documentation
                                </a>
                                <Link
                                    href="/login"
                                    className="font-bold text-xl bg-primPink hover:bg-primTextBlue text-primGrey px-4 py-1 items-center rounded-full"
                                >
                                    Connexion
                                </Link>
                            </div>
                        </div>
                        <div className="h-full"></div>
                        <div className="flex flex-row justify-end w-full">
                            <button onClick={notify}>
                                <h1 className="text-primTextBlue italic">
                                    Mes remerciements ici
                                </h1>
                            </button>
                        </div>
                    </div>
                </div>
                <img
                    src="/img/Vectorbgdeco.svg"
                    alt="Poeple putting events on a calendar"
                    className="absolute top-[17.5%] left-[30%] w-[68.9%] h-[68%] z-0"
                />
            </div>
        </>
    );
}
