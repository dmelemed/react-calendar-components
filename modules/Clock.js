import React from 'react'
import * as d3 from 'd3'
import moment from 'moment'

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment()
        };
    }

    componentDidMount() {
        this.startTicking();
    }

    startTicking() {
        setInterval(() => {
            console.log(this.state.time);
            this.setState({
                time: moment()
            });
        }, 1);
    }

    render() {
        const now = this.state.time;
        const hour = now.hour(), minute = now.minute(), second = now.second(), millisecond = now.millisecond();
        var dataset = [
            {label: 'Abulia', count: 15},
            {label: 'Betelgeuse', count: 15},
            {label: 'Cantaloupe', count: 30},
            {label: 'Dijkstra', count: 30}
        ];

        // console.log(d3);
        // let arc = d3.arc();

        let chartData = d3.pie()
            .sortValues(function (a, b) {
                return a - b;
            })
            .startAngle(()=> {
                return 2 * Math.PI * 30 / 90;
            })
            .endAngle(()=> {
                return 2 * Math.PI * (1 + 30 / 90);
            })
            .value(d => d.count)(dataset);
        // console.log('ChartData', chartData);
        const colors = ['green', 'blue', 'red', 'orange', 'yellow'];

        const chart = chartData.map((arc, i) => {
            const d = d3.arc()(Object.assign(arc, {innerRadius: 0, outerRadius: 200}));
            return (
                <path
                    className="pieFill"
                    transform="translate(500, 500)"
                    d={d}
                    key={i}
                    fill={colors[i]}
                />
            );
        });

        const label = (
            <text
                x="500"
                y="400"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
            >
                BWF Peace Clock
            </text>);

        const hours = [...Array(24)].map(() => 1);
        const minutes = [...Array(60)].map((_, i) => i);
        const seconds = [...Array(60)].map((_, i) => i);

        let clockData = d3.pie().value(d => d)(hours);

        const clockBorder = clockData.map((arc, i) => {
            const d = d3.arc()(Object.assign(arc, {innerRadius: 200, outerRadius: 250}));
            return (
                <g key={i}>
                    <path
                        transform="translate(500, 500)"
                        d={d} key={i} fill="#DDDDDD"
                        shapeRendering="crispEdges"
                    />
                    <text
                        x="0"
                        y="0"
                        transform={'rotate(' + (i * 360 / 24 - 90)+ ', 500, 500) translate(755, 500) rotate(90)'}
                        fill="#000000"
                        fontWeight="bold"
                        dominantBaseline="middle"
                        textAnchor="middle"
                    >
                        {i}:00
                    </text>
                </g>
            );
        });

        const majorTicks = hours.map((_, hour) => {
            return (
                <line
                    key={hour}
                    x1="730"
                    y1="500"
                    x2="750"
                    y2="500"
                    transform={'rotate(' + (hour * 360 / 24)+ ', 500, 500)'}
                    strokeWidth="2"
                    stroke="black"
                />
            );
        });

        const minorTicks = hours.map((_, hour) => {
            return minutes.map((_, minute) => {
                if (minute % 5 == 0 && minute != 0) {
                    return (
                        <line
                            key={minute}
                            x1="740"
                            y1="500"
                            x2="750"
                            y2="500"
                            transform={'rotate(' + (hour * 360 / 24 + 0.25 * minute)+ ', 500, 500)'}
                            strokeWidth="1"
                            stroke="black"
                        />
                    );
                } else {
                    return null;
                }
            });
        });
        const hourHand = <polygon points="500 500, 540 505, 625 500, 540 495"
                                  transform={'rotate(' + (hour * 360 / 24 + 0.25 * minute - 90)+ ', 500, 500)'}
                                  strokeWidth="3"
                                  stroke="black"
        />
        const minuteHand = <polygon points="500 500, 550 505, 700 500, 550 495"
                                    transform={'rotate(' + (6 * minute - 90) + ', 500, 500)'}
                                    strokeWidth="2"
                                    stroke="black"
        />
        const secondHand = <polygon points="500 500, 502 502, 550 503, 745 500, 600 497, 498 498"
                                    transform={'rotate(' + (6 / 1000 * millisecond + 6 * second - 90) + ', 500, 500)'}
                                    strokeWidth="2"
                                    stroke="black"
        />
        const centerPin = <circle cx="500" cy="500" r="15" fill="#000000"/>

        const secondMarkers = seconds.map((second, i)=> {
            if (second % 5 == 0) {
                return (
                    <text
                        key={second}
                        x="0"
                        y="0"
                        transform={'rotate(' + (second * 360 / 60 - 90)+ ', 500, 500) translate(705, 500) rotate(90)'}
                        fill="#000000"
                        fontWeight="bold"
                        dominantBaseline="middle"
                        textAnchor="middle"
                    >
                        {second}
                    </text>
                );
            } else {
                return null;
            }
        });
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: 'lightblue'}}>
                <svg viewBox="0 0 1000 1000" style={{width: '100%', height: '100%'}}>
                    <g>
                        {chart}
                    </g>
                    <g>
                        {label}
                    </g>
                    <g>
                        {clockBorder}
                        {secondMarkers}
                    </g>
                    <g>
                        {majorTicks}
                        {minorTicks}
                    </g>
                    <g>
                        {hourHand}
                        {minuteHand}
                        {secondHand}
                        {centerPin}
                    </g>
                </svg>
            </div>
        );
    }
};