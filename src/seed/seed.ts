'use strict'

var mongoose = require("mongoose");
var userModel = require('../models/user.js').User;
var postSchema = require('../models/posts.js').postsSchema;

var db_name = "blog";
let mongodb_connection_string = "mongodb://35.177.16.180:27017/" + db_name;


mongoose.connect(mongodb_connection_string);

var db = mongoose.connection;

db.on("error", function(err) {
    console.error("connection error", err);
});

db.once("open", function() {
    console.log("Running Seed App...");

    var Post = mongoose.model("Post", postSchema);

    var recurseDrawingInProcessing = new Post({
        type: "normal",
        title: "Recursive Drawing In Processing",
        pictureUrl: "http://www.cs.cornell.edu/courses/cs3110/2012sp/lectures/lec20-master/images/lec19-diagram3.png",
        postedBy: "Robert Smith",
        postBody: "A method for drawing recursive objects using processing",
        subtitle: "Drawing recursive structures using recursive functions",
        top: true
    })

    var unityGame = new Post({
        type: "normal",
        title: "Forest TD",
        pictureUrl: "http://i32.photobucket.com/albums/d34/robert_smith47/forestTd_zpscikgw6ro.png",
        postedBy: "Robert Smith",
        postBody: "A tower defence game made in unity",
        subtitle: "A tower defence game",
        top: true
    })

    var projectsPost = new Post({
        type: "normal",
        title: "Projects",
        pictureUrl: "http://i32.photobucket.com/albums/d34/robert_smith47/forestTd_zpscikgw6ro.png",
        postedBy: "Robert Smith",
        postBody: "Projects I have completed",
        subtitle: "My projects",
        top: true
    })

    var savingDataWithRx = new Post({
        type: "normal",
        title: "Handle asynchronous data with RxJs",
        pictureUrl: "https://i.imgur.com/V0tNgEr.jpg",
        postedBy: "Robert Smith",
        postBody: "Saving data with RxJs",
        subtitle: "Using RxJs obsevable streams to handle Http requests",
        top: true
    })

    //crate seed users
    var firstUser = new userModel({
        email: "ert135@gmail.com",
        name: "Robert Smith",
        password: "password123",
        admin: true,
        type: "admin"
    })

    //wrapped in removes callback to ensure we get new records everytime
    Post.remove({}, function() {
        recurseDrawingInProcessing.save(function(err) {
            if (err) console.error("Save failed", err);
            unityGame.save(function(err) {
                if (err) console.error("Save failed", err);
                projectsPost.save(function(err) {
                    if (err) console.error("Save failed", err);
                    savingDataWithRx.save(function(err) {
                        if (err) console.error("Save failed", err);
                        Post.find({
                            title: "Projects"
                        }, function(err, posts) {
                            posts.forEach(function(post) {
                                console.log("posts are ", post.postBody)
                            });
                        })
                    })
                })
            })
        })
    });

    userModel.remove({}, function() {
        firstUser.save(function(err) {
            if (err) console.error("Save user failed", err);
            db.close(function() {
                console.log("db connection closed, seed successful");
            });
        })
    })

});
