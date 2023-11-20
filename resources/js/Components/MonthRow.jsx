import DayCardComponent from "./DayCardComponent";
export default function MonthRow({ infos }) {
    //return for each int in infos array a DayCardComponent into a flex row div
    return (
        <>
            {infos.map((day) => (
                <td className="overflow-hidden">
                    <DayCardComponent
                        key={day}
                        day={day}
                        boolToDay={day == new Date().getDate()}
                    />
                </td>
            ))}
        </>
    );
}
