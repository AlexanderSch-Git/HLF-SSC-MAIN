import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SeanceLayout({ children }) {
    return (
        <AdminLayout>
            <div className="flex flex-row align-middle items-center text-center w-full">
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/seances">Liste</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/seance/create">+</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/seance/search">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </button>
            </div>
            <div className="bg-white p-4">{children}</div>
        </AdminLayout>
    );
}
