const express=require("express");
const bodyparser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");

const app=express();

let items=[];

mongoose.connect('mongodb+srv://km7654:kaushik0089@cluster0.m7bmpyn.mongodb.net/todolistDB');

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"))   


const itemsSchema={
    name:String
};

const Item=mongoose.model("Item",itemsSchema);




app.get("/",function(req,res){
    
    let day=date();

    Item.find().then((data)=>{
        res.render("list",{
            listtitle:day,
            newlistitems:data
        });
    })

    

});

app.post("/",function(req,res){  
    let itemname=req.body.newitem;
    const item=new Item({
        name:itemname
    });
    item.save();
    
    res.redirect(req.get('referer'));
});

app.post("/rm",function(req,res){
    console.log(req.body.deleteelement)
    const deleteitem=req.body.deleteelement;
    Item.deleteOne({name:deleteitem}).then(function(){
        console.log("sucess");
    })

    res.redirect(req.get('referer'));
});


let port=5000;

app.listen(port,function(){
    console.log("server is listening on port "+port);
});

