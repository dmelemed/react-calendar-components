import React from 'react';
import * as d3 from 'd3';

// TODO: add props for background color, padding, etc

export default function CircularProgressBar(props) {

    const {minValue, maxValue, value, width, height, innerRadius, outerRadius, progressFill, textSize, textFill, containerStyle} = props,
        progress = (value - minValue) / (maxValue - minValue),
        radiusRatio = (innerRadius && outerRadius) ? innerRadius / outerRadius : 0.8;

    console.log(d3);
    let arc = d3.arc();
    let d = arc({
        innerRadius: 50 * radiusRatio,
        outerRadius: 50,
        startAngle: 0,
        endAngle: 2 * Math.PI * progress
    });

    return (
        <div
            style={Object.assign({ width: width ? width : height, height: height ? height : width}, containerStyle)}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
                <path d={d} transform="translate(50, 50)" fill={progressFill}/>
                <text x="50"
                      y="50"
                      fill={textFill ? textFill : "white"}
                      fontSize={textSize ? textSize : "20px"}
                      textAnchor="middle"
                      alignmentBaseline="middle">
                    {progress * 100}%
                </text>
            </svg>
        </div>
    );
};