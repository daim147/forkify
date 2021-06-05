import { async } from 'regenerator-runtime';
import { API_URL, PER_PAGE, API_KEY } from './config';
import { AJAX } from './helper';

const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    perPageResult: PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};
const createObjectRecipe = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    sourceUrl: recipe.source_url,
    id: recipe.id,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};
const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createObjectRecipe(data);
    if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)) {
      state.recipe.bookmarke = true;
    } else {
      state.recipe.bookmarke = false;
    }
  } catch (error) {
    throw error;
  }
};

const loadSearchData = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.recipes = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.query = query;
    state.search.currentPage = 1;
  } catch (error) {
    throw error;
  }
};

const resultPerPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.perPageResult;
  const end = page * state.search.perPageResult;
  return state.search.recipes.slice(start, end);
};
const updateRecipe = function (newSer) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newSer) / state.recipe.servings;
  });
  state.recipe.servings = newSer;
};

const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarke = true;
  storeBookMarks();
};
const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarke = false;
  storeBookMarks();
};

const storeBookMarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const loadBookmark = function () {
  const store = localStorage.getItem('bookmarks');
  if (store) state.bookmarks = JSON.parse(store);
};
loadBookmark();

const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(arr => arr[0].startsWith('ingredient') && arr[1] !== '')
      .map(ing => {
        const ingrArr = ing[1].replaceAll(' ', '').split(',');
        if (ingrArr.length !== 3) throw new Error('Wrong Ingredients format');
        const [quantity, unit, description] = ingrArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      source_url: newRecipe.sourceUrl,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      title: newRecipe.title,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createObjectRecipe(data);
    addBookmark(state.recipe);
    console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};

export {
  state,
  loadRecipe,
  loadSearchData,
  resultPerPage,
  updateRecipe,
  addBookmark,
  removeBookmark,
  uploadRecipe,
};
