import React from 'react';
import * as d3 from 'd3';
import calendarUtils from '../CalendarUtils';
import MonthCell from './MonthCell';
import moment from 'moment';
import events from '../../mock-data/events';

export default function MonthView(props) {


    const {} = props;

    const styles = {
        dayBoxStyle: {},
        weekRowStyle: {},
        dayOfWeekStyle: {
            height: '25px',
            display: 'table-cell',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#1a2a4f',
            boxSizing: 'border-box',
            textAlign: 'center',
            verticalAlign: 'top'
        },
        tableStyle: {
            width: '100%',
            borderSpacing: '0px',
            tableLayout: 'fixed'
        },
        eventStyle: {
            fontWeight: 'bold',
            fontSize: '12px',
            color: '#0074D9'
        }
    };

    const date = props.date,
        month = date.month(),
        year = date.year(),
        shortenedDaysOfWeek = moment.weekdaysShort(),
        daysByWeekInMonth = calendarUtils.getDaysByWeekInMonth(month, year);

    const dayBoxes = daysByWeekInMonth.map((week, weekIndex) => {
        const daysInWeekBoxes = week.map((day, dayIndex) => {
            const eventsOnDay = calendarUtils.getEventsOnDate(events, day);
            return (
                <MonthCell key={dayIndex} day={day} today={props.today} style={styles.dayBoxStyle}
                           eventStyle={styles.eventStyle} monthIndex={month} events={eventsOnDay}/>
            );
        });
        return <tr style={styles.weekRowStyle} key={weekIndex}>{daysInWeekBoxes}</tr>;
    });


    const dayOfWeekLabels = shortenedDaysOfWeek.map((dayName, index) => {
        return (
            <th key={index} style={styles.dayOfWeekStyle}>{dayName}</th>
        );
    });


    return (
        <div className="calendarView">
            <table style={styles.tableStyle}>
                <thead>
                <tr>{dayOfWeekLabels}</tr>
                </thead>
                <tbody>{dayBoxes}</tbody>
            </table>
        </div>
    );
};