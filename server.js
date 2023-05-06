// const mongoose = require('mongoose')

// const url = 'mongodb://127.0.0.1:27017/m'
// mongoose.connect(url, { useNewUrlParser: true })

// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })


const express = require('express')
const cors = require('cors')
const path = require("path");
var bodyParser = require('body-parser');
const fs = require('fs')
const app = express();
const server = require("http").Server(app);
io = require('socket.io')(server);
const port = 3002;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/asset", express.static(path.join(__dirname, "asset")));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
server.listen(port, () => {
  console.log("Server is listening on port" + port);
});

io.on('connection', onConnection);

var connectedSocket = null;

function onConnection(socket) {
    connectedSocket = socket;
}

io.on('connection', function (socket) {
    console.log("conncted")
    socket.on("save", (e) => {
      console.log(e);
      let data = {
        "date":new Date().toLocaleString('en-US', {timeZone:'Asia/Kolkata', hour12:false}) ,
        "details":e
      }
      const listData = JSON.stringify(data).concat('\n')
      fs.appendFileSync('list.json', listData, function(err, res){
        if(err) console.log('Error',err);
        else console.log('Data Saved');
      })
    })
})
//db model

// const formData = new mongoose.Schema({
//     Name: {type: String, required: true},
//     Email: {type: String, required: true},
//     Phone: {type: String, required: true},
//     Company: {type: String, required: true},
//     Rating: String,
//     Choice: Array,
//     Comments: Text
// });

// const formModel = mongoose.model('formData', formData);


app.post('/submit', (req,res) => {
    // const myData = new formModel(req.body);
    // myData.save()
    //   .then(item => {
    //     res.send("item saved to database");
    //   })
    //   .catch(err => {
    //     res.status(400).send("unable to save to database");
    //   });
})