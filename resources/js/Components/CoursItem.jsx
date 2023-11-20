import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Cours item is a component that is checkable has a view icon and a title given in props
// it has a state management fort the checkable part
// so if you click on the icon , the item view changes
// unchecked : w160 h42 left border 1px #575962 20% opacity , icon :view color :#1F283E , title #575962 Lato bold 18px
// checked ( so hidden mode): w160 h42 no borders, icon :checked view color :#575962  , title #A9AAB1 Lato bold 18px
export default function CoursItem(props) {
    //state
    const [checked, setChecked] = useState(false);

    //function
    const handleCheck = () => {
        setChecked(!checked);
    };
    return (
        <>
            {/*Cours item component  */}
            <div
                className={`w-160 h-42 border-1 border-solid border-${
                    checked ? "#575962" : "#575962"
                } opacity-${
                    checked ? "0.2" : "1"
                } flex items-center justify-between px-10`}
            >
                {/*Cours Icon */}
                <div
                    onClick={handleCheck}
                    className={`cursor-pointer text-${
                        checked ? "#575962" : "#1F283E"
                    }`}
                >
                    {checked ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                        <FontAwesomeIcon icon={faEye} />
                    )}
                </div>
                {/*Cours Title */}
                <div
                    className={`w-28 whitespace-nowrap overflow-hidden text-${
                        checked ? "#A9AAB1" : "#1F283E"
                    } font-bold text-18px`}
                >
                    {props.initiales}
                </div>
            </div>
        </> /*Cours item component  */
    );
}
