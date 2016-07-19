import React from 'react'
import * as d3 from 'd3'
import moment from 'moment'

export default class Hypnosis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theta: Math.PI/3,
            dthetadt: 0,
            d2thetad2t: 0
        };
    }

    componentDidMount() {
        this.startTicking();
    }

    startTicking() {
        setInterval(() => {
            console.log(this.state);
            this.setState({
                theta: this.state.theta + 0.025*this.state.dthetadt,
                dthetadt: this.state.dthetadt + 0.1*this.state.d2thetad2t,
                d2thetad2t: -0.05*Math.sin(this.state.theta)
            })
            if(this.state.theta > Math.PI/2) {
                this.setState({
                    theta: Math.PI/2
                });
            } else if(this.state.theta < -Math.PI/2) {
                this.setState({
                    theta: -Math.PI/2
                });
            }
        }, 10);
    }

//                             transform={'rotate(' + (hour * 360 / 24 + 0.25 * minute - 90)+ ', 500, 500)'}

    render() {
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: 'lightblue'}}>
                <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%'}}>
                    <line x1="0"
                          y1="20"
                          x2="0"
                          y2="80"
                          transform={'translate(50, 0) rotate(' + (this.state.theta / 2 / Math.PI * 360) + ')'}
                          strokeWidth="3"
                          stroke="black"
                    />

                </svg>
            </div>
        );
    };
};