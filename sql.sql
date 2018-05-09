- Database: "TIJ_DB"

-- DROP DATABASE "TIJ_DB";

CREATE DATABASE "TIJ_DB"
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Finnish_Finland.1252'
       LC_CTYPE = 'Finnish_Finland.1252'
       CONNECTION LIMIT = -1;

COMMENT ON DATABASE "TIJ_DB"
  IS 'ryhmätyön kanta';

-- TAULUT

DROP TABLE IF EXISTS tij_maintenance_comp;
DROP TABLE IF EXISTS tij_notifications;
DROP TABLE IF EXISTS tij_users;
DROP TABLE IF EXISTS tij_flats;
DROP TABLE IF EXISTS tij_houses;
DROP TABLE IF EXISTS tij_housing_comp;

CREATE TABLE "tij_housing_comp" (
id SERIAL UNIQUE NOT NULL,
name varchar(255),
address varchar(255),
zip char(12),
city varchar(255),
business_id varchar(255),
PRIMARY KEY (id)
);

CREATE TABLE  "tij_houses" (
id SERIAL UNIQUE NOT NULL,
id_housing_comp INT NOT NULL,
address varchar(255),
zip char(12),
city varchar(255),
PRIMARY KEY (id),
FOREIGN KEY (id_housing_comp) REFERENCES tij_housing_comp(id)
);

CREATE TABLE "tij_flats" (
id SERIAL UNIQUE NOT NULL,
id_houses INT NOT NULL,
flat_number varchar(255),
stairway varchar(255),
PRIMARY KEY (id),
FOREIGN KEY (id_houses) REFERENCES tij_houses(id)
);

CREATE TABLE "tij_users" (
id SERIAL UNIQUE NOT NULL,
id_flat INT NOT NULL,
email varchar(255) NOT NULL,
password CHAR(64),
first_name varchar(255),
last_name varchar(255),
phone varchar(255),
role smallint,
last_login TIMESTAMP without time zone,
billing_address varchar(255),
zip char(12),
city varchar(255),
PRIMARY KEY (id),
FOREIGN KEY (id_flat) REFERENCES tij_flats(id)
);

CREATE TABLE "tij_notifications" (
id SERIAL UNIQUE NOT NULL,
id_user INT NOT NULL,
id_housing_c INT,
id_checkout INT,
read_id INT,
sent_date TIMESTAMP without time zone,
read_date TIMESTAMP without time zone,
message text,
title varchar(255),
notif_type int NOT NULL,
checkout_date TIMESTAMP without time zone,
checkout_message text,
status smallint,
PRIMARY KEY (id)
);

CREATE TABLE "tij_maintenance_comp" (
id SERIAL UNIQUE NOT NULL,
mc_name varchar(255),
mc_address varchar(255),
mc_zip char(12),
mc_city varchar(255),
mc_business_id varchar(255),
PRIMARY KEY (id)
);

insert into tij_housing_comp (id, name, address, zip, city, business_id) values (1, 'As.Oy Ykkönen Y1', 'Osoitekatu 1 Y1', '40100', 'JYVÄSKYLÄ', 772108);
insert into tij_housing_comp (id, name, address, zip, city, business_id) values (2, 'As.Oy Kakkonen Y2', 'Osoitetie 2 Y2', '41800', 'KORPILAHTI', 208804);
insert into tij_housing_comp (id, name, address, zip, city, business_id) values (3, 'Avain Asumisoikeus Oy Y3', 'Osoiteväylä 3 Y3', '00100', 'HELSINKI', 336622);

insert into tij_houses (id, id_housing_comp, address, zip, city) values (1, 1, 'Osoitekatu 1 Y1T1', 40100, 'Jyväskylä');
insert into tij_houses (id, id_housing_comp, address, zip, city) values (2, 1, 'Osoitekatu 1 Y1T2', 40100, 'Jyväskylä');
insert into tij_houses (id, id_housing_comp, address, zip, city) values (3, 2, 'Osoitetie 2 Y2T1', 41800, 'Korpilahti');
insert into tij_houses (id, id_housing_comp, address, zip, city) values (4, 3, 'Valssikuja 5 Y3T1', 40520, 'Jyväskylä');
insert into tij_houses (id, id_housing_comp, address, zip, city) values (5, 3, 'Mikkolantie 12 Y3T2', 40950, 'Muurame');
insert into tij_houses (id, id_housing_comp, address, zip, city) values (6, 3, 'Kuusitie 10 Y3T3', 40950, 'Muurame');

insert into tij_flats (id, id_houses, flat_number, stairway) values (1, 1, 11, 'Y1T1 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (2, 1, 12, 'Y1T1 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (3, 1, 13, 'Y1T1 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (4, 1, 16, 'Y1T1 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (5, 1, 18, 'Y1T1 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (6, 1, 19, 'Y1T1 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (7, 2, 23, 'Y1T2 C');
insert into tij_flats (id, id_houses, flat_number, stairway) values (8, 2, 24, 'Y1T2 C');
insert into tij_flats (id, id_houses, flat_number, stairway) values (9, 2, 25, 'Y1T2 C');
insert into tij_flats (id, id_houses, flat_number, stairway) values (10, 2, 26, 'Y1T2 D');
insert into tij_flats (id, id_houses, flat_number, stairway) values (11, 2, 27, 'Y1T2 D');
insert into tij_flats (id, id_houses, flat_number, stairway) values (12, 2, 28, 'Y1T2 D');
insert into tij_flats (id, id_houses, flat_number, stairway) values (13, 3, 31, 'Y2T1 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (14, 3, 33, 'Y2T1 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (15, 3, 36, 'Y2T1 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (16, 3, 38, 'Y2T1 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (17, 4, 41, 'Y3T1 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (18, 4, 43, 'Y3T1 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (19, 5, 1, 'Y3T2 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (20, 5, 2, 'Y3T2 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (21, 5, 6, 'Y3T2 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (22, 5, 7, 'Y3T2 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (23, 5, 9, 'Y3T2 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (24, 5, 10, 'Y3T2 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (25, 5, 18, 'Y3T2 B');
insert into tij_flats (id, id_houses, flat_number, stairway) values (26, 6, 1, 'Y3T3 A');
insert into tij_flats (id, id_houses, flat_number, stairway) values (27, 6, 2, 'Y3T3 B');

insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (1, 1, 'sjancar0@psu.edu', 'c754aec46da0602416833881942adaee46960595', 'Sven Y1T1(1) A 11', 'Jancar', '399-454-9011', 3, '2017-05-23', '88370 Glendale Way', 45214, 'Nowshera Cantonment');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (2, 2, 'hwormstone1@goodreads.com', '0d6dba6b629ca60c46103c80d8bbf409aab57247', 'Helen-Elizabeth Y1T1(2) A 12', 'Wormstone', '797-604-5385', 1, '2017-08-22', '3 Memorial Center', 81894, 'Roslavl’');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (3, 3, 'breece2@hibu.com', '65c870ecf77ad0b2d3937a911347884954d9577d', 'Berta Y1T1(3) A 13', 'Reece', '327-378-1207', 3, '2017-11-19', '0859 Crescent Oaks Drive', 50355, 'Santo Tomas');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (4, 4, 'bsarjent3@ca.gov', '0d5587f5e873dc1f4150de485f941827d2212659', 'Brantley Y1T1(4) B 16', 'Sarjent', '202-654-3005', 1, '2017-08-13', '6441 Sunbrook Avenue', 85694, 'Obudovac');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (5, 5, 'nyirrell4@go.com', 'fa0f7dda5f1bb815219a19a1dfff394b13388824', 'Nickolai Y1T1(5) B 18', 'Yirrell', '513-590-4316', 1, '2017-05-12', '2 5th Parkway', 21213, 'Sigaozhuang');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (6, 6, 'bwillis5@cornell.edu', '8a95870d6a5263ccd1175f7110892b5c1f95ebf3', 'Berton Y1T1(6) B 19', 'Willis', '741-939-9435', 1, '2017-08-17', '6 Jackson Crossing', 87553, 'Bakıxanov');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (7, 7, 'hmordaunt6@blog.com', '9922eaaf13b18c31fc2235b842103005d615767e', 'Homerus Y1T2(7) C 23', 'Mordaunt', '591-303-0279', 1, '2017-04-26', '342 Miller Hill', 33889, 'Enonkoski');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (8, 8, 'mbrandhardy7@flickr.com', '2b6fcac8964c8235e18f0c5de3b42a9ebc6f5866', 'Maddie Y1T2(8) C 24', 'Brand-Hardy', '508-361-7455', 1, '2017-07-19', '1451 Coleman Avenue', 13706, 'Karviná');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (9, 9, 'jmalden8@devhub.com', '3f4060e00e5514ea6a2a746acc815770af57350f', 'Jayme Y1T2(9) C 25', 'Malden', '325-457-2622', 1, '2017-09-26', '637 Quincy Place', 67248, 'Sparwood');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (10, 10, 'jsutlieff9@people.com.cn', 'bd055138bd7369872a4fd299266ff22be25a5a75', 'Jeth Y1T2(10) D 26', 'Sutlieff', '535-864-1829', 1, '2017-07-19', '93304 Oak Plaza', 20674, 'Hushan');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (11, 11, 'ttrimmea@taobao.com', '3df2253132c53b248ce186a52fbcf1b1f302ef50', 'Terrell Y1T2(11) D 27', 'Trimme', '147-678-5049', 1, '2017-12-04', '4 Emmet Circle', 19884, 'Xiagang');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (12, 12, 'eprayerb@barnesandnoble.com', '4f16dbd44c6ea0b8391d9ff87dbc7c57f4c5e3dd', 'Ebenezer Y1T2(12) D 28', 'Prayer', '191-782-5820', 1, '2017-03-25', '0 American Crossing', 12820, 'San Rafael');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (13, 13, 'cmcguckinc@archive.org', '785b4dcfe42240be98d2af83b41992eca2113543', 'Cindelyn Y2T1(13) A 31', 'McGuckin', '788-812-6324', 1, '2017-06-04', '1699 Green Ridge Hill', 38325, 'Xiangshan');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (14, 14, 'ckilalead@ebay.com', '8b395340db1e562bb578a9b1eecc07e047850483', 'Clarance Y2T1(14) A 33', 'Kilalea', '537-823-6070', 1, '2017-05-02', '06 Bunker Hill Pass', 58905, 'Lyon');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (15, 15, 'gbiddlese@cisco.com', '491c03ccd71c250526919a04ee3af7fbfed5e165', 'Goober Y2T1(15) B 36', 'Biddles', '369-562-6655', 1, '2017-11-15', '33424 Warbler Pass', 95222, 'Charenton-le-Pont');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (16, 16, 'aabrashkovf@cpanel.net', '4635e6551e172a32c4d55ba4d28705590b7839bb', 'Anthiathia Y2T1(16) B 38', 'Abrashkov', '588-409-3947', 1, '2017-06-18', '5441 Butterfield Terrace', 14293, 'Takanabe');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (17, 17, 'ckleinzweigg@examiner.com', 'dab0b9c52f5cb4740cd9410f23a51f8162c8a89c', 'Cobby Y3T1(17) A 41', 'Kleinzweig', '716-453-7880', 1, '2018-03-12', '1303 Logan Alley', 19309, 'Susoh');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (18, 18, 'lhayshamh@statcounter.com', '9db913751857d507745611ebaf100586747f593b', 'Leanna Y3T1(18) B 43', 'Haysham', '721-669-8643', 1, '2018-01-18', '5 Jana Drive', 44557, 'Taverny');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (19, 19, 'adietschei@auda.org.au', '2db567abc51d7ebc2e1690d078ccc6c567052299', 'Anica Y3T2(19) A 1', 'Dietsche', '315-244-4602', 1, '2017-07-09', '20473 Michigan Avenue', 16944, 'Pindobaçu');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (20, 20, 'jhaldinj@goo.ne.jp', '7f5f9b76bba97d1f3f823f0bc95205d20624536d', 'Jacob Y3T2(20) A 2', 'Haldin', '682-763-7271', 1, '2018-03-15', '656 Hooker Road', 81177, 'Samran');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (21, 21, 'jbuffk@wisc.edu', '51afef524e73c74a93815147d704e65d36073c4f', 'Jarred Y3T2(21) A 6', 'Buff', '311-259-8985', 1, '2017-05-24', '6793 Pepper Wood Avenue', 63137, 'Buri');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (22, 22, 'jari.vuorinen@elisanet.fi', 'f8592f2ec7fa72166c20026d5fb02ba1b447ec4c', 'Jari Y3T2(22) A 7', 'Vuorinen', '0400-643 052', 1, '2018-01-01', 'Muu osoite', 40100, 'JKL');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (23, 23, 'ganscombem@biglobe.ne.jp', '51dab7a4a4b174a6c2760bf8ec3297bb2216e174', 'Goraud Y3T2(23) B 9', 'Anscombe', '748-707-5202', 1, '2018-02-21', '37 Alpine Way', 40159, 'Tilamuta');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (24, 24, 'clowtonn@ft.com', '6043f4f80627abe28dd174523cf89e404c93b947', 'Caril Y3T2(24) B 10', 'Lowton', '907-770-7779', 1, '2018-03-09', '3768 Rockefeller Point', 73362, 'Jikamshi');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (25, 25, 'ryukhnevo@youtu.be', 'a5bcb27c362b104af82d19cafa93990ef6bf0e7c', 'Rozanna Y3T2(25) B 18', 'Yukhnev', '309-346-5296', 1, '2017-07-26', '79 Lotheville Street', 66477, 'Phú Khương');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (26, 26, 'pdooleyp@people.com.cn', 'c33645ff91fefafa0ff5594131d9de8b5eaabacd', 'Philippa Y3T3(26) A 1', 'Dooley', '659-549-6800', 1, '2018-01-24', '67723 David Center', 54528, 'Löddeköpinge');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (27, 26, 'ccutforthq@senate.gov', 'a98ec12ed3aac273f47f168bf5041d22c559ec58', 'Cull Y3T3(26) A 1', 'Cutforth', '497-101-8286', 1, '2017-05-15', '09 Doe Crossing Road', 90891, 'Shencun');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (28, 27, 'jburginr@zdnet.com', '316c8ca83a35182f65dc951ea23576ecce52a639', 'Jeth Y3T3(27) B 2', 'Burgin', '496-953-0583', 1, '2017-11-03', '34 Rockefeller Way', 40700, 'Xilaiqiao');
insert into tij_users (id, id_flat, email, password, first_name, last_name, phone, role, last_login, billing_address, zip, city) values (29, 27, 'ewhitens@dyndns.org', '27aec3459dd4e134bb0e5302aba3895913aff0b4', 'Emilee Y3T3(27) B 2', 'Whiten', '226-618-7578', 2, '2017-11-21', '49 Mallard Parkway', 94988, 'Tsovazard');

insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (1, 2, 1, 0, 3, '2017-07-22', '2017-12-30', 'Etiam justo.', 'Vestibulum sed magna at nunc commodo placerat.', 10, '2018-02-03', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (2, 2, 1, 1, 3, '2017-11-19', '2018-02-23', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.', 'Maecenas pulvinar lobortis est.', 8, '2017-05-11', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (3, 2, 1, 1, 1, '2017-07-18', '2017-06-30', 'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.', 'Nullam porttitor lacus at turpis.', 6, '2017-10-26', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (4, 4, 1, 0, 1, '2017-11-30', '2017-06-27', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.', 'Fusce consequat.', 2, '2017-11-19', '', 0);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (5, 5, 1, 1, 3, '2017-10-06', '2017-07-12', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.', 'Donec ut mauris eget massa tempor convallis.', 1, '2017-11-06', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (6, 6, 1, 1, 1, '2018-03-06', '2018-02-16', 'Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', 10, '2017-12-08', '', 0);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (7, 7, 1, 1, 3, '2017-06-04', '2017-04-05', 'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 'Donec quis orci eget orci vehicula condimentum.', 1, '2017-11-28', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', 5);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (8, 7, 1, 0, 1, '2018-03-09', '2017-09-30', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 'Duis consequat dui nec nisi volutpat eleifend.', 1, '2018-02-22', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (9, 7, 1, 3, 2, '2017-12-19', '2017-10-06', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 'Nam tristique tortor eu pede.', 4, '2017-12-02', 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 5);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (10, 9, 1, 1, 3, '2017-09-07', '2017-07-10', 'Integer non velit. Integer non velit. Integer non velit. Integer non velit. Integer non velit.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, '2018-02-15', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (11, 9, 1, 1, 1, '2017-05-10', '2017-08-26', 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.', 'Donec quis orci eget orci vehicula condimentum.', 5, '2017-06-11', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (12, 10, 1, 1, 3, '2017-06-28', '2017-09-21', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.', 'Morbi non lectus.', 7, '2017-10-01', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (13, 13, 2, 0, 3, '2017-04-09', '2017-07-18', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.', 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 1, '2018-01-09', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (14, 14, 2, 0, 3, '2017-12-09', '2017-04-07', 'Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.', 'Pellentesque ultrices mattis odio.', 10, '2018-01-20', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (15, 14, 2, 1, 3, '2017-05-20', '2017-09-14', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'Maecenas pulvinar lobortis est.', 8, '2017-09-01', '', 3);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (16, 16, 2, 0, 3, '2018-03-14', '2017-05-18', 'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', 5, '2017-04-14', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (17, 18, 3, 0, 3, '2017-07-03', '2017-07-08', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.', 9, '2017-05-08', '', 4);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (18, 18, 3, 0, 3, '2017-05-01', '2018-02-24', 'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.', 'Morbi quis tortor id nulla ultrices aliquet.', 6, '2017-07-30', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (19, 20, 3, 1, 1, '2018-01-03', '2018-01-15', 'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.', 'Praesent id massa id nisl venenatis lacinia.', 7, '2017-07-12', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (20, 20, 3, 3, 1, '2017-09-02', '2018-02-04', 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 'Vestibulum ac est lacinia nisi venenatis tristique.', 8, '2017-06-27', 'Praesent blandit. Nam nulla.', 5);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (21, 22, 3, 1, 3, '2017-05-09', '2017-10-17', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'Morbi porttitor lorem id ligula.', 1, '2018-01-04', '', 4);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (22, 22, 3, 0, 1, '2017-10-22', '2017-12-25', 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', 3, '2017-07-15', '', 0);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (23, 22, 3, 1, 3, '2017-08-21', '2017-12-07', 'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.', 'Suspendisse potenti.', 4, '2017-09-02', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (24, 24, 3, 0, 3, '2018-03-20', '2017-11-01', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.', 'Morbi non quam nec dui luctus rutrum.', 6, '2017-04-11', '', 0);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (25, 25, 3, 0, 1, '2017-05-22', '2017-12-28', 'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.', 'Quisque id justo sit amet sapien dignissim vestibulum.', 5, '2017-10-06', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (26, 26, 3, 0, 3, '2017-10-06', '2017-06-11', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'Aenean lectus.', 8, '2017-08-28', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (27, 26, 3, 1, 1, '2017-06-03', '2017-12-19', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.', 'In hac habitasse platea dictumst.', 8, '2017-07-04', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (28, 26, 3, 1, 3, '2018-01-01', '2017-06-11', 'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.', 'Nam dui.', 1, '2017-11-20', '', 1);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (29, 28, 3, 1, 1, '2017-08-21', '2017-11-19', 'Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.', 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', 7, '2017-06-07', '', 2);
insert into tij_notifications (id, id_user, id_housing_c, id_checkout, read_id, sent_date, read_date, message, title, notif_type, checkout_date, checkout_message, status) values (30, 28, 3, 0, 3, '2017-05-08', '2018-01-02', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.', 'Vivamus vel nulla eget eros elementum pellentesque.', 4, '2017-05-16', '', 1);

insert into tij_maintenance_comp (id, mc_name, mc_address, mc_zip, mc_city, mc_business_id) values (1, 'Huolto-JKL', 'Huoltokatu H1', 40400, 'Jyväskylä', 850261);
insert into tij_maintenance_comp (id, mc_name, mc_address, mc_zip, mc_city, mc_business_id) values (2, 'Huolto-Korpilahti', 'Korpitie H2', 41800, 'Korpilahti', 182319);
insert into tij_maintenance_comp (id, mc_name, mc_address, mc_zip, mc_city, mc_business_id) values (3, 'Muuramen Huolto', 'Muuramentie H3', 40950, 'Muurame', 785378);

UPDATE tij_users SET password = '187d0269d20bb359a9dd71ac44288a8cde5f749832791663d6ce1d6f1c5df81c'
