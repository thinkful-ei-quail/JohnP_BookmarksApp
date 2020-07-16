
/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */


import $ from 'jquery';
import api from './api';
import store from './store';

///////////////////////////////////MU GENERATOR FUNCS//

//const generate = function (){};

const generateStart = function (){
    $('main').html(`
    <section class="display-container">
    <div class="error-container">Error Will Be Here</div>
    <section><div class="addform"><button class="start-add-bookmark" type="submit"></button></div><div class="filter-div"></div></section>
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
    <div class="filter-button-div">
    <input type="checkbox" id="filter-checked" class="filter-checked" />
    <label for="filter-checked">Filter</label>
    </div>

    `)
};

const generateListItem= function (bookmark){
    return `
        <li data-item-id="${bookmark.id}" class="bookmark-li ${bookmark.id}">
        <div class="small-div">
          <div class="small-list-title">
            <a href="${bookmark.url}"><h3>${bookmark.title}</h3></a>
          </div>
          <div class="list-rating">
            <h3>${bookmark.rating}</h3>
          </div>
          <div class="list-see-more"><button class="expand-from-list" name="detail-view" type="submit"></button><label for="detail-view">Detail/Edit</label></div>
        </div>
      </li>
        `
    };

   const generateExpandedBook = function (bookmark){
        return `
    <div class="xpanded" data-item-id="${bookmark.id}">
        <div>
            <div class="xpanded-title">
                <input type="text" class="bookmark-title edit-site-name"
                    placeholder="${bookmark.title}">
            </div>
            <div class="edit-and-delete-div">
                <button class="delete" name="" type="submit"></button>
            </div>
            <div class="xpanded-link">
                  <label for="bookmark-url">('https://' is required)</label>
                  <input type="url" name="bookmark-url" class="edit-site-url" placeholder="${bookmark.url}"
                  required>
            </div>
            <div class="xpanded-desc">
            <input type="text" name="bookmark-description" class="form-control edit-site-desc"
                    placeholder="${bookmark.description}" required>
            <button class="edit-desc" name="" type="submit"></button>
            <div class="xpanded-rating">
            <div class="edit-rating">
                  <label for="rating">${bookmark.rating}</label>
                  <select name="rating" class="edit-site-rating">
                  <option value="1">Bad</option>
                  <option value="2">so-so</option>
                  <option value="3">Good</option>
                  <option value="4">Great</option>
                  <option value="5">Amazing</option>
                  </select>
            </div>
            <div class="list-see-less"><button class="contract-from-list" name="regular-view" type="submit"></button><label for="regular-view">Done</label></div>
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
        const bookmarks = books.map(bookmark => generateListItem(bookmark));
        return bookmarks.join('');
      };



//////////////////Render Funcs

//const render = function () {};

const renderError = function () {
    if (store.state.error) {
      const err = generateError(store.error);
      $('.error-container').html(err);
    } else {
      $('.error-container').empty();
    }
  };

const renderBookmarksList = function () {
    renderError();
    let books = store.bookmarks;
    if(store.state.filter > 0){
        books=store.filterByRating(books);
    }
    const bookmarksString = generateBookString(books);
    $(".list-display").html(bookmarksString);
};




const renderExpandedView = function (id) {
    const bookmark = store.findBookmarkById(id);
    const expand = generateExpandedBook(bookmark);
    $(`'.${id}'`).html(expand);
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
    $('#add-bookmark-form').submit(function (event) {
        event.preventDefault();
        const newBkmkTitle=$('.new-site-name').val();
        const newBkmkURL=$('.new-site-url').val();
        const newBkmkDesc=$('.new-site-desc').val();
        const newBkmkRating=$('.new-site-rating').val();
        console.log(newBkmkTitle, newBkmkURL, newBkmkDesc, newBkmkRating);

        api.addNewBookmark(newBkmkTitle, newBkmkURL, newBkmkDesc, newBkmkRating)
        .then((newBook)=>{
            //store.formatForStorePush(newBook);
            store.addNewBook(newBook);
            renderPage();
        })
        .catch((error)=>{
            store.setError(error.message);
            renderError();
        });
    });
  };

const getBkmkIdFromElement = function (bookmark) {
    return $(bookmark)
        .closest('.bookmark-li')
        .data('.item-id');
};

const getFilterValue =function (){
    console.log($('.rating-filter').val());
    return $('.rating-filter').val();
};

const getName = function () {
   return $('.edit-site-name').val();
};

const getURL = function () {
    return $('.edit-site-url').val();
 };

 const getDesc = function () {
    return $('.edit-site-desc').val();
 };

 const getRate = function () {
    return $('.edit-site-rating').val();
 };

const handleDeleteBookmark = function () {
    $(".xpanded").on('click','.delete',event=>{
        event.preventDefault();
        const id= getBkmkIdFromElement(event.currentTarget);
        api.deleteBookmark(id)
        .then(()=>{
            store.findAndDeleteBook(id);
            renderPage();
        })
        .catch((error)=>{
            console.log(error);
                store.setError(error.message);
                renderError();
            });
    });
};

const handleFilterSubmitClicked = function (){
    $('.filter-button-div').click(()=>{
        store.state.filter =getFilterValue();
        renderPage();
    })
};

const handleExpandFromList = function (){
    $('main').on('click','button','.expand-from-list',event=>{
        event.preventDefault();
        const id = getBkmkIdFromElement();
        renderExpandedView(id);
    })
};

const handleCollapseAndSubmit = function (){
    $('main').on('click','button','.contract-from-list', event=>{
        event.preventDefault();
        const id = getBkmkIdFromElement();
        const name = getName();
        const desc = getDesc();
        const url = getURL();
        const num = getRate();
        const newData={title:name,url:url,desc:desc,rating:num};
        store.findAndEdit(id, newData);
        api.updateBookmark(id, newData)
        .then(() =>{
            store.findAndEdit(id, newData);
            APP.renderPage();
        })
        .catch((error) => {
            store.setError(error.message);
            APP.renderError();
        });
    });
};

const bindEventListeners = function (){
    handleAddBookMarkSubmit();
    handleCloseError();
    handleDeleteBookmark();

    handleFilterSubmitClicked();

};

///bindListener func

export default{
    bindEventListeners,
    renderPage
};

























                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // console.log('                                                                                                                                                                                                                                                                                                                                                        ̷̧̨̡̨̨̡̨̡̢̛̛̛̛̛̛̛̥͚͉̙̦̠̙̘͉̖͔̜̬̦̻̥͖̖͙̰̮͙̻͚̱͖̳̩͍̙̩̯̖̮̺̜͍͍̪̠̲͍̗̦͍̪̫̎́̀̀̒̃̽̑̉̉̐̏͛̋̀̂̽̎̐̃̀̾̆̆͆̈́̏͑͌̓̐͋͆͗͊̒̉̋̃̊̍̇̉̌̔͑͆̆͆͛̾͒̀͌̂̿̄̊̅͆̈́̄̅̃͋̊̍͐͑̏̋̄̔̏́̐̽̽̾̉͆́̔̒͑͊̅̇̾̏̏͗̾̊̽̈́́̃̽̈́͆̈́̑̿̊̒̆̑̐͒̊́̽̆̄̈̾̔̃̓̃̉͊̿̉̈́͗̔͂̌̀̿̀̽͐̈́̋̑̆̋͋̉̈́͂̓̒̿͋̇͂̓̎͌́͊̓̽̈́̈́̃̊́̆͂͒͋̀̈͑̉͊̆̾̌̾͋̿́͋͐͛͑̈́̈͊̄̔͂̎̂͗̈́̑̓̈̇̌̔͊̒̈̈́̓̐̍̌̿̈́̈́̔̏̂̀̐̍̔̓͗̅̒̌͌̿̈́̌̀̎̐̔̍̾͒͋͑̾͆͋̌̒̓̚͘̚͘̚̚̚͘̚̕̚̚̚̚̚̕̕̕̚͘͜͜͜͝͝͠͝͝͝͝͝͝͝͝͝͝͠͠͝͝ ̶̡̢̢̨̨̢̡̡̡̢̨̡̨̢̢̨̡̨̢̡̧̧̡̛̛̛̛̛͚̰̺̙͚͇̻̖̜͚͍̭̘̥̹̮̻̙̹͉̬̺͉͎̠͓̲͙̤̩̦̯̭̳̭͔̜͚̹̣̬̜̞̱̮̦͙̮̖̥̟̘͇̫̠͎͖̹̟̪̲̳̻̝̩̫̥͔͈̲͎̖̝͙̙̰̼̬͉̫̲͇͈̙̪͔̬̟̘͓̖̹͇̺̭͓̻̠̭̰̰̫̠̪̻̜̜̮͔̜̙̺̘͖͍̲̭̰̼̦͓̣͎̦̟͖̭͇͇̦̯̭̺̦̬̯͖͕͉̲̠̻̗̤̲̫͖͕̫͔̯͎͙̦͇̼͉̘̠͑̓͗̔͋̈́̏͛̎̏̄͆̀̈́̔̑̀̒̍́͐̈́̔̉̋̔̽̂̑́̀̆̋̊̒̂̈̓̉̔͗̄̈́́́̓̎̀͐͌͂͗̔̓̔̿͋́̈́̂͛̍̎̆̓̃͒̾̽̊̅̈̆̈̾̈͊̓̍̍͂̽̔̿̃̓̐͋͋̄̄̎͋͆̅̈́̀͂͋͆̎͛͛͐̍͊̎̋̾̈́̈̀̈́͊̀̋̃̈̏̄̅͗͆̏̊͒͛̀̀̃́͂̆͐̎̂̓͐́͗́̕͘̚͘͘͘̚̚̚̚̚͜͜͝͝͝͝͝͝͝͠͝͝ͅͅͅͅͅͅy̵̢̡̧̧̧̨̧̨̨̧̢̧̨̛͉͔̼̮̳͍̠̰̹̰̝̲̰̜̠̹̫̝̯̬̯̹̗̬͙͚͚̱̜̯̫̯̩̜̞͕͇͚̺̰̦̺̮̭̲̦̞̲̻̩͉̲̖̪̣͇̠̭̰̬̞͖̣̼̙̮͓̩̩̲͕̰̲͙̲̘̳̟̰̘̱͙̭̦̺̹̩̓̅̓̌̿̈́͋̄́̈̓͊̔̔̊̄͋̎̆̂̿̐̽̍̽̽̉̈́̑̄̍́́̋̾̈́̆͛̕̚̕͝͠ͅo̴̧̢̨̡̧̧̢̢̨̧̡̧̡̢̡̡̧̡̡̡̢̡̨̧̪͈̞̖͈̥̞͕̘̫̤͉̘̟̳̜̗͙̠͚̠̫͉̼̪̖̹͓̗̮̗̗̞͚̬̙̠̰̮̠̮̹̖͓̞̠̜̹̲̫͚͖̩̺̦͕͉͍̪̜̱̠̝̦̞̤̘̤̞̝͇͙̘̟̗̮̟̤͉̪̜̥̩͖͍̯̩̪̬̮̘̲̖̠̯͖̠͎̱̟̪̘͚͈̹̱͕̟̫̼̭͔̠͉̞͉̫̘͍̖̠͖͎͙̘̼̫̺͚͈̩̟̟̖͉̼̗̳̙̤̜̠̬͍̘̭̬̮͍̲̣̤̱̘͍̥͈̞͕̞̮̗͓͖̙̞̖̣̺̦͚͗̋͜͜͜͜͜͜͜͝ͅͅͅͅͅͅứ̶̛̭̈̉̀̅̈́͑͆́̉̉̌̾͂͗̂̂̒́̈́͐͌͋͒̿̐͂͆̿͛́̊̔̐͑͑̄͂̉̈́̌̌̀̍̀͆̑̏̄̇̈́͊̉̏̒͐͌̊̇̍͌̃̽̀̔̉͛̈́̊͑̏͛͋̇̓̎͋̈́̓̍̅͐͑̄̆͌̉̌͌̅̀̎̍́̅̉̀̍̂̂͊͋̊͒̏̇͋̈́́͒̎͑̾́́́͑̏́̅͆̄̋̑̔͆̈͌̓͗̒̉͂̀̓͆̍͑̈́̊̓̈́̍̉͂̒̏̎͑̅͐̏̿̓̈́͗͋̐̅̊́̀́̔̂̀͌̈́̋̀͌̐͆̊̏͒̊̉̇͌̔̅̀̇̔̔̌̕͘̚͘̕͘̕̚̕͘͘͘̚̚͘͘͝͝͝͝͝͠͠͠͝͠͝͝͠͝͝͠ ̵̡̢̨̢̢̨̨̨̡̨̧̢̨̨̡̧̨̧̨̡̛̳̻̹͓̰̘͇̖͙͈̗̼̩͓̼̼̩͍̟͚͉͕̪̺̰̲͈̪͎̭͚̹̱̪͎͎̻̗͓̙̙̝̯̝̱̱̪̩̝̦͚͓̦̳̮̳͉̳̙͉̻̫̺̰̭͍͉͉̯͍̝̤̪̜͓̼̯̰̜̹̲͍͖̼̯͉̮̬͎̤͇̙͈̩̖̮͈̺͖̥̟͓̹͖͕͍̼͖̼̯͈̯̣͈̜̲̺̳̗̮̺͇͕̞̪̹̲̟̝̩͎̦͙͚̥͓̣͇̻͙̳̙̲̰̰̥̘̩̬͔͎̠̥̭͍̣͓͓̼̻̝̲̲̗̼̭̼͙̬̞̟͔̤̖̞̞͉͔̭͚̞̹͙̩̗̥͔̳̙̙̜̥̩̞͕̩͈̳͚̜͚̗͎͕͙͍̬̫̣̩͈̻̖̙͇͎͔̼͈̖̫̱̮͕̦̫̗̞̠̰̜̬͙̘̥̘͖̼̻̤̈̍̿̃̀̿͐̐͑̈́͛̇̈́͗̐̂̔̿͊̉͒͒̍͗͜͜͜͠ͅͅͅͅͅͅͅͅͅs̷̡̧̡̡̢̨̢̨̡̡̛̛̛̛̛̗͚͕̱̟͕̣̜̮̯̼̰̖͓̟͉̪̪̹̟̞̳̖̗̩̭̙̦̠̦̣̲̫̗͖̻̹̗͈̳̳͚̭͍̝̥̪̮̤̟̲̤̫͔͙̬̘̹͙͉͙̦̺̙̠͎̝̗̹̦̘̖̯̫̫̭̟̫̞̦͉͉̺̻̯͔̹̹̖͇͙̩̙̗͊̊́̋͆́͊͂̑̔̐̐̒̉͒̔͑͂̏̇́̿͆̓̈́͌̐͛̆̍͒̓̓͑͆͂̄̄́̓͌͒͌̓̍̀̐͂̎́̌̾͑̈̈́̅͊̈́̎̆̂̽̈̏̈́̒́̅͊͑̿̿͌̈̊̍̎̈̃͋̽̐͌͑́͊̓͐̾͐̏̎͊̏̈͒̃͗̌̑͌̈́͋̉͆͐̀̐̏̂̆̀͐̍͆͂̊̋͋͋͋̀̔̅̔͂̎̈́̃͗̊̋̈̎̓́͊͛̀̀͆̎̈͆̎͋̒̆̈̈́̑̎̔̿͐̌̒̎̈̈̀̀́̈́̓̏̓̀̂̿͑̾̉͌̈́̈́͂̓͗̊́̔͛͛̈̑̐͆̌̊̈̊͒̈́͂̅̈́͛̀̓͊̑̇̉̾͗̅̏̉͆́̈́̈́̓̉͋͆̈́͑̒̎̉͛̿̈́͗̕̕͘̕̕̕͘͘̕͘̕͘̕̚̕̕̕̚͘͘͘̕͘͘͜͠͝͝͠͝͝͝͠͠͝͝͠͠͠͝͠ͅͅͅh̷̢̢̨̛̛̛̛̛̛̛̛̙̬̬̲̣͕̼͇̩͍̯͎̝͉͓̣̩̹͔͉̬̳̹͉̤͇̻͔̲̟͔̫̥̦̣͇̝̺̰̼͖̗̳̞̰͉̙̻͓̣̖̩̗͔̥͈̹̜̻͉̙̟̘̘̰̖͖̝̤̜̲̞̃̈́͋̇̈́̈́͛̉͋̔̐̔͒̓̀͑͗̾̂̄̔͗͋̏̅̂̔̏̌͋̉̌́͑͆̍̔̾̄͐̀̾̈̓̓̾̉̀͗̎̈́̌̾̈́̏͑̑̈́̑̓̇̈̐̏̐̾͒̇̓̍̏̂̀̀̔̑̈́̈́͂̽̀̓͑̂̑͛͛̒͒͆̊̋̃̒̋͊̀́̓̏̋̄̄̈́̓͛̏̽̒̔̾̓̎́̃̀̈́̓́̂́͑̀̄̇̂̅̌̀̐͐͑͛̀͋̌̿̋͗̈́͒͋̎̔̅͆͛́͊͛̋̐̈̀̊̉̌̐̍̓̿͌̐͆͒͒͒̈́͒́̈́̋̃̆̇͑̈̔͊̈́͒̐̆̉͂̿́́̈͆̍̊̊͘̚̚͘͘̚̚̚̚͘̚̕̚͘̕̚͘̕̕͘͘̕͝͠͝͠͝͝͝͝͝͠͝͠͝͠͝͝͠͠͝ͅͅǫ̷̢̨̨̢̨̡̢̧̢̢̧̡̨̡̡̡̡̢̡̛̛̛̛̛̛̛͎̦̻̫̞̱͖̝͈̩̰̝̪̳̪͖̮̜̼͚̻̙̭̣̜̟̰̲̮͕͙̳̪̲̟̹͇̼͚̙̰̖̻̘̹͙̰̞͍͎̝̬̱͇̪̪̹̠͚̗͎̰͇̜̦̙̗̗͉̣͚͉̙̳̲̱̳̺͈̞̤̲͉̰̰̜̩͍̫̜͎̗̖͙̰̯͉͔̩̺̝̫̱̮̻̺̤̜̱̳͍̱̯̘̩͙̥̳̩̦̟̫̣̳͈̘͕͔̲̬͖̥͕̳͙̮͕͈͓̣͇͈̏̌̆̃̃̇̋̐̐̈́͆͗̈́̇̉͒͒̒̄͂͊͆̇̃̈́̈͆̈́̓͊͆̈̉̏͂̔̉̃̓̅̂̒̑̓̿̄́̄͒̏̈́̾̀͆̑̍́́͑̎̅̽͋̋͑̿͋͌͛̍̏̑͐͒̃̈́̈́̓̍͛̃̈́͌̏̅̔̄̈́͛͑̈̓̇̿̾͂͒̍̈́̒̀̍̍͆̇̿̑͗̐̀̒̀̇̈́̐̓̐̇̀̍̒͌̈̏͆̎́̈́̈́̆͌̈́͗̅̆͊̔̐̄̽͐̏̀͒́͌̇̀̈́̓̀̃̓́̇͑͌̌̿̄̆̌̽̐̀̆̈̈̂̓͂̐̃̈́̊̓͘̕̕͘̚̕̕̚͘͜͜͜͠͝͠͠͠͝͝͝͠͝͝͝͝͝͠͝͝ư̷̢̡̧̡̧̢̨̢̢̡̨̢̧̡̨̨̧̡̨̧̨̛̛̛̛̛̛̛̠̺̞̖͎͙̥̬͈̼̻̟̹̗͈͚͖̘̱͎͎͈̺̞̬̖̻̠̮̣̩̠̙̗̞͍͉̫̟̝̲̬̻̫͍̙͙̲̼̙̙̙̬͖̘̮̻͙̝͔̰͕͖̙̼̜̤̯͓̠̪̹̥̺̘̰̠͕̯̺͔̮̦̺̪͉̱̭̩̩͎̖̳͈̫̗̝̰͕͎̮̳̳̪͙͚̟̫̫̺̦̟̲̙͚̪̺̲̼̹̝̼͙̰͈͓̩͕͕͉̪̼͍̪̲͈̬̞̮͖̟̙̹͓͕̤͚̜͙̳̭͇͍͈̝̭̼͙͖͇̹̥̗̮̞̬̮̟̞̣̙͖̣̺̻̩̜̬̥͖͔͉̙̹̤̤̹̱͔̖̹͚̻͕̞͚̦̪̙̱̬̞̘͙͍͚̘̯̗͍͎̱̫͓͋̔̑̉͑͌̓̆̂͗͗̽̏̍̂̂̉̐̓̇̂̑̂͌̑͂͋͒͋̊͑̓͒́̓͆̒̽͆̾͋̈́̆̌͋̃͑̐́́͐̌̈́́͊̋́̀̆̀̽̃̇̎̇́̋͐͂́̓̅͋̐͒̍͌͋̔̆̑̊̉͆͐̏̽̍̓̑̉̔̀̐̊̃̽̔̌̈́̈́̂̉̑̈͐̌̾̀̿̎̅͑͋̿̋̂̍̉͒̈́̉͛̓̿̐̐͒̎̐̆̏̑͌̈́̏̀̓̾͊͑̊́̂͂̈́̉̎̒̏̾̂̋̂̋̇͋̍̓͑̓͛̍̐̐̈͌̊̾̓͒̔̽̈́̔̒̑̌̃̂͐͌́̈́̾̌̾͐̾̅̈͑̿̀͌̔̃͂̑̃̑̀͑̍́́͌̈́́́̌̆̂̅̈́̈́͋͑́͛̾̈͋͐͐̉̿̈́̋̓̒̅̋̈́͂̃̇̊̐͛̎̇͑̄͂̋͆͘̚͘̕͘͘͘̚̕̕͘͘͜͜͜͜͜͜͜͜͜͜͜͜͝͝͝͝͠͠͝͠͠͝͝͝͝͝͝͠͝͝͠͝͠͝ͅͅͅͅͅͅͅͅl̶̢̢̨̢̧̧̧̢̢̛̛̛̛̛̛̳̬̳̤̗̗͕̰̬͓̩̮̭̙̺̭͇̳͓̼̣̹̪͉̰͉̰͕̣̪̖̣̝̩̙̥̮̝̠̮͇̜̤̥̙͚̺͖̱͎̯̤̩̞͙̥̟̘͍̰͉̞͍̳̯͚͚͓̗̱͔͔͍̜̹̬͙̰̠͙͉͉͎̝̞̬̜͖͇̪̮̤̖͈̪͉̬̮̮̖͙̬̘̻͚̞͇̪̥̥̗̠̹̲̫͕̙͓̩͓̗̗͙̪͙̍̈́̋̎͂̓̐͋̄̍̂͛̑̈́͐̓̾̈́̏͊̃̌͒͒͆̐̀̀͑̊̑̔̏͐͂̈͐̏̌͋̅̊̅̎̔̍̏̇̌̀͒̐͛͌́̏̂͆́́̓̽̽͐͒̾̓̅̈́̋̽̿͋̅̃͂̈́͑̑̀͌̈́̒̍́͛̉̿͌̌̓̄͛̿́̉͂̈̀̏̓̉͂̆̃̃̆̏́͋͒̉̈́͋̎̀̈̃̈́̋̃̈́̃̔͌́͒̂̒́̍͂́͗͌̎͗͌̈́̔͂͌̈̂̉̾͊͗̐̓͑̋́͊̎̐̽̎͛̇̈̆̄̎͗̚͘̕̕͘̚̚̚̚̚͘̕̚͘̚͝͝͠͝͝͝͝͝͝͝͝ͅͅͅͅͅͅḑ̸̨̨̡̨̧̡̢̢̧̧̡̢̢̢̡̨̡̡̧̨̨̡̛̛̛̛̛̛̖̺̲̼͉̬̘͕̝͍̳̯̳͚͔̰̺̝̮͙̼̬͓͖̹̘̳̞͎̳̖̦̥̦̮͎͕̟̦̥͙̙̝͈͍̗̱̪̥̲̘̦͔̯̳͕̪͚̠̘͔̗̟̻̯͕̳̘̝̬̯̖̦̞̜̻̺͕̹̰͇̝̟̯̙̪͔̮̼̳̥͉̥̟̝̪̼͕̠͉̜̩͉̬̣̹͖̤̖̮̞͍͎̖̫̺̩͎͍̬̩̯͇̗͚͇̩̺̖͓̱̭̪͇̭̱̟̘̙͚̣̱̖͇̯̘̭̖̗͎͙͈͚̫͉͔̫̠͈̗͉̯̪̰̘̞̖̞͎̜̻̻̳̝͚̬̙̰̻͓͙͈̮̺̬̼̼̰̺̭̮̟̤̦̥̜̙̲̱̭͇̮̞͚͓̻͎͈̙̰̻̻͚͕̝͈̜̫̥̱̞̍̀̋̊̈́̾̊̔͗̾̑̏͗̒̓̏̒͗̃̒̄̏̓̓̎͒̑͆̒̽͑̽̋̒͒͒̓̄̏̍̓̿́̈̈̐̈̓̈́̽̀͌̔͊̊̈́͒͒͛̂̍́͐͛̈͗͐̇̄̉̈̐̉͌͑̒̂̀̔͂̈́̑̔͊̾͐̊̒͑̀̒̅̿̎̋͋̾̎̋͊͌̐͛̈́̎̇͋̎͊͌̌͆͒̍̈̄̓͋̓̓͊̆́̒͘̚̕͘͘̕̕͘̚͘͜͜͜͜͜͜͜͜͝͠͝͝͝͝͠͠͠͝͝͝͝͝͝ͅͅͅͅͅͅͅͅ ̸̢̢̨̡̢̛̛̩̝͔̣̳̲̙̤͍̦̠̝̻͕̤̦̖̲͈̹̳̩̟̜̫̩͕͍̣͓̱̝̫̬̙̬̖̦̙̼̗̱̳̙̱̝̜̫͔̟͔̲̫̞̗͔̩̜̘͉̣͚͓̟̭̳̱̟͎͙̻͇̻̜̭̩͖͚͇̩͉̞̥̙̜̘̼̪͙̼̟͕̥̥̗͍̫̯̜̣̍̆̓̾̐̈́̓́͑͂́̃͛͑͂̎̅̈͒̅̅͒͐̿̒̏̋͗̆̎̎̓̉̓̈́̈́͆̂̎̂͌̿͛̒̎́̑̐̏̊́̓̍͗͊̌͌͊̿̓̿́̓͑͐͑̋̈́͐̂̊̊̓̔̾́̄̄͑̾̿̈́͌͐̈́͂̽͊̈́̽̎̀̈́̾͋̇͛̃̃́̑̅̀͊̈͑̍̓̿̋̒̊̌̂̄̑̎̀͐́̎̅͆͛̈́̈́̊͊̏̈͒̈́͋̏̈́̾͒̉̊͋̉̄͑̔̏̈́̔̎̓̂̌̉̑̀̄͊̍͌̊̍́̅̌͆̉͂́̓̂̈̑̓́̏̎̚̚̕̕͘̕͘̚͘̚͜͝͠͠͝͝͝͝͠͠͠͠͝͠͠ͅͅͅͅn̶̨̨̡̨̢̢̢̨̨̨̡̧̧̨̨̨̧̧̨̧̧̢̧̨̢̡̡̡̨̧̨̛̟̬̝̦̱̺̙͔͇̭̬͚̤̳̭͈͔̬̝̻̬̯̦̤̯͎̜͚̤͓̬̩͉̼̳̪̗̳̘̜̠̼̤̗̣̞̖̻̱̦̫̦̳̱͇͍̣̩̜̹͓͈̣͇̠̹̪̜̟͇̮̰̦̘̻͙̳̘̠͕̳̠̙͖̜̗̝̮̘̲̼̯͙͇͉̘̝̬̱̪͉͖̘̣̥͎̱̭͙͔̳͕̮̰͔̯̼̮̳̣̩͚̼̲̻̖̥̖͖̲̘̼͇̣̣̘̻̬̣̫̪̥̪͉͇̝̙̯̣͎̦͎̟͙͓̳̘̠̻̤̭̦̣̰͍̜̖̫̖̲̟̬̰̥̼̥̦͎̲͖̼͚͔̻̭̤͍͚͔̲̱̝͍̗͎̝͙̙̩̼̮͇̩̹̤͚̋̆̀̆̉̏̎̏́̄̔̿̓̂̈́͋̈̈̋͑̒͑͒̒̍͛͋̀̇̑̓̔̿̾̈́͊̅̕͘̕͜͜͜͝͝͠ͅͅͅͅͅͅơ̴̢̧̢̨̢̨̡̡̢̧̧̢̡̨̧̢̢̢̧̨̧̡̡̢̨̢̨̛̛̛̗̩̩̭̭̪͈̥͕̳̞̫̲̱͖̭̻͇͇̗̮̫̻͇̤̥̗̯̟̼̥̙̳̱̪̗̖̫̫̳̻͚͙̬̝̦͕̪͍͙̞͚̫͍̜̠̦͚̲̤͈̳͖̝̩̼̠̩̟̮̼͈͕͖̘̖̰̼̤̖͔͈̟̺͈͇̺̟̰̠͚̥͓̫̟̤̺̜͚͓̜̤̭̣͉̟̼̙̘̜͈̗͇̯̣̲̬̟̟̗͕͓͇͚̮͓͍͓͔̪̙͚̯̥͇̯̥̖̼͓̣͔̯̠͎͚̥̘̞͚̪̭͍̙͕̻̤̩̥͎̲̤̬͕͎̭̳͉͈̖̯̞͍̘͓̜̯̜̼͉̜͖̯̩̙̐̑̓͒͐̈́́̓͆̍̈́͐̓͛̈͑̌̈̈́̌́̿͋̐̏̑͊̈̽̽͛̈̀̆̅̈̓̌̅̓̇̆̉̽̊̂͐̌̌̊̈́̋̂͛̅͊̈́̀̆͐̉̈́́̂̇̏̌̈́̇̀͗̍͗̌̔̽̈́͂̋̊̏̈́̈́̿͐̔͌̆͗̊̎͂͛̐̅́̓̊̇͌̇̒̾̋́̌́̾̀̊̃̽̌̆̌̑̈́͌̐̏̄̆̋̔͆̏̂͛͒͆̋͌̆̆̈̔̄̒̔̕̚͘̚̕͘̚͘͜͜͜͜͜͜͜͜͝͝͝͠͠͝͝͝͝ͅͅͅͅͅͅͅt̶̡̧̧̧̡̢̧̡̧̢̡̡̡̢̡̨̧̨̨̨̡̛̛̛͇̦̠̣͍͕͚̬̬̩͖̺̯̤̲̯͚̼͕̬̼̠̺͍̤̳̰̫̫͚̥̺͔̟͍̩̻̩͉̞͖̣͖͈̯̥͈̰̟̣̫͎̜̦̮͓̩̙̻͓̟̫̟̥͈͈̱̞̰̳͍̯̮̬̦͓̫̬͈̥͔͖̞̘̺͔̲̬̞̰͇̺̻̪̙̩̫̹̭̮̩̯͓͚̹̞̯̟̥̳͓̹̤̖̲̖̻̳͕̮̜̳̱̬͍͙̟̖͇̬͉̩͔̥̳̲̜͕̗̜̥̖̣͓̙͚͓͉̺̰͍̻͉̤̪̘͖̰̻̺̠̥͕̤͎͈̦̺̘̳̮̘̯̘̳̞͚͎̱̭͍̞̦̗̩̤̤̻̱̱͔͉̳͔̖͚̯̫̰͍̙̱͇̲̭̟͉̭̗̫̟͇̗̫̱̹̙̯͖̲̭̳̹̣̭̬̥̪͓͇͙̯̰̻̜̪̻͖̺̗̘̮̳͔̪̋͗̀̅̌̐̔̏̆̄̓̔̽̇̎̽̆̔̄̀̉̑̓͐̎̇̾͋̅̃͛̈̈̉͛͊̉͆̉̈́̎̐̓̔͋̄̃̾́̓̈́̾̇͗̒̀̂̃́͆͋̓͂̊͂̔̉̀͊̒̄͋͌̇͌̈̍̔͛̽̆̓̃́́̇̃͋̆̑̓̔͛͆̿̀̉̓̂̀̒̔͆̈͆͌̒̀̑̾́̇̿́̀̽̎̏͂̇͆̀̐̐̓̇̀̀͗̅̀̃̌͊́̈́̂̀͛́̀́̒̂̏̏̑̐́̾̒̇̐̊̒̍̏̕͘͘̚͘̕̚̕͜͝͝͝͝͝͝͠͝͠͝͝͠ͅͅͅͅͅͅͅͅͅͅͅͅ ̶̢̨̨̨̡̧̨̨̢̡̧̢̢̧̧̧̡̨̢̧̡̨̢̡̨̨̨̢̛̛̛̛̛̛̛̛̛̠̳̖̗͇̱̞̯̫̲̩̩̹̞͔̘̦̘̹̭̭̩̩͇̗̤̝͎̹͎̣̲̪͇̺̥̣̠̩͍͔̹̜̱̳̹͖̠̹̬̜͈͇̤̰͎̮͔̜̦͖͖̭͚̙͔̤͉͙͍͉̰̲̟̯̭̺̹̟̬͉̜̥͖̙̘̰̜̪͉̜̜̭͖͖͍̻̫̫̤̥̙̬͕̱̹͔̘̟͉̭͙̫̬̻͙̘͍͇̲̞͕̗͉̣̭͍̱͓͔͎͓͉͚̮̜̦̲̯̫̙̱̖͔͕̙̺̺̦̫̠͉͚̫̗̠̭̟̬̭̰͓̺̱̘͈̘̱̠̖̣̫͉̗̖̣̥̖͓͎̗̘̜̼̯̗̞̰̻̰͙͕̭̺̹͂͊́̉̎̔̅̏͒̽̐͆͒̌̋͂͗́̀̇̋̏̀̓͆̒́͋̽͋̍̋̂̋̍͗̒̈̐̍̒̋͋̉̿͛̋̃̀̆̾͛͗͊͗̂̄̍͆͂͐̎̑͑̿͗̈́̅́͐̄͗̄͛͛̈́͐̆́́̒̉̒̔̋̐̎̈́̀̂͛͊̊͗̄̈̀̀̆̽͑̆͑̿͂̌̓̿̈̂̾̇̋̍̃̃̅̉̂̓́̀͛̾̍̆̽́̑̐̎͂̔͂̊̈́̌͒̅̔̄̾̈̄̓̿͋̉́͗̓̄̓̅̾̈́̀̌̍͆̀̐̏͐̚̕͘͘͘̕̕͘̚͘̚̕͘̕͘͘͘͜͜͜͜͝͝͝͠͝͠͠͝͠͠͠ͅͅͅͅͅͅḩ̷̢̡̢̧̨̢̡̡̡̨̧̧̨̛̛̭̙̫͈͉͓̮̞̙͉̘͈̻̼̤̜͇͇͖̤̤̤̱͈͖̟̰̣̻̬̝̙̺͉̪̞͈̞̻̼̰̬̮̥͓̯̞̣͖͉̮͈̩̹̝̰̲͓̝̺̟̱̹̺͚͙͇̟̞̼̞͔͖̯̖͕͓̺̣̯̪̣̝͉̥̗̣̺̯̯̞͉͕̲͖̱̺̱̳̖̥̦̠̫̲͕͈͖̭̖̖̬͕̘̥̫̥̳̤̺̳̥͍̠̘̯̣̭̱͍̬͍̞̯͓̺̲̫͍̭̻̩̮͈͎̞͕̮̬̣̙̟̖͙̺̬̾̀̍̽́̒̃̈́̂̈́̈́̊̒̇͊̍̓̌̈́̿̍̀̃͐͆̏̀͗̓͑̾̊̍̂̏̿͂̊̀̈́͆̍͗́͑̔̉̈͊̈́̔̀́̾̅̄͊̊̽̌̽̀̾̇̍̿̈́̋̐̾́͆̈́̄͊̌̀͌̓͋͛͐̏̂̓͋́̀̈́̔͂̎̓̈́́̈́̑͂̋̃̑̒̋̒̌̒̎̽̑̕̕̕̕̚͘̕̕͘͜͜͜͠͝͝͝͠͝͝ͅͅͅͅą̶̧̢̡̧̢̧̧̨̡̧̢̢̧̨̡̨̡̧̡̧͖̻̰̞̘͓͈̫̻̞̫̹̤̺̩̙̙͙̜͔̩̦͙͓̩͇͇͚̫̯̮̤͉̳͔͈̠̺͇͍͙̠̻̞͓̺̻͚̯̭͚̗͙͔̠̯̯͍͉̤̣̹̼͍̮̗͖̝̲̦͓͍̖̟̰̬͎̻̫͈̩͍̩̹̙̲̤̻̮̻̻̪͖̝̣͙̯̦̖͇̠̬͖̪̮̝̪̪͓̭̮̩̥̖͕̳͎͈̞̲̙̪̪̣͖̳̞̹̪̤̫̯̯̞͈̪̻̖̘̣̜̠̦̯̝̮̥̪̪̫̖̤̱̩͓̺̳̜̩̘̜̜̺͓̥̘̻̞̫̪̹͔̩̣͔̻̜͕̙͈̗̊̈́͐̆̑͐̄̄͗̏̿͆͗͛͗̓̿̎̽̾̈́͗̈̊̐̈́̏̃̆͒͘͘̕̕͜͜͝ͅͅͅͅͅͅͅv̸̧̨̡̨̨̢̧̢̛̛̛̖̘̪͔̱̯̯̖͉͈̯̬̖̞͈͍̫̜̞̜͉͉̖͖̮̬̺̞̼̪̥̘̭̤̙̮͉̣̣̯̳̯͖̣̲̦͕͉̼̘̼̞̹̜͖̙̦͕͔̹̲͓̫͖̻̳̦̤̳͚͙̭̗̺̠̪̲͉̠̫͔̹̫̮̞͙͖͚̝͚͈̼̯͉͉̘̺̑͆̈́̎̑͌͒̾̔̄̈͌̑̅̋̎̍̊̃́͂̄̇̀̑̿̀̇͊͂͌̆̋̎́͂̏͊̑̈́̈́̽͐̊̀̃̀͑̈̒̈́̐̍̔̀̎̂̉͌͌͆̈́́͋͒̀̇͋͐̔͘̚̕̚͜͜͜͝͠͝͝͝͝͝͝ͅė̴̡̧̨̢̨̧̛̛̛̠̘͕͔̙͓͎̪̠̳͍̹̜̦͓̮̱̮͇̮͈͚͕̼͔͚̺̥͍͉̙̘̱̦̺̜̞̜̗̻͎̩̤̞̬̖̙̭͖̗͚͆͗̇͛̄̏́̿͆́̄͌͂̅͊͐̈́͐̈̀̑̅̆͛̽͑͛̉̈͋͑̈́͐͐͂̑̐̓̿͋͐͛̇͗̽̾͗͊̍͌͛̑̀̌̓̔̈͐̓̃̾̃̅͗̎̆̒͑̑̇̌̃̄̈́̔̎̅̇̄̂̔͒̐̐̓̆͌̃̆̈̓͂̿͌͒͐͌͊́̓̑̀̋́̄̈́̆͑̕̚̕̕̕̕̚̕̕̕̕̚͜͜͝͝͝͝͝͝͠͝͝ͅ ̶̧̡̨̢̢̧̨̧̨̡̧̢̧̨̨̢̧̧̢̡̧̡̡̱̪͍͎̦̝̗̬͖͚̳̤̖͎̟̫͙͕̺̜̝͚̺͓͎͔̟̜͍̯̗͖͚̟̣͔̻̟͈̝̗̳͖̦͈̬͕̱͈̳̣̼̭̟̠̜̦̘̗̝͕̮̟̠̣̹̭̜͍̭̱̭̖̭̦̖̜̝̭͔͕̹̰̼͕̪͇͍͕̭̣̝̟̹̥͔̭̯̼͎̘̤̩̲̠̭̙̘̙̺̹͉̲̩͔̰̬̯̘̫̝̦̖͇͔̙̯̭̤͇̥̻̤̽̑̔͌̐̊̓̀̈́̌͗͌̓͆̃̎͑̅̂͗͐͆̓̉̀̄̌̄̈́͗͆̊͛̊̈́̄̈́̅̐̉̄͋́̽̌̿̑́́̔͂́͋͆́̍̈́͆͋͂̽̀̿̎̾̊̉̄̒̅͆̈́̓̀̃͒̓͊͗̓̉͊͑̿̀̈̓̓̍͒̄̽̽̔͗̏̍̂̎́͛͐̑̈́͒͐͐́̅͊̀̓̄͑̆̔̓̃̏̊̽́̿͑̀̌̈́̕̕̕̕̕̚͘͘̕͜͜͜͝͝͝͝͠͝͝͝͝͝ͅͅͅͅͅc̴̡̢̨̢̛̭̲̹͖͙̲̬͖͕̪̗̳̱̫̰̪̺͖̝̹̰̋̍̅͂̈̒̊͂̈́̎̀͗̆̀̂̈́̄̄͆͋͆͂̿̾̏͋͗̅̔̆̇̓͂͗͆̓̎͆̌̒̓̅̽́͑͘̕͘̕̚͜͜͝͝͝͠͝͠ͅͅͅͅô̶̡̧̢̡̢̢̨̧̨̡̧̢̳͚̹̤͉̖̖̟̺͇̮͉͇͍̪̲̳̙͔̼̤̩̹̦͕̞͓̠̬̝̩͇̫̭̗̣̻̱̙̱̘͓̘̪̜̜̼̳̫͍̗̥̩̝͈͇͈͖͙̜͍̮̻̮̪̞̱̝͔̼̩̮̭̲̪̩̪͉̥̣͖̮͕͔̤̼̤̱͎͓͖͖̟̟͎̖̪̥̳̣̩̪͖̪̤͖͓̬̻̘͓̤̜̲̩̥͍̭̜͉̬̭͕͇̗͉̘̥͇̤͗̓̿̒̉̆̎̐͆͋̆́̀͑̿̓̌͗͊̈́̄͂̔̌͂̇͜͜͜͝͠ͅͅͅm̶̢̧̢̡̨̢̧̧̧̢̨̢̨̢̢̧̡̧̨̢̢̨̛͔͙̺̤͇̹̲̺̺̮̘̞̬̯̤̣̪̞̻̩̣̺̮̬͈͉̞̠͖͇͍͇̘̪̠̣͓̪̰̳͎̠̲̯̖̜̦̜̟̘̜̥̼̖͔̳͔̗̖̠͚̲̳̦̥̰͓̼͈͍̥̞͎͙̙̥͉̣̩̗̰̟̪̠̣͈͓͉͈̗͙͉̥͈̰̭̻͕̣͔͓̼̱̠̣͉̣̹̫̠̠͍̹͎̺͚̮̘̲͉̙͎̹̺͙͙͕̫̩̱̬̗̺̜͕̻̰̘̮̩̮͚̣̥͕̜͔̲͍̤̯̗̟̠̖͎̩̥̦͚̩͙͙͇̺̥͍̬̙̠̯̜̰͎͕̙̪͇̜͇͍̘̩̥͈͙͈̝̩͎̠͔̝͉̭̳̠̳̮̳̰̤̻̫̩̠̳͖͚̅̈͋͗̎̀͗̈́̈̓̏͂̈́̀͗̄̔̈́̊́̓͋̃͐͊͘͜͜͜͜͜͜͝͠͝ͅͅͅͅͅͅȩ̴̛̛̮̹̣̰̜̦̯̬̱̩̝̺̭̜̰̠̤̘̫͚͎̣̲̺̟̳͎͍̙̰͓̱̤̫͍̯̥͈͈͙̼͎̼̣͈̻̝̟̲͖͔̠͖͓̭̥͓̥̙͚̦͍̠͔̲͎̹͚̣̰̲́̎̂̆̑̅͋́̌́́̑͌͂̍̌̿̌́̐̀̿͒̈́̂̾̏̽̂̒͆̿̋̍̽͊̄͂̐́̆͆̀͗̐̋͒͑̆̈̓͊̿͂͑̽̓̈̚̚̕̕͜͜͜͜͝͝͝͝ͅ ̵̢̧̨̡̡̨̨̢̛̛͖̺̳̹̩͚͎̣̗̺̼͖̼͕̠̩̣̟̮̭̱̟̩͇̯̤̞͎̺̮̳͓̪̠̖̰͓̙̝̩̫͙̜̫̖̣̭̪̺̹̙͇̖̩̹̲̤̯͓͖͉̪̗̰̳̟̱̲̩̝̭̼͙̯͚͎͉͓̗̮̭̮̺̲̱̩͓̙̰̖͈̖̻͖͚͚̤͕͓͉̗͚͓̗̭̘̓́̽̊̇̇̑̂̑̏̆͑̐̍̈̄̑̀̋͛͂̓̽͊̈̍͒̉̉́̏̇̽͌̀̾̽̄̇͛̓̽̓͆̈́̃̓̿͂́͗̓̅̆́͗̽͊́̌͛̏̊̑̿͒̈̅̓̓̔͒̀̄͂̇̔̀́̈́̆̄̌̂̽̉͋̀̌͆̎̌͋͋͒̽̏́́̓͆̃̉͐̓̐͋͊͛̆̾̄̔͋̆̌̅̆́́̿̉̽̈́̈̽͛͐͗͐̐͐̑͌͊̍̌̀̈́̔̉̎̕͘͘͘̕̚͘͘̕̚͘͘͜͜͜͝͠͝͝͝͠͠͝͠͝͝͝͠͝͝ͅͅͅͅh̶̛̛̘̦̬̮͕̯͈͔́͒̓̍̿̃̇͑̀̐́͌̈́̈́̾͗̒͛̈͗̂̈͊́͋̀̋͂̀̀̓̏̈͊̆̃͒̊̈̉͌́̅̋̊̃̉̓́̒͐̀̌̓̑͊̔̏̎̐̈́͗͌͂͑̓̋̒͌͐̆͒͌͌́̋͊̅͌̄̏̚̕͘͘̕͘̚͘̕̚͝͝͝͠e̶̢̡̧̧̨̢̢̟̜͇̗̣̙̞̩͚̭̳̝͕͔̥͚̮̱͕̥̺̪͖̪̘̩̹͉̣̹͕̯͚͓͉̹̪̻͎̩̝̭̘͈̲̗̯̖̳̫̮̰̼̙̬͈͎̯̫̙̤̮̗̩̟̩̙͕͔̥̦̝͖̫͕̪̖̱͓͕̩̩̲̜̬̼̬͈͆̍͋͆͑̽͝ͅͅͅͅr̴̨̧̡̢̢̨̧̢̧̧̡̢̛̲̜̬͇̼͚̬̪̘͖̣̝͖͚̙̦͖̜̤͈̜͕̳͉̼̬͚̣̝̺̭̗̩̲͎͍̘͍̻͙͇̲̫̱͇͖͇̦̥̳̹͓͚̱̯̟͓̙̗͈̙͈̲̹͖̘̗̙̬̮̼̦͇̮͙̭̪̻͍̞̖͕̲̬̣̯̟̲̻͎͎͇͈̟̣̩̺͔̗͕̦̹̼̠̥̦͙͓̙̯̣̝̜̼̳̲̯̹̩̪̤͙̻͈̤̺̮̖͚̩̱͚̞̗͇͇͙͚͚̟̝̥̐̏́̈́̔̓̐̍̇͂̈́̈́͑͐̋̒̔̿̎͋̅̓͌̉́̓͂̔̔́̄̏̾̈́̈̏̐̅́̀͐̽͌͐̔̀̍̿̃̒͛̇̈̑̅͌̌̀͗̀̅͐͗̓͛͘̚̚̕͜͜͜͜͝͝͝͝͝͠͝͠ͅͅͅe̶̡̢̨̨̡̧̢̧̢̧̧̨̡̡̨̡̧̢̡̢̡̡̨̧̨̛̛̙͓̺̠̳͓̳͈̬͈̘̬̰̱̲̦̰̱̣͈̬̺̼̣̬̲͍̲̜͙̻̱͍̞̼͕͍̖̭̝͈̗̟̟̟͍̜̭̰̦̗̟͖̙̺͉̪͖͙͈̩̩͇̦̤̙̥̯̠̭̭͎̻̯̣̪̟̰̜͚̗̼̲͖̥͎̮̘̜̝̖̣̳̮͙̜̩̼̩̥͚͈͍̮̮̥͓͖̦̫̯̹̘̟͚̜̮̰͕̣͙̻̱̲͔͓̜̹̗͇͍͔̳̮̺̝̘̘̭̰͖̤̦͉̼̰̝͉̠̳̩̬̹̭̥͖̞̣̗̫̼̟̘͇̟͙̱̟̺̘̪̱̲͔͈̥̮̱̫͍̝̦̫̹͈͈̖̘̯̭̼̹̘̘̪̤̠͙̺̫̰̳̝̞̳͍̣͔̰̭͇̯̼̺̲̫̩̠̙̳̘͚͖̖̘͉̼̹͋̓́́̀̈͑̅̊́̐́̈̿̐͆́̓̈͗̑͛͌̿̊̊͆̑͂̋̈́̓̑͂͋͑͌̃̅̈̈́̅̐͒̈́̓̈́̿̀̄́͋͊̿̌̾́͊̀̈́̏͒͂́̂͛̀͆̍̄́̃̍̈́̑̂̅͑̊͋̓̔̈̉̍͂̈́̂̌̄̔̈́̏̏̒͐̂̓͊̀̀̀͆̍̏̆̇͊̄̈͗̌͊̈̋̇̄͌͛͒̅̓̐́̆̇̈́̔̑̀̾̑̍̎̂̋͛̉͋̿̅̍̈́͆̈̽̋́̽̈́͒͋̏͑͌̋͊̎̎̀̒̅̚̚͘̕̚͘͘͜͜͜͜͝͝͝͠͝͝͝͝ͅͅͅͅͅ ̸̨̨̧̢̨̧̨̢̧̢̡̨̢̨̨̡̡̨̡̢̧̨̡̡̨̨̧̛̛̛̛̭̬͚̺̪͓̻̙̲̠̺̠̞̠͖̲͇̞͉͕̳̲̖̣̺̣̱͕̱̭̫̻͔͈͙͉̥̭̠͈̥̖̦͇͙͖̗͇̼͚̥̮̩̯̜͔̗̯̮͕͖̳̖̻̹̟̘̞̤͍̪͙̻̗̼͙̩̪̯͉̝͕͈̤̰̫̙͙͍̻͖̣̤͖̤̯̫̠̯̪͇̱̤̥͔̥̦͙͍̤̻̮͉̱̼͕̟͕̩͈͙͓̩̦̹͙͓͎̼̼͎̠̣̝̗̫͎̫̥̞͉̭̞͙̣̭̗̰̬͙̜̗̫̻̞͎͇̝̪̘͔̗̳͓̰̝̱̩̳̫̺̝̟̯̩̭̖̯̺̤͚̙̯̮̗̝̠͇̳̹͙͍̥͙͍̣̣̳̪̗̫̙͇̗͕͕̜̘̟̩̻̺̫̪̥̦̠͙͓͔̹̳̗̗̳̗̰̝̗̹̙͇̱̘̝͕̼̯̙̰̜̻̜͙̝̥̳̫̬̭̩̓͋̔̾̀̌̓̽͋̈́̐͒̈́́̀̋̏̋̐̈́͋́̊̌̃̓̄̉̔̆̉̓͑̈́́͋̈̍͗̐́͂͒͐͑̔̃̓̿̈̑͗̍̆͑͆͛͐̑̑͊̽̽̉̑͑̄̍͋͌̈́̽̓̽̽̌̒͂͌̅̈́̇̍͑̏̅̀̔̍́͋̀̉̒͌̍͋͛̾̈́͋̉̂̆̄̍͑͋̇͊̀̄̆̏́̔̆̐̏̐̈̾̎͐̀̅̿͆͑́̉̏̄͛̈́̓̍̈́͗̃͑́̏̓̓̽̅̌͗̇̓͒̌͛̓̋̏͐͋̈̏̃̓̌͂̋̈́͋̈́͐̂̃̽̓̂̽̍͗̈̌̄̑̆͋̒͗͊̔̔̎̿͂̆͐̓͋̈̉͌̽̎̈̑̆̉̀͑̑̀̅̑͑̓̄̐̍̎̎̏̊̂̎̈́͌̆̂̈̒̅͌̍̔̓̀͂͆̌̅̈̚͘̚̚̕̕͘̚͘̚̚̚̕͘͘̚͘̚̚͜͝͝͝͝͝͠͠͝͠͝͠͝͠͠͠͠͝͝͝ͅͅͅͅͅͅͅͅͅ ̶̨̢̡̛̤̞̱̠̱̻̗̱̗͉̳̲͚̰̻̥̗̝̥̺̲͕̗͓̰̫͈̖̠̮̮̭͉̿͑̉̌̎̈̈́͂̈̌͌̃͆͛̔͐͋̓̄̓̽́̿̊͊͌̒̓̒̒̅̈̀̈́̉̀̏̔̊͛̿̐̈̓̐̋̔͒͊́̈́̈́͛̉̓̀̓̉͛̑̿̐͑̏̈́̓͌́̒͒̋̀͐̓̓̔̍̀͐̚̕͘̚͜͝͠͝͠͠͠͠͠');
