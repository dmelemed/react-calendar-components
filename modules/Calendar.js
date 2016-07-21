import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import MonthView from './calendarViews/MonthView';
import events from '../mock-data/events';
import WeekView from './calendarViews/WeekView';
export const Calendar = React.createClass({

    propTypes: {},

    getInitialState() {
        console.log('Events', events);
        return {
            today: moment(),
            date: moment().startOf('month').add(10, 'day'),
            view: 'month'
        };
    },

    componentDidMount() {
        // PUT AJAX CALL HERE
    },

    updateView(view) {
        console.log('Setting view to', view);
        if (this.state.view != view) {
            this.setState({
                view: view
            });
        }
    },

    render() {

        console.log('state', this.state);
        console.log('Date', this.state.date);

        const date = this.state.date;

        const calendarView = {
            MONTHLY: <MonthView date={this.state.date} today={this.state.today} events={events}/>,
            WEEKLY: <WeekView date={this.state.date} today={this.state.today} events={events}/>,
            DAILY: <MonthView date={this.state.date} today={this.state.today} events={events}/>,
            AGENDA: <MonthView date={this.state.date} today={this.state.today} events={events}/>
        };

        const views = {
            MONTH: 'month',
            WEEK: 'week',
            DAY: 'day',
            AGENDA: 'agenda'
        };

        const VIEWS = {
            [views.MONTH]: {
                name: 'MONTH',
                calendarView: calendarView.MONTHLY
            },
            [views.WEEK]: {
                name: 'WEEK',
                calendarView: calendarView.WEEKLY
            },
            [views.DAY]: {
                name: 'DAY',
                calendarView: calendarView.DAILY
            },
            [views.AGENDA]: {
                name: 'AGENDA',
                calendarView: calendarView.AGENDA
            }
        };

        const viewButtons = Object.keys(views).map((key, i) => {
            const view = views[key];
            return (
                <button
                    key={i}
                    style={{display: 'inline-block', margin: '10px'}}
                    className="btn btn-primary"
                    type="button"
                    onClick={this.updateView.bind(null, view)}
                >
                    {view.toUpperCase()}
                </button>
            );
        });

        return (
            <div style={{height: '100%'}}>
                <h1>Calendar</h1>
                <div style={{display: 'inline-block', width: '33%', textAlign: 'left'}}>
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
                <div style={{display: 'inline-block', width: '33%', textAlign: 'center', verticalAlign: 'bottom'}}>
                    <h2>{date.format('MMMM YYYY')}</h2>
                </div>
                <div style={{display: 'inline-block', width: '33%', verticalAlign: 'bottom'}}>
                    <div style={{float: 'right'}}>
                        {viewButtons}
                    </div>
                </div>
                {VIEWS[this.state.view].calendarView}
            </div>
        );
    },

    handleClick: function (action) {
        if (action === 'L') {
            this.setState({
                date: this.state.date.clone().subtract(1, 'month')
            });
        } else if (action === 'R') {
            this.setState({
                date: this.state.date.clone().add(1, 'month')
            });
        } else if (action == 'TODAY') {
            this.setState({
                date: moment()
            });
        }
    }
});