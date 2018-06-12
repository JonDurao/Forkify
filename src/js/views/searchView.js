import {DOM_ELEMENTS as elements, DOM_ELEMENT_STRINGS as elementsStrings} from './base';

export const getInput = () => elements.search_input.value;

export const cleanInput = () => {
    elements.search_input.value = '';
};

export const cleanResultList = () => {
    elements.recipe.innerHTML = '';
    elements.results_pages.innerHTML = '';
    elements.results_list.innerHTML = '';
};

// type 'prev' or 'next'
const createButtonPage = (page, type) => {
    const pageButton = `
        <button class="btn-inline results__btn--${type}" data-goto="${type==='next' ? (page + 1) : (page - 1)}">
            <span>Page ${type==='next' ? (page + 1) : (page - 1)}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type==='next' ? 'right' : 'left'}"></use>
            </svg>
        </button>`;

    elements.results_pages.insertAdjacentHTML('beforeend', pageButton);
};

export const cleanHighlighted = () => {
    try {
        document.querySelector(`.${elementsStrings.highlightedResult}`).classList.remove(elementsStrings.highlightedResult);
    } catch (e) {
        console.log('No element selected ATM')
    }
};

export const highlightSelected = id => {
    document.querySelector(`a[href='#${id}']`).classList.add(elementsStrings.highlightedResult);
};

export const  limitTitleCharacters = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit) {
        // Reduce applies a function against an Array to reduce it to a single value
        // acc gets the value of 0 as it is the 1st parameter in the function
        // cur gets the current value of the loop
        title.split(' ').reduce((accumulator, currentValue) => {
            if (accumulator + currentValue.length <= limit)
                newTitle.push(currentValue);

            return accumulator + currentValue.length;
        }, 0);

        return `${newTitle.join(' ')}...`;
    }

    return title;
};

const renderPageButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    
    if (page > 1)
        createButtonPage(page, 'prev');

    if (page < pages)
        createButtonPage(page, 'next');
};

export const renderResults = (results, page = 1, resultsPerPage = 10) => {
    const start = (page - 1) * resultsPerPage, end = page * resultsPerPage;

    // Slice takes a part of the slice
    // returns shallow copy of a portion of an array into a new array object selected from begin to end
    // End is omitted from the new result
    results.slice(start, end).forEach(value => renderRecipe(value));
    // All the array
    // results.forEach(value => renderRecipe(value));
    renderPageButtons(page, results.length, resultsPerPage);
};

const renderRecipe = recipe => {
    const element = `<li> <a class="results__link" href="#${recipe.recipe_id}"> <figure class="results__fig"> <img src="${recipe.image_url}" alt="Test"> </figure> <div class="results__data"> <h4 class="results__name">${limitTitleCharacters(recipe.title)}</h4><p class="results__author">${recipe.publisher}</p> </div> </a> </li>`;

    elements.results_list.insertAdjacentHTML("beforeend", element);
};