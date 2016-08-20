import React from 'react'

export default class ImageCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const styles = {
            container: {
                backgroundColor: 'red',
                width: '150px',
                height: '250px'
            }
        };
        return (
            <div style={styles.container}>
            </div>
        );
    }

};