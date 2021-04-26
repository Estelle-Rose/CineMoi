const initialState = {favoriteFilms: []} // on initialise le state du reducer avec le tableau favoritefilms


function toggleFavorite(state = initialState, action) {
    let nextState // permet de respecter le principe d'immuabilité
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmsIndex = state.favoriteFilms.findIndex(item => item.id === action.value.id)
            if (favoriteFilmsIndex !== -1) {
                //si la fonction findindex ne renvoie  pas -1 le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    favoriteFilms: state.favoriteFilms.filter( (item,index) => index !== favoriteFilmsIndex)
                }
            }
            else {
                // sinon on l'ajoute
                nextState = {
                    ...state,
                    favoriteFilms: [ ...state.favoriteFilms, action.value]
                }
            }
            return nextState|| state // si nextstate est undefined on renvoie state
        default:
            return state
    }
}
export default toggleFavorite