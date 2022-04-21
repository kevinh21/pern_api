/////---//////---Making NodeJS talk with Postgres---///////---///////
// More information here:   https://node-postgres.com/features/pooling
//  The Node. js driver connection pooling allows your application to reuse
//  existing connections by automatically saving the connection to a pool so it
//  can be reused, rather than repeatedly creating a new connection to the database server.

// change these values based on your database connection parameters and the info should be
//  put in a potected safe place and not visible to the browser

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "kevinh",
  host: "localhost",
  database: "localhost",
  password: "123456",
  port: 5432,
});

//  Promise (queries) functions to access the database via the express routers
//  app.get, app.post, app.delete, app.listen
//   SQL Commands List:  https://www.dataquest.io/blog/sql-commands/

const getMerchants = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM merchants ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const createMerchant = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`);
      }
    );
  });
};
const deleteMerchant = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      "DELETE FROM merchants WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Merchant deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
};
