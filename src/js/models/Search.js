import axios from 'axios';
import {API_VALUES as api} from './../config'

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getSearchResults() {
        const searchApiCall = `search?key=${api.API_KEY}&q=${this.query}`;

        try{
            const res = await axios(`${api.LOCAL_CORS_PROXY}${api.API_BASE}${searchApiCall}`);
            this.result = res.data.recipes;
        } catch (e) {
            console.log(e);
        }
    }
}