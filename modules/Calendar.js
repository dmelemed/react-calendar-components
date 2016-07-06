import React from 'react'
import d3 from 'd3'
import moment from 'moment'
import classNames from 'classnames'

var Calendar = React.createClass({

    propTypes: {},

    render() {

        let date = moment("2016-01-07", "YYYY-MM-DD"),
            daysInMonth = getDaysInMonth(date);

        // TODO: put in module
        function getDaysInMonth(dayInMonth) {
            let daysInMonth = [],
                startOfMonth = moment(dayInMonth).startOf('month'),
                currentDay = startOfMonth.clone()

            while (currentDay.isSame(startOfMonth, 'month')) {
                daysInMonth.push(currentDay.clone())
                currentDay.add(1, 'day')
            }

            return daysInMonth
        }

        function getWeeksInMonth(dayInMonth) {
            let sampleDay = moment(dayInMonth), first, last;

            // get week number for first day of month
            first = sampleDay.startOf('month').week();
            // get week number for last day of month
            last = sampleDay.endOf('month').week();

            // In case last week is in next year
            if (first > last) {
                last = first + last;
            }
            return last - first + 1;
        }

        function getPaddedDaysOfMonth(daysInMonth) {
            let startOfMonth = daysInMonth[0],
                startDayOfWeek = startOfMonth.day(),
                endOfMonthDayOfWeek = startOfMonth.clone().endOf('month').day(),
                paddedDaysOfMonth = [];

            console.log('START', startDayOfWeek);
            console.log('END', startOfMonth.clone().endOf('month').day());

            for (let i = 0; i < startDayOfWeek; ++i) {
                console.log(i);
                paddedDaysOfMonth.push(null)
            }

            daysInMonth.forEach(day => {
                paddedDaysOfMonth.push(day)
            });

            for (let i = 0; i < (6 - endOfMonthDayOfWeek); ++i) {
                paddedDaysOfMonth.push(null);
            }

            return paddedDaysOfMonth
        }

        const dayBoxStyle = {
            width: '14%',
            height: '100px',
            display: 'inline-block',
            padding: '10px',
            backgroundColor: '#d3d3d3',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#1a2a4f',
            boxSizing: 'border-box'
        };

        let dayBoxes = getPaddedDaysOfMonth(daysInMonth).map((day, index) => {
            return (
                <li key={day ? day.toString() : index} style={dayBoxStyle}>
                    {day ? day.date() : '-'}
                </li>
            );
        });

        const shortenedDaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeekStyle = {
            width: '14%',
            height: '25px',
            display: 'inline-block',
            backgroundColor: '#d3d3d3',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#1a2a4f',
            boxSizing: 'border-box',
            textAlign: 'center'
        };

        let dayOfWeekLabels = shortenedDaysOfWeek.map((dayName, index) => {
            return (
                <li key={index} style={dayOfWeekStyle}>{dayName}</li>
            );
        });


        const ulStyle = {
            padding: '0px'
        };
        
        return (
            <div>
                <h1>Calendar</h1>
                <ul style={ulStyle}>
                    {dayOfWeekLabels}
                    {dayBoxes}
                </ul>
            </div>

        )
    }
});


module.exports = Calendar;