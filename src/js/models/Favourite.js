import {getFavouriteData as getFB, removeFavouriteData as removeFB, writeFavouriteData as writeFB} from './../firebaseConnection'

export default class Favourite {
    constructor (){
        this.favourites = [];
    };

    addFav (id, item, username = null)  {
        const fav = {
            id: id,
            title: item.title,
            publisher: item.publisher,
            image_url: item.image_url
        };

        this.favourites.push(fav);
        //writeFB(parseInt(item.recipeId), item.title, item.publisher, item.image_url);

        //Saving the favs in local Storage
        //this.persistData();

        if (username)
            writeFB(this.favourites, username);

        return fav;
    }

    containsFav(id){
        return this.favourites.findIndex(elem => elem.id === id);
    }

    deleteFav (id, username = null) {
        const index = this.favourites.findIndex(value => value.id === id);
        this.favourites.splice(index, 1);

        // Deleting the favs in local Storage
        if (username !== null)
            removeFB(id, username);
    }

    getNumberFavs () {
        return this.favourites.length;
    }

    /*persistData(username = null) {
        //localStorage.setItem('fav', JSON.stringify(this.favourites));
        if (username !== null)

    }*/

    async recoverData(username = null) {
        //const storage = localStorage.getItem('fav');

        if (username != null){
            const result = await getFB(username);
            this.favourites = result.map(value => value.value);
        }

        /*if (storage)
            this.favourites = JSON.parse(storage);*/
    }
}