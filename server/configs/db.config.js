require("dotenv").config();
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const dbPath = process.env.DB_PATH;

const createConnection = async () => {
  return await sqlite
    .open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
  };
module.exports = {
  createConnection,
};
