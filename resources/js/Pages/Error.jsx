import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Error({ auth }) {
    return (
        <AuthenticatedLayout>
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold">Error</h1>
            </div>
        </AuthenticatedLayout>
    );
}
