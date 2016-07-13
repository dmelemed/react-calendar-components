import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import HeatMap from './HeatMap';
import classNames from 'classnames';

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

        return (
            <div ref="wrapper">
                <h1 id="conceptTitle">
                    {title}
                </h1>
                <div>
                    <h1 className="activityTitle">Activity 1</h1>
                    <HeatMap
                        width={this.state.width}
                        height={this.state.height}
                        margin={{
                          left: 100,
                          top: 100
                        }}/>
                </div>
            </div>
        );
    }
};