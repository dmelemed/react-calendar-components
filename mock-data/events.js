import moment from 'moment';

var date = moment().startOf('month').add(10, 'day');

const events = [{
    date: date.toDate(),
    title: 'Doing things',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().add(1, 'day').toDate(),
    title: 'Going to gym',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().add(1, 'day').subtract(4, 'hour').toDate(),
    title: 'Going to work',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().add(1, 'day').subtract(1, 'hour').toDate(),
    title: 'Cooking',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().add(7, 'day').toDate(),
    title: 'Busy work',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().add(5, 'day').toDate(),
    title: 'Busy work',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().subtract(1, 'day').toDate(),
    title: 'Busy work',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().subtract(1, 'day').toDate(),
    title: 'Busy work',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().add(15, 'day').toDate(),
    title: 'Busy work',
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}, {
    date: date.clone().add(15, 'day').toDate(),
    title: null,
    description: null,
    isFullDayEvent: false,
    categoryId: '1',
    calendarId: '1'
}];

export default events;