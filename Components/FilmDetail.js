import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import {connect} from 'react-redux'
import { getFilmById } from '../API/TMDBApi'
import { getIMageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
        this.idFilm = ''
    }
   
     // display loading spinner
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View styles={styles.loading_container}>
                    <ActivityIndicator size="large" color="#006666" style={{ marginTop: 60 }}/>
                </View>
            )
        }
    }
    componentDidMount() {
          this.idFilm = this.props.route.params.idFilm
        getFilmById(this.idFilm)
            .then(data => {
                
                this.setState({
                    isLoading: false,
                    film: data
                })
                
            }
        )
    }
    _displayGenres() {
         const genres = this.state.film.genres
        for (genre in genres) {
            return genre.name +'/'
        }
    }
    _displayFilm() {
        const film = this.state.film
        
       
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollView_container}>
                    <Image style={styles.image}
                         source={{ uri: getIMageFromApi(film.backdrop_path) }} 
                    ></Image>
                    <View style={styles.content_container}>
                        <Text style={styles.title_text}>{ film.title}</Text>
                        <Text style={styles.description_text}>{ film.overview}</Text>
                        
                    </View>
                    <View style={styles.bottom_container}>
                        <Text style={styles.data_text}>Sorti le { moment(film.release_date).format("DD/MM/YYYY")}</Text>
                        <Text style={styles.data_text}>Note : { film.vote_average}</Text>
                        <Text style={styles.data_text}>Nombre de votes : { film.vote_count}</Text>
                        <Text style={styles.data_text}>Genre(s) : : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
                       </Text>
                        <Text style={styles.data_text}>Compagnie(s): {film.production_companies.map(function(company){
                            return company.name;
                            }).join(" / ")}</Text>
                        <Text style={styles.data_text}>Budget : { numeral(film.budget).format('0,0[.]00 $')} </Text>
                      
                        
                    </View>

                </ScrollView>
            )
        }
    }
     render() {
        console.log(this.props)
        return (
            <View style={styles.main_container}>
                  {this._displayFilm()}
                  {this._displayLoading()}
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
         bottom: 0,
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView_container: {
        flex: 1
    },
    image: {       
        backgroundColor: '#ada8b6',
        margin: 5,
        width: 400,
        height: 180
    },
    content_container: {
        flex: 7
    },
    title_text: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },
    description_text: {
        padding: 5
    },
    bottom_content: {
        flex: 4,
        
    },
    data_text: {
        fontWeight: 'bold',
        marginLeft: 5,
        paddingTop: 6    },
})

// on connecte le state global du store aux props de filmdetail
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetail)
