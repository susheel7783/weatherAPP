const http=require("http");
const fs=require("fs");
var requests = require('requests');

const homeFile=fs.readFileSync("home.html","utf-8"); //now we get all the html data in backend

const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
        temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
        temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
        temperature=temperature.replace("{%location%}",orgVal.name);
        temperature=temperature.replace("{%country%}",orgVal.sys.country);
        temperature=temperature.replace("{%tempstatus%}",orgVal.weather[0].main);

        return temperature;

};


const server=http.createServer((req,res)=>{
if(req.url=="/"){
    requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=49b26541027514f06c72a6b1d15d3c96")

.on("data",(chunk)=>{
    const objdata=JSON.parse(chunk);
    const arrData=[objdata];
    const realTimeData=arrData.map((val)=>replaceVal(homeFile,val)).join("");
        // console.log(val.main);
        
    
    res.write(realTimeData);
    // console.log(realTimeData);
    // console.log(arrData[0].main.temp);
})
.on("end",(err)=>{
    if(err) return console.log("connection closed due to error",err);
    res.end();
    // console.log("end");
});

}
    
});


server.listen(8000,"127.0.0.1");
// console.log(homeFile);

