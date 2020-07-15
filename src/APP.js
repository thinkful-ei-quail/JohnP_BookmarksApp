/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */




///////////////////////////////////MU GENERATOR FUNCS//

//const generate = function (){};

const generateStart = function (){
    $('main').html(`
    <section class="display-container">
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

const generateListItem= function (bookmarks){
    return `
        <li data-item-id="${bookmarks.id}">
        <div class="small-div">
          <div class="small-list-title">
            <h3>${bookmarks.title}</h3><button class="expand-from-list" type="submit"></button>
          </div>
          <div class="list-rating">
            <h3>${bookmarks.rating}</h3>
          </div>
          <div class="list-see-more"></div>
        </div>
      </li>
        `
    };

    generateExpandedBook = function (){
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




//////////////////Render Funcs

//const render = function () {};




///////////////////Event Handler Funcs

//const handle = function (){};

///bindListener func

///main call

///export default{};
