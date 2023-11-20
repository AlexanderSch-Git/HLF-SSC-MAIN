import ApplicationLogo from "@/Components/ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import TextInput from "@/Components/TextInput";

export default function Header(props) {
    return (
        <>
            <div className="h-24 flex bg-primBlue w-full">
                {/* Header Logo */}
                <div className="w-72 object-contain flex items-center justify-center">
                    <ApplicationLogo />
                </div>
                {/* If props.type != guest then render next */}
                {props.type != "guest" && (
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
