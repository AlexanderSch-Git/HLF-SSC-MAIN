import ApplicationLogo from "@/Components/ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import TextInput from "@/Components/TextInput";
import { Head, Link } from "@inertiajs/react";

export default function Header(props) {
    return (
        <>
            <div className="h-24 flex flex-row bg-primBlue w-full">
                {/* Header Logo */}
                <div className="w-72 object-contain">
                    <ApplicationLogo />
                </div>
                {/* If props.type == auth then render next */}
                {props.type == "auth" && (
                    <>
                        {/* Header Search Bar */}
                        <div className="w-full flex flew-row items-center p-3">
                            <div className="bg-white flex flex-row h-fit w-1/2 px-4 py-2 space-x-2 rounded-3xl">
                                <form className="flex items-center space-x-2 w-full">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                        />
                                    </div>

                                    <TextInput
                                        id="search"
                                        type="text"
                                        name="search"
                                        className="mt-1 w-fullh-full w-full flex text-left items-center rounded-lg px-2 outline-none border-0 border-none"
                                        autoComplete="search"
                                        placeholder="Rechercher"
                                    />
                                </form>
                            </div>
                            <div className="flex flex-row items-center align-bottom justify-end space-x-4 w-full">
                                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                    <FontAwesomeIcon icon={faBell} />
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                    <a href="/login">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {props.type == "admin" && (
                    <>
                        <Head title={props.titre} />
                        <div className="w-full flex justify-end">
                            <div className="flex flex-row w-2/3 justify-between px-8 items-center">
                                <Link
                                    href="/humains"
                                    //if props.titre == humains then add text-primRed
                                    className={`font-bold text-xl py-1 items-center ${
                                        props.titre == "humains"
                                            ? "text-primRed"
                                            : "text-primGrey"
                                    }`}
                                >
                                    Humain
                                </Link>
                                <Link
                                    href="/profs"
                                    className={`font-bold text-xl py-1 items-center ${
                                        props.titre == "profs"
                                            ? "text-primRed"
                                            : "text-primGrey"
                                    }`}
                                >
                                    Professeurs
                                </Link>
                                <Link
                                    href="/options"
                                    className={`font-bold text-xl py-1 items-center ${
                                        props.titre == "options"
                                            ? "text-primRed"
                                            : "text-primGrey"
                                    }`}
                                >
                                    Options
                                </Link>
                                <Link
                                    href="/gcs"
                                    className={`font-bold text-xl py-1 items-center ${
                                        props.titre == "gcs"
                                            ? "text-primRed"
                                            : "text-primGrey"
                                    }`}
                                >
                                    Groupes classes
                                </Link>
                                <Link
                                    href="/cours"
                                    className={`font-bold text-xl py-1 items-center ${
                                        props.titre == "cours"
                                            ? "text-primRed"
                                            : "text-primGrey"
                                    }`}
                                >
                                    Cours
                                </Link>
                                <Link
                                    href="/seances"
                                    className={`font-bold text-xl py-1 items-center ${
                                        props.titre == "seances"
                                            ? "text-primRed"
                                            : "text-primGrey"
                                    }`}
                                >
                                    Séance
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

/*

            <div className="w-full flex flew-row items-center p-3">
                <div className="bg-white flex flex-row h-fit w-1/2 px-4 py-2 space-x-2 rounded-3xl">
                    <form className="flex items-center space-x-2 w-full">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>

                        <TextInput
                            id="search"
                            type="text"
                            name="search"
                            className="mt-1 block w-fullh-full w-full flex text-left items-center rounded-lg px-2 outline-none border-0 border-none"
                            autoComplete="search"
                            placeholder="Rechercher"
                        />
                    </form>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center">
                        <a href="/login">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </div>
                </div>
            </div>
*/
