import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function OptionLayout({ children }) {
    return (
        <AdminLayout titre="options">
            <div className="flex flex-row align-middle items-center text-center w-full">
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/options">Liste</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/option/create">+</Link>
                </button>
                <button className="bg-primBlue hover:bg-primRed text-white font-bold py-2 px-4 rounded">
                    <Link href="/option/search">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </button>
            </div>
            <div className="bg-white p-4">{children}</div>
        </AdminLayout>
    );
}
