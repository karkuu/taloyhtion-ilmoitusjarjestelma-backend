let express = require("express");
let tijPg = require("./pgserver");

let tijUser = require('./models/user');
let tijNotification = require('./models/notification');
let tijHousingcompany = require('./models/housingcompany');

let tijRouter = express.Router();

// tijRouter
// hoitaa muut taulut 
//	- tijHousing_comp
//	- tijHouses
//	- tijFlats
//	- tijMaintenance_comp

// companies - get some by name
tijRouter.get("/companyseek/:search", function(req,res) {
    let housingCompanies = [];
    let housingCompany = tijHousingcompany;
    var getSearch = req.params.search;

    tijPg.query("SELECT * FROM tij_housing_comp WHERE name ~* '^"+getSearch+".*'")
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            housingCompany = {
                id:pgres.rows[i].id,
                name:pgres.rows[i].name,
                address:pgres.rows[i].address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                business_id:pgres.rows[i].business_id
            };
            housingCompanies.push(housingCompany);
        }
        return res.status(200).json(housingCompanies);

    }).catch(e => console.error(e.stack));
});

// companies - get some by address
tijRouter.get("/companyseekaddress/:search", function(req,res) {
    let housingCompanies = [];
    let housingCompany = tijHousingcompany;
    var getSearch = req.params.search;

    tijPg.query("SELECT * FROM tij_housing_comp WHERE address ~* '^"+getSearch+".*'")
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            housingCompany = {
                id:pgres.rows[i].id,
                name:pgres.rows[i].name,
                address:pgres.rows[i].address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                business_id:pgres.rows[i].business_id
            };
            housingCompanies.push(housingCompany);
        }
        return res.status(200).json(housingCompanies);

    }).catch(e => console.error(e.stack));
});

tijRouter.get("/housingcomp", function(req,res) {
    let housingCompanies = [];
    let housingCompany = tijHousingcompany;

    tijPg.query('SELECT (SELECT COUNT(*) FROM tij_notifications ' + 
				'WHERE (tij_notifications.id_housing_c = tij_housing_comp.id) AND status=0) ' +
				'AS newnotifs,tij_housing_comp.* FROM tij_housing_comp')
	.then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            housingCompany = {
                id:pgres.rows[i].id,
                name:pgres.rows[i].name,
                address:pgres.rows[i].address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                business_id:pgres.rows[i].business_id,
                newnotifs:pgres.rows[i].newnotifs
            };
            housingCompanies.push(housingCompany);
        }
        return res.status(200).json(housingCompanies);

    }).catch(e => console.error(e.stack));
});

// Houses by housingcompany
tijRouter.get("/housesbycompany/:id", function(req,res) {
    let getId = parseInt(req.params.id);
    let houses = [];
    let house;

    tijPg.query('SELECT * FROM tij_houses WHERE id_housing_comp='+getId)
	.then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            house = {
                id:pgres.rows[i].id,
                id_housing_comp:pgres.rows[i].id_housing_comp, 
                address:pgres.rows[i].address,
	//			city:pgres.rows[i].city,
                zip:pgres.rows[i].zip
            };
            houses.push(house);
        }
        return res.status(200).json(houses);

    }).catch(e => console.error(e.stack));
});

// Flats by house
tijRouter.get("/flatsbyhouse/:id", function(req,res) {
    let getId = parseInt(req.params.id);
    let flats = [];
    let flat;

    tijPg.query('SELECT * FROM tij_flats WHERE id_houses='+getId)
	.then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            flat = {
                id:pgres.rows[i].id,
                id_houses:pgres.rows[i].id_houses,
                flat_number:pgres.rows[i].flat_number,
                stairway:pgres.rows[i].stairway
            };
            flats.push(flat);
        }
        return res.status(200).json(flats);

    }).catch(e => console.error(e.stack));
});

/*
("SELECT tij_notifications.*, CONCAT (tij_users.last_name, ' ', tij_users.first_name) AS fullname," +
					"tij_users.email,tij_users.first_name,tij_users.last_name,tij_users.phone,tij_users.role," +
					"tij_users.last_login,tij_users.billing_address,tij_users.zip AS ub_zip,tij_users.city AS ub_city," +
					"tij_housing_comp.name,tij_housing_comp.address,tij_housing_comp.zip AS hc_zip," +
					"tij_housing_comp.city AS hc_city,tij_housing_comp.business_id " +
				"FROM tij_notifications INNER JOIN tij_users ON (tij_notifications.id_user = tij_users.id) " +
					"INNER JOIN tij_housing_comp ON (tij_notifications.id_housing_c = tij_housing_comp.id) " +
				"ORDER BY sent_date ASC")
*/

module.exports = tijRouter;
