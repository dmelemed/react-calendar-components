import moment from 'moment'

var calendarUtils = {
    getNumberOfWeeksInMonth(dayInMonth){
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
    },

    getFirstDayInWeek(week, year){
        return moment().year(year).week(week).startOf('week');
    },

    getDaysOfWeek(week, year) {
        let firstDayInWeek = this.getFirstDayInWeek(week, year),
            currentDay = firstDayInWeek.clone(),
            daysOfWeek = [];
        while (currentDay.isSame(firstDayInWeek, 'week')) {
            daysOfWeek.push(currentDay.clone());
            currentDay.add(1, 'day');
        }
        return daysOfWeek;
    },

    // TODO: fix  bug on december 2017 - now fixed, but not clean
    getDaysByWeekInMonth(month, year){
        let dayInMonth = moment().year(year).month(month);
        console.log(dayInMonth.endOf('month'));
        let
            startWeek = dayInMonth.startOf('month').week(),
            endWeek = dayInMonth.endOf('month').week(),
            daysByWeek = [],
            nextYear = false;

        console.log(dayInMonth, startWeek, endWeek);
        if (endWeek == 1) {
            endWeek = dayInMonth.weeksInYear();
            nextYear = true;
        }
        for (let week = startWeek; week <= endWeek; ++week) {
            daysByWeek.push(this.getDaysOfWeek(week, year));
        }
        if (nextYear) { // next year
            daysByWeek.push(this.getDaysOfWeek(1, year + 1));
        }
        return daysByWeek;
    }
};

export default calendarUtils;