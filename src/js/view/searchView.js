class SearchView {
  _parentElement = document.querySelector('.search');
  _searchInput = document.querySelector('.search__field');

  addEventHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  getQuery() {
    const query = this._searchInput.value;
    this._clear();
    return query;
  }
  _clear() {
    this._searchInput.value = '';
  }
}

export default new SearchView();
