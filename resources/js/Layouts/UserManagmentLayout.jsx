/**
 * Description : Base layout for all pages in the application
 * Text visualization :
 *       ________________
 *      |H  E  A  D  E  R|
 *      |----------------|
 *      |M | CONTENT     |
 *      |E | CONTENT     |
 *      |N | CONTENT     |
 *      |U | CONTENT     |
 *      |----------------|
 *      |F  O  O  T  E  R|
 *       ________________
 *
 * Text view description : Header on TOP, Menu on LEFT, Content on RIGHT, Footer on BOTTOM
 * Using components : Header, Menu, Footer
 * Author : Alexander Schwandes
 */
import ApplicationLogo from "@/Components/ApplicationLogo";
import Header from "@/Components/Header";
import NavBar from "@/Components/NavBar";
import { Link } from "@inertiajs/react";

export default function Base({ children }) {
    return (
        <>
            {/*container*/}
            <div className="flex flex-col h-screen w-screen">
                {/* Header */}
                <Header />
                {/* Container flex , row */}
                <div className="w-full h-full bg-gray-300">
                    {/* Content Items */}
                    {/* Add your content here */}
                    {children}
                </div>
            </div>
        </>
    );
}
