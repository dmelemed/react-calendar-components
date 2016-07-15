import React from 'react';
import * as d3 from 'd3';

// TODO: add props for background color, padding, etc

export default function CircularProgressBar(props) {

    const {topLabel, bottomLabel, minValue, maxValue, value, width, height, innerRadius, outerRadius, progressFill, textSize, textFill, containerStyle, labelTopFontSize} = props,
        progress = Math.round((value - minValue) / (maxValue - minValue) * 100),
        radiusRatio = (innerRadius && outerRadius) ? innerRadius / outerRadius : 0.8,
        strokeWidth = 45 * (1 - radiusRatio),
        modifiedRadius = 35 - strokeWidth,
        circumference = 2 * Math.PI * modifiedRadius,
        centerX = 50,
        centerY = 50;

    // console.log(d3);
    // let arc = d3.arc();
    // let d = arc({
    //     innerRadius: 50 * radiusRatio,
    //     outerRadius: 50,
    //     startAngle: 0,
    //     endAngle: 2 * Math.PI * progress
    // });
    // <path d={d} transform="translate(50, 50)" fill={progressFill}/>

    let topLabelDOM,
        bottomLabelDOM;

    if (topLabel) {
        topLabelDOM = (<text className="cpbTopText"
                             x={centerX}
                             y="0"
                             textAnchor="middle"
                             alignmentBaseline="hanging"
                             fill="white"
        >{topLabel.text}
        </text>);
    }

    if (bottomLabel) {
        bottomLabelDOM = (<text className="cpbBottomText" x={centerX}
                                y="100"
                                textAnchor="middle"
                                alignmentBaseline="baseline"
                                fill="white"
        >{bottomLabel.text}
        </text>);
    }


    return (
        <div className="cpbContainer"
            style={Object.assign({ width: width ? width : height, height: height ? height : width}, containerStyle)}>
            <svg id="a" viewBox="0 0 100 100" width="100%" height="100%">
                {topLabelDOM}
                {bottomLabelDOM}
                <circle className="cpbFill"
                        cx={centerX}
                        cy={centerY}
                        r={modifiedRadius}
                        fill="none"
                        stroke={progressFill}
                        strokeDashoffset={circumference / 4}
                        strokeDasharray={(circumference * progress / 100) + ', ' + (circumference * (1 - progress / 100))}
                        strokeWidth={strokeWidth}
                />
                <text className="cpbProgressText"
                      x={centerX}
                      y={centerY}
                      fill={textFill ? textFill : "white"}
                      fontSize={textSize ? textSize : "12px"}
                      textAnchor="middle"
                      alignmentBaseline="middle">
                    {progress}%
                </text>

            </svg>
        </div>
    );
};