/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */

import store from './store';

//const BASE_URL='https://thinkful-list-api.herokuapp.com/johnp/bookmarks/'

////api functions go here

//const fetch//Something// = async function (){};

const fetchViaAsyncAwait = async function (...args) {
  const response = await fetch(...args)
  if (response.status === 200||201) {
    return response.json();
  } else if(response.status > 201){
    throw new Error(`Server Error ${response.statusText} `)
  }
}



//  .catch(error){};
// .then(res => {
//   if (!res.ok) {
//     error = {code: res.status};

//     if (!res.headers.get('content-type').includes('json')) {
//       error.message = res.statusText;
//       return Promise.reject(error);
//     }
//   }
//   return res.json();
// })
// .then(data => {
//   if (error) {
//     error.message = data.message;
//     return Promise.reject(error);
//   }
//   return data;
// });



const getBookmarks = function () {
  return fetchViaAsyncAwait(`${store.state.BASE_URL}`);
};

const postNewBookmark = function (newBookmark) {
  console.log("API firing")
  newBookmark = JSON.stringify(newBookmark);
  return fetchViaAsyncAwait(`${store.state.BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  });

};

const updateBookmark = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return fetchViaAsyncAwait(`${store.state.BASE_URL}${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  });
};

const deleteBookmark = function (id) {
  return fetchViaAsyncAwait(`${store.state.BASE_URL}${id}`, {
    method: 'DELETE'
  });
};

export default {
  getBookmarks,
  postNewBookmark,
  updateBookmark,
  deleteBookmark
}
