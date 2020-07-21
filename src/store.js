/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */


const  bookmarks = [];

  const state ={
      adding:false,
      error: null,
      filter:0,
      BASE_URL:'https://thinkful-list-api.herokuapp.com/johnp/bookmarks/'
  };

const findBookmarkById = function (id) {
    console.log(`bookmark is ${JSON.stringify(this.bookmarks.find(bkmk => bkmk.id === id))}`)
    console.log(this.expanded);
    return this.bookmarks.find(bkmk => bkmk.id === id);
};

const addNewBook = function (bookmark) {
    this.bookmarks.push(bookmark);
   };

const bookmarkStorePush = function (bookmark) {
    bookmark.display=true;
    bookmark.expanded=false;
    this.bookmarks.push(bookmark);

};

const toggleExpanded = function (object) {
    console.log(`attempting toggle expandof ${JSON.stringify(object)}`);
    object.expanded = !object.expanded;
    console.log(`toggled expandof ${JSON.stringify(object)} `);
  };

  const findAndToggleProperty = function (id, property) {
    const currentItem = this.findBookmarkById(id);
    return toggleProperty(currentItem, property);
  };

const findAndDeleteBook = function (id, bookmarks){
    this.bookmarks=this.bookmarks.filter(bkmk => bkmk.id !== id);
};

const findAndEdit = function (id, newData){
    this.bookmarks = this.bookmarks.map((bookmark) =>
      bookmark.id === id ? newData : bookmark
    );
  };

const setError = function (error){
    state.error=error;
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
    addNewBook,
    findAndDeleteBook,
    findAndEdit,
    setError,
    filterByRating,
    rateTest,
    bookmarkStorePush,
    toggleExpanded,
    findAndToggleProperty
};
