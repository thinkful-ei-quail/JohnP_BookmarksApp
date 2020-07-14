/* eslint-disable no-undef */
'use strict';
/* eslint-env jquery */


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
// async function fetchUserViaAsyncAwait(blogId) {
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
