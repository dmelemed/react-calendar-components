import React from 'react';
import Radium from 'radium';
import MdBookmark from 'react-icons/lib/md/bookmark';
var Transition = require('react-inline-transition-group');

// TODO: make generic Card component and separate recipe components
// TODO: consider Radium for styles (manages state for hover, active, etc)
export default class ImageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMouseHovering: false
        };

    }

    toggleMouseHover() {
        this.setState({
            isMouseHovering: !this.state.isMouseHovering
        });
    }

    render() {

        const styles = {
            container: {
                backgroundColor: '#FFF',
                width: '235px',
                height: '278px',
                margin: '10 10 22 10',
                border: '1px solid #e6e6e6',
                boxShadow: this.state.isMouseHovering ? '0 0 15px rgba(0, 0, 0, 0.1)' : 'none',
                display: 'inline-block',
                verticalAlign: 'top'
            },
            imageWrap: {
                position: 'relative',
                height: '157px',
                overflow: 'hidden'
            },
            recipeImageContainer: {
                overflow: 'hidden',
            },
            recipeImage: {
                height: '157px',
                overflow: 'hidden'
            },
            recipeInfo: {
                height: '106px',
                padding: '1em 1em .5em',
                textDecoration: 'none',
                display: 'block',
                backgroundColor: '#FFF'
            },
            recipeHeader: {
                fontSize: '1.42em',
                lineHeight: '1.06em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#000',
                margin: 0
            },
            recipeByline: {
                margin: '0px',
                padding: '3px 0 0 0',
            },
            cardIndicators: {
                position: 'absolute',
                backgroundImage: 'radial-gradient(62px at 0px 100%, #000000 0%, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.6) 10px, transparent 62px)',
                height: '62px',
                width: '140px',
                bottom: '0px',
            },
            recipeCardControls: {
                color: '#222',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '215px',
                height: '62px',
                opacity: 0,
                padding: '0 10',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
                backgroundOrigin: 'content-box'
                // transition: 'all .25s ease-in-out',
                // display: this.state.isMouseHovering ? 'block' : 'none'
            },
            recipeCardControlsAfter: {
                color: '#222',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '215px',
                height: '62px',
                opacity: 1,
                padding: '0 10',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
                backgroundOrigin: 'content-box'
            },
            controlButtons: {},
            leftControlButton: {
                float: 'left',
                height: '62px',
                // width: '75px',
                lineHeight: '80px',
                letterSpacing: '0.3px',
                fontSize: '1.1em',
                padding: 0,
                color: '#fff',
                transition: 'transform .1s linear'
            },
            rightControlButton: {
                float: 'right',
                height: '62px',
                lineHeight: '80px',
                letterSpacing: '0.3px',
                fontSize: '1.1em',
                padding: 0
            },
            recipeSavedText: {
                color: '#FFF',
                position: 'relative',
                // bottom: '-10px',
                transition: 'all 0.25s ease-in-out',
                verticalAlign: 'middle'
            }

        };

        // container
        // cardImage
        // cardAnchor
        return (

            <div style={styles.container}
                 onMouseEnter={this.toggleMouseHover.bind(this)}
                 onMouseLeave={this.toggleMouseHover.bind(this)}>
                <div style={styles.imageWrap}>
                    <a href={this.props.recipe.url}>
                        <div style={styles.recipeImageContainer}>
                            <img
                                style={styles.recipeImage}
                                src={this.props.recipe.ogData.ogImage.url} />
                        </div>
                    </a>
                    <div style={styles.cardIndicators}></div>
                    <div
                        style={this.state.isMouseHovering ? styles.recipeCardControlsAfter : styles.recipeCardControls}>
                        <div style={styles.controlButtons}>
                            <div style={styles.leftControlButton}>
                                {/*<MdBookmark size={30} color='#FFF'/>*/}
                                <div style={styles.recipeSavedText}>Save</div>
                            </div>
                            <div style={styles.rightControlButton}>
                                <div style={styles.recipeSavedText}>Cooked</div>
                            </div>
                        </div>
                    </div>
                </div>
                <a style={styles.recipeInfo}>
                    <h3 style={styles.recipeHeader}>{this.props.recipe.anchor || this.props.recipe.title}</h3>
                    <p style={styles.recipeByline}>thekitchn.com</p>
                </a>
            </div>
        );
    }

};