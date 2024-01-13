import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Base from "./BaseLayout";

export default function AuthenticatedLayout(props) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return <Base {...props}>{props.children}</Base>;
}
