import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import { getIMageFromApi } from '../API/TMDBApi'

export default class FilmItem extends Component {
    render() {
        
        const { film, displayDetailForFilm} = this.props;
       
        return (
            <TouchableOpacity
                style={styles.main_container}
                // on passe l'id du film en paramètre
                onPress={() => { displayDetailForFilm(film.id) }}
            >
                
                <Image
                    style={styles.film_image}
                    source={{ uri: getIMageFromApi(film.poster_path) }}                    
                />
           
                <View style={styles.film_content}>
                    <View style={styles.film_header}>
                        <Text style={styles.title_text}> {film.title}</Text>
                        <Text style={styles.vote}> {film.vote_average}</Text>                        
                    </View>
                    <View style={styles.film_description}>
                        <Text style={styles.description_text} numberOfLines={6}> {film.overview}</Text>                            
                    </View>
                    <View style={styles.film_date}>
                      <Text style={styles.date_text}> Sorti le {film.release_date}</Text>                        
                    </View>
                    
                 </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {        
        flexDirection: 'row',
        height: 190,        
    },
    film_image: {       
        backgroundColor: '#ada8b6',
        margin: 5,
        width: 120,
        height: 180
    },
    film_content: {
        flex: 1,
        margin: 5
    },
    film_header: {
        flex: 3,
        flexDirection: 'row',      
    },
    title_text: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 20,
        paddingRight: 5
    },
    vote: {
        fontWeight: 'bold',
        fontSize: 23,
        color: '#ada8b6'
    },
    film_description: {
        flex: 7        
    },
    description_text: {
        fontStyle: 'italic',       
        color: '#ada8b6'
    },
    film_date: {
        flex: 1             
    },
    date_text: {
    textAlign: 'right',
        fontSize: 14
    }
})
