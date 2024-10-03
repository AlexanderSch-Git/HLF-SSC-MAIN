import React from "react";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "./AdminLayout";

export default function ProfLayout({ children }) {
    return (
        <AdminLayout titre="profs">
            <div className="flex flex-row align-middle items-center text-center w-full">
                <Link href="/profs">
                    <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                        Liste
                    </button>
                </Link>{" "}
                <Link href="/prof/create">
                    <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                        +
                    </button>
                </Link>{" "}
                <Link href="/prof/search">
                    <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </Link>
            </div>
            <div className="bg-white p-4">{children}</div>
        </AdminLayout>
    );
}
