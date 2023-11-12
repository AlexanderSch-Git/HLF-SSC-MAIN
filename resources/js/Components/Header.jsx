import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Header(props) {
    return (
        <div className="h-24 flex bg-primBlue w-full">
            {/* Header Logo */}
            <div className="w-72 object-contain flex items-center justify-center">
                <ApplicationLogo />
            </div>
            {/* Header content */}
            <div className="w-full flex flew-row items-center p-3">
                <div className="bg-white flex flex-row h-fit w-1/2 px-4 py-2 space-x-2 rounded-3xl">
                    <form className="flex items-center space-x-2 w-full">
                        {/* Search Icon */}
                        <div className="w-8 h-8 bg-black flex items-center justify-center">
                            <img src="" alt="" className="text-pink-500" />
                        </div>
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Rechercher un cours ici"
                            className="h-full w-full flex text-left items-center rounded-lg px-2 outline-none border-0 border-none"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
