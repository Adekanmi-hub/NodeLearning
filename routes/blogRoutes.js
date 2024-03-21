// Firstly to make this work, we need express because the Handler("app")
// is in another file called "app.js"
const express = require("express");

//import the controllers for the blog here so we can have access to
// the handlers that are moved from the routes to the controller.
const blogController = require("../controllers/blogController");

// Next we create a new express router
//This creates new instance of a router object
const router = express.Router();

// Blog Routes
router.get("/", blogController.blog_index);

//Handler for the blogs creating
router.post("/", blogController.blog_create_post);

//To redirect to another route, we use:
// This gets the actual form we are getting data submitted from
router.get("/blog", blogController.blog_create_get);

// Here we are trying to get the route parameter after wrapping the
// blogs in "index.ejs" file in an anchor tag to fetch their respective id's.
router.get("/:id", blogController.blog_details);

//Handler to delete the blogs created
router.delete("/:id", blogController.blog_delete);

// Now we are exporting the router so it can be used in app.js file
// where it was previously.
module.exports = router;
