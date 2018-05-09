let express = require("express");
let tijPg = require("./pgserver");
let tijUser = require('./models/user');
let tijNotification = require('./models/notification');
let tijHousingcompany = require('./models/housingcompany');
let tijMaintenancecompany = require('./models/maintenancecompany');

let tijRouterManager = express.Router();

// users - get all
tijRouterManager.get("/users", function(req,res) {
    let users = [];
    let user = tijUser;

    tijPg.query("SELECT *, CONCAT (first_name, ' ', last_name) AS fullname FROM tij_users")
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
tijRouterManager.get("/users/:id", function(req,res) {
    let user = tijUser;
    var getId = [ parseInt(req.params.id) ];

    tijPg.query('SELECT * FROM tij_users WHERE id = $1', getId)
    .then(pgres => {
        queryContents = pgres.rows;
        user = pgres.rows[0];
        return res.status(200).json(user);

    }).catch(e => console.error(e.stack));
});

// users - add (insert) one  = POST
tijRouterManager.post("/users", function(req,res){
    let addUser = tijUser;
    addUser = {
        id_flat:parseInt(req.body.id_flat),
        email:req.body.email,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        role:parseInt(req.body.role),
        last_login:Date.now,
        billing_address:req.body.billing_address,
        zip:parseInt(req.body.zip),
        city:req.body.city
    };
    tijPg.query('INSERT INTO tij_users (id_flat, email, password, first_name, last_name,' +
                'phone, role, last_login, billing_address, zip, city)' +
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
                    [addUser.id_flat, addUser.email, addUser.password, addUser.first_name, addUser.last_name, addUser.phone,
                    addUser.role, addUser.last_login, addUser.billing_address, addUser.zip, addUser.city]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'user inserted'
        });
    }).catch(e => console.error(e.stack));
});

// users - update one  = PUT
tijRouterManager.put("/users/:id", function(req,res){
    let putId = parseInt(req.params.id);
    let putUser = tijUser;
    putUser = {
        id_flat:parseInt(req.body.id_flat),
        email:req.body.email,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        role:parseInt(req.body.role),
        last_login:req.body.last_login,
        billing_address:req.body.billing_address,
        zip:parseInt(req.body.zip),
        city:req.body.city
    };
    tijPg.query('UPDATE tij_users SET id_flat=($1), email=($2), password=($3), first_name=($4), last_name=($5),' +
                'phone=($6), role=($7), last_login=($8), billing_address=($9), zip=($10), city=($11) WHERE id=($12)',
                    [putUser.id_flat, putUser.email, putUser.password, putUser.first_name, putUser.last_name, putUser.phone,
                    putUser.role, putUser.last_login, putUser.billing_address, putUser.zip, putUser.city, putId]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'user updated'
        });
    }).catch(e => console.error(e.stack));
});

// users - delete (hide) one
// Ei saa poistaa - merkitään poistetuksi eli piilotetaan
// email/pwd tyhjäksi, role 0, last_login = poistopvm, nimeen merkintä
// yhteystietoja voi päivittää(?), eli billing_address = new_address
tijRouterManager.delete("/users/:id", function(req,res){
    let delId = parseInt(req.params.id);
    let hidUser = tijUser;
    hidUser = {
        id_flat:req.body.id_flat,
        email:"",
        password:"",
        first_name:req.body.first_name,
        last_name:req.body.last_name + ' *** poistettu ***',
        phone:req.body.phone,
        role:0,
        last_login:Date.now,
        billing_address:req.body.billing_address,
        zip:req.body.zip,
        city:req.body.city
    };
    tijPg.query('UPDATE tij_users SET email=($1), password=($2), phone=($3), role=($4), last_name=($5),' +
                'last_login=($6), billing_address=($7), zip=($8), city=($9) WHERE id=($10)',
                    [hidUser.email, hidUser.password, hidUser.phone, hidUser.role, hidUser.last_name,
                    hidUser.last_login, hidUser.billing_address, hidUser.zip, hidUser.city, delId]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'user hidden'
        });
    }).catch(e => console.error(e.stack));
});

// notifications - get all
tijRouterManager.get("/notifications", function(req,res) {
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
                id_housing_comp:pgres.rows[i].id_housing_comp,
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

// notifications - get one by id
tijRouterManager.get("/notifications/:id", function(req,res) {
    let notification = tijNotification;
    var getId = [ parseInt(req.params.id) ];

    tijPg.query('SELECT * FROM tij_notifications WHERE id = $1', getId)
    .then(pgres => {
        queryContents = pgres.rows;
        notification = pgres.rows[0];
        return res.status(200).json(notification);

    }).catch(e => console.error(e.stack));
});

// notifications - get by user id. limit to status
tijRouterManager.get("/notifications/:uid/:stat", function(req,res) {
    let uId = parseInt(req.params.uid);
    let status = parseInt(req.params.stat);
    let notifications = [];
    let notification = tijNotification;

    tijPg.query('SELECT * FROM tij_notifications WHERE id_user='+uId+' AND status='+status)
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            notification = {
                id:pgres.rows[i].id,
                id_user:pgres.rows[i].id_user,
                id_housing_comp:pgres.rows[i].id_housing_comp,
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

/* notifications - add (insert) one  = POST                 toimivuus = ?
tijRouterManager.post("/notifications", function(req,res){
    let addNtf = tijNotification;
    addNtf = {
        id_user:req.body.id_user,
        id_housing_comp:req.body.id_housing_comp,
        id_checkout:req.body.id_checkout,
        read_id:req.body.read_id,
        sent_date:req.body.sent_date,
        read_date:req.body.read_date,
        title:req.body.title,
        message:req.body.message,
        notif_type:req.body.notif_type,
        checkout:req.body.checkout,
        checkout_message:req.body.checkout_message,
        status:req.body.status
    };
    tijPg.query('INSERT INTO tij_notifications(id_user, id_housing_comp, id_checkout, read_id,' +
                'sent_date, read_date, title, message, notif_type, checkout, checkout_message, status)' +
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
                [addNtf.id_user, addNtf.id_housing_comp, addNtf.id_checkout, addNtf.read_id,
                addNtf.sent_date, addNtf.read_date, addNtf.title, addNtf.message, addNtf.notif_type,
                addNtf.checkout, addNtf.checkout_message, addNtf.status]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'notification inserted'
        });
    }).catch(e => console.error(e.stack));
});
*/

// notifications - update one  = PUT
tijRouterManager.put("/notifications/:id", function(req,res){
    let putId = parseInt(req.params.id);
    let putNtf = tijNotification;
    putNtf = {
        id_user:req.body.id_user,
        id_housing_comp:req.body.id_housing_comp,
        id_checkout:req.body.id_checkout,
        read_id:req.body.read_id,
        sent_date:req.body.sent_date,
        read_date:req.body.read_date,
        title:req.body.title,
        message:req.body.message,
        notif_type:req.body.notif_type,
        checkout_date:req.body.checkout,
        checkout_message:req.body.checkout_message,
        status:req.body.status
    };
    tijPg.query('UPDATE tij_notifications SET id_user=($1), id_housing_comp=($2), id_checkout=($3),' +
                'read_id=($4), sent_date=($5), read_date=($6), title=($7), message=($8), notif_type=($9),' +
                'checkout_date=($10), checkout_message=($11), status=($12) WHERE id=($13)',
                [putNtf.id_user, putNtf.id_housing_comp, putNtf.id_checkout, putNtf.read_id,
                putNtf.sent_date, putNtf.read_date, putNtf.title, putNtf.message, putNtf.notif_type,
                putNtf.checkout_date, putNtf.checkout_message, putNtf.status, putId]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'notification updated'
        });
    }).catch(e => console.error(e.stack));
});

// housing_comp - get all
tijRouterManager.get("/housingcomp", function(req,res) {
    let housingCompanies = [];
    let housingCompany = tijHousingcompany;

    tijPg.query('SELECT * FROM tij_housing_comp')
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

// housing_comp - update one
tijRouterManager.put("/housingcomp/:id", function(req,res){
    let putId = parseInt(req.params.id);
    let putHC = tijHousingcompany;
    putHC = {
        name:req.body.name,
        address:req.body.address,
        zip:req.body.zip,
        city:req.body.city,
        business_id:req.body.business_id
    };
    tijPg.query('UPDATE tij_housing_comp SET name=($1), address=($2),' +
                'zip=($3), city=($4), business_id=($5) WHERE id=($6)',
                [putHC.name, putHC.address, putHC.zip, putHC.city, putHC.business_id, putId]
                )
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'housing company updated'
        });
    }).catch(e => console.error(e.stack));
});

tijRouterManager.post("/housingcompany", function(req,res){
    let addHcQuery = '';
    let addNtf = {
        name:req.body.name,
		address:req.body.address,
		zip:req.body.zip,
		city:req.body.city,
		business_id:req.body.business_id,
		houses:req.body.houses,
    };

    addHcQuery += "BEGIN; ";
    addHcQuery += "DO $$ ";
    addHcQuery += "<<addhc>> ";
    addHcQuery += "DECLARE ";
    addHcQuery += "hc_id bigint; ";
    addHcQuery += "house_id bigint; ";
    addHcQuery += "BEGIN ";
    addHcQuery += "INSERT INTO tij_housing_comp (name,address,zip,city,business_id) ";
    addHcQuery += "VALUES ('"+addNtf.name+"','"+addNtf.address+"','"+addNtf.zip+"','"+addNtf.city+"','"+addNtf.business_id+"') RETURNING id INTO hc_id; ";
    
    for (let i=0;i<addNtf.houses.length;i++)
    {
        addHcQuery += "INSERT INTO tij_houses (id_housing_comp,address,zip,city) ";
        addHcQuery += "VALUES (hc_id,'"+addNtf.houses[i][1]+"','"+addNtf.houses[i][2]+"','"+addNtf.houses[i][3]+"') RETURNING id INTO house_id; ";
        
        for (let ii=0;ii<addNtf.houses[i][4].length;ii++)
        {
            addHcQuery += "INSERT INTO tij_flats (id_houses,flat_number,stairway) ";
            addHcQuery += "VALUES (house_id,'"+addNtf.houses[i][4][ii][1]+"','"+addNtf.houses[i][4][ii][2]+"'); ";
        }
    }
    addHcQuery += "END addhc $$; ";
    addHcQuery += "COMMIT; "; 

    tijPg.query(addHcQuery)
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'housing_company/houses/flats inserted'
        });
    }).catch(e => console.error(e.stack));
});

// maintenance_comp - get all
tijRouterManager.get("/maintenancecomp", function(req,res) {
    let maintenanceCompanies = [];
    let maintenanceCompany = tijMaintenancecompany;

    tijPg.query('SELECT * FROM tij_maintenance_comp')
    .then(pgres => {
        queryContents = pgres.rows;
        for (let i=0;i<pgres.rows.length;i++)
        {
            maintenanceCompany = {
                id:pgres.rows[i].id,
                name:pgres.rows[i].name,
                address:pgres.rows[i].address,
                zip:pgres.rows[i].zip,
                city:pgres.rows[i].city,
                business_id:pgres.rows[i].business_id
            };
            maintenanceCompanies.push(maintenanceCompany);
        }
        return res.status(200).json(maintenanceCompanies);

    }).catch(e => console.error(e.stack));
});


tijRouterManager.post("/cars", function(req,res) {

});

tijRouterManager.put("/cars/:id", function(req,res){

});

tijRouterManager.delete("/cars/:id", function(req,res) {

});
// pohja jos tarvitaan oikeaa poistoa (ei user eikä notification)
/*
tijRouterManager.realDel("/users/:id", function(req,res){
    let delId = parseInt(req.params.id);
    tijPg.query('DELETE FROM tij_users WHERE id = $1, delId')
    .then(pgres => {
        return res.status(200)
        .json({
            status: 'OK', message: 'user deleted'
        });

    }).catch(e => console.error(e.stack));
});
*/

module.exports = tijRouterManager;
