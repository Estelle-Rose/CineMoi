

const API_TOKEN = 'e358c381625deb1ca5d0b55142333004';

export function getFilmsFromApiWithSearchedText(text,page) {
    
    const url = 'https://api.themoviedb.org/3/search/movie/?api_key=' + API_TOKEN + '&language=fr&query=' + text +'&page=' +page
    
    return fetch(url)
        .then((response) => response.json())
        .catch((error)=> console.log(error) )
}
export function getIMageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300/' + name
}

export function getFilmById(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id +'?api_key=' + API_TOKEN + '&language=fr'
    return fetch(url)
    .then((response) =>response.json())
    
        .catch((error) => console.log(error))
}