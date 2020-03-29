const express = require("express");
  mongoose = require("mongoose"),

PORT = process.env.PORT || 3000,

app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false //may be needed for an indexDB option.   revisit this later.
},
).then(() => {console.log('Connection to database established.')})
    .catch(  err => {console.log(err)});

// routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
