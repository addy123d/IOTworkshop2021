// Dependency - Johnny-Five !
const {Board, Thermometer} = require("johnny-five");


const board = new Board();

board.on("ready",function(){
    // console.log("Board Connected !");

    // Pin Configuration !
    const thermometer = new Thermometer({
        controller : "LM35",
        pin : "A0"
    })

    // Readings Array !
    const readings = [];

    // Dependency Used - Express
    const express = require("express");
    const host = '127.0.0.1';
    const port = 8000;

    // Server Setup
    const app = express();

    // Request - /home
    app.use("/",express.static(__dirname+"/client"));

    // Request - /getData
    app.get("/getData",function(request,response){

        // Response to be sent !
        response.json({
            data : readings
        });
    })

    // Trigger Server
    app.listen(port,host,function(){
        console.log(`Server is running at port ${port}`);
    })

    thermometer.on("change",function(){
        // console.log(thermometer.celsius);
        readings.push(thermometer.celsius);
    })
})