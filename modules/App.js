import React from 'react'
import d3 from 'd3'
import moment from 'moment'
import HeatMap from './HeatMap'
import Calendar from './Calendar'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {open: false};
    }

    render() {

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        var now = moment().toDate().toString();

      /*  <HeatMap
            width={1000}
            height={150}
            margin={{
                left: 100,
                top: 100
              }}/>*/
        return (
            <div>Hello, World</div>
        );
    }
}


