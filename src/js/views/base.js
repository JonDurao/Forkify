export const DOM_ELEMENTS = {
    favourite: document.querySelector('.likes'),
    favourite_list: document.querySelector('.likes__list'),
    login_login_list: document.querySelector('.users_panel_login'),
    login_logout_list: document.querySelector('.users__panel__logout'),
    login_panel: document.querySelector('.users__panel'),
    login_panel_list: document.querySelectorAll('.users__search'),
    login_user_input: document.querySelector('#user_username_input'),
    login_pass_input: document.querySelector('#user_password_input'),
    recipe: document.querySelector('.recipe'),
    results: document.querySelector('.results'),
    results_list: document.querySelector('.results__list'),
    results_pages: document.querySelector('.results__pages'),
    search: document.querySelector('.search'),
    search_input: document.querySelector('.search__field'),
    shopping_list: document.querySelector('.shopping__list'),
    shopping_delete_all: document.querySelector('.shopping_delete_all')
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