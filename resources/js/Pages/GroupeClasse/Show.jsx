import React from "react";
import GCLayout from "@/Layouts/GroupesClassesLayout";

export default function Show({ groupeClasse }) {
    console.log(groupeClasse);
    return (
        <GCLayout>
            <div>
                <h1>Informations sur le groupe classe</h1>
            </div>
        </GCLayout>
    );
}
