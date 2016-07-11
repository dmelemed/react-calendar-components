import React from 'react';
import d3 from 'd3';
import moment from 'moment';
import classNames from 'classnames';
import calendarUtils from './CalendarUtils';

var Calendar = React.createClass({

    propTypes: {},

    getInitialState() {
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
        const styles = {
            dayBoxStyle: {
                width: '14%',
                height: '100px',
                display: 'table-cell',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: '#1a2a4f',
                boxSizing: 'border-box'

            },
            weekRowStyle: {},
            dayOfWeekStyle: {
                height: '25px',
                display: 'table-cell',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: '#1a2a4f',
                boxSizing: 'border-box',
                textAlign: 'center'
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

        const events = [{
            date: date.toDate(),
            title: 'Doing things',
            calendarId: '1'
        }, {
            date: date.clone().add(1, 'day').toDate(),
            title: 'Going to gym',
            calendarId: '1'
        }, {
            date: date.clone().add(1, 'day').subtract(4, 'hour').toDate(),
            title: 'Going to work',
            calendarId: '1'
        }, {
            date: date.clone().add(1, 'day').subtract(1, 'hour').toDate(),
            title: 'Cooking',
            calendarId: '1'
        }, {
            date: date.clone().add(7, 'day').toDate(),
            title: 'Busy work',
            calendarId: '1'
        }, {
            date: date.clone().add(5, 'day').toDate(),
            title: 'Busy work',
            calendarId: '1'
        }, {
            date: date.clone().subtract(1, 'day').toDate(),
            title: 'Busy work',
            calendarId: '1'
        }, {
            date: date.clone().subtract(1, 'day').toDate(),
            title: 'Busy work',
            calendarId: '1'
        }, {
            date: date.clone().add(15, 'day').toDate(),
            title: 'Busy work',
            calendarId: '1'
        }, {
            date: date.clone().add(15, 'day').toDate(),
            title: null,
            calendarId: '1'
        }];


        function getEventsOnDate(moment) {
            return events.filter((event) => moment.isSame(event.date, 'day')).sort((a, b) => {
                console.log(a, b);
                if (a.date > b.date) return 1;
                else if (a.date < b.date) return -1;
                else return 0;
            });
        }

        let dayBoxes = daysByWeekInMonth.map((week, weekIndex) => {
            let daysInWeekBoxes = week.map((day, dayIndex) => {
                let eventsOnDay = getEventsOnDate(day);
                let eventBoxes = eventsOnDay.map((event, eventIndex) => {
                    let eventTime = moment(event.date).format('h:mm a')
                    return (
                        <div key={eventIndex}
                             style={styles.eventStyle}>{eventTime} {event.title ? event.title : '(No title)'}</div>
                    );
                });
                // console.log(day, eventsOnDay);
                let dayBoxesClasses = classNames({
                    calendarBox: true,
                    todayCalendarBox: day.isSame(this.state.today, 'day')
                });

                return (
                    <td className={dayBoxesClasses} key={dayIndex} style={styles.dayBoxStyle}>
                        <table>
                            <thead>
                            <tr>
                                <td>{day.month() == month ? day.date() : ''}</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{eventBoxes}</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
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
                    <button style={{display: 'inline-block', margin: '10px'}} className="btn btn-primary" type="button"
                            onClick={this.handleClick.bind(this, 'L')}>&lt;</button>
                    <button style={{display: 'inline-block', margin: '10px'}} className="btn btn-primary" type="button"
                            onClick={this.handleClick.bind(this, 'R')}>&gt;</button>
                    <button style={{display: 'inline-block', margin: '10px'}} className="btn btn-primary" type="button"
                            onClick={this.handleClick.bind(this, 'TODAY')}>Today</button>
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
        } else if(action === 'R') {
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

module.exports = Calendar;