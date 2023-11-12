import BaseLayout from "@/Layouts/BaseLayout";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <>
            <BaseLayout>
                <h1>Guest</h1>
                {children}
            </BaseLayout>
        </>
    );
}
