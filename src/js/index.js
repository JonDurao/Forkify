/**
 *
 *  NodeJS and npm for Libraries and frameworks
 *
 *  TOOLS!
 *      BABEL -> transforming ESNext to old ES5
 *          babel-core -> core functionality
 *          babel-preset-env -> Preset that takes care of modern JS
 *          babel-loader -> needed for webpack to load babel
 *          babel-polyfill -> needed to convert ES6 code not existant in ES5
 *      WebPack -> bundle ES6 modules (Module bundler)
 *          webpack -> package.json scripts
 *          webpack -> webpack.config.js for configuration
 *          webpack-cli package for executing
 *          webpack-dev-server for constant deployments
 *          html-webpack-plugin for uploading html to the dist folder
 *
 *  LOCALLY
 *      NPM -> init -> install XXX --save-dev (only for dev)
 *      NPM -> install XXX --save (to everyone)
 *      NPM -> uninstall XXX --save (to everyone)
 *      NPM -> install (installs all dependencies in the JSON file)
 *
 *  GLOBALLY
 *      NPM -> install live-server --global
 *
 *  MVC -> Model View Controller => MODEL (AJAX) // CONTROLLER (Puts it all together) // VIEW (UI CONTACT)
 */
/**
 *  Imports in ES6
 *  DEFAULT
 *     import string from './models/Search';
 *  NAMED
 *      import {add as a, multiply as m, ID} from "./models/Search";
 *      console.log(a(2,4));
 *      console.log(m(2,4));
 *      console.log(ID);
 *
 *      import * as search from './models/Search'
 *      console.log(search.add(1,2));
 */
/**
 *  Exports ES6
 *  Defaults -> export only 1 thing from the module
 *      export default 'I\'m the default';
 *  named -> multiple things in the export
 *      export const add = (a,b) => a + b;
 *      export const multiply = (a,b) => a * b;
 *      export const ID = 23;
 */
/**
 *  Axios
 *  fetch not recognized in old browsers so we'll user axios (install it from NPM
 *      Automatically return JSON
 *      Supported by all browsers
 *      Better error control
 */
/**
 *  State of the APP
 *  current data and current variables, we want it in one place and one object
 *  Libraries like Redux on react do this
 */
import Search from './models/Search'

/**
 * Global state of the app
 *  - Search Object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes
 */
const state = {};

const controlSearch = async () => {
      // 1 - Get Query from view
    const query = 'pasta';  //TODO

    if (query) {
        // 2 - New search object and add to state
        state.search = new Search(query);

        // 3 - Prepare the UI for the new data

        // 4 - Search for recipes
        await state.search.getSearchResults();

        // 5 - Render results in UI
        console.log(state.search.result);
    }
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});