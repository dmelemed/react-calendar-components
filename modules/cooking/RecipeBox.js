import React from 'react'
import ComponentGallery from 'react-component-gallery'
import ImageCard from './ImageCard'

export default class RecipeBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBoxIsFocused: false
        };
    }

    componentDidMount() {
        console.log('mount', this.state);
        this.setState({
            searchBoxIsFocused: this.recipeSearchBox === document.activeElement
        });
        console.log('mount2', this.state);
    }

    render() {
        console.log(this.state);
        const styles = {
            container: {
                marginLeft: '238px',
                marginTop: '44px'
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
                backgroundColor:  this.state.searchBoxIsFocused ? '#FFF' : '#e6e7e3',
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

        // <ComponentGallery>
        //
        // </ComponentGallery>
        // <article style={styles.recipeBoxCard}>
        //     <div>
        //         <a>
        //             <img
        //                 styles={{width: '400px', height: '300px'}}
        //                 height="30%" width="30%"
        //                 src="http://p-fst1.pixstatic.com/53c543922a099a7ddd00c9ec/_w.1500_s.fit_/Tacos-2.jpg"
        //             />
        //         </a>
        //     </div>
        // </article>

        // <ComponentGallery
        //     className="example"
        //     margin={5}
        //     noMarginBottomOnLastRow={true}
        //     targetWidth={200}
        // >
        //     <ImageCard></ImageCard>
        //     <ImageCard></ImageCard>
        //     <ImageCard></ImageCard>
        // </ComponentGallery>

        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <div style={styles.gridWrapper}>
                        <div style={styles.recipeActionsContainer}>
                            <input
                                style={styles.recipeSearchBox}
                                placeholder="Search your recipe box"
                                ref={(ref) => this.recipeSearchBox = ref}
                                onFocus={() => this.setState({searchBoxIsFocused: true})}
                                onBlur={() => this.setState({searchBoxIsFocused: false})}
                            ></input>
                        </div>
                        <div style={styles.recipeBoxContent}>
                            <header>
                                <h1>All Recipes</h1>
                            </header>
                            <section>

                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};