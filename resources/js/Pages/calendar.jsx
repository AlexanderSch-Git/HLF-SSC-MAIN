import ApplicationLogo from "@/Components/ApplicationLogo";
import MonthRow from "@/Components/MonthRow";
import Guest from "@/Layouts/GuestLayout";
import { Link, Head } from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Base from "@/Layouts/BaseLayout";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Base>
                <div className="flex flex-col overflow-hidden h-full w-full">
                    <h1>Mon Calendrier</h1>
                    {/*headers ( days of the week) in flexboxes */}
                    <div className="flex flex-col h-full w-full bg-white rounded-3xl p-5 overflow-hidden">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            timeZone="UTC+1"
                            height="100%"
                        />
                    </div>
                </div>
            </Base>
        </>
    );
}
