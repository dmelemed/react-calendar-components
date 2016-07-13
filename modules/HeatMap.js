import React from 'react'
import d3 from 'd3'
import moment from 'moment'
import Chart from './Chart'
import classNames from 'classnames'
import calendarUtils from './CalendarUtils'


// TODO: each domain should be a separate svg
// TODO: elements should reside within individual domain
// TODO: pass in dynamic classes as a function
// TODO: accept scaling parameters
// TODO: add legend
// TODO: add labels
// TODO: add dynamic label positions, margins, etc
// https://www.npmjs.com/package/react-moment-proptypes

var HeatMap = React.createClass({

    // which margin
    // domain: React.PropTypes.oneOf('day', 'month')

    propTypes: {
        boxWidth: React.PropTypes.number,
        boxHeight: React.PropTypes.number,
        classes: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            boxWidth: 10,
            boxHeight: 10,
            domainGutter: 2,
            subDomainGutter: 2,
            domain: 'month',
            subDomain: 'day'
        };
    },

    render() {
        console.log('Rending heatmap');
        let {containerStyle, classForValue, margin, minDate, maxDate, width, height, domainGutter, subDomainGutter, boxHeight, boxWidth, viewBox, preserveAspectRatio, children} = this.props;
        console.log('HeatMap props', this.props);

        // TODO: move to heatmap utils?
        function getBoxesPerColumn(domain) {
            switch (domain) {
                case 'month':
                    return (subDomain == 'day') ? 7 : 6;
                default:
                    return 7;
            }
        }

        const boxesPerColumn = getBoxesPerColumn(domain),
            bottomLabelMargin = 12; // margin between bottom of data boxes and bottom label

        // CREATE DATA
        const data = [],
            duration = (minDate && maxDate) ? minDate.diff(maxDate, 'days') : 195;
        for (var i = 0; i < duration; i++) {
            data.push({
                date: moment().subtract(i, 'days'),
                value: Math.floor(Math.random() * 5)
            });
        }
        console.log('Unsorted data', data);

        // SORT DATA
        let sorted = data.sort((a, b) => {
            return calendarUtils.compareElements(a.date, b.date);
        });
        console.log('Sorted heatmap data', sorted);

        // GENERATE DOMAIN / SUBDOMAIN KEYS
        let startKey = this.props.startDate || sorted[0].date,
            endKey = this.props.endDate || sorted[sorted.length - 1].date,
            domain = 'month',
            subDomain = 'day';

        console.log('Date range', startKey, endKey);

        function isInSameDomain(currentKey, otherKey, domain) {
            return moment(currentKey).isSame(moment(otherKey), domain);
        }

        // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // INDEX DATA AS MOMENT DATE
        var indexedData = calendarUtils.indexByDate(data);
        console.log('Indexed data', indexedData);

        // CREATE SUBDOMAIN KEYS
        // From start key to end key
        var subDomainKeys = [],
            currentKey = moment(startKey); // create clone

        while (!currentKey.isAfter(endKey, subDomain)) {
            subDomainKeys.push(currentKey);
            currentKey = moment(currentKey).add(1, subDomain);
        }

        // CREATE DOMAIN KEYS
        var domainKeys = [],
            domainIndex = -1,
            currentDomain = null;
        subDomainKeys.forEach((key, i) => {
            // console.log('Element', key, i);
            let domainKey = moment(key).startOf(domain),
                dataItem = indexedData[key] || {
                        date: key,
                        value: 0
                    };
            // console.log('Data item', dataItem, key);
            if (!currentDomain || !domainKey.isSame(currentDomain, domain)) {
                domainIndex++;
                let columns = calendarUtils.getNumberOfWeeksInMonth(domainKey);
                let domainData = {
                    index: domainIndex,
                    label: domainKey.format('MMM'),
                    dataSet: [dataItem],
                    domainKey: domainKey,
                    columns: columns
                };
                domainKeys.push(domainData);
                currentDomain = domainKey;
            } else {
                domainKeys[domainIndex].dataSet.push(dataItem);
            }
        });

        console.log('Domain keys', domainKeys);

        // ITERATE OVER DOMAIN FOR SUBDOMAIN KEYS AND PUT MATCHING KEYS IN DOMAIN
        var leftLabelWidth = 20; // TODO: should be prop
        let currentX = leftLabelWidth; // TODO: rename

        let domains = domainKeys.map((domainData, i) => {

            let boxes = domainData.dataSet.map((e, index) => {
                // console.log('E', e);

                if (e) {
                    let y = (boxHeight + subDomainGutter) * e.date.day();
                    let column = e.date.week() - domainData.domainKey.week();
                    // console.log(column, e.date.month());
                    let x = (boxWidth + subDomainGutter) * column;
                    // let boxClasses = classNames(`color-github-${e.value}`);
                    const boxClasses = classNames(classForValue[e.value] || '');
                    return (
                        <g onClick={() => { alert(e.date.toString()); }} key={index}>
                            <rect className={boxClasses} width={boxWidth} height={boxHeight} x={x} y={y}/>
                        </g>
                    );
                } else {
                    // TODO: missing elements
                }
            });

            // TODO: check math
            let domainWidth = domainData.columns * (boxWidth + subDomainGutter) - subDomainGutter + domainGutter;
            currentX += domainWidth + domainGutter;
            const domainHeight = (boxHeight * subDomainGutter) * boxesPerColumn;

            // TODO: refactor x="1" for label text
            return (
                <svg key={i} className="graph-domain" x={currentX - domainWidth} y="0">
                    <svg width={domainWidth}
                         height={domainHeight}>
                        {boxes}
                    </svg>
                    <text className="graphLabel"
                          y={boxesPerColumn * (boxHeight + subDomainGutter) + bottomLabelMargin }
                          x="1"
                          textAnchor="start"
                          dominantBaseline="middle">
                        {domainData.label}
                    </text>
                </svg>
            );
        });

        // TODO: load domain / subdomain info in separate functions
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const leftLabel = <svg id="leftLabelContainer" x="0" y="0" width={leftLabelWidth}
                               height={(boxHeight * subDomainGutter) * boxesPerColumn}>
            {days.map((label, i) => {
                return (
                    <text key={i}
                          className="graphLabelLeft"
                          x={leftLabelWidth / 2}
                          y={(boxHeight + subDomainGutter)*i + subDomainGutter}
                          dy={(boxHeight + subDomainGutter) / 2 }
                          textAnchor="middle"
                          dominantBaseline="middle">
                        {label}
                    </text>
                );
            })}
        </svg>;

        // <svg className="graph-legend" x="0" y="143" height="10" width="58" />

        return (
            <div className="heatmapContainer" style={containerStyle}>
                <Chart height={height} width={width} margin={margin} viewBox={'0 0 ' + width + ' ' + height}>
                    <svg className="react-calendar-heatmap" x="0" y="0">
                        {leftLabel}
                        {domains}
                    </svg>
                </Chart>
            </div>
        );
    }
});

export default HeatMap;