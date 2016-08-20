import React from 'react'


export default class HeaderBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var {children, opacity, modalSize} = this.props;

        const styles = {
            navbar: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '44px',
                zIndex: 500
            },
            navbarWrap: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            siteHeader: {
                padding: 0,
                fontSize: '26px',
                lineHeight: '0',
                fontFamily: '"nyt-karnak-display-130124", Georgia, "Times New Roman", serif',
                position: 'absolute',
                zIndex: '100',
                top: '50%',
                left: '50%',
                marginTop: '0px',
                marginLeft: '-64px',
                color: '#FFFFFF'
            },
            navbarBackground: {
                backgroundColor: '#e33d26',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 0
            }
        };

        return (
            <nav style={styles.navbar}>
                <div style={styles.navbarWrap}>
                    <h1 style={styles.siteHeader}>Hello, World</h1>
                    <div style={styles.navbarBackground}/>
                </div>
            </nav>
        );
    }

};