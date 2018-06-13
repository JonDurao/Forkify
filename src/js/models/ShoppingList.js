import UniqueId from 'uniqid'

export default class ShoppingList {
    constructor(){
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: UniqueId(),
            count,
            unit,
            ingredient
        };



        this.items.push(item);
        this.persistData();

        return item;
    }

    deleteAll () {
        this.items = [];
        this.persistData();
    }

    deleteItem (id) {
        const index = this.items.findIndex(value => value.id===id);

        // SPLICE
        // params {index, number of items we want to recover}
        // The function returns the items we asked for and deletes them from the original array
        this.items.splice(index, 1);
        this.persistData();
    }

    persistData () {
        localStorage.setItem('shoppingList', JSON.stringify(this.items));
    }

    recoverData () {
        const data = JSON.parse(localStorage.getItem('shoppingList'));

        if (data)
            this.items = data;
    }

    updateItem (id, newCount) {
        this.items.find(value => value.id===id).count = newCount;
    }
}