// we will first create function names for the router handlers.
// blog_index to get al the blogs and inject into the index view
// blog_details for the single blog getting handler
// blog_create_get to send back the actually form
// blog_create_post to add a new blog
// blog_delete to delete blog

//Importing the Blog model that we exported in blog.js file.
const Blog = require("../Models/blog");

//blog_index for the main blog page handler
const blog_index = (req, res) => {
  // The sort() method helps in the arrangement of the data
  // and in what order we want it to be displayed.
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      /* This is how you fetch data from the database and pass
      it to the "blogs" object below */
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  //This is to access the route parameter.
  const id = req.params.id;

  // We are going to retrieve the document from the database by using
  // findById() method
  Blog.findById(id)
    .then((result) => {
      // Here we are rendering our result into another view file.
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.status(404).render("error", { title: "blogs not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/blog", { title: "Create a new blog" });
  // res.redirect("/about");
};

const blog_create_post = (req, res) => {
  // Here we firstly create an instance of the blog we want to send to our database
  const blog = new Blog(req.body);

  // Then we save our blog and create an asynchronous function
  blog
    .save()
    .then((result) => {
      //Here we want to redirect then user back to the home page
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  //This is to access the route parameter.
  const id = req.params.id;

  //The method used to find the id and delete is findByIdAndDelete()
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
