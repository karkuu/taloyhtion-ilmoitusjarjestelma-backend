let express = require("express");
let tijPg = require("./pgserver");

let tijUser = require('./models/user');
let tijNotification = require('./models/notification');
let tijHousingcompany = require('./models/housingcompany');

let tijRouteUser = express.Router();

// tijRouteUser
// hoitaa taulun tij_users käsittelyt

// users - get some by name
tijRouteUser.get("/usersseek/:search", function(req,res) {
    let users = [];
    let user = tijUser;
    var getSearch = req.params.search;

//  tijPg.query("SELECT *, CONCAT (last_name, ' ', first_name) AS fullname FROM tij_users " +
//				"WHERE CONCAT (last_name, ' ', first_name) ~* '^"+getSearch+".*'")

	tijPg.query("SELECT tij_users.*, CONCAT (tij_users.last_name, ' ', tij_users.first_name) AS fullname," +
					"tij_flats.id AS fid, tij_flats.flat_number, tij_flats.stairway," +
					"tij_houses.id AS hid, tij_houses.address AS h_address, tij_houses.zip AS h_zip," + 
					"tij_houses.city AS h_city, tij_housing_comp.id AS hcid " +
				"FROM tij_users " +
				"INNER JOIN tij_flats ON (tij_users.id_flat = tij_flats.id) " +
				"INNER JOIN tij_houses ON (tij_flats.id_houses = tij_houses.id) " +
				"INNER JOIN tij_housing_comp ON (tij_houses.id_housing_comp= tij_housing_comp.id) " +
				"WHERE CONCAT (tij_users.last_name, ' ', tij_users.first_name) ~* '^"+getSearch+".*'")
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            user = {
                id:pgres.rows[i].id,
                fid:pgres.rows[i].fid,
                hid:pgres.rows[i].hid,
                hcid:pgres.rows[i].hcid,
                id_flat:pgres.rows[i].id_flat,
                email:pgres.rows[i].email,
                password:pgres.rows[i].password,
                first_name:pgres.rows[i].first_name,
                last_name:pgres.rows[i].last_name,
                phone:pgres.rows[i].phone,
                role:pgres.rows[i].role,
                last_login:pgres.rows[i].last_login,
                billing_address:pgres.rows[i].billing_address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                fullname:pgres.rows[i].fullname,

                flat_number:pgres.rows[i].flat_number,
				stairway:pgres.rows[i].stairway,
                
				h_address:pgres.rows[i].h_address,
                h_zip:pgres.rows[i].h_zip,
                h_city:pgres.rows[i].h_city	                
            };
            users.push(user);
        }
        return res.status(200).json(users);

    }).catch(e => console.error(e.stack));
});

// users - get some by (house)address
tijRouteUser.get("/usersseekaddress/:search", function(req,res) {
    let users = [];
    let user = tijUser;
    var getSearch = req.params.search;

//  tijPg.query("SELECT *, CONCAT (last_name, ' ', first_name) AS fullname FROM tij_users WHERE billing_address ~* '^"+getSearch+".*'")

	tijPg.query("SELECT tij_users.*, CONCAT (tij_users.last_name, ' ', tij_users.first_name) AS fullname," +
					"tij_flats.id AS fid, tij_flats.flat_number, tij_flats.stairway," +
					"tij_houses.id AS hid, tij_houses.address AS h_address, tij_houses.zip AS h_zip," + 
					"tij_houses.city AS h_city, tij_housing_comp.id AS hcid " +
				"FROM tij_users " +
				"INNER JOIN tij_flats ON (tij_users.id_flat = tij_flats.id) " +
				"INNER JOIN tij_houses ON (tij_flats.id_houses = tij_houses.id) " +
				"INNER JOIN tij_housing_comp ON (tij_houses.id_housing_comp= tij_housing_comp.id) " +
				"WHERE tij_houses.address ~* '^"+getSearch+".*'")
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            user = {
                id:pgres.rows[i].id,
				fid:pgres.rows[i].fid,
                hid:pgres.rows[i].hid,
                hcid:pgres.rows[i].hcid,
                id_flat:pgres.rows[i].id_flat,
                email:pgres.rows[i].email,
                password:pgres.rows[i].password,
                first_name:pgres.rows[i].first_name,
                last_name:pgres.rows[i].last_name,
                phone:pgres.rows[i].phone,
                role:pgres.rows[i].role,
                last_login:pgres.rows[i].last_login,
                billing_address:pgres.rows[i].billing_address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                fullname:pgres.rows[i].fullname,

                flat_number:pgres.rows[i].flat_number,
				stairway:pgres.rows[i].stairway,
                
				h_address:pgres.rows[i].h_address,
                h_zip:pgres.rows[i].h_zip,
                h_city:pgres.rows[i].h_city	
            };
            users.push(user);
        }
        return res.status(200).json(users);

    }).catch(e => console.error(e.stack));
});

// users - get all
tijRouteUser.get("/users", function(req,res) {
    let users = [];
    let user = tijUser;

    tijPg.query("SELECT tij_users.*, CONCAT (last_name, ' ', first_name) AS fullname," + 
					"tij_flats.id AS fid, tij_flats.flat_number, tij_flats.stairway," +
					"tij_houses.id AS hid, tij_houses.address AS h_address, tij_houses.zip AS h_zip," + 
					"tij_houses.city AS h_city, tij_housing_comp.id AS hcid " +
				"FROM tij_users INNER JOIN tij_flats ON (tij_users.id_flat = tij_flats.id) " +
				"INNER JOIN tij_houses ON (tij_flats.id_houses = tij_houses.id) " +
				"INNER JOIN tij_housing_comp ON (tij_houses.id_housing_comp= tij_housing_comp.id)")
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            user = {
                id:pgres.rows[i].id,
                fid:pgres.rows[i].fid,
                hid:pgres.rows[i].hid,
                hcid:pgres.rows[i].hcid,
                id_flat:pgres.rows[i].id_flat,
                email:pgres.rows[i].email,
                password:pgres.rows[i].password,
                first_name:pgres.rows[i].first_name,
                last_name:pgres.rows[i].last_name,
                phone:pgres.rows[i].phone,
                role:pgres.rows[i].role,
                last_login:pgres.rows[i].last_login,
                billing_address:pgres.rows[i].billing_address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                fullname:pgres.rows[i].fullname,

                flat_number:pgres.rows[i].flat_number,
				stairway:pgres.rows[i].stairway,
                
				h_address:pgres.rows[i].h_address,
                h_zip:pgres.rows[i].h_zip,
                h_city:pgres.rows[i].h_city	
            };
            users.push(user);
        }
        return res.status(200).json(users);

    }).catch(e => console.error(e.stack));
});

// users - get users by housingcompany					*** millä tämä hakee? id_flat vs. id_hc ??? ***
tijRouteUser.get("/usersbycompany/:hid", function(req,res) {
    let users = [];
    let user = tijUser;
    var housingId = [ parseInt(req.params.hid) ];

    tijPg.query("SELECT *, CONCAT (last_name, ' ', first_name) AS fullname FROM tij_users WHERE id_flat="+housingId)
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            user = {
                id:pgres.rows[i].id,
                id_flat:pgres.rows[i].id_flat,
                email:pgres.rows[i].email,
                password:pgres.rows[i].password,
                first_name:pgres.rows[i].first_name,
                last_name:pgres.rows[i].last_name,
                phone:pgres.rows[i].phone,
                role:pgres.rows[i].role,
                last_login:pgres.rows[i].last_login,
                billing_address:pgres.rows[i].billing_address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                fullname:pgres.rows[i].fullname
            };
            users.push(user);
        }
        return res.status(200).json(users);

    }).catch(e => console.error(e.stack));
});

// users - get one by id
tijRouteUser.get("/users/:id", function(req,res) {
    let user = tijUser;
    var getId = [ parseInt(req.params.id) ];

    tijPg.query('SELECT * FROM tij_users WHERE id = $1', getId)
    .then(pgres => {
        queryContents = pgres.rows;
        user = pgres.rows[0];
        return res.status(200).json(user);

    }).catch(e => console.error(e.stack));
});

// users - add (insert) one  = POST-operaatio	isännöitsijän näytöltä - ei asukkaan - vai?
tijRouteUser.post("/users", function(req,res){
    let addUser = tijUser;
    addUser = {
        id_flat:parseInt(req.body.id_flat),
        email:req.body.email,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        role:parseInt(req.body.role),				// oletus: 1 = asukas
//      last_login:req.body.last_login,	
        billing_address:req.body.billing_address,
        zip:req.body.zip,
        city:req.body.city
    };
    tijPg.query('INSERT INTO tij_users (id_flat, email, password, first_name, last_name,' +
                'phone, role, billing_address, zip, city)' +
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                    [addUser.id_flat, addUser.email, addUser.password, addUser.first_name, addUser.last_name, addUser.phone,
                    addUser.role, addUser.billing_address, addUser.zip, addUser.city]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'user inserted'
        });
    }).catch(e => console.error(e.stack));
});

// users - update one from admin   = PUT-operaatio
tijRouteUser.put("/users2/:id", function(req,res){
    let putId = parseInt(req.params.id);
    let putUser = tijUser;
    //console.log(JSON.stringify(req.body)+"\n\n")
/* 
	Näihin oma update logiikka			(= asunnon osoite)
    h_address:this.state.h_address,			houses
    stairway:this.state.stairway,			flats
    flat_number:this.state.flat_number,		flats
    h_zip:this.state.h_zip,					houses
    h_city:this.state.h_city				houses (uusi)
*/
    putUser = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        billing_address:req.body.billing_address,
        zip:req.body.zip,
        city:req.body.city,
        id_flat:req.body.fid

    };
    tijPg.query('UPDATE tij_users SET id_flat=($1), first_name=($2), last_name=($3),' +
                'phone=($4), billing_address=($5), zip=($6), city=($7) WHERE id=($8)',
                    [putUser.id_flat, putUser.first_name, putUser.last_name, putUser.phone,
                     putUser.billing_address, putUser.zip, putUser.city, putId]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'user updated'
        });
    }).catch(e => console.error(e.stack));
});

// users - update one from omat tiedot			--- saako kaikkia kenttiä päivittää??? ---
tijRouteUser.put("/users/:id", function(req,res){
    let putId = parseInt(req.params.id);
    let putUser = tijUser;
    putUser = {
        id_flat:parseInt(req.body.id_flat),
        email:req.body.email,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
    //  role:parseInt(req.body.role),
        last_login:req.body.last_login,
        billing_address:req.body.billing_address,
        zip:req.body.zip,
        city:req.body.city
    };
    tijPg.query('UPDATE tij_users SET id_flat=($1), email=($2), password=($3), first_name=($4), last_name=($5),' +
                'phone=($6), last_login=($7), billing_address=($8), zip=($9), city=($10) WHERE id=($11)',
                    [putUser.id_flat, putUser.email, putUser.password, putUser.first_name, putUser.last_name, 
					putUser.phone, putUser.last_login, putUser.billing_address, putUser.zip, putUser.city, putId]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'user updated'
        });
    }).catch(e => console.error(e.stack));
});

module.exports = tijRouteUser;
