export const elements = {
  body: document.querySelector('body'),
  yearsSelect: document.querySelector('#yearsSelect'),
  textSearch: document.querySelector('#textSearch'),
  searchBtn: document.querySelector('#search-btn'),
  tagsBox: document.querySelector('.search-box__tags'),
  tagAll: document.querySelector('#tag-0'),
  tags: document.getElementsByClassName('tag__input'),
  reports: document.querySelector('#reports-box'),
}

export const renderLoader = () => {
  const markup = `
    <div class="loader">
      <img class="loader__gif" src="./img/loader.gif" alt="loading...">
    </div>
  `;
  elements.body.insertAdjacentHTML('beforebegin', markup);
}

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  loader.parentElement.removeChild(loader);
}
