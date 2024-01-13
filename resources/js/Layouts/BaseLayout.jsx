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
import MonthRow from "@/Components/MonthRow";

export default function Base(props) {
    return (
        <>
            {/*container*/}
            <div className="flex flex-col h-screen w-screen overflow-hidden">
                {/* Header */}
                <Header type="auth" />
                {/* Container flex , row */}
                <div className="flex flex-row h-full w-full overflow-hidden">
                    {/* Menu */}
                    <div className="w-72 bg-white h-full">
                        {/* Menu Items */}
                        {/* Add your menu items here */}
                        <NavBar {...props} />
                    </div>

                    {/* Content */}
                    <div className="w-full  bg-gray-300 p-4 h-full overflow-hidden">
                        {/* Content Items */}
                        {/* Add your content here */}
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}
