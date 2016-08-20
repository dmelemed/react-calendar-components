import React from 'react'
import HeaderBar from './HeaderBar'
import Sidebar from './Sidebar'
import RecipeBox from './RecipeBox'

export default class Recipes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var {children, opacity, modalSize} = this.props;

        const styles = {};

        return (
            <div>
                <HeaderBar></HeaderBar>
                <Sidebar></Sidebar>
                <RecipeBox></RecipeBox>
            </div>
        );
    }

};