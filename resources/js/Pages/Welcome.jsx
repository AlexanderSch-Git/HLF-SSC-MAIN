import { Head, Link } from "@inertiajs/react";
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
                            <h2 className="text-2xl  font-bold text-primTextBlue">
                                Statut: Alpha, Proof Of Concept
                            </h2>
                            <h2 className="text-xl italic font-bold text-primTextBlue">
                                Note aux alpha testeurs
                            </h2>
                            <p>
                                Merci de votre participation à l'alpha test du
                                projet!
                            </p>
                            <p>
                                Conformément à votre brief, vous avez accès à
                                toutes les fonctionnalités du projet. Vous êtes
                                donc à la fois un étudiant et un professeur mais
                                aussi un membre du Personnel Administratif. Ne
                                vous embêtez pas à créer plusieurs comptes pour
                                tester les différentes fonctionnalités.
                            </p>
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
                            <p>
                                Vous n'avez pas accès à la plateforme de ticket
                                pour signaler les bugs. Vous devez passer par la
                                personne qui vous a donné le lien.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <h2 className="text-2xl  font-bold text-primTextBlue">
                                Bon test & Merci!,
                            </h2>
                            <h2 className="text-xl italic font-bold text-primTextBlue">
                                Une question? Un problème? Contactez-moi!
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
                                    className="font-bold text-xl text-primTextBlue py-1 items-center"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/humains"
                                    className="font-bold text-xl text-primTextBlue py-1 items-center"
                                >
                                    Administration
                                </Link>
                                <a
                                    href="https://docs.smartschoolcalendar.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-xl text-primTextBlue py-1 items-center"
                                >
                                    Documentation
                                </a>
                                <Link
                                    href="/login"
                                    className="font-bold text-xl bg-primPink hover:bg-primTextBlue text-white px-4 py-1 items-center rounded-full"
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
