import axios from 'axios';

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getSearchResults() {
        const proxy = 'http://localhost:1337/';
        const key = 'b5bdff6d8f6285a292be3e686d9e70c5';
        const searchBaseUrl = `food2fork.com/api/search?key=${key}`;
        const searchQuery = `&q=${this.query}`;

        try{
            const res = await axios(`${proxy}${searchBaseUrl}${searchQuery}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (e) {
            alert(e);
        }
    }
}