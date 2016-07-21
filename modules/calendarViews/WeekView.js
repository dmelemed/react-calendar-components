import React from 'react';
import * as d3 from 'd3';
import calendarUtils from '../CalendarUtils';
import MonthCell from './MonthCell';
import moment from 'moment';
import events from '../../mock-data/events';

export default function MonthView(props) {


    const {} = props;

    const styles = {
        tableStyle: {
            width: '100%',
            borderSpacing: '0px',
            tableLayout: 'fixed'
        }
    };

    const today = props.today,
        date = props.date,
        week = date.week(),
        month = date.month(),
        year = date.year(),
        shortenedDaysOfWeek = moment.weekdaysShort(),
        daysInWeek = calendarUtils.getDaysOfWeek(week, year);

    // const dayBoxes = daysByWeekInMonth.map((week, weekIndex) => {
    //     const daysInWeekBoxes = week.map((day, dayIndex) => {
    //         const eventsOnDay = calendarUtils.getEventsOnDate(events, day);
    //         return (
    //             <MonthCell key={dayIndex} day={day} today={props.today} style={styles.dayBoxStyle}
    //                        eventStyle={styles.eventStyle} monthIndex={month} events={eventsOnDay}/>
    //         );
    //     });
    //     return <tr style={styles.weekRowStyle} key={weekIndex}>{daysInWeekBoxes}</tr>;
    // });


    const dayOfWeekLabels = daysInWeek.map((moment, index) => {
        return (
            <th key={index} style={{}}>{moment.format('ddd M/D')}</th>
        );
    });


    return (
        <div className="calendarView">
            {JSON.stringify(daysInWeek)}
            <table style={styles.tableStyle}>
                <thead>
                <tr>{dayOfWeekLabels}</tr>
                </thead>
                <tbody></tbody>
            </table>

        </div>
    );
};