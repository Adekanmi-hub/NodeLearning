const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Importing the blogRouter
const blogRoutes = require("./routes/blogRoutes");

//express app
const app = express();

//register our view engine
//Middleware & static files
//Note that for middlewares, they use the "next()" method.
app.set("view engine", "ejs");
app.use(express.static("public"));

//This takes all the url encoded data and passes that into
// an object that we can use on the request object
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const dbUrl =
  "mongodb+srv://AdekanmiHub:65145412Ed@nnodetuts.r33ucva.mongodb.net/?retryWrites=true&w=majority&appName=nnodetuts";
mongoose
  .connect(dbUrl)
  .then((result) =>
    app.listen(8080, () => {
      console.log("server is running on port 8080");
    })
  )
  .catch((err) => console.log(err));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  //Creating new instance of a blog
  const blog = new Blog({
    title: "New Blog 01",
    snippet: "About my new blog",
    body: "more about my new blog",
  });

  //To save this to the database, we use the method below;
  //We use an instance of the method created above which is "blog"
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//To get all blogs from the database, we use the method below;
app.get("/all-blogs", (req, res) => {
  //This gets us all of the document inside the blog collection
  //We use the module="blog" and the method=".find"
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//We are trying to get a single blog from the database.
app.get("/single-blog", (req, res) => {
  //to get the specific blog we want, we use the "findById" method
  Blog.findById("65e8c30697a1b2c6a57b3afe")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Routes
app.get("/", (req, res) => {
  //   res.send("<p>Hello world</p>");
  //to send a file as response, we use:
  // res.render("blogs", { title: "Create a new blog" });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<p>About the world</p>");
  //to send a file as response, we use:
  res.render("about", { title: "About" });
});

// Note that in the blogRoutes file, "/blogs was removed since we added it here."
//To use the imported blog routes here we just need to:
app.use("/blogs", blogRoutes);

//Error Handler for pages that are not found
app.use((req, res) => {
  res.status(404).render("error");
});
