import UniqueId from 'uniqid'
import {getShoppingListData as getFB, removeShoppingListData as removeFB, removeAllShoppingListData as removeAllFB, updateShoppingListElement as updateFB, writeShoppingListData as writeFB} from './../firebaseConnection'

export default class ShoppingList {
    constructor(){
        this.items = [];
    }

    addItem (count, unit, ingredient, username) {
        const item = {
            id: UniqueId(),
            count,
            unit,
            ingredient
        };

        this.items.push(item);

        if (username)
            this.persistData(username);
        //this.persistData();

        return item;
    }

    deleteAll (username) {
        this.items = [];
        //this.persistData();
        if (username)
            removeAllFB(username);
    }

    deleteItem (id, username = null) {
        const index = this.items.findIndex(value => value.id===id);

        // SPLICE
        // params {index, number of items we want to recover}
        // The function returns the items we asked for and deletes them from the original array
        this.items.splice(index, 1);
        //this.persistData();
        if (username)
            removeFB(id, username);
    }

    persistData (username = null) {
        if (username)
            writeFB(this.items, username);
    }

    /*persistData () {
        localStorage.setItem('shoppingList', JSON.stringify(this.items));
    }*/

    async recoverData (username = null) {
        //const data = JSON.parse(localStorage.getItem('shoppingList'));
        if (username != null){
            const result = await getFB(username);
            this.items = result.map(value => value.value);
        }

        /*if (data)
            this.items = data;*/
    }

    updateItem (id, newCount, username = null) {
        this.items.find(value => value.id===id).count = newCount;

        if (username)
            updateFB(username, this.items.find(value => value.id===id));
    }
}