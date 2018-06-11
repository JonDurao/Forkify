import axios from 'axios'
import {API_VALUES as api} from './../config'

export default class Recipe {
    constructor (recipeId) {
        this.recipeId = recipeId;
    }

    async getFullRecipe() {
        const recipeApiCall = `get?key=${api.API_KEY}&rId=${this.recipeId}`;

        try{
            const res = await axios(`${api.LOCAL_CORS_PROXY}${api.API_BASE}${recipeApiCall}`);

            this.title = res.data.recipe.title;
            this.image_url = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.publisher = res.data.recipe.publisher;
            this.source_url = res.data.recipe.source_url;

            console.log(this.ingredients);
        } catch (e) {
            console.log(e);
        }
    }

    calcCookingTime() {
        // Assuming we need 15 minutes foreach 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    };

    calcServings() {
          this.servings = 4;
    };

    parseIngredients() {
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'Gr'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // Uniform unit
            let ingredient = el.toLowerCase();

            unitLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, unitShort[index]);
            });

            // Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse into count, unit, ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(valueShort => unitShort.includes(valueShort));

            let objIng;

            if (unitIndex > -1){
                // There's a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;

                if (arrCount.length === 1){
                    count = eval(arrIng[0].replace('-','+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex). join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrIng[0], 10)) {
                // No unit but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // No unit and no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    };
}