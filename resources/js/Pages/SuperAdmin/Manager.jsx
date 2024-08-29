import ApplicationLogo from "@/Components/ApplicationLogo";
import SuperAdminGeneral from "@/Components/SuperAdminGeneral";
import SuperAdminRolePerm from "@/Components/SuperAdminRolePerm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Base from "@/Layouts/BaseLayout";
import {
    faBell,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//declare defaut fonction
/* remember here is how it's called from controller :
//6 - make inertia render the page (don't forget to pass the variables)
        return Inertia::render('SuperAdmin/Manager', [
            'roles' => $roles,
            'users' => $users,
            'roleAssignations' => $roleAssignations,
            'permissions' => $permissions,
            'permissionAssignations' => $permissionAssignations
        ]);
*/
/*export default function Manager({
    roles,
    users,
    roleAssignations,
    permissions,
    permissionAssignations,
    user,
}) {*/
export default function Manager(props) {
    //log all the variables passed from controller to check if they are passed correctly
    /*console.log("Manager.jsx");
    console.log("Roles", props.roles);
    console.log("Users", props.users);
    console.log("RoleAssignations", props.roleAssignations);
    console.log("Permissions", props.permissions);
    console.log("PermissionAssignations", props.permissionAssignations);
    console.log("User", props.user);*/
    const [currentView, setCurrentView] = useState("General");
    return (
        <>
            {/*Titre*/}
            <Head title="Manager" />
            {/*Toast container*/}
            <div className="absolute top-4 right-4 z-10">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
            {/*Page*/}
            <div className="h-screen w-screen bg-gradient-radial from-adminDarkPink to-adminDarkBlue flex">
                {/*LEFT SIDE */}
                <div className="flex flex-col w-1/5 h-screen">
                    <div className="h-32 w-full items-center justify-center pl-8 pt-4">
                        <ApplicationLogo />
                    </div>
                    <div className="h-full pl-8">
                        <div
                            className="w-full hover:text-adminAquaBlue"
                            onClick={() => {
                                setCurrentView("General");
                            }}
                        >
                            General
                        </div>
                        <div
                            className="w-full hover:text-adminAquaBlue"
                            onClick={() => {
                                setCurrentView("Permissions");
                            }}
                        >
                            Permissions
                        </div>
                    </div>
                </div>
                <div className="flex h-screen w-4/5 flex-col">
                    <div className="h-32 w-full flex flex-row-reverse items-center px-8">
                        <div className=" p-3 rounded-2xl space-x-2 flex flex-row items-center justify-center glassmorphism w-fit h-fit px-8">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-l capitalize font-bold text-primGrey"
                            />
                            <h2 className="text-l capitalize font-bold text-primGrey">
                                {
                                    // get user.name , troncate to first part before space
                                    props.user.name.split(" ")[0]
                                }
                            </h2>
                        </div>
                    </div>
                    <div className="max-h-[calc(100vh-8rem)] h-full w-full pr-8 pb-8">
                        {currentView === "General" ? (
                            <>
                                <SuperAdminGeneral {...props} />
                            </>
                        ) : currentView === "Permissions" ? (
                            <>
                                <SuperAdminRolePerm {...props} />
                            </>
                        ) : (
                            <>ca existe pas encore</>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
/*
<div className="w-1/5 flex flex-col">

                    <div className="h-full w-full flex flex-col">

                    </div>
                </div>
                <div className="flex flex-col w-4/5 max-h-full h-full">
                    <div className="h-24 w-full flex flex-row-reverse items-center">

                    </div>

                </div>
                */
