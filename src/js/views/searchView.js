import {DOM_ELEMENTS as elements, NEW_ELEMENTS as newElements} from './base';

export const getInput = () => elements.search_input.value;

export const cleanInput = () => {
    elements.search_input.value = '';
};

export const cleanResultList = () => {
    elements.results_list.innerHTML = '';
};



export const renderResults = results => {
    results.forEach(value => renderRecipe(value));
};

const renderRecipe = recipe => {
    const element = `<li> <a class="results__link" href="#${recipe.recipe_id}"> <figure class="results__fig"> <img src="${recipe.image_url}" alt="Test"> </figure> <div class="results__data"> <h4 class="results__name">${recipe.title}</h4><p class="results__author">${recipe.publisher}</p> </div> </a> </li>`;

    elements.results_list.insertAdjacentHTML("beforeend", element);
};