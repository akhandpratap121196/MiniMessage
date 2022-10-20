var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
///this is mongo url
mongoose.connect('mongodb+srv://Akhand:Akhanda%4011@cluster0.fn1fy.mongodb.net/Message_Board',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
app.get('/text',(req,res)=>{
    let texts=[];
    db.collection('MiniMessage').find()
    .forEach(text=>texts.push(text))
    .then(()=>{
       res.status(200).json(texts)
       // res.status(200).json(texts[0].name);
    //    res.render("index",  texts )
    }).catch(()=>{
        res.status(500).json({error:'could not fetch document'})
    })
})
app.post("/success",(req,res)=>{
    var name = req.body.name;
    var text=req.body.text;
    var date=req.body.date;
    var data = {
        "name": name,
        "text":text,
        "date":date
    }

    db.collection('MiniMessage').insertOne(data,(err)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('index.html');

})


app.get("/",(req,res)=>{
   
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");