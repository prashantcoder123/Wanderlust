const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path= require("path");
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); 
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
 
 
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


main()
.then((res)=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}




const sessionOptions = {
  secret:'mysupersecretcode',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now() + 7 * 24 *60 *60 *1000,
    maxAge: 7 * 24 *60 *60 *1000,
    httpOnly:true,
  },
};

app.get("/",(req,res)=>{
    res.send("hi i am root");
});
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

//error handle..
app.use((err,req,res,next) =>{
     let{statusCode = 500,message ="something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


