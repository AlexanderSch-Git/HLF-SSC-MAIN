import Header from "@/Components/Header";
import BaseLayout from "@/Layouts/BaseLayout";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <>
            <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-300">
                <Header type="guest" />
                <div className="m-auto border-red w-2/3 ">{children}</div>
            </div>
        </>
    );
}
