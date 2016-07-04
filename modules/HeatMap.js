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
        for (var i = 0; i < 180; i++) {
            if(i !== 25) {
                data.push({
                    date: moment().subtract(i, 'days'),
                    value: Math.floor(Math.random() * 5)
                });
            }
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

        // var domainKeys = [],
        //     domain = 'month',
        //     subDomain = 'day',

        // Before
        let domainIndex = 0,
            indexedData = [];

        // INDEX AS MOMENT DATE
        data.forEach((e) => {
            indexedData[e.date] = e;
        });

        console.log(indexedData);

        // CREATE SUBDOMAIN KEYS
        // From start key to end key
        var subDomainKeys = [],
            currentKey = moment(startKey); // create clone
        while(!currentKey.isAfter(endKey, subDomain)) {
            subDomainKeys.push(currentKey);
            currentKey.add(1, subDomain);
        }
        console.log('SubDomain Keys', subDomainKeys);


        // CREATE DOMAIN KEYS
        // ITERATE OVER DOMAIN FOR SUBDOMAIN KEYS AND PUT MATCHING KEYS IN DOMAIN

        // // TODO: fix off by one
        // console.log('Creating domain keys');
        // while (!isInSameDomain(currentKey, endKey, domain)) {
        //     if (!domainKeys[currentKey.startOf(domain)]) {
        //         domainKeys[currentKey.startOf(domain)] = {
        //             index: domainIndex++,
        //             label: months[domainIndex % 12],
        //             dataKeys: []
        //         };
        //     }
        //     currentKey = currentKey.add(1, domain);
        // }
        // domainKeys[endKey.startOf(domain)] = {
        //     index: domainIndex++,
        //     label: months[domainIndex % 12],
        //     dataKeys = []
        // };
        // console.log(domainKeys);

        // CREATE SUBDOMAIN DATA
        var subDomainKeys = [];
        currentKey = moment(startKey);

        // while (!isInSameDomain(currentKey, endKey, subDomain)) {
        //     let domain = domainKeys[currentKey.startOf(domain)];
        //     let column = e.date.week() - startKey.week();
        //     domain.data.push({
        //         x:  12 * column + (12 + domainGutterSize) * (e.date.month() - startKey.month()),
        //         y: 12 * e.date.day(),
        //         classes: classNames(`color-github-${e.value}`);
        //     });
        // }

        // var isAtFinalKey = function (currentKey) {
        //     console.log(currentKey, endKey, subDomain);
        //     isInSameDomain(currentKey, endKey, subDomain);
        // };
        //
        // // TODO: validate end date is after start date
        // console.log('Getting domain keys');
        // console.log(moment(currentKey).get('day'));
        // console.log(moment(currentKey).week());
        // while (!isAtFinalKey(currentKey)) {
        //     var currentKeyMoment = moment(currentKey);
        //     subDomainKeys[currentKey] = {
        //         domain: 'TODO',
        //         column: 'TODO - ',
        //         row: ''
        //     };
        // }

        //     currentKey = moment(currentKey).add(1, domain);
        // }
        // domainKeys.push(currentKey);
        // console.log('Domain keys', domainKeys.length, domainKeys);

        // console.log('Getting subdomain keys');
        // currentKey = moment(startDate);
        // while (!isInSameDomain(currentKey, endKey, subDomain)) {
        //     subDomainKeys.push(currentKey);
        //     currentKey = moment(currentKey).add(1, subDomain);
        // }
        // subDomainKeys.push(currentKey);

        // console.log('SubDomain keys', subDomainKeys.length, subDomainKeys);

        // ITERATE OVER DATA FOR KEYS TO CREATE MASTER DATA SET
        // ASSIGN TO EACH VALUE ALL PROPERTIES W/ SUBDOMAININDEX AS KEY
        // var domainIndex = 0,
        //     subDomainIndex = 0,
        //     dataset = [];

        // TODO: one loops to map everything


        // CREATE BOXES ON DATA SET
        let domainGutterSize = 2;

        console.log('start', startKey);
        console.log('end', endKey);
        let boxes = sorted.map((e, index) => {
            let y = 12 * e.date.day();
            let column = e.date.week() - startKey.week();
            // console.log(column, e.date.month());
            let x = 12 * column + (12 + domainGutterSize) * (e.date.month() - startKey.month());
            let boxClasses = classNames(`color-github-${e.value}`);

            return (
                <g onClick={() => { alert(e.date.day()); }} key={index}>
                    <rect className={boxClasses} width="10" height="10" x={x} y={y}/>
                </g>
            );
        });

        let DataSet = React.createClass({
            render() {
                return (
                    <svg className="react-calendar-heatmap" x="0" y="0" width="1000" height="147">
                        <rect className="domain-background" width="1000" height="143"/>
                        <svg className="subdomain-background">
                            {boxes}
                        </svg>
                        <text className="graphLabel" y="132.5" x="36" text-anchor="middle" dominant-baseline="middle">
                            1:00
                        </text>
                    </svg>
                );
            }
        });

        return (
            <div>
                <p>Hello, World</p>
                <Chart height={height} width={width} margin={margin}>
                    <svg className="graph" x="0" y="0">
                        <DataSet>

                        </DataSet>
                    </svg>
                    <svg className="graph-legend" x="0" y="143" height="10" width="58">
                    </svg>

                </Chart>
            </div>
        );
    }
});


module.exports = HeatMap;