import React from 'react';
import * as d3 from 'd3';

// TODO: add props for background color, padding, etc

export default function CircularProgressBar(props) {

    const {minValue, maxValue, value, width, height, innerRadius, outerRadius, progressFill, textSize, textFill, containerStyle} = props,
        progress = Math.round((value - minValue) / (maxValue - minValue) * 100),
        radiusRatio = (innerRadius && outerRadius) ? innerRadius / outerRadius : 0.8,
        strokeWidth = 50 * (1 - radiusRatio),
        modifiedRadius = 50 - strokeWidth,
        circumference = 2 * Math.PI * modifiedRadius;

    // console.log(d3);
    // let arc = d3.arc();
    // let d = arc({
    //     innerRadius: 50 * radiusRatio,
    //     outerRadius: 50,
    //     startAngle: 0,
    //     endAngle: 2 * Math.PI * progress
    // });
    // <path d={d} transform="translate(50, 50)" fill={progressFill}/>

    return (
        <div
            style={Object.assign({ width: width ? width : height, height: height ? height : width}, containerStyle)}>
            <svg id="a" viewBox="0 0 100 100" width="100%" height="100%">
                <circle cx="50"
                        cy="50"
                        r={modifiedRadius}
                        fill="none"
                        stroke={progressFill}
                        strokeDashoffset={circumference / 4}
                        strokeDasharray={(circumference * progress / 100) + ', ' + (circumference * (1 - progress / 100))}
                        strokeWidth={strokeWidth}
                />
                <text x="50"
                      y="50"
                      fill={textFill ? textFill : "white"}
                      fontSize={textSize ? textSize : "20px"}
                      textAnchor="middle"
                      alignmentBaseline="middle">
                    {progress}%
                </text>
            </svg>
        </div>
    );
};