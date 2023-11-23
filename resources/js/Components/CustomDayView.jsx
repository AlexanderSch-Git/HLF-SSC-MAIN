import { createPlugin, sliceEvents } from "@fullcalendar/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

const CustomDayView = ({ start, end, events }) => (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
        </LocalizationProvider>
    </>
);

const CustomDayViewPlugin = (props) => {
    const events = sliceEvents(props, true);
    const { dateProfile } = props;
    const { currentRange } = dateProfile;

    return (
        <CustomDayView
            events={events}
            start={currentRange.start}
            end={currentRange.end}
        />
    );
};

export default createPlugin({
    name: "day",
    views: {
        day: {
            content: CustomDayViewPlugin,
        },
    },
});
