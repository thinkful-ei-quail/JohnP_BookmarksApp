User Stories
As a user:

I can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)

I can see a list of my bookmarks when I first open the app

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

Detailed view expands to additionally display description and a "Visit Site" link

I can remove bookmarks from my bookmark list

I receive appropriate feedback when I cannot submit a bookmark

Check all validations in the API documentation (e.g. title and url field required)

I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection


Available at: https://thinkful-ei-quail.github.io/JohnP_BookmarksApp/





npm init -y //This creates our package.json file

npm install jquery //This installs Jquery

npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader file-loader

//This installs everything we need for webpack

Create webpack.config.js file and paste this into it:

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { entry: './src/index.js', output: { path: __dirname + '/dist', filename: 'index_bundle.js' }, mode: 'development', plugins: [ new HtmlWebpackPlugin({ template: './src/index.html', }) ], module: { rules: [ { test: /.css$/, use: [ 'style-loader', 'css-loader' ] }, { test: /.(png|svg|jpg|gif)$/, use: [ 'file-loader' ] } ] } }

Update package.json scripts to this:

"scripts": { "start": "webpack-dev-server", "build": "webpack --mode production" }
