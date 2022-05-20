const express = require('express');

const port = 3000;
const app = express();
const md5 = require('md5');

const bodyParser = require('body-parser');
const {createClient} = require('redis');
const redisClient = createClient({
socket:{
    port: 6379,
    host: '127.0.0.1'
}

}//for things with promis you need to add an await
);

redisClient.connect();// make the TCP connection to the redis server

app.use(bodyParser.json());// use the middleware

app.listen(port, async, () => {
    console.log(`Server is listening on port ${port}`);}
    );

// read a password from redis 
const validatePassword = async (request, response)=>{
    const requestHashedPassword = md5(request.body.password); //get the passwprd from the request and hash it
    const redisHashedPassword = await redisClient.hmGet('passwords',request.body.userName); //get the hash from redis
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