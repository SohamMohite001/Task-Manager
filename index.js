const  express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
    fs.readdir("./files",function(err,files){
        res.render("index",{files:files});
    })
})

app.post('/add',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err){
        res.redirect('/');
    })
})

app.get('/epg/:filename',function(req,res){
    //res.send("hello");
    res.render("editfrm",{filename:req.params.filename})
})

app.post('/edit',function(req,res){
    fs.rename(`./files/${req.body.pretitle}`,`./files/${req.body.newtitle}.txt`,function(err){
        res.redirect("/");
    })
})

app.post('/updatefile/:filename',function(req,res){
    fs.appendFile(`./files/${req.params.filename}`,`${req.body.udetails}`,(err)=>{
        res.redirect(`/files/${req.params.filename}`);
    })
})

app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filename:req.params.filename,filedata:filedata});
    });
})

app.get('/remove/:filename',function(req,res){
    fs.unlink(`./files/${req.params.filename}`, (err)=>{
        res.redirect("/");
    })
})

app.listen(3000);