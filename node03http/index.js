const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res)=>{
    const log = `${Date.now()}: ${req.url} New Req Received\n`;

    fs.appendFile('./log.txt', log, ()=>{
        
        switch(req.url){
            case '/' : res.end("Home");
            break;
            case "/about" : res.end("About")
            break;
            case "/contact" : res.end("Contact US")
            break;
            default : res.end("404 NOT FOUND");
        }
    });
    
});

myServer.listen(3000, ()=>{
    console.log("Server Started")
})