import axios from 'axios'
import {API_VALUES as api} from './../config'
import {writeRecipeData as writeFB} from './../firebaseConnection'

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

            writeFB(this.recipeId, this.title, this.image_url, this.ingredients, this.publisher, this.source_url);
        } catch (e) {
            alert(e);
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
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const units = [...unitShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // Uniform unit
            let ingredient = el.toLowerCase();

            unitLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, units[index]);
            });

            // Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse into count, unit, ingredient
            const arrIng = ingredient.split(' ');
            // Returns returns the index of the first element in the array that satisfies the provided testing function.
            // Otherwise -1 is returned.
            // Includes determines whether an array includes a certain element
            const unitIndex = arrIng.findIndex(valueShort => units.includes(valueShort));

            let objIng;

            if (unitIndex > -1){
                // There's a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;

                try {
                    if (arrCount.length === 1){
                        // eval() evaluates JavaScript code represented as a string
                        count = eval(arrIng[0].replace('-','+'));
                    } else {
                        count = eval(arrIng.slice(0, unitIndex). join('+'));
                    }
                } catch (e) {
                    let re1 = new RegExp("([^\\d]+\)");
                    count = arrIng[0].replace(re1, '');
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

    updateServigs(type) {
        const newServings = type === 'inc' ? (this.servings + 1) : (this.servings - 1);

        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    };
}