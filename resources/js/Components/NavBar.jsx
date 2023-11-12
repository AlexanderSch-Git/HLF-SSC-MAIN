import CoursItem from "./CoursItem";
import NavBarTitleItem from "./NavBarTitleItem";
import { useState } from "react";

export default function NavBar(props) {
    //state of extend menu
    const [extend, setExtend] = useState(false);
    //function of extend menu
    const handleExtend = () => {
        setExtend(!extend);
    };
    //temporary example of data (list of cours) to be replaced by the data from the database

    const courses = [
        "Introduction à la programmation",
        "Algorithmique et structures de données",
        "Programmation orientée objet",
        "Bases de données",
        "Systèmes d'exploitation",
        "Réseaux informatiques",
        "Sécurité informatique",
        "Développement web",
        "Applications mobiles",
        "Intelligence artificielle",
        "Apprentissage automatique",
        "Traitement du langage naturel",
        "Vision par ordinateur",
        "Robotique",
        "Informatique théorique",
        "Théorie des graphes",
        "Cryptographie",
        "Analyse de données",
        "Visualisation de données",
        "Statistiques",
        "Probabilités",
        "Optimisation",
        "Recherche opérationnelle",
        "Modélisation mathématique",
        "Simulation",
    ];

    //return the component
    return (
        <>
            {/*Navbar  */}
            <div className="pt-8 px-5 pb-5 overflow-scrol p-5 flex flex-col items-center content-start align-middle h-full w-full">
                {/*Menu des cours,  */}
                <div className="w-full flex flex-col space-y-4">
                    <NavBarTitleItem title="MENU" />
                    <div className="flex flex-row align-middle items-center space-x-2">
                        {/*Icon w30 h30*/}
                        <div className="w-7 h-7 bg-black"> </div>
                        {/*item Lato 18px bold  #575962*/}
                        <h1 className="text-18px font-bold text-#575962">
                            Mes Cours
                        </h1>
                        {/*clicable extend icon*/}
                        <div
                            onClick={handleExtend}
                            className="cursor-pointer text-#575962"
                        >
                            {extend ? "/" : "V"}
                        </div>
                    </div>
                    {/*if extended display a div of h260px that contains all courses of the courses array, and is scrollable verticaly*/}
                    {extend && (
                        <div className="h-64 overflow-y-scroll">
                            {/*map the array of courses to create a CoursItem for each one*/}
                            {courses.map((course, index) => (
                                <CoursItem
                                    key={index}
                                    title={course}
                                ></CoursItem>
                            ))}
                        </div>
                    )}
                </div>
                {/*Menu des infos*/}
            </div>
        </>
    );
}
