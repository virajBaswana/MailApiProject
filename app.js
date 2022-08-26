const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;


    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const url = "https://us13.api.mailchimp.com/3.0/lists/b50efa57ec"
    const options = {
        method: "POST",
        auth: "viraj:5fdbc9f6dbc1ff70dde9295928a2aec0-us13",
    }
    const jsonData = JSON.stringify(data);
    const request =  https.request(url,options,function(response){
            
        if(response.statusCode==200){
            res.sendFile(__dirname +"/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
    
})


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.listen(3000,function(){
    console.log("Server is running");
});


//5fdbc9f6dbc1ff70dde9295928a2aec0-us13

// b50efa57ec