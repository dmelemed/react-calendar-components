import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

export default class Modal extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
           visible: props.visible || false
        };
        console.log('Creating modal with state', this.state);

    }

    toggleVisibility() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        var {children, opacity, modalSize} = this.props;
        const defaultOpacity = 0.9;
        const defaultModalSize = { width: '80%', height: '80%'}

        const styles = {
            modalWindow: {
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: modalSize ? modalSize.width : defaultModalSize.width,
                height: modalSize ? modalSize.height : defaultModalSize.height,
                transform: 'translateX(-50%) translateY(-50%)',
                opacity: 1,
                zIndex: 3
            },
            defaultModal: {
                width: '500px',
                height: '500px',
                backgroundColor: 'white'
            },
            modalContainer: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '0px',
                left: '0px',
                display: this.state.visible ? 'block' : 'none'
            },
            modalBackground: {
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                position: 'fixed',
                top: '0px',
                left: '0px',
                opacity: opacity || defaultOpacity,
                zIndex: 2
            }
        };

        children = children || (<div style={styles.defaultModal}>
            </div>);

        console.log(children);
        return (
            <div className="modalContainer" style={styles.modalContainer}>
                <div onClick={this.toggleVisibility.bind(this)} style={styles.modalBackground}>&nbsp;</div>
                <div style={styles.modalWindow}>{children}</div>
            </div>
        );
    }

};