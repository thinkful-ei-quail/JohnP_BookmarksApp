/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */

import store from './store';

//const BASE_URL='https://thinkful-list-api.herokuapp.com/johnp/bookmarks/'

////api functions go here

//const fetch//Something// = async function (){};

const fetchViaAsyncAwait = async function(...args){
    try{
        const responseOne = await  fetch(...args);
        const data = await responseOne.json();
        console.log('fetchViaAsyncAwait ran');
        return data;
    }
    catch (error){
        console.log(error.message);
        return error.message;
    };
};


 const getBookmarks = function () {
     return fetchViaAsyncAwait(`${store.state.BASE_URL}`);
};

const postNewBookmark = function (newBookmark) {
    console.log("API firing")
    newBookmark=JSON.stringify(newBookmark);
    console.log(`New Bookmark to post is${newBookmark}`);
     return fetchViaAsyncAwait(`${store.state.BASE_URL}`, {
        method : 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: newBookmark
    });

};

const updateBookmark = function (id, updateData){
    const newData=JSON.stringify(updateData);
    return fetchViaAsyncAwait(`${store.state.BASE_URL}${id}`, {
     method : 'PATCH',
     headers:{
        'Content-Type': 'application/json'
    },
    body: newData
    });
};

const deleteBookmark =function(id){
    return fetchViaAsyncAwait(`${store.state.BASE_URL}${id}`,{
        method: 'DELETE'
    });
};

 export default{
      getBookmarks,
      postNewBookmark,
      updateBookmark,
      deleteBookmark
  }
