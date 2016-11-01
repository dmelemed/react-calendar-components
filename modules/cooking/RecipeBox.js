import React from 'react'
import ComponentGallery from 'react-component-gallery'
import ImageCard from './ImageCard'
import $ from 'jquery'

export default class RecipeBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBoxIsFocused: false,
            searchBoxQuery: '',
            recipes: []
        };
    }

    componentDidMount() {
        console.log('mount', this.state);
        this.setState({
            searchBoxIsFocused: this.recipeSearchBox === document.activeElement
        });
        console.log('mount2', this.state);
        this.getRecipesByQuery(this.state.searchBoxQuery);
        // TODO: get recipes
    }

    getRecipesByQuery(searchString) {
        $.ajax({
            url: 'http://localhost:3000/recipes',
            type: 'GET',
            data: {
                query: searchString
            },
            success: (response) => {
                console.log('Response', response);
                this.setState({
                    recipes: response
                });
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
    }

    recipeSearchBoxOnKeyDown(e) {
        // 13 is Enter
        if (e.keyCode == 13) {
            this.submitSearch();
        }
    }

    submitSearch() {
        const searchString = this.state.searchBoxQuery;
        console.log('Submitting search for', searchString);
        this.getRecipesByQuery(searchString)
    }

    onSearchBoxChange(e) {
        this.setState({
            searchBoxQuery: e.target.value
        });
        console.log(e.target.value);
    }

    render() {
        console.log(this.state);
        const styles = {
            container: {
                marginLeft: '235px',
                marginTop: '44px',
            },
            content: {
                backgroundColor: '#F5F5F5',
                padding: '66px',
                width: '100%',
                minHeight: '100%'
            },
            gridWrapper: {
                margin: 'auto 5%'
            },
            recipeActionsContainer: {
                paddingBottom: '20px',
                borderBottom: '1px solid #A9A9A9'
            },
            recipeBoxContent: {},
            recipeBoxCard: {
                margin: '10 10 22 10'
            },
            recipeSearchBox: {
                backgroundColor: this.state.searchBoxIsFocused ? '#FFF' : '#e6e7e3',
                border: '1px solid #e6e7e3',
                borderRadius: '3px',
                color: '#222',
                display: 'block',
                fontFamily: 'nyt-franklin, Arial, Helvetica, sans-serif',
                fontWeight: 400,
                fontSize: '1.34em',
                height: '40px',
                width: '238px',
                lineHeight: 'normal',
                padding: '10px 24px 10px 12px',
                position: 'relative',
                outline: 'none'
            },
            // TODO: implement icon in span
            clearRecipeSearchIcon: {
                height: '44px',
                right: '-4px',
                position: 'absolute'
            }
        };

        const recipes = [{
            label: '',
            imageUrl: ''
        }];

        const defaultRecipeImageUrl = "https://static01.nyt.com/images/2014/04/01/dining/chimichurri-hanger-steak/chimichurri-hanger-steak-videoSixteenByNine310-v3.jpg";


        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <div style={styles.gridWrapper}>
                        <div style={styles.recipeActionsContainer}>
                            <input
                                style={styles.recipeSearchBox}
                                placeholder="Search your recipe box"
                                ref={(ref) => this.recipeSearchBox = ref}
                                onChange={this.onSearchBoxChange.bind(this)}
                                onFocus={() => this.setState({searchBoxIsFocused: true})}
                                onBlur={() => this.setState({searchBoxIsFocused: false})}
                                onKeyDown={this.recipeSearchBoxOnKeyDown.bind(this)}
                            />
                        </div>
                        <div style={styles.recipeBoxContent}>
                            <header>
                                <h1>All Recipes</h1>
                            </header>
                            <section>
                                {this.state.recipes.map((recipe, index) => {
                                  return <ImageCard key={index} recipe={recipe}/>;
                                })}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};