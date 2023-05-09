const express=require("express");
const bodyparser=require("body-parser");

const app=express();

let items=[];

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"))   

app.get("/",function(req,res){
    
let today=new Date();
    
    let options={
            weekday:"long",
            day:"numeric",
            month:"long"
    };

    let day=today.toLocaleDateString("en-US",options);
    res.render("list",{
        day:day,
        newlistitems:items
    });

});

app.post("/",function(req,res){
    items.push(req.body.newitem);
    
    res.redirect("/")
});

app.listen(3000,function(){
    console.log("server is listening on port 3000");
});