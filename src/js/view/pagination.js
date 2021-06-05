// !Loading Icons
import icons from 'url:../../img/icons.svg';
// ! Exporting View Class
import View from './View';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  _data;

  addEventHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      const value = +button.dataset.goto;
      handler(value);
    });
  }
  _generateMArkup() {
    const totalPage = Math.ceil(
      this._data.recipes.length / this._data.perPageResult
    );
    const currentP = this._data.currentPage;
    if (currentP === 1 && totalPage > 1) {
      return ` <button data-goto = "${
        currentP + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currentP + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (currentP === totalPage && totalPage > 1) {
      return `<button data-goto = "${
        currentP - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentP - 1}</span>
    </button>`;
    }

    if (currentP > 1 && currentP < totalPage) {
      return `  <button data-goto = "${
        currentP + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currentP + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          <button data-goto = "${
            currentP - 1
          } " class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentP - 1}</span>
        </button>`;
    }
    return '';
  }
}

export default new Pagination();
