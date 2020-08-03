
/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */

import $ from 'jquery';
import api from './api';
import store from './store';

///////////////////////////////////MU GENERATOR FUNCS//

//const generate = function (){};

const generateHome = function () {
    $('main').html(`
    <div class="header-container child">
    <header role="marquee">
        <h1>markabl.</h1>
    </header>
    <div class="error-container">   ${store.state.error ? `
    <div class="error-box error-box">
    <div class="close-error-button">
    <i class="fas fa-window-close">
    <button id="cancel-error" class="close-error-button">Close</button>
    </i>
    </div>
    <div class="error-text">
    ${store.state.error}
    </div>
    </div>` : ''}</div>
</div>
<div class="filter-div child ${store.state.adding === true ? 'hidden' : ''}"></div>
<div class="start-add-book"><button class="start-add-bookmark" type="submit">Add New</button></div>
<section class="display-container">
    <section class="add-bookmark-sect child"></section>
    <div class="error-container child">
    ${store.state.error ? `
    <div class="error-box error-box">
    <div class="close-error-button close-error-button">
    <i class="fas fa-window-close">
    </i>
    </div>
    <div class="error-text">
    ${store.state.error}
    </div>
    </div>` : ''}
    </div>
    <section class="start-page">
        <div class="main-controls child"></div>
        <div class="filter-div child"></div>
        </div>
    </section>
    <div class="list-display ">
        <ul class="list-ul child"></ul>
    </div>
</section>
`
    )
};

const generateStart = function (bookmarks) {
    if (store.state.adding) {
        $('button[class="start-add-bookmark"]').text('Cancel');
        return generateAddBookmark();
    } else {
        $('button[class="start-add-bookmark"]').text('Add Bookmark');
        return generateBookmarkList(bookmarks);
    }
};

const generateFilter = function () {
    $('.filter-div').html(`
    <label for="rating-select">minimum rating:</label>
    <select class="rating-filter" name="rating-select" id="rating-select" placeholder="${store.state.filter}">
        <option value="0"  ${store.state.filter === 0 ? 'selected' : ''} >Select</option>
        <option value="1"  ${store.state.filter === 1 ? 'selected' : ''} >1</option>
        <option value="2"  ${store.state.filter === 2 ? 'selected' : ''} >2</option>
        <option value="3"  ${store.state.filter === 3 ? 'selected' : ''} >3</option>
        <option value="4"  ${store.state.filter === 4 ? 'selected' : ''} >4</option>
        <option value="5"  ${store.state.filter === 5 ? 'selected' : ''} >5</option>
    </select>
    `)
};

const generateAddBookmark = function () {
    return `
        <div class="add-form-container child">
            <form id="add-bookmark-form" class="">
                <div class="addform flexdaddy" >
                    <label for="new-bookmark-title" class="flexkid">Add New Site:</label>
                    <input type="text" name="new-bookmark-title" class="bookmark-title new-site-name flexkid" id="new-bookmark-title"
                    placeholder="Enter Site Name" required>
                </div>
                <div class="addform flexdaddy">
                  <label for="new-bookmark-url" class="flexkid">URL ('https://' is required):</label>
                  <input type="url" name="new-bookmark-url" class="form-control new-site-url flexkid" placeholder="http(s)://" id="new-bookmark-url"
                  required>
                </div>
                <div class="addform flexdaddy">
                   <label for="new-bookmark-description" class="flexkid">Add a description:</label>
                    <input type="text" name="new-bookmark-description" class="form-control new-site-desc flexkid" id="new-bookmark-description"
                    placeholder="Enter a description..." required>
                </div>
                <div class="rate-new flexdaddy">
                  <label for="new-rating" class="flexkid">Rating:</label>
                  <select name="new-rating" class="new-site-rating flexkid" id="new-rating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  </select>
                </div>
                <div class="new-site-submit flexkid">
                    <button type="submit" class="add-bookmark-submit flexkid">Save</button>
                </div>
            </form>
        </div>
        `;
};

const generateError = function (message) {
    return `
        <section class="error-content">
          <button id="cancel-error">Close</button>
          <p>${message}</p>
        </section>
      `;
};

const generateBookmarkList = function (bookmarks) {
    const bookmarkListItems = bookmarks.map((bookmark) => {
        return `
            <div data-item-id="${bookmark.id}" class="bookmark-li ${bookmark.id} child flexdaddy ${bookmark.expanded === true ? 'hidden' : ''}">
            <div class="small-div">
              <div class="small-list-title flexkid">
                <a href="${bookmark.url}"><h3>${bookmark.title}</h3></a>
              </div>
              <div class="list-rating flexkid">
                <h3>Rating: ${bookmark.rating}</h3>
              </div>
              <div class="flexmom">
              <div class="list-see-more"><button class="expand-from-list flexkid" name="detail-view" type="submit">${bookmark.expanded === false ? 'More' : 'Less'}</button></div>
              <div class="edit-and-delete-div"><button class="delete flexkid" name="delete" type="submit"> Delete </button>
              </div>
          </div>
            </div>
          </div>
          <hr>
    <div data-item-id="${bookmark.id}" class="bookmark-li expanded-bookmark group ${bookmark.expanded === false ? 'hidden' : ''}"  >
        <div class="flexdaddy child">
            <div class="xpanded-link flexkid">
                  <p type="url" name="bookmark-url" class="edit-site-url">URL:${bookmark.url}</p>
            </div>
            <div class="xpanded-desc flexkid">
                <p type="text" name="bookmark-description" class="form-control edit-site-desc">${bookmark.desc}</p>
                <div class="xpanded-rating flexkid">
                    <div class="edit-rating">
                    </div>
                </div>
            </div>
        <hr>
    </div>
</div>`;
    });
    return `
            <div class="bookmark-wrapper">
                ${bookmarkListItems.join('')}
            </div>`;
};

/////////////////////////////////////////////////Render Funcs

//const render = function () {};

const renderError = function () {
    if (store.state.error) {
        const err = generateError(store.error);
        $('.error-container').html(err);
    } else {
        $('.error-container').empty();
    }
};

const renderMain = function () {
    renderError();
    generateHome();
    generateFilter();
    if (store.state.adding) {
        $('section.add-bookmark-sect').html(generateAddBookmark());
    } {
        let bookmarks = store.bookmarks;
        if (store.state.filter > 0) {
            bookmarks = bookmarks.filter((bookmark) => bookmark.rating >= store.state.filter)
        };
        $(`.display-container`).html(generateStart(bookmarks));
    }
};

//////////////////////////////////////////////////////////////Event Handler Funcs

//const handle = function (){};

const getBkmkIdFromElement = function (item) {
    return $(item)
        .closest('.bookmark-li')
        .data('item-id');

};

const handleCloseError = function () {
    $('main').on('click', '.close-error-button', () => {
        store.state.error=null;
        renderError();
        renderMain();
    });
};


const handleAddStart = function () {
    $('main').on('click', '.start-add-bookmark', (event) => {
        store.state.adding = !store.state.adding;
        store.state.error = null;
        renderMain();
    })
};

const handleAddBookMarkSubmit = function () {
    $('main').submit('.add-bookmark-submit', function (event) {
        event.preventDefault();
        store.state.error = null;
        store.state.adding = !store.state.adding;
        const newBookmark = {};
        newBookmark.title = $('input[name="new-bookmark-title"]').val();
        newBookmark.url = $('input[name="new-bookmark-url"]').val();
        newBookmark.desc = $('input[name="new-bookmark-description"]').val();
        newBookmark.rating = $('select[name="new-rating"]').val();
        api.postNewBookmark(newBookmark)
            .then((data) => {
                store.bookmarkStorePush(data);
                renderMain();
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
                renderMain();
            })
            renderMain();
    });
};

const handleDeleteBookmark = function () {
    $('main').on('click', '.delete', event => {
        event.preventDefault();
        const id = getBkmkIdFromElement(event.currentTarget);
        api.deleteBookmark(id)
            .then(() => {
                store.findAndDeleteBook(id);
                renderMain();
            })
            .catch((error) => {
                console.log(error);
                store.setError(error.message);
                renderError();
                renderMain();
            });
    });
};

const getFilterValue = function () {
    $('main').on('change', 'select[class="rating-filter"]', (event) => {
        store.state.filter = $('option:selected').val();
        renderMain();
    })
};

const handleFilterSubmitClicked = function () {
    $('main').on('change', 'input.filter-checked', () => {
        if ($('input.filter-checked').is(':checked')) {
            renderMain();
            $('input.filter-checked').val(':checked');
        } else {
            store.state.filter = 0;
            renderMain();
        }
    })
};

const handleExpandFromList = function () {
    $('main').on('click', '.expand-from-list', event => {
        event.preventDefault();
        const id = getBkmkIdFromElement(event.currentTarget);
        const currentBook = store.findBookmarkById(id);
        store.toggleExpanded(currentBook);
        renderMain();
    })
};

/////////////////////////////////////////bindListener func

const bindEventListeners = function () {
    getFilterValue();
    handleAddBookMarkSubmit();
    handleCloseError();
    handleAddStart();
    handleDeleteBookmark();
    handleFilterSubmitClicked();
    handleExpandFromList();
};

/////////////////////////////////exports

export default {
    bindEventListeners,
    generateStart,
    generateFilter,
    generateAddBookmark,
    renderMain,
    renderError
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   // console.log('                                                                                                                                                                                                                                                                                                                                                        ̷̧̨̡̨̨̡̨̡̢̛̛̛̛̛̛̛̥͚͉̙̦̠̙̘͉̖͔̜̬̦̻̥͖̖͙̰̮͙̻͚̱͖̳̩͍̙̩̯̖̮̺̜͍͍̪̠̲͍̗̦͍̪̫̎́̀̀̒̃̽̑̉̉̐̏͛̋̀̂̽̎̐̃̀̾̆̆͆̈́̏͑͌̓̐͋͆͗͊̒̉̋̃̊̍̇̉̌̔͑͆̆͆͛̾͒̀͌̂̿̄̊̅͆̈́̄̅̃͋̊̍͐͑̏̋̄̔̏́̐̽̽̾̉͆́̔̒͑͊̅̇̾̏̏͗̾̊̽̈́́̃̽̈́͆̈́̑̿̊̒̆̑̐͒̊́̽̆̄̈̾̔̃̓̃̉͊̿̉̈́͗̔͂̌̀̿̀̽͐̈́̋̑̆̋͋̉̈́͂̓̒̿͋̇͂̓̎͌́͊̓̽̈́̈́̃̊́̆͂͒͋̀̈͑̉͊̆̾̌̾͋̿́͋͐͛͑̈́̈͊̄̔͂̎̂͗̈́̑̓̈̇̌̔͊̒̈̈́̓̐̍̌̿̈́̈́̔̏̂̀̐̍̔̓͗̅̒̌͌̿̈́̌̀̎̐̔̍̾͒͋͑̾͆͋̌̒̓̚͘̚͘̚̚̚͘̚̕̚̚̚̚̚̕̕̕̚͘͜͜͜͝͝͠͝͝͝͝͝͝͝͝͝͝͠͠͝͝ ̶̡̢̢̨̨̢̡̡̡̢̨̡̨̢̢̨̡̨̢̡̧̧̡̛̛̛̛̛͚̰̺̙͚͇̻̖̜͚͍̭̘̥̹̮̻̙̹͉̬̺͉͎̠͓̲͙̤̩̦̯̭̳̭͔̜͚̹̣̬̜̞̱̮̦͙̮̖̥̟̘͇̫̠͎͖̹̟̪̲̳̻̝̩̫̥͔͈̲͎̖̝͙̙̰̼̬͉̫̲͇͈̙̪͔̬̟̘͓̖̹͇̺̭͓̻̠̭̰̰̫̠̪̻̜̜̮͔̜̙̺̘͖͍̲̭̰̼̦͓̣͎̦̟͖̭͇͇̦̯̭̺̦̬̯͖͕͉̲̠̻̗̤̲̫͖͕̫͔̯͎͙̦͇̼͉̘̠͑̓͗̔͋̈́̏͛̎̏̄͆̀̈́̔̑̀̒̍́͐̈́̔̉̋̔̽̂̑́̀̆̋̊̒̂̈̓̉̔͗̄̈́́́̓̎̀͐͌͂͗̔̓̔̿͋́̈́̂͛̍̎̆̓̃͒̾̽̊̅̈̆̈̾̈͊̓̍̍͂̽̔̿̃̓̐͋͋̄̄̎͋͆̅̈́̀͂͋͆̎͛͛͐̍͊̎̋̾̈́̈̀̈́͊̀̋̃̈̏̄̅͗͆̏̊͒͛̀̀̃́͂̆͐̎̂̓͐́͗́̕͘̚͘͘͘̚̚̚̚̚͜͜͝͝͝͝͝͝͝͠͝͝ͅͅͅͅͅͅy̵̢̡̧̧̧̨̧̨̨̧̢̧̨̛͉͔̼̮̳͍̠̰̹̰̝̲̰̜̠̹̫̝̯̬̯̹̗̬͙͚͚̱̜̯̫̯̩̜̞͕͇͚̺̰̦̺̮̭̲̦̞̲̻̩͉̲̖̪̣͇̠̭̰̬̞͖̣̼̙̮͓̩̩̲͕̰̲͙̲̘̳̟̰̘̱͙̭̦̺̹̩̓̅̓̌̿̈́͋̄́̈̓͊̔̔̊̄͋̎̆̂̿̐̽̍̽̽̉̈́̑̄̍́́̋̾̈́̆͛̕̚̕͝͠ͅo̴̧̢̨̡̧̧̢̢̨̧̡̧̡̢̡̡̧̡̡̡̢̡̨̧̪͈̞̖͈̥̞͕̘̫̤͉̘̟̳̜̗͙̠͚̠̫͉̼̪̖̹͓̗̮̗̗̞͚̬̙̠̰̮̠̮̹̖͓̞̠̜̹̲̫͚͖̩̺̦͕͉͍̪̜̱̠̝̦̞̤̘̤̞̝͇͙̘̟̗̮̟̤͉̪̜̥̩͖͍̯̩̪̬̮̘̲̖̠̯͖̠͎̱̟̪̘͚͈̹̱͕̟̫̼̭͔̠͉̞͉̫̘͍̖̠͖͎͙̘̼̫̺͚͈̩̟̟̖͉̼̗̳̙̤̜̠̬͍̘̭̬̮͍̲̣̤̱̘͍̥͈̞͕̞̮̗͓͖̙̞̖̣̺̦͚͗̋͜͜͜͜͜͜͜͝ͅͅͅͅͅͅứ̶̛̭̈̉̀̅̈́͑͆́̉̉̌̾͂͗̂̂̒́̈́͐͌͋͒̿̐͂͆̿͛́̊̔̐͑͑̄͂̉̈́̌̌̀̍̀͆̑̏̄̇̈́͊̉̏̒͐͌̊̇̍͌̃̽̀̔̉͛̈́̊͑̏͛͋̇̓̎͋̈́̓̍̅͐͑̄̆͌̉̌͌̅̀̎̍́̅̉̀̍̂̂͊͋̊͒̏̇͋̈́́͒̎͑̾́́́͑̏́̅͆̄̋̑̔͆̈͌̓͗̒̉͂̀̓͆̍͑̈́̊̓̈́̍̉͂̒̏̎͑̅͐̏̿̓̈́͗͋̐̅̊́̀́̔̂̀͌̈́̋̀͌̐͆̊̏͒̊̉̇͌̔̅̀̇̔̔̌̕͘̚͘̕͘̕̚̕͘͘͘̚̚͘͘͝͝͝͝͝͠͠͠͝͠͝͝͠͝͝͠ ̵̡̢̨̢̢̨̨̨̡̨̧̢̨̨̡̧̨̧̨̡̛̳̻̹͓̰̘͇̖͙͈̗̼̩͓̼̼̩͍̟͚͉͕̪̺̰̲͈̪͎̭͚̹̱̪͎͎̻̗͓̙̙̝̯̝̱̱̪̩̝̦͚͓̦̳̮̳͉̳̙͉̻̫̺̰̭͍͉͉̯͍̝̤̪̜͓̼̯̰̜̹̲͍͖̼̯͉̮̬͎̤͇̙͈̩̖̮͈̺͖̥̟͓̹͖͕͍̼͖̼̯͈̯̣͈̜̲̺̳̗̮̺͇͕̞̪̹̲̟̝̩͎̦͙͚̥͓̣͇̻͙̳̙̲̰̰̥̘̩̬͔͎̠̥̭͍̣͓͓̼̻̝̲̲̗̼̭̼͙̬̞̟͔̤̖̞̞͉͔̭͚̞̹͙̩̗̥͔̳̙̙̜̥̩̞͕̩͈̳͚̜͚̗͎͕͙͍̬̫̣̩͈̻̖̙͇͎͔̼͈̖̫̱̮͕̦̫̗̞̠̰̜̬͙̘̥̘͖̼̻̤̈̍̿̃̀̿͐̐͑̈́͛̇̈́͗̐̂̔̿͊̉͒͒̍͗͜͜͜͠ͅͅͅͅͅͅͅͅͅs̷̡̧̡̡̢̨̢̨̡̡̛̛̛̛̛̗͚͕̱̟͕̣̜̮̯̼̰̖͓̟͉̪̪̹̟̞̳̖̗̩̭̙̦̠̦̣̲̫̗͖̻̹̗͈̳̳͚̭͍̝̥̪̮̤̟̲̤̫͔͙̬̘̹͙͉͙̦̺̙̠͎̝̗̹̦̘̖̯̫̫̭̟̫̞̦͉͉̺̻̯͔̹̹̖͇͙̩̙̗͊̊́̋͆́͊͂̑̔̐̐̒̉͒̔͑͂̏̇́̿͆̓̈́͌̐͛̆̍͒̓̓͑͆͂̄̄́̓͌͒͌̓̍̀̐͂̎́̌̾͑̈̈́̅͊̈́̎̆̂̽̈̏̈́̒́̅͊͑̿̿͌̈̊̍̎̈̃͋̽̐͌͑́͊̓͐̾͐̏̎͊̏̈͒̃͗̌̑͌̈́͋̉͆͐̀̐̏̂̆̀͐̍͆͂̊̋͋͋͋̀̔̅̔͂̎̈́̃͗̊̋̈̎̓́͊͛̀̀͆̎̈͆̎͋̒̆̈̈́̑̎̔̿͐̌̒̎̈̈̀̀́̈́̓̏̓̀̂̿͑̾̉͌̈́̈́͂̓͗̊́̔͛͛̈̑̐͆̌̊̈̊͒̈́͂̅̈́͛̀̓͊̑̇̉̾͗̅̏̉͆́̈́̈́̓̉͋͆̈́͑̒̎̉͛̿̈́͗̕̕͘̕̕̕͘͘̕͘̕͘̕̚̕̕̕̚͘͘͘̕͘͘͜͠͝͝͠͝͝͝͠͠͝͝͠͠͠͝͠ͅͅͅh̷̢̢̨̛̛̛̛̛̛̛̛̙̬̬̲̣͕̼͇̩͍̯͎̝͉͓̣̩̹͔͉̬̳̹͉̤͇̻͔̲̟͔̫̥̦̣͇̝̺̰̼͖̗̳̞̰͉̙̻͓̣̖̩̗͔̥͈̹̜̻͉̙̟̘̘̰̖͖̝̤̜̲̞̃̈́͋̇̈́̈́͛̉͋̔̐̔͒̓̀͑͗̾̂̄̔͗͋̏̅̂̔̏̌͋̉̌́͑͆̍̔̾̄͐̀̾̈̓̓̾̉̀͗̎̈́̌̾̈́̏͑̑̈́̑̓̇̈̐̏̐̾͒̇̓̍̏̂̀̀̔̑̈́̈́͂̽̀̓͑̂̑͛͛̒͒͆̊̋̃̒̋͊̀́̓̏̋̄̄̈́̓͛̏̽̒̔̾̓̎́̃̀̈́̓́̂́͑̀̄̇̂̅̌̀̐͐͑͛̀͋̌̿̋͗̈́͒͋̎̔̅͆͛́͊͛̋̐̈̀̊̉̌̐̍̓̿͌̐͆͒͒͒̈́͒́̈́̋̃̆̇͑̈̔͊̈́͒̐̆̉͂̿́́̈͆̍̊̊͘̚̚͘͘̚̚̚̚͘̚̕̚͘̕̚͘̕̕͘͘̕͝͠͝͠͝͝͝͝͝͠͝͠͝͠͝͝͠͠͝ͅͅǫ̷̢̨̨̢̨̡̢̧̢̢̧̡̨̡̡̡̡̢̡̛̛̛̛̛̛̛͎̦̻̫̞̱͖̝͈̩̰̝̪̳̪͖̮̜̼͚̻̙̭̣̜̟̰̲̮͕͙̳̪̲̟̹͇̼͚̙̰̖̻̘̹͙̰̞͍͎̝̬̱͇̪̪̹̠͚̗͎̰͇̜̦̙̗̗͉̣͚͉̙̳̲̱̳̺͈̞̤̲͉̰̰̜̩͍̫̜͎̗̖͙̰̯͉͔̩̺̝̫̱̮̻̺̤̜̱̳͍̱̯̘̩͙̥̳̩̦̟̫̣̳͈̘͕͔̲̬͖̥͕̳͙̮͕͈͓̣͇͈̏̌̆̃̃̇̋̐̐̈́͆͗̈́̇̉͒͒̒̄͂͊͆̇̃̈́̈͆̈́̓͊͆̈̉̏͂̔̉̃̓̅̂̒̑̓̿̄́̄͒̏̈́̾̀͆̑̍́́͑̎̅̽͋̋͑̿͋͌͛̍̏̑͐͒̃̈́̈́̓̍͛̃̈́͌̏̅̔̄̈́͛͑̈̓̇̿̾͂͒̍̈́̒̀̍̍͆̇̿̑͗̐̀̒̀̇̈́̐̓̐̇̀̍̒͌̈̏͆̎́̈́̈́̆͌̈́͗̅̆͊̔̐̄̽͐̏̀͒́͌̇̀̈́̓̀̃̓́̇͑͌̌̿̄̆̌̽̐̀̆̈̈̂̓͂̐̃̈́̊̓͘̕̕͘̚̕̕̚͘͜͜͜͠͝͠͠͠͝͝͝͠͝͝͝͝͝͠͝͝ư̷̢̡̧̡̧̢̨̢̢̡̨̢̧̡̨̨̧̡̨̧̨̛̛̛̛̛̛̛̠̺̞̖͎͙̥̬͈̼̻̟̹̗͈͚͖̘̱͎͎͈̺̞̬̖̻̠̮̣̩̠̙̗̞͍͉̫̟̝̲̬̻̫͍̙͙̲̼̙̙̙̬͖̘̮̻͙̝͔̰͕͖̙̼̜̤̯͓̠̪̹̥̺̘̰̠͕̯̺͔̮̦̺̪͉̱̭̩̩͎̖̳͈̫̗̝̰͕͎̮̳̳̪͙͚̟̫̫̺̦̟̲̙͚̪̺̲̼̹̝̼͙̰͈͓̩͕͕͉̪̼͍̪̲͈̬̞̮͖̟̙̹͓͕̤͚̜͙̳̭͇͍͈̝̭̼͙͖͇̹̥̗̮̞̬̮̟̞̣̙͖̣̺̻̩̜̬̥͖͔͉̙̹̤̤̹̱͔̖̹͚̻͕̞͚̦̪̙̱̬̞̘͙͍͚̘̯̗͍͎̱̫͓͋̔̑̉͑͌̓̆̂͗͗̽̏̍̂̂̉̐̓̇̂̑̂͌̑͂͋͒͋̊͑̓͒́̓͆̒̽͆̾͋̈́̆̌͋̃͑̐́́͐̌̈́́͊̋́̀̆̀̽̃̇̎̇́̋͐͂́̓̅͋̐͒̍͌͋̔̆̑̊̉͆͐̏̽̍̓̑̉̔̀̐̊̃̽̔̌̈́̈́̂̉̑̈͐̌̾̀̿̎̅͑͋̿̋̂̍̉͒̈́̉͛̓̿̐̐͒̎̐̆̏̑͌̈́̏̀̓̾͊͑̊́̂͂̈́̉̎̒̏̾̂̋̂̋̇͋̍̓͑̓͛̍̐̐̈͌̊̾̓͒̔̽̈́̔̒̑̌̃̂͐͌́̈́̾̌̾͐̾̅̈͑̿̀͌̔̃͂̑̃̑̀͑̍́́͌̈́́́̌̆̂̅̈́̈́͋͑́͛̾̈͋͐͐̉̿̈́̋̓̒̅̋̈́͂̃̇̊̐͛̎̇͑̄͂̋͆͘̚͘̕͘͘͘̚̕̕͘͘͜͜͜͜͜͜͜͜͜͜͜͜͝͝͝͝͠͠͝͠͠͝͝͝͝͝͝͠͝͝͠͝͠͝ͅͅͅͅͅͅͅͅl̶̢̢̨̢̧̧̧̢̢̛̛̛̛̛̛̳̬̳̤̗̗͕̰̬͓̩̮̭̙̺̭͇̳͓̼̣̹̪͉̰͉̰͕̣̪̖̣̝̩̙̥̮̝̠̮͇̜̤̥̙͚̺͖̱͎̯̤̩̞͙̥̟̘͍̰͉̞͍̳̯͚͚͓̗̱͔͔͍̜̹̬͙̰̠͙͉͉͎̝̞̬̜͖͇̪̮̤̖͈̪͉̬̮̮̖͙̬̘̻͚̞͇̪̥̥̗̠̹̲̫͕̙͓̩͓̗̗͙̪͙̍̈́̋̎͂̓̐͋̄̍̂͛̑̈́͐̓̾̈́̏͊̃̌͒͒͆̐̀̀͑̊̑̔̏͐͂̈͐̏̌͋̅̊̅̎̔̍̏̇̌̀͒̐͛͌́̏̂͆́́̓̽̽͐͒̾̓̅̈́̋̽̿͋̅̃͂̈́͑̑̀͌̈́̒̍́͛̉̿͌̌̓̄͛̿́̉͂̈̀̏̓̉͂̆̃̃̆̏́͋͒̉̈́͋̎̀̈̃̈́̋̃̈́̃̔͌́͒̂̒́̍͂́͗͌̎͗͌̈́̔͂͌̈̂̉̾͊͗̐̓͑̋́͊̎̐̽̎͛̇̈̆̄̎͗̚͘̕̕͘̚̚̚̚̚͘̕̚͘̚͝͝͠͝͝͝͝͝͝͝͝ͅͅͅͅͅͅḑ̸̨̨̡̨̧̡̢̢̧̧̡̢̢̢̡̨̡̡̧̨̨̡̛̛̛̛̛̛̖̺̲̼͉̬̘͕̝͍̳̯̳͚͔̰̺̝̮͙̼̬͓͖̹̘̳̞͎̳̖̦̥̦̮͎͕̟̦̥͙̙̝͈͍̗̱̪̥̲̘̦͔̯̳͕̪͚̠̘͔̗̟̻̯͕̳̘̝̬̯̖̦̞̜̻̺͕̹̰͇̝̟̯̙̪͔̮̼̳̥͉̥̟̝̪̼͕̠͉̜̩͉̬̣̹͖̤̖̮̞͍͎̖̫̺̩͎͍̬̩̯͇̗͚͇̩̺̖͓̱̭̪͇̭̱̟̘̙͚̣̱̖͇̯̘̭̖̗͎͙͈͚̫͉͔̫̠͈̗͉̯̪̰̘̞̖̞͎̜̻̻̳̝͚̬̙̰̻͓͙͈̮̺̬̼̼̰̺̭̮̟̤̦̥̜̙̲̱̭͇̮̞͚͓̻͎͈̙̰̻̻͚͕̝͈̜̫̥̱̞̍̀̋̊̈́̾̊̔͗̾̑̏͗̒̓̏̒͗̃̒̄̏̓̓̎͒̑͆̒̽͑̽̋̒͒͒̓̄̏̍̓̿́̈̈̐̈̓̈́̽̀͌̔͊̊̈́͒͒͛̂̍́͐͛̈͗͐̇̄̉̈̐̉͌͑̒̂̀̔͂̈́̑̔͊̾͐̊̒͑̀̒̅̿̎̋͋̾̎̋͊͌̐͛̈́̎̇͋̎͊͌̌͆͒̍̈̄̓͋̓̓͊̆́̒͘̚̕͘͘̕̕͘̚͘͜͜͜͜͜͜͜͜͝͠͝͝͝͝͠͠͠͝͝͝͝͝͝ͅͅͅͅͅͅͅͅ ̸̢̢̨̡̢̛̛̩̝͔̣̳̲̙̤͍̦̠̝̻͕̤̦̖̲͈̹̳̩̟̜̫̩͕͍̣͓̱̝̫̬̙̬̖̦̙̼̗̱̳̙̱̝̜̫͔̟͔̲̫̞̗͔̩̜̘͉̣͚͓̟̭̳̱̟͎͙̻͇̻̜̭̩͖͚͇̩͉̞̥̙̜̘̼̪͙̼̟͕̥̥̗͍̫̯̜̣̍̆̓̾̐̈́̓́͑͂́̃͛͑͂̎̅̈͒̅̅͒͐̿̒̏̋͗̆̎̎̓̉̓̈́̈́͆̂̎̂͌̿͛̒̎́̑̐̏̊́̓̍͗͊̌͌͊̿̓̿́̓͑͐͑̋̈́͐̂̊̊̓̔̾́̄̄͑̾̿̈́͌͐̈́͂̽͊̈́̽̎̀̈́̾͋̇͛̃̃́̑̅̀͊̈͑̍̓̿̋̒̊̌̂̄̑̎̀͐́̎̅͆͛̈́̈́̊͊̏̈͒̈́͋̏̈́̾͒̉̊͋̉̄͑̔̏̈́̔̎̓̂̌̉̑̀̄͊̍͌̊̍́̅̌͆̉͂́̓̂̈̑̓́̏̎̚̚̕̕͘̕͘̚͘̚͜͝͠͠͝͝͝͝͠͠͠͠͝͠͠ͅͅͅͅn̶̨̨̡̨̢̢̢̨̨̨̡̧̧̨̨̨̧̧̨̧̧̢̧̨̢̡̡̡̨̧̨̛̟̬̝̦̱̺̙͔͇̭̬͚̤̳̭͈͔̬̝̻̬̯̦̤̯͎̜͚̤͓̬̩͉̼̳̪̗̳̘̜̠̼̤̗̣̞̖̻̱̦̫̦̳̱͇͍̣̩̜̹͓͈̣͇̠̹̪̜̟͇̮̰̦̘̻͙̳̘̠͕̳̠̙͖̜̗̝̮̘̲̼̯͙͇͉̘̝̬̱̪͉͖̘̣̥͎̱̭͙͔̳͕̮̰͔̯̼̮̳̣̩͚̼̲̻̖̥̖͖̲̘̼͇̣̣̘̻̬̣̫̪̥̪͉͇̝̙̯̣͎̦͎̟͙͓̳̘̠̻̤̭̦̣̰͍̜̖̫̖̲̟̬̰̥̼̥̦͎̲͖̼͚͔̻̭̤͍͚͔̲̱̝͍̗͎̝͙̙̩̼̮͇̩̹̤͚̋̆̀̆̉̏̎̏́̄̔̿̓̂̈́͋̈̈̋͑̒͑͒̒̍͛͋̀̇̑̓̔̿̾̈́͊̅̕͘̕͜͜͜͝͝͠ͅͅͅͅͅͅơ̴̢̧̢̨̢̨̡̡̢̧̧̢̡̨̧̢̢̢̧̨̧̡̡̢̨̢̨̛̛̛̗̩̩̭̭̪͈̥͕̳̞̫̲̱͖̭̻͇͇̗̮̫̻͇̤̥̗̯̟̼̥̙̳̱̪̗̖̫̫̳̻͚͙̬̝̦͕̪͍͙̞͚̫͍̜̠̦͚̲̤͈̳͖̝̩̼̠̩̟̮̼͈͕͖̘̖̰̼̤̖͔͈̟̺͈͇̺̟̰̠͚̥͓̫̟̤̺̜͚͓̜̤̭̣͉̟̼̙̘̜͈̗͇̯̣̲̬̟̟̗͕͓͇͚̮͓͍͓͔̪̙͚̯̥͇̯̥̖̼͓̣͔̯̠͎͚̥̘̞͚̪̭͍̙͕̻̤̩̥͎̲̤̬͕͎̭̳͉͈̖̯̞͍̘͓̜̯̜̼͉̜͖̯̩̙̐̑̓͒͐̈́́̓͆̍̈́͐̓͛̈͑̌̈̈́̌́̿͋̐̏̑͊̈̽̽͛̈̀̆̅̈̓̌̅̓̇̆̉̽̊̂͐̌̌̊̈́̋̂͛̅͊̈́̀̆͐̉̈́́̂̇̏̌̈́̇̀͗̍͗̌̔̽̈́͂̋̊̏̈́̈́̿͐̔͌̆͗̊̎͂͛̐̅́̓̊̇͌̇̒̾̋́̌́̾̀̊̃̽̌̆̌̑̈́͌̐̏̄̆̋̔͆̏̂͛͒͆̋͌̆̆̈̔̄̒̔̕̚͘̚̕͘̚͘͜͜͜͜͜͜͜͜͝͝͝͠͠͝͝͝͝ͅͅͅͅͅͅͅt̶̡̧̧̧̡̢̧̡̧̢̡̡̡̢̡̨̧̨̨̨̡̛̛̛͇̦̠̣͍͕͚̬̬̩͖̺̯̤̲̯͚̼͕̬̼̠̺͍̤̳̰̫̫͚̥̺͔̟͍̩̻̩͉̞͖̣͖͈̯̥͈̰̟̣̫͎̜̦̮͓̩̙̻͓̟̫̟̥͈͈̱̞̰̳͍̯̮̬̦͓̫̬͈̥͔͖̞̘̺͔̲̬̞̰͇̺̻̪̙̩̫̹̭̮̩̯͓͚̹̞̯̟̥̳͓̹̤̖̲̖̻̳͕̮̜̳̱̬͍͙̟̖͇̬͉̩͔̥̳̲̜͕̗̜̥̖̣͓̙͚͓͉̺̰͍̻͉̤̪̘͖̰̻̺̠̥͕̤͎͈̦̺̘̳̮̘̯̘̳̞͚͎̱̭͍̞̦̗̩̤̤̻̱̱͔͉̳͔̖͚̯̫̰͍̙̱͇̲̭̟͉̭̗̫̟͇̗̫̱̹̙̯͖̲̭̳̹̣̭̬̥̪͓͇͙̯̰̻̜̪̻͖̺̗̘̮̳͔̪̋͗̀̅̌̐̔̏̆̄̓̔̽̇̎̽̆̔̄̀̉̑̓͐̎̇̾͋̅̃͛̈̈̉͛͊̉͆̉̈́̎̐̓̔͋̄̃̾́̓̈́̾̇͗̒̀̂̃́͆͋̓͂̊͂̔̉̀͊̒̄͋͌̇͌̈̍̔͛̽̆̓̃́́̇̃͋̆̑̓̔͛͆̿̀̉̓̂̀̒̔͆̈͆͌̒̀̑̾́̇̿́̀̽̎̏͂̇͆̀̐̐̓̇̀̀͗̅̀̃̌͊́̈́̂̀͛́̀́̒̂̏̏̑̐́̾̒̇̐̊̒̍̏̕͘͘̚͘̕̚̕͜͝͝͝͝͝͝͠͝͠͝͝͠ͅͅͅͅͅͅͅͅͅͅͅͅ ̶̢̨̨̨̡̧̨̨̢̡̧̢̢̧̧̧̡̨̢̧̡̨̢̡̨̨̨̢̛̛̛̛̛̛̛̛̛̠̳̖̗͇̱̞̯̫̲̩̩̹̞͔̘̦̘̹̭̭̩̩͇̗̤̝͎̹͎̣̲̪͇̺̥̣̠̩͍͔̹̜̱̳̹͖̠̹̬̜͈͇̤̰͎̮͔̜̦͖͖̭͚̙͔̤͉͙͍͉̰̲̟̯̭̺̹̟̬͉̜̥͖̙̘̰̜̪͉̜̜̭͖͖͍̻̫̫̤̥̙̬͕̱̹͔̘̟͉̭͙̫̬̻͙̘͍͇̲̞͕̗͉̣̭͍̱͓͔͎͓͉͚̮̜̦̲̯̫̙̱̖͔͕̙̺̺̦̫̠͉͚̫̗̠̭̟̬̭̰͓̺̱̘͈̘̱̠̖̣̫͉̗̖̣̥̖͓͎̗̘̜̼̯̗̞̰̻̰͙͕̭̺̹͂͊́̉̎̔̅̏͒̽̐͆͒̌̋͂͗́̀̇̋̏̀̓͆̒́͋̽͋̍̋̂̋̍͗̒̈̐̍̒̋͋̉̿͛̋̃̀̆̾͛͗͊͗̂̄̍͆͂͐̎̑͑̿͗̈́̅́͐̄͗̄͛͛̈́͐̆́́̒̉̒̔̋̐̎̈́̀̂͛͊̊͗̄̈̀̀̆̽͑̆͑̿͂̌̓̿̈̂̾̇̋̍̃̃̅̉̂̓́̀͛̾̍̆̽́̑̐̎͂̔͂̊̈́̌͒̅̔̄̾̈̄̓̿͋̉́͗̓̄̓̅̾̈́̀̌̍͆̀̐̏͐̚̕͘͘͘̕̕͘̚͘̚̕͘̕͘͘͘͜͜͜͜͝͝͝͠͝͠͠͝͠͠͠ͅͅͅͅͅͅḩ̷̢̡̢̧̨̢̡̡̡̨̧̧̨̛̛̭̙̫͈͉͓̮̞̙͉̘͈̻̼̤̜͇͇͖̤̤̤̱͈͖̟̰̣̻̬̝̙̺͉̪̞͈̞̻̼̰̬̮̥͓̯̞̣͖͉̮͈̩̹̝̰̲͓̝̺̟̱̹̺͚͙͇̟̞̼̞͔͖̯̖͕͓̺̣̯̪̣̝͉̥̗̣̺̯̯̞͉͕̲͖̱̺̱̳̖̥̦̠̫̲͕͈͖̭̖̖̬͕̘̥̫̥̳̤̺̳̥͍̠̘̯̣̭̱͍̬͍̞̯͓̺̲̫͍̭̻̩̮͈͎̞͕̮̬̣̙̟̖͙̺̬̾̀̍̽́̒̃̈́̂̈́̈́̊̒̇͊̍̓̌̈́̿̍̀̃͐͆̏̀͗̓͑̾̊̍̂̏̿͂̊̀̈́͆̍͗́͑̔̉̈͊̈́̔̀́̾̅̄͊̊̽̌̽̀̾̇̍̿̈́̋̐̾́͆̈́̄͊̌̀͌̓͋͛͐̏̂̓͋́̀̈́̔͂̎̓̈́́̈́̑͂̋̃̑̒̋̒̌̒̎̽̑̕̕̕̕̚͘̕̕͘͜͜͜͠͝͝͝͠͝͝ͅͅͅͅą̶̧̢̡̧̢̧̧̨̡̧̢̢̧̨̡̨̡̧̡̧͖̻̰̞̘͓͈̫̻̞̫̹̤̺̩̙̙͙̜͔̩̦͙͓̩͇͇͚̫̯̮̤͉̳͔͈̠̺͇͍͙̠̻̞͓̺̻͚̯̭͚̗͙͔̠̯̯͍͉̤̣̹̼͍̮̗͖̝̲̦͓͍̖̟̰̬͎̻̫͈̩͍̩̹̙̲̤̻̮̻̻̪͖̝̣͙̯̦̖͇̠̬͖̪̮̝̪̪͓̭̮̩̥̖͕̳͎͈̞̲̙̪̪̣͖̳̞̹̪̤̫̯̯̞͈̪̻̖̘̣̜̠̦̯̝̮̥̪̪̫̖̤̱̩͓̺̳̜̩̘̜̜̺͓̥̘̻̞̫̪̹͔̩̣͔̻̜͕̙͈̗̊̈́͐̆̑͐̄̄͗̏̿͆͗͛͗̓̿̎̽̾̈́͗̈̊̐̈́̏̃̆͒͘͘̕̕͜͜͝ͅͅͅͅͅͅͅv̸̧̨̡̨̨̢̧̢̛̛̛̖̘̪͔̱̯̯̖͉͈̯̬̖̞͈͍̫̜̞̜͉͉̖͖̮̬̺̞̼̪̥̘̭̤̙̮͉̣̣̯̳̯͖̣̲̦͕͉̼̘̼̞̹̜͖̙̦͕͔̹̲͓̫͖̻̳̦̤̳͚͙̭̗̺̠̪̲͉̠̫͔̹̫̮̞͙͖͚̝͚͈̼̯͉͉̘̺̑͆̈́̎̑͌͒̾̔̄̈͌̑̅̋̎̍̊̃́͂̄̇̀̑̿̀̇͊͂͌̆̋̎́͂̏͊̑̈́̈́̽͐̊̀̃̀͑̈̒̈́̐̍̔̀̎̂̉͌͌͆̈́́͋͒̀̇͋͐̔͘̚̕̚͜͜͜͝͠͝͝͝͝͝͝ͅė̴̡̧̨̢̨̧̛̛̛̠̘͕͔̙͓͎̪̠̳͍̹̜̦͓̮̱̮͇̮͈͚͕̼͔͚̺̥͍͉̙̘̱̦̺̜̞̜̗̻͎̩̤̞̬̖̙̭͖̗͚͆͗̇͛̄̏́̿͆́̄͌͂̅͊͐̈́͐̈̀̑̅̆͛̽͑͛̉̈͋͑̈́͐͐͂̑̐̓̿͋͐͛̇͗̽̾͗͊̍͌͛̑̀̌̓̔̈͐̓̃̾̃̅͗̎̆̒͑̑̇̌̃̄̈́̔̎̅̇̄̂̔͒̐̐̓̆͌̃̆̈̓͂̿͌͒͐͌͊́̓̑̀̋́̄̈́̆͑̕̚̕̕̕̕̚̕̕̕̕̚͜͜͝͝͝͝͝͝͠͝͝ͅ ̶̧̡̨̢̢̧̨̧̨̡̧̢̧̨̨̢̧̧̢̡̧̡̡̱̪͍͎̦̝̗̬͖͚̳̤̖͎̟̫͙͕̺̜̝͚̺͓͎͔̟̜͍̯̗͖͚̟̣͔̻̟͈̝̗̳͖̦͈̬͕̱͈̳̣̼̭̟̠̜̦̘̗̝͕̮̟̠̣̹̭̜͍̭̱̭̖̭̦̖̜̝̭͔͕̹̰̼͕̪͇͍͕̭̣̝̟̹̥͔̭̯̼͎̘̤̩̲̠̭̙̘̙̺̹͉̲̩͔̰̬̯̘̫̝̦̖͇͔̙̯̭̤͇̥̻̤̽̑̔͌̐̊̓̀̈́̌͗͌̓͆̃̎͑̅̂͗͐͆̓̉̀̄̌̄̈́͗͆̊͛̊̈́̄̈́̅̐̉̄͋́̽̌̿̑́́̔͂́͋͆́̍̈́͆͋͂̽̀̿̎̾̊̉̄̒̅͆̈́̓̀̃͒̓͊͗̓̉͊͑̿̀̈̓̓̍͒̄̽̽̔͗̏̍̂̎́͛͐̑̈́͒͐͐́̅͊̀̓̄͑̆̔̓̃̏̊̽́̿͑̀̌̈́̕̕̕̕̕̚͘͘̕͜͜͜͝͝͝͝͠͝͝͝͝͝ͅͅͅͅͅc̴̡̢̨̢̛̭̲̹͖͙̲̬͖͕̪̗̳̱̫̰̪̺͖̝̹̰̋̍̅͂̈̒̊͂̈́̎̀͗̆̀̂̈́̄̄͆͋͆͂̿̾̏͋͗̅̔̆̇̓͂͗͆̓̎͆̌̒̓̅̽́͑͘̕͘̕̚͜͜͝͝͝͠͝͠ͅͅͅͅô̶̡̧̢̡̢̢̨̧̨̡̧̢̳͚̹̤͉̖̖̟̺͇̮͉͇͍̪̲̳̙͔̼̤̩̹̦͕̞͓̠̬̝̩͇̫̭̗̣̻̱̙̱̘͓̘̪̜̜̼̳̫͍̗̥̩̝͈͇͈͖͙̜͍̮̻̮̪̞̱̝͔̼̩̮̭̲̪̩̪͉̥̣͖̮͕͔̤̼̤̱͎͓͖͖̟̟͎̖̪̥̳̣̩̪͖̪̤͖͓̬̻̘͓̤̜̲̩̥͍̭̜͉̬̭͕͇̗͉̘̥͇̤͗̓̿̒̉̆̎̐͆͋̆́̀͑̿̓̌͗͊̈́̄͂̔̌͂̇͜͜͜͝͠ͅͅͅm̶̢̧̢̡̨̢̧̧̧̢̨̢̨̢̢̧̡̧̨̢̢̨̛͔͙̺̤͇̹̲̺̺̮̘̞̬̯̤̣̪̞̻̩̣̺̮̬͈͉̞̠͖͇͍͇̘̪̠̣͓̪̰̳͎̠̲̯̖̜̦̜̟̘̜̥̼̖͔̳͔̗̖̠͚̲̳̦̥̰͓̼͈͍̥̞͎͙̙̥͉̣̩̗̰̟̪̠̣͈͓͉͈̗͙͉̥͈̰̭̻͕̣͔͓̼̱̠̣͉̣̹̫̠̠͍̹͎̺͚̮̘̲͉̙͎̹̺͙͙͕̫̩̱̬̗̺̜͕̻̰̘̮̩̮͚̣̥͕̜͔̲͍̤̯̗̟̠̖͎̩̥̦͚̩͙͙͇̺̥͍̬̙̠̯̜̰͎͕̙̪͇̜͇͍̘̩̥͈͙͈̝̩͎̠͔̝͉̭̳̠̳̮̳̰̤̻̫̩̠̳͖͚̅̈͋͗̎̀͗̈́̈̓̏͂̈́̀͗̄̔̈́̊́̓͋̃͐͊͘͜͜͜͜͜͜͝͠͝ͅͅͅͅͅͅȩ̴̛̛̮̹̣̰̜̦̯̬̱̩̝̺̭̜̰̠̤̘̫͚͎̣̲̺̟̳͎͍̙̰͓̱̤̫͍̯̥͈͈͙̼͎̼̣͈̻̝̟̲͖͔̠͖͓̭̥͓̥̙͚̦͍̠͔̲͎̹͚̣̰̲́̎̂̆̑̅͋́̌́́̑͌͂̍̌̿̌́̐̀̿͒̈́̂̾̏̽̂̒͆̿̋̍̽͊̄͂̐́̆͆̀͗̐̋͒͑̆̈̓͊̿͂͑̽̓̈̚̚̕̕͜͜͜͜͝͝͝͝ͅ ̵̢̧̨̡̡̨̨̢̛̛͖̺̳̹̩͚͎̣̗̺̼͖̼͕̠̩̣̟̮̭̱̟̩͇̯̤̞͎̺̮̳͓̪̠̖̰͓̙̝̩̫͙̜̫̖̣̭̪̺̹̙͇̖̩̹̲̤̯͓͖͉̪̗̰̳̟̱̲̩̝̭̼͙̯͚͎͉͓̗̮̭̮̺̲̱̩͓̙̰̖͈̖̻͖͚͚̤͕͓͉̗͚͓̗̭̘̓́̽̊̇̇̑̂̑̏̆͑̐̍̈̄̑̀̋͛͂̓̽͊̈̍͒̉̉́̏̇̽͌̀̾̽̄̇͛̓̽̓͆̈́̃̓̿͂́͗̓̅̆́͗̽͊́̌͛̏̊̑̿͒̈̅̓̓̔͒̀̄͂̇̔̀́̈́̆̄̌̂̽̉͋̀̌͆̎̌͋͋͒̽̏́́̓͆̃̉͐̓̐͋͊͛̆̾̄̔͋̆̌̅̆́́̿̉̽̈́̈̽͛͐͗͐̐͐̑͌͊̍̌̀̈́̔̉̎̕͘͘͘̕̚͘͘̕̚͘͘͜͜͜͝͠͝͝͝͠͠͝͠͝͝͝͠͝͝ͅͅͅͅh̶̛̛̘̦̬̮͕̯͈͔́͒̓̍̿̃̇͑̀̐́͌̈́̈́̾͗̒͛̈͗̂̈͊́͋̀̋͂̀̀̓̏̈͊̆̃͒̊̈̉͌́̅̋̊̃̉̓́̒͐̀̌̓̑͊̔̏̎̐̈́͗͌͂͑̓̋̒͌͐̆͒͌͌́̋͊̅͌̄̏̚̕͘͘̕͘̚͘̕̚͝͝͝͠e̶̢̡̧̧̨̢̢̟̜͇̗̣̙̞̩͚̭̳̝͕͔̥͚̮̱͕̥̺̪͖̪̘̩̹͉̣̹͕̯͚͓͉̹̪̻͎̩̝̭̘͈̲̗̯̖̳̫̮̰̼̙̬͈͎̯̫̙̤̮̗̩̟̩̙͕͔̥̦̝͖̫͕̪̖̱͓͕̩̩̲̜̬̼̬͈͆̍͋͆͑̽͝ͅͅͅͅr̴̨̧̡̢̢̨̧̢̧̧̡̢̛̲̜̬͇̼͚̬̪̘͖̣̝͖͚̙̦͖̜̤͈̜͕̳͉̼̬͚̣̝̺̭̗̩̲͎͍̘͍̻͙͇̲̫̱͇͖͇̦̥̳̹͓͚̱̯̟͓̙̗͈̙͈̲̹͖̘̗̙̬̮̼̦͇̮͙̭̪̻͍̞̖͕̲̬̣̯̟̲̻͎͎͇͈̟̣̩̺͔̗͕̦̹̼̠̥̦͙͓̙̯̣̝̜̼̳̲̯̹̩̪̤͙̻͈̤̺̮̖͚̩̱͚̞̗͇͇͙͚͚̟̝̥̐̏́̈́̔̓̐̍̇͂̈́̈́͑͐̋̒̔̿̎͋̅̓͌̉́̓͂̔̔́̄̏̾̈́̈̏̐̅́̀͐̽͌͐̔̀̍̿̃̒͛̇̈̑̅͌̌̀͗̀̅͐͗̓͛͘̚̚̕͜͜͜͜͝͝͝͝͝͠͝͠ͅͅͅe̶̡̢̨̨̡̧̢̧̢̧̧̨̡̡̨̡̧̢̡̢̡̡̨̧̨̛̛̙͓̺̠̳͓̳͈̬͈̘̬̰̱̲̦̰̱̣͈̬̺̼̣̬̲͍̲̜͙̻̱͍̞̼͕͍̖̭̝͈̗̟̟̟͍̜̭̰̦̗̟͖̙̺͉̪͖͙͈̩̩͇̦̤̙̥̯̠̭̭͎̻̯̣̪̟̰̜͚̗̼̲͖̥͎̮̘̜̝̖̣̳̮͙̜̩̼̩̥͚͈͍̮̮̥͓͖̦̫̯̹̘̟͚̜̮̰͕̣͙̻̱̲͔͓̜̹̗͇͍͔̳̮̺̝̘̘̭̰͖̤̦͉̼̰̝͉̠̳̩̬̹̭̥͖̞̣̗̫̼̟̘͇̟͙̱̟̺̘̪̱̲͔͈̥̮̱̫͍̝̦̫̹͈͈̖̘̯̭̼̹̘̘̪̤̠͙̺̫̰̳̝̞̳͍̣͔̰̭͇̯̼̺̲̫̩̠̙̳̘͚͖̖̘͉̼̹͋̓́́̀̈͑̅̊́̐́̈̿̐͆́̓̈͗̑͛͌̿̊̊͆̑͂̋̈́̓̑͂͋͑͌̃̅̈̈́̅̐͒̈́̓̈́̿̀̄́͋͊̿̌̾́͊̀̈́̏͒͂́̂͛̀͆̍̄́̃̍̈́̑̂̅͑̊͋̓̔̈̉̍͂̈́̂̌̄̔̈́̏̏̒͐̂̓͊̀̀̀͆̍̏̆̇͊̄̈͗̌͊̈̋̇̄͌͛͒̅̓̐́̆̇̈́̔̑̀̾̑̍̎̂̋͛̉͋̿̅̍̈́͆̈̽̋́̽̈́͒͋̏͑͌̋͊̎̎̀̒̅̚̚͘̕̚͘͘͜͜͜͜͝͝͝͠͝͝͝͝ͅͅͅͅͅ ̸̨̨̧̢̨̧̨̢̧̢̡̨̢̨̨̡̡̨̡̢̧̨̡̡̨̨̧̛̛̛̛̭̬͚̺̪͓̻̙̲̠̺̠̞̠͖̲͇̞͉͕̳̲̖̣̺̣̱͕̱̭̫̻͔͈͙͉̥̭̠͈̥̖̦͇͙͖̗͇̼͚̥̮̩̯̜͔̗̯̮͕͖̳̖̻̹̟̘̞̤͍̪͙̻̗̼͙̩̪̯͉̝͕͈̤̰̫̙͙͍̻͖̣̤͖̤̯̫̠̯̪͇̱̤̥͔̥̦͙͍̤̻̮͉̱̼͕̟͕̩͈͙͓̩̦̹͙͓͎̼̼͎̠̣̝̗̫͎̫̥̞͉̭̞͙̣̭̗̰̬͙̜̗̫̻̞͎͇̝̪̘͔̗̳͓̰̝̱̩̳̫̺̝̟̯̩̭̖̯̺̤͚̙̯̮̗̝̠͇̳̹͙͍̥͙͍̣̣̳̪̗̫̙͇̗͕͕̜̘̟̩̻̺̫̪̥̦̠͙͓͔̹̳̗̗̳̗̰̝̗̹̙͇̱̘̝͕̼̯̙̰̜̻̜͙̝̥̳̫̬̭̩̓͋̔̾̀̌̓̽͋̈́̐͒̈́́̀̋̏̋̐̈́͋́̊̌̃̓̄̉̔̆̉̓͑̈́́͋̈̍͗̐́͂͒͐͑̔̃̓̿̈̑͗̍̆͑͆͛͐̑̑͊̽̽̉̑͑̄̍͋͌̈́̽̓̽̽̌̒͂͌̅̈́̇̍͑̏̅̀̔̍́͋̀̉̒͌̍͋͛̾̈́͋̉̂̆̄̍͑͋̇͊̀̄̆̏́̔̆̐̏̐̈̾̎͐̀̅̿͆͑́̉̏̄͛̈́̓̍̈́͗̃͑́̏̓̓̽̅̌͗̇̓͒̌͛̓̋̏͐͋̈̏̃̓̌͂̋̈́͋̈́͐̂̃̽̓̂̽̍͗̈̌̄̑̆͋̒͗͊̔̔̎̿͂̆͐̓͋̈̉͌̽̎̈̑̆̉̀͑̑̀̅̑͑̓̄̐̍̎̎̏̊̂̎̈́͌̆̂̈̒̅͌̍̔̓̀͂͆̌̅̈̚͘̚̚̕̕͘̚͘̚̚̚̕͘͘̚͘̚̚͜͝͝͝͝͝͠͠͝͠͝͠͝͠͠͠͠͝͝͝ͅͅͅͅͅͅͅͅͅ ̶̨̢̡̛̤̞̱̠̱̻̗̱̗͉̳̲͚̰̻̥̗̝̥̺̲͕̗͓̰̫͈̖̠̮̮̭͉̿͑̉̌̎̈̈́͂̈̌͌̃͆͛̔͐͋̓̄̓̽́̿̊͊͌̒̓̒̒̅̈̀̈́̉̀̏̔̊͛̿̐̈̓̐̋̔͒͊́̈́̈́͛̉̓̀̓̉͛̑̿̐͑̏̈́̓͌́̒͒̋̀͐̓̓̔̍̀͐̚̕͘̚͜͝͠͝͠͠͠͠͠');
