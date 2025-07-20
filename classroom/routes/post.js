const express = require("express");
const router = express.Router();

//post
//index-posts
router.get("/",(req,res)=>{
    res.send("GET for posts ");
});
//show -posts
router.get("/:id",(req,res) =>{
    res.send("GET for posts id");
});
//POST-posts
router.post("/",(req,res)=>{
    res.send("POST for posts");
});
//DELETE -posts
router.delete("/:id",(req,res) =>{
    res.send("DELETE For post id");
});

module.exports= router;