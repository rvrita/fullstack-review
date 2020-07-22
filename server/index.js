const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.username;
  github.getReposByUsername(username)
  .then(data => { console.log(data); return data;} )
  .then(resp => {
    var allRepos = [];
    var data = resp.data;
    for (var i = 0; i < data.length; i++) {
      var userReposInfo = {};
      userReposInfo.id = data[i].id;
      userReposInfo.name = data[i].name;
      userReposInfo.url = data[i].html_url;
      userReposInfo.stargazers = data[i].stargazers_count;
      allRepos.push(userReposInfo);
    }
    return allRepos;
  })
  .then(repos => console.log(repos));
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

