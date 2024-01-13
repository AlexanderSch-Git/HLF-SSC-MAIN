import ApplicationLogo from "@/Components/ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";

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
                                        className="mt-1 block w-fullh-full w-full flex text-left items-center rounded-lg px-2 outline-none border-0 border-none"
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
                        <div className="flex flex-row items-center space-x-4">
                            <div className="w-36 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                <Link href="/humains">humain</Link>
                            </div>
                            <div className="w-36 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                <Link href="/profs">professeurs</Link>
                            </div>
                            <div className="w-36 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                <Link href="/options">options</Link>
                            </div>
                            <div className="w-36 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                <Link href="/gcs">groupes classes</Link>
                            </div>
                            <div className="w-36 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                <Link href="/cours">cours</Link>
                            </div>
                            <div className="w-36 h-8 flex items-center justify-center bg-white rounded-full text-primRed">
                                <Link href="/seances">séance</Link>
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
