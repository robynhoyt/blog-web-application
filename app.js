const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

let blogPosts = [];

//home page
app.get("/", (req, res) => {
    res.render("index", {posts: blogPosts });
});

// add a new blog post
app.post("/add-post", (req, res) => {
    const post = {
        id: Date.now(),
        name: req.body.name,
        title: req.body.title,
        blog: req.body.blog,
        date: new Date().toLocaleString()
    };

    blogPosts.push(post);

    res.redirect("/");
});

// open the edit page
app.get("/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = blogPosts.find((post) => post.id === id);

    if (!post) {
        return res.send("Post not found");
    }

    res.render("edit", {post: post});
});

// update the post
app.post("/edit/:id", (req, res) => {

    const id = Number(req.params.id);
    const post = blogPosts.find((post) => post.id === id);

    if (post) {
        post.name = req.body.name;
        post.title = req.body.title;
        post.blog = req.body.blog;
    }

    res.redirect("/");
});

// delete a post
app.post("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    blogPosts = blogPosts.filter((post) => post.id !== id);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Blog app running on http://localhost:${port}`);
});