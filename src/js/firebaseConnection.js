// Initialize Firebase
var config = {
    apiKey: "AIzaSyArffdt9aNwp-5vpfbP_CRTfII-nxfLdJ8",
    authDomain: "forkifyjsproject.firebaseapp.com",
    databaseURL: "https://forkifyjsproject.firebaseio.com",
    projectId: "forkifyjsproject",
    storageBucket: "forkifyjsproject.appspot.com",
    messagingSenderId: "677517171280"
};
firebase.initializeApp(config);

export const removeShoppingListData = (id) => {
    databaseFirebase.ref('favourites/').child(id).remove();
};

export const removeFavouriteData = (id) => {
    databaseFirebase.ref('favourites/').child(id).remove();
};

export const writeFavouriteData = (id, title, image_url, publisher) => {
    databaseFirebase.ref('favourites/' + id).set({
        id: id,
        title: title,
        publisher : publisher,
        image_url : image_url,
    });
};

export const writeRecipeData = (id, title, image_url, ingredients, publisher, source_url) => {
    databaseFirebase.ref('recipes/' + id).set({
        title: title,
        image_url: image_url,
        ingredients : ingredients,
        publisher : publisher,
        source_url : source_url
    });
};

export const writeShoppingListData = (id, title, image_url, ingredients, publisher, source_url) => {
    databaseFirebase.ref('shopping_list/' + id).set({
        id: id,
        title: title,
        image_url: image_url,
        ingredients : ingredients,
        publisher : publisher,
        source_url : source_url
    });
};

var databaseFirebase = firebase.database();