/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */

import store from './store';

//const BASE_URL='https://thinkful-list-api.herokuapp.com/johnp/bookmarks/'

////
//
// function fetchUserViaPromise(blogId) {
//   fetch(`${POSTS_URL}/${blogId}`)
//     .then((response) => response.json())
//     .then((post) => {
//       console.log('this is the post', post);
//       const userId = post.userId;
//       fetch(`${USERS_URL}/${userId}`)
//         .then((response) => response.json())
//         .then((user) => console.log('this is the user', user));
//     })
//     .catch((error) => console.log(error));
// }
// fetchUserViaPromise(20);



//const  fetchUserViaAsyncAwait = async function (blogId) {
//   try {
//     const responseOne = await fetch(`${POSTS_URL}/${blogId}`);
//     const post = await responseOne.json();
//     const userId = post.userId;
//     const responseTwo = await fetch(`${USERS_URL}/${userId}`);
//     const user = await responseTwo.json();
//     console.log('user', user);
//   } catch (error) {
//     console.log(error);
//   }
// }
// fetchUserViaAsyncAwait(20);



////api functions go here

//const fetch//Something// = async function (){};

const fetchViaAsyncAwait = async function(...args){
    try{
        const responseOne = await  fetch(...args);
        const data = await responseOne.json();
       console.log(data);
        return data;
    }
    catch (error){
        return error.message;
    };

};

 const getBookmarks = function () {
     return fetchViaAsyncAwait(`${store.state.BASE_URL}`);
};


const addNewBookmark = function (name, address) {
    const descr ="don't forget to add a description here"
    const num = 0;
    const newBookmark=JSON.stringify({title:name,url:address,desc:descr,rating:num})
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
     addNewBookmark,
     updateBookmark,
     deleteBookmark
 }
