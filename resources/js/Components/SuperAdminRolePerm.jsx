import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function SuperAdminRolePerm(props) {
    // Etat pour les permissions triées par le champ
    const [sortedPerms, setSortedPerms] = useState(props.permissions);
    // État pour les permissions sélectionnées
    const [selectedPerms, setSelectedPerms] = useState([]);
    // Etat pour le role selectionné
    const [selectedRole, setSelectedRole] = useState(null);
    // Etat pour le type de modification
    const [modifyType, setModifyType] = useState(null);
    // fonction de gestion du chant de trie
    const handleSortPerms = (sortKey) => {
        //if empty reset to full
        if (!sortKey) {
            setSortedPerms(props.permissions);
            return;
        }
        const sortedPerms = props.permissions.filter((permission) =>
            permission.name.toLowerCase().includes(sortKey.toLowerCase())
        );
        setSortedPerms(sortedPerms);
    };
    // Fonction pour gérer les cases à cocher
    const handleCheckboxChange = (permission) => {
        setSelectedPerms((prevSelected) => {
            if (prevSelected.includes(permission)) {
                return prevSelected.filter((perm) => perm !== permission);
            } else {
                return [...prevSelected, permission];
            }
        });
        console.log(selectedPerms);
    };
    const roles = props.roles.map((role) => ({
        value: role.id,
        label: role.name,
    }));
    console.log(props.permissionAssignations);

    //useEffect on modify type to adapt the selected perms to include existing perms or not
    useEffect(() => {
        if (modifyType === "def") {
            if (!selectedRole) {
                toast.error("Veuillez selectionner un rôle");
                setModifyType(null);
                return;
            }
            setSelectedPerms([]);
        } else if (modifyType === "edit") {
            //vérifier si le role est selectionné
            if (!selectedRole) {
                toast.error("Veuillez selectionner un rôle");
                setModifyType(null);
                return;
            }
            //we need props.permissionAssignations[currentRole] to get the perms
            var perms = props.permissionAssignations[selectedRole];
            console.log(perms);
            // remap the perms to array from permissions matching the name
            var perms = perms.map((perm) =>
                props.permissions.find((permission) => permission.name === perm)
            );
            console.log(perms);
            setSelectedPerms(perms);
            handleSortPerms();
        }
    }, [modifyType]);

    const executeAction = () => {
        //vérfier si le role est selectionné
        if (!selectedRole) {
            toast.error("Veuillez selectionner un rôle");
            return;
        }
        // same function everytime , due to previous role list adaptation to modifyType
        const perms = selectedPerms.map((perm) => perm.name);
        const data = {
            role: selectedRole,
            permissions: perms,
        };
        router.post("/superadmin/editPermissionsOfRole", { data });
        toast.success("Permissions modifiées avec succès");
        setModifyType(null);
        setSelectedPerms([]);
    };
    //useeffect on the role to set the rest back to null
    useEffect(() => {
        setSelectedPerms([]);
        setModifyType(null);
        handleSortPerms();
    }, [selectedRole]);
    return (
        <>
            <div className="h-full w-full flex flex-row space-x-2 overflow-clip">
                <div className="glassmorphism w-3/5 max-h-[calc(100vh-8rem)] p-2 flex flex-col items-center space-y-2">
                    <div className="flex flex-row w-full h-fit justify-between items-end border-b-glassStroke border-b-2 pb-2">
                        <div className="text-primGrey font-bold text-2xl ">
                            Liste des Permissions
                        </div>
                        <div className="counteredGlass px-4 w-1/2 flex items-center">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-primGrey"
                            />
                            <input
                                type="text"
                                placeholder="Rechercher une permission"
                                // add no border when focused
                                className="bg-transparent placeholder-adminAquaBlue focus:ring-0 border-none text-primGrey w-full"
                                onChange={(e) =>
                                    handleSortPerms(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full h-full overflow-y-auto">
                        {sortedPerms.map((permission) => (
                            <div
                                key={permission.id}
                                //if selectedPerms includes permission text adminAquaBlue else text-adminDarkBlue
                                className={`w-11/12 p-2 rounded-full ${
                                    selectedPerms.includes(permission)
                                        ? "text-green-500 text-bold text-xl"
                                        : "text-primGrey"
                                }`}
                                onClick={() => handleCheckboxChange(permission)}
                            >
                                {permission.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-2/5 h-full flex flex-col-reverse space-y-2 space-y-reverse">
                    <div className="glassmorphism w-full h-3/4 flex flex-col items-center p-2 space-y-2">
                        <div className="text-adminDarkBlue font-bold text-xl border-b-2 border-b-glassStroke w-full text-center pb-2">
                            {selectedRole
                                ? "Apercu pour  " + selectedRole
                                : "Veuillez selectionner un rôle"}
                        </div>
                        <div className="w-full flex flex-col items-center overflow-y-auto">
                            {selectedPerms.map((permission) => (
                                <>
                                    <div
                                        key={permission.id}
                                        className="w-full text-primGrey"
                                    >
                                        {permission.name}
                                    </div>
                                </>
                            ))}
                        </div>
                        <div
                            className="py-1 tracking-wider rounded-full bg-primGrey text-center px-8 text-adminLightPink text-xl border-2 border-glassStroke hover:text-adminAquaBlue hover:glassmorphism"
                            onClick={() => {
                                executeAction();
                            }}
                        >
                            {modifyType === "def"
                                ? "Définir les permissions"
                                : "Modifier les permissions"}
                        </div>
                        {/*A faire apres -> bouton pour valider les modifs encours ( avec ecran de cecheck etc) */}
                    </div>
                    <div className="glassmorphism w-full h-1/4 flex flex-col items-center p-2">
                        <div className="text-adminDarkBlue font-bold text-xl border-b-2 border-b-glassStroke w-full text-center pb-2">
                            Selectonnez un rôle pour voir l'aperçu et modifer
                        </div>
                        {/* AJOUTER UN DROPDOWN AVEC LES props.roles qui modifie le usestate currentRole*/}
                        <div className="w-full h-full space-y-2 justify-center items-center flex flex-col">
                            <Select
                                className="w-full p-2 rounded-f focus:ring-0 border-none text-adminAquaBlue z-50"
                                defaultValue={roles[1]}
                                options={roles}
                                onChange={(e) => setSelectedRole(e.label)}
                            />
                            {/*A faire apres -> ajouter un bouton de selecteur de mode de modif : def , edit */}
                            <div className="flex flex-row w-full items-center justify-center">
                                <div
                                    className={`w-60 text-center font-bold text-xl hover:glassmorphism ${
                                        modifyType === "def"
                                            ? "text-adminAquaBlue border-2 rounded-full border-adminAquaBlue"
                                            : "text-adminDarkBlue"
                                    }`}
                                    onClick={() => setModifyType("def")}
                                >
                                    Definition
                                </div>
                                <div
                                    className={`w-60 text-center font-bold text-xl hover:glassmorphism ${
                                        modifyType === "edit"
                                            ? "text-adminAquaBlue border-2 rounded-full border-adminAquaBlue"
                                            : "text-adminDarkBlue"
                                    }`}
                                    onClick={() => setModifyType("edit")}
                                >
                                    Modification
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
