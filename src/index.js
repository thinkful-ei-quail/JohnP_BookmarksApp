/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */

 import $ from 'jquery';
 import './normalize.css';
 import './styles.css';
 import api from './api';
 import store from './store';
 import APP from './APP';

const main = function () {
    console.log('startPage ran');
    api.getBookmarks()
    .then(bookmarks => {
        bookmarks.forEach(bookmark=>store.bookmarkStorePush(bookmark));
        APP.renderMain();
    });
    APP.bindEventListeners();
    APP.renderMain();
  };

  $(main());
