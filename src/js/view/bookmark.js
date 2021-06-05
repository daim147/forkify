// ! Exporting View Class
import View from './View';

// ! Exporting PreViewView Class
import preView from './previewView';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _erroMessage = `We couldn't find any bookmarks`;
  _message;
  _data;
  addHandler(handler) {
    window.addEventListener('load', handler);
  }
  _generateMArkup() {
    return this._data.map(bookmark => preView.render(bookmark, false)).join('');
  }
}
export default new BookmarkView();
