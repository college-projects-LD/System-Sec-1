const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const port = 3000 ;
const app = express();
const md5 = require('md5');
const redis = require('redis');
const redisClient = redis.createClient();

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server is listening on port ' + port);}
    );

    app.get('/', (request,response)=> {
        response.send("Hello");
});

app.post('/login',async (request,response)=> { //a post request is used by a client to send data to the server
    const loginRequest = request.body; 
    console.log("request.body", JSON.stringify(request.body));
    // search the redis datbase for username and retreive current password in the database
    const redisHashedPassword= await redisClient.hGet('passords', loginRequest.password);
    const hahedPassword = md5(loginRequest.password);
    console.log("redisHashedPassword", redisHashedPassword);
    if (redisHashedPassword === hahedPassword) {
        response.send("Login Successful");
    } else {
        response.send("Login Failed");
    }
});




    // compare password with password sent by client with the hased version in the redis database

//const hahedPassword = md5(loginRequest.password);

    /*if (loginRequest.userName === "landondelaney@byui.edu" && loginRequest.password === "KJhgfdsa123") {
        response.status(200);
        response.send("Welcome");

    } else {
        response.status(401);
        response.send("Unauthorized");
        
    }*/
 