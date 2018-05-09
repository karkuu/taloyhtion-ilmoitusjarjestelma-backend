let {Client} = require('pg');

let settings = require('./config');

let client = new Client({
    user: settings.username,
    host: settings.address,
    database: settings.dbname,
    password: settings.pw,
    port: settings.port,
    });
  
client.connect().then(
    () => console.log("Successfully connected to db"),
    (error) =>{
        console.log("Error in connection to db: ");
        console.log(error);
    }
);

module.exports = client;

