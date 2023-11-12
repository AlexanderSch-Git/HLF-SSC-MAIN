import ApplicationLogo from "@/Components/ApplicationLogo";
import Guest from "@/Layouts/GuestLayout";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Guest>
                <h1>Welcome</h1>
            </Guest>
        </>
    );
}
