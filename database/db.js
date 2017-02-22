
// export the db setup
// =============================================================
module.exports = function(app) {
  // Hook mongoose configuration to the db variable
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("connected to mongoose");
  });

  var articleSchema = mongoose.Schema({
      title: String,
      link: String
  });
}