import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CustomDayViewPlugin from "@/Components/CustomDayView";

import Base from "@/Layouts/BaseLayout";
import { useState } from "react";

export default function Welcome(props) {
    // a 3 state variable for the calendar month, week, day
    const [calendarState, setCalendarState] = useState("month");
    const getCalender = () => {
        switch (calendarState) {
            case "month":
                return "Month View";
            case "week":
                return "Week View";
            case "day":
                return "Day View";
            default:
                return "Calendar";
        }
    };

    return (
        <>
            <Base>
                <div className="flex flex-col overflow-hidden h-full w-full">
                    {/*button to switch between month, week, day*/}
                    <div className="flex flex-col h-full w-full bg-white rounded-3xl p-5 overflow-hidden ">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                CustomDayViewPlugin,
                            ]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,day",
                            }}
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
