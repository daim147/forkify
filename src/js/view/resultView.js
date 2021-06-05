// ! Exporting View Class
import View from './View';

// ! Exporting PreViewView Class
import preView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _erroMessage = `We couldn't find your desire Recipe!`;
  _message;
  _data;

  _generateMArkup() {
    return this._data.map(result => preView.render(result, false)).join('');
  }
}
export default new ResultView();
