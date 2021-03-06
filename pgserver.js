let {Client} = require('pg');

let settings = require('./config');

let client = new Client(process.env.DATABASE_URL);
  
client.connect().then(
    () => console.log("Successfully connected to db"),
    (error) =>{
        console.log("Error in connection to db: ");
        console.log(error);
    }
);

module.exports = client;

