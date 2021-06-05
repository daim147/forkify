// !Loading Icons
import icons from 'url:../../img/icons.svg';
// ! Exporting addMarkup
import { addMarkup } from './addRecipeMarkup';
// ! Exporting View Class
import View from './View';

class PreView extends View {
  _parentElement = document.querySelector('.upload');
  _primary = addMarkup;
  _closeBtn = document.querySelector('.btn--close-modal');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay ');
  _message = 'Recipe Uploaded 🤩';

  constructor() {
    super();
    this._atHandlerShowWindow();
    this._atHandlerHideWindow();
  }
  toogleWindow() {
    // this._clear();
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  setparentBack() {
    this._parentElement.innerHTML = this._primary;
    this.toogleWindow();
  }
  _atHandlerShowWindow() {
    this._openBtn.addEventListener('click', this.setparentBack.bind(this));
  }
  _atHandlerHideWindow() {
    this._overlay.addEventListener('click', this.toogleWindow.bind(this));
    this._closeBtn.addEventListener('click', this.toogleWindow.bind(this));
  }
  atHandelerFormData(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }
}
export default new PreView();
