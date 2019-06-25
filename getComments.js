/**
* Get the comments from Netlify
*/
const fetch = require('node-fetch');

const getComments = async function() {
  // set up our request with appropriate auth token and Form ID
  var url = `https://api.netlify.com/api/v1/forms/${process.env.COMMENTS_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

  // Get the data from Netlify's submissions API
  let response = await fetch(url);

  if (response.ok && response.statusCode === 200) {
    let data = await response.json();
    console.log("Got data as json");
    console.log(data);
  }
  else {
    console.log(`Couldn't get posts. Status code: ${response.statusCode}`);
  }
}

getComments();
