const express = require("express");
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const app = express();
const port =  4001;

const mongodb_uri = "mongodb+srv://admin:123456xyz@cluster0.3w2nx.mongodb.net/budget?retryWrites=true&w=majority"


//password:123456xyz

const userModel = require("./userSchema");
const budgetModel = require("./budgetSchema");

//var client;

mongoose.connect(mongodb_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true})
    .then(() => console.log("Mongoose is connected"))
    .catch(err => console.error("An error has occured", err));


/*mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected');
},
 (err) => {
    if(err) throw err;
 });
*/ 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const tokenKey = "thisisasecret7890";
const jwtMW = exjwt({
  secret: tokenKey,
  algorithms: ["HS256"],
});

var newBudget={}

/*const userSchema=new Schema({
    name: String,
    password: String
});


const userInfo = mongoose.model('users',userSchema);

const data = {
    title:"test",
    body:"this is a test"
}
;*/

app.use(express.static(path.join(__dirname, 'public')));

app.post("/signup", (req, res) => {
  mongoose
    .connect(mongodb_uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true })
    .then(() => {
      let signUp = new userModel({
        email: req.body.email,
        username:req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
      }).save(function (err, doc) {
        if (err) res.json(err);
        else res.send("Signup Successfully");
      });
    });
});

app.post("/login", (req, res) => {
    mongoose.connect(mongodb_uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true });
    userModel.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        res.send(err);} 
        else {
        if (user.email == req.body.email && user.password == req.body.password &&user.username==req.body.username) {
          let token = jwt.sign(
            { email: user.email, 
              password: user.password, 
              username: user.username},
            tokenKey,
            { expiresIn: "10h" }
          );
          console.log(token);
          let obj = {
            login: true,
            user: user.email,
            token: token,
            userID: user._id,
          };
          res.json(obj);
          console.log("login successfully");
        }  else{ 
            console.log("wrong user information, can not login ");}
      }
    });

  });
  
  /*app.get('/budget',(req, res)=>{
    res.sendFile(__dirname+'/budget.json');
});


app.use('/user',users);
app.use('/budget',budget);

*/
  app.get("/budget/:userId", (req, res) => {
    mongoose.connect(mongodb_uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true })
      .then(() => {
      budgetModel.find({userId: req.params.userId})
      .then((data) => {
        console.log(data);
        res.status(200).json(data);
        mongoose.connection.close();
      });
    });
  });

  app.post("/addBudget", jwtMW, (req, res) => {
    mongoose.connect(mongodb_uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true 
     })
      .then(() => {
        newBudget = {
          userId: req.body.userId,
          title: req.body.title,
          value: req.body.value,
          color: req.body.color,
        };
        budgetModel
          .insertMany(newBudget)
          .then((data) => {
            console.log(data);
            res.json(data);
            mongoose.connection.close();
          })
          .catch(error=>{
            res.json({
                message:'An error occurred!'
            })
        })
      })
      .catch(error=>{
        res.json({
            message:'An error occurred!'
        })
    })
  });
  
app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
