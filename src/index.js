/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */




 import $ from 'jquery';
 import './normalize.css';
 import './styles.css';
 import api from './api';
 import store from './store';
 import APP from './APP';



const startPage = async function  (){
    try{
        APP.bindEventListeners();
        api.getBookmarks();
        const responseOne= await api.getBookmarks();
        const data = await responseOne;
        data.forEach((bookmark)=> store.addNewBook(book));
        APP.renderPage();
        console.log(store.bookmarks);
}
catch (error){
    return error.message;
};
}

 $(startPage());
