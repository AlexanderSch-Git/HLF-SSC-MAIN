/*layout pour la gestion des humains , simplement un entete : avec un menu  et un spliter pour le contenu
menu : liste , plus , recherche */
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "./AdminLayout";

export default function HumainLayout({ children }) {
    return (
        <AdminLayout titre="humains">
            <div className="flex flex-row align-middle items-center text-center justify-start w-full">
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/humains">Liste</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/humain/create">+</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/humain/search">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </button>
            </div>
            <div className="bg-white p-4">{children}</div>
        </AdminLayout>
    );
}
