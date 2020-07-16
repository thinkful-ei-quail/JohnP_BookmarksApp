/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */



import api from './api';
import store from './store';
import APP from './APP';

///////////////////////////////////MU GENERATOR FUNCS//

//const generate = function (){};

const generateStart = function (){
    $('main').html(`
    <section class="display-container">
    <div class="error-container">Error Will Be Here</div>
    <section><div class="add-new"><button class="start-add-bookmark" type="submit"></button></div><div class="filter-div"></div></section>
    <div class="list-display">
      <ul class="list-ul"></ul>
    </div>
  </section>
      `)
};

const generateFilter = function (){
    $('.filter-div').html(`
    <label for="rating-select">minimum rating:</label>
    <select class="rating-filter" name="rating-select" id="rating-select">
      <option value="1">Bad</option>
      <option value="2">so-so</option>
      <option value="3">Good</option>
      <option value="4">Great</option>
      <option value="5">Amazing</option>
    </select>

    `)
};

const generateListItem= function (bookmark){
    return `
        <li data-item-id="${bookmark.id}">
        <div class="small-div">
          <div class="small-list-title">
            <h3>${bookmark.title}</h3><button class="expand-from-list" type="submit"></button>
          </div>
          <div class="list-rating">
            <h3>${bookmark.rating}</h3>
          </div>
          <div class="list-see-more"></div>
        </div>
      </li>
        `
    };

   const generateExpandedBook = function (){
        return `
    <div class="xpanded">
        <div>
            <div class="xpanded-title">
                <h2>${bookmarks.title}</h2>
            </div>
            <div class="edit-and-delete-div">
                <button class="edit-title" type="submit"></button>
                <button class="delete" type="submit"></button>
            </div>
            <div class="xpanded-link">
                <a href="${bookmarks.url}">Go to Site</a>
            </div>
            <div class="xpanded-desc">
                <p>${bookmarks.description}</p>
            </div>
            <button class="edit-desc" type="submit"></button>
            <div class="xpanded-rating">
                <h2>${bookmarks.rating}</h2>
            </div>
            <button class="edit-rating" type="submit"></button>
        </div>
    </div>
        `
    };

    const generateAddBookmark = function (){
        $('.addform').html(`
        <div class="add-form-container">
            <form id="add-bookmark-form">
                <div class="addform">
                    <label for="bookmark-title">Add New Site</label>
                    <input type="text" name="bookmark-title" class="bookmark-title new-site-name"
                    placeholder="Enter Site Name" required>
                </div>
                <div class="addform">
                  <label for="bookmark-url">URL ('https://' is required)</label>
                  <input type="url" name="bookmark-url" class="form-control new-site-url" placeholder="http(s)://"
                  required>
                </div>
                <div class="addform">
                   <label for="bookmark-description">Description</label>
                    <input type="text" name="bookmark-description" class="form-control new-site-desc"
                    placeholder="Enter a description..." required>
                </div>
                <div class="rate-new">
                  <label for="rating">Rating</label>
                  <select name="rating" class="new-site-rating">
                  <option value="1">Bad</option>
                  <option value="2">so-so</option>
                  <option value="3">Good</option>
                  <option value="4">Great</option>
                  <option value="5">Amazing</option>
                  </select>
                </div>
                <div class="new-site-submit">
                    <button type="submit" class="add-bookmark-submit">Save</button>
                </div>
            </form>
        </div>
        `);
    };

    const generateError = function (message){
        return`
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
    };

    const generateBookString = function (books) {
        const bookmarks = books.map((bookmark) => generateListItem(bookmark));
        return items.join('');
      };


//////////////////Render Funcs

//const render = function () {};

const renderError = function () {
    if (store.state.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  };

const renderBookmarksList = function () {
    renderError();
    let books = [...store.bookmarks];
    if(store.state.filter > 0){
        return store.filterByRating(books);
    }
    const bookmarksString = generateBookString(books);
    $(".list-display").html(bookmarksString);
};

const renderPage = function () {
    generateStart();
    generateFilter();
    generateAddBookmark();
    renderBookmarksList();
};


///////////////////Event Handler Funcs

//const handle = function (){};

const handleCloseError = function () {
    $('.error-container').on('click', '#cancel-error', () => {
      store.state.error(null);
      renderError();
    });
  };




const handleAddBookMarkSubmit = function (){
    $('main').on('submit','.add-bookmark-form',function (param) {
        param.preventDefault();
        const newBkmkTitle=$().val;
        const newBkmkURL=$().val;
        const newBkmkDesc=$().val;
        const newBkmkRating=$().val;
        api.addNewBookmark(newBkmkTitle, newBkmkURL, newBkmkDesc, newBkmkRating)
      })
};





///bindListener func

///export default{};
