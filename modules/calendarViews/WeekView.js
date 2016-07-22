import React from 'react';
import * as d3 from 'd3';
import calendarUtils from '../CalendarUtils';
import MonthCell from './MonthCell';
import moment from 'moment';
import events from '../../mock-data/events';

const WeekView = React.createClass({

    getInitialState: function () {
        return {
            windowHeight: window.innerHeight
        };
    },

    handleResize: function () {
        this.setState({windowHeight: window.innerHeight});
    },

    componentDidMount: function () {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function () {

    },

    render: function () {
        console.log(this.state);
        const {today, date} = this.props,
            week = date.week(),
            month = date.month(),
            year = date.year(),
            shortenedDaysOfWeek = moment.weekdaysShort(),
            daysInWeek = calendarUtils.getDaysOfWeek(week, year);

        const styles = {
            tableStyle: {
                width: '100%',
                borderSpacing: '0px',
                tableLayout: 'fixed',
                height: '100%'
            },
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
            dayBoxStyle: {
                height: this.state.windowHeight + 'px',
                backgroundColor: 'AliceBlue',
                position: 'relative',
                borderRightStyle: 'solid',
                borderRightWidth: '1px'
            }
        };

        const hours = [...Array(24)].map((_, i) => i);

        // TODO: refactor
        const hourMarkers = hours.map((hour, i) => {
            const borderStyle = (i % 2 == 0) ? 'dotted' : 'solid'
            return (
                <div key={i}
                     style={{height: '0px', width: '94%', border: '1px ' + borderStyle + ' grey', position: 'absolute', left: '3%', top: (i+1) * 4 +'%'}}>
                </div>
            );
        });

        const dayBoxes = daysInWeek.map((day, index) => {
            return (
                <td key={index} style={styles.dayBoxStyle}>
                    {hourMarkers}
                </td>
            );
        });

        const dayOfWeekLabels = daysInWeek.map((moment, index) => {
            return (
                <th key={index} style={styles.dayOfWeekStyle}>{moment.format('ddd M/D')}</th>
            );
        });


        return (
            <div className="calendarView">
                {JSON.stringify(daysInWeek)}
                <table style={styles.tableStyle}>
                    <thead>
                    <tr>{dayOfWeekLabels}</tr>
                    </thead>
                    <tbody>
                    <tr>{dayBoxes}</tr>
                    </tbody>
                </table>

            </div>
        );
    }

});

export default WeekView;