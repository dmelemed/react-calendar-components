import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

export default function MonthCell(props) {

    const {day, today, monthIndex, style, eventStyle, events} = props;

    let eventBoxes = events.map((event, eventIndex) => {
        let eventTime = moment(event.date).format('h:mm a')
        return (
            <tr key={eventIndex}>
                <td
                    style={eventStyle}>{eventTime} {event.title ? event.title : '(No title)'}</td>
            </tr>

        );
    });

    let dayBoxesClasses = classNames({
        calendarBox: true,
        monthViewDayCell: true,
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
                {eventBoxes}
                </tbody>
            </table>
        </td>
    );
};