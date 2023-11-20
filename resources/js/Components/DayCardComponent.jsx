export default function DayCardComponent({ day, boolToDay }) {
    const titles = [
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
        { titre: "Robotique", initiales: "R", couleur: "#8B000<0" },
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
    // get a random set of title couleur intitiales
    const randomSet = () => {
        return titles[Math.floor(Math.random() * titles.length)];
    };

    //get a random list of random sets
    const randomList = () => {
        return Array.from({ length: Math.floor(Math.random() * 10) }, () =>
            randomSet()
        );
    };

    // return props.day in a card with a random color
    return (
        <>
            {/*if boolToDay is true, then bg blue of the card*/}
            <div
                className="p-1 overflow-hidden flex flex-col items-start"
                //style = {boolToDay ? "background-color: #A81C7D" : "background-color: #FFFFFF"}
                style={{ backgroundColor: boolToDay ? "#A81C7D" : "#FFFFFF" }}
            >
                {/*display day */}
                {day}
                {/*Displays randomly 0 to 5 H1 */}
                <div className="flex flex-col h-full w-full overflow-y-scroll flex-grow">
                    {randomList().map((item, index) => (
                        <div
                            key={index}
                            className=""
                            style={{ backgroundColor: item.couleur }}
                        >
                            {item.initiales}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
