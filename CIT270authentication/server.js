const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const port = 3000 ;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server is listening on port ' + port);}
    );

    app.get('/', (request,response)=> {
        response.send("Hello");
});

app.post('/login', (request,response)=> { //a post request is used by a client to send data to the server
    const loginRequest = request.body; 
    console.log("request.body", request.body);
    if (loginRequest.userName === "landondelaney@byui.edu" && loginRequest.password === "KJhgfdsa123") {
        response.status(200);
        response.send("Welcome");

    } else {
        response.status(401);
        response.send("Unauthorized");
        
    }

});