const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: String,
  username: String,
  name: String,
  url: { type: String, required: true, index: true, unique: true },
  stargazers: Number,
  isFork: Boolean
});
// repoSchema.index({ url: 1}, { unique: true});

let Repo = mongoose.model('Repo', repoSchema);
Repo.createIndexes();

let save = (repoData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var repo = new Repo({
    id: repoData.id,
    username: repoData.username,
    name: repoData.name,
    url: repoData.url,
    stargazers: repoData.stargazers,
    isFork: repoData.fork
  });
  return repo.save();
}

module.exports.save = save;