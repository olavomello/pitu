import app from "./app";
import database from "./database"

// Start DB - force : rebuild db
database.sync({force:false});
console.log("DB  running...");



var fs = require('fs');
//var http = require('http');
var https = require('https');

// SSL credentials
var privateKey  = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// app.listen(3001);
// httpServer.listen(3000);
httpsServer.listen(3001);


console.log("Server running...");