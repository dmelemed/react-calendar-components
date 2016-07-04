import React from 'react'
import d3 from 'd3'
import moment from 'moment'
import HeatMap from './HeatMap'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {open: false};
  }

  render() {

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    var now = moment().toDate().toString();
    return (
        <div>
          <HeatMap
              width={1000}
              height={736}
              margin={{
                left: 100,
                top: 100
              }}
          />
        </div>
    );
  }
}


