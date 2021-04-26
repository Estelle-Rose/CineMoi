import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'

import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.page = 0
        this.totalPages = 0
        this.searchedText = ''
    }
    // get films from api
    _loadFilms() {
        this.setState({ isLoading: true });
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results], // = this.state.films.concat(data.results)
                    isLoading: false
                })
            })
                
            
            
        }
    }
    // get text from serach textinput
    _searchTextInputChanged(text) {
        this.searchedText = text;
     
    }
      // get one film
     _displayDetailForFilm = (idFilm) => {
         console.log("Display film with id " + idFilm)
         this.props.navigation.navigate('Film', {idFilm: idFilm
           })
  }
    // recherche de films avec réinitialisation pages,totalPages et films avant nouvelle recherche puis chargement des films
    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, ()=> {
           // console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombres de films : " + this.state.films.length )
            this._loadFilms()
        })
    }
    // display loading spinner
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View styles={styles.loading_container}>
                     <ActivityIndicator size="large" color="#006666"/>
                </View>
            )
        }
    }
  
    render() {
       
        
        return (
            <View style={styles.main_container} >
               
                <TextInput onSubmitEditing={()=> this._searchFilms()} onChangeText={(text)=>this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Titre du film" />
                <Button style={{ height: 50, marginBottom: 30, }} title="Rechercher" onPress={() => { this._searchFilms()}}></Button>
                <FlatList
                    style={{ marginTop: 20, paddingLeft: 10 }}
                    data={this.state.films}
                    //keyExtractor permet d'identifier chaque item de manière unique
                    keyExtractor={(item) => item.id.toString()}
                    // on affiche
                    renderItem={({ item }) => <FilmItem film={item}
                     // on passe la fonction _displaydetail... au component enfant
                    displayDetailForFilm={this._displayDetailForFilm}/>}
                   
                    //gestion pagination
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        
    },
    textinput: {
       
        
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 50,
        bottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Search