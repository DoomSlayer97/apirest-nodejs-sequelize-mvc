const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  database: "dbcalendario",
  host: "localhost",
  port: "3310",
  user: "root",
  password: "123"
});

const executeQuery = (queryString, params = []) => {

  return new Promise((resolve, reject) => {

    db.query(queryString, params, (err, res) => {

      if (err) return reject(err);

      return resolve(res);

    });

  });

}

module.exports = executeQuery;
