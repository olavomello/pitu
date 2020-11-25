import app from "./app";
import database from "./database"

// Start DB - force : rebuild db
database.sync({force:false});
console.log("DB  running 3306...");

app.listen(3001);
console.log("Server running at 3001...");