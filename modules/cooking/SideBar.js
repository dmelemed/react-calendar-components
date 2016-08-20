import React from 'react'


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var {children, opacity, modalSize} = this.props;

        // TODO: pass top value as prop from parent
        const styles = {
            sidebar: {
                position: 'fixed',
                top: '44px',
                left: 0,
                bottom: 0,
                background: 'rgba(25, 25, 25, 0.97)',
                width: '235px',
                padding: '10px 0 0',
                zIndex: '200',
                letterSpacing: '0.4px'
            },
            // TODO: set maxheight = window side
            innerSidebar: {
                minHeight: '100%',
                maxHeight: '100%',
                padding: '0 20px',
                overflowY: 'auto'
            },
            sidebarHeader: {
                color: '#999',
                fontWeight: 700,
                fontSize: '1.9em',
                lineHeight: 1,
                padding: 0,
                margin: '.8em 0 .6em 0'
            },
            menuItemLeft: {
                textTransform: 'capitalize'
            },
            menuItemText: {
                color: '#FFFFFF'
            },
            menuContainer: {
                borderBottom: '1px solid #999'
            }
        };

        const sidebarMenusConfig = [{
            label: 'Your Activity',
            items: [{
                label: 'Cooked'
            }, {
                label: 'Highly-rated'
            }]
        }, {
            label: 'Your Saved Recipes',
            items: [{
                label: 'All Recipes'
            }, {
                label: 'Main Course'
            }, {
                label: 'Dessert'
            }, {
                label: 'Easy'
            }]
        }];

        const sidebarMenus = sidebarMenusConfig.map((menu, menuIndex) => {
            console.log(menu);
            const menuItems = menu.items.map((menuItem, menuItemIndex) => {
                return (
                    <li style={{listStyleType: 'none'}} key={menuItemIndex}>
                        <a>
                            <span style={styles.menuItemLeft}>
                                <span style={styles.menuItemText}>{menuItem.label}</span>
                            </span>
                            <span style={styles.menuItemRight || {}}></span>
                        </a>
                    </li>
                );
            });
            return (
                <div style={styles.menuContainer} key={menuIndex}>
                    <h2 style={styles.sidebarHeader}>{menu.label || ''}</h2>
                    <ul style={{paddingLeft: '0px'}}>{menuItems}</ul>
                </div>
            );
        });

        return (
            <div style={styles.sidebar}>
                <div style={styles.innerSidebar}>
                    {sidebarMenus}
                </div>
            </div>
        );
    }

};