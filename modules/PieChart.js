import React from 'react'
import * as d3 from 'd3'
import moment from 'moment'

export default class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipVisible: false,
            tooltipTop: '0px',
            tooltipLeft: '0px',
            tooltipText: ''
        }
    }

    render() {
        const {
            startAngle,
            endAngle,
            sort,
            value,
            height,
            width
        } = this.props;

        const dataset = [
            {label: 'Abulia', value: 15},
            {label: 'Betelgeuse', value: 15},
            {label: 'Cantaloupe', value: 30},
            {label: 'Dijkstra', value: 30}
        ];

        const _startAngle = startAngle || 0,
            _endAngle = startAngle + 2 * Math.PI || endAngle || 2 * Math.PI,
            _sort = sort,
            _value = value || (d => d.value),
            _width = width || '100%',
            _height = height || '100%';


        let
            chartData = d3.pie()
                .startAngle(()=> {
                    return _startAngle;
                })
                .endAngle(()=> {
                    return _endAngle;
                })
                .sortValues(sort || null)
                .value(_value)(dataset);

        const colors = ['green', 'blue', 'red', 'orange', 'yellow'];

        const tooltip = (
            <text x={this.state.tooltipLeft}
                  y={this.state.tooltipTop}
                  transform="translate(500, 500)"
                  fontSize="22px"
                  fill="#FFFFFF"
                  fontWeight="bold"
                  dominantBaseline="middle"
                  textAnchor="middle"
            >
                {this.state.tooltipText}
            </text>
        );

        const chart = chartData.map((arc, i) => {
            const d = d3.arc()(Object.assign(arc, {innerRadius: 0, outerRadius: 200}));
            console.log(arc);
            return (
                <path
                    className="pieFill"
                    transform="translate(500, 500)"
                    d={d}
                    key={i}
                    fill={colors[i]}
                    onMouseOver={(evt)=>{
                        console.log(evt.target.getBoundingClientRect());
                        const centroid = d3.arc().centroid(arc);
                        console.log(centroid);
                        this.setState({
                            tooltipVisible: true,
                            tooltipLeft: centroid[0],
                            tooltipTop: centroid[1],
                            tooltipText: arc.value
                        });
                    }}
                />
            );
        });

        // const tooltip = (
        //     <div className="d3-tip n"
        //          style={{ position: 'absolute', pointerEvents: 'none', top: this.state.tooltipTop}}>
        //
        //     </div>
        // )

        const hours = [...Array(24)].map((_, i) => 1);
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

        return (
            <div style={{width: _width, height: _height, backgroundColor: 'white'}}>
                <svg viewBox="0 0 1000 1000" style={{width: '100%', height: '100%'}}>
                    <g>
                        {chart}
                        {clockBorder}
                        {tooltip}
                    </g>
                </svg>
            </div>
        );
    }
};