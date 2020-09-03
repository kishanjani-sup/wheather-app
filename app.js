const express =  require("express");
const bodyParser =  require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const city = req.body.city;
  const unit = "metric";
  const id = "5515d372c896796f86462bd0fb2129fe"
  const url = "https://api.openweathermap.org/data/2.5/find?q=" + city + "&units="+ unit + "&appid=" + id;


  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.list[1].main.temp;
      const wheatherDescription = wheatherData.list[1].weather[0].description;
      const icon = wheatherData.list[1].weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

      res.write("<h1>the temperature in "+ city+" is "+ temp +" degree celcius right now.</h1>");

      res.write("<h3>" + city +" have "+wheatherDescription+" today</h3>");
      res.write("<img src="+ imageURL +">")
      res.send();
    });
  });
})
app.listen(process.env.PORT || 3000 ,function(){
  console.log("server is running in port 3000");
});



//
