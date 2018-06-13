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
        return item;
    }

    deleteAll () {
        this.items = [];
    }

    deleteItem (id) {
        const index = this.items.findIndex(value => value.id===id);

        // SPLICE
        // params {index, number of items we want to recover}
        // The function returns the items we asked for and deletes them from the original array
        this.items.splice(index, 1);
    }

    updateItem (id, newCount) {
        this.items.find(value => value.id===id).count = newCount;
    }
}