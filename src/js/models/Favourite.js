import UniqueId from 'uniqid'

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