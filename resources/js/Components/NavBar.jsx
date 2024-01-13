import CoursItem from "./CoursItem";
import NavBarTitleItem from "./NavBarTitleItem";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faBook,
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
    //what courses should look like in the menu :{ titre: "Informatique", initiales: "I", couleur: "#A81C7D" },
    // what i'm getting from the props : {id: 1, nom: "Projet d'intégration", ue: 'PI', prof: 'Pikachu Sacha', pid: 2}
    //
    const courses = props.cours.map((cours) => {
        return {
            titre: cours.nom,
            initiales: cours.ue[0],
            couleur: "#A81C7D",
            id: cours.id,
        };
    });

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
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                        {/*item Lato 18px bold  #575962*/}
                        <button
                            onClick={() => {
                                props.modifyCalendarState(false);
                            }}
                        >
                            <h1 className="text-18px font-bold text-#575962 famil">
                                Mes Cours
                            </h1>
                        </button>
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
                        <div className="overflow-y-scroll flex flex-col space-y-3 h-max-64 pl-4 w-full">
                            {courses.map((course) => (
                                <CoursItem
                                    key={course.id}
                                    id={course.id}
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
