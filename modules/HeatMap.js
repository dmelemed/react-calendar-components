import React from 'react'
import d3 from 'd3'
import moment from 'moment'
import Chart from './Chart'
import classNames from 'classnames'


// TODO: each domain should be a separate svg
// TODO: elements should reside within individual domain
// TODO: pass in dynamic classes as a function
// TODO: accept scaling parameters
// TODO: add legend
// TODO: add labels
// TODO: add dynamic label positions, margins, etc

var HeatMap = React.createClass({

    propTypes: {},

    render() {
        console.log('Rending heatmap');
        let {width, height, margin, viewBox, preserveAspectRatio, children} = this.props;

        var minDate = null,
            maxDate = null;

        // CREATE DATA
        let data = [];
        for (var i = 0; i < 186; i++) {
            // if (i !== 25) {
            data.push({
                date: moment().subtract(i, 'days'),
                value: Math.floor(Math.random() * 5)
            });
            // }
        }
        console.log(data[0].date.valueOf());

        // SORT DATA
        function compareElements(a, b) {
            if (a.date.valueOf() < b.date.valueOf()) return -1;
            if (a.date.valueOf() > b.date.valueOf()) return 1;
            return 0;
        }

        var sorted = data.sort(compareElements);
        console.log('Sorted', sorted);

        // GENERATE DOMAIN / SUBDOMAIN KEYS
        var startKey = this.props.startDate || sorted[0].date,
            endKey = this.props.endDate || sorted[sorted.length - 1].date,
            domain = 'month',
            subDomain = 'day';

        console.log('start', startKey);

        function isInSameDomain(currentKey, otherKey, domain) {
            return moment(currentKey).isSame(moment(otherKey), domain);
        }

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function getWeeksInMonth(dateInMonth) {
            var clonedDate = moment(dateInMonth),
                first,
                last;
            first = clonedDate.startOf('month').week();
            last = clonedDate.endOf('month').week();

            // In case last week is in next year
            if (first > last) {
                last = first + last;
            }
            return last - first + 1;
        }

        // INDEX DATA AS MOMENT DATE
        function indexData(data) {
            var indexedData = [];
            data.forEach((e) => {
                indexedData[e.date] = e;
            });
            return indexedData;
        }

        var indexedData = indexData(data);

        console.log(indexedData);

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
            let domainKey = moment(key).startOf(domain);
            // console.log('Domain', domainKey);
            var dataItem = indexedData[key] || {
                    date: key,
                    value: 0
                };
            // console.log('Data item', dataItem, key);
            if (!currentDomain || !domainKey.isSame(currentDomain, domain)) {
                domainIndex++;
                var columns = getWeeksInMonth(domainKey);
                var domainData = {
                    index: domainIndex,
                    label: months[domainIndex % 12],
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
        var leftLabelWidth = 10;
        let sumX = leftLabelWidth;
        var domainGutter = 2;

        let domains = domainKeys.map((domainData, i) => {
            let width = 140;
            let height = 12 * 7;


            let boxes = domainData.dataSet.map((e, index) => {
                // console.log('E', e);

                if (e) {
                    let y = 12 * e.date.day();
                    let column = e.date.week() - domainData.domainKey.week();
                    // console.log(column, e.date.month());
                    let x = 12 * column;
                    let boxClasses = classNames(`color-github-${e.value}`);

                    return (
                        <g onClick={() => { alert(e.date.toString()); }} key={index}>
                            <rect className={boxClasses} width="10" height="10" x={x} y={y}/>
                        </g>
                    );
                } else {
                    // TODO: missing elements
                }
            });

            let domainWidth = domainData.columns * 12 - 2;
            console.log('DomainWidth', domainWidth);
            sumX += domainWidth + domainGutter;

            return (
                <svg key={i} className="graph-domain" width={domainWidth} height="147" x={sumX - domainWidth}
                     y="0">
                    <svg width={domainWidth} height="147">
                        {boxes}
                    </svg>
                    <text className="graphLabel" y={7 * 12 + 12 } x="1" textAnchor="start"
                          dominantBaseline="middle">
                        {domainData.label}
                    </text>
                </svg>
            );
        });

        var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        let title = days.map((label, i) => {
            return (
                <svg key={i} x="0" y={12*i + 2} height="12">
                    <text className="graphLabel" y="0" x="0" dy="6">
                        {label}
                    </text>
                </svg>
            );
        });


        return (
            <div>
                <p>Hello, World</p>
                <Chart height={height} width={width} margin={margin}>
                    <svg className="react-calendar-heatmap" x="0" y="0">
                        {title}
                        {domains}
                    </svg>
                    <svg className="graph-legend" x="0" y="143" height="10" width="58">
                    </svg>

                </Chart>
            </div>
        );
    }
});


export { HeatMap };