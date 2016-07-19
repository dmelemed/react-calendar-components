import React, {PropTypes} from 'react';
import HeatMap from './HeatMap';
import classNames from 'classnames';
import CircularProgressBar from './CircularProgressBar'
import lightThemeGreen from '../styles/themes/lightThemeGreen'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// TODO: create activity module
export default class Concept extends React.Component {

    constructor(props) {
        super(props);
        this.styles = {
            actionProgressCard: {display: 'inline-block', margin: 'auto 10px'}
        };
    }

    componentWillMount() {
        this.setState({
            width: 0,
            height: 0
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
                <h1 id="conceptTitle" style={{}}>
                    {title}
                </h1>
                <hr className="activityBreak"/>
                <div style={{display: 'inline-block'}} className="activityContainer">
                    <MuiThemeProvider>
                        <Card expandable={true}>
                            <CardTitle title="Exercise"
                                       titleStyle={{color: '#969696',
                                                    fontSize: '24px',
                                                    marginLeft: '20px'}}
                            />
                            <CardText>
                                <HeatMap
                                    width={800}
                                    height={200}
                                    margin={{
                                      left: 100,
                                      top: 100
                                    }}
                                    boxWidth={20}
                                    boxHeight={20}
                                    containerStyle={{margin: '20px', display: 'inline-block'}}
                                    theme={lightThemeGreen}
                                />
                                <div className="actionCards" style={{display: 'inline-block'}}>
                                    <Card style={this.styles.actionProgressCard}>
                                        <CardText>
                                            <CircularProgressBar minValue={0}
                                                                 maxValue={100}
                                                                 value={66}
                                                                 width="150px"
                                                                 progressFill="#E46A68"
                                                                 progressFillByProgress={lightThemeGreen.progressFillStyles}
                                                                 containerStyle={{margin: '10px'}}
                                                                 bottomLabel={{text: 'This week'}}
                                            />
                                        </CardText>
                                    </Card>
                                    <Card style={this.styles.actionProgressCard}>
                                        <CardText>
                                            <CircularProgressBar minValue={0}
                                                                 maxValue={100}
                                                                 value={45}
                                                                 width="150px"
                                                                 progressFill="#f6cdcc"
                                                                 containerStyle={{margin: '10px'}}
                                                                 bottomLabel={{text: 'Last week'}}
                                            />
                                        </CardText>
                                    </Card>
                                    <Card style={this.styles.actionProgressCard}>
                                        <CardText>
                                            <CircularProgressBar minValue={0}
                                                                 maxValue={100}
                                                                 value={35}
                                                                 width="150px"
                                                                 progressFill="#f6cdcc"
                                                                 containerStyle={{margin: '10px'}}
                                                                 bottomLabel={{text: 'Two weeks ago'}}
                                            />
                                        </CardText>
                                    </Card>

                                </div>
                            </CardText>
                            <CardActions>
                                <FlatButton label="Action1"/>
                                <FlatButton label="Action2"/>
                            </CardActions>
                        </Card>
                    </MuiThemeProvider>
                </div>
                <hr className="activityBreak"/>
                <div className="activityContainer activityContainerOdd">
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
                        containerStyle={{margin: '20px', display: 'inline-block'}}
                        theme={lightThemeGreen}
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
                        containerStyle={{margin: '20px', display: 'inline-block'}}
                        theme={lightThemeGreen}
                    />
                </div>
            </div>
        )
            ;
    }
};