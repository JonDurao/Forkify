import {DOM_ELEMENTS as elements, DOM_ELEMENT_STRINGS as elementsStrings} from './base';

const clearInputPassword = () => elements.login_pass_input.value = '';
const clearInputUser = () => elements.login_user_input.value = '';

export const getInputPassword = () => elements.login_pass_input.value;
export const getInputUser = () => elements.login_user_input.value;

export const renderLoginError = () => {
    clearInputPassword();
    clearInputUser();

    elements.login_panel.style.backgroundColor = '#ffcdd2';
    elements.login_panel_list.forEach(value => value.style.backgroundColor = '#ef5350');
};

export const renderLogin = () => {
    elements.login_logout_list.style.display = 'none';
    elements.login_login_list.style.display = 'block';
    clearStyles();
};

export const renderLogout = (username) => {
    const html = `<li class="users__login">
                                <div style="margin: 0 auto; display: contents;">
                                    <h2>Username: </h2>
                                    <h4 class="users__name" style="padding: 0 0.5rem">${username}</h4>
                                </div>
                            </li>
                            <li class="users__login">
                                <button class="btn-small users_login_button users_login_button_logout">
                                    <span style="margin: 0 auto">Log Out</span>
                                </button>
                            </li>`;

    elements.login_login_list.style.display = 'none';
    elements.login_logout_list.style.display = 'block';

    clearStyles();
    clearLogoutData();
    elements.login_logout_list.insertAdjacentHTML("beforeend", html);
};

const clearLogoutData = () => {
    elements.login_logout_list.innerHTML = '';
};

const clearStyles = () => {
    elements.login_panel.style.backgroundColor = '';
    elements.login_panel_list.forEach(value => value.style.backgroundColor = '');
};