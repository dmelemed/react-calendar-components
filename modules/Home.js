import React from 'react'
import CircularProgressBar from './CircularProgressBar'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{backgroundColor: '#3F3F3F', width: '100%', height: '100%'}}>
                <CircularProgressBar minValue={0} maxValue={100} value={50} width="20%" progressFill="#E46A68" containerStyle={{ margin: '40px', display: 'inline-block'}} />
                <CircularProgressBar minValue={0} maxValue={100} value={33.3} width="20%" progressFill="#E46A68" containerStyle={{ margin: '40px', display: 'inline-block'}}/>
                <CircularProgressBar minValue={0} maxValue={100} value={88} width="20%" progressFill="#E46A68" containerStyle={{ margin: '40px', display: 'inline-block'}}/>
            </div>
        );
    }
};