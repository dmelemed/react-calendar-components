import React from 'react';
import d3 from 'd3';
import moment from 'moment';
import classNames from 'classnames';
import calendarUtils from './CalendarUtils';
import MonthCell from './MonthCell';
import events from '../mock-data/events';

export const Calendar = React.createClass({

    propTypes: {},

    getInitialState() {
        console.log('Events', events);
        return {
            today: moment(),
            date: moment().startOf('month').add(10, 'day'),
            view: 'MONTHLY'
        };
    },

    componentDidMount() {
        // PUT AJAX CALL HERE
    },

    render() {
        console.log('state', this.state);

        const styles = {
            dayBoxStyle: {

            },
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

        console.log('Date', this.state.date);

        const date = this.state.date,
            month = date.month(),
            year = date.year(),
            shortenedDaysOfWeek = moment.weekdaysShort(),
            daysByWeekInMonth = calendarUtils.getDaysByWeekInMonth(month, year);

        console.log(daysByWeekInMonth);

        let dayBoxes = daysByWeekInMonth.map((week, weekIndex) => {
            let daysInWeekBoxes = week.map((day, dayIndex) => {
                let eventsOnDay = calendarUtils.getEventsOnDate(events, day);
                return (
                    <MonthCell key={dayIndex} day={day} today={this.state.today} style={styles.dayBoxStyle} eventStyle={styles.eventStyle} monthIndex={month} events={eventsOnDay}/>
                );
            });
            return <tr style={styles.weekRowStyle} key={weekIndex}>{daysInWeekBoxes}</tr>;
        });


        let dayOfWeekLabels = shortenedDaysOfWeek.map((dayName, index) => {
            return (
                <th key={index} style={styles.dayOfWeekStyle}>{dayName}</th>
            );
        });

        return (
            <div>
                <h1>Calendar</h1>
                <div style={{float: 'left'}}>
                    <button style={{display: 'inline-block', margin: '10px'}} className="btn btn-primary"
                            type="button"
                            onClick={this.handleClick.bind(this, 'L')}>&lt;</button>
                    <button style={{display: 'inline-block', margin: '10px'}} className="btn btn-primary"
                            type="button"
                            onClick={this.handleClick.bind(this, 'R')}>&gt;</button>
                    <button style={{display: 'inline-block', margin: '10px'}} className="btn btn-primary"
                            type="button"
                            onClick={this.handleClick.bind(this, 'TODAY')}>Today
                    </button>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h2 style={{display: 'inline-block'}}>{date.format('MMMM YYYY')}</h2>
                </div>
                <table style={styles.tableStyle}>
                    <thead>
                    <tr>{dayOfWeekLabels}</tr>
                    </thead>
                    <tbody>{dayBoxes}</tbody>
                </table>
            </div>
        );
    },

    handleClick: function (action) {
        if (action === 'L') {
            this.setState({
                date: this.state.date.subtract(1, 'month')
            });
        } else if (action === 'R') {
            this.setState({
                date: this.state.date.add(1, 'month')
            });
        } else if (action == 'TODAY') {
            this.setState({
                date: moment()
            });
        }
    }
});