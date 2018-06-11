import {DOM_ELEMENTS as elements} from './base';

export const renderRecipe = async recipe => {
    const recipeHtml = `
        <figure class="recipe__fig">
            <img src="img/test-1.jpg" alt="Tomato" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
    `;

    elements.recipe.insertAdjacentHTML('beforeend', recipeHtml);
};