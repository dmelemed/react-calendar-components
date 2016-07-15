import React from 'react'
import d3 from 'd3'
import moment from 'moment';

var Chart = React.createClass({
    propTypes: {
        height: React.PropTypes.string.isRequired,
        width: React.PropTypes.string.isRequired,
        margin: React.PropTypes.shape({
            top: React.PropTypes.number,
            bottom: React.PropTypes.number,
            left: React.PropTypes.number,
            right: React.PropTypes.number
        }).isRequired
    },

    render() {
        let {width, height, margin, viewBox, preserveAspectRatio, children} = this.props;

        return (
            <svg className="chartContainer" ref="svg" width={width} height={height} viewBox={viewBox}
                 preserveAspectRatio={preserveAspectRatio}>
                    {children}
            </svg>
        );
    }
});


module.exports = Chart;