var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var Comment = require("../models/comment");

// INDEX - Show all campgrounds
router.get("/", function(req,res){
        // Get all campgrounds from DB, then render those files
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });
});

// CREATE - Add new campground to DB
router.post("/", middleware.isLoggedIn, function (req,res){
    // get data from form, add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var author = {
        id: req.user ._id,
        username: req.user.username
    };
    
    var newCampground = {name: name, image: image, description: desc, author: author};
    
    // Create a new campground and save to the DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// NEW - Shows form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new.ejs"); 
});

// SHOW - Shows more info about a campground
router.get("/:id", function(req,res){
    // Find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
    });
    
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/camgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
