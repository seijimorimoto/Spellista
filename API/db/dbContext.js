const mysql = require('mysql2');
const constants = require('../util/constants');

module.exports = {
  openConnection: () => {
    const conn = mysql.createConnection(constants.DB_CONNECTION);
    conn.connect(err => {
      if (err) console.log('Cannot connect to the database');
      else console.log('Successfully connected to the database');
    });
    return conn;
  },

  closeConnection: conn => {
    conn.end(err => {
      if (err) console.log(err);
      else console.log('Connection closed');
    });
  }
};
