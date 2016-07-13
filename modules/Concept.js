import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import HeatMap from './HeatMap';
import classNames from 'classnames';
import CircularProgressBar from './CircularProgressBar'

// const {element, node, string} = PropTypes

// Concept.propTypes = {
//     title: string.isRequired,
//     children: element.isRequired,
//     footer: node
// }

export default class Concept extends React.Component {


    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            width: 1000,
            height: 500
        });
    }

    componentDidMount() {
        const width = this.refs.wrapper.offsetWidth,
            height = this.refs.wrapper.offsetHeight;
        console.log(width, height);
        this.setState({
            height: this.refs.wrapper.offsetHeight,
            width: this.refs.wrapper.offsetWidth
        });
        console.log('State', this.state);
    }

    render() {
        const {title} = this.props;

        const classForValue = {
            0: 'heatmap-red-0',
            1: 'heatmap-red-1',
            2: 'heatmap-red-2',
            3: 'heatmap-red-3',
            4: 'heatmap-red-4'
        };

        return (
            <div ref="wrapper">

                <h1 id="conceptTitle" style={{}}>
                    {title}
                </h1>
                <hr className="activityBreak"/>

                <div className="activityContainer">
                    <h1 className="activityTitle">Exercise</h1>
                    <HeatMap
                        width={800}
                        height={200}
                        margin={{
                          left: 100,
                          top: 100
                        }}
                        boxWidth={20}
                        boxHeight={20}
                        classForValue={classForValue}
                        containerStyle={{margin: '20px', display: 'inline-block'}}
                    />
                    <CircularProgressBar minValue={0}
                                         maxValue={100}
                                         value={55} 
                                         width="150px"
                                         progressFill="#E46A68"
                                         containerStyle={{display: 'inline-block', marginRight: '40px', verticalAlign: 'top', float: 'right'}}
                    />
                </div>
                <hr className="activityBreak"/>
                <div className="activityContainerOdd">

                    <h1 className="activityTitle">Sleep</h1>
                    <HeatMap
                        width={this.state.width}
                        height={200}
                        margin={{
                          left: 100,
                          top: 100
                        }}
                        boxWidth={20}
                        boxHeight={20}
                        classForValue={classForValue}
                        containerStyle={{margin: '20px', display: 'inline-block'}}
                    />
                </div>

                <hr className="activityBreak"/>

                <div className="activityContainer">
                    <h1 className="activityTitle">Cleaning</h1>
                    <HeatMap
                        width={this.state.width}
                        height={200}
                        margin={{
                          left: 100,
                          top: 100
                        }}
                        boxWidth={20}
                        boxHeight={20}
                        classForValue={classForValue}
                        containerStyle={{margin: '20px', display: 'inline-block'}}
                    />
                </div>
            </div>
        );
    }
};