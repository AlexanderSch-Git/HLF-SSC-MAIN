/*layout pour la gestion des humains , simplement un entete : avec un menu  et un spliter pour le contenu
menu : liste , plus , recherche */
import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function CoursLayout({ children }) {
    return (
        <AdminLayout titre="cours">
            <div className="flex flex-row align-middle items-center text-center w-full">
                <Link href="/cours">
                    <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                        Liste
                    </button>
                </Link>
                <Link href="/cour/create">
                    <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                        +
                    </button>
                </Link>{" "}
                <Link href="/cour/search">
                    <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </Link>
            </div>
            <div className="bg-white p-4">{children}</div>
        </AdminLayout>
    );
}
