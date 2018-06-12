import {DOM_ELEMENTS as elements} from './base';
import {Fraction} from 'fractional';

export const renderShoppingListElement = ingredient => {
    let step;

    if (ingredient.count) {
        step = (ingredient.count) < 1 ? '1' : `1 +${'0'.repeat(ingredient.count.toString().length)}`;
    } else {
        step = '';
    }

    const ingredientElem = `
        <li class="shopping__item" data-itemid="${ingredient.id}">
            <div class="shopping__count">
                <input type="number" value="${ingredient.count}" step="${step}">
                <p>${ingredient.unit}</p>
            </div>
            <p class="shopping__description">${ingredient.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    elements.shopping_list.insertAdjacentHTML('beforeend', ingredientElem);
};

export const deleteListItem = id => {
    const elem = document.querySelector(`li[data-itemid=${id}]`);
    elem.parentElement.removeChild(elem);
};