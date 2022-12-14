
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongodb = require("mongodb").MongoClient;
const multer = require("multer");
const jwt = require("jsonwebtoken");




const app = express();

app.use(cors());

app.use(bodyparser.json());

var db;

mongodb.connect("mongodb+srv://baskar:baskar@cluster0.wmakr.mongodb.net/sampleproject?retryWrites=true&w=majority", (error, database) => {

  if (!error) {
    db = database.db("sampleproject");
    console.log("DB connected")
  }
  else {
    console.log("DB not connected");
  }
});

app.post("/userRegister", (req, res) => {
  req.body._id = new Date().getTime();
  const email = req.body.mail
  db.collection("users").findOne({ mail: email }, (error, result) => {
    if (!result) {
      db.collection("users").insert(req.body, (error, data) => {
        if (error) {
          res.status(403).json("Error in insert query");
        }
        else {
          console.log(data);
          res.json("User register successfully");
        }
      });
    }
    else {
      res.json("Mail already available!!");
    }
  });
});

app.post("/userLogin", (req, res) => {
  console.log(req.body);
  db.collection("users").find(req.body, { projection: { _id: 1, mail: 1 ,fname:1} }).toArray((error, data) => {
 console.log(data);
    var token = '';
    if(data.length >0)
    {
      token = jwt.sign(data[0], "mysecretkey")
    }
    res.json(token);
  }, (error) => {
    console.log(error);
  });
});

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/assets/post_images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }

});

var jwtToken;

function verifyToken(req,res, next)
{
 var token = req.headers.myauthtoken;

 if(!token)
 {
  return res.status(401).json("No Token found")
 }

 jwt.verify(token, 'mysecretkey', (error, data)=>{
   if(error)
   {
     console.log(error)
     return res.status(401).json("Token mismatch");
   }

   jwtToken = data;

 });

  next();
}

app.post("/addNewPost", multer({ storage: myStorage }).single("postImg"), (req, res) => {
  console.log(jwtToken);
  req.body._id = new Date().getTime();
  req.body.postImgPath = req.file.filename;
  console.log(req.body);
  req.body._id = new Date().getTime();
  db.collection("post_images").insert(req.body, (error, data) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json("product added sucesfully");
    }
  });
});

app.get("/showAllpost",verifyToken, (req, res) => {
  console.log(jwtToken)
  db.collection("post_images").find().toArray((error, data) => {
    res.json(data);
  });
});

app.post("/showMypost", (req, res) => {
  const userId = req.body.loginBy
  // console.log(userId);
  db.collection("post_images").find({ loginBy: userId }).toArray((error, data) => {
    res.json(data);
    //  console.log(data);
  });
});

app.post("/showPulicPost", (req, res) => {
  const uniquePost = req.body.selectedPost ? 'private' : 'public'
  console.log(uniquePost);
  console.log(req.body);
  db.collection("post_images").find({ selectedPost: uniquePost }).toArray((error, data) => {
    res.json(data);
  });
});

app.post("/updatePost", (req, res) => {
  console.log(req.body)
  db.collection("post_images").updateOne({_id:req.body._id},{
    $set:{
      title:req.body.title,
      description : req.body.description,
      selectedPost:req.body.selectedPost,
      postImgPath:req.body.postImgPath
    }} );
});






module.exports = app;