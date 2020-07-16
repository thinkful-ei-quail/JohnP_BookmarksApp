/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */

///constants for whole app go here
//defaults sates etc

//const items = [];
//let error = null;
// const BASE_URL = `https://thinkful-list-api.herokuapp.com/johnpendergast/bookmarks`;


const  bookmarks = [];

  const state ={
      adding:false,
      error: null,
      filter:0,
      display:true,
      expanded:false,
      BASE_URL:'https://thinkful-list-api.herokuapp.com/johnp/bookmarks/'
  };


///functions for finding things by id ie addBook

const findBookmarkById = function (id) {
    return this.bookmarks.find(bkmk => bkmk.id === id)
};

const formatForStorePush = function (bookmark) {
    bookmark.display=true;
    bookmark.expanded=false;
    return bookmark;
};

const addNewBook = function (bookmark) {
 //formatForStorePush(bookmark);
 this.bookmarks.push(bookmark);
};

const findAndDeleteBook = function (id, bookmarks){
    this.bookmarks=this.bookmarks.filter(bkmk => bkmk.id !== id);
};


const findAndEdit = function (id, newData){
    const found = this.findBookmarkById(id);
    Object.assign(found, newData)
};

const setError = function (error){
    this.error=error;
};

const rateTest = function (){
    if(this.rating <  state.filter){
        return this;
    };
}

const filterByRating = function (bookmarks){
    return bookmarks.filter(book=>rateTest());
};


export default {
    state,
    bookmarks,
    findBookmarkById,
    formatForStorePush,
    addNewBook,
    findAndDeleteBook,
    findAndEdit,
    setError,
    filterByRating,
    rateTest
};
