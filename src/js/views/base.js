export const DOM_ELEMENTS = {
    recipe: document.querySelector('.recipe'),
    results: document.querySelector('.results'),
    results_list: document.querySelector('.results__list'),
    results_pages: document.querySelector('.results__pages'),
    search: document.querySelector('.search'),
    search_input: document.querySelector('.search__field'),
    shopping_list: document.querySelector('.shopping__list')
};

export const DOM_ELEMENT_STRINGS = {
    loader: 'loader',
    highlightedResult: 'results__link--active',
    nextPage: 'results__btn--next',
    prevPage: 'results__btn--prev'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${DOM_ELEMENT_STRINGS.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>`;

    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${DOM_ELEMENT_STRINGS.loader}`);

  if (loader)
      loader.parentElement.removeChild(loader);
};

/*export const NEW_ELEMENTS = {
    result_element: `<li> <a class="results__link results__link--active" href="#${recipe.recipe_id}"> <figure class="results__fig"> <img src="${recipe.image_url}" alt="Test"> </figure> <div class="results__data"> <h4 class="results__name">${recipe.title}</h4><p class="results__author">${recipe.publisher}</p> </div> </a> </li>`
};*/