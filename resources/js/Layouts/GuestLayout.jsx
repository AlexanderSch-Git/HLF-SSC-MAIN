import Header from "@/Components/Header";
import BaseLayout from "@/Layouts/BaseLayout";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <>
            <Header type="guest" />
        </>
    );
}
