import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ProfLayout({ children }) {
    return (
        <AuthenticatedLayout>
            <div className="flex flex-row align-middle items-center text-center justify-end w-full">
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/profs">Liste</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/prof/create">+</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/prof/search">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </button>
            </div>
            <div className="bg-white p-4">{children}</div>
        </AuthenticatedLayout>
    );
}
