const firebaseDatabases = {
    FAVOURITES_DB: 'favourites',
    RECIPES_DB: 'recipes',
    SHOPPING_LIST_DB: 'shopping_list',
    USERS_DB: 'users'
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

export const getFavouriteData = async (id) => {
    return await getAllFB(firebaseDatabases.USERS_DB, firebaseDatabases.FAVOURITES_DB, id);
};

export const getRecipeData = async (id) => {
    return await getFB(firebaseDatabases.RECIPES_DB, null, id);
};

export const getShoppingListData = async (id) => {
    return await getAllFB(firebaseDatabases.USERS_DB, firebaseDatabases.SHOPPING_LIST_DB, id);
};

export const getUserData = async (username) => {
    return await getFB(firebaseDatabases.USERS_DB, null, username);
};

export const removeAllShoppingListData = (username) => {
    //databaseFirebase.ref('shopping_list/').child(id).remove();
    removeAllFB(firebaseDatabases.USERS_DB, firebaseDatabases.SHOPPING_LIST_DB, username);
};

export const removeFavouriteData = (id, user) => {
    removeFB(firebaseDatabases.USERS_DB, firebaseDatabases.FAVOURITES_DB, user, id);
};

export const removeRecipeData = (id) => {
    removeFB(firebaseDatabases.RECIPES_DB, id);
};

export const removeShoppingListData = (id, user) => {
    //databaseFirebase.ref('shopping_list/').child(id).remove();
    removeFB(firebaseDatabases.USERS_DB, firebaseDatabases.SHOPPING_LIST_DB, user, id);
};

export const updateShoppingListElement = (id, obj) => {
    updateFB(firebaseDatabases.USERS_DB, firebaseDatabases.SHOPPING_LIST_DB, id, obj);
};

export const writeFavouriteData = (favourites, username) => {
    console.log(favourites);
    writeFB(firebaseDatabases.USERS_DB, firebaseDatabases.FAVOURITES_DB, username, favourites);
};

export const writeRecipeData = (id, title, image_url, ingredients, publisher, source_url) => {
    const receta = {title: title,
        image_url: image_url,
        ingredients : ingredients,
        publisher : publisher,
        source_url : source_url};

    writeFB(firebaseDatabases.RECIPES_DB, null, id, receta);
};

export const writeShoppingListData = (ingredients, username) => {
    writeFB(firebaseDatabases.USERS_DB, firebaseDatabases.SHOPPING_LIST_DB, username, ingredients);
};

export const writeUserData = (username, password) => {
    const user = {
        username: username,
        password: password
    };

    writeFB(firebaseDatabases.USERS_DB, null, username, user);
};

const getFB = async (db, db2, id) => {
    let value;

    if (db2 !== null){
         value = await databaseFirebase.collection(db.toString()).doc(id.toString()).collection(db2.toString()).doc(db2.toString()).get();
    } else {
        value = await databaseFirebase.collection(db.toString()).doc(id.toString()).get();
    }

    if (value.exists)
        return value.data().obj;
    else
        return null;
};

const getAllFB = async (db, db2, id) => {
    if (db2 !== null) {
        const result = await databaseFirebase.collection(db).doc(id.toString()).collection(db2.toString()).get();
        return result.docs.map(value => value.data());
    } else {
        const result = await databaseFirebase.collection(db).get();
        return result.docs.map(value => value.data());
    }
};

const removeAllFB = async (db, db2, id) => {
    if (db2 !== null){
        await getAllFB(db, db2, id).then(value => value.forEach(valueTwo => removeFB(db, db2, id, valueTwo.value.id))).catch(error => console.log(error));
    } else {
        await getAllFB(db).then(value => value.forEach(valueTwo => removeFB(db, valueTwo.obj.id))).catch(error => console.log(error));
    }
};

const removeFB = (db, db2 = null, id, objId) => {
    if (db2 !== null){
        databaseFirebase.collection(db.toString()).doc(id.toString()).collection(db2.toString()).doc(objId.toString()).delete()
            .then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    } else {
        databaseFirebase.collection(db.toString()).doc(id.toString()).delete()
            .then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
};

const updateFB = (db, db2, id, value) => {
    if (db2 !== null) {
        databaseFirebase.collection(db.toString()).doc(id.toString()).collection(db2.toString()).doc(value.id.toString()).update({value})
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    } else {
        databaseFirebase.collection(db.toString()).doc(id.toString()).update({value})
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }
};

const writeFB = (db, db2, id, obj) => {
    console.log(obj);

    if (db2 !== null) {
        console.log(obj);

        obj.forEach(value => {
            databaseFirebase.collection(db.toString()).doc(id.toString()).collection(db2.toString()).doc(value.id.toString()).set({value})
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        });
    } else {
        databaseFirebase.collection(db.toString()).doc(id.toString()).set({obj})
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }
};

var databaseFirebase = firebase.firestore();