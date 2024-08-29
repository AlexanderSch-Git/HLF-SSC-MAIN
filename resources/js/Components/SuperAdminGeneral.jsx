import {
    faMinus,
    faPlus,
    faSearch,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

export default function SuperAdminGeneral(props) {
    /*console.log("SuperAdminGeneral.jsx");
    console.log("Roles", props.roles);
    console.log("Users", props.users);*/
    //console.log("RoleAssignations", props.roleAssignations);
    /*console.log("Permissions", props.permissions);
    console.log("PermissionAssignations", props.permissionAssignations);
    console.log("User", props.user);*/
    const [currentSelectedUser, setCurrentSelectedUser] = useState(null);
    const [currentSelectedURole, setCurrentSelectedURole] = useState([]);
    const [futurUser, setFuturUser] = useState(null);
    const [futurManager, setManager] = useState(null);
    //methods to handle the selection of a user
    const handleSelectUser = (user) => {
        if (currentSelectedUser && currentSelectedUser.id === user.id) {
            clearSelectUser();
        } else {
            setCurrentSelectedUser(user);
            const key = `${user.id}-${user.name}`;
            const userRoles = props.roleAssignations[key];
            //console.log("User Roles", userRoles);
            setCurrentSelectedURole(userRoles);
        }
    };

    const clearSelectUser = () => {
        setCurrentSelectedUser(null);
        setCurrentSelectedURole([]);
    };
    // ADD sorted user state
    const [sortedUsers, setSortedUsers] = useState(props.users);
    // handle sorting of users
    const handleSortUsers = (sortKey) => {
        // if empty sortkey reset sortedUsers to users
        if (!sortKey) {
            setSortedUsers(props.users);
            return;
        }
        // sort users by sortKey ( remeber to lowercase the sortKey and the user value)
        //  remember we want partial matches so use includes instead of === for the comparison
        const sortedUsers = props.users.filter((user) =>
            user.name.toLowerCase().includes(sortKey.toLowerCase())
        );
        //console.log("Sorted Users", sortedUsers);
        setSortedUsers(sortedUsers);
    };
    // handle adding a role to a user
    const handleAddRole = (role, user) => {
        //only when clicked not use at render time
        //event.preventDefault();
        if (!currentSelectedUser) {
            // use a toast to notify the user that they need to select a user first
            toast.error("Veuillez d'abord sélectionner un utilisateur");
            return;
        }
        console.log("Role", role);
        console.log("User", user);
        //pack the role and user into an object data
        const data = {
            role_id: role.id,
            user_id: user.id,
        };
        router.post("/superadmin/addRoleToUser", { data });
        setCurrentSelectedUser(null);
        toast.success("Role added");
    };
    // handle removing a role from a user
    const handleRemoveRole = (role, user) => {
        //only when clicked not use at render time
        //event.preventDefault();
        if (!currentSelectedUser) {
            // use a toast to notify the user that they need to select a user first
            toast.error("Veuillez d'abord sélectionner un utilisateur");
            return;
        }
        console.log("Role", role);
        console.log("User", user);
        //pack the role and user into an object data
        const data = {
            role_id: role.id,
            user_id: user.id,
        };
        router.post("/superadmin/removeRoleFromUser", { data });
        setCurrentSelectedUser(null);
        setFuturUser(user);
        setManager(user);
        toast.success("Role removed");
    };

    useEffect(() => {
        if (futurUser) {
            setCurrentSelectedUser(null);
            setFuturUser(null);
        }
    }, [currentSelectedUser, setCurrentSelectedUser]);
    return (
        <>
            <div className="h-full w-full flex flex-row space-x-2">
                <div className="glassmorphism w-full h-full p-2 flex flex-col items-center space-y-2">
                    <div className="flex flex-row w-full space-x-4">
                        <div>
                            <h2 className="text-primGrey font-bold text-2xl">
                                Liste des Utilisateurs
                            </h2>
                        </div>
                        <div className="counteredGlass px-4">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-primGrey"
                            />
                            <input
                                type="text"
                                placeholder="Rechercher un utilisateur"
                                // add no border when focused
                                className="bg-transparent  placeholder-adminAquaBlue focus:ring-0 border-none text-primGrey"
                                onChange={(e) =>
                                    handleSortUsers(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <table className="w-full table-fixed border-collapse border-t-2 border-t-glassStroke">
                        <thead>
                            <tr className="border-b-2 border-b-primBlue">
                                <th className="w-1/5">
                                    {" "}
                                    <h2 className="text-primGrey font-bold text-x ">
                                        Nom de l'Utilisateur
                                    </h2>
                                </th>
                                <th className="w-3/5">
                                    <h2 className="text-primGrey font-bold text-xl">
                                        Email associé
                                    </h2>
                                </th>
                                <th className="w-1/5">
                                    <h2 className="text-primGrey font-bold text-xl">
                                        Action disponible
                                    </h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((currentUser) => (
                                <tr
                                    key={
                                        currentUser.id
                                    } /* define classname on a 1px green border if currentSelectedUser &&
                                            currentSelectedUser.id ===
                                                currentUser.id ? */
                                    className={
                                        currentSelectedUser &&
                                        currentSelectedUser.id ===
                                            currentUser.id
                                            ? "border-2 border-green-500"
                                            : ""
                                    }
                                >
                                    <td>
                                        <h2 className="text-primGrey">
                                            {currentUser.name}
                                        </h2>
                                    </td>
                                    <td>
                                        <h2 className="text-primGrey">
                                            {currentUser.email}
                                        </h2>
                                    </td>
                                    <td>
                                        <div className="hover:bg-adminLightPink transition-colors duration-300 w-full group rounded-lg flex flex-row items-center justify-center">
                                            <button
                                                onClick={() =>
                                                    handleSelectUser(
                                                        currentUser
                                                    )
                                                }
                                            >
                                                {currentSelectedUser &&
                                                currentSelectedUser.id ===
                                                    currentUser.id ? (
                                                    <>
                                                        <div className="flex flex-row justify-start space-x-2 items-center ">
                                                            <FontAwesomeIcon
                                                                icon={faMinus}
                                                                className="text-adminDarkPink group-hover:text-primGrey"
                                                            />
                                                            <h2 className="text-adminLightPink group-hover:text-adminDarkPurple">
                                                                Selection
                                                                Actuelle
                                                            </h2>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-row justify-start space-x-2 items-center">
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            className="text-adminDarkBlue group-hover:text-primGrey"
                                                        />
                                                        <h2 className="text-adminDarkBlue group-hover:text-adminDarkPurple">
                                                            Choisir
                                                        </h2>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="space-y-2 w-4/12 h-full flex flex-col">
                    <div className="glassmorphism w-full h-1/4 flex flex-col justify-end items-center p-2">
                        {currentSelectedUser ? (
                            <>
                                {currentSelectedUser.image ? (
                                    <img
                                        src={currentSelectedUser.image}
                                        alt="User Image"
                                        className="w-20 h-20 rounded-full"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-adminLightBlue flex items-center justify-center text-6xl text-primRed">
                                        {currentSelectedUser.name.charAt(0)}
                                    </div>
                                )}
                                <h2 className="text-primGrey font-bold text-2xl">
                                    {currentSelectedUser.name}
                                </h2>
                                <h2 className="text-primGrey font-bold text-m">
                                    {currentSelectedUser.email}
                                </h2>
                            </>
                        ) : (
                            <>
                                <div className="h-full w-full justify-center items-center flex">
                                    <h2 className="text-adminDarkBlue font-bold text-xl">
                                        Aucun utilisateur selectionné
                                    </h2>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="glassmorphism w-full h-full flex flex-col p-2">
                        {currentSelectedUser ? (
                            <>
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left">
                                                Nom du Rôle
                                            </th>
                                            <th className="text-left">
                                                Attribué
                                            </th>
                                            <th className="text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.roles.map((currentRole) => (
                                            <tr key={currentRole.id}>
                                                <td>{currentRole.name}</td>
                                                <td>
                                                    {
                                                        //If currentSelectedURole && currentSelectedURole.includes(currentRole.name) ? "Oui" : "Non"
                                                        currentSelectedURole &&
                                                        currentSelectedURole.includes(
                                                            currentRole.name
                                                        )
                                                            ? "Oui"
                                                            : "Non"
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        //If currentSelectedURole && currentSelectedURole.includes(currentRole.name) ? "useroutedemote" : "userouteadd"
                                                        currentSelectedURole &&
                                                        currentSelectedURole.includes(
                                                            currentRole.name
                                                        ) ? (
                                                            <>
                                                                <button
                                                                    className="hover:bg-red-200 w-full rounded-lg"
                                                                    onClick={() => {
                                                                        handleRemoveRole(
                                                                            currentRole,
                                                                            currentSelectedUser
                                                                        );
                                                                    }}
                                                                >
                                                                    <div className="flex flex-row justify-start space-x-2 items-center">
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faMinus
                                                                            }
                                                                            className="text-primRed"
                                                                        />
                                                                        <h2 className="text-primRed">
                                                                            Retirer
                                                                        </h2>
                                                                    </div>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className="hover:bg-green-200 w-full rounded-lg"
                                                                    onClick={() => {
                                                                        handleAddRole(
                                                                            currentRole,
                                                                            currentSelectedUser
                                                                        );
                                                                    }}
                                                                >
                                                                    <div className="flex flex-row justify-start space-x-2 items-center">
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faPlus
                                                                            }
                                                                            className="text-green-500"
                                                                        />
                                                                        <h2 className="text-primBlue hover:text-green-500">
                                                                            Ajouter
                                                                        </h2>
                                                                    </div>
                                                                </button>
                                                            </>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <div className="h-full w-full justify-center items-center flex">
                                    <h2 className="text-adminDarkBlue font-bold text-xl">
                                        Aucun utilisateur selectionné
                                    </h2>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
