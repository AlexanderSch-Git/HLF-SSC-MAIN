import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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
                    <h1>Mon Calendrier</h1>
                    {/*button to switch between month, week, day*/}

                    <div className="flex flex-col h-full w-full bg-white rounded-3xl p-5 overflow-hidden">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay",
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
{
    /*<div className="flex flex-row">
                        <button
                            className=" text-white font-bold py-2 px-4 rounded"
                            // if the calendarState is month then the button is blue
                            // else it is white
                            style={
                                calendarState == "month"
                                    ? {
                                          backgroundColor: "#3b82f6",
                                          color: "#ffffff",
                                      }
                                    : {
                                          backgroundColor: "#ffffff",
                                          color: "#000000",
                                      }
                            }
                            onClick={() => setCalendarState("month")}
                        >
                            Month
                        </button>
                        <button
                            className=" text-white font-bold py-2 px-4 rounded"
                            // if the calendarState is month then the button is blue
                            // else it is white
                            style={
                                calendarState == "week"
                                    ? {
                                          backgroundColor: "#3b82f6",
                                          color: "#ffffff",
                                      }
                                    : {
                                          backgroundColor: "#ffffff",
                                          color: "#000000",
                                      }
                            }
                            onClick={() => setCalendarState("week")}
                        >
                            Week
                        </button>
                        <button
                            className=" text-white font-bold py-2 px-4 rounded"
                            // if the calendarState is month then the button is blue
                            // else it is white
                            style={
                                calendarState == "day"
                                    ? {
                                          backgroundColor: "#3b82f6",
                                          color: "#ffffff",
                                      }
                                    : {
                                          backgroundColor: "#ffffff",
                                          color: "#000000",
                                      }
                            }
                            onClick={() => setCalendarState("day")}
                        >
                            Day
                        </button>
                    </div>*/
}
