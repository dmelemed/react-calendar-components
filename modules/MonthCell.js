import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

export default function MonthCell(props) {

    const { day, today, monthIndex, style, eventStyle, events} = props;
    console.log(props);

    let eventBoxes = events.map((event, eventIndex) => {
        let eventTime = moment(event.date).format('h:mm a')
        return (
            <div key={eventIndex}
                 style={eventStyle}>{eventTime} {event.title ? event.title : '(No title)'}</div>
        );
    });

    let dayBoxesClasses = classNames({
        calendarBox: true,
        todayCalendarBox: today && day.isSame(today, 'day')
    });

    return (
        <td className={dayBoxesClasses} style={style}>
            <table>
                <thead>
                <tr>
                    <td>{day.month() == monthIndex ? day.date() : ''}</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {eventBoxes}
                </tr>
                </tbody>
            </table>
        </td>
    );
};