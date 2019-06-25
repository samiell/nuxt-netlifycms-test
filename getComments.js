/**
* Get the comments from Netlify
*/
const fetch = require('node-fetch');

const getComments = async function() {
  // set up our request with appropriate auth token and Form ID
  var url = `https://api.netlify.com/api/v1/forms/${process.env.COMMENTS_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

  // Get the data from Netlify's submissions API
  let response = await fetch(url);

  let data = response.json();
  console.log(data);
}

getComments();
