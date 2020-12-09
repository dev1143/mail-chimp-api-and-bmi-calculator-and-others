 // alert("Hello World !");


const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})




app.post("/",function(req,res){
  var fName=req.body.fname;
  var lName=req.body.lname;
  var email=req.body.email;
  var data={
    members:[
      {
        name:"dev_1143_list",
        notify_on_subscribe:"guddu.199531@gmail.com",
        status:"subscribed",
        email_address:email,
        merge_fields:{
          FNAME:fName,
          LNAME:lName
        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);

  var url="https://us7.api.mailchimp.com/3.0/lists/bf1929b7f4";
  var options={
    method:"POST",
    auth:"dev_1143:62e3f674ba1722d7eca937baae26b563-us7"
  }
const request=https.request(url,options,function(resp){
    resp.on("data",function(data){
      console.log(JSON.parse(data));
      if(resp.statusCode===200)
      res.sendFile(__dirname+"/success.html");
      else
        res.sendFile(__dirname+"/failure.html");
    })
  })

  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT||4000,function(){
  console.log("the server is running on port 4000");
})

// 62e3f674ba1722d7eca937baae26b563-us7 api key


// bf1929b7f4  audience id
