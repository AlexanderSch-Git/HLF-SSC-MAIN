import Header from "@/Components/Header";
import { Link } from "@inertiajs/react";

export default function Admin({ children, titre }) {
    return (
        <>
            {/*container*/}
            <div className="flex flex-col h-screen w-screen overflow-hidden">
                {/* Header */}
                <Header type="admin" titre={titre} />
                {/* Container flex , row */}
                <div className="w-full  bg-gray-300 p-4 h-full overflow-hidden">
                    {/* Content Items */}
                    {/* Add your content here */}
                    {children}
                </div>
            </div>
        </>
    );
}
