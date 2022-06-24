const express = require('express');
const https = require('https');
const port = 443;
const app = express();
const md5 = require('md5');
const fs = require('fs');

const bodyParser = require('body-parser');
const {createClient} = require('redis');
const redisClient = createClient({ url: 'redis://default@10.128.0.2:6379', });
const Exapp = express();
app.use(bodyParser.json());// use the middleware

// use the https module to create a secure server useing the correct key and cert
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase:'P@ssw0rd',
}, app).listen(port, async ()=>{
    await redisClient.connect();
    console.log(`listening on port ${port}`);
});





// read a password from redis 
const validatePassword = async (request, response)=>{
    const requestHashedPassword = md5(request.body.password); //get the passwprd from the request and hash it
    const redisHashedPassword = await redisClient.hGet('passwords',request.body.userName); //get the hash from redis
    const loginRequest = request.body;
    console.log("request Body",JSON.stringify(request.body));
    //search the database for the username, if it exists, get the password

    //compare the hashed password with the hashed password in the database
    if( requestHashedPassword == redisHashedPassword){
        response.status(200);//if the passwords match, send a response 200 OK
        response.send(`${loginRequest.userName} is logged in Welcome!`);
    }
    else{
        response.status(401);//if the passwords don't match, send a response 401 Unauthorized
        response.send(`Unauthorized`);
    }


}

app.get('/', (request, response) => {
    response.send('Hello');
});

app.post('/login', validatePassword);


const signup = async (request, response)=>{
    // make a hmset command to add the username and password to the database
    const requestnewHashedPassword = md5(request.body.password);
    var exists = await redisClient.hExists('passwords', request.body.userName);
    console.log("exists",exists);
    if(exists){
        response.status(409);
        response.send(`${request.body.userName} already exists`);
    }
    else
    {
   await  redisClient.hSet('passwords',request.body.userName,requestnewHashedPassword);
    response.status(200);
    response.send("Complete")};
};

app.get('/',(request,response)=>{
    hset (username,password);});

    app.post('/signup',signup);
    app.post('/login',validatePassword);