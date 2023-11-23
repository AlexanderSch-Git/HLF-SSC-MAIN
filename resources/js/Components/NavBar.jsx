import CoursItem from "./CoursItem";
import NavBarTitleItem from "./NavBarTitleItem";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faEye,
    faEyeSlash,
    faPersonCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

export default function NavBar(props) {
    //state of extend menu
    const [extend, setExtend] = useState(false);
    //STATE OF examens
    const [showExamens, setShowExamens] = useState(false);
    //function of extend menu
    const handleExtend = () => {
        setExtend(!extend);
    };
    //function of examens
    const handleExamens = () => {
        setShowExamens(!showExamens);
    };
    //temporary example of data (list of cours) to be replaced by the data from the database
    const courses = [
        { titre: "Informatique", initiales: "I", couleur: "#A81C7D" },
        { titre: "Réseaux", initiales: "R", couleur: "#6B8E23" },
        { titre: "Programmation", initiales: "P", couleur: "#FF5733" },
        { titre: "Base de données", initiales: "BD", couleur: "#2271B3" },
        { titre: "Sécurité", initiales: "S", couleur: "#FDD017" },
        {
            titre: "Intelligence Artificielle",
            initiales: "IA",
            couleur: "#7D26CD",
        },
        { titre: "Développement Web", initiales: "DW", couleur: "#8B4513" },
        { titre: "Analyse de Données", initiales: "AD", couleur: "#FF4500" },
        { titre: "Ingénierie Logicielle", initiales: "IL", couleur: "#6495ED" },
        { titre: "Réseaux Sociaux", initiales: "RS", couleur: "#008000" },
        {
            titre: "Systèmes d'Exploitation",
            initiales: "SE",
            couleur: "#9932CC",
        },
        { titre: "Cloud Computing", initiales: "CC", couleur: "#FFD700" },
        { titre: "Génie Logiciel", initiales: "GL", couleur: "#8B008B" },
        {
            titre: "Conception de Sites Web",
            initiales: "CSW",
            couleur: "#4682B4",
        },
        { titre: "Cryptographie", initiales: "C", couleur: "#1E90FF" },
        { titre: "Gestion de Projet", initiales: "GP", couleur: "#8A2BE2" },
        { titre: "Commerce Électronique", initiales: "CE", couleur: "#DC143C" },
        { titre: "Développement Mobile", initiales: "DM", couleur: "#7FFF00" },
        { titre: "Robotique", initiales: "R", couleur: "#8B0000" },
        {
            titre: "Langages de Programmation",
            initiales: "LP",
            couleur: "#00CED1",
        },
        {
            titre: "Architecture des Ordinateurs",
            initiales: "AO",
            couleur: "#191970",
        },
        { titre: "Traitement de l'Image", initiales: "TI", couleur: "#FF6347" },
        { titre: "Systèmes Embarqués", initiales: "SE", couleur: "#9932CC" },
        { titre: "Big Data", initiales: "BD", couleur: "#32CD32" },
        { titre: "Analyse de Risques", initiales: "AR", couleur: "#FF4500" },
        { titre: "Design UX/UI", initiales: "DU", couleur: "#8B4513" },
        {
            titre: "Technologies Web Avancées",
            initiales: "TWA",
            couleur: "#A52A2A",
        },
        { titre: "Développement Agile", initiales: "DA", couleur: "#FF69B4" },
        {
            titre: "Développement Full Stack",
            initiales: "DFS",
            couleur: "#8B4513",
        },
    ];

    //return the component
    return (
        <>
            {/*Navbar  */}
            <div className="pt-8 px-5 pb-5 overflow-scrol p-5 flex flex-col items-center content-start align-middle h-full w-72 space-y-4">
                {/*Menu des cours,  */}
                <div className="w-full flex flex-col space-y-4">
                    <NavBarTitleItem title="MENU" />
                    <div className="flex flex-row align-middle items-center space-x-2">
                        {/*Icon w30 h30*/}
                        <div className="w-8 h-8 bg-primRed text-white rounded-full flex align-middle items-center justify-center">
                            <img
                                src="img/Account.svg"
                                alt="Mes cours icone"
                                className="p-2"
                            />
                        </div>
                        {/*item Lato 18px bold  #575962*/}
                        <h1 className="text-18px font-bold text-#575962 famil">
                            Mes Cours
                        </h1>
                        {/*clicable extend icon*/}
                        <div
                            onClick={handleExtend}
                            className="cursor-pointer text-#575962"
                        >
                            {extend ? (
                                <img src="/img/ChevronUp.svg" alt="extend" />
                            ) : (
                                <img src="/img/ChevronDown.svg" alt="extend" />
                            )}
                        </div>
                    </div>
                    {/*if extended display a div of h260px that contains all courses of the courses array, and is scrollable verticaly*/}
                    {extend && (
                        <div className="overflow-y-scroll flex flex-col space-y-3 h-64 pl-4 w-full">
                            {courses.map((course) => (
                                <CoursItem
                                    key={course.titre}
                                    titre={course.titre}
                                    initiales={course.initiales}
                                    couleur={course.couleur}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-row align-middle items-center space-x-2 w-full">
                    {/*Icon w30 h30*/}
                    <div
                        className="w-8 h-8 bg-primRed text-white rounded-full flex align-middle items-center justify-center"
                        onClick={handleExamens}
                    >
                        {showExamens ? (
                            <FontAwesomeIcon icon={faEye} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                    </div>
                    {/*item Lato 18px bold  #575962*/}
                    <h1 className="text-18px font-bold text-#575962 famil">
                        Mes Examens
                    </h1>
                </div>
                {/*Menu des infos*/}
                <NavBarTitleItem title="INFORMATIONS" />
                <Link href="/notifications" className="w-full">
                    <div className="flex flex-row align-middle items-center space-x-2 w-full">
                        {/*Icon w30 h30*/}
                        <div className="w-8 h-8 bg-primRed text-white rounded-full flex align-middle items-center justify-center">
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        {/*item Lato 18px bold  #575962*/}
                        <h1 className="text-18px font-bold text-#575962 famil">
                            Notifications
                        </h1>
                    </div>
                </Link>
                <Link href="/absences" className="w-full">
                    <div className="flex flex-row align-middle items-center space-x-2 w-full">
                        {/*Icon w30 h30*/}
                        <div className="w-8 h-8 bg-primRed text-white rounded-full flex align-middle items-center justify-center ">
                            <FontAwesomeIcon icon={faPersonCircleMinus} />
                        </div>
                        {/*item Lato 18px bold  #575962*/}
                        <h1 className="text-18px font-bold text-#575962 famil">
                            Absences
                        </h1>
                    </div>
                </Link>
            </div>
        </>
    );
}
