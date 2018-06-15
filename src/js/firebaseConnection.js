const firebaseDatabases = {
    FAVOURITES_DB: 'favourites',
    RECIPES_DB: 'recipes',
    SHOPPING_LIST_DB: 'shopping_list'
};

// Initialize Firebase
var config = {
    apiKey: "-------------------------",
    authDomain: "-----------------------",
    databaseURL: "-----------------------",
    projectId: "-----------------------",
    storageBucket: "-----------------------",
    messagingSenderId: "-----------------------"
};

firebase.initializeApp(config);

export const getRecipeData = async (id) => {
    return await getFB(firebaseDatabases.RECIPES_DB, id);
};

export const removeAllShoppingListData = () => {
    //databaseFirebase.ref('shopping_list/').child(id).remove();
    removeAllFB(firebaseDatabases.SHOPPING_LIST_DB);
};

export const removeFavouriteData = (id) => {
    removeFB(firebaseDatabases.FAVOURITES_DB, id);
};

export const removeRecipeData = (id) => {
    removeFB(firebaseDatabases.RECIPES_DB, id);
};

export const removeShoppingListData = (id) => {
    //databaseFirebase.ref('shopping_list/').child(id).remove();
    removeFB(firebaseDatabases.SHOPPING_LIST_DB, id);
};

export const writeFavouriteData = (id, title, publisher, image_url) => {
    /*databaseFirebase.ref('favourites/' + id).set({
        id: id,
        title: title,
        publisher : publisher,
        image_url : image_url
    });*/

    const objeto = {id: id,
        title: title,
        publisher : publisher,
        image_url : image_url};

    writeFB(firebaseDatabases.FAVOURITES_DB, id, objeto);
};

export const writeRecipeData = (id, title, image_url, ingredients, publisher, source_url) => {
    const objeto = {title: title,
        image_url: image_url,
        ingredients : ingredients,
        publisher : publisher,
        source_url : source_url};

    writeFB(firebaseDatabases.RECIPES_DB, id, objeto);
};

export const writeShoppingListData = (id, count, unit, ingredient) => {
    const objeto = {id: id,
        count: count,
        unit: unit,
        ingredient : ingredient};

    writeFB(firebaseDatabases.SHOPPING_LIST_DB, ingredient, objeto);
};

const getFB = async (db, id) => {
    const value = await databaseFirebase.collection(db.toString()).doc(id.toString()).get();

    if (value.exists)
        return value.data().obj;
    else
        return null;
};

const getAllFB = async (db) => {
    const hola = await databaseFirebase.collection(db).get();
    return hola.docs.map(value => value.data());
};

const removeAllFB = async (db) => {
    await getAllFB(db).then(value => value.forEach(valueTwo => removeFB(db, valueTwo.obj.ingredient))).catch(error => console.log(error));
};

const removeFB = (db, id) => {
    databaseFirebase.collection(db.toString()).doc(id.toString()).delete()
    .then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
};

const writeFB = (db, id, obj) => {
    databaseFirebase.collection(db.toString()).doc(id.toString()).set({obj})
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
};

var databaseFirebase = firebase.firestore();