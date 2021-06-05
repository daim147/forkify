// !Loading Icons
import icons from 'url:../../img/icons.svg';
export default class {
  render(data, preview = true) {
    if (!data[0] && Array.isArray(data)) return this.renderError();
    this._data = data;
    const markup = this._generateMArkup();
    if (!preview) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const currentElement = this._parentElement.querySelectorAll('*');
    const newMarkup = this._generateMArkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = newDom.querySelectorAll('*');

    newElement.forEach((newEl, i) => {
      const curntEl = currentElement[i];
      if (
        !newEl.isEqualNode(curntEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curntEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curntEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curntEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._erroMessage) {
    const markup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
