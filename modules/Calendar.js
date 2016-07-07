import React from 'react'
import d3 from 'd3'
import moment from 'moment'
import classNames from 'classnames'
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconButton from 'material-ui/IconButton';

var Calendar = React.createClass({

    propTypes: {},

    render() {

        let date = moment("2016-01-07", "YYYY-MM-DD");

        // TODO: put in module
        function getNumberOfWeeksInMonth(dayInMonth) {
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

        function getFirstDayInWeek(week, year) {
            return moment().year(year).week(week).startOf('week');
        }

        function getDaysOfWeek(week, year) {
            let firstDayInWeek = getFirstDayInWeek(week, year),
                currentDay = firstDayInWeek.clone(),
                daysOfWeek = [];
            while (currentDay.isSame(firstDayInWeek, 'week')) {
                daysOfWeek.push(currentDay.clone());
                currentDay.add(1, 'day');
            }
            return daysOfWeek;
        }

        function getDaysByWeekInMonth(month, year) {
            let dayInMonth = moment().year(year).month(month),
                startWeek = dayInMonth.startOf('month').week(),
                endWeek = dayInMonth.endOf('month').week(),
                daysByWeek = [];
            for (let week = startWeek; week <= endWeek; ++week) {
                daysByWeek.push(getDaysOfWeek(week, year));
            }
            return daysByWeek;
        }

        console.log(getDaysByWeekInMonth(0, 2016));

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

        const weekRowStyle = {}

        let dayBoxes = getDaysByWeekInMonth(0, 2016).map((week, weekIndex) => {

            let daysInWeekBoxes = week.map((day, dayIndex) => {
                return (
                    <td key={dayIndex} style={dayBoxStyle}>{day.month() == 0 ? day.date() : '-'}</td>
                );
            });

            return <tr style={weekRowStyle} key={weekIndex}>{daysInWeekBoxes}</tr>;

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
                <td key={index} style={dayOfWeekStyle}>{dayName}</td>
            );
        });


        const ulStyle = {
            padding: '0px'
        };

        const tableStyle = {
            width: '100%',
            borderSpacing: '0px'
        };

        // TODO: make dyanmic
        let monthLabel = 'January',
            year = 2016;

        const styles = {
            smallIcon: {
                width: 36,
                height: 36,
            },
            mediumIcon: {
                width: 48,
                height: 48,
            },
            largeIcon: {
                width: 60,
                height: 60,
            },
            small: {
                width: 72,
                height: 72,
                padding: 16,
            },
            medium: {
                width: 96,
                height: 96,
                padding: 24,
            },
            large: {
                width: 120,
                height: 120,
                padding: 30,
            },
        };

        // <RaisedButton><HardwareKeyboardArrowRight style={{display: 'block', transform: 'translateY(25%)', margin: 'auto', fill: 'red'}} /></RaisedButton>

        return (
            <div>
                <h1>Calendar</h1>
                <div style={{textAlign: 'center'}}>
                    <div style={{float: 'left'}}>
                        <IconButton iconStyle={styles.smallIcon}
                                     style={styles.small}><HardwareKeyboardArrowLeft /></IconButton>
                        <IconButton iconStyle={styles.smallIcon}
                                    style={styles.small}><HardwareKeyboardArrowRight /></IconButton>
                    </div>
                    <div><h2>{monthLabel} {year}</h2></div>
                    <div style={{float: 'right'}}>
                        <IconButton iconStyle={styles.smallIcon}
                                    style={styles.small}><HardwareKeyboardArrowLeft /></IconButton>
                        <IconButton iconStyle={styles.smallIcon}
                                    style={styles.small}><HardwareKeyboardArrowRight /></IconButton>
                    </div>
                </div>
                <table style={tableStyle}>
                    <thead>
                    <tr>{dayOfWeekLabels}</tr>
                    </thead>
                    <tbody>{dayBoxes}</tbody>
                </table>
            </div>
    );
    }
    })

    module.exports = Calendar;