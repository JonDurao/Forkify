import UniqueId from 'uniqid'
import {removeFavouriteData as removeFB, writeFavouriteData as writeFB} from './../firebaseConnection'

export default class Favourite {
    constructor (){
        this.favourites = [];
    };

    addFav (item) {
        const fav = {
            id: parseInt(item.recipeId),
            title: item.title,
            publisher: item.publisher,
            image_url: item.image_url
        };

        this.favourites.push(fav);
        writeFB(parseInt(item.recipeId), item.title, item.publisher, item.image_url);

        // Saving the favs in local Storage
        this.persistData();

        return fav;
    }

    containsFav(id){
        return this.favourites.findIndex(elem => elem.id === parseInt(id));
    }

    deleteFav (id) {
        const index = this.favourites.findIndex(value => value.id === id);
        this.favourites.splice(index, 1);

        // Deleting the favs in local Storage
        this.persistData();
        removeFB(id);
    }

    getNumberFavs () {
        return this.favourites.length;
    }

    persistData() {
        localStorage.setItem('fav', JSON.stringify(this.favourites));
    }

    recoverData() {
        const storage = localStorage.getItem('fav');

        if (storage)
            this.favourites = JSON.parse(storage);
    }
}