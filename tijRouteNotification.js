let express = require("express");
let tijPg = require("./pgserver");

let tijUser = require('./models/user');
let tijNotification = require('./models/notification');
let tijHousingcompany = require('./models/housingcompany');

let tijRouteNotification = express.Router();

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

	// YYYY-MM-DD HH:MM:SS
}

// tijRouteNotification
// hoitaa taulun tij_notifications käsittelyt

/*
// notifications - get all
tijRouter.get("/notifications", function(req,res) {
    let notifications = [];
    let notification = tijNotification;

    tijPg.query('SELECT * FROM tij_notifications')
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            notification = {
                id:pgres.rows[i].id,
                id_user:pgres.rows[i].id_user,
                id_housing_comp:pgres.rows[i].id_housing_c,
                id_checkout:pgres.rows[i].id_checkout,
                read_id:pgres.rows[i].read_id,
                sent_date:pgres.rows[i].sent_date,
                read_date:pgres.rows[i].read_date,
                title:pgres.rows[i].title,
                message:pgres.rows[i].message,
                notif_type:pgres.rows[i].notif_type,
                checkout:pgres.rows[i].checkout,
                checkout_message:pgres.rows[i].checkout_message,
                status:pgres.rows[i].status
            };
            notifications.push(notification);
        }
        return res.status(200).json(notifications);

    }).catch(e => console.error(e.stack));
});
*/
// notifications - get all notifications AND data from user-flats-houses-housing_comp
tijRouteNotification.get("/notifications", function(req,res) {
    let notifications = [];
    let notification = tijNotification;

    tijPg.query("SELECT tij_notifications.*, CONCAT (tij_users.last_name, ' ', tij_users.first_name) AS fullname," +
					"tij_users.email,tij_users.first_name,tij_users.last_name,tij_users.phone,tij_users.role," +
					"tij_users.last_login,tij_users.billing_address,tij_users.zip AS ub_zip,tij_users.city AS ub_city," +
					"tij_housing_comp.name AS hc_name,tij_housing_comp.address,tij_housing_comp.zip AS hc_zip," +
					"tij_housing_comp.city AS hc_city,tij_housing_comp.business_id," +
					"tij_flats.flat_number,tij_flats.stairway," +
					"tij_houses.address AS h_address, tij_houses.zip AS h_zip, tij_houses.city AS h_city " +
				"FROM tij_notifications INNER JOIN tij_users ON (tij_notifications.id_user = tij_users.id) " +
					"INNER JOIN tij_housing_comp ON (tij_notifications.id_housing_c = tij_housing_comp.id) " +
					"INNER JOIN tij_flats ON (tij_users.id_flat = tij_flats.id) " +
					"INNER JOIN tij_houses ON (tij_flats.id_houses = tij_houses.id) " +
				"ORDER BY sent_date ASC")
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            notification = {
                id:pgres.rows[i].id,
                id_user:pgres.rows[i].id_user,
                id_housing_comp:pgres.rows[i].id_housing_c,   	// HUOM. nimi
                id_checkout:pgres.rows[i].id_checkout,
                read_id:pgres.rows[i].read_id,
                sent_date:pgres.rows[i].sent_date,
                read_date:pgres.rows[i].read_date,
                title:pgres.rows[i].title,
                message:pgres.rows[i].message,
                notif_type:pgres.rows[i].notif_type,
                checkout:pgres.rows[i].checkout_date,				// _date
                checkout_message:pgres.rows[i].checkout_message,
                status:pgres.rows[i].status,

                id_flat:pgres.rows[i].id_flat,
                email:pgres.rows[i].email,
                first_name:pgres.rows[i].first_name,
                last_name:pgres.rows[i].last_name,
                phone:pgres.rows[i].phone,
                role:pgres.rows[i].role,
                last_login:pgres.rows[i].last_login,
                billing_address:pgres.rows[i].billing_address,
                ub_zip:pgres.rows[i].ub_zip,
                ub_city:pgres.rows[i].ub_city,
                fullname:pgres.rows[i].fullname,

				flat_number:pgres.rows[i].flat_number,
				stairway:pgres.rows[i].stairway,

				h_address:pgres.rows[i].h_address,
				h_zip:pgres.rows[i].h_zip,
				h_city:pgres.rows[i].h_city,				// lisätty selectiin

                hc_name:pgres.rows[i].hc_name,
                hc_address:pgres.rows[i].hc_address,
                hc_zip:pgres.rows[i].hc_zip,
                hc_city:pgres.rows[i].hc_city,
                business_id:pgres.rows[i].business_id

            };
            notifications.push(notification);
        }
        return res.status(200).json(notifications);

    }).catch(e => console.error(e.stack));
});

// notifications - get notifications with status 1
tijRouteNotification.get("/notificationsnew", function(req,res) {
    let notifications = [];
    let notification = tijNotification;

    tijPg.query("SELECT tij_notifications.*, CONCAT (tij_users.last_name, ' ', tij_users.first_name) AS fullname," +
					"tij_users.email,tij_users.first_name,tij_users.last_name,tij_users.phone,tij_users.role," +
					"tij_users.last_login,tij_users.billing_address,tij_users.zip AS ub_zip,tij_users.city AS ub_city," +
					"tij_housing_comp.name,tij_housing_comp.address,tij_housing_comp.zip AS hc_zip," +
					"tij_housing_comp.city AS hc_city,tij_housing_comp.business_id " +
				"FROM tij_notifications INNER JOIN tij_users ON (tij_notifications.id_user = tij_users.id) " +
					"INNER JOIN tij_housing_comp ON (tij_notifications.id_housing_c = tij_housing_comp.id) " +
				"WHERE status=1 ORDER BY sent_date ASC")
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            notification = {
                id:pgres.rows[i].id,
                id_user:pgres.rows[i].id_user,
                id_housing_comp:pgres.rows[i].id_housing_c,  	//	HUOM. nimi
                id_checkout:pgres.rows[i].id_checkout,
                read_id:pgres.rows[i].read_id,
                sent_date:pgres.rows[i].sent_date,
                read_date:pgres.rows[i].read_date,
                title:pgres.rows[i].title,
                message:pgres.rows[i].message,
                notif_type:pgres.rows[i].notif_type,
                checkout:pgres.rows[i].checkout_date,				// _date
                checkout_message:pgres.rows[i].checkout_message,
                status:pgres.rows[i].status,

                id_flat:pgres.rows[i].id_flat,
                email:pgres.rows[i].email,
                first_name:pgres.rows[i].first_name,
                last_name:pgres.rows[i].last_name,
                phone:pgres.rows[i].phone,
                role:pgres.rows[i].role,
                last_login:pgres.rows[i].last_login,
                billing_address:pgres.rows[i].billing_address,
                ub_zip:pgres.rows[i].ub_zip,
                ub_city:pgres.rows[i].ub_city,
                fullname:pgres.rows[i].fullname,

                name:pgres.rows[i].name,
                address:pgres.rows[i].address,
                hc_zip:pgres.rows[i].hc_zip,
                hc_city:pgres.rows[i].hc_city,
                business_id:pgres.rows[i].business_id

            };
            notifications.push(notification);
        }
        return res.status(200).json(notifications);

    }).catch(e => console.error(e.stack));
});
// notifications - get all by user-id
tijRouteNotification.get("/notifications/:uid", function(req,res) {
    let uId = parseInt(req.params.uid);
//  let status = parseInt(req.params.stat);
    let notifications = [];
    let notification = tijNotification;

    tijPg.query('SELECT * FROM tij_notifications ' +
				'WHERE id_user='+uId+' AND status>0 ORDER BY sent_date DESC')
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            notification = {
                id:pgres.rows[i].id,
                id_user:pgres.rows[i].id_user,
                id_housing_comp:pgres.rows[i].id_housing_c,  //HUOM. nimi
                id_checkout:pgres.rows[i].id_checkout,
                read_id:pgres.rows[i].read_id,
                sent_date:pgres.rows[i].sent_date,
                read_date:pgres.rows[i].read_date,
                title:pgres.rows[i].title,
                message:pgres.rows[i].message,
                notif_type:pgres.rows[i].notif_type,
                checkout:pgres.rows[i].checkout_date,		//HUOM. nimi
                checkout_message:pgres.rows[i].checkout_message,
                status:pgres.rows[i].status
            };
            notifications.push(notification);
        }
        return res.status(200).json(notifications);

    }).catch(e => console.error(e.stack));
});
// notifications - get one by id
tijRouteNotification.get("/notifications1/:id", function(req,res) {
    let notification = tijNotification;
    var getId = [ parseInt(req.params.id) ];

    tijPg.query('SELECT * FROM tij_notifications WHERE id = $1', getId)
    .then(pgres => {
        queryContents = pgres.rows;
        notification = pgres.rows[0];
        return res.status(200).json(notification);

    }).catch(e => console.error(e.stack));
});

// notifications - add (insert) one ,first time = POST
tijRouteNotification.post("/notifications", function(req,res){
	let sentDate = getDateTime();
    let addNtf = tijNotification;
    addNtf = {
        id_user:parseInt(req.body.id_user),
        id_housing_c:parseInt(req.body.id_housing_comp),  	// HUOM. nimi
        sent_date:sentDate,      			  				// ASETETTAVA TÄSSÄ
        title:req.body.title,
        message:req.body.message,
        notif_type:parseInt(req.body.notif_type),
        status:parseInt(req.body.status)
    };
    tijPg.query('INSERT INTO tij_notifications(id_user, id_housing_c,' +
                'sent_date, title, message, notif_type, status)' +
                'VALUES($1, $2, $3, $4, $5, $6, $7)',
                [addNtf.id_user, addNtf.id_housing_c, addNtf.sent_date, addNtf.title, addNtf.message, 
				addNtf.notif_type, addNtf.status]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'notification inserted'
        });
    }).catch(e => console.error(e.stack));
});

// notifications - update one  = PUT	--- Mgr / checkout data (no status update)
tijRouteNotification.put("/notifications/:id", function(req,res){
    let putId = parseInt(req.params.id);
    let putNtf = tijNotification;
	let checkDate = getDateTime();
	console.log("checkDate: ", checkDate);
    putNtf = {
        id_checkout:parseInt(req.body.uid),
        checkout_date:checkDate,
        checkout_message:req.body.checkout_message
    };
    tijPg.query('UPDATE tij_notifications SET id_checkout=($1),' +
                'checkout_date=($2), checkout_message=($3) WHERE id=($4)',
                [putNtf.id_checkout, putNtf.checkout_date, putNtf.checkout_message, putId]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'notification check updated'
        });
    }).catch(e => console.error(e.stack));
});

// notifications - update notification status only (not checkout data)
tijRouteNotification.put("/notificationstatus/:id/:status", function(req,res){
    let putId = parseInt(req.params.id);
    let putStatus = parseInt(req.params.status);

    tijPg.query('UPDATE tij_notifications SET status='+putStatus+' WHERE id='+putId)
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'notification status updated'
        });
    }).catch(e => console.error(e.stack));
});

module.exports = tijRouteNotification;
