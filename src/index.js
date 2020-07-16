/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */




 import $ from 'jquery';
 import './normalize.css';
 import '../styles/styles.css';
 import api from './api';
 import store from './store';
 import APP from './APP';



const startPage = async function  (){
    try{
        api.getBookmarks();
        const responseOne= await api.getBookmarks();
        store.bookmarks.forEach((book)=> store.addNewBook(book));

}
catch (error){
    return error.message;
};
}

 $(startPage)
