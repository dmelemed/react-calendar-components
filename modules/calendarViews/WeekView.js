import React from 'react';
import * as d3 from 'd3';
import calendarUtils from '../CalendarUtils';
import MonthCell from './MonthCell';
import moment from 'moment';
import events from '../../mock-data/events';
import ReactDOM from 'react-dom';
import Modal from '../Modal';
import PieChart from '../PieChart'

const WeekView = React.createClass({

    getInitialState: function () {
        return {
            windowHeight: window.innerHeight,
            top: 0,
            showPieModal: false
        };
    },

    handleResize: function () {
        this.setState({
            windowHeight: window.innerHeight,
            top: ReactDOM.findDOMNode(this).getBoundingClientRect().top
        });
    },

    componentDidMount: function () {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function () {

    },

    render: function () {
        // TODO: get formatted time for left column

        console.log('WeekView state', this.state);
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
                boxSizing: 'border-box',
                textAlign: 'center',
                verticalAlign: 'top'
            },
            dayBoxStyle: {
                backgroundColor: 'AliceBlue',
                position: 'relative',
                borderRightStyle: 'solid',
                borderRightWidth: '0px'
            },
            eventBox: {
                width: '94%',
                position: 'absolute',
                left: '3%',
                backgroundColor: '#2ECC40'
            },
            timeMarkers: {
                width: '5%',
                position: 'relative'
            }
        };

        const hours = [...Array(25)].map((_, i) => i);

        // TODO: refactor
        const hourMarkers = hours.map((hour, i) => {
            // const borderStyle = (i % 2 == 0) ? 'dotted' : 'solid'
            const borderStyle = 'dotted';
            return (
                <div key={i}
                     style={{
                        display: i === 0 ? 'none' : '',
                        height: '0px',
                        width: '90%', border: '1px ' + borderStyle + ' grey',
                        position: 'absolute',
                        left: '5%',
                        top: i * 100 / 24 +'%'
                        }}
                >&nbsp;
                </div>
            );
        });


        const sideMarkers = hours.map((hour, i) => {
            return (
                <div key={i}
                     style={{
                        position: 'absolute',
                        left: '5%',
                        bottom: (24-i) * 100 / 24 +'%'
                        }}
                >
                    {i + ':00'}
                </div>
            );
        });
        const timeMarkers = <td style={styles.timeMarkers}>{sideMarkers}</td>;


        const events = [{
            title: 'Daniel\'s event',
            day: daysInWeek[0],
            startTime: daysInWeek[0].clone().hour(9).minute(30),
            duration: 60
        }, {
            title: 'Early event',
            day: daysInWeek[0],
            startTime: daysInWeek[0].clone().hour(6).minute(15),
            duration: 30
        }];
        const dayBoxes = daysInWeek.map((day, index) => {
            const eventBoxes = events.filter((event)=> {
                return event.day == day;
            }).map((event, index)=> {
                console.log('Event', event);
                const eventBoxStyle = {
                    height: 100 / 24 / 60 * event.duration + '%',
                    top: 100 / 24 * (event.startTime.hour() + event.startTime.minute() / 60) + '%'
                };
                console.log(eventBoxStyle);
                return (
                    <div
                        key={index} style={Object.assign({}, styles.eventBox, eventBoxStyle)}
                    >
                        {event.title}
                    </div>
                );
            });

            console.log('eventBoxes', eventBoxes);
            const dayBoxStyles = {
                height: (this.state.windowHeight - this.state.top) * 2 + 'px'
            };

            return (
                <td key={index}
                    style={Object.assign(styles.dayBoxStyle, dayBoxStyles)}
                >
                    {hourMarkers}
                    {eventBoxes}
                </td>
            );
        });

        const dayOfWeekLabels = daysInWeek.map((moment, index) => {
            return (
                <th key={index} style={styles.dayOfWeekStyle}>{moment.format('ddd M/D')}</th>
            );
        });

        const buffer = <td style={styles.timeMarkers}></td>;
        const onDayBoxClick = () => this.setState({showPieModal: !this.state.showPieModal});


        return (
            <div style={{height: this.state.windowHeight-this.state.top + 'px'}} className="calendarView">
                <table style={Object.assign(styles.tableStyle, {})}>
                    <thead>
                    <tr>
                        {buffer}
                        {dayOfWeekLabels}
                    </tr>
                    </thead>
                </table>
                <div style={{overflowY: 'scroll', height: this.state.windowHeight-this.state.top + 'px'}}>
                    <table style={Object.assign({}, styles.tableStyle, {})}>
                        <tbody style={{}}>
                        <tr onClick={onDayBoxClick}>
                            {timeMarkers}
                            {dayBoxes}
                        </tr>
                        </tbody>
                    </table>
                </div>
                {this.state.showPieModal ? <Modal visible={true}><PieChart></PieChart></Modal> : null}
            </div>
        );
    }

});

export default WeekView;