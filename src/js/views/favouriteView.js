import {DOM_ELEMENTS as elements} from './base';

export const clearFavourite = () => {
    elements.favourite_list.innerHTML = '';
};

export const renderFavourite = item => {
    const itemHtml = `
        <li>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.image_url}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${item.title}</h4>
                    <p class="likes__author">${item.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.favourite_list.insertAdjacentHTML("beforeend", itemHtml);
};

export const deleteFavourite = id => {
    const elem = document.querySelector(`.likes__link[href='#${id}']`);
    if (elem) elem.closest("ul").removeChild(elem.closest("li"));
};

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = length => {
    elements.favourite.style.visibility = length > 0 ? 'visible' : 'hidden';
};