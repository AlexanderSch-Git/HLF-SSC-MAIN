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
                <div className="flex flex-row h-full w-full">
                    {/* Menu */}
                    <div className="w-72 bg-white h-full">
                        {/* Menu Items */}
                        {/* Add your menu items here */}
                        <NavBar />
                    </div>

                    {/* Content */}
                    <div className="w-full  bg-gray-300 p-4 h-full">
                        {/* Content Items */}
                        {/* Add your content here */}
                        love
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
