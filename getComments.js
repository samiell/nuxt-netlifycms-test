/**
* Get the comments from Netlify
*/
var fetch = require('node-fetch');
var fs = require('fs');

const commentsDir = 'content/comments';

const getComments = async function() {
  // set up our request with appropriate auth token and Form ID
  var url = `https://api.netlify.com/api/v1/forms/${process.env.COMMENTS_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

  // Get the data from Netlify's submissions API
  let response = await fetch(url);

  if (response.ok) {
    let comments = await response.json();

    //Divide up the comments by post
    var commentsByPost = {};
    comments.forEach(c => {
      let d = c.data;
      let info = {
        name: d.name,
        comment: d.comment,
        id: c.id,
      }
      if (commentsByPost[d.post]){
        commentsByPost[d.post].push(info);
      }
      else {
        commentsByPost[d.post] = [info];
      }
    });
    console.log(JSON.stringify(commentsByPost));

    //Ensure the comments directory exists
    if (!fs.existsSync(commentsDir)){
      fs.mkdirSync(commentsDir);
    }

    //Write the comments for each post to a unique file
    Object.keys(commentsByPost).forEach(id => {
      fs.writeFile(`${commentsDir}/${id}.json`, JSON.stringify(commentsByPost[id], null, 2), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`Comments saved for ${id}`);
        }
      });
    });
  }
  else {
    console.log(`Couldn't get posts. Status code: ${response.statusCode}`);
  }
}

getComments();
