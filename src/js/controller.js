//  !Pollyfiling
import 'core-js/stable';
import 'regenerator-runtime';
// ! Modal
import * as modal from './modal.js';

// ! RecipeView
import recipeView from './view/recipeView.js';

// ! bookmarkView
import bookmarkView from './view/bookmark';

// ! SearcView
import searchView from './view/searchView';

// ! Result View
import resultView from './view/resultView';

// ! Pagination View
import pagination from './view/pagination';

// ! Add Recipe
import addRecipe from './view/addRecipe';

// ! Time Out Second for add recipe
import { TIMEOUT_SECOND_TO_REMOVE_MODAL } from './config';

import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// ! Showing Recipe

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; //* GUARD CLAUSE

    // TODO Loading Spinner
    // ? exporting from recipeView.js
    recipeView.renderSpinner();

    // TODO Update selected recipe
    resultView.update(modal.resultPerPage());

    // TODO Update bookmark view
    bookmarkView.update(modal.state.bookmarks);

    //TODO Loading Recipe from API
    // ? exporting from modal.js
    await modal.loadRecipe(id);

    // TODO Rendering Recipe
    // ? exporting from recipeView.js
    recipeView.render(modal.state.recipe);
  } catch (error) {
    // ! controlling error and passing to display it
    recipeView.renderError();
    console.error(error);
  }
};

const controlSearchResult = async function () {
  try {
    // TODO Get query String
    const query = searchView.getQuery();
    if (!query) return; //* GUARD CLAUSE

    // TODO Get data based on query string
    await modal.loadSearchData(query);

    //TODO Render Search Data
    resultView.render(modal.resultPerPage());

    // TODO Show Pagination
    pagination.render(modal.state.search);
  } catch (error) {
    // ! controlling error and passing to display it
    recipeView.renderError();
    console.error(error);
  }
};

const controlPagination = function (pageGoto) {
  //TODO Render Search Data
  resultView.render(modal.resultPerPage(pageGoto));

  // TODO Show Pagination
  pagination.render(modal.state.search);
};

const controlServings = function (newServing) {
  // TODO Updating Recipe with new serving
  modal.updateRecipe(newServing);
  // TODO Rendering (UPDATED) Recipe
  recipeView.update(modal.state.recipe);
};

const controlAddBookmarks = function () {
  // TODO ADD or Remove Bookmark
  if (!modal.state.recipe.bookmarke) {
    modal.addBookmark(modal.state.recipe);
  } else {
    modal.removeBookmark(modal.state.recipe.id);
  }
  //TODO Update recipe view
  recipeView.update(modal.state.recipe);

  // TODO Display Bookmark
  bookmarkView.render(modal.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(modal.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // ? Render Spinner
    addRecipe.renderSpinner();
    // ? Post data into API
    await modal.uploadRecipe(newRecipe);
    //? Update recipe to view
    recipeView.render(modal.state.recipe);
    //? show Success messsage
    addRecipe.renderMessage();
    //? Render Bookmark
    bookmarkView.render(modal.state.bookmarks);
    //? Window has
    window.history.pushState(null, '', `#${modal.state.recipe.id}`);
    // ? Remove modal
    setTimeout(
      () => addRecipe.toogleWindow(),
      TIMEOUT_SECOND_TO_REMOVE_MODAL * 1000
    );
  } catch (error) {
    addRecipe.renderError(error.message);
  }
};

//! Passing Function to attach with event so that we can handle this function here
const init = function () {
  bookmarkView.addHandler(controlBookmark);
  recipeView.addEventHandler(controlRecipe);
  recipeView.addEventHandlerBookmakrs(controlAddBookmarks);
  recipeView.addEventHandlerServings(controlServings);
  searchView.addEventHandler(controlSearchResult);
  pagination.addEventHandler(controlPagination);
  addRecipe.atHandelerFormData(controlAddRecipe);
};
init();

console.log('hyyyyy');
