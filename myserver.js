let express = require("express");
let bodyParser = require("body-parser");

let bcrypt = require("bcrypt-nodejs");
let crypto = require('crypto');
let salt = 'jg#¤gdml5begf%Wgwerbewegewbmwvie4WEGobw';

let tijPg = require("./pgserver");

let tijRouteUser = require("./tijRouteUser");
let tijRouteNotification = require("./tijRouteNotification");
let tijRouter = require("./tijRouter");
let tijRouterManager = require("./tijRouterManager");

let app = express();

app.use(bodyParser.json());

let loggedUsers = [];

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

app.post("/login", function(req,res){

    let email = req.body.uname; // !!!!!!!!!!!!!!!!! Syötteen puhdistus puuttuu
    let password = req.body.passphrase; // !!!!!!!!!!!!!!!!! Syötteen puhdistus puuttuu

    let token = "";
    let token2 = crypto.createHash('sha256');
    let letters = "abcdefghijklmnopqrstu1234567890";

    let passwordHash = crypto.createHash('sha256');
    passwordHash.update(req.body.passphrase+salt);
    password = passwordHash.digest('hex');


    // "testi" = 187d0269d20bb359a9dd71ac44288a8cde5f749832791663d6ce1d6f1c5df81c


    tijPg.query("SELECT *, (SELECT COUNT(*) FROM tij_users WHERE email='"+email+"' AND password='"+password+"') AS found FROM tij_users WHERE email='"+email+"' AND password='"+password+"'")
    .then(pgres => {
        if (pgres.rows[0].found === 0) {
            return res.status(409).json({"message":"conflict!!"});
        }
        else{
            
            tijPg.query("UPDATE tij_users SET last_login='"+getDateTime()+"' WHERE id="+ pgres.rows[0].id)
            .catch(e => {
                console.error(e.stack)
            });
        }

        for (let i=0; i< 128; i++)
        {
            let temp = Math.floor(Math.random() * letters.length);
            token = token + letters[temp];
        }

        loggedUsers.push(token);

        token2.update(token + pgres.rows[0].role + salt);

        tempUser = {
            "id": pgres.rows[0].id,
            "first_name": pgres.rows[0].first_name,
            "last_name": pgres.rows[0].last_name,
            "last_login": pgres.rows[0].last_login,
            "billing_address": pgres.rows[0].billing_address,
            "zip": pgres.rows[0].zip,
            "city": pgres.rows[0].city,
            "phone": pgres.rows[0].phone,
            "email": pgres.rows[0].email,
        }

        console.log("User logged.");
        return res.status(200).json({"token":token,"token2":token2.digest('hex'),"user":tempUser});

    }).catch(e => {
        return res.status(409).json({"message":"conflict!"});
        console.error(e.stack)
    });
});

app.post("/logout", function(req,res) {
	let token = req.headers.token;
	if (token) {
		for(let i=0; i<loggedUsers.length;i++) {
			if(token === loggedUsers[i]) {
                loggedUsers.splice(i,1);
                console.log("User logged out.")
				return res.status(200).json({"message":"Logged out"});
			}

		}

	}

	return res.status(404).json({"message":"Not found"});
});

function isUserLogged(req,res,next) {
    let token = req.headers.token;
    console.log("token"+token);
    for (let i=0; i<loggedUsers.length;i++)
    {
        if (token === loggedUsers[i]) {
            console.log("OK");
            return next();
        }
    }
    return res.status(403).json({"message":"forbidden"});
}

/* tsekkaus väliaikaisesti pois
app.use("/api",isUserLogged, tijRouter);
app.use("/apim",isUserLogged, tijRouterManager);
*/
app.use("/api", tijRouteUser);
app.use("/api", tijRouteNotification);
app.use("/api", tijRouter);

app.use("/apim", tijRouterManager);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

app.listen(process.env.PORT || 3001);
console.log("Running on port "+process.env.PORT);
