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
            <div
                className="w-full text-s h-6 flex flex-row whitespace-nowrap items-center space-x-2 pl-2 "
                style={{
                    borderLeft: checked
                        ? "2px solid #FFF"
                        : "2px solid #575962",
                    color: checked ? "#A9AAB1" : "#575962",
                    fontWeight: checked ? "normal" : "bold",
                }}
            >
                <div
                    onClick={handleCheck}
                    className="w-4 h-4 flex align-middle items-center justify-center text-xs"
                >
                    {checked ? (
                        <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="text-#575962"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faEye}
                            className="text-#575962"
                        />
                    )}
                </div>
                <div className="whitespace-nowrap w-full overflow-hidden ">
                    {props.initiales} {props.titre}
                </div>
            </div>
        </>
    );
}
